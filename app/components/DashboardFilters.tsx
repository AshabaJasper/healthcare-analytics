import { useState, useEffect } from "react";

interface DashboardFiltersProps {
  filterOptions: {
    levelOfCare: string[];
    payer: string[];
    payerClass: string[];
    stateTreatedAt: string[];
    serviceYears: number[];
    paymentYears: number[];
  };
  currentFilters: {
    levelOfCare?: string | null;
    payer?: string | null;
    payerClass?: string | null;
    stateTreatedAt?: string | null;
    serviceYear?: number | null;
    paymentYear?: number | null;
  };
  onFilterChange: (name: string, value: string | number | null) => void;
}

export default function DashboardFilters({
  filterOptions,
  currentFilters,
  onFilterChange,
}: DashboardFiltersProps) {
  // Add debugging effect to log when filter options change
  useEffect(() => {
    console.log("DashboardFilters component received filter options:", {
      levelOfCare: filterOptions.levelOfCare?.length || 0,
      payer: filterOptions.payer?.length || 0,
      payerClass: filterOptions.payerClass?.length || 0,
      stateTreatedAt: filterOptions.stateTreatedAt?.length || 0,
      serviceYears: filterOptions.serviceYears?.length || 0,
      paymentYears: filterOptions.paymentYears?.length || 0,
    });
  }, [filterOptions]);

  const handleResetFilters = () => {
    console.log("Resetting all filters");
    onFilterChange("levelOfCare", null);
    onFilterChange("payer", null);
    onFilterChange("payerClass", null);
    onFilterChange("stateTreatedAt", null);
    onFilterChange("serviceYear", null);
    onFilterChange("paymentYear", null);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Dashboard Filters</h2>
        <button
          type="button"
          onClick={handleResetFilters}
          className="text-sm text-blue-500 hover:underline"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Level of Care Filter */}
        <div>
          <label htmlFor="levelOfCare" className="block text-sm font-medium text-gray-700">
            Level of Care
          </label>
          <select
            id="levelOfCare"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={currentFilters.levelOfCare || ""}
            onChange={(e) => {
              const value = e.target.value || null;
              console.log(`Changed levelOfCare filter to: ${value}`);
              onFilterChange("levelOfCare", value);
            }}
          >
            <option value="">All</option>
            {Array.isArray(filterOptions.levelOfCare) && filterOptions.levelOfCare.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        
        {/* Payer Filter */}
        <div>
          <label htmlFor="payer" className="block text-sm font-medium text-gray-700">
            Payer
          </label>
          <select
            id="payer"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={currentFilters.payer || ""}
            onChange={(e) => {
              const value = e.target.value || null;
              console.log(`Changed payer filter to: ${value}`);
              onFilterChange("payer", value);
            }}
          >
            <option value="">All</option>
            {Array.isArray(filterOptions.payer) && filterOptions.payer.map((payer) => (
              <option key={payer} value={payer}>
                {payer}
              </option>
            ))}
          </select>
        </div>
        
        {/* Payer Class Filter */}
        {Array.isArray(filterOptions.payerClass) && filterOptions.payerClass.length > 0 && (
          <div>
            <label htmlFor="payerClass" className="block text-sm font-medium text-gray-700">
              Payer Class
            </label>
            <select
              id="payerClass"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={currentFilters.payerClass || ""}
              onChange={(e) => {
                const value = e.target.value || null;
                console.log(`Changed payerClass filter to: ${value}`);
                onFilterChange("payerClass", value);
              }}
            >
              <option value="">All</option>
              {filterOptions.payerClass.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* State Treated At Filter */}
        <div>
          <label htmlFor="stateTreatedAt" className="block text-sm font-medium text-gray-700">
            State Treated At
          </label>
          <select
            id="stateTreatedAt"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={currentFilters.stateTreatedAt || ""}
            onChange={(e) => {
              const value = e.target.value || null;
              console.log(`Changed stateTreatedAt filter to: ${value}`);
              onFilterChange("stateTreatedAt", value);
            }}
          >
            <option value="">All</option>
            {Array.isArray(filterOptions.stateTreatedAt) && filterOptions.stateTreatedAt.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        
        {/* Service Year Filter */}
        <div>
          <label htmlFor="serviceYear" className="block text-sm font-medium text-gray-700">
            Service Year
          </label>
          <select
            id="serviceYear"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={currentFilters.serviceYear || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              console.log(`Changed serviceYear filter to: ${value}`);
              onFilterChange("serviceYear", value);
            }}
          >
            <option value="">All</option>
            {Array.isArray(filterOptions.serviceYears) && filterOptions.serviceYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        {/* Payment Year Filter */}
        <div>
          <label htmlFor="paymentYear" className="block text-sm font-medium text-gray-700">
            Payment Year
          </label>
          <select
            id="paymentYear"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={currentFilters.paymentYear || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              console.log(`Changed paymentYear filter to: ${value}`);
              onFilterChange("paymentYear", value);
            }}
          >
            <option value="">All</option>
            {Array.isArray(filterOptions.paymentYears) && filterOptions.paymentYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}