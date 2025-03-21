import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, useNavigation } from "@remix-run/react";
import Layout from "~/components/Layout";
import StatsCard from "~/components/StatsCard";
import DashboardFilters from "~/components/DashboardFilters";
import MetricsChart from "~/components/MetricsChart";
import RevenueProjection from "~/components/RevenueProjection";
import { getDashboardStats, getFilterOptions, getAllClaimData } from "~/services/dataService.server";
import { formatCurrency } from "~/utils/dataUtils";
import { checkMetricsStatus, calculateAndStoreAllMetrics } from "~/services/metricsService.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - Healthcare Analytics" },
    { name: "description", content: "Healthcare data analytics dashboard" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Loading dashboard data...");
  
  // Check if metrics need to be calculated
  const metricsStatus = await checkMetricsStatus();
  
  // Auto-calculate if needed
  let calculationResult = null;
  if (metricsStatus.needsCalculation) {
    try {
      console.log("Auto-calculating metrics...");
      const count = await calculateAndStoreAllMetrics();
      calculationResult = {
        success: true,
        count,
        message: `Auto-calculated metrics for ${count} LOC groups.`,
      };
      console.log(`Auto-calculated metrics for ${count} LOC groups`);
    } catch (error) {
      console.error("Error auto-calculating metrics:", error);
      calculationResult = {
        success: false,
        message: `Error calculating metrics: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  // Load all data required for the dashboard
  const [dashboardStats, filterOptions, allClaimData] = await Promise.all([
    getDashboardStats(),
    getFilterOptions(),
    getAllClaimData()
  ]);
  
  // Log filter options to help with debugging
  console.log("Filter options loaded:", {
    levelOfCare: filterOptions.levelOfCare?.length || 0,
    payer: filterOptions.payer?.length || 0,
    payerClass: filterOptions.payerClass?.length || 0,
    stateTreatedAt: filterOptions.stateTreatedAt?.length || 0,
    serviceYears: filterOptions.serviceYears?.length || 0,
    paymentYears: filterOptions.paymentYears?.length || 0,
  });

  return json({ 
    dashboardStats, 
    metricsStatus,
    calculationResult,
    filterOptions,
    allClaimData,
  });
}

export default function Dashboard() {
  const { dashboardStats, metricsStatus, calculationResult, filterOptions, allClaimData } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  
  // Define filter state that matches the DashboardFilters component
  const [currentFilters, setCurrentFilters] = useState({
    levelOfCare: null as string | null,
    payer: null as string | null,
    payerClass: null as string | null,
    stateTreatedAt: null as string | null,
    serviceYear: null as number | null,
    paymentYear: null as number | null,
  });
  
  const [filteredClaimData, setFilteredClaimData] = useState(allClaimData || []);
  const [filteredStats, setFilteredStats] = useState(dashboardStats);

  // Add debugging log when component mounts
  useEffect(() => {
    console.log("Dashboard loaded with options:", {
      filterOptions,
      totalClaimRecords: allClaimData?.length || 0,
      metricsStatus,
    });
    
    // Sample the first few records to understand the data structure
    if (allClaimData && allClaimData.length > 0) {
      console.log("Sample claim record:", allClaimData[0]);
    }
  }, [allClaimData, filterOptions, metricsStatus]);

  // Format the metrics data for MetricsChart
  const metricsData = filteredStats.locMetrics.map((metric) => ({
    LOC: metric.LOC,
    averageAllowedAmount: metric.averageAllowedAmount,
    minAllowedAmount: metric.minAllowedAmount,
    maxAllowedAmount: metric.maxAllowedAmount,
    medianAllowedAmount: metric.medianAllowedAmount,
    modeAllowedAmount: metric.modeAllowedAmount || metric.averageAllowedAmount, // fallback
  }));

  // Callback when a filter is changed by the user
  const handleFilterChange = (name: string, value: string | number | null) => {
    console.log(`Filter changed: ${name} = ${value}`);
    setCurrentFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value,
      };
      console.log("New filters state:", newFilters);
      return newFilters;
    });
  };

  // Apply filters whenever currentFilters or claim data change
  useEffect(() => {
    if (!allClaimData || allClaimData.length === 0) {
      console.log("No claim data available for filtering");
      return;
    }
    
    console.log("Applying filters:", currentFilters);
    let filtered = [...allClaimData];
    
    // Filter by levelOfCare (maps to LOC in database)
    if (currentFilters.levelOfCare) {
      filtered = filtered.filter(claim => claim.levelOfCare === currentFilters.levelOfCare);
      console.log(`After levelOfCare filter: ${filtered.length} records`);
    }
    
    // Filter by payer (maps to payerName in database)
    if (currentFilters.payer) {
      filtered = filtered.filter(claim => claim.payer === currentFilters.payer);
      console.log(`After payer filter: ${filtered.length} records`);
    }
    
    // Filter by payerClass (maps to payerGroup in database)
    if (currentFilters.payerClass) {
      filtered = filtered.filter(claim => claim.payerClass === currentFilters.payerClass);
      console.log(`After payerClass filter: ${filtered.length} records`);
    }
    
    // Filter by stateTreatedAt (maps to primaryInsState in database)
    if (currentFilters.stateTreatedAt) {
      filtered = filtered.filter(claim => claim.stateTreatedAt === currentFilters.stateTreatedAt);
      console.log(`After stateTreatedAt filter: ${filtered.length} records`);
    }
    
    // Filter by serviceYear 
    if (currentFilters.serviceYear !== null) {
      filtered = filtered.filter(claim => claim.serviceYear === currentFilters.serviceYear);
      console.log(`After serviceYear filter: ${filtered.length} records`);
    }
    
    // Filter by paymentYear
    if (currentFilters.paymentYear !== null) {
      filtered = filtered.filter(claim => claim.paymentYear === currentFilters.paymentYear);
      console.log(`After paymentYear filter: ${filtered.length} records`);
    }
    
    console.log(`Final filtered data: ${filtered.length} records`);
    setFilteredClaimData(filtered);
    
    // Also update filtered statistics
    if (filtered.length === allClaimData.length) {
      // If no filters are applied, use the original stats
      setFilteredStats(dashboardStats);
    } else {
      // Calculate filtered stats
      updateFilteredStats(filtered);
    }
  }, [allClaimData, currentFilters, dashboardStats]);
  
  // Calculate new stats based on filtered data
  const updateFilteredStats = (filteredData: any[]) => {
    if (filteredData.length === 0) {
      // If no data passes the filter, keep the original stats but show zeroes for counts
      const emptyStats = {
        ...dashboardStats,
        totalRecords: 0,
        uniquePatients: 0,
        uniquePayers: 0,
        totalPayments: 0,
        totalAllowed: 0,
      };
      setFilteredStats(emptyStats);
      return;
    }
    
    // Count unique patients and payers in filtered data
    const uniquePatientIds = new Set(filteredData.map(claim => claim.patientId).filter(Boolean));
    const uniquePayerNames = new Set(filteredData.map(claim => claim.payer).filter(Boolean));
    
    // Calculate sums
    const totalPaid = filteredData.reduce((sum, claim) => {
      const paidAmount = parseFloat(claim.paidAmount) || 0;
      return sum + paidAmount;
    }, 0);
    
    const totalAllowed = filteredData.reduce((sum, claim) => {
      const allowedAmount = parseFloat(claim.allowedAmount) || 0;
      return sum + allowedAmount;
    }, 0);
    
    // Calculate LOC breakdown
    const locCounts: Record<string, number> = {};
    filteredData.forEach(claim => {
      if (claim.levelOfCare) {
        locCounts[claim.levelOfCare] = (locCounts[claim.levelOfCare] || 0) + 1;
      }
    });
    
    const locBreakdown = Object.keys(locCounts).map(LOC => ({
      LOC,
      _count: { id: locCounts[LOC] },
      _sum: {
        paymentAllowedAmount: 0, // We'd need to calculate this but for now we can leave it at 0
        paymentTotalPaid: 0,
      }
    }));
    
    // Filter metrics to only include LOCs in the filtered data
    const filteredLOCs = new Set(filteredData.map(claim => claim.levelOfCare).filter(Boolean));
    const filteredMetrics = dashboardStats.locMetrics.filter(metric => 
      filteredLOCs.has(metric.LOC)
    );
    
    // Update filtered stats
    setFilteredStats({
      ...dashboardStats,
      totalRecords: filteredData.length,
      uniquePatients: uniquePatientIds.size,
      uniquePayers: uniquePayerNames.size,
      totalPayments: totalPaid,
      totalAllowed: totalAllowed,
      locBreakdown: locBreakdown,
      locMetrics: filteredMetrics.length > 0 ? filteredMetrics : dashboardStats.locMetrics,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Overview of key metrics and revenue projections from your healthcare data.
            </p>
          </div>
          
          {/* Metrics calculation status */}
          {(isLoading || calculationResult) && (
            <div className="flex items-center">
              {isLoading ? (
                <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading metrics...
                </div>
              ) : calculationResult && (
                <div className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  calculationResult.success 
                    ? 'text-green-800 bg-green-100' 
                    : 'text-red-800 bg-red-100'
                }`}>
                  {calculationResult.success ? (
                    <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {calculationResult.success ? "Metrics calculated" : "Calculation error"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Filters - only render if we have filter options */}
        {filterOptions && Object.keys(filterOptions).length > 0 && (
          <DashboardFilters 
            filterOptions={filterOptions}
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Records"
            value={filteredStats.totalRecords.toLocaleString()}
            description="Total number of claims"
            icon={
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatsCard
            title="Unique Patients"
            value={filteredStats.uniquePatients.toLocaleString()}
            description="Distinct patient count"
            icon={
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <StatsCard
            title="Total Payments"
            value={formatCurrency(filteredStats.totalPayments)}
            description="Sum of all payments"
            icon={
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Average Allowed Amount"
            value={formatCurrency(
              filteredStats.totalRecords > 0 
                ? filteredStats.totalAllowed / filteredStats.totalRecords 
                : 0
            )}
            description="Average allowed per claim"
            icon={
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        {/* Metrics Chart */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <MetricsChart data={metricsData} title="Amount Metrics by Level of Care" />
        </div>

        {/* Revenue Projection */}
        <div className="mb-8">
          <RevenueProjection 
            metrics={filteredStats.locMetrics.map(metric => ({
              LOC: metric.LOC,
              averageAllowedAmount: metric.averageAllowedAmount,
              minAllowedAmount: metric.minAllowedAmount,
              maxAllowedAmount: metric.maxAllowedAmount,
              medianAllowedAmount: metric.medianAllowedAmount,
              modeAllowedAmount: metric.modeAllowedAmount || metric.averageAllowedAmount,
              countOfObservation: metric.countOfObservation,
            }))}
          />
        </div>

        {/* LOC Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Level of Care Breakdown</h3>
              <p className="mt-1 text-sm text-gray-500">
                Distribution of records by level of care
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level of Care</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStats.locBreakdown.map((item) => (
                      <tr key={item.LOC}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={`/dashboard/${item.LOC}`} className="text-primary-600 hover:underline">{item.LOC}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._count.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((item._count.id / filteredStats.totalRecords) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payer Distribution */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payer Distribution</h3>
              <p className="mt-1 text-sm text-gray-500">Top payers by number of claims</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {filteredClaimData.length > 0 ? (
                <div className="text-center text-gray-500">
                  Payer Distribution Chart Removed
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}