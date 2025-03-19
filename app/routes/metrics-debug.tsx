import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import Layout from "~/components/Layout";
import { calculateMetricsForLOC } from "~/services/metricsService.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // Get a sample of claim records
  const claimSample = await prisma.claimRecord.findMany({
    take: 5
  });
  
  // Get all LOC values
  const locGroups = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    where: {
      LOC: {
        not: null,
      },
    },
  });
  
  // For each LOC, manually calculate metrics
  const metrics = [];
  for (const locGroup of locGroups) {
    if (!locGroup.LOC) continue;
    
    try {
      const metric = await calculateMetricsForLOC(locGroup.LOC, {});
      metrics.push({
        LOC: locGroup.LOC,
        data: metric
      });
    } catch (error) {
      metrics.push({
        LOC: locGroup.LOC,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
  
  // Get breakdown of records per LOC
  const locBreakdown = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    _count: {
      id: true
    }
  });
  
  return json({
    claimSample,
    metrics,
    locGroups: locGroups.map(g => g.LOC),
    locBreakdown
  });
}

export default function MetricsDebug() {
  const { claimSample, metrics, locGroups, locBreakdown } = useLoaderData<typeof loader>();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Metrics Debug Page</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* LOC Distribution */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">LOC Distribution</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOC</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {locBreakdown.map((item) => (
                  <tr key={item.LOC}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.LOC}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._count.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Sample Claims */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample Claim Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOC</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowed Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claimSample.map((claim) => (
                    <tr key={claim.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.LOC}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.payerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${claim.paymentAllowedAmount?.toFixed(2) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Calculated Metrics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculated Metrics</h2>
            {metrics.map((metric) => (
              <div key={metric.LOC} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium text-gray-800 mb-2">LOC: {metric.LOC}</h3>
                {metric.error ? (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    <p>Error: {metric.error}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Count</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.data.countOfObservation}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Average Allowed Amount</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.data.averageAllowedAmount?.toFixed(2) || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Min Allowed Amount</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.data.minAllowedAmount?.toFixed(2) || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Max Allowed Amount</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.data.maxAllowedAmount?.toFixed(2) || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Median Allowed Amount</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${metric.data.medianAllowedAmount?.toFixed(2) || 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}