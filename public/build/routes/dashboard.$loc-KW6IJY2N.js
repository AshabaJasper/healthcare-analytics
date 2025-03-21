import {
  StatsCard
} from "/build/_shared/chunk-CMIXI72N.js";
import {
  require_prisma
} from "/build/_shared/chunk-YNNVZ6EB.js";
import {
  formatCurrency,
  require_node
} from "/build/_shared/chunk-SQT7BTI5.js";
import {
  Layout
} from "/build/_shared/chunk-THKS2TCD.js";
import {
  Link,
  useLoaderData
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

// app/routes/dashboard.$loc.tsx
var import_react = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);
var import_prisma = __toESM(require_prisma(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\dashboard.$loc.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\dashboard.$loc.tsx"
  );
  import.meta.hot.lastModified = "1742541188511.5994";
}
var meta = ({
  params
}) => {
  return [{
    title: `${params.loc} Metrics - Healthcare Analytics`
  }, {
    name: "description",
    content: `Detailed metrics for Level of Care: ${params.loc}`
  }];
};
function LocDetailsPage() {
  _s();
  const {
    loc,
    metrics,
    claims,
    payerBreakdown,
    stateBreakdown,
    totalClaims
  } = useLoaderData();
  const [days, setDays] = (0, import_react.useState)(loc === "DTX" ? 7 : loc === "RTC" ? 21 : loc === "PHP" ? 18 : loc === "IOP" ? 30 : 0);
  const projectedRevenue = days * (metrics.averageAllowedAmount || 0);
  const monthlyRevenue = projectedRevenue * 30 / (days || 1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/dashboard", className: "text-primary-600 hover:text-primary-900 font-medium", children: "\u2190 Back to Dashboard" }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900 mt-2", children: [
        loc,
        " Metrics"
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-gray-600", children: [
        "Detailed metrics and analysis for level of care: ",
        loc
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 154,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.$loc.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Total Claims", value: totalClaims.toLocaleString(), description: `Total number of ${loc} claims` }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Average Allowed Amount", value: formatCurrency(metrics.averageAllowedAmount || 0), description: "Average amount allowed per claim" }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Min/Max Range", value: `${formatCurrency(metrics.minAllowedAmount || 0)} - ${formatCurrency(metrics.maxAllowedAmount || 0)}`, description: "Range of allowed amounts" }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCard, { title: "Median Allowed Amount", value: formatCurrency(metrics.medianAllowedAmount || 0), description: "Median amount allowed per claim" }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 164,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.$loc.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: [
          loc,
          " Revenue Projection"
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Estimated revenue based on average allowed amount and treatment days" }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "days", className: "block text-sm font-medium text-gray-700", children: "Treatment Days" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 178,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", id: "days", min: "0", value: days, onChange: (e) => setDays(parseInt(e.target.value) || 0), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700", children: "Average Allowed Amount" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm sm:text-sm", children: formatCurrency(metrics.averageAllowedAmount || 0) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 187,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700", children: "Projected Revenue" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 192,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-medium text-primary-700 shadow-sm sm:text-sm", children: formatCurrency(projectedRevenue) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 195,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 191,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700", children: "Monthly Revenue" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 200,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-medium text-primary-700 shadow-sm sm:text-sm", children: formatCurrency(monthlyRevenue) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 199,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 176,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 175,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.$loc.tsx",
      lineNumber: 168,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "Payer Breakdown" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 215,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: [
            "Distribution by payer for ",
            loc,
            " claims"
          ] }, void 0, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 216,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 214,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: payerBreakdown && payerBreakdown.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Payer" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 225,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Count" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 228,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Percentage" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 231,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 224,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 223,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: payerBreakdown.sort((a, b) => b._count.id - a._count.id).slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: item.payerName }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 238,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item._count.id }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 241,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
              (item._count.id / totalClaims * 100).toFixed(1),
              "%"
            ] }, void 0, true, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 244,
              columnNumber: 27
            }, this)
          ] }, item.payerName, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 237,
            columnNumber: 106
          }, this)) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 236,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 222,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 221,
          columnNumber: 62
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-4 text-center text-gray-500", children: "No payer data available" }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 250,
          columnNumber: 26
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 213,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "State Breakdown" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 257,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: [
            "Distribution by patient state for ",
            loc,
            " claims"
          ] }, void 0, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 256,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: stateBreakdown && stateBreakdown.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "State" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 267,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Count" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 270,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Percentage" }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 273,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 266,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 265,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: stateBreakdown.sort((a, b) => b._count.id - a._count.id).slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: item.patientState }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 280,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: item._count.id }, void 0, false, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 283,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
              (item._count.id / totalClaims * 100).toFixed(1),
              "%"
            ] }, void 0, true, {
              fileName: "app/routes/dashboard.$loc.tsx",
              lineNumber: 286,
              columnNumber: 27
            }, this)
          ] }, item.patientState, true, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 279,
            columnNumber: 106
          }, this)) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 278,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 264,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 263,
          columnNumber: 62
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-4 text-center text-gray-500", children: "No state data available" }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 292,
          columnNumber: 26
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 262,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 255,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.$loc.tsx",
      lineNumber: 212,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: [
          "Recent ",
          loc,
          " Claims"
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Most recent claims for this level of care" }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 301,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 299,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 sm:p-6", children: claims && claims.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Practice" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 310,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Payer" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 313,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Allowed Amount" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 316,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Payment" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 319,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Service Date" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 322,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 309,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 308,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: claims.map((claim) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: claim.practiceName || "-" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 329,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: claim.payerName || "-" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 332,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatCurrency(claim.paymentAllowedAmount || 0) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 335,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatCurrency(claim.paymentTotalPaid || 0) }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 338,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: claim.chargeFromDate ? new Date(claim.chargeFromDate).toLocaleDateString() : "-" }, void 0, false, {
            fileName: "app/routes/dashboard.$loc.tsx",
            lineNumber: 341,
            columnNumber: 25
          }, this)
        ] }, claim.id, true, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 328,
          columnNumber: 42
        }, this)) }, void 0, false, {
          fileName: "app/routes/dashboard.$loc.tsx",
          lineNumber: 327,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 307,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 306,
        columnNumber: 44
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-4 text-center text-gray-500", children: "No recent claims available" }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 347,
        columnNumber: 24
      }, this) }, void 0, false, {
        fileName: "app/routes/dashboard.$loc.tsx",
        lineNumber: 305,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/dashboard.$loc.tsx",
      lineNumber: 298,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/dashboard.$loc.tsx",
    lineNumber: 146,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard.$loc.tsx",
    lineNumber: 145,
    columnNumber: 10
  }, this);
}
_s(LocDetailsPage, "Xs0kMJ4TWT4K5OGWFvnF44F2ekg=", false, function() {
  return [useLoaderData];
});
_c = LocDetailsPage;
var _c;
$RefreshReg$(_c, "LocDetailsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LocDetailsPage as default,
  meta
};
//# sourceMappingURL=/build/routes/dashboard.$loc-KW6IJY2N.js.map
