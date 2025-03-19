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

// app/routes/metrics-debug.tsx
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
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\metrics-debug.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\metrics-debug.tsx"
  );
  import.meta.hot.lastModified = "1742375970543.47";
}
function MetricsDebug() {
  _s();
  const {
    claimSample,
    metrics,
    locGroups,
    locBreakdown
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Metrics Debug Page" }, void 0, false, {
      fileName: "app/routes/metrics-debug.tsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-md rounded-lg p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "LOC Distribution" }, void 0, false, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 92,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LOC" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 96,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Record Count" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 97,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 95,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: locBreakdown.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: item.LOC }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 102,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item._count.id }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 103,
              columnNumber: 21
            }, this)
          ] }, item.LOC, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 101,
            columnNumber: 43
          }, this)) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/metrics-debug.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-md rounded-lg p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Sample Claim Records" }, void 0, false, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 111,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LOC" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Payer" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Allowed Amount" }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 119,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 115,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 114,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: claimSample.map((claim) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: claim.id }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: claim.LOC }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: claim.payerName }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
              "$",
              claim.paymentAllowedAmount?.toFixed(2) || "N/A"
            ] }, void 0, true, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 127,
              columnNumber: 23
            }, this)
          ] }, claim.id, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 123,
            columnNumber: 45
          }, this)) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 122,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 113,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/metrics-debug.tsx",
        lineNumber: 110,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-md rounded-lg p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Calculated Metrics" }, void 0, false, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 136,
          columnNumber: 13
        }, this),
        metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6 last:mb-0", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-800 mb-2", children: [
            "LOC: ",
            metric.LOC
          ] }, void 0, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 138,
            columnNumber: 17
          }, this),
          metric.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 bg-red-50 text-red-700 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Error: ",
            metric.error
          ] }, void 0, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 140,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 139,
            columnNumber: 33
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Metric" }, void 0, false, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 145,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Value" }, void 0, false, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 146,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 144,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 143,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: "Count" }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 151,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: metric.data.countOfObservation }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 152,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 150,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: "Average Allowed Amount" }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 155,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
                  "$",
                  metric.data.averageAllowedAmount?.toFixed(2) || "N/A"
                ] }, void 0, true, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 156,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 154,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: "Min Allowed Amount" }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 159,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
                  "$",
                  metric.data.minAllowedAmount?.toFixed(2) || "N/A"
                ] }, void 0, true, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 160,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 158,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: "Max Allowed Amount" }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 163,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
                  "$",
                  metric.data.maxAllowedAmount?.toFixed(2) || "N/A"
                ] }, void 0, true, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 164,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 162,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: "Median Allowed Amount" }, void 0, false, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 167,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
                  "$",
                  metric.data.medianAllowedAmount?.toFixed(2) || "N/A"
                ] }, void 0, true, {
                  fileName: "app/routes/metrics-debug.tsx",
                  lineNumber: 168,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/metrics-debug.tsx",
                lineNumber: 166,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/metrics-debug.tsx",
              lineNumber: 149,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 142,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/metrics-debug.tsx",
            lineNumber: 141,
            columnNumber: 28
          }, this)
        ] }, metric.LOC, true, {
          fileName: "app/routes/metrics-debug.tsx",
          lineNumber: 137,
          columnNumber: 36
        }, this))
      ] }, void 0, true, {
        fileName: "app/routes/metrics-debug.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/metrics-debug.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/metrics-debug.tsx",
    lineNumber: 86,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/metrics-debug.tsx",
    lineNumber: 85,
    columnNumber: 10
  }, this);
}
_s(MetricsDebug, "wZ9n9v7H/FkTtcRh0AIj1kj3z2Y=", false, function() {
  return [useLoaderData];
});
_c = MetricsDebug;
var _c;
$RefreshReg$(_c, "MetricsDebug");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  MetricsDebug as default
};
//# sourceMappingURL=/build/routes/metrics-debug-CEQYB53V.js.map
