import { useState } from "react";
import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, Form, useNavigation } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import Layout from "~/components/Layout";
import { calculateAndStoreAllMetrics, checkMetricsStatus } from "~/services/metricsService.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // Get metrics status
  const metricsStatus = await checkMetricsStatus();
  
  // Get record counts
  const claimCount = await prisma.claimRecord.count();
  
  // Get LOC breakdown
  const locGroups = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    _count: {
      id: true,
    },
    where: { 
      LOC: { not: null },
    },
  });
  
  // Get existing metrics
  const metrics = await prisma.calculatedMetrics.findMany({
    orderBy: { LOC: 'asc' },
  });
  
  return json({
    claimCount,
    metricsStatus,
    locGroups,
    metrics,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");
  
  if (action === "recalculate") {
    try {
      console.log("Manually recalculating metrics...");
      const count = await calculateAndStoreAllMetrics();
      return json({
        success: true,
        message: `Successfully recalculated metrics for ${count} LOC groups.`,
        count,
      });
    } catch (error) {
      console.error("Error recalculating metrics:", error);
      return json({
        success: false,
        message: `Error recalculating metrics: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }
  
  return json({ success: false, message: "No action specified." });
}

export default function ManageMetrics() {
  const { claimCount, metricsStatus, locGroups, metrics } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Metrics</h1>
        
        {/* Status Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Records</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{claimCount}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">LOC Groups</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{locGroups.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Calculated Metrics</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">{metrics.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className={`mt-1 text-lg font-semibold ${metricsStatus.needsCalculation ? 'text-amber-600' : 'text-green-600'}`}>
                {metricsStatus.needsCalculation ? 'Needs Calculation' : 'Up to Date'}
              </dd>
            </div>
          </dl>
        </div>
        
        {/* Action/Result */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          {/* Action Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <Form method="post">
              <input type="hidden" name="action" value="recalculate" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Recalculating...
                  </>
                ) : (
                  'Recalculate All Metrics'
                )}
              </button>
              <p className="mt-2 text-sm text-gray-500">
                This will delete all existing metrics and recalculate them from the current data.
              </p>
            </Form>
          </div>
          
          {/* Result */}
          {actionData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Result</h2>
              <div className={`p-4 rounded-md ${actionData.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {actionData.success ? (
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${actionData.success ? 'text-green-800' : 'text-red-800'}`}>
                      {actionData.success ? 'Success!' : 'Error!'}
                    </h3>
                    <div className={`mt-2 text-sm ${actionData.success ? 'text-green-700' : 'text-red-700'}`}>
                      <p>{actionData.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Metrics Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Metrics</h2>
          {metrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOC</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Allowed</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Allowed</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Allowed</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {metrics.map((metric) => (
                    <tr key={metric.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.LOC}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.countOfObservation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.averageAllowedAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.minAllowedAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.maxAllowedAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(metric.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No metrics have been calculated yet. Click "Recalculate All Metrics" to generate them.
            </div>
          )}
        </div>
        
        {/* LOC Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">LOC Distribution</h2>
          {locGroups.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOC</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Count</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrics Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locGroups.map((item) => {
                    // Check if we have metrics for this LOC
                    const hasMetrics = metrics.some(m => m.LOC === item.LOC);
                    
                    return (
                      <tr key={item.LOC}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.LOC}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._count.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hasMetrics ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Calculated
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Missing
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No LOC groups found in the data.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}