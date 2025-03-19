import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import Layout from "~/components/Layout";
import StatsCard from "~/components/StatsCard";
import { prisma } from "~/lib/prisma.server";
import { formatCurrency } from "~/utils/dataUtils";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `${params.loc} Metrics - Healthcare Analytics` },
    { name: "description", content: `Detailed metrics for Level of Care: ${params.loc}` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const loc = params.loc;
  
  if (!loc) {
    throw new Response("Level of Care parameter is required", { status: 400 });
  }
  
  // Get metrics for this LOC
  const metrics = await prisma.calculatedMetrics.findFirst({
    where: { LOC: loc },
  });
  
  if (!metrics) {
    throw new Response(`No metrics found for LOC: ${loc}`, { status: 404 });
  }
  
  // Get claims data for this LOC
  const claims = await prisma.claimRecord.findMany({
    where: { LOC: loc },
    take: 50,
    orderBy: { id: "desc" },
  });
  
  // Get payer breakdown for this LOC
  const payerBreakdown = await prisma.claimRecord.groupBy({
    by: ['payerName'],
    _count: { id: true },
    where: { 
      LOC: loc,
      payerName: { not: null }
    }
  });
  
  // Get state breakdown for this LOC
  const stateBreakdown = await prisma.claimRecord.groupBy({
    by: ['patientState'],
    _count: { id: true },
    where: { 
      LOC: loc,
      patientState: { not: null }
    }
  });
  
  // Total claims for this LOC
  const totalClaims = await prisma.claimRecord.count({
    where: { LOC: loc }
  });

  return json({
    loc,
    metrics,
    claims,
    payerBreakdown,
    stateBreakdown,
    totalClaims
  });
}

export default function LocDetailsPage() {
  const { loc, metrics, claims, payerBreakdown, stateBreakdown, totalClaims } = useLoaderData<typeof loader>();
  const [days, setDays] = useState(
    loc === 'DTX' ? 7 : 
    loc === 'RTC' ? 21 : 
    loc === 'PHP' ? 18 : 
    loc === 'IOP' ? 30 : 0
  );
  
  // Calculate revenue projection
  const projectedRevenue = days * (metrics.averageAllowedAmount || 0);
  const monthlyRevenue = (projectedRevenue * 30) / (days || 1); // Avoid division by zero
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className="text-primary-600 hover:text-primary-900 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{loc} Metrics</h1>
          <p className="mt-2 text-gray-600">
            Detailed metrics and analysis for level of care: {loc}
          </p>
        </div>
        
        {/* Summary metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Claims"
            value={totalClaims.toLocaleString()}
            description={`Total number of ${loc} claims`}
          />
          <StatsCard
            title="Average Allowed Amount"
            value={formatCurrency(metrics.averageAllowedAmount || 0)}
            description="Average amount allowed per claim"
          />
          <StatsCard
            title="Min/Max Range"
            value={`${formatCurrency(metrics.minAllowedAmount || 0)} - ${formatCurrency(metrics.maxAllowedAmount || 0)}`}
            description="Range of allowed amounts"
          />
          <StatsCard
            title="Median Allowed Amount"
            value={formatCurrency(metrics.medianAllowedAmount || 0)}
            description="Median amount allowed per claim"
          />
        </div>
        
        {/* Revenue projection */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{loc} Revenue Projection</h3>
            <p className="mt-1 text-sm text-gray-500">
              Estimated revenue based on average allowed amount and treatment days
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                  Treatment Days
                </label>
                <input
                  type="number"
                  id="days"
                  min="0"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Average Allowed Amount
                </label>
                <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm sm:text-sm">
                  {formatCurrency(metrics.averageAllowedAmount || 0)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Projected Revenue
                </label>
                <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-medium text-primary-700 shadow-sm sm:text-sm">
                  {formatCurrency(projectedRevenue)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Revenue
                </label>
                <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-medium text-primary-700 shadow-sm sm:text-sm">
                  {formatCurrency(monthlyRevenue)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payer breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payer Breakdown</h3>
              <p className="mt-1 text-sm text-gray-500">
                Distribution by payer for {loc} claims
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Count
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payerBreakdown.sort((a, b) => b._count.id - a._count.id).slice(0, 10).map((item) => (
                      <tr key={item.payerName}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.payerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item._count.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((item._count.id / totalClaims) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* State breakdown */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">State Breakdown</h3>
              <p className="mt-1 text-sm text-gray-500">
                Distribution by patient state for {loc} claims
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Count
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stateBreakdown.sort((a, b) => b._count.id - a._count.id).slice(0, 10).map((item) => (
                      <tr key={item.patientState}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.patientState}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item._count.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((item._count.id / totalClaims) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent claims */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent {loc} Claims</h3>
            <p className="mt-1 text-sm text-gray-500">
              Most recent claims for this level of care
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Practice
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allowed Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.practiceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.payerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(claim.paymentAllowedAmount || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(claim.paymentTotalPaid || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.chargeFromDate ? new Date(claim.chargeFromDate).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}