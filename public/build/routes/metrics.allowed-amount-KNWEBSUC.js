import {
  DashboardFilters,
  require_dataService
} from "/build/_shared/chunk-4VSQ4HN6.js";
import {
  require_prisma
} from "/build/_shared/chunk-YNNVZ6EB.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Layout
} from "/build/_shared/chunk-KLH2AQKO.js";
import {
  useLoaderData
} from "/build/_shared/chunk-W6MB5U2T.js";
import {
  createHotContext
} from "/build/_shared/chunk-QKULS72H.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/metrics.allowed-amount.tsx
var import_react = __toESM(require_react(), 1);
var import_node = __toESM(require_node(), 1);
var import_prisma = __toESM(require_prisma(), 1);
var import_dataService = __toESM(require_dataService(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\metrics.allowed-amount.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\metrics.allowed-amount.tsx"
  );
  import.meta.hot.lastModified = "1742743927845.5366";
}
var meta = () => {
  return [{
    title: "Allowed Amount Metrics - Healthcare Analytics"
  }, {
    name: "description",
    content: "View allowed amount metrics by payer class and LOC"
  }];
};
function AllowedAmountMetrics() {
  _s();
  const {
    metrics,
    filterOptions
  } = useLoaderData();
  const [currentFilters, setCurrentFilters] = (0, import_react.useState)({
    levelOfCare: null,
    payer: null,
    payerClass: null,
    stateTreatedAt: null,
    serviceYear: null,
    paymentYear: null
  });
  const handleFilterChange = (name, value) => {
    console.log(`Filter changed: ${name} = ${value}`);
    setCurrentFilters((prev) => ({
      ...prev,
      [name]: value
    }));
    const url = new URL(window.location.href);
    if (value === null) {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, String(value));
    }
    window.history.pushState({}, "", url);
    window.location.href = url.toString();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold text-gray-900", children: "Allowed Amount Metrics" }, void 0, false, {
        fileName: "app/routes/metrics.allowed-amount.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-gray-600", children: "View detailed allowed amount metrics organized by payer class and level of care" }, void 0, false, {
        fileName: "app/routes/metrics.allowed-amount.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/metrics.allowed-amount.tsx",
      lineNumber: 157,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "print:hidden", children: filterOptions && Object.keys(filterOptions).length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardFilters, { filterOptions, currentFilters, onFilterChange: handleFilterChange }, void 0, false, {
      fileName: "app/routes/metrics.allowed-amount.tsx",
      lineNumber: 166,
      columnNumber: 70
    }, this) }, void 0, false, {
      fileName: "app/routes/metrics.allowed-amount.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProjectAllowedAmount, { metrics }, void 0, false, {
      fileName: "app/routes/metrics.allowed-amount.tsx",
      lineNumber: 171,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/metrics.allowed-amount.tsx",
      lineNumber: 170,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/metrics.allowed-amount.tsx",
    lineNumber: 156,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/metrics.allowed-amount.tsx",
    lineNumber: 155,
    columnNumber: 10
  }, this);
}
_s(AllowedAmountMetrics, "CicPx6oFxKIHMf53CcVJAhG/msc=", false, function() {
  return [useLoaderData];
});
_c = AllowedAmountMetrics;
var _c;
$RefreshReg$(_c, "AllowedAmountMetrics");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AllowedAmountMetrics as default,
  meta
};
//# sourceMappingURL=/build/routes/metrics.allowed-amount-KNWEBSUC.js.map
