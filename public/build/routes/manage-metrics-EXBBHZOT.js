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
  Form,
  useActionData,
  useLoaderData,
  useNavigation
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

// app/routes/manage-metrics.tsx
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
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\manage-metrics.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\manage-metrics.tsx"
  );
  import.meta.hot.lastModified = "1742392404994.9902";
}
function ManageMetrics() {
  _s();
  const {
    claimCount,
    metricsStatus,
    locGroups,
    metrics
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Manage Metrics" }, void 0, false, {
      fileName: "app/routes/manage-metrics.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "System Status" }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-sm font-medium text-gray-500", children: "Total Records" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 109,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "mt-1 text-2xl font-semibold text-gray-900", children: claimCount }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 110,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-sm font-medium text-gray-500", children: "LOC Groups" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "mt-1 text-2xl font-semibold text-gray-900", children: locGroups.length }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 114,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-sm font-medium text-gray-500", children: "Calculated Metrics" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "mt-1 text-2xl font-semibold text-gray-900", children: metrics.length }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 118,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-sm font-medium text-gray-500", children: "Status" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 121,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: `mt-1 text-lg font-semibold ${metricsStatus.needsCalculation ? "text-amber-600" : "text-green-600"}`, children: metricsStatus.needsCalculation ? "Needs Calculation" : "Up to Date" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 122,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 120,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/manage-metrics.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Actions" }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 133,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "action", value: "recalculate" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 135,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50", children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                fileName: "app/routes/manage-metrics.tsx",
                lineNumber: 139,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                fileName: "app/routes/manage-metrics.tsx",
                lineNumber: 140,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 138,
              columnNumber: 21
            }, this),
            "Recalculating..."
          ] }, void 0, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 137,
            columnNumber: 33
          }, this) : "Recalculate All Metrics" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 136,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-sm text-gray-500", children: "This will delete all existing metrics and recalculate them from the current data." }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 134,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 132,
        columnNumber: 11
      }, this),
      actionData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Result" }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 153,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `p-4 rounded-md ${actionData.success ? "bg-green-50" : "bg-red-50"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: actionData.success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-green-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 158,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 157,
            columnNumber: 43
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-5 w-5 text-red-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 160,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 159,
            columnNumber: 32
          }, this) }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 156,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: `text-sm font-medium ${actionData.success ? "text-green-800" : "text-red-800"}`, children: actionData.success ? "Success!" : "Error!" }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 164,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mt-2 text-sm ${actionData.success ? "text-green-700" : "text-red-700"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: actionData.message }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 168,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 167,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 163,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 155,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 152,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/manage-metrics.tsx",
      lineNumber: 130,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Current Metrics" }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 178,
        columnNumber: 11
      }, this),
      metrics.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LOC" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 183,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Count" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 184,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Avg. Allowed" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 185,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Min Allowed" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 186,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Max Allowed" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 187,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Last Updated" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 188,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 182,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 181,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: metric.LOC }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 193,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: metric.countOfObservation }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 194,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.averageAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 195,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.minAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 196,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
            "$",
            metric.maxAllowedAmount.toFixed(2)
          ] }, void 0, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 197,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(metric.updatedAt).toLocaleString() }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 198,
            columnNumber: 23
          }, this)
        ] }, metric.id, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 192,
          columnNumber: 42
        }, this)) }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 191,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 180,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 179,
        columnNumber: 33
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-8 text-center text-gray-500", children: 'No metrics have been calculated yet. Click "Recalculate All Metrics" to generate them.' }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 202,
        columnNumber: 22
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/manage-metrics.tsx",
      lineNumber: 177,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "LOC Distribution" }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 209,
        columnNumber: 11
      }, this),
      locGroups.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LOC" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 214,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Record Count" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 215,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Metrics Status" }, void 0, false, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 216,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 213,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 212,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: locGroups.map((item) => {
          const hasMetrics = metrics.some((m) => m.LOC === item.LOC);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: item.LOC }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 224,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item._count.id }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 225,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: hasMetrics ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Calculated" }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 227,
              columnNumber: 41
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800", children: "Missing" }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 229,
              columnNumber: 39
            }, this) }, void 0, false, {
              fileName: "app/routes/manage-metrics.tsx",
              lineNumber: 226,
              columnNumber: 25
            }, this)
          ] }, item.LOC, true, {
            fileName: "app/routes/manage-metrics.tsx",
            lineNumber: 223,
            columnNumber: 24
          }, this);
        }) }, void 0, false, {
          fileName: "app/routes/manage-metrics.tsx",
          lineNumber: 219,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 211,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 210,
        columnNumber: 35
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-8 text-center text-gray-500", children: "No LOC groups found in the data." }, void 0, false, {
        fileName: "app/routes/manage-metrics.tsx",
        lineNumber: 237,
        columnNumber: 22
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/manage-metrics.tsx",
      lineNumber: 208,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/manage-metrics.tsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/manage-metrics.tsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
}
_s(ManageMetrics, "bLlBC19625rtCaDd0ngdX0Z2ZJ8=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = ManageMetrics;
var _c;
$RefreshReg$(_c, "ManageMetrics");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ManageMetrics as default
};
//# sourceMappingURL=/build/routes/manage-metrics-EXBBHZOT.js.map
