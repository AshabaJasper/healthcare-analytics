import {
  createHotContext
} from "/build/_shared/chunk-QKULS72H.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/StatsCard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\StatsCard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\StatsCard.tsx"
  );
  import.meta.hot.lastModified = "1742557552170.3933";
}
function StatsCard({
  title,
  value,
  description,
  icon,
  change
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
    icon && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 w-10 rounded-md bg-primary-500 flex items-center justify-center text-white", children: icon }, void 0, false, {
      fileName: "app/components/StatsCard.tsx",
      lineNumber: 32,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/components/StatsCard.tsx",
      lineNumber: 31,
      columnNumber: 20
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: icon ? "ml-5 w-0 flex-1" : "w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-sm font-medium text-gray-500 truncate", children: title }, void 0, false, {
        fileName: "app/components/StatsCard.tsx",
        lineNumber: 38,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-lg font-medium text-gray-900", children: value }, void 0, false, {
        fileName: "app/components/StatsCard.tsx",
        lineNumber: 42,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/StatsCard.tsx",
        lineNumber: 41,
        columnNumber: 15
      }, this),
      description && description.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "mt-1 text-sm text-gray-500", children: description }, void 0, false, {
        fileName: "app/components/StatsCard.tsx",
        lineNumber: 46,
        columnNumber: 57
      }, this),
      change && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: `mt-2 text-sm ${change.isPositive ? "text-green-600" : "text-red-600"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: [
          change.isPositive ? "+" : "",
          change.value,
          "%"
        ] }, void 0, true, {
          fileName: "app/components/StatsCard.tsx",
          lineNumber: 50,
          columnNumber: 19
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: change.isPositive ? "increase" : "decrease" }, void 0, false, {
          fileName: "app/components/StatsCard.tsx",
          lineNumber: 54,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/StatsCard.tsx",
        lineNumber: 49,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/StatsCard.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/StatsCard.tsx",
      lineNumber: 36,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/StatsCard.tsx",
    lineNumber: 30,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/StatsCard.tsx",
    lineNumber: 29,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/StatsCard.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c = StatsCard;
var _c;
$RefreshReg$(_c, "StatsCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  StatsCard
};
//# sourceMappingURL=/build/_shared/chunk-CMIXI72N.js.map
