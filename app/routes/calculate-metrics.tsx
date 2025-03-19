import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import Layout from "~/components/Layout";
import { calculateAndStoreAllMetrics } from "~/services/metricsService.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // Check if we have claim records
  const claimCount = await prisma.claimRecord.count();
  
  // Get unique LOC values
  const locGroups = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    where: {
      LOC: {
        not: null,
      },
    },
  });
  
  const locValues = locGroups.map(g => g.LOC);
  
  // Check metrics table
  const metricsCount = await prisma.calculatedMetrics.count();
  
  // Get the actual metrics if any exist
  const metrics = await prisma.calculatedMetrics.findMany();
  
  // If the request includes a trigger parameter, calculate metrics
  const url = new URL(request.url);
  const trigger = url.searchParams.get("trigger");
  
  let calculationResult = null;
  if (trigger === "true") {
    try {
      // Recalculate all metrics
      const count = await calculateAndStoreAllMetrics();
      calculationResult = {
        success: true,
        count,
        message: `Successfully calculated metrics for ${count} LOC groups.`
      };
    } catch (error) {
      calculationResult = {
        success: false,
        message: `Error calculating metrics: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  }
  
  return json({
    claimCount,
    locValues,
    metricsCount,
    metrics,
    calculationResult
  });
}

export default function CalculateMetrics() {
  const { claimCount, locValues, metricsCount, metrics, calculationResult } = useLoaderData<typeof loader>();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Metrics Calculation</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Database Status</h2>
          <ul className="space-y-2 mb-4">
            <li><strong>Total Claim Records:</strong> {claimCount}</li>
            <li><strong>LOC Values Found:</strong> {locValues.join(", ") || "None"}</li>
            <li><strong>Metrics Records:</strong> {metricsCount}</li>
          </ul>
          
          <div className="mt-4">
            <Link 
              to="/calculate-metrics?trigger=true"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Calculate Metrics Now
            </Link>
          </div>
        </div>
        
        {calculationResult && (
          <div className={`p-4 mb-6 rounded-md ${calculationResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {calculationResult.success ? (
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
                <h3 className={`text-sm font-medium ${calculationResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {calculationResult.success ? 'Success!' : 'Error!'}
                </h3>
                <div className={`mt-2 text-sm ${calculationResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  <p>{calculationResult.message}</p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      to="/dashboard"
                      className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {metricsCount > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Metrics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOC</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Allowed Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Amount</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}