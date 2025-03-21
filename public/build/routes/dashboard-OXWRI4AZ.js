import {
  DashboardFilters,
  MetricsChart,
  RevenueProjection,
  require_dataService,
  require_metricsService
} from "/build/_shared/chunk-GBQ6NNBD.js";
import {
  StatsCard,
  formatCurrency,
  require_node
} from "/build/_shared/chunk-WOXSYDLU.js";
import {
  Layout
} from "/build/_shared/chunk-THKS2TCD.js";
import {
  Link,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-W6MB5U2T.js";
import {
  createHotContext
} from "/build/_shared/chunk-QKULS72H.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/dashboard.tsx
var import_react = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);
var import_dataService = __toESM(require_dataService(), 1);
var import_metricsService = __toESM(require_metricsService(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\dashboard.tsx"
  );
  import.meta.hot.lastModified = "1742542060661.8645";
}
var meta = () => {
  return [{
    title: "Dashboard - Healthcare Analytics"
  }, {
    name: "description",
    content: "Healthcare data analytics dashboard"
  }];
};
function Dashboard() {
  _s();
  const {
    dashboardStats,
    metricsStatus,
    calculationResult,
    filterOptions,
    allClaimData
  } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [currentFilters, setCurrentFilters] = (0, import_react.useState)({
    levelOfCare: null,
    payer: null,
    payerClass: null,
    stateTreatedAt: null,
    serviceYear: null,
    paymentYear: null
  });
  const [filteredClaimData, setFilteredClaimData] = (0, import_react.useState)(allClaimData || []);
  const metricsData = dashboardStats.locMetrics.map((metric) => ({
    LOC: metric.LOC,
    averageAllowedAmount: metric.averageAllowedAmount,
    minAllowedAmount: metric.minAllowedAmount,
    maxAllowedAmount: metric.maxAllowedAmount,
    medianAllowedAmount: metric.medianAllowedAmount,
    modeAllowedAmount: metric.modeAllowedAmount || metric.averageAllowedAmount
    // fallback
  }));
  const handleFilterChange = (name, value) => {
    console.log(`Filter changed: ${name} = ${value}`);
    setCurrentFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  (0, import_react.useEffect)(() => {
    if (!allClaimData || allClaimData.length === 0) {
      console.log("No claim data available for filtering");
      return;
    }
    console.log("Applying filters:", currentFilters);
    let filtered = [...allClaimData];
    if (currentFilters.levelOfCare) {
      filtered = filtered.filter((claim) => claim.levelOfCare === currentFilters.levelOfCare);
      console.log(`After levelOfCare filter: ${filtered.length} records`);
    }
    if (currentFilters.payer) {
      filtered = filtered.filter((claim) => claim.payer === currentFilters.payer);
      console.log(`After payer filter: ${filtered.length} records`);
    }
    if (currentFilters.payerClass) {
      filtered = filtered.filter((claim) => claim.payerClass === currentFilters.payerClass);
      console.log(`After payerClass filter: ${filtered.length} records`);
    }
    if (currentFilters.stateTreatedAt) {
      filtered = filtered.filter((claim) => claim.stateTreatedAt === currentFilters.stateTreatedAt);
      console.log(`After stateTreatedAt filter: ${filtered.length} records`);
    }
    if (currentFilters.serviceYear !== null) {
      filtered = filtered.filter((claim) => claim.serviceYear === currentFilters.serviceYear);
      console.log(`After serviceYear filter: ${filtered.length} records`);
    }
    if (currentFilters.paymentYear !== null) {
      filtered = filtered.filter((claim) => claim.paymentYear === currentFilters.paymentYear);
      console.log(`After paymentYear filter: ${filtered.length} records`);
    }
    console.log(`Final filtered data: ${filtered.length} records`);
    setFilteredClaimData(filtered);
  }, [allClaimData, currentFilters]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900", children: "Analytics Dashboard" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-gray-600", children: "Overview of key metrics and revenue projections from your healthcare data." }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 184,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 182,
        columnNumber: 11
      }, this),
      (isLoading || calculationResult) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 193,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 194,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 192,
          columnNumber: 19
        }, this),
        "Loading metrics..."
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 191,
        columnNumber: 28
      }, this) : calculationResult && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${calculationResult.success ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`, children: [
        calculationResult.success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 mr-2 text-green-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 199,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 198,
          columnNumber: 48
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 mr-2 text-red-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 201,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 200,
          columnNumber: 30
        }, this),
        calculationResult.success ? "Metrics calculated" : "Calculation error"
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 197,
        columnNumber: 47
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 190,
        columnNumber: 48
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 181,
      columnNumber: 9
    }, this),
    filterOptions && Object.keys(filterOptions).length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardFilters, { filterOptions, currentFilters, onFilterChange: handleFilterChange }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 209,
      columnNumber: 68
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Total Records", value: dashboardStats.totalRecords.toLocaleString(), description: "Total number of claims", icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 214,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 213,
        columnNumber: 140
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 213,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Unique Patients", value: dashboardStats.uniquePatients.toLocaleString(), description: "Distinct patient count", icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 217,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 216,
        columnNumber: 144
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Total Payments", value: formatCurrency(dashboardStats.totalPayments), description: "Sum of all payments", icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 220,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 219,
        columnNumber: 138
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 219,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Average Allowed Amount", value: formatCurrency(dashboardStats.totalAllowed / dashboardStats.totalRecords), description: "Average allowed per claim", icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 223,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 222,
        columnNumber: 181
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 222,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 212,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-8 bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MetricsChart, { data: metricsData, title: "Amount Metrics by Level of Care" }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 229,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 228,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RevenueProjection, { metrics: dashboardStats.locMetrics.map((metric) => ({
      LOC: metric.LOC,
      averageAllowedAmount: metric.averageAllowedAmount,
      minAllowedAmount: metric.minAllowedAmount,
      maxAllowedAmount: metric.maxAllowedAmount,
      medianAllowedAmount: metric.medianAllowedAmount,
      modeAllowedAmount: metric.modeAllowedAmount || metric.averageAllowedAmount,
      countOfObservation: metric.countOfObservation
    })) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 234,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 233,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "Level of Care Breakdown" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Distribution of records by level of care" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 250,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 248,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Level of Care" }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 259,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Count" }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 260,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Percentage" }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 261,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 258,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: dashboardStats.locBreakdown.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/dashboard/${item.LOC}`, className: "text-primary-600 hover:underline", children: item.LOC }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 267,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 266,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item._count.id }, void 0, false, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 269,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
              (item._count.id / dashboardStats.totalRecords * 100).toFixed(1),
              "%"
            ] }, void 0, true, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 270,
              columnNumber: 25
            }, this)
          ] }, item.LOC, true, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 265,
            columnNumber: 62
          }, this)) }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 264,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 256,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 255,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 247,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "Payer Distribution" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Top payers by number of claims" }, void 0, false, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 284,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 282,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: filteredClaimData.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center text-gray-500", children: "Payer Distribution Chart Removed" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 287,
          columnNumber: 47
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-64 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500", children: "No data available" }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 290,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 289,
          columnNumber: 26
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 246,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 180,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 179,
    columnNumber: 10
  }, this);
}
_s(Dashboard, "qWFnWLhvichAsGbDvTkDaeQX7CQ=", false, function() {
  return [useLoaderData, useNavigation];
});
_c = Dashboard;
var _c;
$RefreshReg$(_c, "Dashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Dashboard as default,
  meta
};
//# sourceMappingURL=/build/routes/dashboard-OXWRI4AZ.js.map
