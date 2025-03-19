import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit, Form } from "@remix-run/react";
import { ClaimRecord } from "@prisma/client";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import Layout from "~/components/Layout";
import DataTable from "~/components/DataTable";
import { prisma } from "~/lib/prisma.server";
import { formatDate, formatCurrency } from "~/utils/dataUtils";
import { exportToExcel } from "~/utils/excelUtils";
import { useSearchParams } from "~/hooks/useSearchParams";

export const meta: MetaFunction = () => {
  return [
    { title: "View Data - Healthcare Analytics" },
    { name: "description", content: "View and filter uploaded healthcare data" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Get parameters from the URL query string
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "50", 10);
  const search = url.searchParams.get("search") || "";
  const loc = url.searchParams.get("loc") || "";
  const payerName = url.searchParams.get("payerName") || "";
  const patientState = url.searchParams.get("patientState") || "";
  const insuranceState = url.searchParams.get("insuranceState") || "";
  const fromDate = url.searchParams.get("fromDate") || "";
  const toDate = url.searchParams.get("toDate") || "";

  // Calculate pagination values
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // Build where clause
  const where: any = {};
  
  // Add filters if they are provided
  if (search) {
    where.OR = [
      { LOC: { contains: search, mode: "insensitive" } },
      { practiceName: { contains: search, mode: "insensitive" } },
      { payerName: { contains: search, mode: "insensitive" } },
      { patientState: { contains: search, mode: "insensitive" } },
      { primaryInsState: { contains: search, mode: "insensitive" } },
    ];
  }
  
  if (loc) {
    where.LOC = { equals: loc, mode: "insensitive" };
  }
  
  if (payerName) {
    where.payerName = { contains: payerName, mode: "insensitive" };
  }
  
  if (patientState) {
    where.patientState = { equals: patientState, mode: "insensitive" };
  }
  
  if (insuranceState) {
    where.primaryInsState = { equals: insuranceState, mode: "insensitive" };
  }
  
  // Date range filters
  if (fromDate) {
    where.chargeFromDate = { 
      ...(where.chargeFromDate || {}),
      gte: new Date(fromDate)
    };
  }
  
  if (toDate) {
    where.chargeFromDate = { 
      ...(where.chargeFromDate || {}),
      lte: new Date(toDate)
    };
  }

  // Get records with pagination
  const records = await prisma.claimRecord.findMany({
    where,
    skip,
    take,
    orderBy: {
      id: "desc", // Most recent records first
    },
  });

  // Get total count for pagination
  const total = await prisma.claimRecord.count({ where });
  
  // Get filter options for dropdowns
  const locOptions = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    where: { LOC: { not: null } },
  });
  
  const payerOptions = await prisma.claimRecord.groupBy({
    by: ['payerName'],
    where: { payerName: { not: null } },
  });
  
  const patientStateOptions = await prisma.claimRecord.groupBy({
    by: ['patientState'],
    where: { patientState: { not: null } },
  });
  
  const insuranceStateOptions = await prisma.claimRecord.groupBy({
    by: ['primaryInsState'],
    where: { primaryInsState: { not: null } },
  });

  return json({
    records,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
    filterOptions: {
      loc: locOptions.map(option => option.LOC).filter(Boolean) as string[],
      payerName: payerOptions.map(option => option.payerName).filter(Boolean) as string[],
      patientState: patientStateOptions.map(option => option.patientState).filter(Boolean) as string[],
      insuranceState: insuranceStateOptions.map(option => option.primaryInsState).filter(Boolean) as string[],
    }
  });
}

