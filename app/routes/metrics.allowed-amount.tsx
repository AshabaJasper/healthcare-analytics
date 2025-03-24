import { useState } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import DashboardFilters from "~/components/DashboardFilters";
import { prisma } from "~/lib/prisma.server";
import { getFilterOptions } from "~/services/dataService.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Allowed Amount Metrics - Healthcare Analytics" },
    { name: "description", content: "View allowed amount metrics by payer class and LOC" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Get URL params for filtering
    const url = new URL(request.url);
    const loc = url.searchParams.get("levelOfCare");
    const payer = url.searchParams.get("payer");
    const payerClass = url.searchParams.get("payerClass");
    const stateTreatedAt = url.searchParams.get("stateTreatedAt");
    const serviceYear = url.searchParams.get("serviceYear") 
      ? parseInt(url.searchParams.get("serviceYear")!) 
      : null;
    const paymentYear = url.searchParams.get("paymentYear") 
      ? parseInt(url.searchParams.get("paymentYear")!) 
      : null;
    
    // Build where clause for the query
    const where: any = {};
    
    if (loc) {
      where.LOC = loc;
    }
    
    if (payer) {
      where.payerName = payer;
    }
    
    if (payerClass) {
      where.payerClass = payerClass;
    }
    
    if (stateTreatedAt) {
      where.stateTreatedAt = stateTreatedAt;
    }
    
    if (serviceYear) {
      where.dateOfServiceYear = serviceYear;
    }
    
    if (paymentYear) {
      where.paymentReceivedYear = paymentYear;
    }
    
    // Query metrics from the database
    const metrics = await prisma.calculatedMetrics.findMany({
      where,
      select: {
        id: true,
        LOC: true,
        countOfObservation: true,
        averageAllowedAmount: true,
        minAllowedAmount: true,
        maxAllowedAmount: true,
        medianAllowedAmount: true,
        modeAllowedAmount: true,
        payerClass: true,
        payerName: true,
        stateTreatedAt: true
      },
      orderBy: [
        { payerClass: 'asc' },
        { LOC: 'asc' } 
      ]
    });
    
    // Get filter options for the dashboard filters
    const filterOptions = await getFilterOptions();
    
    return json({
      metrics,
      filterOptions
    });
  } catch (error) {
    console.error("Error loading allowed amount metrics:", error);
    return json({ 
      metrics: [],
      filterOptions: {
        levelOfCare: [],
        payer: [],
        payerClass: [],
        stateTreatedAt: [],
        serviceYears: [],
        paymentYears: []
      }
    });
  }
}

export default function AllowedAmountMetrics() {
  const { metrics, filterOptions } = useLoaderData<typeof loader>();
  
  // Define filter state that matches the DashboardFilters component
  const [currentFilters, setCurrentFilters] = useState({
    levelOfCare: null as string | null,
    payer: null as string | null,
    payerClass: null as string | null,
    stateTreatedAt: null as string | null,
    serviceYear: null as number | null,
    paymentYear: null as number | null,
  });
  
  // Callback when a filter is changed by the user
  const handleFilterChange = (name: string, value: string | number | null) => {
    console.log(`Filter changed: ${name} = ${value}`);
    setCurrentFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Here we would typically update the URL to reflect the filter changes
    // This would trigger a reload of the page with the new filters applied
    const url = new URL(window.location.href);
    
    if (value === null) {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, String(value));
    }
    
    // Update browser URL without reloading the page
    window.history.pushState({}, '', url);
    
    // Force reload to apply filters from the server
    window.location.href = url.toString();
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Allowed Amount Metrics</h1>
          <p className="mt-2 text-gray-600">
            View detailed allowed amount metrics organized by payer class and level of care
          </p>
        </div>
        
        {/* Dashboard Filters */}
        <div className="print:hidden">
          {filterOptions && Object.keys(filterOptions).length > 0 && (
            <DashboardFilters 
              filterOptions={filterOptions}
              currentFilters={currentFilters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
        
        {/* Metrics Table */}
        <div className="mb-8">
          <ProjectAllowedAmount metrics={metrics} />
        </div>
      </div>
    </Layout>
  );
}