import {
  createHotContext
} from "/build/_shared/chunk-QKULS72H.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/services/dataService.server
var require_dataService = __commonJS({
  "empty-module:~/services/dataService.server"(exports, module) {
    module.exports = {};
  }
});

// app/components/DashboardFilters.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\DashboardFilters.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\DashboardFilters.tsx"
  );
  import.meta.hot.lastModified = "1742557068294.3628";
}
function DashboardFilters({
  filterOptions,
  currentFilters,
  onFilterChange
}) {
  _s();
  (0, import_react.useEffect)(() => {
    console.log("DashboardFilters component received filter options:", {
      levelOfCare: filterOptions.levelOfCare?.length || 0,
      payer: filterOptions.payer?.length || 0,
      payerClass: filterOptions.payerClass?.length || 0,
      stateTreatedAt: filterOptions.stateTreatedAt?.length || 0,
      serviceYears: filterOptions.serviceYears?.length || 0,
      paymentYears: filterOptions.paymentYears?.length || 0
    });
  }, [filterOptions]);
  const sortedLOCOptions = [...filterOptions.levelOfCare || []];
  const locOrder = ["DTX", "RTC", "PHP", "IOP"];
  sortedLOCOptions.sort((a, b) => {
    const indexA = locOrder.indexOf(a);
    const indexB = locOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1)
      return -1;
    if (indexB !== -1)
      return 1;
    return a.localeCompare(b);
  });
  const handleResetFilters = () => {
    console.log("Resetting all filters");
    onFilterChange("levelOfCare", null);
    onFilterChange("payer", null);
    onFilterChange("payerClass", null);
    onFilterChange("stateTreatedAt", null);
    onFilterChange("serviceYear", null);
    onFilterChange("paymentYear", null);
  };
  const activeFilterCount = Object.values(currentFilters).filter((v) => v !== null).length;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow mb-6 p-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium text-gray-900", children: "Dashboard Filters" }, void 0, false, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleResetFilters, className: "flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-4 w-4 mr-1.5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        "Reset Filters (",
        activeFilterCount,
        ")"
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 73,
        columnNumber: 35
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/DashboardFilters.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "levelOfCare", className: "block text-sm font-medium text-gray-700", children: "Level of Care" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "levelOfCare", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.levelOfCare || "", onChange: (e) => {
          const value = e.target.value || null;
          console.log(`Changed levelOfCare filter to: ${value}`);
          onFilterChange("levelOfCare", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this),
          sortedLOCOptions.map((loc) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: loc, children: loc }, loc, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 92,
            columnNumber: 42
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "payer", className: "block text-sm font-medium text-gray-700", children: "Payer" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "payer", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.payer || "", onChange: (e) => {
          const value = e.target.value || null;
          console.log(`Changed payer filter to: ${value}`);
          onFilterChange("payer", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 108,
            columnNumber: 13
          }, this),
          Array.isArray(filterOptions.payer) && filterOptions.payer.map((payer) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: payer, children: payer }, payer, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 109,
            columnNumber: 85
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 103,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      Array.isArray(filterOptions.payerClass) && filterOptions.payerClass.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "payerClass", className: "block text-sm font-medium text-gray-700", children: "Payer Class" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 117,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "payerClass", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.payerClass || "", onChange: (e) => {
          const value = e.target.value || null;
          console.log(`Changed payerClass filter to: ${value}`);
          onFilterChange("payerClass", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 125,
            columnNumber: 15
          }, this),
          filterOptions.payerClass.map((cls) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: cls, children: cls }, cls, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 126,
            columnNumber: 52
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 120,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 116,
        columnNumber: 92
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "stateTreatedAt", className: "block text-sm font-medium text-gray-700", children: "State Treated At" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "stateTreatedAt", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.stateTreatedAt || "", onChange: (e) => {
          const value = e.target.value || null;
          console.log(`Changed stateTreatedAt filter to: ${value}`);
          onFilterChange("stateTreatedAt", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this),
          Array.isArray(filterOptions.stateTreatedAt) && filterOptions.stateTreatedAt.map((state) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: state, children: state }, state, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 143,
            columnNumber: 103
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "serviceYear", className: "block text-sm font-medium text-gray-700", children: "Service Year" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "serviceYear", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.serviceYear || "", onChange: (e) => {
          const value = e.target.value ? parseInt(e.target.value) : null;
          console.log(`Changed serviceYear filter to: ${value}`);
          onFilterChange("serviceYear", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this),
          Array.isArray(filterOptions.serviceYears) && filterOptions.serviceYears.map((year) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: year, children: year }, year, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 160,
            columnNumber: 98
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "paymentYear", className: "block text-sm font-medium text-gray-700", children: "Payment Year" }, void 0, false, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "paymentYear", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm", value: currentFilters.paymentYear || "", onChange: (e) => {
          const value = e.target.value ? parseInt(e.target.value) : null;
          console.log(`Changed paymentYear filter to: ${value}`);
          onFilterChange("paymentYear", value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All" }, void 0, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this),
          Array.isArray(filterOptions.paymentYears) && filterOptions.paymentYears.map((year) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: year, children: year }, year, false, {
            fileName: "app/components/DashboardFilters.tsx",
            lineNumber: 177,
            columnNumber: 98
          }, this))
        ] }, void 0, true, {
          fileName: "app/components/DashboardFilters.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/DashboardFilters.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/DashboardFilters.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/DashboardFilters.tsx",
    lineNumber: 70,
    columnNumber: 10
  }, this);
}
_s(DashboardFilters, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = DashboardFilters;
var _c;
$RefreshReg$(_c, "DashboardFilters");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  DashboardFilters,
  require_dataService
};
//# sourceMappingURL=/build/_shared/chunk-4VSQ4HN6.js.map
