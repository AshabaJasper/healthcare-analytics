import { useState } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import Layout from "~/components/Layout";
import FileUpload from "~/components/FileUpload";
import DataPreview from "~/components/DataPreview";
import SuccessNotification from "~/components/SuccessNotification";
import { prisma } from "~/lib/prisma.server";
import { mapExcelToClaimRecord } from "~/utils/dataUtils";
import { calculateAndStoreAllMetrics } from "~/services/metricsService.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Upload Data - Healthcare Analytics" },
    { name: "description", content: "Upload healthcare data files for analysis" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const jsonData = formData.get("jsonData") as string;
  
  if (!jsonData) {
    return json({ 
      success: false, 
      error: "No data provided" 
    });
  }
  
  try {
    const data = JSON.parse(jsonData);
    
    if (!Array.isArray(data) || data.length === 0) {
      return json({ 
        success: false, 
        error: "Invalid data format or empty data" 
      });
    }
    
    // Map Excel data to ClaimRecord format
    const claimRecords = data.map(row => mapExcelToClaimRecord(row));
    
    // Insert records into the database
    const result = await prisma.claimRecord.createMany({
      data: claimRecords,
      skipDuplicates: false, // Set to true if you want to skip duplicates
    });
    
    // If successful, generate metrics
    if (result.count > 0) {
      // Calculate metrics for each LOC
      try {
        console.log("Calculating metrics...");
        const metricsCount = await calculateAndStoreAllMetrics();
        console.log(`Calculated metrics for ${metricsCount} LOC groups`);
        
        return json({ 
          success: true, 
          message: `Successfully uploaded ${result.count} records and calculated metrics for ${metricsCount} LOC groups.`,
          count: result.count,
          metricsCount
        });
      } catch (metricsError) {
        console.error("Error calculating metrics:", metricsError);
        // Still return success for the upload, but note the metrics error
        return json({ 
          success: true, 
          message: `Successfully uploaded ${result.count} records, but there was an error calculating metrics: ${
            metricsError instanceof Error ? metricsError.message : "Unknown error"
          }`,
          count: result.count,
          metricsError: metricsError instanceof Error ? metricsError.message : "Unknown error"
        });
      }
    } else {
      // When no records are inserted
      return json({
        success: false,
        error: "No records were inserted into the database."
      });
    }
  } catch (error) {
    console.error("Action function error:", error);
    return json({ success: false, error: "An error occurred while processing your request." });
  }
}

export default function Upload() {
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isProcessing = navigation.state === "submitting";
  
  const handleFileLoaded = (data: any[], name: string) => {
    setPreviewData(data);
    setFileName(name);
  };
  
  const handleCancel = () => {
    setPreviewData(null);
    setFileName("");
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Upload Data</h1>
        <p className="mt-2 text-gray-600">
          Upload your healthcare data files for analysis. The system will preview the data before processing.
        </p>
        
        {actionData?.success ? (
          <div className="mt-8">
            <SuccessNotification
              title="Upload Successful"
              message={actionData.message}
              dashboardLink={true}
              onDismiss={() => {
                setPreviewData(null);
                setFileName("");
              }}
            />
          </div>
        ) : (
          <>
            {previewData && fileName ? (
              <div className="mt-8">
                <Form method="post">
                  <input
                    type="hidden"
                    name="jsonData"
                    value={JSON.stringify(previewData)}
                  />
                  <DataPreview
                    data={previewData}
                    fileName={fileName}
                    isProcessing={isProcessing}
                    onProcess={() => {
                      // Form will submit automatically
                    }}
                    onCancel={handleCancel}
                  />
                </Form>
              </div>
            ) : (
              <div className="mt-8">
                <FileUpload onFileLoaded={handleFileLoaded} />
              </div>
            )}
            
            {actionData?.error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{actionData.error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Upload Instructions</h2>
          <div className="mt-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Supported File Formats</h3>
            <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
              <li>Excel files (.xlsx, .xls)</li>
              <li>CSV files (.csv)</li>
            </ul>
            
            <h3 className="mt-6 text-lg font-medium text-gray-900">Expected Data Format</h3>
            <p className="mt-2 text-gray-600">
              Your data file should include the following columns:
            </p>
            <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
              <li>Practice Name</li>
              <li>Charge CPT Code</li>
              <li>Revenue Code</li>
              <li>LOC (Level of Care)</li>
              <li>Charge Amount</li>
              <li>Payment Allowed Amount</li>
              <li>Primary Group #</li>
              <li>Claim Primary Member ID</li>
              <li>Payer Name</li>
              <li>Payer Group</li>
              <li>Payment Total Paid</li>
              <li>Payment Received (date)</li>
              <li>Payment Entered (date)</li>
              <li>Charge From Date (date)</li>
              <li>Charge To Date (date)</li>
              <li>Patient and Insurance address information</li>
            </ul>
            
            <h3 className="mt-6 text-lg font-medium text-gray-900">Processing Steps</h3>
            <ol className="mt-2 text-gray-600 list-decimal list-inside space-y-1">
              <li>Upload your Excel or CSV file</li>
              <li>Preview the data to ensure it's formatted correctly</li>
              <li>Click "Process Data" to upload to the database</li>
              <li>View the generated metrics in the Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}