export default function Data() {
  const { records, pagination, filterOptions } = useLoaderData<typeof loader>();
  const [filteredData, setFilteredData] = useState<ClaimRecord[]>(records);
  const { getParam, setParam, setParams } = useSearchParams();
  const submit = useSubmit();
  
  // Get filter values from URL
  const searchFilter = getParam("search", "");
  const locFilter = getParam("loc", "");
  const payerNameFilter = getParam("payerName", "");
  const patientStateFilter = getParam("patientState", "");
  const insuranceStateFilter = getParam("insuranceState", "");
  const fromDateFilter = getParam("fromDate", "");
  const toDateFilter = getParam("toDate", "");
  const currentPage = getParam("page", 1);
  const currentPageSize = getParam("pageSize", 50);
  
  // Update filtered data when table filtering changes
  useEffect(() => {
    setFilteredData(records);
  }, [records]);

  // Define columns for the data table
  const columnHelper = createColumnHelper<ClaimRecord>();
  
  const columns: ColumnDef<ClaimRecord, any>[] = [
    columnHelper.accessor("LOC", {
      header: "Level of Care",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor("practiceName", {
      header: "Practice",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor("payerName", {
      header: "Payer",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor("chargeAmount", {
      header: "Charge Amount",
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor("paymentAllowedAmount", {
      header: "Allowed Amount",
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor("paymentTotalPaid", {
      header: "Payment",
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor("paymentReceived", {
      header: "Payment Received",
      cell: (info) => formatDate(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor("chargeFromDate", {
      header: "Service Date",
      cell: (info) => formatDate(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor("patientState", {
      header: "Patient State",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor("primaryInsState", {
      header: "Insurance State",
      cell: (info) => info.getValue() || "-",
      enableSorting: true,
      enableColumnFilter: true,
    }),
  ];

  // Handle data export
  const handleExport = () => {
    const exportData = filteredData.map((record) => ({
      "Level of Care": record.LOC,
      "Practice Name": record.practiceName,
      "Payer Name": record.payerName,
      "Charge Amount": record.chargeAmount,
      "Allowed Amount": record.paymentAllowedAmount,
      "Payment": record.paymentTotalPaid,
      "Payment Received": record.paymentReceived ? formatDate(record.paymentReceived) : "",
      "Service Date": record.chargeFromDate ? formatDate(record.chargeFromDate) : "",
      "Patient State": record.patientState,
      "Insurance State": record.primaryInsState,
    }));

    exportToExcel(exportData, "healthcare-data-export");
  };
  
  // Handle filter changes
  const handleFilterChange = (name: string, value: string | number | boolean | null) => {
    // Reset to first page when filters change
    setParams({
      [name]: value,
      page: 1
    });
  };
  
  // Handle pagination change
  const handlePageChange = (page: number) => {
    setParam("page", page);
  };
  
  // Handle page size change
  const handlePageSizeChange = (pageSize: number) => {
    setParams({
      pageSize,
      page: 1
    });
  };
  
  // Handle form reset
  const handleResetFilters = () => {
    setParams({
      search: null,
      loc: null,
      payerName: null,
      patientState: null,
      insuranceState: null,
      fromDate: null,
      toDate: null,
      page: 1
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data View</h1>
            <p className="mt-2 text-gray-600">
              View and filter your uploaded healthcare data. Use the search and filters to narrow
              down the results.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Showing {filteredData.length} of {pagination.total} records
            </p>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
            <Form method="get" className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-4">
              {/* Search filter */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={searchFilter}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Search by keyword"
                />
              </div>
              
              {/* LOC filter */}
              <div>
                <label htmlFor="loc" className="block text-sm font-medium text-gray-700">
                  Level of Care
                </label>
                <select
                  id="loc"
                  name="loc"
                  value={locFilter}
                  onChange={(e) => handleFilterChange("loc", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.loc.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Payer filter */}
              <div>
                <label htmlFor="payerName" className="block text-sm font-medium text-gray-700">
                  Payer
                </label>
                <select
                  id="payerName"
                  name="payerName"
                  value={payerNameFilter}
                  onChange={(e) => handleFilterChange("payerName", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.payerName.map((payer) => (
                    <option key={payer} value={payer}>
                      {payer}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Patient State filter */}
              <div>
                <label htmlFor="patientState" className="block text-sm font-medium text-gray-700">
                  Patient State
                </label>
                <select
                  id="patientState"
                  name="patientState"
                  value={patientStateFilter}
                  onChange={(e) => handleFilterChange("patientState", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.patientState.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Insurance State filter */}
              <div>
                <label htmlFor="insuranceState" className="block text-sm font-medium text-gray-700">
                  Insurance State
                </label>
                <select
                  id="insuranceState"
                  name="insuranceState"
                  value={insuranceStateFilter}
                  onChange={(e) => handleFilterChange("insuranceState", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {filterOptions.insuranceState.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* From Date filter */}
              <div>
                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  value={fromDateFilter}
                  onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              
              {/* To Date filter */}
              <div>
                <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  value={toDateFilter}
                  onChange={(e) => handleFilterChange("toDate", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              
              {/* Reset filters button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Reset Filters
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <DataTable
              data={records}
              columns={columns}
              onExport={handleExport}
            />
          </div>
        </div>
        
        {/* Pagination controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages, currentPage + 1))}
              disabled={currentPage === pagination.totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * currentPageSize + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * currentPageSize, pagination.total)}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">First</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                  let pageNumber;
                  if (pagination.totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    // If near the start
                    pageNumber = i + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    // If near the end
                    pageNumber = pagination.totalPages - 4 + i;
                  } else {
                    // If in the middle
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNumber
                          ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={currentPage === pagination.totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Last</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}