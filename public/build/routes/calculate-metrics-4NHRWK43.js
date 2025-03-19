import {
  require_prisma
} from "/build/_shared/chunk-YNNVZ6EB.js";
import {
  require_metricsService
} from "/build/_shared/chunk-MLUE3U2X.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Layout
} from "/build/_shared/chunk-3MBCFYTZ.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-KUZ4X5YV.js";
import {
  createHotContext
} from "/build/_shared/chunk-L3CTGZPP.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/calculate-metrics.tsx
var import_node = __toESM(require_node(), 1);
var import_prisma = __toESM(require_prisma(), 1);
var import_metricsService = __toESM(require_metricsService(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\calculate-metrics.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\calculate-metrics.tsx"
  );
  import.meta.hot.lastModified = "1742375782115.4473";
}
function CalculateMetrics() {
  _s();
  const {
    claimCount,
    locValues,
    metricsCount,
    metrics,
    calculationResult
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Metrics Calculation" }, void 0, false, {
      fileName: "app/routes/calculate-metrics.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-md rounded-lg p-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Database Status" }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 92,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-2 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Total Claim Records:" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 94,
            columnNumber: 17
          }, this),
          " ",
          claimCount
        ] }, void 0, true, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "LOC Values Found:" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 95,
            columnNumber: 17
          }, this),
          " ",
          locValues.join(", ") || "None"
        ] }, void 0, true, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 95,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Metrics Records:" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 96,
            columnNumber: 17
          }, this),
          " ",
          metricsCount
        ] }, void 0, true, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 96,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/calculate-metrics?trigger=true", className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Calculate Metrics Now" }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 99,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/calculate-metrics.tsx",
      lineNumber: 91,
      columnNumber: 9
    }, this),
    calculationResult && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `p-4 mb-6 rounded-md ${calculationResult.success ? "bg-green-50" : "bg-red-50"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: calculationResult.success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-green-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 110,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 109,
        columnNumber: 46
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 112,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 111,
        columnNumber: 28
      }, this) }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 108,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: `text-sm font-medium ${calculationResult.success ? "text-green-800" : "text-red-800"}`, children: calculationResult.success ? "Success!" : "Error!" }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 116,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mt-2 text-sm ${calculationResult.success ? "text-green-700" : "text-red-700"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: calculationResult.message }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 120,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 119,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "-mx-2 -my-1.5 flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/dashboard", className: "bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", children: "Go to Dashboard" }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 124,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 123,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 122,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 115,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/calculate-metrics.tsx",
      lineNumber: 107,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/calculate-metrics.tsx",
      lineNumber: 106,
      columnNumber: 31
    }, this),
    metricsCount > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-md rounded-lg p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Current Metrics" }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LOC" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 139,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Count" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 140,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Avg. Allowed Amount" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 141,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Min Amount" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 142,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Max Amount" }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 143,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 138,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 137,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: metric.LOC }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 148,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: metric.countOfObservation }, void 0, false, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 149,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.averageAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 150,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.minAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 151,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.maxAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/calculate-metrics.tsx",
            lineNumber: 152,
            columnNumber: 23
          }, this)
        ] }, metric.id, true, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 147,
          columnNumber: 42
        }, this)) }, void 0, false, {
          fileName: "app/routes/calculate-metrics.tsx",
          lineNumber: 146,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 136,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/calculate-metrics.tsx",
        lineNumber: 135,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/calculate-metrics.tsx",
      lineNumber: 133,
      columnNumber: 30
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/calculate-metrics.tsx",
    lineNumber: 88,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/calculate-metrics.tsx",
    lineNumber: 87,
    columnNumber: 10
  }, this);
}
_s(CalculateMetrics, "v0eqU1zCFVNumqMFwPzGGrq1jBM=", false, function() {
  return [useLoaderData];
});
_c = CalculateMetrics;
var _c;
$RefreshReg$(_c, "CalculateMetrics");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CalculateMetrics as default
};
//# sourceMappingURL=/build/routes/calculate-metrics-4NHRWK43.js.map
