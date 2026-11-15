function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = z$1 && a2[z$1] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a2, b, e) {
  this.props = a2;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a2, b) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b, "setState");
};
E$1.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a2, b, e) {
  this.props = a2;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a2, b, e) {
  var d, c2 = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c2[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c2.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps) for (d in g = a2.defaultProps, g) void 0 === c2[d] && (c2[d] = g[d]);
  return { $$typeof: l$1, type: a2, key: k2, ref: h, props: c2, _owner: K$1.current };
}
function N$1(a2, b) {
  return { $$typeof: l$1, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$1(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$1;
}
function escape$1(a2) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b[a3];
  });
}
var P$1 = /\/+/g;
function Q$1(a2, b) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape$1("" + a2.key) : b.toString(36);
}
function R$1(a2, b, e, d, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2) a2 = null;
  var h = false;
  if (null === a2) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a2.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a2, c2 = c2(h), a2 = "" === d ? "." + Q$1(h, 0) : d, I$1(c2) ? (e = "", null != a2 && (e = a2.replace(P$1, "$&/") + "/"), R$1(c2, b, e, "", function(a3) {
    return a3;
  })) : null != c2 && (O$1(c2) && (c2 = N$1(c2, e + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a2)), b.push(c2)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a2)) for (var g = 0; g < a2.length; g++) {
    k2 = a2[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c2);
  }
  else if (f2 = A$1(a2), "function" === typeof f2) for (a2 = f2.call(a2), g = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c2);
  else if ("object" === k2) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a2, b, e) {
  if (null == a2) return a2;
  var d = [], c2 = 0;
  R$1(a2, d, "", "", function(a3) {
    return b.call(e, a3, c2++);
  });
  return d;
}
function T$1(a2) {
  if (-1 === a2._status) {
    var b = a2._result;
    b = b();
    b.then(function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
    }, function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b);
  }
  if (1 === a2._status) return a2._result.default;
  throw a2._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a2, b, e) {
  S$1(a2, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a2) {
  var b = 0;
  S$1(a2, function() {
    b++;
  });
  return b;
}, toArray: function(a2) {
  return S$1(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$1(a2)) throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a2, b, e) {
  if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d = C$1({}, a2.props), c2 = a2.key, k2 = a2.ref, h = a2._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c2 = "" + b.key);
    if (a2.type && a2.type.defaultProps) var g = a2.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a2.type, key: c2, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a2) {
  var b = M$1.bind(null, a2);
  b.type = a2;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$1, render: a2 };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T$1 };
};
react_production_min.memo = function(a2, b) {
  return { $$typeof: x$2, type: a2, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a2) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a2();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a2, b) {
  return U$1.current.useCallback(a2, b);
};
react_production_min.useContext = function(a2) {
  return U$1.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$1.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b) {
  return U$1.current.useEffect(a2, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b, e) {
  return U$1.current.useImperativeHandle(a2, b, e);
};
react_production_min.useInsertionEffect = function(a2, b) {
  return U$1.current.useInsertionEffect(a2, b);
};
react_production_min.useLayoutEffect = function(a2, b) {
  return U$1.current.useLayoutEffect(a2, b);
};
react_production_min.useMemo = function(a2, b) {
  return U$1.current.useMemo(a2, b);
};
react_production_min.useReducer = function(a2, b, e) {
  return U$1.current.useReducer(a2, b, e);
};
react_production_min.useRef = function(a2) {
  return U$1.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$1.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b, e) {
  return U$1.current.useSyncExternalStore(a2, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a2.key && (e = "" + a2.key);
  void 0 !== a2.ref && (h = a2.ref);
  for (b in a2) m$2.call(a2, b) && !p$1.hasOwnProperty(b) && (d[b] = a2[b]);
  if (c2 && c2.defaultProps) for (b in a2 = c2.defaultProps, a2) void 0 === d[b] && (d[b] = a2[b]);
  return { $$typeof: k, type: c2, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b) {
    var c2 = a2.length;
    a2.push(b);
    a: for (; 0 < c2; ) {
      var d = c2 - 1 >>> 1, e = a2[d];
      if (0 < g(e, b)) a2[d] = b, a2[c2] = e, c2 = d;
      else break a;
    }
  }
  function h(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length) return null;
    var b = a2[0], c2 = a2.pop();
    if (c2 !== b) {
      a2[0] = c2;
      a: for (var d = 0, e = a2.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
        if (0 > g(C2, c2)) n2 < e && 0 > g(x2, C2) ? (a2[d] = x2, a2[n2] = c2, d = n2) : (a2[d] = C2, a2[m2] = c2, d = m2);
        else if (n2 < e && 0 > g(x2, c2)) a2[d] = x2, a2[n2] = c2, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a2, b) {
    var c2 = a2.sortIndex - b.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a2) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a2);
    }
  }
  function J2(a2, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a2 && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b = true;
      try {
        b = O2(true, a2);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c2 = y2;
    y2 = b;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b, c2) {
    var d = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d + c2 : d) : c2 = d;
    switch (a2) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c2 + e;
    a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e, sortIndex: -1 };
    c2 > d ? (a2.sortIndex = c2, f2(t2, a2), null === h(r2) && a2 === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d))) : (a2.sortIndex = e, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b = y2;
    return function() {
      var c2 = y2;
      y2 = b;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b) {
  ha(a2, b);
  ha(a2 + "Capture", b);
}
function ha(a2, b) {
  ea[a2] = b;
  for (a2 = 0; a2 < b.length; a2++) da.add(b[a2]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2)) return true;
  if (ja.call(la, a2)) return false;
  if (ka.test(a2)) return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b, c2, d) {
  if (null !== c2 && 0 === c2.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c2) return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa(a2, b, c2, d) {
  if (null === b || "undefined" === typeof b || pa(a2, b, c2, d)) return true;
  if (d) return false;
  if (null !== c2) switch (c2.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a2, b, c2, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new v(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  z[b] = new v(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new v(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new v(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new v(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new v(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new v(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new v(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new v(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b, c2, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c2, e, d) && (c2 = null), d || null === e ? oa(b) && (null === c2 ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e.mustUseProperty ? a2[e.propertyName] = null === c2 ? 3 === e.type ? false : "" : c2 : (b = e.attributeName, d = e.attributeNamespace, null === c2 ? a2.removeAttribute(b) : (e = e.type, c2 = 3 === e || 4 === e && true === c2 ? "" : "" + c2, d ? a2.setAttributeNS(d, b, c2) : a2.setAttribute(b, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A = Object.assign, La;
function Ma(a2) {
  if (void 0 === La) try {
    throw Error();
  } catch (c2) {
    var b = c2.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b) {
  if (!a2 || Na) return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a2, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a2.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Ca:
      return (a2.displayName || "Context") + ".Consumer";
    case Ba:
      return (a2._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case Ga:
      return b = a2.displayName || null, null !== b ? b : Qa(a2.type) || "Memo";
    case Ha:
      b = a2._payload;
      a2 = a2._init;
      try {
        return Qa(a2(b));
      } catch (c2) {
      }
  }
  return null;
}
function Ra(a2) {
  var b = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a2) {
  var b = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d = "" + a2[b];
  if (!a2.hasOwnProperty(b) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a3) {
      d = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a3) {
      d = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2) return false;
  var b = a2._valueTracker;
  if (!b) return true;
  var c2 = b.getValue();
  var d = "";
  a2 && (d = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d;
  return a2 !== c2 ? (b.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2) return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b) {
    return a2.body;
  }
}
function Ya(a2, b) {
  var c2 = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b) {
  var c2 = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c2 = Sa(null != b.value ? b.value : c2);
  a2._wrapperState = { initialChecked: d, initialValue: c2, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a2, b) {
  b = b.checked;
  null != b && ta(a2, "checked", b, false);
}
function bb(a2, b) {
  ab(a2, b);
  var c2 = Sa(b.value), d = b.type;
  if (null != c2) if ("number" === d) {
    if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
  } else a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d || "reset" === d) {
    a2.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
}
function db(a2, b, c2) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a2._wrapperState.initialValue;
    c2 || b === a2.value || (a2.value = b);
    a2.defaultValue = b;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb(a2, b, c2) {
  if ("number" !== b || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b, c2, d) {
  a2 = a2.options;
  if (b) {
    b = {};
    for (var e = 0; e < c2.length; e++) b["$" + c2[e]] = true;
    for (c2 = 0; c2 < a2.length; c2++) e = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e && (a2[c2].selected = e), e && d && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b = null;
    for (e = 0; e < a2.length; e++) {
      if (a2[e].value === c2) {
        a2[e].selected = true;
        d && (a2[e].defaultSelected = true);
        return;
      }
      null !== b || a2[e].disabled || (b = a2[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a2, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b) {
  var c2 = b.value;
  if (null == c2) {
    c2 = b.children;
    b = b.defaultValue;
    if (null != c2) {
      if (null != b) throw Error(p(92));
      if (eb(c2)) {
        if (1 < c2.length) throw Error(p(93));
        c2 = c2[0];
      }
      b = c2;
    }
    null == b && (b = "");
    c2 = b;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b) {
  var c2 = Sa(b.value), d = Sa(b.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d && (a2.defaultValue = "" + d);
}
function jb(a2) {
  var b = a2.textContent;
  b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c2, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b, c2, d, e);
    });
  } : a2;
}(function(a2, b) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
    for (; b.firstChild; ) a2.appendChild(b.firstChild);
  }
});
function ob(a2, b) {
  if (b) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b;
      return;
    }
  }
  a2.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b] = pb[a2];
  });
});
function rb(a2, b, c2) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c2 || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
}
function sb(a2, b) {
  a2 = a2.style;
  for (var c2 in b) if (b.hasOwnProperty(c2)) {
    var d = 0 === c2.indexOf("--"), e = rb(c2, b[c2], d);
    "float" === c2 && (c2 = "cssFloat");
    d ? a2.setProperty(c2, e) : a2[c2] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b) {
  if (b) {
    if (tb[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a2));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a2, b) {
  if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a2.stateNode;
    b && (b = Db(b), yb(a2.stateNode, a2.type, b));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b) for (a2 = 0; a2 < b.length; a2++) Bb(b[a2]);
  }
}
function Gb(a2, b) {
  return a2(b);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b, c2) {
  if (Ib) return a2(b, c2);
  Ib = true;
  try {
    return Gb(a2, b, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a2, b) {
  var c2 = a2.stateNode;
  if (null === c2) return null;
  var d = Db(c2);
  if (null === d) return null;
  c2 = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a2 = a2.type, d = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
      a2 = !d;
      break a;
    default:
      a2 = false;
  }
  if (a2) return null;
  if (c2 && "function" !== typeof c2) throw Error(p(231, b, typeof c2));
  return c2;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a2) {
  Lb = false;
}
function Nb(a2, b, c2, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b, c2, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b, c2, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b = a2, c2 = a2;
  if (a2.alternate) for (; b.return; ) b = b.return;
  else {
    a2 = b;
    do
      b = a2, 0 !== (b.flags & 4098) && (c2 = b.return), a2 = b.return;
    while (a2);
  }
  return 3 === b.tag ? c2 : null;
}
function Wb(a2) {
  if (13 === a2.tag) {
    var b = a2.memoizedState;
    null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2) throw Error(p(188));
}
function Yb(a2) {
  var b = a2.alternate;
  if (!b) {
    b = Vb(a2);
    if (null === b) throw Error(p(188));
    return b !== a2 ? null : a2;
  }
  for (var c2 = a2, d = b; ; ) {
    var e = c2.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c2 = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c2) return Xb(e), a2;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c2.return !== d.return) c2 = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c2) {
          g = true;
          c2 = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c2 = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c2) {
            g = true;
            c2 = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c2 = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c2.alternate !== d) throw Error(p(190));
  }
  if (3 !== c2.tag) throw Error(p(188));
  return c2.stateNode.current === c2 ? a2 : b;
}
function Zb(a2) {
  a2 = Yb(a2);
  return null !== a2 ? $b(a2) : null;
}
function $b(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b = $b(a2);
    if (null !== b) return b;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b) {
  var c2 = a2.pendingLanes;
  if (0 === c2) return 0;
  var d = 0, e = a2.suspendedLanes, f2 = a2.pingedLanes, g = c2 & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c2 & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c2 & 16);
  b = a2.entangledLanes;
  if (0 !== b) for (a2 = a2.entanglements, b &= d; 0 < b; ) c2 = 31 - oc(b), e = 1 << c2, d |= a2[c2], b &= ~e;
  return d;
}
function vc(a2, b) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b) {
  for (var c2 = a2.suspendedLanes, d = a2.pingedLanes, e = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c2) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a2.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b = [], c2 = 0; 31 > c2; c2++) b.push(a2);
  return b;
}
function Ac(a2, b, c2) {
  a2.pendingLanes |= b;
  536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b = 31 - oc(b);
  a2[b] = c2;
}
function Bc(a2, b) {
  var c2 = a2.pendingLanes & ~b;
  a2.pendingLanes = b;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b;
  a2.mutableReadLanes &= b;
  a2.entangledLanes &= b;
  b = a2.entanglements;
  var d = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e = 31 - oc(c2), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a2[e] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b) {
  var c2 = a2.entangledLanes |= b;
  for (a2 = a2.entanglements; c2; ) {
    var d = 31 - oc(c2), e = 1 << d;
    e & b | a2[d] & b && (a2[d] |= b);
    c2 &= ~e;
  }
}
var C = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a2, b, c2, d, e, f2) {
  if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a2;
  a2.eventSystemFlags |= d;
  b = a2.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a2;
}
function Uc(a2, b, c2, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a2, b, c2, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b, c2, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b, c2, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c2, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c2, d, e)), true;
  }
  return false;
}
function Vc(a2) {
  var b = Wc(a2.target);
  if (null !== b) {
    var c2 = Vb(b);
    if (null !== c2) {
      if (b = c2.tag, 13 === b) {
        if (b = Wb(c2), null !== b) {
          a2.blockedOn = b;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (null !== a2.blockedOn) return false;
  for (var b = a2.targetContainers; 0 < b.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d = new c2.constructor(c2.type, c2);
      wb = d;
      c2.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c2), null !== b && Fc(b), a2.blockedOn = c2, false;
    b.shift();
  }
  return true;
}
function Zc(a2, b, c2) {
  Xc(a2) && c2.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b) {
  a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b(b2) {
    return ad(b2, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d = Kc[c2];
      d.blockedOn === a2 && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a2);
  null !== Mc && ad(Mc, a2);
  null !== Nc && ad(Nc, a2);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c2 = 0; c2 < Qc.length; c2++) d = Qc[c2], d.blockedOn === a2 && (d.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b, c2, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a2, b, c2, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a2, b, c2, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a2, b, c2, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a2, b, c2, d) {
  if (dd) {
    var e = Yc(a2, b, c2, d);
    if (null === e) hd(a2, b, d, id, c2), Sc(a2, d);
    else if (Uc(e, a2, b, c2, d)) d.stopPropagation();
    else if (Sc(a2, d), b & 4 && -1 < Rc.indexOf(a2)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a2, b, c2, d);
        null === f2 && hd(a2, b, d, id, c2);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a2, b, d, null, c2);
  }
}
var id = null;
function Yc(a2, b, c2, d) {
  id = null;
  a2 = xb(d);
  a2 = Wc(a2);
  if (null !== a2) if (b = Vb(a2), null === b) a2 = null;
  else if (c2 = b.tag, 13 === c2) {
    a2 = Wb(b);
    if (null !== a2) return a2;
    a2 = null;
  } else if (3 === c2) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a2 = null;
  } else b !== a2 && (a2 = null);
  id = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md$2 = null;
function nd() {
  if (md$2) return md$2;
  var a2, b = ld, c2 = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a2 = 0; a2 < c2 && b[a2] === e[a2]; a2++) ;
  var g = c2 - a2;
  for (d = 1; d <= g && b[c2 - d] === e[f2 - d]; d++) ;
  return md$2 = e.slice(a2, 1 < d ? 1 - d : void 0);
}
function od(a2) {
  var b = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c2 in a2) a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2) return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a2) {
  if (a2.key) {
    var b = Md[a2.key] || a2.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a2, b) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b) {
  switch (a2) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b) {
  if (ie) return "compositionend" === a2 || !ae && ge(a2, b) ? (a2 = nd(), md$2 = ld = kd = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b ? !!le[a2.type] : "textarea" === b ? true : false;
}
function ne(a2, b, c2, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({ event: c2, listeners: b }));
}
var pe = null, qe = null;
function re(a2) {
  se(a2, 0);
}
function te(a2) {
  var b = ue(a2);
  if (Wa(b)) return a2;
}
function ve(a2, b) {
  if ("change" === a2) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a2, xb(a2));
    Jb(re, b);
  }
}
function Ce(a2, b, c2) {
  "focusin" === a2 ? (Ae(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
}
function De(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
}
function Ee(a2, b) {
  if ("click" === a2) return te(b);
}
function Fe(a2, b) {
  if ("input" === a2 || "change" === a2) return te(b);
}
function Ge(a2, b) {
  return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a2, b) {
  if (He(a2, b)) return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
  var c2 = Object.keys(a2), d = Object.keys(b);
  if (c2.length !== d.length) return false;
  for (d = 0; d < c2.length; d++) {
    var e = c2[d];
    if (!ja.call(b, e) || !He(a2[e], b[e])) return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d; c2; ) {
    if (3 === c2.nodeType) {
      d = a2 + c2.textContent.length;
      if (a2 <= b && d >= b) return { node: c2, offset: b - a2 };
      a2 = d;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b) {
  return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c2 = false;
    }
    if (c2) a2 = b.contentWindow;
    else break;
    b = Xa(a2.document);
  }
  return b;
}
function Ne(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b = Me(), c2 = a2.focusedElem, d = a2.selectionRange;
  if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d && Ne(c2)) {
      if (b = d.start, a2 = d.end, void 0 === a2 && (a2 = b), "selectionStart" in c2) c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e = c2.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a2.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c2, f2);
        var g = Ke(
          c2,
          d
        );
        e && g && (1 !== a2.rangeCount || a2.anchorNode !== e.node || a2.anchorOffset !== e.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a2.removeAllRanges(), f2 > d ? (a2.addRange(b), a2.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a2.addRange(b)));
      }
    }
    b = [];
    for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b.length; c2++) a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a2, b, c2) {
  var d = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a2, b) {
  var c2 = {};
  c2[a2.toLowerCase()] = b.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b;
  c2["Moz" + a2] = "moz" + b;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2]) return Xe[a2];
  if (!We[a2]) return a2;
  var b = We[a2], c2;
  for (c2 in b) if (b.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b) {
  df.set(a2, b);
  fa(b, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b, c2) {
  var d = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d, b, void 0, a2);
  a2.currentTarget = null;
}
function se(a2, b) {
  b = 0 !== (b & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d = a2[c2], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D(a2, b) {
  var c2 = b[of];
  void 0 === c2 && (c2 = b[of] = /* @__PURE__ */ new Set());
  var d = a2 + "__bubble";
  c2.has(d) || (pf(b, a2, 2, false), c2.add(d));
}
function qf(a2, b, c2) {
  var d = 0;
  b && (d |= 4);
  pf(c2, a2, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
    });
    var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a2, b, c2, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c2 = e.bind(null, b, c2, a2);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a2.addEventListener(b, c2, { capture: true, passive: e }) : a2.addEventListener(b, c2, true) : void 0 !== e ? a2.addEventListener(b, c2, { passive: e }) : a2.addEventListener(b, c2, false);
}
function hd(a2, b, c2, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c2), g2 = [];
    a: {
      var h2 = df.get(a2);
      if (void 0 !== h2) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c2, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h2 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c2, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c2, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a2, d2))) {
          ne(g2, na, c2, e2);
          break a;
        }
        xa && xa(a2, h2, d2);
        "focusout" === a2 && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a2) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c2, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c2, e2);
      }
      var $a;
      if (ae) b: {
        switch (a2) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a2, c2) : ke(a2, c2)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a2, b, c2) {
  return { instance: a2, listener: b, currentTarget: c2 };
}
function oe(a2, b) {
  for (var c2 = b + "Capture", d = []; null !== a2; ) {
    var e = a2, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a2, c2), null != f2 && d.unshift(tf(a2, f2, e)), f2 = Kb(a2, b), null != f2 && d.push(tf(a2, f2, e)));
    a2 = a2.return;
  }
  return d;
}
function vf(a2) {
  if (null === a2) return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b, c2, d, e) {
  for (var f2 = b._reactName, g = []; null !== c2 && c2 !== d; ) {
    var h = c2, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c2, f2), null != k2 && g.unshift(tf(c2, k2, h))) : e || (k2 = Kb(c2, f2), null != k2 && g.push(tf(c2, k2, h))));
    c2 = c2.return;
  }
  0 !== g.length && a2.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b, c2) {
  b = zf(b);
  if (zf(a2) !== b && c2) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b) {
  var c2 = b, d = 0;
  do {
    var e = c2.nextSibling;
    a2.removeChild(c2);
    if (e && 8 === e.nodeType) if (c2 = e.data, "/$" === c2) {
      if (0 === d) {
        a2.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d++;
    c2 = e;
  } while (c2);
  bd(b);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b = a2.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a2.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b) return a2;
        b--;
      } else "/$" === c2 && b++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b = a2[Of];
  if (b) return b;
  for (var c2 = a2.parentNode; c2; ) {
    if (b = c2[uf] || c2[Of]) {
      c2 = b.alternate;
      if (null !== b.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
        if (c2 = a2[Of]) return c2;
        a2 = Mf(a2);
      }
      return b;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
  throw Error(p(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a2, b) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b) {
  var c2 = a2.type.contextTypes;
  if (!c2) return Vf;
  var d = a2.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c2) e[f2] = b[f2];
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a2, b, c2) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c2);
}
function bg(a2, b, c2) {
  var d = a2.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c2;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a2) || "Unknown", e));
  return A({}, c2, d);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a2);
  G(Wf, Wf.current);
  return true;
}
function dg(a2, b, c2) {
  var d = a2.stateNode;
  if (!d) throw Error(p(169));
  c2 ? (a2 = bg(a2, b, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E(Wf), E(H), G(H, a2)) : E(Wf);
  G(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b = C;
    try {
      var c2 = eg;
      for (C = 1; a2 < c2.length; a2++) {
        var d = c2[a2];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b;
}
function ug(a2, b, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d = rg;
  a2 = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c2 += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c2 << e | d;
    sg = f2 + a2;
  } else rg = 1 << f2 | c2 << e | d, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a2, b) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b;
  c2.return = a2;
  b = a2.deletions;
  null === b ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
}
function Cg(a2, b) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b = 1 !== b.nodeType || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I) {
    var b = yg;
    if (b) {
      var c2 = b;
      if (!Cg(a2, b)) {
        if (Dg(a2)) throw Error(p(418));
        b = Lf(c2.nextSibling);
        var d = xg;
        b && Cg(a2, b) ? Ag(d, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
      }
    } else {
      if (Dg(a2)) throw Error(p(418));
      a2.flags = a2.flags & -4097 | 2;
      I = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg) return false;
  if (!I) return Fg(a2), I = true, false;
  var b;
  (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a2)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2) throw Error(p(317));
    a: {
      a2 = a2.nextSibling;
      for (b = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag) throw Error(p(309));
        var d = c2.stateNode;
      }
      if (!d) throw Error(p(147, a2));
      var e = d, f2 = "" + a2;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a3) {
        var b2 = e.refs;
        null === a3 ? delete b2[f2] : b2[f2] = a3;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a2) throw Error(p(284));
    if (!c2._owner) throw Error(p(290, a2));
  }
  return a2;
}
function Mg(a2, b) {
  a2 = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
}
function Ng(a2) {
  var b = a2._init;
  return b(a2._payload);
}
function Og(a2) {
  function b(b2, c3) {
    if (a2) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c3], b2.flags |= 16) : d2.push(c3);
    }
  }
  function c2(c3, d2) {
    if (!a2) return null;
    for (; null !== d2; ) b(c3, d2), d2 = d2.sibling;
    return null;
  }
  function d(a3, b2) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
    return a3;
  }
  function e(a3, b2) {
    a3 = Pg(a3, b2);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b2, c3, d2) {
    b2.index = d2;
    if (!a2) return b2.flags |= 1048576, c3;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c3 ? (b2.flags |= 2, c3) : d2;
    b2.flags |= 2;
    return c3;
  }
  function g(b2) {
    a2 && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a3, b2, c3, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e(b2, c3);
    b2.return = a3;
    return b2;
  }
  function k2(a3, b2, c3, d2) {
    var f3 = c3.type;
    if (f3 === ya) return m2(a3, b2, c3.props.children, d2, c3.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c3.props), d2.ref = Lg(a3, b2, c3), d2.return = a3, d2;
    d2 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d2);
    d2.ref = Lg(a3, b2, c3);
    d2.return = a3;
    return d2;
  }
  function l2(a3, b2, c3, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation) return b2 = Sg(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e(b2, c3.children || []);
    b2.return = a3;
    return b2;
  }
  function m2(a3, b2, c3, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c3, a3.mode, d2, f3), b2.return = a3, b2;
    b2 = e(b2, c3);
    b2.return = a3;
    return b2;
  }
  function q2(a3, b2, c3) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c3), b2.return = a3, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c3 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b2), c3.return = a3, c3;
        case wa:
          return b2 = Sg(b2, a3.mode, c3), b2.return = a3, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a3, d2(b2._payload), c3);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a3.mode, c3, null), b2.return = a3, b2;
      Mg(a3, b2);
    }
    return null;
  }
  function r2(a3, b2, c3, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e2 ? null : h(a3, b2, "" + c3, d2);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e2 ? k2(a3, b2, c3, d2) : null;
        case wa:
          return c3.key === e2 ? l2(a3, b2, c3, d2) : null;
        case Ha:
          return e2 = c3._init, r2(
            a3,
            b2,
            e2(c3._payload),
            d2
          );
      }
      if (eb(c3) || Ka(c3)) return null !== e2 ? null : m2(a3, b2, c3, d2, null);
      Mg(a3, c3);
    }
    return null;
  }
  function y2(a3, b2, c3, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a3 = a3.get(c3) || null, h(b2, a3, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, k2(b2, a3, d2, e2);
        case wa:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, l2(b2, a3, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a3, b2, c3, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a3 = a3.get(c3) || null, m2(b2, a3, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c2(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b(e2, a3);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c2(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b(e2, a3);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a3, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a3;
                    a3 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a3, l3, f3);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                }
                c2(a3, l3);
                break;
              } else b(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a3.mode, h2, f3.key), d2.return = a3, a3 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h2), h2.ref = Lg(a3, d2, f3), h2.return = a3, a3 = h2);
          }
          return g(a3);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c2(a3, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a3;
                a3 = d2;
                break a;
              } else {
                c2(a3, d2);
                break;
              }
              else b(a3, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a3.mode, h2);
            d2.return = a3;
            a3 = d2;
          }
          return g(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a3, d2, f3, h2);
      if (Ka(f3)) return t2(a3, d2, f3, h2);
      Mg(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c2(a3, d2.sibling), d2 = e(d2, f3), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = Qg(f3, a3.mode, h2), d2.return = a3, a3 = d2), g(a3)) : c2(a3, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a2) {
  var b = Wg.current;
  E(Wg);
  a2._currentValue = b;
}
function bh(a2, b, c2) {
  for (; null !== a2; ) {
    var d = a2.alternate;
    (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a2 === c2) break;
    a2 = a2.return;
  }
}
function ch(a2, b) {
  Xg = a2;
  Zg = Yg = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
}
function eh(a2) {
  var b = a2._currentValue;
  if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a2;
    Xg.dependencies = { lanes: 0, firstContext: a2 };
  } else Yg = Yg.next = a2;
  return b;
}
var fh = null;
function gh(a2) {
  null === fh ? fh = [a2] : fh.push(a2);
}
function hh(a2, b, c2, d) {
  var e = b.interleaved;
  null === e ? (c2.next = c2, gh(b)) : (c2.next = e.next, e.next = c2);
  b.interleaved = c2;
  return ih(a2, d);
}
function ih(a2, b) {
  a2.lanes |= b;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b);
  c2 = a2;
  for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a2, b) {
  a2 = a2.updateQueue;
  b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function mh(a2, b) {
  return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a2, b, c2) {
  var d = a2.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a2, c2);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a2, c2);
}
function oh(a2, b, c2) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c2 & 4194240))) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
function ph(a2, b) {
  var c2 = a2.updateQueue, d = a2.alternate;
  if (null !== d && (d = d.updateQueue, c2 === d)) {
    var e = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c2 = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b : a2.next = b;
  c2.lastBaseUpdate = b;
}
function qh(a2, b, c2, d) {
  var e = a2.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h;
          r2 = b;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a2.lanes = g;
    a2.memoizedState = q2;
  }
}
function sh(a2, b, c2) {
  a2 = b.effects;
  b.effects = null;
  if (null !== a2) for (b = 0; b < a2.length; b++) {
    var d = a2[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c2;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a2) {
  if (a2 === th) throw Error(p(174));
  return a2;
}
function yh(a2, b) {
  G(wh, b);
  G(vh, a2);
  G(uh, th);
  a2 = b.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b = xh(uh.current);
  var c2 = lb(b, a2.type);
  b !== c2 && (G(vh, a2), G(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a2) {
  for (var b = a2; null !== b; ) {
    if (13 === b.tag) {
      var c2 = b.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a2) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a2) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a2, b) {
  if (null === b) return false;
  for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++) if (!He(a2[c2], b[c2])) return false;
  return true;
}
function Nh(a2, b, c2, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
  a2 = c2(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a2;
}
function Sh() {
  var a2 = 0 !== Kh;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a2 : O = O.next = a2;
  return O;
}
function Uh() {
  if (null === N) {
    var a2 = M.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else a2 = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a2;
  else {
    if (null === a2) throw Error(p(310));
    N = a2;
    a2 = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a2 : O = O.next = a2;
  }
  return O;
}
function Vh(a2, b) {
  return "function" === typeof b ? b(a2) : b;
}
function Wh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p(311));
  c2.lastRenderedReducer = a2;
  var d = N, e = d.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c2.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a2(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c2.lastRenderedState = d;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e = a2;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a2);
  } else null === e && (c2.lanes = 0);
  return [b.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p(311));
  c2.lastRenderedReducer = a2;
  var d = c2.dispatch, e = c2.pending, f2 = b.memoizedState;
  if (null !== e) {
    c2.pending = null;
    var g = e = e.next;
    do
      f2 = a2(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a2, b) {
  var c2 = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c2, d, a2), [a2]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c2, b, e);
  }
  return e;
}
function di(a2, b, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b, value: c2 };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, null === c2 ? b.stores = [a2] : c2.push(a2));
}
function ci(a2, b, c2, d) {
  b.value = c2;
  b.getSnapshot = d;
  ei(b) && fi(a2);
}
function ai(a2, b, c2) {
  return c2(function() {
    ei(b) && fi(a2);
  });
}
function ei(a2) {
  var b = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b();
    return !He(a2, c2);
  } catch (d) {
    return true;
  }
}
function fi(a2) {
  var b = ih(a2, 1);
  null !== b && gi(b, a2, 1, -1);
}
function hi(a2) {
  var b = Th();
  "function" === typeof a2 && (a2 = a2());
  b.memoizedState = b.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b.queue = a2;
  a2 = a2.dispatch = ii.bind(null, M, a2);
  return [b.memoizedState, a2];
}
function bi(a2, b, c2, d) {
  a2 = { tag: a2, create: b, destroy: c2, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, null === c2 ? b.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b.lastEffect = a2));
  return a2;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a2, b, c2, d) {
  var e = Th();
  M.flags |= a2;
  e.memoizedState = bi(1 | b, c2, void 0, void 0 === d ? null : d);
}
function li(a2, b, c2, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c2, f2, d);
      return;
    }
  }
  M.flags |= a2;
  e.memoizedState = bi(1 | b, c2, f2, d);
}
function mi(a2, b) {
  return ki(8390656, 8, a2, b);
}
function $h(a2, b) {
  return li(2048, 8, a2, b);
}
function ni(a2, b) {
  return li(4, 2, a2, b);
}
function oi(a2, b) {
  return li(4, 4, a2, b);
}
function pi(a2, b) {
  if ("function" === typeof b) return a2 = a2(), b(a2), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
    b.current = null;
  };
}
function qi(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return li(4, 4, pi.bind(null, b, a2), c2);
}
function ri() {
}
function si(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d = c2.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c2.memoizedState = [a2, b];
  return a2;
}
function ti(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d = c2.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}
function ui(a2, b, c2) {
  if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
  He(c2, b) || (c2 = yc(), M.lanes |= c2, rh |= c2, a2.baseState = true);
  return b;
}
function vi(a2, b) {
  var c2 = C;
  C = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b();
  } finally {
    C = c2, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a2, b, c2) {
  var d = yi(a2);
  c2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, c2);
  else if (c2 = hh(a2, b, c2, d), null !== c2) {
    var e = R();
    gi(c2, a2, d, e);
    Bi(c2, b, d);
  }
}
function ii(a2, b, c2) {
  var d = yi(a2), e = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, e);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c2);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c2 = hh(a2, b, e, d);
    null !== c2 && (e = R(), gi(c2, a2, d, e), Bi(c2, b, d));
  }
}
function zi(a2) {
  var b = a2.alternate;
  return a2 === M || null !== b && b === M;
}
function Ai(a2, b) {
  Jh = Ih = true;
  var c2 = a2.pending;
  null === c2 ? b.next = b : (b.next = c2.next, c2.next = b);
  a2.pending = b;
}
function Bi(a2, b, c2) {
  if (0 !== (c2 & 4194240)) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
  Th().memoizedState = [a2, void 0 === b ? null : b];
  return a2;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a2),
    c2
  );
}, useLayoutEffect: function(a2, b) {
  return ki(4194308, 4, a2, b);
}, useInsertionEffect: function(a2, b) {
  return ki(4, 2, a2, b);
}, useMemo: function(a2, b) {
  var c2 = Th();
  b = void 0 === b ? null : b;
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}, useReducer: function(a2, b, c2) {
  var d = Th();
  b = void 0 !== c2 ? c2(b) : b;
  d.memoizedState = d.baseState = b;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
  d.queue = a2;
  a2 = a2.dispatch = xi.bind(null, M, a2);
  return [d.memoizedState, a2];
}, useRef: function(a2) {
  var b = Th();
  a2 = { current: a2 };
  return b.memoizedState = a2;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
  return Th().memoizedState = a2;
}, useTransition: function() {
  var a2 = hi(false), b = a2[0];
  a2 = vi.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b, c2) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c2) throw Error(p(407));
    c2 = c2();
  } else {
    c2 = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c2);
  }
  e.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a2
  ), [a2]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c2, b), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b = Q.identifierPrefix;
  if (I) {
    var c2 = sg;
    var d = rg;
    c2 = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c2;
    b = ":" + b + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b += "H" + c2.toString(32));
    b += ":";
  } else c2 = Lh++, b = ":" + b + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a2) {
    var b = Uh();
    return ui(b, N.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a2) {
  var b = Uh();
  return null === N ? b.memoizedState = a2 : ui(b, N.memoizedState, a2);
}, useTransition: function() {
  var a2 = Xh(Vh)[0], b = Uh().memoizedState;
  return [a2, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a2, b) {
  if (a2 && a2.defaultProps) {
    b = A({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
function Di(a2, b, c2, d) {
  b = a2.memoizedState;
  c2 = c2(d, b);
  c2 = null === c2 || void 0 === c2 ? b : A({}, b, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = R(), e = yi(a2), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e);
  null !== b && (gi(b, a2, e, d), oh(b, a2, e));
}, enqueueReplaceState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = R(), e = yi(a2), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e);
  null !== b && (gi(b, a2, e, d), oh(b, a2, e));
}, enqueueForceUpdate: function(a2, b) {
  a2 = a2._reactInternals;
  var c2 = R(), d = yi(a2), e = mh(c2, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a2, e, d);
  null !== b && (gi(b, a2, d, c2), oh(b, a2, d));
} };
function Fi(a2, b, c2, d, e, f2, g) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c2, d) || !Ie(e, f2) : true;
}
function Gi(a2, b, c2) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a2, e) : Vf);
  b = new b(c2, f2);
  a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a2.stateNode = b;
  b._reactInternals = a2;
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a2, b, c2, d) {
  a2 = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c2, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c2, d);
  b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a2, b, c2, d) {
  var e = a2.stateNode;
  e.props = c2;
  e.state = a2.memoizedState;
  e.refs = {};
  kh(a2);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a2, f2));
  e.state = a2.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a2, b, f2, c2), e.state = a2.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a2, c2, e, d), e.state = a2.memoizedState);
  "function" === typeof e.componentDidMount && (a2.flags |= 4194308);
}
function Ji(a2, b) {
  try {
    var c2 = "", d = b;
    do
      c2 += Pa(d), d = d.return;
    while (d);
    var e = c2;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b, stack: e, digest: null };
}
function Ki(a2, b, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b ? b : null };
}
function Li(a2, b) {
  try {
    console.error(b.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d = b.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a2, b);
  };
  return c2;
}
function Qi(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d = a2.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c2.payload = function() {
      return d(e);
    };
    c2.callback = function() {
      Li(a2, b);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a2, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a2, b, c2) {
  var d = a2.pingCache;
  if (null === d) {
    d = a2.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c2) || (e.add(c2), a2 = Ti.bind(null, a2, b, c2), b.then(a2, a2));
}
function Ui(a2) {
  do {
    var b;
    if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Vi(a2, b, c2, d, e) {
  if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c2, b, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e;
  return a2;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a2, b, c2, d) {
  b.child = null === a2 ? Vg(b, null, c2, d) : Ug(b, a2.child, c2, d);
}
function Yi(a2, b, c2, d, e) {
  c2 = c2.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a2, b, c2, d, f2, e);
  c2 = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e, Zi(a2, b, e);
  I && c2 && vg(b);
  b.flags |= 1;
  Xi(a2, b, d, e);
  return b.child;
}
function $i(a2, b, c2, d, e) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d, e);
    a2 = Rg(c2.type, null, d, b, b.mode, e);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e)) {
    var g = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g, d) && a2.ref === b.ref) return Zi(a2, b, e);
  }
  b.flags |= 1;
  a2 = Pg(f2, d);
  a2.ref = b.ref;
  a2.return = b;
  return b.child = a2;
}
function bj(a2, b, c2, d, e) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d) && a2.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a2.lanes & e)) 0 !== (a2.flags & 131072) && (dh = true);
    else return b.lanes = a2.lanes, Zi(a2, b, e);
  }
  return cj(a2, b, c2, d, e);
}
function dj(a2, b, c2) {
  var d = b.pendingProps, e = d.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
  else {
    if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a2, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c2;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c2, b.memoizedState = null) : d = c2, G(ej, fj), fj |= d;
  Xi(a2, b, e, c2);
  return b.child;
}
function gj(a2, b) {
  var c2 = b.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b.flags |= 512, b.flags |= 2097152;
}
function cj(a2, b, c2, d, e) {
  var f2 = Zf(c2) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c2 = Nh(a2, b, c2, d, f2, e);
  d = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e, Zi(a2, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a2, b, c2, e);
  return b.child;
}
function hj(a2, b, c2, d, e) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a2, b), Gi(b, c2, d), Ii(b, c2, d, e), d = true;
  else if (null === a2) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c2, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c2, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a2, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c2, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c2, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a2, b, c2, d, f2, e);
}
function jj(a2, b, c2, d, e, f2) {
  gj(a2, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c2, false), Zi(a2, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c2.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a2 && g ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a2, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c2, true);
  return b.child;
}
function kj(a2) {
  var b = a2.stateNode;
  b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
  yh(a2, b.containerInfo);
}
function lj(a2, b, c2, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a2, b, c2, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function oj(a2, b, c2) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a2) {
    Eg(b);
    a2 = b.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a2 = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a2 = Tg(a2, d, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c2), b.memoizedState = mj, a2) : qj(b, g);
  }
  e = a2.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a2, b, g, d, h, e, c2);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a2.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c2, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a2.child.memoizedState;
    g = null === g ? nj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a2.childLanes & ~c2;
    b.memoizedState = mj;
    return d;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c2);
  d.return = b;
  d.sibling = null;
  null !== a2 && (c2 = b.deletions, null === c2 ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a2, b) {
  b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
  b.return = a2;
  return a2.child = b;
}
function sj(a2, b, c2, d) {
  null !== d && Jg(d);
  Ug(b, a2.child, null, c2);
  a2 = qj(b, b.pendingProps.children);
  a2.flags |= 2;
  b.memoizedState = null;
  return a2;
}
function rj(a2, b, c2, d, e, f2, g) {
  if (c2) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a2, b, g, d);
    if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a2.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a2, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a2, b, g, d);
  }
  h = 0 !== (g & a2.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a2, e), gi(d, a2, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a2, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e._reactRetry = b, null;
  a2 = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a2, b, c2) {
  a2.lanes |= b;
  var d = a2.alternate;
  null !== d && (d.lanes |= b);
  bh(a2.return, b, c2);
}
function wj(a2, b, c2, d, e) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c2, f2.tailMode = e);
}
function xj(a2, b, c2) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a2, b, d.children, c2);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
      if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b);
      else if (19 === a2.tag) vj(a2, c2, b);
      else if (null !== a2.child) {
        a2.child.return = a2;
        a2 = a2.child;
        continue;
      }
      if (a2 === b) break a;
      for (; null === a2.sibling; ) {
        if (null === a2.return || a2.return === b) break a;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      a2 = a2.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c2 = b.child;
      for (e = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e = c2), c2 = c2.sibling;
      c2 = e;
      null === c2 ? (e = b.child, b.child = null) : (e = c2.sibling, c2.sibling = null);
      wj(b, false, e, c2, f2);
      break;
    case "backwards":
      c2 = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a2 = e.alternate;
        if (null !== a2 && null === Ch(a2)) {
          b.child = e;
          break;
        }
        a2 = e.sibling;
        e.sibling = c2;
        c2 = e;
        e = a2;
      }
      wj(b, true, c2, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a2, b) {
  0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a2, b, c2) {
  null !== a2 && (b.dependencies = a2.dependencies);
  rh |= b.lanes;
  if (0 === (c2 & b.childLanes)) return null;
  if (null !== a2 && b.child !== a2.child) throw Error(p(153));
  if (null !== b.child) {
    a2 = b.child;
    c2 = Pg(a2, a2.pendingProps);
    b.child = c2;
    for (c2.return = b; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b;
    c2.sibling = null;
  }
  return b.child;
}
function yj(a2, b, c2) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c2 & b.child.childLanes)) return oj(a2, b, c2);
        G(L, L.current & 1);
        a2 = Zi(a2, b, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c2 & b.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d) return xj(a2, b, c2);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a2, b, c2);
  }
  return Zi(a2, b, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a2, b) {
  for (var c2 = b.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b) break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b) return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a2, b, c2, d) {
  var e = a2.memoizedProps;
  if (e !== d) {
    a2 = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e = Ya(a2, e);
        d = Ya(a2, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a2, e);
        d = gb(a2, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a2.onclick = Bf);
    }
    ub(c2, d);
    var g;
    c2 = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c2 || (c2 = {}), c2[g] = k2[g]);
      } else c2 || (f2 || (f2 = []), f2.push(
        l2,
        c2
      )), c2 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a2), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a2, b, c2, d) {
  c2 !== d && (b.flags |= 4);
};
function Dj(a2, b) {
  if (!I) switch (a2.tailMode) {
    case "hidden":
      b = a2.tail;
      for (var c2 = null; null !== b; ) null !== b.alternate && (c2 = b), b = b.sibling;
      null === c2 ? a2.tail = null : c2.sibling = null;
      break;
    case "collapsed":
      c2 = a2.tail;
      for (var d = null; null !== c2; ) null !== c2.alternate && (d = c2), c2 = c2.sibling;
      null === d ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
  }
}
function S(a2) {
  var b = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d = 0;
  if (b) for (var e = a2.child; null !== e; ) c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a2, e = e.sibling;
  else for (e = a2.child; null !== e; ) c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a2, e = e.sibling;
  a2.subtreeFlags |= d;
  a2.childLanes = c2;
  return b;
}
function Ej(a2, b, c2) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a2, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c2 = b.type;
      if (null !== a2 && null != b.stateNode) Bj(a2, b, c2, d, e), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a2 = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a2 = 0 !== (b.mode & 1);
          switch (c2) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c2, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a2), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a2
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c2) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d.is ? a2 = g.createElement(c2, { is: d.is }) : (a2 = g.createElement(c2), "select" === c2 && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
          a2[Of] = b;
          a2[Pf] = d;
          zj(a2, b, false, false);
          b.stateNode = a2;
          a: {
            g = vb(c2, d);
            switch (c2) {
              case "dialog":
                D("cancel", a2);
                D("close", a2);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a2);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a2);
                e = d;
                break;
              case "source":
                D("error", a2);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a2
                );
                D("load", a2);
                e = d;
                break;
              case "details":
                D("toggle", a2);
                e = d;
                break;
              case "input":
                Za(a2, d);
                e = Ya(a2, d);
                D("invalid", a2);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a2);
                break;
              case "textarea":
                hb(a2, d);
                e = gb(a2, d);
                D("invalid", a2);
                break;
              default:
                e = d;
            }
            ub(c2, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a2) : null != k2 && ta(a2, f2, k2, g));
            }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                null != d.value && a2.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a2.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a2, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a2,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c2) {
            if (a2 = xg, null !== a2) switch (a2.tag) {
              case 3:
                Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
                break;
              case 5:
                true !== a2.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a2) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c2, b;
      d = null !== d;
      d !== (null !== a2 && null !== a2.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
          g = Ch(a2);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c2;
            for (c2 = b.child; null !== c2; ) f2 = c2, a2 = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a2 = a2.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a2 = Ch(g), null !== a2) {
          if (b.flags |= 128, d = true, c2 = a2.updateQueue, null !== c2 && (b.updateQueue = c2, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c2 = f2.last, null !== c2 ? c2.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c2 = L.current, G(L, d ? c2 & 1 | 2 : c2 & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a2, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a2 = b.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a2 = b.flags;
      return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a2, b) {
  var c2 = a2.ref;
  if (null !== c2) if ("function" === typeof c2) try {
    c2(null);
  } catch (d) {
    W(a2, b, d);
  }
  else c2.current = null;
}
function Mj(a2, b, c2) {
  try {
    c2();
  } catch (d) {
    W(a2, b, d);
  }
}
var Nj = false;
function Oj(a2, b) {
  Cf = dd;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else a: {
      c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
      var d = c2.getSelection && c2.getSelection();
      if (d && 0 !== d.rangeCount) {
        c2 = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c2.nodeType, f2.nodeType;
        } catch (F2) {
          c2 = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c2 || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a2) break b;
            r2 === c2 && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c2 = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c2 = null;
    }
    c2 = c2 || { start: 0, end: 0 };
  } else c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V = a2;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a2 = b.sibling;
    if (null !== a2) {
      a2.return = b.return;
      V = a2;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a2, b, c2) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a2) === a2) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c2, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a2, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c2 = b = b.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d = c2.create;
        c2.destroy = d();
      }
      c2 = c2.next;
    } while (c2 !== b);
  }
}
function Rj(a2) {
  var b = a2.ref;
  if (null !== b) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b ? b(a2) : b.current = a2;
  }
}
function Sj(a2) {
  var b = a2.alternate;
  null !== b && (a2.alternate = null, Sj(b));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Tj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Uj(a2) {
  a: for (; ; ) {
    for (; null === a2.sibling; ) {
      if (null === a2.return || Tj(a2.return)) return null;
      a2 = a2.return;
    }
    a2.sibling.return = a2.return;
    for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
      if (a2.flags & 2) continue a;
      if (null === a2.child || 4 === a2.tag) continue a;
      else a2.child.return = a2, a2 = a2.child;
    }
    if (!(a2.flags & 2)) return a2.stateNode;
  }
}
function Vj(a2, b, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d) a2 = a2.stateNode, b ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (8 === c2.nodeType ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c2), a2 = a2.sibling;
}
function Wj(a2, b, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d) a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
  else if (4 !== d && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c2), a2 = a2.sibling;
}
var X = null, Xj = false;
function Yj(a2, b, c2) {
  for (c2 = c2.child; null !== c2; ) Zj(a2, b, c2), c2 = c2.sibling;
}
function Zj(a2, b, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c2);
  } catch (h) {
  }
  switch (c2.tag) {
    case 5:
      U || Lj(c2, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a2, b, c2);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a2, b, c2);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c2.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c2, b, g) : 0 !== (f2 & 4) && Mj(c2, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a2, b, c2);
      break;
    case 1:
      if (!U && (Lj(c2, b), d = c2.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c2.memoizedProps, d.state = c2.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c2, b, h);
      }
      Yj(a2, b, c2);
      break;
    case 21:
      Yj(a2, b, c2);
      break;
    case 22:
      c2.mode & 1 ? (U = (d = U) || null !== c2.memoizedState, Yj(a2, b, c2), U = d) : Yj(a2, b, c2);
      break;
    default:
      Yj(a2, b, c2);
  }
}
function ak(a2) {
  var b = a2.updateQueue;
  if (null !== b) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a2, b2);
      c2.has(b2) || (c2.add(b2), b2.then(d, d));
    });
  }
}
function ck(a2, b) {
  var c2 = b.deletions;
  if (null !== c2) for (var d = 0; d < c2.length; d++) {
    var e = c2[d];
    try {
      var f2 = a2, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
}
function dk(a2, b) {
  var c2 = a2.alternate, d = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a2);
      ek(a2);
      if (d & 4) {
        try {
          Pj(3, a2, a2.return), Qj(3, a2);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
        try {
          Pj(5, a2, a2.return);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a2);
      ek(a2);
      d & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b, a2);
      ek(a2);
      d & 512 && null !== c2 && Lj(c2, c2.return);
      if (a2.flags & 32) {
        var e = a2.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      if (d & 4 && (e = a2.stateNode, null != e)) {
        var f2 = a2.memoizedProps, g = null !== c2 ? c2.memoizedProps : f2, h = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a2);
      ek(a2);
      if (d & 4) {
        if (null === a2.stateNode) throw Error(p(162));
        e = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a2);
      ek(a2);
      if (d & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a2, a2.return, t2);
      }
      break;
    case 4:
      ck(b, a2);
      ek(a2);
      break;
    case 13:
      ck(b, a2);
      ek(a2);
      e = a2.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U = (l2 = U) || m2, ck(b, a2), U = l2) : ck(b, a2);
      ek(a2);
      if (d & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V = a2, m2 = a2.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c2 = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c2, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a2; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a2, a2.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a2, a2.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a2) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a2) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a2);
      ek(a2);
      d & 4 && ak(a2);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a2
      ), ek(a2);
  }
}
function ek(a2) {
  var b = a2.flags;
  if (b & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Tj(c2)) {
            var d = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a2);
          Wj(a2, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a2);
          Vj(a2, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b & 4096 && (a2.flags &= -4097);
}
function hk(a2, b, c2) {
  V = a2;
  ik(a2);
}
function ik(a2, b, c2) {
  for (var d = 0 !== (a2.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a2);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a2);
  }
}
function kk(a2) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c2 = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c2) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c2.memoizedProps : Ci(b.type, c2.memoizedProps);
              d.componentDidUpdate(e, c2.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c2 = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c2 = b.child.stateNode;
                  break;
                case 1:
                  c2 = b.child.stateNode;
              }
              sh(b, g, c2);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c2 && b.flags & 4) {
              c2 = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c2.focus();
                  break;
                case "img":
                  k2.src && (c2.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a2) {
      V = null;
      break;
    }
    c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V = c2;
      break;
    }
    V = b.return;
  }
}
function gk(a2) {
  for (; null !== V; ) {
    var b = V;
    if (b === a2) {
      V = null;
      break;
    }
    var c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V = c2;
      break;
    }
    V = b.return;
  }
}
function jk(a2) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c2, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a2) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a2) {
  if (0 === (a2.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a2 = C;
  if (0 !== a2) return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd(a2.type);
  return a2;
}
function gi(a2, b, c2, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a2, c2, d);
  if (0 === (K & 2) || a2 !== Q) a2 === Q && (0 === (K & 2) && (qk |= c2), 4 === T && Ck(a2, Z)), Dk(a2, d), 1 === c2 && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a2, b) {
  var c2 = a2.callbackNode;
  wc(a2, b);
  var d = uc(a2, a2 === Q ? Z : 0);
  if (0 === d) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b = d & -d, a2.callbackPriority !== b) {
    null != c2 && bc(c2);
    if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
      0 === (K & 6) && jg();
    }), c2 = null;
    else {
      switch (Dc(d)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Fk(c2, Gk.bind(null, a2));
    }
    a2.callbackPriority = b;
    a2.callbackNode = c2;
  }
}
function Gk(a2, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c2 = a2.callbackNode;
  if (Hk() && a2.callbackNode !== c2) return null;
  var d = uc(a2, a2 === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a2.expiredLanes) || b) b = Ik(a2, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a2 || Z !== b) uk = null, Gj = B() + 500, Kk(a2, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a2, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a2), 0 !== e && (d = e, b = Nk(a2, e)));
    if (1 === b) throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c2;
    if (6 === b) Ck(a2, d);
    else {
      e = a2.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a2, d), 2 === b && (f2 = xc(a2), 0 !== f2 && (d = f2, b = Nk(a2, f2))), 1 === b)) throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c2;
      a2.finishedWork = e;
      a2.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a2, tk, uk);
          break;
        case 3:
          Ck(a2, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a2, 0)) break;
            e = a2.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a2.pingedLanes |= a2.suspendedLanes & e;
              break;
            }
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 4:
          Ck(a2, d);
          if ((d & 4194240) === d) break;
          b = a2.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 5:
          Pk(a2, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a2, B());
  return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
}
function Nk(a2, b) {
  var c2 = sk;
  a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
  a2 = Ik(a2, b);
  2 !== a2 && (b = tk, tk = c2, null !== b && Fj(b));
  return a2;
}
function Fj(a2) {
  null === tk ? tk = a2 : tk.push.apply(tk, a2);
}
function Ok(a2) {
  for (var b = a2; ; ) {
    if (b.flags & 16384) {
      var c2 = b.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d = 0; d < c2.length; d++) {
        var e = c2[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c2 = b.child;
    if (b.subtreeFlags & 16384 && null !== c2) c2.return = b, b = c2;
    else {
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a2, b) {
  b &= ~rk;
  b &= ~qk;
  a2.suspendedLanes |= b;
  a2.pingedLanes &= ~b;
  for (a2 = a2.expirationTimes; 0 < b; ) {
    var c2 = 31 - oc(b), d = 1 << c2;
    a2[c2] = -1;
    b &= ~d;
  }
}
function Ek(a2) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a2, 0);
  if (0 === (b & 1)) return Dk(a2, B()), null;
  var c2 = Ik(a2, b);
  if (0 !== a2.tag && 2 === c2) {
    var d = xc(a2);
    0 !== d && (b = d, c2 = Nk(a2, d));
  }
  if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B()), c2;
  if (6 === c2) throw Error(p(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b;
  Pk(a2, tk, uk);
  Dk(a2, B());
  return null;
}
function Qk(a2, b) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b);
  } finally {
    K = c2, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a2) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c2 = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a2) return a2();
  } finally {
    C = d, ok.transition = c2, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a2, b) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y) for (c2 = Y.return; null !== c2; ) {
    var d = c2;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c2 = c2.return;
  }
  Q = a2;
  Y = a2 = Pg(a2.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c2 = fh[b], d = c2.interleaved, null !== d) {
      c2.interleaved = null;
      var e = d.next, f2 = c2.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c2.pending = d;
    }
    fh = null;
  }
  return a2;
}
function Mk(a2, b) {
  do {
    var c2 = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a2, g = c2.return, h = c2, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na) {
      b = na;
      Y === c2 && null !== c2 && (Y = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a2 = mk.current;
  mk.current = Rh;
  return null === a2 ? Rh : a2;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a2, b) {
  var c2 = K;
  K |= 2;
  var d = Jk();
  if (Q !== a2 || Z !== b) uk = null, Kk(a2, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a2, e);
    }
  while (1);
  $g();
  K = c2;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a2) {
  var b = Vk(a2.alternate, a2, fj);
  a2.memoizedProps = a2.pendingProps;
  null === b ? Sk(a2) : Y = b;
  nk.current = null;
}
function Sk(a2) {
  var b = a2;
  do {
    var c2 = b.alternate;
    a2 = b.return;
    if (0 === (b.flags & 32768)) {
      if (c2 = Ej(c2, b, fj), null !== c2) {
        Y = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b);
      if (null !== c2) {
        c2.flags &= 32767;
        Y = c2;
        return;
      }
      if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a2;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a2, b, c2) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a2, b, c2, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a2, b, c2, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c2 = a2.finishedWork;
  var e = a2.finishedLanes;
  if (null === c2) return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current) throw Error(p(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === Q && (Y = Q = null, Z = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a2, c2);
    dk(c2, a2);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    hk(c2);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a2.current = c2;
  vk && (vk = false, wk = a2, xk = e);
  f2 = a2.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c2.stateNode);
  Dk(a2, B());
  if (null !== b) for (d = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++) e = b[c2], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
  0 !== (xk & 1) && 0 !== a2.tag && Hk();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a2 = Dc(xk), b = ok.transition, c2 = C;
    try {
      ok.transition = null;
      C = 16 > a2 ? 16 : a2;
      if (null === wk) var d = false;
      else {
        a2 = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a2.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a2.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a2);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c2, ok.transition = b;
    }
  }
  return false;
}
function Xk(a2, b, c2) {
  b = Ji(c2, b);
  b = Ni(a2, b, 1);
  a2 = nh(a2, b, 1);
  b = R();
  null !== a2 && (Ac(a2, 1, b), Dk(a2, b));
}
function W(a2, b, c2) {
  if (3 === a2.tag) Xk(a2, a2, c2);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a2, c2);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a2 = Ji(c2, a2);
        a2 = Qi(b, a2, 1);
        b = nh(b, a2, 1);
        a2 = R();
        null !== b && (Ac(b, 1, a2), Dk(b, a2));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a2, b, c2) {
  var d = a2.pingCache;
  null !== d && d.delete(b);
  b = R();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  Q === a2 && (Z & c2) === c2 && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
  Dk(a2, b);
}
function Yk(a2, b) {
  0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = R();
  a2 = ih(a2, b);
  null !== a2 && (Ac(a2, b, c2), Dk(a2, c2));
}
function uj(a2) {
  var b = a2.memoizedState, c2 = 0;
  null !== b && (c2 = b.retryLane);
  Yk(a2, c2);
}
function bk(a2, b) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d = a2.stateNode;
      var e = a2.memoizedState;
      null !== e && (c2 = e.retryLane);
      break;
    case 19:
      d = a2.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a2, c2);
}
var Vk;
Vk = function(a2, b, c2) {
  if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a2.lanes & c2) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c2);
    dh = 0 !== (a2.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a2, b);
      a2 = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c2);
      e = Nh(null, b, d, a2, e, c2);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a2, c2), b = jj(null, b, d, true, f2, c2)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c2), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a2, b);
        a2 = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a2 = Ci(d, a2);
        switch (e) {
          case 0:
            b = cj(null, b, d, a2, c2);
            break a;
          case 1:
            b = hj(null, b, d, a2, c2);
            break a;
          case 11:
            b = Yi(null, b, d, a2, c2);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a2), c2);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a2, b, d, e, c2);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a2, b, d, e, c2);
    case 3:
      a: {
        kj(b);
        if (null === a2) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a2, b);
        qh(b, d, null, c2);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a2, b, d, c2, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a2, b, d, c2, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c2 = Vg(b, null, d, c2), b.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a2, b, c2);
            break a;
          }
          Xi(a2, b, d, c2);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a2 && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g, c2), b.child;
    case 6:
      return null === a2 && Eg(b), null;
    case 13:
      return oj(a2, b, c2);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a2 ? b.child = Ug(b, null, d, c2) : Xi(a2, b, d, c2), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a2, b, d, e, c2);
    case 7:
      return Xi(a2, b, b.pendingProps, c2), b.child;
    case 8:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 12:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a2, b, c2);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c2 & -c2);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c2;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c2);
                bh(
                  f2.return,
                  c2,
                  b
                );
                h.lanes |= c2;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c2;
            h = g.alternate;
            null !== h && (h.lanes |= c2);
            bh(g, c2, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a2, b, e.children, c2);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c2), e = eh(e), d = d(e), b.flags |= 1, Xi(a2, b, d, c2), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a2, b, d, e, c2);
    case 15:
      return bj(a2, b, b.type, b.pendingProps, c2);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a2, b), b.tag = 1, Zf(d) ? (a2 = true, cg(b)) : a2 = false, ch(b, c2), Gi(b, d, e), Ii(b, d, e, c2), jj(null, b, d, true, a2, c2);
    case 19:
      return xj(a2, b, c2);
    case 22:
      return dj(a2, b, c2);
  }
  throw Error(p(156, b.tag));
};
function Fk(a2, b) {
  return ac(a2, b);
}
function $k(a2, b, c2, d) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b, c2, d) {
  return new $k(a2, b, c2, d);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Zk(a2) {
  if ("function" === typeof a2) return aj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da) return 11;
    if (a2 === Ga) return 14;
  }
  return 2;
}
function Pg(a2, b) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b = a2.dependencies;
  c2.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function Rg(a2, b, c2, d, e, f2) {
  var g = 2;
  d = a2;
  if ("function" === typeof a2) aj(a2) && (g = 1);
  else if ("string" === typeof a2) g = 5;
  else a: switch (a2) {
    case ya:
      return Tg(c2.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a2 = Bg(12, c2, b, e | 2), a2.elementType = Aa, a2.lanes = f2, a2;
    case Ea:
      return a2 = Bg(13, c2, b, e), a2.elementType = Ea, a2.lanes = f2, a2;
    case Fa:
      return a2 = Bg(19, c2, b, e), a2.elementType = Fa, a2.lanes = f2, a2;
    case Ia:
      return pj(c2, e, f2, b);
    default:
      if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a2 ? a2 : typeof a2, ""));
  }
  b = Bg(g, c2, b, e);
  b.elementType = a2;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a2, b, c2, d) {
  a2 = Bg(7, a2, d, b);
  a2.lanes = c2;
  return a2;
}
function pj(a2, b, c2, d) {
  a2 = Bg(22, a2, d, b);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function Qg(a2, b, c2) {
  a2 = Bg(6, a2, null, b);
  a2.lanes = c2;
  return a2;
}
function Sg(a2, b, c2) {
  b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
  b.lanes = c2;
  b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b;
}
function al(a2, b, c2, d, e) {
  this.tag = b;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a2, b, c2, d, e, f2, g, h, k2) {
  a2 = new al(a2, b, c2, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a2;
}
function cl(a2, b, c2) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a2, containerInfo: b, implementation: c2 };
}
function dl(a2) {
  if (!a2) return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p(170));
    var b = a2;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2)) return bg(a2, c2, b);
  }
  return b;
}
function el(a2, b, c2, d, e, f2, g, h, k2) {
  a2 = bl(c2, d, true, a2, e, f2, g, h, k2);
  a2.context = dl(null);
  c2 = a2.current;
  d = R();
  e = yi(c2);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c2, f2, e);
  a2.current.lanes = e;
  Ac(a2, e, d);
  Dk(a2, d);
  return a2;
}
function fl(a2, b, c2, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c2 = dl(c2);
  null === b.context ? b.context = c2 : b.pendingContext = c2;
  b = mh(f2, g);
  b.payload = { element: a2 };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a2 = nh(e, b, g);
  null !== a2 && (gi(a2, e, g, f2), oh(a2, e, g));
  return g;
}
function gl(a2) {
  a2 = a2.current;
  if (!a2.child) return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function hl(a2, b) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b ? c2 : b;
  }
}
function il(a2, b) {
  hl(a2, b);
  (a2 = a2.alternate) && hl(a2, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ll(a2) {
  this._internalRoot = a2;
}
ml.prototype.render = ll.prototype.render = function(a2) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a2, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b = a2.containerInfo;
    Rk(function() {
      fl(null, a2, null, null);
    });
    b[uf] = null;
  }
};
function ml(a2) {
  this._internalRoot = a2;
}
ml.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b = Hc();
    a2 = { blockedOn: null, target: a2, priority: b };
    for (var c2 = 0; c2 < Qc.length && 0 !== b && b < Qc[c2].priority; c2++) ;
    Qc.splice(c2, 0, a2);
    0 === c2 && Vc(a2);
  }
};
function nl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function pl() {
}
function ql(a2, b, c2, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a3 = gl(g);
        f2.call(a3);
      };
    }
    var g = el(b, d, a2, 0, null, false, false, "", pl);
    a2._reactRootContainer = g;
    a2[uf] = g.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk();
    return g;
  }
  for (; e = a2.lastChild; ) a2.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a3 = gl(k2);
      h.call(a3);
    };
  }
  var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Rk(function() {
    fl(b, k2, c2, d);
  });
  return k2;
}
function rl(a2, b, c2, d, e) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a3 = gl(g);
        h.call(a3);
      };
    }
    fl(b, g, a2, e);
  } else g = ql(c2, b, a2, e, d);
  return gl(g);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b = a2.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c2 = tc(b.pendingLanes);
        0 !== c2 && (Cc(b, c2 | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a2, 1);
        if (null !== b2) {
          var c3 = R();
          gi(b2, a2, 1, c3);
        }
      }), il(a2, 1);
  }
};
Fc = function(a2) {
  if (13 === a2.tag) {
    var b = ih(a2, 134217728);
    if (null !== b) {
      var c2 = R();
      gi(b, a2, 134217728, c2);
    }
    il(a2, 134217728);
  }
};
Gc = function(a2) {
  if (13 === a2.tag) {
    var b = yi(a2), c2 = ih(a2, b);
    if (null !== c2) {
      var d = R();
      gi(c2, a2, b, d);
    }
    il(a2, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a2, b) {
  var c2 = C;
  try {
    return C = a2, b();
  } finally {
    C = c2;
  }
};
yb = function(a2, b, c2) {
  switch (b) {
    case "input":
      bb(a2, c2);
      b = c2.name;
      if ("radio" === c2.type && null != b) {
        for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c2.length; b++) {
          var d = c2[b];
          if (d !== a2 && d.form === a2.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b = c2.value, null != b && fb(a2, !!c2.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a2) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a2, b) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a2, b, null, c2);
};
reactDom_production_min.createRoot = function(a2, b) {
  if (!nl(a2)) throw Error(p(299));
  var c2 = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c2 = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a2, 1, false, null, null, c2, false, d, e);
  a2[uf] = b.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2) return null;
  if (1 === a2.nodeType) return a2;
  var b = a2._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a2.render) throw Error(p(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p(268, a2));
  }
  a2 = Zb(b);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Rk(a2);
};
reactDom_production_min.hydrate = function(a2, b, c2) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a2, b, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b, c2) {
  if (!nl(a2)) throw Error(p(405));
  var d = null != c2 && c2.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g = c2.onRecoverableError));
  b = el(b, null, a2, 1, null != c2 ? c2 : null, e, false, f2, g);
  a2[uf] = b.current;
  sf(a2);
  if (d) for (a2 = 0; a2 < d.length; a2++) c2 = d[a2], e = c2._getVersion, e = e(c2._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c2, e] : b.mutableSourceEagerHydrationData.push(
    c2,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a2, b, c2) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a2, b, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!ol(a2)) throw Error(p(40));
  return a2._reactRootContainer ? (Rk(function() {
    rl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d) {
  if (!ol(c2)) throw Error(p(200));
  if (null == a2 || void 0 === a2._reactInternals) throw Error(p(38));
  return rl(a2, b, c2, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m$1 = reactDomExports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    () => selector(api.getInitialState())
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id2 = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id2 += urlAlphabet[bytes[size] & 63];
  }
  return id2;
};
const emptyBoard = () => ({
  nodes: [],
  groups: [],
  wires: [],
  viewport: { x: 0, y: 0, zoom: 1 }
});
const AGENTS = [
  { id: "claude", name: "Claude Code", command: "claude", yoloFlag: "--dangerously-skip-permissions", resume: "claude", builtin: true, color: "#d97757" },
  { id: "codex", name: "Codex", command: "codex", yoloFlag: "--dangerously-bypass-approvals-and-sandbox", resume: "codex", builtin: true, color: "#10a37f" },
  { id: "gemini", name: "Gemini CLI", command: "gemini", yoloFlag: "--yolo", resume: "gemini", builtin: true, color: "#4285f4" },
  { id: "grok", name: "Grok", command: "grok", yoloFlag: "--permission-mode bypassPermissions", resume: "none", builtin: true, color: "#8b5cf6" },
  { id: "opencode", name: "OpenCode", command: "opencode", resume: "opencode", builtin: true, color: "#22d3ee" },
  { id: "shell", name: "Shell", command: "", resume: "none", builtin: true, color: "#94a3b8" },
  { id: "ollama", name: "Ollama", command: "ollama", resume: "none", builtin: true, color: "#a78bfa" },
  { id: "codex-ollama", name: "Codex · Ollama", command: "ollama", resume: "none", builtin: true, color: "#10a37f" },
  { id: "codex-lmstudio", name: "Codex · LM Studio", command: "codex", resume: "none", builtin: true, color: "#8b5cf6" },
  { id: "antigravity", name: "Antigravity", command: "agy", yoloFlag: "--dangerously-skip-permissions", resume: "none", color: "#64748b" },
  { id: "aider", name: "Aider", command: "aider", yoloFlag: "--yes-always", resume: "none", color: "#f59e0b" },
  { id: "amp", name: "Amp", command: "amp", yoloFlag: "--dangerously-allow-all", resume: "none", color: "#ef4444" },
  { id: "ante", name: "Ante", command: "ante", yoloFlag: "--yolo", resume: "none", color: "#a855f7" },
  { id: "auggie", name: "Auggie", command: "auggie", resume: "none", color: "#0ea5e9" },
  { id: "autohand", name: "Autohand", command: "autohand", yoloFlag: "--unrestricted", resume: "none", color: "#14b8a6" },
  { id: "cline", name: "Cline", command: "cline", yoloFlag: "--auto-approve true", resume: "none", color: "#06b6d4" },
  { id: "codebuff", name: "Codebuff", command: "codebuff", resume: "none", color: "#f472b6" },
  { id: "command-code", name: "Command Code", command: "command-code", args: ["--trust"], yoloFlag: "--yolo", resume: "none", color: "#fb923c" },
  { id: "continue", name: "Continue", command: "cn", yoloFlag: "--allow *", resume: "none", color: "#8b5cf6" },
  { id: "crush", name: "Crush", command: "crush", yoloFlag: "--yolo", resume: "none", color: "#ec4899" },
  { id: "cursor", name: "Cursor CLI", command: "cursor-agent", yoloFlag: "--yolo", resume: "none", color: "#e2e8f0" },
  { id: "devin", name: "Devin", command: "devin", yoloFlag: "--permission-mode bypass", resume: "none", color: "#6366f1" },
  { id: "droid", name: "Droid", command: "droid", resume: "none", color: "#84cc16" },
  { id: "copilot", name: "GitHub Copilot", command: "copilot", yoloFlag: "--yolo", resume: "none", color: "#94a3b8" },
  { id: "goose", name: "Goose", command: "goose", yoloEnv: { key: "GOOSE_MODE", value: "auto" }, resume: "none", color: "#f97316" },
  { id: "hermes", name: "Hermes", command: "hermes", args: ["--tui"], yoloFlag: "--yolo", resume: "none", color: "#a3e635" },
  { id: "kilo", name: "Kilocode", command: "kilo", resume: "none", color: "#38bdf8" },
  { id: "kimi", name: "Kimi", command: "kimi", yoloFlag: "--yolo", resume: "none", color: "#f43f5e" },
  { id: "kiro", name: "Kiro", command: "kiro-cli", args: ["chat", "--tui"], yoloFlag: "--trust-all-tools", resume: "none", color: "#7c3aed" },
  { id: "mimo", name: "MiMo Code", command: "mimo", resume: "none", color: "#fb7185" },
  { id: "mistral", name: "Mistral Vibe", command: "vibe", yoloFlag: "--agent auto-approve", resume: "none", color: "#fbbf24" },
  { id: "openclaude", name: "OpenClaude", command: "openclaude", yoloFlag: "--dangerously-skip-permissions", resume: "none", color: "#d97757" },
  { id: "openclaw", name: "OpenClaw", command: "openclaw", resume: "none", color: "#2dd4bf" },
  { id: "pi", name: "Pi", command: "pi", resume: "none", color: "#c084fc" },
  { id: "prime", name: "Prime Agent", command: "prime-agent", resume: "none", color: "#60a5fa" },
  { id: "qwen", name: "Qwen Code", command: "qwen", yoloFlag: "--approval-mode yolo", resume: "none", color: "#a78bfa" },
  { id: "rovo", name: "Rovo Dev", command: "rovo", yoloFlag: "--yolo", resume: "none", color: "#0052cc" },
  { id: "trae", name: "Trae", command: "traecli", yoloFlag: "--yolo", resume: "none", color: "#ef4444" }
];
const CUSTOM = [];
const registerCustomAgents = (list2) => {
  CUSTOM.length = 0;
  for (const c2 of list2) {
    CUSTOM.push({
      id: c2.id,
      name: c2.name,
      command: c2.command,
      yoloFlag: c2.yoloFlag,
      resume: "none",
      color: "#f472b6"
    });
  }
};
const allAgents = () => [...AGENTS, ...CUSTOM];
const getAgent = (id2) => allAgents().find((a2) => a2.id === id2) ?? AGENTS[0];
const ROLES = ["General", "Frontend", "Backend", "Testers", "Reviewers", "Design", "Docs", "Security"];
const ROLE_AGENT = {
  Frontend: "claude",
  Backend: "codex",
  Testers: "gemini",
  Reviewers: "claude",
  Design: "claude",
  Docs: "claude",
  Security: "codex",
  General: ""
};
const TINTS = ["violet", "cyan", "amber", "rose", "sage", "sky"];
function lanes(specs) {
  return specs.map((s) => ({
    agentId: s.agent,
    role: s.role,
    x: 80 + s.col * 400,
    y: 80 + s.row * 320,
    w: 360,
    h: 250
  }));
}
const squad = (role, startCol, n2 = 4) => Array.from({ length: n2 }, (_, i) => ({
  role,
  agent: ROLE_AGENT[role],
  col: startCol + i % 2,
  row: Math.floor(i / 2)
}));
const PRESETS = [
  {
    id: "dev-hq",
    name: "Dev HQ",
    description: "Vier Frontend- und vier Backend-Agenten um ein Kanban, dazu Reviewer und ein Orchestrator.",
    lanes: lanes([...squad("Frontend", 0), ...squad("Backend", 3), { role: "Reviewers", col: 6, row: 0 }, { role: "Reviewers", col: 6, row: 1 }]),
    extras: ["kanban", "orchestrator"]
  },
  {
    id: "sprint-room",
    name: "Sprint Room",
    description: "Zwei Builder je Seite eines Kanban, briefed von einem Orchestrator.",
    lanes: lanes([...squad("Frontend", 0, 2), ...squad("Backend", 2, 2)]),
    extras: ["kanban", "orchestrator"]
  },
  {
    id: "web-studio",
    name: "Web Studio",
    description: "Zwei Designer, drei Frontend-Agenten und eine localhost-Vorschau.",
    lanes: lanes([...squad("Design", 0, 2), ...squad("Frontend", 2, 3)]),
    extras: ["preview", "orchestrator"]
  },
  {
    id: "ship-it",
    name: "Ship It",
    description: "Builder und Tester links, Backend und Reviewer rechts, Kanban in der Mitte.",
    lanes: lanes([...squad("Frontend", 0, 2), ...squad("Testers", 0, 2), ...squad("Backend", 3, 2), ...squad("Reviewers", 3, 2)]),
    extras: ["kanban", "orchestrator"]
  },
  {
    id: "bug-hunt",
    name: "Bug Hunt",
    description: "Drei Tester und zwei Reviewer um ein Triage-Kanban.",
    lanes: lanes([...squad("Testers", 0, 3), ...squad("Reviewers", 2, 2)]),
    extras: ["kanban"]
  },
  { id: "pair", name: "Pair", description: "Eine Gruppe aus zwei Agenten.", lanes: lanes([{ role: "General", col: 0, row: 0 }, { role: "General", col: 1, row: 0 }]) },
  { id: "trio", name: "Trio", description: "Eine Gruppe aus drei Agenten.", lanes: lanes([{ role: "General", col: 0, row: 0 }, { role: "General", col: 1, row: 0 }, { role: "General", col: 2, row: 0 }]) },
  { id: "squad-4", name: "Squad of Four", description: "Eine Gruppe aus vier Agenten.", lanes: lanes(squad("General", 0, 4)) },
  { id: "squads-2", name: "Two Squads", description: "Zwei Gruppen aus je vier Agenten.", lanes: lanes([...squad("General", 0, 4), ...squad("General", 2, 4)]) },
  { id: "squads-3", name: "Three Squads", description: "Drei Gruppen aus je vier Agenten.", lanes: lanes([...squad("General", 0, 4), ...squad("General", 2, 4), ...squad("General", 4, 4)]) },
  { id: "squads-4", name: "Four Squads", description: "Sechzehn Konsolen in vier Gruppen.", lanes: lanes([...squad("General", 0, 4), ...squad("General", 2, 4), ...squad("General", 4, 4), ...squad("General", 6, 4)]) },
  { id: "squad-board", name: "Squad and Board", description: "Vier Agenten neben einem leeren Kanban.", lanes: lanes(squad("General", 0, 4)), extras: ["kanban"] },
  { id: "squad-preview", name: "Squad and Preview", description: "Vier Agenten neben einer localhost-Vorschau.", lanes: lanes(squad("General", 0, 4)), extras: ["preview"] },
  { id: "briefed-squad", name: "Briefed Squad", description: "Vier Agenten unter einem Orchestrator.", lanes: lanes(squad("General", 0, 4)), extras: ["orchestrator"] },
  { id: "feature-squad", name: "Feature Squad", description: "Zwei Frontend- und zwei Backend-Agenten.", lanes: lanes([...squad("Frontend", 0, 2), ...squad("Backend", 1, 2)]) },
  { id: "review-panel", name: "Review Panel", description: "Drei Reviewer auf derselben Änderung.", lanes: lanes(squad("Reviewers", 0, 3)) },
  { id: "security-sweep", name: "Security Sweep", description: "Zwei Security-Agenten und zwei Reviewer.", lanes: lanes([...squad("Security", 0, 2), ...squad("Reviewers", 1, 2)]) },
  { id: "docs-sprint", name: "Docs Sprint", description: "Drei Autoren für Dokumentation.", lanes: lanes(squad("Docs", 0, 3)) }
];
const uid = (n2 = 10) => nanoid(n2);
const baseName = (p2) => {
  const parts = p2.replace(/[\\/]+$/, "").split(/[\\/]/);
  return parts[parts.length - 1] || p2;
};
const timeAgo = (ts) => {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1e3));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
};
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const formatTokens = (n2) => {
  if (n2 >= 1e6) return `${(n2 / 1e6).toFixed(1)}M`;
  if (n2 >= 1e3) return `${(n2 / 1e3).toFixed(1)}k`;
  return String(n2);
};
const dayKey = (d) => {
  const p2 = (n2) => String(n2).padStart(2, "0");
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
};
function audioToWavBase64(buffer) {
  const ch2 = buffer.getChannelData(0);
  const rate = buffer.sampleRate;
  const bytes = new ArrayBuffer(44 + ch2.length * 2);
  const view = new DataView(bytes);
  const write = (off2, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(off2 + i, str.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + ch2.length * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, ch2.length * 2, true);
  let off = 44;
  for (let i = 0; i < ch2.length; i++, off += 2) {
    const s = Math.max(-1, Math.min(1, ch2[i]));
    view.setInt16(off, s < 0 ? s * 32768 : s * 32767, true);
  }
  let binary = "";
  const u8 = new Uint8Array(bytes);
  const chunk = 32768;
  for (let i = 0; i < u8.length; i += chunk) {
    binary += String.fromCharCode(...u8.subarray(i, i + chunk));
  }
  return btoa(binary);
}
const defaultSettings = () => ({
  theme: "ink",
  llmProvider: "ollama",
  defaultAgent: "claude",
  yolo: false,
  fontSize: 100,
  ollamaUrl: "http://127.0.0.1:11434",
  ollamaModel: "gpt-oss:20b",
  lmStudioUrl: "http://127.0.0.1:1234/v1",
  lmStudioModel: "",
  sttUrl: "http://127.0.0.1:8080",
  ttsEnabled: false,
  voiceLanguage: "de",
  holdSpace: true,
  resumeChats: true,
  reopenLastRepo: true,
  chimeOnReset: true,
  customAgents: []
});
const makeWorkspace = (name = "Main") => ({
  id: uid(),
  name,
  board: emptyBoard()
});
const makeRepo = (path) => {
  const ws = makeWorkspace();
  return {
    id: uid(),
    path,
    name: baseName(path).slice(0, 24),
    workspaces: [ws],
    activeWorkspaceId: ws.id
  };
};
const useApp = create((set2, get2) => ({
  hydrated: false,
  repos: [],
  activeRepoId: null,
  settings: defaultSettings(),
  threads: {},
  loops: [],
  memory: [],
  profiles: [],
  savedPresets: [],
  recent: [],
  panel: null,
  missionOpen: false,
  threadOpen: false,
  selected: [],
  tool: "select",
  wireFrom: null,
  showHome: true,
  toasts: [],
  commandDraft: "",
  dictation: false,
  composerOpen: false,
  brainOpen: false,
  brainBusy: false,
  hydrate: async () => {
    let saved = null;
    try {
      saved = await window.api.store.load();
    } catch {
      saved = null;
    }
    if (!saved || saved.version < 2) {
      set2({ hydrated: true, showHome: true });
      return;
    }
    const repos = saved.repos ?? [];
    const lastId = saved.activeRepoId;
    const settings = { ...defaultSettings(), ...saved.settings ?? {} };
    registerCustomAgents(settings.customAgents ?? []);
    set2({
      hydrated: true,
      repos,
      activeRepoId: lastId,
      settings,
      threads: saved.threads ?? {},
      loops: saved.loops ?? [],
      memory: saved.memory ?? [],
      profiles: saved.profiles ?? [],
      savedPresets: saved.savedPresets ?? [],
      recent: saved.recent ?? [],
      showHome: !(settings.reopenLastRepo && lastId && repos.some((r2) => r2.id === lastId))
    });
  },
  addRepo: (path) => {
    const existing = get2().repos.find((r2) => r2.path === path);
    if (existing) {
      set2({ activeRepoId: existing.id, showHome: false, recent: [existing.id, ...get2().recent.filter((x2) => x2 !== existing.id)].slice(0, 8) });
      return;
    }
    const repo = makeRepo(path);
    set2((s) => ({
      repos: [...s.repos, repo],
      activeRepoId: repo.id,
      showHome: false,
      recent: [repo.id, ...s.recent].slice(0, 8)
    }));
  },
  removeRepo: (id2) => set2((s) => {
    const repos = s.repos.filter((r2) => r2.id !== id2);
    const activeRepoId = s.activeRepoId === id2 ? repos[0]?.id ?? null : s.activeRepoId;
    return { repos, activeRepoId, showHome: !activeRepoId };
  }),
  setRepo: (id2) => set2((s) => ({
    activeRepoId: id2,
    showHome: false,
    recent: [id2, ...s.recent.filter((x2) => x2 !== id2)].slice(0, 8),
    selected: []
  })),
  goHome: () => set2({ showHome: true, selected: [] }),
  addWorkspace: (name) => set2((s) => {
    const repoId = s.activeRepoId;
    if (!repoId) return s;
    const ws = makeWorkspace(name || `Workspace ${(s.repos.find((r2) => r2.id === repoId)?.workspaces.length ?? 0) + 1}`);
    return {
      repos: s.repos.map(
        (r2) => r2.id === repoId ? { ...r2, workspaces: [...r2.workspaces, ws], activeWorkspaceId: ws.id } : r2
      )
    };
  }),
  setWorkspace: (id2) => set2((s) => ({
    repos: s.repos.map((r2) => r2.id === s.activeRepoId ? { ...r2, activeWorkspaceId: id2 } : r2),
    selected: []
  })),
  renameWorkspace: (id2, name) => set2((s) => ({
    repos: s.repos.map(
      (r2) => r2.id === s.activeRepoId ? { ...r2, workspaces: r2.workspaces.map((w2) => w2.id === id2 ? { ...w2, name: name.slice(0, 24) } : w2) } : r2
    )
  })),
  closeWorkspace: (id2) => set2((s) => {
    const repo = s.repos.find((r2) => r2.id === s.activeRepoId);
    if (!repo || repo.workspaces.length <= 1) return s;
    const workspaces = repo.workspaces.filter((w2) => w2.id !== id2);
    const activeWorkspaceId = repo.activeWorkspaceId === id2 ? workspaces[0].id : repo.activeWorkspaceId;
    return {
      repos: s.repos.map((r2) => r2.id === repo.id ? { ...r2, workspaces, activeWorkspaceId } : r2)
    };
  }),
  board: () => {
    const s = get2();
    const repo = s.repos.find((r2) => r2.id === s.activeRepoId);
    return repo?.workspaces.find((w2) => w2.id === repo.activeWorkspaceId)?.board ?? null;
  },
  updateBoard: (fn) => set2((s) => {
    const repo = s.repos.find((r2) => r2.id === s.activeRepoId);
    const ws = repo?.workspaces.find((w2) => w2.id === repo.activeWorkspaceId);
    if (!ws) return {};
    const next = fn(ws.board);
    const structural = next.nodes !== ws.board.nodes || next.groups !== ws.board.groups || next.wires !== ws.board.wires;
    if (next !== ws.board && structural) recordHistory(ws.id, ws.board);
    return {
      repos: s.repos.map(
        (r2) => r2.id !== s.activeRepoId ? r2 : {
          ...r2,
          workspaces: r2.workspaces.map(
            (w2) => w2.id === r2.activeWorkspaceId ? { ...w2, board: next } : w2
          )
        }
      )
    };
  }),
  addNode: (node) => get2().addNodes([node]),
  addNodes: (nodes) => get2().updateBoard((b) => {
    const top = b.nodes.reduce((m2, n2) => Math.max(m2, n2.z), 0);
    return { ...b, nodes: [...b.nodes, ...nodes.map((n2, i) => ({ ...n2, z: top + i + 1 }))] };
  }),
  connectNodes: (fromId, toId) => {
    if (fromId === toId) return "none";
    const b = get2().board();
    if (!b) return "none";
    const from = b.nodes.find((n2) => n2.id === fromId);
    const to = b.nodes.find((n2) => n2.id === toId);
    if (!from || !to) return "none";
    const existing = b.wires.find(
      (w2) => w2.from === fromId && w2.to === toId || w2.from === toId && w2.to === fromId
    );
    const nextWire = {
      id: uid(),
      from: fromId,
      to: toId,
      kind: from.kind === "orchestrator" || to.kind === "orchestrator" ? "orchestrator" : "plain"
    };
    get2().updateBoard((board) => ({
      ...board,
      wires: existing ? board.wires.filter((w2) => w2.id !== existing.id) : [...board.wires, nextWire],
      nodes: board.nodes.map((n2) => {
        if (n2.kind !== "orchestrator" || n2.id !== fromId && n2.id !== toId) return n2;
        const other2 = n2.id === fromId ? toId : fromId;
        if (existing) return { ...n2, wired: n2.wired.filter((id2) => id2 !== other2) };
        return n2.wired.includes(other2) ? n2 : { ...n2, wired: [...n2.wired, other2] };
      })
    }));
    return existing ? "removed" : "added";
  },
  // Patch by id across every workspace: a console keeps reporting while its
  // workspace is in the background.
  patchNode: (id2, patch) => set2((s) => ({
    repos: s.repos.map((r2) => ({
      ...r2,
      workspaces: r2.workspaces.map(
        (w2) => w2.board.nodes.some((n2) => n2.id === id2) ? {
          ...w2,
          board: {
            ...w2.board,
            nodes: w2.board.nodes.map((n2) => n2.id === id2 ? { ...n2, ...patch } : n2)
          }
        } : w2
      )
    }))
  })),
  removeNodes: (ids) => get2().updateBoard((b) => ({
    ...b,
    nodes: b.nodes.filter((n2) => !ids.includes(n2.id)).map((n2) => n2.kind === "orchestrator" ? { ...n2, wired: n2.wired.filter((id2) => !ids.includes(id2)) } : n2),
    wires: b.wires.filter((w2) => !ids.includes(w2.from) && !ids.includes(w2.to)),
    groups: b.groups.map((g) => ({ ...g, memberIds: g.memberIds.filter((m2) => !ids.includes(m2)) })).filter((g) => g.memberIds.length > 0)
  })),
  bringToFront: (id2) => get2().updateBoard((b) => {
    const top = b.nodes.reduce((m2, n2) => Math.max(m2, n2.z), 0);
    return { ...b, nodes: b.nodes.map((n2) => n2.id === id2 ? { ...n2, z: top + 1 } : n2) };
  }),
  setSelection: (ids) => set2({ selected: ids }),
  toggleSelect: (id2) => set2((s) => ({
    selected: s.selected.includes(id2) ? s.selected.filter((x2) => x2 !== id2) : [...s.selected, id2]
  })),
  viewport: (v2) => get2().updateBoard((b) => ({ ...b, viewport: v2 })),
  undo: () => stepHistory(-1),
  redo: () => stepHistory(1),
  setPanel: (p2) => set2({ panel: p2, missionOpen: p2 === "mission" }),
  setTool: (t2) => set2((s) => ({ tool: t2, wireFrom: t2 === "wire" ? s.wireFrom : null })),
  setWireFrom: (id2) => set2({ wireFrom: id2 }),
  setThreadOpen: (v2) => set2({ threadOpen: v2 }),
  setCommandDraft: (v2) => set2({ commandDraft: v2 }),
  setDictation: (v2) => set2({ dictation: v2 }),
  setComposerOpen: (v2) => set2({ composerOpen: v2, ...v2 ? { brainOpen: false } : {} }),
  setBrainOpen: (v2) => set2({ brainOpen: v2, ...v2 ? { composerOpen: false } : {} }),
  setBrainBusy: (v2) => set2({ brainBusy: v2 }),
  toast: (text, kind = "info") => {
    const id2 = nanoid(6);
    set2((s) => ({ toasts: [...s.toasts.slice(-3), { id: id2, text, kind }] }));
    setTimeout(() => get2().dismissToast(id2), 4200);
  },
  dismissToast: (id2) => set2((s) => ({ toasts: s.toasts.filter((t2) => t2.id !== id2) })),
  patchSettings: (p2) => set2((s) => {
    const settings = { ...s.settings, ...p2 };
    if (p2.customAgents) registerCustomAgents(p2.customAgents);
    return { settings };
  }),
  addMessage: (repoId, msg) => set2((s) => ({
    threads: {
      ...s.threads,
      [repoId]: [
        ...s.threads[repoId] ?? [],
        { ...msg, id: nanoid(8), at: Date.now() }
      ].slice(-500)
    }
  })),
  clearThread: (repoId) => set2((s) => ({ threads: { ...s.threads, [repoId]: [] } })),
  setLoops: (loops) => set2({ loops }),
  addFact: (fact) => set2((s) => ({ memory: [...s.memory, { ...fact, id: nanoid(8) }] })),
  removeFact: (id2) => set2((s) => ({ memory: s.memory.filter((f2) => f2.id !== id2) })),
  addProfile: (p2) => set2((s) => ({ profiles: [...s.profiles, p2] })),
  saveLayout: (nodes) => set2((s) => ({
    savedPresets: [
      ...s.savedPresets,
      { id: nanoid(8), name: `Set ${s.savedPresets.length + 1}`, nodes }
    ]
  })),
  deleteSavedPreset: (id2) => set2((s) => ({ savedPresets: s.savedPresets.filter((p2) => p2.id !== id2) }))
}));
const activeRepo = (s) => s.repos.find((r2) => r2.id === s.activeRepoId) ?? null;
const consolesOf = (b) => b?.nodes.filter((n2) => n2.kind === "console") ?? [];
const histories = /* @__PURE__ */ new Map();
function recordHistory(workspaceId, previous) {
  const h = histories.get(workspaceId) ?? { past: [], future: [], last: 0 };
  const now2 = Date.now();
  if (now2 - h.last > 350) {
    h.past.push(structuredClone(previous));
    if (h.past.length > 50) h.past.shift();
    h.future = [];
    h.last = now2;
    histories.set(workspaceId, h);
  }
}
function stepHistory(direction) {
  const s = useApp.getState();
  const repo = s.repos.find((r2) => r2.id === s.activeRepoId);
  const ws = repo?.workspaces.find((w2) => w2.id === repo.activeWorkspaceId);
  if (!ws) return;
  const h = histories.get(ws.id);
  if (!h) return;
  const from = direction === -1 ? h.past : h.future;
  const to = direction === -1 ? h.future : h.past;
  const target = from.pop();
  if (!target) return;
  to.push(structuredClone(ws.board));
  useApp.setState({
    repos: s.repos.map(
      (r2) => r2.id !== s.activeRepoId ? r2 : {
        ...r2,
        workspaces: r2.workspaces.map((w2) => w2.id === r2.activeWorkspaceId ? { ...w2, board: target } : w2)
      }
    )
  });
}
const findConsole = (s, id2) => {
  for (const r2 of s.repos) {
    for (const w2 of r2.workspaces) {
      const n2 = w2.board.nodes.find((x2) => x2.id === id2);
      if (n2?.kind === "console") return n2;
    }
  }
  return void 0;
};
const llmConfig = (settings) => settings.llmProvider === "lmstudio" ? { provider: "lmstudio", url: settings.lmStudioUrl, model: settings.lmStudioModel } : { provider: "ollama", url: settings.ollamaUrl, model: settings.ollamaModel };
let saveTimer = null;
function startPersistence() {
  const unsub = useApp.subscribe((s) => {
    if (!s.hydrated) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const st = useApp.getState();
      const payload = {
        version: 2,
        repos: st.repos,
        activeRepoId: st.activeRepoId,
        settings: st.settings,
        threads: st.threads,
        loops: st.loops,
        memory: st.memory,
        profiles: st.profiles,
        savedPresets: st.savedPresets,
        recent: st.recent
      };
      void window.api.store.save(payload);
    }, 700);
  });
  return unsub;
}
const base = (x2, y2, w2, h, title) => ({
  id: uid(),
  x: x2,
  y: y2,
  w: w2,
  h,
  z: 1,
  title
});
const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function makeConsole(x2, y2, opts = {}) {
  return {
    ...base(x2, y2, 400, 260, opts.title ?? "Console"),
    kind: "console",
    agentId: opts.agentId ?? "claude",
    cwd: opts.cwd ?? "",
    status: "STARTING",
    launchKey: 0,
    yolo: opts.yolo,
    profileId: opts.profileId,
    ...opts
  };
}
function makeNote(x2, y2, text = "") {
  return {
    ...base(x2, y2, 240, 170, "Note"),
    kind: "note",
    text,
    paper: "#f5e6a8"
  };
}
function makeText(x2, y2) {
  return {
    ...base(x2, y2, 260, 80, "Text"),
    kind: "text",
    text: "",
    font: "Sketch",
    size: 18,
    align: "left"
  };
}
function makeChecklist(x2, y2) {
  return {
    ...base(x2, y2, 260, 220, "Checklist"),
    kind: "checklist",
    items: [{ id: uid(), text: "First objective", done: false }]
  };
}
function makeKanban(x2, y2) {
  return {
    ...base(x2, y2, 560, 380, "Board"),
    kind: "kanban",
    columns: ["Backlog", "To do", "In progress", "Done"].map((title, i) => ({
      id: uid(),
      title,
      color: ["#64748b", "#38bdf8", "#f59e0b", "#34d399"][i],
      cards: []
    }))
  };
}
function makeCalendar(x2, y2) {
  const d = /* @__PURE__ */ new Date();
  return {
    ...base(x2, y2, 420, 360, "Calendar"),
    kind: "calendar",
    month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    events: [
      { id: uid(), title: "Review the board", date: today(), allDay: true, color: "#a78bfa" }
    ]
  };
}
function makeWeb(x2, y2, url = "http://localhost:3000") {
  return {
    ...base(x2, y2, 500, 340, "Web"),
    kind: "web",
    url,
    zoom: 100,
    device: "fit"
  };
}
function makeShape(x2, y2, shape = "rect") {
  return {
    ...base(x2, y2, shape === "sticky" ? 200 : 220, shape === "sticky" ? 160 : 140, shape),
    kind: "shape",
    shape,
    style: { stroke: "#cbd5e1", fill: "transparent", width: 2, dashed: false, sloppy: true }
  };
}
function makeOrchestrator(x2, y2, name = "Director") {
  return {
    ...base(x2, y2, 360, 420, name),
    kind: "orchestrator",
    wired: []
  };
}
function newNode(kind, x2, y2, extra = {}) {
  switch (kind) {
    case "note":
      return makeNote(x2, y2, extra.text ?? "");
    case "text":
      return makeText(x2, y2);
    case "checklist":
      return makeChecklist(x2, y2);
    case "kanban":
      return makeKanban(x2, y2);
    case "calendar":
      return makeCalendar(x2, y2);
    case "web tile":
    case "web":
      return makeWeb(x2, y2, extra.url ?? "http://localhost:3000");
    case "shape":
      return makeShape(x2, y2, extra.shape ?? "rect");
    case "director":
    case "orchestrator":
      return { ...makeOrchestrator(x2, y2, extra.name || "Director"), wired: extra.wired ?? [] };
    case "memory":
      return {
        ...base(x2, y2, 300, 240, "Memory"),
        kind: "memory",
        scope: extra.scope ?? "repo"
      };
    case "branches":
      return { ...base(x2, y2, 280, 300, "Branches"), kind: "branches" };
    case "console":
      return makeConsole(x2, y2, extra);
    default:
      return makeNote(x2, y2);
  }
}
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var noopTest = { exec: () => null };
function edit(regex, opt = "") {
  let source = typeof regex === "string" ? regex : regex.source;
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(other.caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
var other = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
  htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
};
var newline = /^(?:[ \t]*(?:\n|$))+/;
var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  lheading: lheadingGfm,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = /[\p{P}\p{S}]/u;
var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimUnd = edit(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link$1 = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link: link$1,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  emStrongRDelimAst: emStrongRDelimAstGfm,
  emStrongLDelim: emStrongLDelimGfm,
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch2) => escapeReplacements[ch2];
function escape2(html2, encode) {
  if (encode) {
    if (other.escapeTest.test(html2)) {
      return html2.replace(other.escapeReplace, getEscapeReplacement);
    }
  } else {
    if (other.escapeTestNoEncode.test(html2)) {
      return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(other.percentDecode, "%");
  } catch {
    return null;
  }
  return href;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(other.findPipe, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(other.splitPipe);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells.at(-1)?.trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(other.slashPipe, "|");
  }
  return cells;
}
function rtrim(str, c2, invert) {
  const l2 = str.length;
  if (l2 === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l2) {
    const currChar = str.charAt(l2 - suffLen - 1);
    if (currChar === c2 && true) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l2 - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  if (level > 0) {
    return -2;
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2, rules) {
  const href = link2.href;
  const title = link2.title || null;
  const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
  lexer2.state.inLink = true;
  const token = {
    type: cap[0].charAt(0) === "!" ? "image" : "link",
    raw,
    href,
    title,
    text,
    tokens: lexer2.inlineTokens(text)
  };
  lexer2.state.inLink = false;
  return token;
}
function indentCodeCompensation(raw, text, rules) {
  const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(rules.other.beginningSpace);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (this.rules.other.endingHash.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: rtrim(cap[0], "\n")
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let lines = rtrim(cap[0], "\n").split("\n");
      let raw = "";
      let text = "";
      const tokens = [];
      while (lines.length > 0) {
        let inBlockquote = false;
        const currentLines = [];
        let i;
        for (i = 0; i < lines.length; i++) {
          if (this.rules.other.blockquoteStart.test(lines[i])) {
            currentLines.push(lines[i]);
            inBlockquote = true;
          } else if (!inBlockquote) {
            currentLines.push(lines[i]);
          } else {
            break;
          }
        }
        lines = lines.slice(i);
        const currentRaw = currentLines.join("\n");
        const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
        raw = raw ? `${raw}
${currentRaw}` : currentRaw;
        text = text ? `${text}
${currentText}` : currentText;
        const top = this.lexer.state.top;
        this.lexer.state.top = true;
        this.lexer.blockTokens(currentText, tokens, true);
        this.lexer.state.top = top;
        if (lines.length === 0) {
          break;
        }
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "code") {
          break;
        } else if (lastToken?.type === "blockquote") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.blockquote(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
          break;
        } else if (lastToken?.type === "list") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.list(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
          lines = newText.substring(tokens.at(-1).raw.length).split("\n");
          continue;
        }
      }
      return {
        type: "blockquote",
        raw,
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = this.rules.other.listItemRegex(bull);
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        let raw = "";
        let itemContents = "";
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t2) => " ".repeat(3 * t2.length));
        let nextLine = src.split("\n", 1)[0];
        let blankLine = !line.trim();
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else if (blankLine) {
          indent = cap[1].length + 1;
        } else {
          indent = cap[2].search(this.rules.other.nonSpaceChar);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        if (blankLine && this.rules.other.blankLine.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
          const hrRegex = this.rules.other.hrRegex(indent);
          const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
          const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
          const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            let nextLineWithoutTabs;
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
              nextLineWithoutTabs = nextLine;
            } else {
              nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (htmlBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(nextLine)) {
              break;
            }
            if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLineWithoutTabs.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLineWithoutTabs.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (this.rules.other.doubleBlankLine.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = this.rules.other.listIsTask.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      const lastItem = list2.items.at(-1);
      if (lastItem) {
        lastItem.raw = lastItem.raw.trimEnd();
        lastItem.text = lastItem.text.trimEnd();
      } else {
        return;
      }
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => this.rules.other.anyLine.test(t2.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
      const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!this.rules.other.tableDelimiter.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
    const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (this.rules.other.tableAlignRight.test(align)) {
        item.align.push("right");
      } else if (this.rules.other.tableAlignCenter.test(align)) {
        item.align.push("center");
      } else if (this.rules.other.tableAlignLeft.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (let i = 0; i < headers.length; i++) {
      item.header.push({
        text: headers[i],
        tokens: this.lexer.inline(headers[i]),
        header: true,
        align: item.align[i]
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell),
          header: false,
          align: item.align[i]
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: cap[1]
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
        if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex === -2) {
          return;
        }
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = this.rules.other.pedanticHrefTitle.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (this.rules.other.startAngleBracket.test(href)) {
        if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer, this.rules);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer, this.rules);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match) return;
    if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim) continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0) continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
      const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
      const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[1];
        href = "mailto:" + text;
      } else {
        text = cap[1];
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[0];
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = cap[0];
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      const escaped = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        escaped
      };
    }
  }
};
var _Lexer = class __Lexer {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      other,
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(other.carriageReturn, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = [], lastParagraphClipped = false) {
    if (this.options.pedantic) {
      src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
    }
    while (src) {
      let token;
      if (this.options.extensions?.block?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.raw.length === 1 && lastToken !== void 0) {
          lastToken.raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        const lastToken = tokens.at(-1);
        if (lastParagraphClipped && lastToken?.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let maskedSrc = src;
    let match = null;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    let keepPrevChar = false;
    let prevChar = "";
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      let token;
      if (this.options.extensions?.inline?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.type === "text" && lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  options;
  parser;
  // set by the parser
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(token) {
    return "";
  }
  code({ text, lang, escaped }) {
    const langString = (lang || "").match(other.notSpaceStart)?.[0];
    const code = text.replace(other.endingNewline, "") + "\n";
    if (!langString) {
      return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
  }
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote>
${body}</blockquote>
`;
  }
  html({ text }) {
    return text;
  }
  heading({ tokens, depth }) {
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
  }
  hr(token) {
    return "<hr>\n";
  }
  list(token) {
    const ordered = token.ordered;
    const start = token.start;
    let body = "";
    for (let j = 0; j < token.items.length; j++) {
      const item = token.items[j];
      body += this.listitem(item);
    }
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
  }
  listitem(item) {
    let itemBody = "";
    if (item.task) {
      const checkbox = this.checkbox({ checked: !!item.checked });
      if (item.loose) {
        if (item.tokens[0]?.type === "paragraph") {
          item.tokens[0].text = checkbox + " " + item.tokens[0].text;
          if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
            item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
            item.tokens[0].tokens[0].escaped = true;
          }
        } else {
          item.tokens.unshift({
            type: "text",
            raw: checkbox + " ",
            text: checkbox + " ",
            escaped: true
          });
        }
      } else {
        itemBody += checkbox + " ";
      }
    }
    itemBody += this.parser.parse(item.tokens, !!item.loose);
    return `<li>${itemBody}</li>
`;
  }
  checkbox({ checked }) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens }) {
    return `<p>${this.parser.parseInline(tokens)}</p>
`;
  }
  table(token) {
    let header = "";
    let cell = "";
    for (let j = 0; j < token.header.length; j++) {
      cell += this.tablecell(token.header[j]);
    }
    header += this.tablerow({ text: cell });
    let body = "";
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      cell = "";
      for (let k2 = 0; k2 < row.length; k2++) {
        cell += this.tablecell(row[k2]);
      }
      body += this.tablerow({ text: cell });
    }
    if (body) body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow({ text }) {
    return `<tr>
${text}</tr>
`;
  }
  tablecell(token) {
    const content = this.parser.parseInline(token.tokens);
    const type = token.header ? "th" : "td";
    const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens }) {
    return `<strong>${this.parser.parseInline(tokens)}</strong>`;
  }
  em({ tokens }) {
    return `<em>${this.parser.parseInline(tokens)}</em>`;
  }
  codespan({ text }) {
    return `<code>${escape2(text, true)}</code>`;
  }
  br(token) {
    return "<br>";
  }
  del({ tokens }) {
    return `<del>${this.parser.parseInline(tokens)}</del>`;
  }
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + escape2(title) + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image({ href, title, text, tokens }) {
    if (tokens) {
      text = this.parser.parseInline(tokens, this.parser.textRenderer);
    }
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return escape2(text);
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${escape2(title)}"`;
    }
    out += ">";
    return out;
  }
  text(token) {
    return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong({ text }) {
    return text;
  }
  em({ text }) {
    return text;
  }
  codespan({ text }) {
    return text;
  }
  del({ text }) {
    return text;
  }
  html({ text }) {
    return text;
  }
  text({ text }) {
    return text;
  }
  link({ text }) {
    return "" + text;
  }
  image({ text }) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.renderer.parser = this;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const genericToken = anyToken;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "space": {
          out += this.renderer.space(token);
          continue;
        }
        case "hr": {
          out += this.renderer.hr(token);
          continue;
        }
        case "heading": {
          out += this.renderer.heading(token);
          continue;
        }
        case "code": {
          out += this.renderer.code(token);
          continue;
        }
        case "table": {
          out += this.renderer.table(token);
          continue;
        }
        case "blockquote": {
          out += this.renderer.blockquote(token);
          continue;
        }
        case "list": {
          out += this.renderer.list(token);
          continue;
        }
        case "html": {
          out += this.renderer.html(token);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(token);
          continue;
        }
        case "text": {
          let textToken = token;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: "paragraph",
              raw: body,
              text: body,
              tokens: [{ type: "text", raw: body, text: body, escaped: true }]
            });
          } else {
            out += body;
          }
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer = this.renderer) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "escape": {
          out += renderer.text(token);
          break;
        }
        case "html": {
          out += renderer.html(token);
          break;
        }
        case "link": {
          out += renderer.link(token);
          break;
        }
        case "image": {
          out += renderer.image(token);
          break;
        }
        case "strong": {
          out += renderer.strong(token);
          break;
        }
        case "em": {
          out += renderer.em(token);
          break;
        }
        case "codespan": {
          out += renderer.codespan(token);
          break;
        }
        case "br": {
          out += renderer.br(token);
          break;
        }
        case "del": {
          out += renderer.del(token);
          break;
        }
        case "text": {
          out += renderer.text(token);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  options;
  block;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? _Lexer.lex : _Lexer.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? _Parser.parse : _Parser.parseInline;
  }
};
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (["options", "parser"].includes(prop)) {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (["options", "block"].includes(prop)) {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  parseMarkdown(blockType) {
    const parse2 = (src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      const throwError = this.onError(!!opt.silent, !!opt.async);
      if (this.defaults.async === true && origOpt.async === false) {
        return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      }
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
        opt.hooks.block = blockType;
      }
      const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
      const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html2 = parser2(tokens, opt);
        if (opt.hooks) {
          html2 = opt.hooks.postprocess(html2);
        }
        return html2;
      } catch (e) {
        return throwError(e);
      }
    };
    return parse2;
  }
  onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
marked.options;
marked.setOptions;
marked.use;
marked.walkTokens;
marked.parseInline;
_Parser.parse;
_Lexer.lex;
var xterm = { exports: {} };
(function(module, exports) {
  !function(e, t2) {
    module.exports = t2();
  }(globalThis, () => (() => {
    var e = { 4567: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.AccessibilityManager = void 0;
      const n2 = i2(9042), o = i2(9924), a2 = i2(844), h = i2(4725), c2 = i2(2585), l2 = i2(3656);
      let d = t3.AccessibilityManager = class extends a2.Disposable {
        constructor(e3, t4, i3, s3) {
          super(), this._terminal = e3, this._coreBrowserService = i3, this._renderService = s3, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = this._coreBrowserService.mainDocument.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = this._coreBrowserService.mainDocument.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
          for (let e4 = 0; e4 < this._terminal.rows; e4++) this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
          if (this._topBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 0), this._bottomBoundaryFocusListener = (e4) => this._handleBoundaryFocus(e4, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = this._coreBrowserService.mainDocument.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new o.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
          this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize((e4) => this._handleResize(e4.rows))), this.register(this._terminal.onRender((e4) => this._refreshRows(e4.start, e4.end))), this.register(this._terminal.onScroll(() => this._refreshRows())), this.register(this._terminal.onA11yChar((e4) => this._handleChar(e4))), this.register(this._terminal.onLineFeed(() => this._handleChar("\n"))), this.register(this._terminal.onA11yTab((e4) => this._handleTab(e4))), this.register(this._terminal.onKey((e4) => this._handleKey(e4.key))), this.register(this._terminal.onBlur(() => this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this.register((0, l2.addDisposableDomListener)(document, "selectionchange", () => this._handleSelectionChange())), this.register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRows(), this.register((0, a2.toDisposable)(() => {
            this._accessibilityContainer.remove(), this._rowElements.length = 0;
          }));
        }
        _handleTab(e3) {
          for (let t4 = 0; t4 < e3; t4++) this._handleChar(" ");
        }
        _handleChar(e3) {
          this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e3 && (this._charsToAnnounce += e3) : this._charsToAnnounce += e3, "\n" === e3 && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += n2.tooMuchOutput)));
        }
        _clearLiveRegion() {
          this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
        }
        _handleKey(e3) {
          this._clearLiveRegion(), new RegExp("\\p{Control}", "u").test(e3) || this._charsToConsume.push(e3);
        }
        _refreshRows(e3, t4) {
          this._liveRegionDebouncer.refresh(e3, t4, this._terminal.rows);
        }
        _renderRows(e3, t4) {
          const i3 = this._terminal.buffer, s3 = i3.lines.length.toString();
          for (let r3 = e3; r3 <= t4; r3++) {
            const e4 = i3.lines.get(i3.ydisp + r3), t5 = [], n3 = e4?.translateToString(true, void 0, void 0, t5) || "", o2 = (i3.ydisp + r3 + 1).toString(), a3 = this._rowElements[r3];
            a3 && (0 === n3.length ? (a3.innerText = " ", this._rowColumns.set(a3, [0, 1])) : (a3.textContent = n3, this._rowColumns.set(a3, t5)), a3.setAttribute("aria-posinset", o2), a3.setAttribute("aria-setsize", s3));
          }
          this._announceCharacters();
        }
        _announceCharacters() {
          0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
        }
        _handleBoundaryFocus(e3, t4) {
          const i3 = e3.target, s3 = this._rowElements[0 === t4 ? 1 : this._rowElements.length - 2];
          if (i3.getAttribute("aria-posinset") === (0 === t4 ? "1" : `${this._terminal.buffer.lines.length}`)) return;
          if (e3.relatedTarget !== s3) return;
          let r3, n3;
          if (0 === t4 ? (r3 = i3, n3 = this._rowElements.pop(), this._rowContainer.removeChild(n3)) : (r3 = this._rowElements.shift(), n3 = i3, this._rowContainer.removeChild(r3)), r3.removeEventListener("focus", this._topBoundaryFocusListener), n3.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t4) {
            const e4 = this._createAccessibilityTreeNode();
            this._rowElements.unshift(e4), this._rowContainer.insertAdjacentElement("afterbegin", e4);
          } else {
            const e4 = this._createAccessibilityTreeNode();
            this._rowElements.push(e4), this._rowContainer.appendChild(e4);
          }
          this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t4 ? -1 : 1), this._rowElements[0 === t4 ? 1 : this._rowElements.length - 2].focus(), e3.preventDefault(), e3.stopImmediatePropagation();
        }
        _handleSelectionChange() {
          if (0 === this._rowElements.length) return;
          const e3 = document.getSelection();
          if (!e3) return;
          if (e3.isCollapsed) return void (this._rowContainer.contains(e3.anchorNode) && this._terminal.clearSelection());
          if (!e3.anchorNode || !e3.focusNode) return void console.error("anchorNode and/or focusNode are null");
          let t4 = { node: e3.anchorNode, offset: e3.anchorOffset }, i3 = { node: e3.focusNode, offset: e3.focusOffset };
          if ((t4.node.compareDocumentPosition(i3.node) & Node.DOCUMENT_POSITION_PRECEDING || t4.node === i3.node && t4.offset > i3.offset) && ([t4, i3] = [i3, t4]), t4.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t4 = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(t4.node)) return;
          const s3 = this._rowElements.slice(-1)[0];
          if (i3.node.compareDocumentPosition(s3) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (i3 = { node: s3, offset: s3.textContent?.length ?? 0 }), !this._rowContainer.contains(i3.node)) return;
          const r3 = ({ node: e4, offset: t5 }) => {
            const i4 = e4 instanceof Text ? e4.parentNode : e4;
            let s4 = parseInt(i4?.getAttribute("aria-posinset"), 10) - 1;
            if (isNaN(s4)) return console.warn("row is invalid. Race condition?"), null;
            const r4 = this._rowColumns.get(i4);
            if (!r4) return console.warn("columns is null. Race condition?"), null;
            let n4 = t5 < r4.length ? r4[t5] : r4.slice(-1)[0] + 1;
            return n4 >= this._terminal.cols && (++s4, n4 = 0), { row: s4, column: n4 };
          }, n3 = r3(t4), o2 = r3(i3);
          if (n3 && o2) {
            if (n3.row > o2.row || n3.row === o2.row && n3.column >= o2.column) throw new Error("invalid range");
            this._terminal.select(n3.column, n3.row, (o2.row - n3.row) * this._terminal.cols - n3.column + o2.column);
          }
        }
        _handleResize(e3) {
          this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
          for (let e4 = this._rowContainer.children.length; e4 < this._terminal.rows; e4++) this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
          for (; this._rowElements.length > e3; ) this._rowContainer.removeChild(this._rowElements.pop());
          this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
        }
        _createAccessibilityTreeNode() {
          const e3 = this._coreBrowserService.mainDocument.createElement("div");
          return e3.setAttribute("role", "listitem"), e3.tabIndex = -1, this._refreshRowDimensions(e3), e3;
        }
        _refreshRowsDimensions() {
          if (this._renderService.dimensions.css.cell.height) {
            this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
            for (let e3 = 0; e3 < this._terminal.rows; e3++) this._refreshRowDimensions(this._rowElements[e3]);
          }
        }
        _refreshRowDimensions(e3) {
          e3.style.height = `${this._renderService.dimensions.css.cell.height}px`;
        }
      };
      t3.AccessibilityManager = d = s2([r2(1, c2.IInstantiationService), r2(2, h.ICoreBrowserService), r2(3, h.IRenderService)], d);
    }, 3614: (e2, t3) => {
      function i2(e3) {
        return e3.replace(/\r?\n/g, "\r");
      }
      function s2(e3, t4) {
        return t4 ? "\x1B[200~" + e3 + "\x1B[201~" : e3;
      }
      function r2(e3, t4, r3, n3) {
        e3 = s2(e3 = i2(e3), r3.decPrivateModes.bracketedPasteMode && true !== n3.rawOptions.ignoreBracketedPasteMode), r3.triggerDataEvent(e3, true), t4.value = "";
      }
      function n2(e3, t4, i3) {
        const s3 = i3.getBoundingClientRect(), r3 = e3.clientX - s3.left - 10, n3 = e3.clientY - s3.top - 10;
        t4.style.width = "20px", t4.style.height = "20px", t4.style.left = `${r3}px`, t4.style.top = `${n3}px`, t4.style.zIndex = "1000", t4.focus();
      }
      Object.defineProperty(t3, "__esModule", { value: true }), t3.rightClickHandler = t3.moveTextAreaUnderMouseCursor = t3.paste = t3.handlePasteEvent = t3.copyHandler = t3.bracketTextForPaste = t3.prepareTextForTerminal = void 0, t3.prepareTextForTerminal = i2, t3.bracketTextForPaste = s2, t3.copyHandler = function(e3, t4) {
        e3.clipboardData && e3.clipboardData.setData("text/plain", t4.selectionText), e3.preventDefault();
      }, t3.handlePasteEvent = function(e3, t4, i3, s3) {
        e3.stopPropagation(), e3.clipboardData && r2(e3.clipboardData.getData("text/plain"), t4, i3, s3);
      }, t3.paste = r2, t3.moveTextAreaUnderMouseCursor = n2, t3.rightClickHandler = function(e3, t4, i3, s3, r3) {
        n2(e3, t4, i3), r3 && s3.rightClickSelect(e3), t4.value = s3.selectionText, t4.select();
      };
    }, 7239: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ColorContrastCache = void 0;
      const s2 = i2(1505);
      t3.ColorContrastCache = class {
        constructor() {
          this._color = new s2.TwoKeyMap(), this._css = new s2.TwoKeyMap();
        }
        setCss(e3, t4, i3) {
          this._css.set(e3, t4, i3);
        }
        getCss(e3, t4) {
          return this._css.get(e3, t4);
        }
        setColor(e3, t4, i3) {
          this._color.set(e3, t4, i3);
        }
        getColor(e3, t4) {
          return this._color.get(e3, t4);
        }
        clear() {
          this._color.clear(), this._css.clear();
        }
      };
    }, 3656: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.addDisposableDomListener = void 0, t3.addDisposableDomListener = function(e3, t4, i2, s2) {
        e3.addEventListener(t4, i2, s2);
        let r2 = false;
        return { dispose: () => {
          r2 || (r2 = true, e3.removeEventListener(t4, i2, s2));
        } };
      };
    }, 3551: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Linkifier = void 0;
      const n2 = i2(3656), o = i2(8460), a2 = i2(844), h = i2(2585), c2 = i2(4725);
      let l2 = t3.Linkifier = class extends a2.Disposable {
        get currentLink() {
          return this._currentLink;
        }
        constructor(e3, t4, i3, s3, r3) {
          super(), this._element = e3, this._mouseService = t4, this._renderService = i3, this._bufferService = s3, this._linkProviderService = r3, this._linkCacheDisposables = [], this._isMouseOut = true, this._wasResized = false, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new o.EventEmitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, a2.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, a2.toDisposable)(() => {
            this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
          })), this.register(this._bufferService.onResize(() => {
            this._clearCurrentLink(), this._wasResized = true;
          })), this.register((0, n2.addDisposableDomListener)(this._element, "mouseleave", () => {
            this._isMouseOut = true, this._clearCurrentLink();
          })), this.register((0, n2.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, n2.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, n2.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
        }
        _handleMouseMove(e3) {
          this._lastMouseEvent = e3;
          const t4 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
          if (!t4) return;
          this._isMouseOut = false;
          const i3 = e3.composedPath();
          for (let e4 = 0; e4 < i3.length; e4++) {
            const t5 = i3[e4];
            if (t5.classList.contains("xterm")) break;
            if (t5.classList.contains("xterm-hover")) return;
          }
          this._lastBufferCell && t4.x === this._lastBufferCell.x && t4.y === this._lastBufferCell.y || (this._handleHover(t4), this._lastBufferCell = t4);
        }
        _handleHover(e3) {
          if (this._activeLine !== e3.y || this._wasResized) return this._clearCurrentLink(), this._askForLink(e3, false), void (this._wasResized = false);
          this._currentLink && this._linkAtPosition(this._currentLink.link, e3) || (this._clearCurrentLink(), this._askForLink(e3, true));
        }
        _askForLink(e3, t4) {
          this._activeProviderReplies && t4 || (this._activeProviderReplies?.forEach((e4) => {
            e4?.forEach((e5) => {
              e5.link.dispose && e5.link.dispose();
            });
          }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e3.y);
          let i3 = false;
          for (const [s3, r3] of this._linkProviderService.linkProviders.entries()) if (t4) {
            const t5 = this._activeProviderReplies?.get(s3);
            t5 && (i3 = this._checkLinkProviderResult(s3, e3, i3));
          } else r3.provideLinks(e3.y, (t5) => {
            if (this._isMouseOut) return;
            const r4 = t5?.map((e4) => ({ link: e4 }));
            this._activeProviderReplies?.set(s3, r4), i3 = this._checkLinkProviderResult(s3, e3, i3), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e3.y, this._activeProviderReplies);
          });
        }
        _removeIntersectingLinks(e3, t4) {
          const i3 = /* @__PURE__ */ new Set();
          for (let s3 = 0; s3 < t4.size; s3++) {
            const r3 = t4.get(s3);
            if (r3) for (let t5 = 0; t5 < r3.length; t5++) {
              const s4 = r3[t5], n3 = s4.link.range.start.y < e3 ? 0 : s4.link.range.start.x, o2 = s4.link.range.end.y > e3 ? this._bufferService.cols : s4.link.range.end.x;
              for (let e4 = n3; e4 <= o2; e4++) {
                if (i3.has(e4)) {
                  r3.splice(t5--, 1);
                  break;
                }
                i3.add(e4);
              }
            }
          }
        }
        _checkLinkProviderResult(e3, t4, i3) {
          if (!this._activeProviderReplies) return i3;
          const s3 = this._activeProviderReplies.get(e3);
          let r3 = false;
          for (let t5 = 0; t5 < e3; t5++) this._activeProviderReplies.has(t5) && !this._activeProviderReplies.get(t5) || (r3 = true);
          if (!r3 && s3) {
            const e4 = s3.find((e5) => this._linkAtPosition(e5.link, t4));
            e4 && (i3 = true, this._handleNewLink(e4));
          }
          if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !i3) for (let e4 = 0; e4 < this._activeProviderReplies.size; e4++) {
            const s4 = this._activeProviderReplies.get(e4)?.find((e5) => this._linkAtPosition(e5.link, t4));
            if (s4) {
              i3 = true, this._handleNewLink(s4);
              break;
            }
          }
          return i3;
        }
        _handleMouseDown() {
          this._mouseDownLink = this._currentLink;
        }
        _handleMouseUp(e3) {
          if (!this._currentLink) return;
          const t4 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
          t4 && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t4) && this._currentLink.link.activate(e3, this._currentLink.link.text);
        }
        _clearCurrentLink(e3, t4) {
          this._currentLink && this._lastMouseEvent && (!e3 || !t4 || this._currentLink.link.range.start.y >= e3 && this._currentLink.link.range.end.y <= t4) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, a2.disposeArray)(this._linkCacheDisposables));
        }
        _handleNewLink(e3) {
          if (!this._lastMouseEvent) return;
          const t4 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
          t4 && this._linkAtPosition(e3.link, t4) && (this._currentLink = e3, this._currentLink.state = { decorations: { underline: void 0 === e3.link.decorations || e3.link.decorations.underline, pointerCursor: void 0 === e3.link.decorations || e3.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e3.link, this._lastMouseEvent), e3.link.decorations = {}, Object.defineProperties(e3.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (e4) => {
            this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e4 && (this._currentLink.state.decorations.pointerCursor = e4, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", e4));
          } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (t5) => {
            this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t5 && (this._currentLink.state.decorations.underline = t5, this._currentLink.state.isHovered && this._fireUnderlineEvent(e3.link, t5));
          } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e4) => {
            if (!this._currentLink) return;
            const t5 = 0 === e4.start ? 0 : e4.start + 1 + this._bufferService.buffer.ydisp, i3 = this._bufferService.buffer.ydisp + 1 + e4.end;
            if (this._currentLink.link.range.start.y >= t5 && this._currentLink.link.range.end.y <= i3 && (this._clearCurrentLink(t5, i3), this._lastMouseEvent)) {
              const e5 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
              e5 && this._askForLink(e5, false);
            }
          })));
        }
        _linkHover(e3, t4, i3) {
          this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t4, true), this._currentLink.state.decorations.pointerCursor && e3.classList.add("xterm-cursor-pointer")), t4.hover && t4.hover(i3, t4.text);
        }
        _fireUnderlineEvent(e3, t4) {
          const i3 = e3.range, s3 = this._bufferService.buffer.ydisp, r3 = this._createLinkUnderlineEvent(i3.start.x - 1, i3.start.y - s3 - 1, i3.end.x, i3.end.y - s3 - 1, void 0);
          (t4 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r3);
        }
        _linkLeave(e3, t4, i3) {
          this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t4, false), this._currentLink.state.decorations.pointerCursor && e3.classList.remove("xterm-cursor-pointer")), t4.leave && t4.leave(i3, t4.text);
        }
        _linkAtPosition(e3, t4) {
          const i3 = e3.range.start.y * this._bufferService.cols + e3.range.start.x, s3 = e3.range.end.y * this._bufferService.cols + e3.range.end.x, r3 = t4.y * this._bufferService.cols + t4.x;
          return i3 <= r3 && r3 <= s3;
        }
        _positionFromMouseEvent(e3, t4, i3) {
          const s3 = i3.getCoords(e3, t4, this._bufferService.cols, this._bufferService.rows);
          if (s3) return { x: s3[0], y: s3[1] + this._bufferService.buffer.ydisp };
        }
        _createLinkUnderlineEvent(e3, t4, i3, s3, r3) {
          return { x1: e3, y1: t4, x2: i3, y2: s3, cols: this._bufferService.cols, fg: r3 };
        }
      };
      t3.Linkifier = l2 = s2([r2(1, c2.IMouseService), r2(2, c2.IRenderService), r2(3, h.IBufferService), r2(4, c2.ILinkProviderService)], l2);
    }, 9042: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.tooMuchOutput = t3.promptLabel = void 0, t3.promptLabel = "Terminal input", t3.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
    }, 3730: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.OscLinkProvider = void 0;
      const n2 = i2(511), o = i2(2585);
      let a2 = t3.OscLinkProvider = class {
        constructor(e3, t4, i3) {
          this._bufferService = e3, this._optionsService = t4, this._oscLinkService = i3;
        }
        provideLinks(e3, t4) {
          const i3 = this._bufferService.buffer.lines.get(e3 - 1);
          if (!i3) return void t4(void 0);
          const s3 = [], r3 = this._optionsService.rawOptions.linkHandler, o2 = new n2.CellData(), a3 = i3.getTrimmedLength();
          let c2 = -1, l2 = -1, d = false;
          for (let t5 = 0; t5 < a3; t5++) if (-1 !== l2 || i3.hasContent(t5)) {
            if (i3.loadCell(t5, o2), o2.hasExtendedAttrs() && o2.extended.urlId) {
              if (-1 === l2) {
                l2 = t5, c2 = o2.extended.urlId;
                continue;
              }
              d = o2.extended.urlId !== c2;
            } else -1 !== l2 && (d = true);
            if (d || -1 !== l2 && t5 === a3 - 1) {
              const i4 = this._oscLinkService.getLinkData(c2)?.uri;
              if (i4) {
                const n3 = { start: { x: l2 + 1, y: e3 }, end: { x: t5 + (d || t5 !== a3 - 1 ? 0 : 1), y: e3 } };
                let o3 = false;
                if (!r3?.allowNonHttpProtocols) try {
                  const e4 = new URL(i4);
                  ["http:", "https:"].includes(e4.protocol) || (o3 = true);
                } catch (e4) {
                  o3 = true;
                }
                o3 || s3.push({ text: i4, range: n3, activate: (e4, t6) => r3 ? r3.activate(e4, t6, n3) : h(0, t6), hover: (e4, t6) => r3?.hover?.(e4, t6, n3), leave: (e4, t6) => r3?.leave?.(e4, t6, n3) });
              }
              d = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (l2 = t5, c2 = o2.extended.urlId) : (l2 = -1, c2 = -1);
            }
          }
          t4(s3);
        }
      };
      function h(e3, t4) {
        if (confirm(`Do you want to navigate to ${t4}?

WARNING: This link could potentially be dangerous`)) {
          const e4 = window.open();
          if (e4) {
            try {
              e4.opener = null;
            } catch {
            }
            e4.location.href = t4;
          } else console.warn("Opening link blocked as opener could not be cleared");
        }
      }
      t3.OscLinkProvider = a2 = s2([r2(0, o.IBufferService), r2(1, o.IOptionsService), r2(2, o.IOscLinkService)], a2);
    }, 6193: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.RenderDebouncer = void 0, t3.RenderDebouncer = class {
        constructor(e3, t4) {
          this._renderCallback = e3, this._coreBrowserService = t4, this._refreshCallbacks = [];
        }
        dispose() {
          this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
        }
        addRefreshCallback(e3) {
          return this._refreshCallbacks.push(e3), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
        }
        refresh(e3, t4, i2) {
          this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t4 = void 0 !== t4 ? t4 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t4) : t4, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return void this._runRefreshCallbacks();
          const e3 = Math.max(this._rowStart, 0), t4 = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t4), this._runRefreshCallbacks();
        }
        _runRefreshCallbacks() {
          for (const e3 of this._refreshCallbacks) e3(0);
          this._refreshCallbacks = [];
        }
      };
    }, 3236: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Terminal = void 0;
      const s2 = i2(3614), r2 = i2(3656), n2 = i2(3551), o = i2(9042), a2 = i2(3730), h = i2(1680), c2 = i2(3107), l2 = i2(5744), d = i2(2950), _ = i2(1296), u2 = i2(428), f2 = i2(4269), v2 = i2(5114), p2 = i2(8934), g = i2(3230), m2 = i2(9312), S2 = i2(4725), C2 = i2(6731), b = i2(8055), w2 = i2(8969), y2 = i2(8460), E2 = i2(844), k2 = i2(6114), L2 = i2(8437), D2 = i2(2584), R2 = i2(7399), x2 = i2(5941), A2 = i2(9074), B2 = i2(2585), T2 = i2(5435), M2 = i2(4567), O2 = i2(779);
      class P2 extends w2.CoreTerminal {
        get onFocus() {
          return this._onFocus.event;
        }
        get onBlur() {
          return this._onBlur.event;
        }
        get onA11yChar() {
          return this._onA11yCharEmitter.event;
        }
        get onA11yTab() {
          return this._onA11yTabEmitter.event;
        }
        get onWillOpen() {
          return this._onWillOpen.event;
        }
        constructor(e3 = {}) {
          super(e3), this.browser = k2, this._keyDownHandled = false, this._keyDownSeen = false, this._keyPressHandled = false, this._unprocessedDeadKey = false, this._accessibilityManager = this.register(new E2.MutableDisposable()), this._onCursorMove = this.register(new y2.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new y2.EventEmitter()), this.onKey = this._onKey.event, this._onRender = this.register(new y2.EventEmitter()), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new y2.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new y2.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new y2.EventEmitter()), this.onBell = this._onBell.event, this._onFocus = this.register(new y2.EventEmitter()), this._onBlur = this.register(new y2.EventEmitter()), this._onA11yCharEmitter = this.register(new y2.EventEmitter()), this._onA11yTabEmitter = this.register(new y2.EventEmitter()), this._onWillOpen = this.register(new y2.EventEmitter()), this._setup(), this._decorationService = this._instantiationService.createInstance(A2.DecorationService), this._instantiationService.setService(B2.IDecorationService, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(O2.LinkProviderService), this._instantiationService.setService(S2.ILinkProviderService, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(a2.OscLinkProvider)), this.register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((e4, t4) => this.refresh(e4, t4))), this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this.register(this._inputHandler.onRequestReset(() => this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((e4) => this._reportWindowsOptions(e4))), this.register(this._inputHandler.onColor((e4) => this._handleColorEvent(e4))), this.register((0, y2.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, y2.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, y2.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, y2.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((e4) => this._afterResize(e4.cols, e4.rows))), this.register((0, E2.toDisposable)(() => {
            this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
          }));
        }
        _handleColorEvent(e3) {
          if (this._themeService) for (const t4 of e3) {
            let e4, i3 = "";
            switch (t4.index) {
              case 256:
                e4 = "foreground", i3 = "10";
                break;
              case 257:
                e4 = "background", i3 = "11";
                break;
              case 258:
                e4 = "cursor", i3 = "12";
                break;
              default:
                e4 = "ansi", i3 = "4;" + t4.index;
            }
            switch (t4.type) {
              case 0:
                const s3 = b.color.toColorRGB("ansi" === e4 ? this._themeService.colors.ansi[t4.index] : this._themeService.colors[e4]);
                this.coreService.triggerDataEvent(`${D2.C0.ESC}]${i3};${(0, x2.toRgbString)(s3)}${D2.C1_ESCAPED.ST}`);
                break;
              case 1:
                if ("ansi" === e4) this._themeService.modifyColors((e5) => e5.ansi[t4.index] = b.channels.toColor(...t4.color));
                else {
                  const i4 = e4;
                  this._themeService.modifyColors((e5) => e5[i4] = b.channels.toColor(...t4.color));
                }
                break;
              case 2:
                this._themeService.restoreColor(t4.index);
            }
          }
        }
        _setup() {
          super._setup(), this._customKeyEventHandler = void 0;
        }
        get buffer() {
          return this.buffers.active;
        }
        focus() {
          this.textarea && this.textarea.focus({ preventScroll: true });
        }
        _handleScreenReaderModeOptionChange(e3) {
          e3 ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(M2.AccessibilityManager, this)) : this._accessibilityManager.clear();
        }
        _handleTextAreaFocus(e3) {
          this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D2.C0.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
        }
        blur() {
          return this.textarea?.blur();
        }
        _handleTextAreaBlur() {
          this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(D2.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
        }
        _syncTextArea() {
          if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
          const e3 = this.buffer.ybase + this.buffer.y, t4 = this.buffer.lines.get(e3);
          if (!t4) return;
          const i3 = Math.min(this.buffer.x, this.cols - 1), s3 = this._renderService.dimensions.css.cell.height, r3 = t4.getWidth(i3), n3 = this._renderService.dimensions.css.cell.width * r3, o2 = this.buffer.y * this._renderService.dimensions.css.cell.height, a3 = i3 * this._renderService.dimensions.css.cell.width;
          this.textarea.style.left = a3 + "px", this.textarea.style.top = o2 + "px", this.textarea.style.width = n3 + "px", this.textarea.style.height = s3 + "px", this.textarea.style.lineHeight = s3 + "px", this.textarea.style.zIndex = "-5";
        }
        _initGlobal() {
          this._bindKeys(), this.register((0, r2.addDisposableDomListener)(this.element, "copy", (e4) => {
            this.hasSelection() && (0, s2.copyHandler)(e4, this._selectionService);
          }));
          const e3 = (e4) => (0, s2.handlePasteEvent)(e4, this.textarea, this.coreService, this.optionsService);
          this.register((0, r2.addDisposableDomListener)(this.textarea, "paste", e3)), this.register((0, r2.addDisposableDomListener)(this.element, "paste", e3)), k2.isFirefox ? this.register((0, r2.addDisposableDomListener)(this.element, "mousedown", (e4) => {
            2 === e4.button && (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })) : this.register((0, r2.addDisposableDomListener)(this.element, "contextmenu", (e4) => {
            (0, s2.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
          })), k2.isLinux && this.register((0, r2.addDisposableDomListener)(this.element, "auxclick", (e4) => {
            1 === e4.button && (0, s2.moveTextAreaUnderMouseCursor)(e4, this.textarea, this.screenElement);
          }));
        }
        _bindKeys() {
          this.register((0, r2.addDisposableDomListener)(this.textarea, "keyup", (e3) => this._keyUp(e3), true)), this.register((0, r2.addDisposableDomListener)(this.textarea, "keydown", (e3) => this._keyDown(e3), true)), this.register((0, r2.addDisposableDomListener)(this.textarea, "keypress", (e3) => this._keyPress(e3), true)), this.register((0, r2.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this.register((0, r2.addDisposableDomListener)(this.textarea, "compositionupdate", (e3) => this._compositionHelper.compositionupdate(e3))), this.register((0, r2.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this.register((0, r2.addDisposableDomListener)(this.textarea, "input", (e3) => this._inputEvent(e3), true)), this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
        }
        open(e3) {
          if (!e3) throw new Error("Terminal requires a parent element.");
          if (e3.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) return void (this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView));
          this._document = e3.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e3.appendChild(this.element);
          const t4 = this._document.createDocumentFragment();
          this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t4.appendChild(this._viewportElement), this._viewportScrollArea = this._document.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this.register((0, r2.addDisposableDomListener)(this.screenElement, "mousemove", (e4) => this.updateCursorStyle(e4))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t4.appendChild(this.screenElement), this.textarea = this._document.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", o.promptLabel), k2.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this.register(this._instantiationService.createInstance(v2.CoreBrowserService, this.textarea, e3.ownerDocument.defaultView ?? window, this._document ?? "undefined" != typeof window ? window.document : null)), this._instantiationService.setService(S2.ICoreBrowserService, this._coreBrowserService), this.register((0, r2.addDisposableDomListener)(this.textarea, "focus", (e4) => this._handleTextAreaFocus(e4))), this.register((0, r2.addDisposableDomListener)(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(u2.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(S2.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(C2.ThemeService), this._instantiationService.setService(S2.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(f2.CharacterJoinerService), this._instantiationService.setService(S2.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(g.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(S2.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((e4) => this._onRender.fire(e4))), this.onResize((e4) => this._renderService.resize(e4.cols, e4.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(d.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(p2.MouseService), this._instantiationService.setService(S2.IMouseService, this._mouseService), this.linkifier = this.register(this._instantiationService.createInstance(n2.Linkifier, this.screenElement)), this.element.appendChild(t4);
          try {
            this._onWillOpen.fire(this.element);
          } catch {
          }
          this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this.viewport = this._instantiationService.createInstance(h.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent, 1)), this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(() => {
            this._renderService.handleCursorMove(), this._syncTextArea();
          })), this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this.register(this.onBlur(() => this._renderService.handleBlur())), this.register(this.onFocus(() => this._renderService.handleFocus())), this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(m2.SelectionService, this.element, this.screenElement, this.linkifier)), this._instantiationService.setService(S2.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((e4) => this._renderService.handleSelectionChanged(e4.start, e4.end, e4.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((e4) => {
            this.textarea.value = e4, this.textarea.focus(), this.textarea.select();
          })), this.register(this._onScroll.event((e4) => {
            this.viewport.syncScrollArea(), this._selectionService.refresh();
          })), this.register((0, r2.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh())), this.register(this._instantiationService.createInstance(c2.BufferDecorationRenderer, this.screenElement)), this.register((0, r2.addDisposableDomListener)(this.element, "mousedown", (e4) => this._selectionService.handleMouseDown(e4))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(M2.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", (e4) => this._handleScreenReaderModeOptionChange(e4))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l2.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", (e4) => {
            !this._overviewRulerRenderer && e4 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(l2.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
          }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
        }
        _createRenderer() {
          return this._instantiationService.createInstance(_.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
        }
        bindMouse() {
          const e3 = this, t4 = this.element;
          function i3(t5) {
            const i4 = e3._mouseService.getMouseReportCoords(t5, e3.screenElement);
            if (!i4) return false;
            let s4, r3;
            switch (t5.overrideType || t5.type) {
              case "mousemove":
                r3 = 32, void 0 === t5.buttons ? (s4 = 3, void 0 !== t5.button && (s4 = t5.button < 3 ? t5.button : 3)) : s4 = 1 & t5.buttons ? 0 : 4 & t5.buttons ? 1 : 2 & t5.buttons ? 2 : 3;
                break;
              case "mouseup":
                r3 = 0, s4 = t5.button < 3 ? t5.button : 3;
                break;
              case "mousedown":
                r3 = 1, s4 = t5.button < 3 ? t5.button : 3;
                break;
              case "wheel":
                if (e3._customWheelEventHandler && false === e3._customWheelEventHandler(t5)) return false;
                if (0 === e3.viewport.getLinesScrolled(t5)) return false;
                r3 = t5.deltaY < 0 ? 0 : 1, s4 = 4;
                break;
              default:
                return false;
            }
            return !(void 0 === r3 || void 0 === s4 || s4 > 4) && e3.coreMouseService.triggerMouseEvent({ col: i4.col, row: i4.row, x: i4.x, y: i4.y, button: s4, action: r3, ctrl: t5.ctrlKey, alt: t5.altKey, shift: t5.shiftKey });
          }
          const s3 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, n3 = { mouseup: (e4) => (i3(e4), e4.buttons || (this._document.removeEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.removeEventListener("mousemove", s3.mousedrag)), this.cancel(e4)), wheel: (e4) => (i3(e4), this.cancel(e4, true)), mousedrag: (e4) => {
            e4.buttons && i3(e4);
          }, mousemove: (e4) => {
            e4.buttons || i3(e4);
          } };
          this.register(this.coreMouseService.onProtocolChange((e4) => {
            e4 ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e4)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e4 ? s3.mousemove || (t4.addEventListener("mousemove", n3.mousemove), s3.mousemove = n3.mousemove) : (t4.removeEventListener("mousemove", s3.mousemove), s3.mousemove = null), 16 & e4 ? s3.wheel || (t4.addEventListener("wheel", n3.wheel, { passive: false }), s3.wheel = n3.wheel) : (t4.removeEventListener("wheel", s3.wheel), s3.wheel = null), 2 & e4 ? s3.mouseup || (s3.mouseup = n3.mouseup) : (this._document.removeEventListener("mouseup", s3.mouseup), s3.mouseup = null), 4 & e4 ? s3.mousedrag || (s3.mousedrag = n3.mousedrag) : (this._document.removeEventListener("mousemove", s3.mousedrag), s3.mousedrag = null);
          })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, r2.addDisposableDomListener)(t4, "mousedown", (e4) => {
            if (e4.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e4)) return i3(e4), s3.mouseup && this._document.addEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.addEventListener("mousemove", s3.mousedrag), this.cancel(e4);
          })), this.register((0, r2.addDisposableDomListener)(t4, "wheel", (e4) => {
            if (!s3.wheel) {
              if (this._customWheelEventHandler && false === this._customWheelEventHandler(e4)) return false;
              if (!this.buffer.hasScrollback) {
                const t5 = this.viewport.getLinesScrolled(e4);
                if (0 === t5) return;
                const i4 = D2.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e4.deltaY < 0 ? "A" : "B");
                let s4 = "";
                for (let e5 = 0; e5 < Math.abs(t5); e5++) s4 += i4;
                return this.coreService.triggerDataEvent(s4, true), this.cancel(e4, true);
              }
              return this.viewport.handleWheel(e4) ? this.cancel(e4) : void 0;
            }
          }, { passive: false })), this.register((0, r2.addDisposableDomListener)(t4, "touchstart", (e4) => {
            if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchStart(e4), this.cancel(e4);
          }, { passive: true })), this.register((0, r2.addDisposableDomListener)(t4, "touchmove", (e4) => {
            if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchMove(e4) ? void 0 : this.cancel(e4);
          }, { passive: false }));
        }
        refresh(e3, t4) {
          this._renderService?.refreshRows(e3, t4);
        }
        updateCursorStyle(e3) {
          this._selectionService?.shouldColumnSelect(e3) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
        }
        _showCursor() {
          this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
        }
        scrollLines(e3, t4, i3 = 0) {
          1 === i3 ? (super.scrollLines(e3, t4, i3), this.refresh(0, this.rows - 1)) : this.viewport?.scrollLines(e3);
        }
        paste(e3) {
          (0, s2.paste)(e3, this.textarea, this.coreService, this.optionsService);
        }
        attachCustomKeyEventHandler(e3) {
          this._customKeyEventHandler = e3;
        }
        attachCustomWheelEventHandler(e3) {
          this._customWheelEventHandler = e3;
        }
        registerLinkProvider(e3) {
          return this._linkProviderService.registerLinkProvider(e3);
        }
        registerCharacterJoiner(e3) {
          if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
          const t4 = this._characterJoinerService.register(e3);
          return this.refresh(0, this.rows - 1), t4;
        }
        deregisterCharacterJoiner(e3) {
          if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
          this._characterJoinerService.deregister(e3) && this.refresh(0, this.rows - 1);
        }
        get markers() {
          return this.buffer.markers;
        }
        registerMarker(e3) {
          return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e3);
        }
        registerDecoration(e3) {
          return this._decorationService.registerDecoration(e3);
        }
        hasSelection() {
          return !!this._selectionService && this._selectionService.hasSelection;
        }
        select(e3, t4, i3) {
          this._selectionService.setSelection(e3, t4, i3);
        }
        getSelection() {
          return this._selectionService ? this._selectionService.selectionText : "";
        }
        getSelectionPosition() {
          if (this._selectionService && this._selectionService.hasSelection) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
        }
        clearSelection() {
          this._selectionService?.clearSelection();
        }
        selectAll() {
          this._selectionService?.selectAll();
        }
        selectLines(e3, t4) {
          this._selectionService?.selectLines(e3, t4);
        }
        _keyDown(e3) {
          if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && false === this._customKeyEventHandler(e3)) return false;
          const t4 = this.browser.isMac && this.options.macOptionIsMeta && e3.altKey;
          if (!t4 && !this._compositionHelper.keydown(e3)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), false;
          t4 || "Dead" !== e3.key && "AltGraph" !== e3.key || (this._unprocessedDeadKey = true);
          const i3 = (0, R2.evaluateKeyboardEvent)(e3, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
          if (this.updateCursorStyle(e3), 3 === i3.type || 2 === i3.type) {
            const t5 = this.rows - 1;
            return this.scrollLines(2 === i3.type ? -t5 : t5), this.cancel(e3, true);
          }
          return 1 === i3.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e3) || (i3.cancel && this.cancel(e3, true), !i3.key || !!(e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && 1 === e3.key.length && e3.key.charCodeAt(0) >= 65 && e3.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (i3.key !== D2.C0.ETX && i3.key !== D2.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: i3.key, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(i3.key, true), !this.optionsService.rawOptions.screenReaderMode || e3.altKey || e3.ctrlKey ? this.cancel(e3, true) : void (this._keyDownHandled = true))));
        }
        _isThirdLevelShift(e3, t4) {
          const i3 = e3.isMac && !this.options.macOptionIsMeta && t4.altKey && !t4.ctrlKey && !t4.metaKey || e3.isWindows && t4.altKey && t4.ctrlKey && !t4.metaKey || e3.isWindows && t4.getModifierState("AltGraph");
          return "keypress" === t4.type ? i3 : i3 && (!t4.keyCode || t4.keyCode > 47);
        }
        _keyUp(e3) {
          this._keyDownSeen = false, this._customKeyEventHandler && false === this._customKeyEventHandler(e3) || (function(e4) {
            return 16 === e4.keyCode || 17 === e4.keyCode || 18 === e4.keyCode;
          }(e3) || this.focus(), this.updateCursorStyle(e3), this._keyPressHandled = false);
        }
        _keyPress(e3) {
          let t4;
          if (this._keyPressHandled = false, this._keyDownHandled) return false;
          if (this._customKeyEventHandler && false === this._customKeyEventHandler(e3)) return false;
          if (this.cancel(e3), e3.charCode) t4 = e3.charCode;
          else if (null === e3.which || void 0 === e3.which) t4 = e3.keyCode;
          else {
            if (0 === e3.which || 0 === e3.charCode) return false;
            t4 = e3.which;
          }
          return !(!t4 || (e3.altKey || e3.ctrlKey || e3.metaKey) && !this._isThirdLevelShift(this.browser, e3) || (t4 = String.fromCharCode(t4), this._onKey.fire({ key: t4, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(t4, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0));
        }
        _inputEvent(e3) {
          if (e3.data && "insertText" === e3.inputType && (!e3.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
            if (this._keyPressHandled) return false;
            this._unprocessedDeadKey = false;
            const t4 = e3.data;
            return this.coreService.triggerDataEvent(t4, true), this.cancel(e3), true;
          }
          return false;
        }
        resize(e3, t4) {
          e3 !== this.cols || t4 !== this.rows ? super.resize(e3, t4) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
        }
        _afterResize(e3, t4) {
          this._charSizeService?.measure(), this.viewport?.syncScrollArea(true);
        }
        clear() {
          if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
            this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
            for (let e3 = 1; e3 < this.rows; e3++) this.buffer.lines.push(this.buffer.getBlankLine(L2.DEFAULT_ATTR_DATA));
            this._onScroll.fire({ position: this.buffer.ydisp, source: 0 }), this.viewport?.reset(), this.refresh(0, this.rows - 1);
          }
        }
        reset() {
          this.options.rows = this.rows, this.options.cols = this.cols;
          const e3 = this._customKeyEventHandler;
          this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this.viewport?.reset(), this._customKeyEventHandler = e3, this.refresh(0, this.rows - 1);
        }
        clearTextureAtlas() {
          this._renderService?.clearTextureAtlas();
        }
        _reportFocus() {
          this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(D2.C0.ESC + "[I") : this.coreService.triggerDataEvent(D2.C0.ESC + "[O");
        }
        _reportWindowsOptions(e3) {
          if (this._renderService) switch (e3) {
            case T2.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
              const e4 = this._renderService.dimensions.css.canvas.width.toFixed(0), t4 = this._renderService.dimensions.css.canvas.height.toFixed(0);
              this.coreService.triggerDataEvent(`${D2.C0.ESC}[4;${t4};${e4}t`);
              break;
            case T2.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
              const i3 = this._renderService.dimensions.css.cell.width.toFixed(0), s3 = this._renderService.dimensions.css.cell.height.toFixed(0);
              this.coreService.triggerDataEvent(`${D2.C0.ESC}[6;${s3};${i3}t`);
          }
        }
        cancel(e3, t4) {
          if (this.options.cancelEvents || t4) return e3.preventDefault(), e3.stopPropagation(), false;
        }
      }
      t3.Terminal = P2;
    }, 9924: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.TimeBasedDebouncer = void 0, t3.TimeBasedDebouncer = class {
        constructor(e3, t4 = 1e3) {
          this._renderCallback = e3, this._debounceThresholdMS = t4, this._lastRefreshMs = 0, this._additionalRefreshRequested = false;
        }
        dispose() {
          this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
        }
        refresh(e3, t4, i2) {
          this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t4 = void 0 !== t4 ? t4 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t4) : t4;
          const s2 = Date.now();
          if (s2 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = s2, this._innerRefresh();
          else if (!this._additionalRefreshRequested) {
            const e4 = s2 - this._lastRefreshMs, t5 = this._debounceThresholdMS - e4;
            this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
              this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
            }, t5);
          }
        }
        _innerRefresh() {
          if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount) return;
          const e3 = Math.max(this._rowStart, 0), t4 = Math.min(this._rowEnd, this._rowCount - 1);
          this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t4);
        }
      };
    }, 1680: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Viewport = void 0;
      const n2 = i2(3656), o = i2(4725), a2 = i2(8460), h = i2(844), c2 = i2(2585);
      let l2 = t3.Viewport = class extends h.Disposable {
        constructor(e3, t4, i3, s3, r3, o2, h2, c3) {
          super(), this._viewportElement = e3, this._scrollArea = t4, this._bufferService = i3, this._optionsService = s3, this._charSizeService = r3, this._renderService = o2, this._coreBrowserService = h2, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = false, this._smoothScrollState = { startTime: 0, origin: -1, target: -1 }, this._onRequestScrollLines = this.register(new a2.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, n2.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((e4) => this._renderDimensions = e4)), this._handleThemeChange(c3.colors), this.register(c3.onChangeColors((e4) => this._handleThemeChange(e4))), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.syncScrollArea())), setTimeout(() => this.syncScrollArea());
        }
        _handleThemeChange(e3) {
          this._viewportElement.style.backgroundColor = e3.background.css;
        }
        reset() {
          this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
        }
        _refresh(e3) {
          if (e3) return this._innerRefresh(), void (null !== this._refreshAnimationFrame && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
          null === this._refreshAnimationFrame && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
        }
        _innerRefresh() {
          if (this._charSizeService.height > 0) {
            this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderDimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
            const e4 = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
            this._lastRecordedBufferHeight !== e4 && (this._lastRecordedBufferHeight = e4, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
          }
          const e3 = this._bufferService.buffer.ydisp * this._currentRowHeight;
          this._viewportElement.scrollTop !== e3 && (this._ignoreNextScrollEvent = true, this._viewportElement.scrollTop = e3), this._refreshAnimationFrame = null;
        }
        syncScrollArea(e3 = false) {
          if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e3);
          this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(e3);
        }
        _handleScroll(e3) {
          if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent) return;
          if (this._ignoreNextScrollEvent) return this._ignoreNextScrollEvent = false, void this._onRequestScrollLines.fire({ amount: 0, suppressScrollEvent: true });
          const t4 = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
          this._onRequestScrollLines.fire({ amount: t4, suppressScrollEvent: true });
        }
        _smoothScroll() {
          if (this._isDisposed || -1 === this._smoothScrollState.origin || -1 === this._smoothScrollState.target) return;
          const e3 = this._smoothScrollPercent();
          this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e3 * (this._smoothScrollState.target - this._smoothScrollState.origin)), e3 < 1 ? this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll()) : this._clearSmoothScrollState();
        }
        _smoothScrollPercent() {
          return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
        }
        _clearSmoothScrollState() {
          this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
        }
        _bubbleScroll(e3, t4) {
          const i3 = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
          return !(t4 < 0 && 0 !== this._viewportElement.scrollTop || t4 > 0 && i3 < this._lastRecordedBufferHeight) || (e3.cancelable && e3.preventDefault(), false);
        }
        handleWheel(e3) {
          const t4 = this._getPixelsScrolled(e3);
          return 0 !== t4 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, -1 === this._smoothScrollState.target ? this._smoothScrollState.target = this._viewportElement.scrollTop + t4 : this._smoothScrollState.target += t4, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t4, this._bubbleScroll(e3, t4));
        }
        scrollLines(e3) {
          if (0 !== e3) if (this._optionsService.rawOptions.smoothScrollDuration) {
            const t4 = e3 * this._currentRowHeight;
            this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + t4, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
          } else this._onRequestScrollLines.fire({ amount: e3, suppressScrollEvent: false });
        }
        _getPixelsScrolled(e3) {
          if (0 === e3.deltaY || e3.shiftKey) return 0;
          let t4 = this._applyScrollModifier(e3.deltaY, e3);
          return e3.deltaMode === WheelEvent.DOM_DELTA_LINE ? t4 *= this._currentRowHeight : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t4 *= this._currentRowHeight * this._bufferService.rows), t4;
        }
        getBufferElements(e3, t4) {
          let i3, s3 = "";
          const r3 = [], n3 = t4 ?? this._bufferService.buffer.lines.length, o2 = this._bufferService.buffer.lines;
          for (let t5 = e3; t5 < n3; t5++) {
            const e4 = o2.get(t5);
            if (!e4) continue;
            const n4 = o2.get(t5 + 1)?.isWrapped;
            if (s3 += e4.translateToString(!n4), !n4 || t5 === o2.length - 1) {
              const e5 = document.createElement("div");
              e5.textContent = s3, r3.push(e5), s3.length > 0 && (i3 = e5), s3 = "";
            }
          }
          return { bufferElements: r3, cursorElement: i3 };
        }
        getLinesScrolled(e3) {
          if (0 === e3.deltaY || e3.shiftKey) return 0;
          let t4 = this._applyScrollModifier(e3.deltaY, e3);
          return e3.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t4 /= this._currentRowHeight + 0, this._wheelPartialScroll += t4, t4 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t4 *= this._bufferService.rows), t4;
        }
        _applyScrollModifier(e3, t4) {
          const i3 = this._optionsService.rawOptions.fastScrollModifier;
          return "alt" === i3 && t4.altKey || "ctrl" === i3 && t4.ctrlKey || "shift" === i3 && t4.shiftKey ? e3 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e3 * this._optionsService.rawOptions.scrollSensitivity;
        }
        handleTouchStart(e3) {
          this._lastTouchY = e3.touches[0].pageY;
        }
        handleTouchMove(e3) {
          const t4 = this._lastTouchY - e3.touches[0].pageY;
          return this._lastTouchY = e3.touches[0].pageY, 0 !== t4 && (this._viewportElement.scrollTop += t4, this._bubbleScroll(e3, t4));
        }
      };
      t3.Viewport = l2 = s2([r2(2, c2.IBufferService), r2(3, c2.IOptionsService), r2(4, o.ICharSizeService), r2(5, o.IRenderService), r2(6, o.ICoreBrowserService), r2(7, o.IThemeService)], l2);
    }, 3107: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferDecorationRenderer = void 0;
      const n2 = i2(4725), o = i2(844), a2 = i2(2585);
      let h = t3.BufferDecorationRenderer = class extends o.Disposable {
        constructor(e3, t4, i3, s3, r3) {
          super(), this._screenElement = e3, this._bufferService = t4, this._coreBrowserService = i3, this._decorationService = s3, this._renderService = r3, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = false, this._dimensionsChanged = false, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this.register(this._renderService.onDimensionsChange(() => {
            this._dimensionsChanged = true, this._queueRefresh();
          })), this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
          })), this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((e4) => this._removeDecoration(e4))), this.register((0, o.toDisposable)(() => {
            this._container.remove(), this._decorationElements.clear();
          }));
        }
        _queueRefresh() {
          void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback(() => {
            this._doRefreshDecorations(), this._animationFrame = void 0;
          }));
        }
        _doRefreshDecorations() {
          for (const e3 of this._decorationService.decorations) this._renderDecoration(e3);
          this._dimensionsChanged = false;
        }
        _renderDecoration(e3) {
          this._refreshStyle(e3), this._dimensionsChanged && this._refreshXPosition(e3);
        }
        _createElement(e3) {
          const t4 = this._coreBrowserService.mainDocument.createElement("div");
          t4.classList.add("xterm-decoration"), t4.classList.toggle("xterm-decoration-top-layer", "top" === e3?.options?.layer), t4.style.width = `${Math.round((e3.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t4.style.height = (e3.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", t4.style.top = (e3.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", t4.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
          const i3 = e3.options.x ?? 0;
          return i3 && i3 > this._bufferService.cols && (t4.style.display = "none"), this._refreshXPosition(e3, t4), t4;
        }
        _refreshStyle(e3) {
          const t4 = e3.marker.line - this._bufferService.buffers.active.ydisp;
          if (t4 < 0 || t4 >= this._bufferService.rows) e3.element && (e3.element.style.display = "none", e3.onRenderEmitter.fire(e3.element));
          else {
            let i3 = this._decorationElements.get(e3);
            i3 || (i3 = this._createElement(e3), e3.element = i3, this._decorationElements.set(e3, i3), this._container.appendChild(i3), e3.onDispose(() => {
              this._decorationElements.delete(e3), i3.remove();
            })), i3.style.top = t4 * this._renderService.dimensions.css.cell.height + "px", i3.style.display = this._altBufferIsActive ? "none" : "block", e3.onRenderEmitter.fire(i3);
          }
        }
        _refreshXPosition(e3, t4 = e3.element) {
          if (!t4) return;
          const i3 = e3.options.x ?? 0;
          "right" === (e3.options.anchor || "left") ? t4.style.right = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "" : t4.style.left = i3 ? i3 * this._renderService.dimensions.css.cell.width + "px" : "";
        }
        _removeDecoration(e3) {
          this._decorationElements.get(e3)?.remove(), this._decorationElements.delete(e3), e3.dispose();
        }
      };
      t3.BufferDecorationRenderer = h = s2([r2(1, a2.IBufferService), r2(2, n2.ICoreBrowserService), r2(3, a2.IDecorationService), r2(4, n2.IRenderService)], h);
    }, 5871: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ColorZoneStore = void 0, t3.ColorZoneStore = class {
        constructor() {
          this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
        }
        get zones() {
          return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
        }
        clear() {
          this._zones.length = 0, this._zonePoolIndex = 0;
        }
        addDecoration(e3) {
          if (e3.options.overviewRulerOptions) {
            for (const t4 of this._zones) if (t4.color === e3.options.overviewRulerOptions.color && t4.position === e3.options.overviewRulerOptions.position) {
              if (this._lineIntersectsZone(t4, e3.marker.line)) return;
              if (this._lineAdjacentToZone(t4, e3.marker.line, e3.options.overviewRulerOptions.position)) return void this._addLineToZone(t4, e3.marker.line);
            }
            if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = e3.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e3.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e3.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e3.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
            this._zones.push({ color: e3.options.overviewRulerOptions.color, position: e3.options.overviewRulerOptions.position, startBufferLine: e3.marker.line, endBufferLine: e3.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
          }
        }
        setPadding(e3) {
          this._linePadding = e3;
        }
        _lineIntersectsZone(e3, t4) {
          return t4 >= e3.startBufferLine && t4 <= e3.endBufferLine;
        }
        _lineAdjacentToZone(e3, t4, i2) {
          return t4 >= e3.startBufferLine - this._linePadding[i2 || "full"] && t4 <= e3.endBufferLine + this._linePadding[i2 || "full"];
        }
        _addLineToZone(e3, t4) {
          e3.startBufferLine = Math.min(e3.startBufferLine, t4), e3.endBufferLine = Math.max(e3.endBufferLine, t4);
        }
      };
    }, 5744: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.OverviewRulerRenderer = void 0;
      const n2 = i2(5871), o = i2(4725), a2 = i2(844), h = i2(2585), c2 = { full: 0, left: 0, center: 0, right: 0 }, l2 = { full: 0, left: 0, center: 0, right: 0 }, d = { full: 0, left: 0, center: 0, right: 0 };
      let _ = t3.OverviewRulerRenderer = class extends a2.Disposable {
        get _width() {
          return this._optionsService.options.overviewRulerWidth || 0;
        }
        constructor(e3, t4, i3, s3, r3, o2, h2) {
          super(), this._viewportElement = e3, this._screenElement = t4, this._bufferService = i3, this._decorationService = s3, this._renderService = r3, this._optionsService = o2, this._coreBrowserService = h2, this._colorZoneStore = new n2.ColorZoneStore(), this._shouldUpdateDimensions = true, this._shouldUpdateAnchor = true, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement);
          const c3 = this._canvas.getContext("2d");
          if (!c3) throw new Error("Ctx cannot be null");
          this._ctx = c3, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, a2.toDisposable)(() => {
            this._canvas?.remove();
          }));
        }
        _registerDecorationListeners() {
          this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true)));
        }
        _registerBufferChangeListeners() {
          this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
          })), this.register(this._bufferService.onScroll(() => {
            this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
          }));
        }
        _registerDimensionChangeListeners() {
          this.register(this._renderService.onRender(() => {
            this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
          })), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", () => this._queueRefresh(true))), this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._queueRefresh(true);
        }
        _refreshDrawConstants() {
          const e3 = Math.floor(this._canvas.width / 3), t4 = Math.ceil(this._canvas.width / 3);
          l2.full = this._canvas.width, l2.left = e3, l2.center = t4, l2.right = e3, this._refreshDrawHeightConstants(), d.full = 0, d.left = 0, d.center = l2.left, d.right = l2.left + l2.center;
        }
        _refreshDrawHeightConstants() {
          c2.full = Math.round(2 * this._coreBrowserService.dpr);
          const e3 = this._canvas.height / this._bufferService.buffer.lines.length, t4 = Math.round(Math.max(Math.min(e3, 12), 6) * this._coreBrowserService.dpr);
          c2.left = t4, c2.center = t4, c2.right = t4;
        }
        _refreshColorZonePadding() {
          this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c2.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c2.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c2.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * c2.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
        }
        _refreshCanvasDimensions() {
          this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
        }
        _refreshDecorations() {
          this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
          for (const e4 of this._decorationService.decorations) this._colorZoneStore.addDecoration(e4);
          this._ctx.lineWidth = 1;
          const e3 = this._colorZoneStore.zones;
          for (const t4 of e3) "full" !== t4.position && this._renderColorZone(t4);
          for (const t4 of e3) "full" === t4.position && this._renderColorZone(t4);
          this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
        }
        _renderColorZone(e3) {
          this._ctx.fillStyle = e3.color, this._ctx.fillRect(d[e3.position || "full"], Math.round((this._canvas.height - 1) * (e3.startBufferLine / this._bufferService.buffers.active.lines.length) - c2[e3.position || "full"] / 2), l2[e3.position || "full"], Math.round((this._canvas.height - 1) * ((e3.endBufferLine - e3.startBufferLine) / this._bufferService.buffers.active.lines.length) + c2[e3.position || "full"]));
        }
        _queueRefresh(e3, t4) {
          this._shouldUpdateDimensions = e3 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t4 || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
            this._refreshDecorations(), this._animationFrame = void 0;
          }));
        }
      };
      t3.OverviewRulerRenderer = _ = s2([r2(2, h.IBufferService), r2(3, h.IDecorationService), r2(4, o.IRenderService), r2(5, h.IOptionsService), r2(6, o.ICoreBrowserService)], _);
    }, 2950: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CompositionHelper = void 0;
      const n2 = i2(4725), o = i2(2585), a2 = i2(2584);
      let h = t3.CompositionHelper = class {
        get isComposing() {
          return this._isComposing;
        }
        constructor(e3, t4, i3, s3, r3, n3) {
          this._textarea = e3, this._compositionView = t4, this._bufferService = i3, this._optionsService = s3, this._coreService = r3, this._renderService = n3, this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
        }
        compositionstart() {
          this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
        }
        compositionupdate(e3) {
          this._compositionView.textContent = e3.data, this.updateCompositionElements(), setTimeout(() => {
            this._compositionPosition.end = this._textarea.value.length;
          }, 0);
        }
        compositionend() {
          this._finalizeComposition(true);
        }
        keydown(e3) {
          if (this._isComposing || this._isSendingComposition) {
            if (229 === e3.keyCode) return false;
            if (16 === e3.keyCode || 17 === e3.keyCode || 18 === e3.keyCode) return false;
            this._finalizeComposition(false);
          }
          return 229 !== e3.keyCode || (this._handleAnyTextareaChanges(), false);
        }
        _finalizeComposition(e3) {
          if (this._compositionView.classList.remove("active"), this._isComposing = false, e3) {
            const e4 = { start: this._compositionPosition.start, end: this._compositionPosition.end };
            this._isSendingComposition = true, setTimeout(() => {
              if (this._isSendingComposition) {
                let t4;
                this._isSendingComposition = false, e4.start += this._dataAlreadySent.length, t4 = this._isComposing ? this._textarea.value.substring(e4.start, e4.end) : this._textarea.value.substring(e4.start), t4.length > 0 && this._coreService.triggerDataEvent(t4, true);
              }
            }, 0);
          } else {
            this._isSendingComposition = false;
            const e4 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
            this._coreService.triggerDataEvent(e4, true);
          }
        }
        _handleAnyTextareaChanges() {
          const e3 = this._textarea.value;
          setTimeout(() => {
            if (!this._isComposing) {
              const t4 = this._textarea.value, i3 = t4.replace(e3, "");
              this._dataAlreadySent = i3, t4.length > e3.length ? this._coreService.triggerDataEvent(i3, true) : t4.length < e3.length ? this._coreService.triggerDataEvent(`${a2.C0.DEL}`, true) : t4.length === e3.length && t4 !== e3 && this._coreService.triggerDataEvent(t4, true);
            }
          }, 0);
        }
        updateCompositionElements(e3) {
          if (this._isComposing) {
            if (this._bufferService.buffer.isCursorInViewport) {
              const e4 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t4 = this._renderService.dimensions.css.cell.height, i3 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, s3 = e4 * this._renderService.dimensions.css.cell.width;
              this._compositionView.style.left = s3 + "px", this._compositionView.style.top = i3 + "px", this._compositionView.style.height = t4 + "px", this._compositionView.style.lineHeight = t4 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
              const r3 = this._compositionView.getBoundingClientRect();
              this._textarea.style.left = s3 + "px", this._textarea.style.top = i3 + "px", this._textarea.style.width = Math.max(r3.width, 1) + "px", this._textarea.style.height = Math.max(r3.height, 1) + "px", this._textarea.style.lineHeight = r3.height + "px";
            }
            e3 || setTimeout(() => this.updateCompositionElements(true), 0);
          }
        }
      };
      t3.CompositionHelper = h = s2([r2(2, o.IBufferService), r2(3, o.IOptionsService), r2(4, o.ICoreService), r2(5, n2.IRenderService)], h);
    }, 9806: (e2, t3) => {
      function i2(e3, t4, i3) {
        const s2 = i3.getBoundingClientRect(), r2 = e3.getComputedStyle(i3), n2 = parseInt(r2.getPropertyValue("padding-left")), o = parseInt(r2.getPropertyValue("padding-top"));
        return [t4.clientX - s2.left - n2, t4.clientY - s2.top - o];
      }
      Object.defineProperty(t3, "__esModule", { value: true }), t3.getCoords = t3.getCoordsRelativeToElement = void 0, t3.getCoordsRelativeToElement = i2, t3.getCoords = function(e3, t4, s2, r2, n2, o, a2, h, c2) {
        if (!o) return;
        const l2 = i2(e3, t4, s2);
        return l2 ? (l2[0] = Math.ceil((l2[0] + (c2 ? a2 / 2 : 0)) / a2), l2[1] = Math.ceil(l2[1] / h), l2[0] = Math.min(Math.max(l2[0], 1), r2 + (c2 ? 1 : 0)), l2[1] = Math.min(Math.max(l2[1], 1), n2), l2) : void 0;
      };
    }, 9504: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.moveToCellSequence = void 0;
      const s2 = i2(2584);
      function r2(e3, t4, i3, s3) {
        const r3 = e3 - n2(e3, i3), a3 = t4 - n2(t4, i3), l2 = Math.abs(r3 - a3) - function(e4, t5, i4) {
          let s4 = 0;
          const r4 = e4 - n2(e4, i4), a4 = t5 - n2(t5, i4);
          for (let n3 = 0; n3 < Math.abs(r4 - a4); n3++) {
            const a5 = "A" === o(e4, t5) ? -1 : 1, h2 = i4.buffer.lines.get(r4 + a5 * n3);
            h2?.isWrapped && s4++;
          }
          return s4;
        }(e3, t4, i3);
        return c2(l2, h(o(e3, t4), s3));
      }
      function n2(e3, t4) {
        let i3 = 0, s3 = t4.buffer.lines.get(e3), r3 = s3?.isWrapped;
        for (; r3 && e3 >= 0 && e3 < t4.rows; ) i3++, s3 = t4.buffer.lines.get(--e3), r3 = s3?.isWrapped;
        return i3;
      }
      function o(e3, t4) {
        return e3 > t4 ? "A" : "B";
      }
      function a2(e3, t4, i3, s3, r3, n3) {
        let o2 = e3, a3 = t4, h2 = "";
        for (; o2 !== i3 || a3 !== s3; ) o2 += r3 ? 1 : -1, r3 && o2 > n3.cols - 1 ? (h2 += n3.buffer.translateBufferLineToString(a3, false, e3, o2), o2 = 0, e3 = 0, a3++) : !r3 && o2 < 0 && (h2 += n3.buffer.translateBufferLineToString(a3, false, 0, e3 + 1), o2 = n3.cols - 1, e3 = o2, a3--);
        return h2 + n3.buffer.translateBufferLineToString(a3, false, e3, o2);
      }
      function h(e3, t4) {
        const i3 = t4 ? "O" : "[";
        return s2.C0.ESC + i3 + e3;
      }
      function c2(e3, t4) {
        e3 = Math.floor(e3);
        let i3 = "";
        for (let s3 = 0; s3 < e3; s3++) i3 += t4;
        return i3;
      }
      t3.moveToCellSequence = function(e3, t4, i3, s3) {
        const o2 = i3.buffer.x, l2 = i3.buffer.y;
        if (!i3.buffer.hasScrollback) return function(e4, t5, i4, s4, o3, l3) {
          return 0 === r2(t5, s4, o3, l3).length ? "" : c2(a2(e4, t5, e4, t5 - n2(t5, o3), false, o3).length, h("D", l3));
        }(o2, l2, 0, t4, i3, s3) + r2(l2, t4, i3, s3) + function(e4, t5, i4, s4, o3, l3) {
          let d2;
          d2 = r2(t5, s4, o3, l3).length > 0 ? s4 - n2(s4, o3) : t5;
          const _2 = s4, u2 = function(e5, t6, i5, s5, o4, a3) {
            let h2;
            return h2 = r2(i5, s5, o4, a3).length > 0 ? s5 - n2(s5, o4) : t6, e5 < i5 && h2 <= s5 || e5 >= i5 && h2 < s5 ? "C" : "D";
          }(e4, t5, i4, s4, o3, l3);
          return c2(a2(e4, d2, i4, _2, "C" === u2, o3).length, h(u2, l3));
        }(o2, l2, e3, t4, i3, s3);
        let d;
        if (l2 === t4) return d = o2 > e3 ? "D" : "C", c2(Math.abs(o2 - e3), h(d, s3));
        d = l2 > t4 ? "D" : "C";
        const _ = Math.abs(l2 - t4);
        return c2(function(e4, t5) {
          return t5.cols - e4;
        }(l2 > t4 ? e3 : o2, i3) + (_ - 1) * i3.cols + 1 + ((l2 > t4 ? o2 : e3) - 1), h(d, s3));
      };
    }, 1296: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DomRenderer = void 0;
      const n2 = i2(3787), o = i2(2550), a2 = i2(2223), h = i2(6171), c2 = i2(6052), l2 = i2(4725), d = i2(8055), _ = i2(8460), u2 = i2(844), f2 = i2(2585), v2 = "xterm-dom-renderer-owner-", p2 = "xterm-rows", g = "xterm-fg-", m2 = "xterm-bg-", S2 = "xterm-focus", C2 = "xterm-selection";
      let b = 1, w2 = t3.DomRenderer = class extends u2.Disposable {
        constructor(e3, t4, i3, s3, r3, a3, l3, d2, f3, g2, m3, S3, w3) {
          super(), this._terminal = e3, this._document = t4, this._element = i3, this._screenElement = s3, this._viewportElement = r3, this._helperContainer = a3, this._linkifier2 = l3, this._charSizeService = f3, this._optionsService = g2, this._bufferService = m3, this._coreBrowserService = S3, this._themeService = w3, this._terminalClass = b++, this._rowElements = [], this._selectionRenderModel = (0, c2.createSelectionRenderModel)(), this.onRequestRedraw = this.register(new _.EventEmitter()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(p2), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(C2), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, h.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this.register(this._themeService.onChangeColors((e4) => this._injectCss(e4))), this._injectCss(this._themeService.colors), this._rowFactory = d2.createInstance(n2.DomRendererRowFactory, document), this._element.classList.add(v2 + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline((e4) => this._handleLinkHover(e4))), this.register(this._linkifier2.onHideLinkUnderline((e4) => this._handleLinkLeave(e4))), this.register((0, u2.toDisposable)(() => {
            this._element.classList.remove(v2 + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
          })), this._widthCache = new o.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        _updateDimensions() {
          const e3 = this._coreBrowserService.dpr;
          this.dimensions.device.char.width = this._charSizeService.width * e3, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e3), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e3), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e3), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
          for (const e4 of this._rowElements) e4.style.width = `${this.dimensions.css.canvas.width}px`, e4.style.height = `${this.dimensions.css.cell.height}px`, e4.style.lineHeight = `${this.dimensions.css.cell.height}px`, e4.style.overflow = "hidden";
          this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
          const t4 = `${this._terminalSelector} .${p2} span { display: inline-block; height: 100%; vertical-align: top;}`;
          this._dimensionsStyleElement.textContent = t4, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
        }
        _injectCss(e3) {
          this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
          let t4 = `${this._terminalSelector} .${p2} { color: ${e3.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
          t4 += `${this._terminalSelector} .${p2} .xterm-dim { color: ${d.color.multiplyOpacity(e3.foreground, 0.5).css};}`, t4 += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
          const i3 = `blink_underline_${this._terminalClass}`, s3 = `blink_bar_${this._terminalClass}`, r3 = `blink_block_${this._terminalClass}`;
          t4 += `@keyframes ${i3} { 50% {  border-bottom-style: hidden; }}`, t4 += `@keyframes ${s3} { 50% {  box-shadow: none; }}`, t4 += `@keyframes ${r3} { 0% {  background-color: ${e3.cursor.css};  color: ${e3.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e3.cursor.css}; }}`, t4 += `${this._terminalSelector} .${p2}.${S2} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${i3} 1s step-end infinite;}${this._terminalSelector} .${p2}.${S2} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${s3} 1s step-end infinite;}${this._terminalSelector} .${p2}.${S2} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${r3} 1s step-end infinite;}${this._terminalSelector} .${p2} .xterm-cursor.xterm-cursor-block { background-color: ${e3.cursor.css}; color: ${e3.cursorAccent.css};}${this._terminalSelector} .${p2} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e3.cursor.css} !important; color: ${e3.cursorAccent.css} !important;}${this._terminalSelector} .${p2} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e3.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${p2} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e3.cursor.css} inset;}${this._terminalSelector} .${p2} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e3.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t4 += `${this._terminalSelector} .${C2} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${C2} div { position: absolute; background-color: ${e3.selectionBackgroundOpaque.css};}${this._terminalSelector} .${C2} div { position: absolute; background-color: ${e3.selectionInactiveBackgroundOpaque.css};}`;
          for (const [i4, s4] of e3.ansi.entries()) t4 += `${this._terminalSelector} .${g}${i4} { color: ${s4.css}; }${this._terminalSelector} .${g}${i4}.xterm-dim { color: ${d.color.multiplyOpacity(s4, 0.5).css}; }${this._terminalSelector} .${m2}${i4} { background-color: ${s4.css}; }`;
          t4 += `${this._terminalSelector} .${g}${a2.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(e3.background).css}; }${this._terminalSelector} .${g}${a2.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${d.color.multiplyOpacity(d.color.opaque(e3.background), 0.5).css}; }${this._terminalSelector} .${m2}${a2.INVERTED_DEFAULT_COLOR} { background-color: ${e3.foreground.css}; }`, this._themeStyleElement.textContent = t4;
        }
        _setDefaultSpacing() {
          const e3 = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
          this._rowContainer.style.letterSpacing = `${e3}px`, this._rowFactory.defaultSpacing = e3;
        }
        handleDevicePixelRatioChange() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        _refreshRowElements(e3, t4) {
          for (let e4 = this._rowElements.length; e4 <= t4; e4++) {
            const e5 = this._document.createElement("div");
            this._rowContainer.appendChild(e5), this._rowElements.push(e5);
          }
          for (; this._rowElements.length > t4; ) this._rowContainer.removeChild(this._rowElements.pop());
        }
        handleResize(e3, t4) {
          this._refreshRowElements(e3, t4), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
        }
        handleCharSizeChanged() {
          this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
        }
        handleBlur() {
          this._rowContainer.classList.remove(S2), this.renderRows(0, this._bufferService.rows - 1);
        }
        handleFocus() {
          this._rowContainer.classList.add(S2), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
        }
        handleSelectionChanged(e3, t4, i3) {
          if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e3, t4, i3), this.renderRows(0, this._bufferService.rows - 1), !e3 || !t4) return;
          this._selectionRenderModel.update(this._terminal, e3, t4, i3);
          const s3 = this._selectionRenderModel.viewportStartRow, r3 = this._selectionRenderModel.viewportEndRow, n3 = this._selectionRenderModel.viewportCappedStartRow, o2 = this._selectionRenderModel.viewportCappedEndRow;
          if (n3 >= this._bufferService.rows || o2 < 0) return;
          const a3 = this._document.createDocumentFragment();
          if (i3) {
            const i4 = e3[0] > t4[0];
            a3.appendChild(this._createSelectionElement(n3, i4 ? t4[0] : e3[0], i4 ? e3[0] : t4[0], o2 - n3 + 1));
          } else {
            const i4 = s3 === n3 ? e3[0] : 0, h2 = n3 === r3 ? t4[0] : this._bufferService.cols;
            a3.appendChild(this._createSelectionElement(n3, i4, h2));
            const c3 = o2 - n3 - 1;
            if (a3.appendChild(this._createSelectionElement(n3 + 1, 0, this._bufferService.cols, c3)), n3 !== o2) {
              const e4 = r3 === o2 ? t4[0] : this._bufferService.cols;
              a3.appendChild(this._createSelectionElement(o2, 0, e4));
            }
          }
          this._selectionContainer.appendChild(a3);
        }
        _createSelectionElement(e3, t4, i3, s3 = 1) {
          const r3 = this._document.createElement("div"), n3 = t4 * this.dimensions.css.cell.width;
          let o2 = this.dimensions.css.cell.width * (i3 - t4);
          return n3 + o2 > this.dimensions.css.canvas.width && (o2 = this.dimensions.css.canvas.width - n3), r3.style.height = s3 * this.dimensions.css.cell.height + "px", r3.style.top = e3 * this.dimensions.css.cell.height + "px", r3.style.left = `${n3}px`, r3.style.width = `${o2}px`, r3;
        }
        handleCursorMove() {
        }
        _handleOptionsChanged() {
          this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
        }
        clear() {
          for (const e3 of this._rowElements) e3.replaceChildren();
        }
        renderRows(e3, t4) {
          const i3 = this._bufferService.buffer, s3 = i3.ybase + i3.y, r3 = Math.min(i3.x, this._bufferService.cols - 1), n3 = this._optionsService.rawOptions.cursorBlink, o2 = this._optionsService.rawOptions.cursorStyle, a3 = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let h2 = e3; h2 <= t4; h2++) {
            const e4 = h2 + i3.ydisp, t5 = this._rowElements[h2], c3 = i3.lines.get(e4);
            if (!t5 || !c3) break;
            t5.replaceChildren(...this._rowFactory.createRow(c3, e4, e4 === s3, o2, a3, r3, n3, this.dimensions.css.cell.width, this._widthCache, -1, -1));
          }
        }
        get _terminalSelector() {
          return `.${v2}${this._terminalClass}`;
        }
        _handleLinkHover(e3) {
          this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, true);
        }
        _handleLinkLeave(e3) {
          this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, false);
        }
        _setCellUnderline(e3, t4, i3, s3, r3, n3) {
          i3 < 0 && (e3 = 0), s3 < 0 && (t4 = 0);
          const o2 = this._bufferService.rows - 1;
          i3 = Math.max(Math.min(i3, o2), 0), s3 = Math.max(Math.min(s3, o2), 0), r3 = Math.min(r3, this._bufferService.cols);
          const a3 = this._bufferService.buffer, h2 = a3.ybase + a3.y, c3 = Math.min(a3.x, r3 - 1), l3 = this._optionsService.rawOptions.cursorBlink, d2 = this._optionsService.rawOptions.cursorStyle, _2 = this._optionsService.rawOptions.cursorInactiveStyle;
          for (let o3 = i3; o3 <= s3; ++o3) {
            const u3 = o3 + a3.ydisp, f3 = this._rowElements[o3], v3 = a3.lines.get(u3);
            if (!f3 || !v3) break;
            f3.replaceChildren(...this._rowFactory.createRow(v3, u3, u3 === h2, d2, _2, c3, l3, this.dimensions.css.cell.width, this._widthCache, n3 ? o3 === i3 ? e3 : 0 : -1, n3 ? (o3 === s3 ? t4 : r3) - 1 : -1));
          }
        }
      };
      t3.DomRenderer = w2 = s2([r2(7, f2.IInstantiationService), r2(8, l2.ICharSizeService), r2(9, f2.IOptionsService), r2(10, f2.IBufferService), r2(11, l2.ICoreBrowserService), r2(12, l2.IThemeService)], w2);
    }, 3787: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DomRendererRowFactory = void 0;
      const n2 = i2(2223), o = i2(643), a2 = i2(511), h = i2(2585), c2 = i2(8055), l2 = i2(4725), d = i2(4269), _ = i2(6171), u2 = i2(3734);
      let f2 = t3.DomRendererRowFactory = class {
        constructor(e3, t4, i3, s3, r3, n3, o2) {
          this._document = e3, this._characterJoinerService = t4, this._optionsService = i3, this._coreBrowserService = s3, this._coreService = r3, this._decorationService = n3, this._themeService = o2, this._workCell = new a2.CellData(), this._columnSelectMode = false, this.defaultSpacing = 0;
        }
        handleSelectionChanged(e3, t4, i3) {
          this._selectionStart = e3, this._selectionEnd = t4, this._columnSelectMode = i3;
        }
        createRow(e3, t4, i3, s3, r3, a3, h2, l3, _2, f3, p2) {
          const g = [], m2 = this._characterJoinerService.getJoinedCharacters(t4), S2 = this._themeService.colors;
          let C2, b = e3.getNoBgTrimmedLength();
          i3 && b < a3 + 1 && (b = a3 + 1);
          let w2 = 0, y2 = "", E2 = 0, k2 = 0, L2 = 0, D2 = false, R2 = 0, x2 = false, A2 = 0;
          const B2 = [], T2 = -1 !== f3 && -1 !== p2;
          for (let M2 = 0; M2 < b; M2++) {
            e3.loadCell(M2, this._workCell);
            let b2 = this._workCell.getWidth();
            if (0 === b2) continue;
            let O2 = false, P2 = M2, I2 = this._workCell;
            if (m2.length > 0 && M2 === m2[0][0]) {
              O2 = true;
              const t5 = m2.shift();
              I2 = new d.JoinedCellData(this._workCell, e3.translateToString(true, t5[0], t5[1]), t5[1] - t5[0]), P2 = t5[1] - 1, b2 = I2.getWidth();
            }
            const H2 = this._isCellInSelection(M2, t4), F2 = i3 && M2 === a3, W2 = T2 && M2 >= f3 && M2 <= p2;
            let U2 = false;
            this._decorationService.forEachDecorationAtCell(M2, t4, void 0, (e4) => {
              U2 = true;
            });
            let N2 = I2.getChars() || o.WHITESPACE_CELL_CHAR;
            if (" " === N2 && (I2.isUnderline() || I2.isOverline()) && (N2 = " "), A2 = b2 * l3 - _2.get(N2, I2.isBold(), I2.isItalic()), C2) {
              if (w2 && (H2 && x2 || !H2 && !x2 && I2.bg === E2) && (H2 && x2 && S2.selectionForeground || I2.fg === k2) && I2.extended.ext === L2 && W2 === D2 && A2 === R2 && !F2 && !O2 && !U2) {
                I2.isInvisible() ? y2 += o.WHITESPACE_CELL_CHAR : y2 += N2, w2++;
                continue;
              }
              w2 && (C2.textContent = y2), C2 = this._document.createElement("span"), w2 = 0, y2 = "";
            } else C2 = this._document.createElement("span");
            if (E2 = I2.bg, k2 = I2.fg, L2 = I2.extended.ext, D2 = W2, R2 = A2, x2 = H2, O2 && a3 >= M2 && a3 <= P2 && (a3 = M2), !this._coreService.isCursorHidden && F2 && this._coreService.isCursorInitialized) {
              if (B2.push("xterm-cursor"), this._coreBrowserService.isFocused) h2 && B2.push("xterm-cursor-blink"), B2.push("bar" === s3 ? "xterm-cursor-bar" : "underline" === s3 ? "xterm-cursor-underline" : "xterm-cursor-block");
              else if (r3) switch (r3) {
                case "outline":
                  B2.push("xterm-cursor-outline");
                  break;
                case "block":
                  B2.push("xterm-cursor-block");
                  break;
                case "bar":
                  B2.push("xterm-cursor-bar");
                  break;
                case "underline":
                  B2.push("xterm-cursor-underline");
              }
            }
            if (I2.isBold() && B2.push("xterm-bold"), I2.isItalic() && B2.push("xterm-italic"), I2.isDim() && B2.push("xterm-dim"), y2 = I2.isInvisible() ? o.WHITESPACE_CELL_CHAR : I2.getChars() || o.WHITESPACE_CELL_CHAR, I2.isUnderline() && (B2.push(`xterm-underline-${I2.extended.underlineStyle}`), " " === y2 && (y2 = " "), !I2.isUnderlineColorDefault())) if (I2.isUnderlineColorRGB()) C2.style.textDecorationColor = `rgb(${u2.AttributeData.toColorRGB(I2.getUnderlineColor()).join(",")})`;
            else {
              let e4 = I2.getUnderlineColor();
              this._optionsService.rawOptions.drawBoldTextInBrightColors && I2.isBold() && e4 < 8 && (e4 += 8), C2.style.textDecorationColor = S2.ansi[e4].css;
            }
            I2.isOverline() && (B2.push("xterm-overline"), " " === y2 && (y2 = " ")), I2.isStrikethrough() && B2.push("xterm-strikethrough"), W2 && (C2.style.textDecoration = "underline");
            let $ = I2.getFgColor(), j = I2.getFgColorMode(), z2 = I2.getBgColor(), K2 = I2.getBgColorMode();
            const q2 = !!I2.isInverse();
            if (q2) {
              const e4 = $;
              $ = z2, z2 = e4;
              const t5 = j;
              j = K2, K2 = t5;
            }
            let V2, G2, X2, J2 = false;
            switch (this._decorationService.forEachDecorationAtCell(M2, t4, void 0, (e4) => {
              "top" !== e4.options.layer && J2 || (e4.backgroundColorRGB && (K2 = 50331648, z2 = e4.backgroundColorRGB.rgba >> 8 & 16777215, V2 = e4.backgroundColorRGB), e4.foregroundColorRGB && (j = 50331648, $ = e4.foregroundColorRGB.rgba >> 8 & 16777215, G2 = e4.foregroundColorRGB), J2 = "top" === e4.options.layer);
            }), !J2 && H2 && (V2 = this._coreBrowserService.isFocused ? S2.selectionBackgroundOpaque : S2.selectionInactiveBackgroundOpaque, z2 = V2.rgba >> 8 & 16777215, K2 = 50331648, J2 = true, S2.selectionForeground && (j = 50331648, $ = S2.selectionForeground.rgba >> 8 & 16777215, G2 = S2.selectionForeground)), J2 && B2.push("xterm-decoration-top"), K2) {
              case 16777216:
              case 33554432:
                X2 = S2.ansi[z2], B2.push(`xterm-bg-${z2}`);
                break;
              case 50331648:
                X2 = c2.channels.toColor(z2 >> 16, z2 >> 8 & 255, 255 & z2), this._addStyle(C2, `background-color:#${v2((z2 >>> 0).toString(16), "0", 6)}`);
                break;
              default:
                q2 ? (X2 = S2.foreground, B2.push(`xterm-bg-${n2.INVERTED_DEFAULT_COLOR}`)) : X2 = S2.background;
            }
            switch (V2 || I2.isDim() && (V2 = c2.color.multiplyOpacity(X2, 0.5)), j) {
              case 16777216:
              case 33554432:
                I2.isBold() && $ < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && ($ += 8), this._applyMinimumContrast(C2, X2, S2.ansi[$], I2, V2, void 0) || B2.push(`xterm-fg-${$}`);
                break;
              case 50331648:
                const e4 = c2.channels.toColor($ >> 16 & 255, $ >> 8 & 255, 255 & $);
                this._applyMinimumContrast(C2, X2, e4, I2, V2, G2) || this._addStyle(C2, `color:#${v2($.toString(16), "0", 6)}`);
                break;
              default:
                this._applyMinimumContrast(C2, X2, S2.foreground, I2, V2, G2) || q2 && B2.push(`xterm-fg-${n2.INVERTED_DEFAULT_COLOR}`);
            }
            B2.length && (C2.className = B2.join(" "), B2.length = 0), F2 || O2 || U2 ? C2.textContent = y2 : w2++, A2 !== this.defaultSpacing && (C2.style.letterSpacing = `${A2}px`), g.push(C2), M2 = P2;
          }
          return C2 && w2 && (C2.textContent = y2), g;
        }
        _applyMinimumContrast(e3, t4, i3, s3, r3, n3) {
          if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, _.treatGlyphAsBackgroundColor)(s3.getCode())) return false;
          const o2 = this._getContrastCache(s3);
          let a3;
          if (r3 || n3 || (a3 = o2.getColor(t4.rgba, i3.rgba)), void 0 === a3) {
            const e4 = this._optionsService.rawOptions.minimumContrastRatio / (s3.isDim() ? 2 : 1);
            a3 = c2.color.ensureContrastRatio(r3 || t4, n3 || i3, e4), o2.setColor((r3 || t4).rgba, (n3 || i3).rgba, a3 ?? null);
          }
          return !!a3 && (this._addStyle(e3, `color:${a3.css}`), true);
        }
        _getContrastCache(e3) {
          return e3.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
        }
        _addStyle(e3, t4) {
          e3.setAttribute("style", `${e3.getAttribute("style") || ""}${t4};`);
        }
        _isCellInSelection(e3, t4) {
          const i3 = this._selectionStart, s3 = this._selectionEnd;
          return !(!i3 || !s3) && (this._columnSelectMode ? i3[0] <= s3[0] ? e3 >= i3[0] && t4 >= i3[1] && e3 < s3[0] && t4 <= s3[1] : e3 < i3[0] && t4 >= i3[1] && e3 >= s3[0] && t4 <= s3[1] : t4 > i3[1] && t4 < s3[1] || i3[1] === s3[1] && t4 === i3[1] && e3 >= i3[0] && e3 < s3[0] || i3[1] < s3[1] && t4 === s3[1] && e3 < s3[0] || i3[1] < s3[1] && t4 === i3[1] && e3 >= i3[0]);
        }
      };
      function v2(e3, t4, i3) {
        for (; e3.length < i3; ) e3 = t4 + e3;
        return e3;
      }
      t3.DomRendererRowFactory = f2 = s2([r2(1, l2.ICharacterJoinerService), r2(2, h.IOptionsService), r2(3, l2.ICoreBrowserService), r2(4, h.ICoreService), r2(5, h.IDecorationService), r2(6, l2.IThemeService)], f2);
    }, 2550: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.WidthCache = void 0, t3.WidthCache = class {
        constructor(e3, t4) {
          this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e3.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
          const i2 = e3.createElement("span");
          i2.classList.add("xterm-char-measure-element");
          const s2 = e3.createElement("span");
          s2.classList.add("xterm-char-measure-element"), s2.style.fontWeight = "bold";
          const r2 = e3.createElement("span");
          r2.classList.add("xterm-char-measure-element"), r2.style.fontStyle = "italic";
          const n2 = e3.createElement("span");
          n2.classList.add("xterm-char-measure-element"), n2.style.fontWeight = "bold", n2.style.fontStyle = "italic", this._measureElements = [i2, s2, r2, n2], this._container.appendChild(i2), this._container.appendChild(s2), this._container.appendChild(r2), this._container.appendChild(n2), t4.appendChild(this._container), this.clear();
        }
        dispose() {
          this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
        }
        clear() {
          this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
        }
        setFont(e3, t4, i2, s2) {
          e3 === this._font && t4 === this._fontSize && i2 === this._weight && s2 === this._weightBold || (this._font = e3, this._fontSize = t4, this._weight = i2, this._weightBold = s2, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i2}`, this._measureElements[1].style.fontWeight = `${s2}`, this._measureElements[2].style.fontWeight = `${i2}`, this._measureElements[3].style.fontWeight = `${s2}`, this.clear());
        }
        get(e3, t4, i2) {
          let s2 = 0;
          if (!t4 && !i2 && 1 === e3.length && (s2 = e3.charCodeAt(0)) < 256) {
            if (-9999 !== this._flat[s2]) return this._flat[s2];
            const t5 = this._measure(e3, 0);
            return t5 > 0 && (this._flat[s2] = t5), t5;
          }
          let r2 = e3;
          t4 && (r2 += "B"), i2 && (r2 += "I");
          let n2 = this._holey.get(r2);
          if (void 0 === n2) {
            let s3 = 0;
            t4 && (s3 |= 1), i2 && (s3 |= 2), n2 = this._measure(e3, s3), n2 > 0 && this._holey.set(r2, n2);
          }
          return n2;
        }
        _measure(e3, t4) {
          const i2 = this._measureElements[t4];
          return i2.textContent = e3.repeat(32), i2.offsetWidth / 32;
        }
      };
    }, 2223: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.TEXT_BASELINE = t3.DIM_OPACITY = t3.INVERTED_DEFAULT_COLOR = void 0;
      const s2 = i2(6114);
      t3.INVERTED_DEFAULT_COLOR = 257, t3.DIM_OPACITY = 0.5, t3.TEXT_BASELINE = s2.isFirefox || s2.isLegacyEdge ? "bottom" : "ideographic";
    }, 6171: (e2, t3) => {
      function i2(e3) {
        return 57508 <= e3 && e3 <= 57558;
      }
      function s2(e3) {
        return e3 >= 128512 && e3 <= 128591 || e3 >= 127744 && e3 <= 128511 || e3 >= 128640 && e3 <= 128767 || e3 >= 9728 && e3 <= 9983 || e3 >= 9984 && e3 <= 10175 || e3 >= 65024 && e3 <= 65039 || e3 >= 129280 && e3 <= 129535 || e3 >= 127462 && e3 <= 127487;
      }
      Object.defineProperty(t3, "__esModule", { value: true }), t3.computeNextVariantOffset = t3.createRenderDimensions = t3.treatGlyphAsBackgroundColor = t3.allowRescaling = t3.isEmoji = t3.isRestrictedPowerlineGlyph = t3.isPowerlineGlyph = t3.throwIfFalsy = void 0, t3.throwIfFalsy = function(e3) {
        if (!e3) throw new Error("value must not be falsy");
        return e3;
      }, t3.isPowerlineGlyph = i2, t3.isRestrictedPowerlineGlyph = function(e3) {
        return 57520 <= e3 && e3 <= 57527;
      }, t3.isEmoji = s2, t3.allowRescaling = function(e3, t4, r2, n2) {
        return 1 === t4 && r2 > Math.ceil(1.5 * n2) && void 0 !== e3 && e3 > 255 && !s2(e3) && !i2(e3) && !function(e4) {
          return 57344 <= e4 && e4 <= 63743;
        }(e3);
      }, t3.treatGlyphAsBackgroundColor = function(e3) {
        return i2(e3) || function(e4) {
          return 9472 <= e4 && e4 <= 9631;
        }(e3);
      }, t3.createRenderDimensions = function() {
        return { css: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 } }, device: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 }, char: { width: 0, height: 0, left: 0, top: 0 } } };
      }, t3.computeNextVariantOffset = function(e3, t4, i3 = 0) {
        return (e3 - (2 * Math.round(t4) - i3)) % (2 * Math.round(t4));
      };
    }, 6052: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.createSelectionRenderModel = void 0;
      class i2 {
        constructor() {
          this.clear();
        }
        clear() {
          this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
        }
        update(e3, t4, i3, s2 = false) {
          if (this.selectionStart = t4, this.selectionEnd = i3, !t4 || !i3 || t4[0] === i3[0] && t4[1] === i3[1]) return void this.clear();
          const r2 = e3.buffers.active.ydisp, n2 = t4[1] - r2, o = i3[1] - r2, a2 = Math.max(n2, 0), h = Math.min(o, e3.rows - 1);
          a2 >= e3.rows || h < 0 ? this.clear() : (this.hasSelection = true, this.columnSelectMode = s2, this.viewportStartRow = n2, this.viewportEndRow = o, this.viewportCappedStartRow = a2, this.viewportCappedEndRow = h, this.startCol = t4[0], this.endCol = i3[0]);
        }
        isCellSelected(e3, t4, i3) {
          return !!this.hasSelection && (i3 -= e3.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t4 >= this.startCol && i3 >= this.viewportCappedStartRow && t4 < this.endCol && i3 <= this.viewportCappedEndRow : t4 < this.startCol && i3 >= this.viewportCappedStartRow && t4 >= this.endCol && i3 <= this.viewportCappedEndRow : i3 > this.viewportStartRow && i3 < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i3 === this.viewportStartRow && t4 >= this.startCol && t4 < this.endCol || this.viewportStartRow < this.viewportEndRow && i3 === this.viewportEndRow && t4 < this.endCol || this.viewportStartRow < this.viewportEndRow && i3 === this.viewportStartRow && t4 >= this.startCol);
        }
      }
      t3.createSelectionRenderModel = function() {
        return new i2();
      };
    }, 456: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.SelectionModel = void 0, t3.SelectionModel = class {
        constructor(e3) {
          this._bufferService = e3, this.isSelectAllActive = false, this.selectionStartLength = 0;
        }
        clearSelection() {
          this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
        }
        get finalSelectionStart() {
          return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
        }
        get finalSelectionEnd() {
          if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
          if (this.selectionStart) {
            if (!this.selectionEnd || this.areSelectionValuesReversed()) {
              const e3 = this.selectionStart[0] + this.selectionStartLength;
              return e3 > this._bufferService.cols ? e3 % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols) - 1] : [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [e3, this.selectionStart[1]];
            }
            if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
              const e3 = this.selectionStart[0] + this.selectionStartLength;
              return e3 > this._bufferService.cols ? [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [Math.max(e3, this.selectionEnd[0]), this.selectionEnd[1]];
            }
            return this.selectionEnd;
          }
        }
        areSelectionValuesReversed() {
          const e3 = this.selectionStart, t4 = this.selectionEnd;
          return !(!e3 || !t4) && (e3[1] > t4[1] || e3[1] === t4[1] && e3[0] > t4[0]);
        }
        handleTrim(e3) {
          return this.selectionStart && (this.selectionStart[1] -= e3), this.selectionEnd && (this.selectionEnd[1] -= e3), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
        }
      };
    }, 428: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CharSizeService = void 0;
      const n2 = i2(2585), o = i2(8460), a2 = i2(844);
      let h = t3.CharSizeService = class extends a2.Disposable {
        get hasValidSize() {
          return this.width > 0 && this.height > 0;
        }
        constructor(e3, t4, i3) {
          super(), this._optionsService = i3, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new o.EventEmitter()), this.onCharSizeChange = this._onCharSizeChange.event;
          try {
            this._measureStrategy = this.register(new d(this._optionsService));
          } catch {
            this._measureStrategy = this.register(new l2(e3, t4, this._optionsService));
          }
          this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
        }
        measure() {
          const e3 = this._measureStrategy.measure();
          e3.width === this.width && e3.height === this.height || (this.width = e3.width, this.height = e3.height, this._onCharSizeChange.fire());
        }
      };
      t3.CharSizeService = h = s2([r2(2, n2.IOptionsService)], h);
      class c2 extends a2.Disposable {
        constructor() {
          super(...arguments), this._result = { width: 0, height: 0 };
        }
        _validateAndSet(e3, t4) {
          void 0 !== e3 && e3 > 0 && void 0 !== t4 && t4 > 0 && (this._result.width = e3, this._result.height = t4);
        }
      }
      class l2 extends c2 {
        constructor(e3, t4, i3) {
          super(), this._document = e3, this._parentElement = t4, this._optionsService = i3, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
        }
        measure() {
          return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
        }
      }
      class d extends c2 {
        constructor(e3) {
          super(), this._optionsService = e3, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
          const t4 = this._ctx.measureText("W");
          if (!("width" in t4 && "fontBoundingBoxAscent" in t4 && "fontBoundingBoxDescent" in t4)) throw new Error("Required font metrics not supported");
        }
        measure() {
          this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
          const e3 = this._ctx.measureText("W");
          return this._validateAndSet(e3.width, e3.fontBoundingBoxAscent + e3.fontBoundingBoxDescent), this._result;
        }
      }
    }, 4269: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CharacterJoinerService = t3.JoinedCellData = void 0;
      const n2 = i2(3734), o = i2(643), a2 = i2(511), h = i2(2585);
      class c2 extends n2.AttributeData {
        constructor(e3, t4, i3) {
          super(), this.content = 0, this.combinedData = "", this.fg = e3.fg, this.bg = e3.bg, this.combinedData = t4, this._width = i3;
        }
        isCombined() {
          return 2097152;
        }
        getWidth() {
          return this._width;
        }
        getChars() {
          return this.combinedData;
        }
        getCode() {
          return 2097151;
        }
        setFromCharData(e3) {
          throw new Error("not implemented");
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t3.JoinedCellData = c2;
      let l2 = t3.CharacterJoinerService = class e3 {
        constructor(e4) {
          this._bufferService = e4, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a2.CellData();
        }
        register(e4) {
          const t4 = { id: this._nextCharacterJoinerId++, handler: e4 };
          return this._characterJoiners.push(t4), t4.id;
        }
        deregister(e4) {
          for (let t4 = 0; t4 < this._characterJoiners.length; t4++) if (this._characterJoiners[t4].id === e4) return this._characterJoiners.splice(t4, 1), true;
          return false;
        }
        getJoinedCharacters(e4) {
          if (0 === this._characterJoiners.length) return [];
          const t4 = this._bufferService.buffer.lines.get(e4);
          if (!t4 || 0 === t4.length) return [];
          const i3 = [], s3 = t4.translateToString(true);
          let r3 = 0, n3 = 0, a3 = 0, h2 = t4.getFg(0), c3 = t4.getBg(0);
          for (let e5 = 0; e5 < t4.getTrimmedLength(); e5++) if (t4.loadCell(e5, this._workCell), 0 !== this._workCell.getWidth()) {
            if (this._workCell.fg !== h2 || this._workCell.bg !== c3) {
              if (e5 - r3 > 1) {
                const e6 = this._getJoinedRanges(s3, a3, n3, t4, r3);
                for (let t5 = 0; t5 < e6.length; t5++) i3.push(e6[t5]);
              }
              r3 = e5, a3 = n3, h2 = this._workCell.fg, c3 = this._workCell.bg;
            }
            n3 += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
          }
          if (this._bufferService.cols - r3 > 1) {
            const e5 = this._getJoinedRanges(s3, a3, n3, t4, r3);
            for (let t5 = 0; t5 < e5.length; t5++) i3.push(e5[t5]);
          }
          return i3;
        }
        _getJoinedRanges(t4, i3, s3, r3, n3) {
          const o2 = t4.substring(i3, s3);
          let a3 = [];
          try {
            a3 = this._characterJoiners[0].handler(o2);
          } catch (e4) {
            console.error(e4);
          }
          for (let t5 = 1; t5 < this._characterJoiners.length; t5++) try {
            const i4 = this._characterJoiners[t5].handler(o2);
            for (let t6 = 0; t6 < i4.length; t6++) e3._mergeRanges(a3, i4[t6]);
          } catch (e4) {
            console.error(e4);
          }
          return this._stringRangesToCellRanges(a3, r3, n3), a3;
        }
        _stringRangesToCellRanges(e4, t4, i3) {
          let s3 = 0, r3 = false, n3 = 0, a3 = e4[s3];
          if (a3) {
            for (let h2 = i3; h2 < this._bufferService.cols; h2++) {
              const i4 = t4.getWidth(h2), c3 = t4.getString(h2).length || o.WHITESPACE_CELL_CHAR.length;
              if (0 !== i4) {
                if (!r3 && a3[0] <= n3 && (a3[0] = h2, r3 = true), a3[1] <= n3) {
                  if (a3[1] = h2, a3 = e4[++s3], !a3) break;
                  a3[0] <= n3 ? (a3[0] = h2, r3 = true) : r3 = false;
                }
                n3 += c3;
              }
            }
            a3 && (a3[1] = this._bufferService.cols);
          }
        }
        static _mergeRanges(e4, t4) {
          let i3 = false;
          for (let s3 = 0; s3 < e4.length; s3++) {
            const r3 = e4[s3];
            if (i3) {
              if (t4[1] <= r3[0]) return e4[s3 - 1][1] = t4[1], e4;
              if (t4[1] <= r3[1]) return e4[s3 - 1][1] = Math.max(t4[1], r3[1]), e4.splice(s3, 1), e4;
              e4.splice(s3, 1), s3--;
            } else {
              if (t4[1] <= r3[0]) return e4.splice(s3, 0, t4), e4;
              if (t4[1] <= r3[1]) return r3[0] = Math.min(t4[0], r3[0]), e4;
              t4[0] < r3[1] && (r3[0] = Math.min(t4[0], r3[0]), i3 = true);
            }
          }
          return i3 ? e4[e4.length - 1][1] = t4[1] : e4.push(t4), e4;
        }
      };
      t3.CharacterJoinerService = l2 = s2([r2(0, h.IBufferService)], l2);
    }, 5114: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CoreBrowserService = void 0;
      const s2 = i2(844), r2 = i2(8460), n2 = i2(3656);
      class o extends s2.Disposable {
        constructor(e3, t4, i3) {
          super(), this._textarea = e3, this._window = t4, this.mainDocument = i3, this._isFocused = false, this._cachedIsFocused = void 0, this._screenDprMonitor = new a2(this._window), this._onDprChange = this.register(new r2.EventEmitter()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this.register(new r2.EventEmitter()), this.onWindowChange = this._onWindowChange.event, this.register(this.onWindowChange((e4) => this._screenDprMonitor.setWindow(e4))), this.register((0, r2.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange)), this._textarea.addEventListener("focus", () => this._isFocused = true), this._textarea.addEventListener("blur", () => this._isFocused = false);
        }
        get window() {
          return this._window;
        }
        set window(e3) {
          this._window !== e3 && (this._window = e3, this._onWindowChange.fire(this._window));
        }
        get dpr() {
          return this.window.devicePixelRatio;
        }
        get isFocused() {
          return void 0 === this._cachedIsFocused && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
        }
      }
      t3.CoreBrowserService = o;
      class a2 extends s2.Disposable {
        constructor(e3) {
          super(), this._parentWindow = e3, this._windowResizeListener = this.register(new s2.MutableDisposable()), this._onDprChange = this.register(new r2.EventEmitter()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this.register((0, s2.toDisposable)(() => this.clearListener()));
        }
        setWindow(e3) {
          this._parentWindow = e3, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
        }
        _setWindowResizeListener() {
          this._windowResizeListener.value = (0, n2.addDisposableDomListener)(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
        }
        _setDprAndFireIfDiffers() {
          this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
        }
        _updateDpr() {
          this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
        }
        clearListener() {
          this._resolutionMediaMatchList && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
        }
      }
    }, 779: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.LinkProviderService = void 0;
      const s2 = i2(844);
      class r2 extends s2.Disposable {
        constructor() {
          super(), this.linkProviders = [], this.register((0, s2.toDisposable)(() => this.linkProviders.length = 0));
        }
        registerLinkProvider(e3) {
          return this.linkProviders.push(e3), { dispose: () => {
            const t4 = this.linkProviders.indexOf(e3);
            -1 !== t4 && this.linkProviders.splice(t4, 1);
          } };
        }
      }
      t3.LinkProviderService = r2;
    }, 8934: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.MouseService = void 0;
      const n2 = i2(4725), o = i2(9806);
      let a2 = t3.MouseService = class {
        constructor(e3, t4) {
          this._renderService = e3, this._charSizeService = t4;
        }
        getCoords(e3, t4, i3, s3, r3) {
          return (0, o.getCoords)(window, e3, t4, i3, s3, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, r3);
        }
        getMouseReportCoords(e3, t4) {
          const i3 = (0, o.getCoordsRelativeToElement)(window, e3, t4);
          if (this._charSizeService.hasValidSize) return i3[0] = Math.min(Math.max(i3[0], 0), this._renderService.dimensions.css.canvas.width - 1), i3[1] = Math.min(Math.max(i3[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i3[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i3[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i3[0]), y: Math.floor(i3[1]) };
        }
      };
      t3.MouseService = a2 = s2([r2(0, n2.IRenderService), r2(1, n2.ICharSizeService)], a2);
    }, 3230: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.RenderService = void 0;
      const n2 = i2(6193), o = i2(4725), a2 = i2(8460), h = i2(844), c2 = i2(7226), l2 = i2(2585);
      let d = t3.RenderService = class extends h.Disposable {
        get dimensions() {
          return this._renderer.value.dimensions;
        }
        constructor(e3, t4, i3, s3, r3, o2, l3, d2) {
          super(), this._rowCount = e3, this._charSizeService = s3, this._renderer = this.register(new h.MutableDisposable()), this._pausedResizeTask = new c2.DebouncedIdleTask(), this._observerDisposable = this.register(new h.MutableDisposable()), this._isPaused = false, this._needsFullRefresh = false, this._isNextRenderRedrawOnly = true, this._needsSelectionRefresh = false, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: void 0, end: void 0, columnSelectMode: false }, this._onDimensionsChange = this.register(new a2.EventEmitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new a2.EventEmitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new a2.EventEmitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new a2.EventEmitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new n2.RenderDebouncer((e4, t5) => this._renderRows(e4, t5), l3), this.register(this._renderDebouncer), this.register(l3.onDprChange(() => this.handleDevicePixelRatioChange())), this.register(o2.onResize(() => this._fullRefresh())), this.register(o2.buffers.onBufferActivate(() => this._renderer.value?.clear())), this.register(i3.onOptionChange(() => this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this.register(r3.onDecorationRegistered(() => this._fullRefresh())), this.register(r3.onDecorationRemoved(() => this._fullRefresh())), this.register(i3.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
            this.clear(), this.handleResize(o2.cols, o2.rows), this._fullRefresh();
          })), this.register(i3.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(o2.buffer.y, o2.buffer.y, true))), this.register(d2.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(l3.window, t4), this.register(l3.onWindowChange((e4) => this._registerIntersectionObserver(e4, t4)));
        }
        _registerIntersectionObserver(e3, t4) {
          if ("IntersectionObserver" in e3) {
            const i3 = new e3.IntersectionObserver((e4) => this._handleIntersectionChange(e4[e4.length - 1]), { threshold: 0 });
            i3.observe(t4), this._observerDisposable.value = (0, h.toDisposable)(() => i3.disconnect());
          }
        }
        _handleIntersectionChange(e3) {
          this._isPaused = void 0 === e3.isIntersecting ? 0 === e3.intersectionRatio : !e3.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
        }
        refreshRows(e3, t4, i3 = false) {
          this._isPaused ? this._needsFullRefresh = true : (i3 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e3, t4, this._rowCount));
        }
        _renderRows(e3, t4) {
          this._renderer.value && (e3 = Math.min(e3, this._rowCount - 1), t4 = Math.min(t4, this._rowCount - 1), this._renderer.value.renderRows(e3, t4), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e3, end: t4 }), this._onRender.fire({ start: e3, end: t4 }), this._isNextRenderRedrawOnly = true);
        }
        resize(e3, t4) {
          this._rowCount = t4, this._fireOnCanvasResize();
        }
        _handleOptionsChanged() {
          this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
        }
        _fireOnCanvasResize() {
          this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
        }
        hasRenderer() {
          return !!this._renderer.value;
        }
        setRenderer(e3) {
          this._renderer.value = e3, this._renderer.value && (this._renderer.value.onRequestRedraw((e4) => this.refreshRows(e4.start, e4.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
        }
        addRefreshCallback(e3) {
          return this._renderDebouncer.addRefreshCallback(e3);
        }
        _fullRefresh() {
          this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
        }
        clearTextureAtlas() {
          this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
        }
        handleDevicePixelRatioChange() {
          this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
        }
        handleResize(e3, t4) {
          this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e3, t4)) : this._renderer.value.handleResize(e3, t4), this._fullRefresh());
        }
        handleCharSizeChanged() {
          this._renderer.value?.handleCharSizeChanged();
        }
        handleBlur() {
          this._renderer.value?.handleBlur();
        }
        handleFocus() {
          this._renderer.value?.handleFocus();
        }
        handleSelectionChanged(e3, t4, i3) {
          this._selectionState.start = e3, this._selectionState.end = t4, this._selectionState.columnSelectMode = i3, this._renderer.value?.handleSelectionChanged(e3, t4, i3);
        }
        handleCursorMove() {
          this._renderer.value?.handleCursorMove();
        }
        clear() {
          this._renderer.value?.clear();
        }
      };
      t3.RenderService = d = s2([r2(2, l2.IOptionsService), r2(3, o.ICharSizeService), r2(4, l2.IDecorationService), r2(5, l2.IBufferService), r2(6, o.ICoreBrowserService), r2(7, o.IThemeService)], d);
    }, 9312: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.SelectionService = void 0;
      const n2 = i2(9806), o = i2(9504), a2 = i2(456), h = i2(4725), c2 = i2(8460), l2 = i2(844), d = i2(6114), _ = i2(4841), u2 = i2(511), f2 = i2(2585), v2 = String.fromCharCode(160), p2 = new RegExp(v2, "g");
      let g = t3.SelectionService = class extends l2.Disposable {
        constructor(e3, t4, i3, s3, r3, n3, o2, h2, d2) {
          super(), this._element = e3, this._screenElement = t4, this._linkifier = i3, this._bufferService = s3, this._coreService = r3, this._mouseService = n3, this._optionsService = o2, this._renderService = h2, this._coreBrowserService = d2, this._dragScrollAmount = 0, this._enabled = true, this._workCell = new u2.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = false, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new c2.EventEmitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new c2.EventEmitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new c2.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new c2.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e4) => this._handleMouseMove(e4), this._mouseUpListener = (e4) => this._handleMouseUp(e4), this._coreService.onUserInput(() => {
            this.hasSelection && this.clearSelection();
          }), this._trimListener = this._bufferService.buffer.lines.onTrim((e4) => this._handleTrim(e4)), this.register(this._bufferService.buffers.onBufferActivate((e4) => this._handleBufferActivate(e4))), this.enable(), this._model = new a2.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, l2.toDisposable)(() => {
            this._removeMouseDownListeners();
          }));
        }
        reset() {
          this.clearSelection();
        }
        disable() {
          this.clearSelection(), this._enabled = false;
        }
        enable() {
          this._enabled = true;
        }
        get selectionStart() {
          return this._model.finalSelectionStart;
        }
        get selectionEnd() {
          return this._model.finalSelectionEnd;
        }
        get hasSelection() {
          const e3 = this._model.finalSelectionStart, t4 = this._model.finalSelectionEnd;
          return !(!e3 || !t4 || e3[0] === t4[0] && e3[1] === t4[1]);
        }
        get selectionText() {
          const e3 = this._model.finalSelectionStart, t4 = this._model.finalSelectionEnd;
          if (!e3 || !t4) return "";
          const i3 = this._bufferService.buffer, s3 = [];
          if (3 === this._activeSelectionMode) {
            if (e3[0] === t4[0]) return "";
            const r3 = e3[0] < t4[0] ? e3[0] : t4[0], n3 = e3[0] < t4[0] ? t4[0] : e3[0];
            for (let o2 = e3[1]; o2 <= t4[1]; o2++) {
              const e4 = i3.translateBufferLineToString(o2, true, r3, n3);
              s3.push(e4);
            }
          } else {
            const r3 = e3[1] === t4[1] ? t4[0] : void 0;
            s3.push(i3.translateBufferLineToString(e3[1], true, e3[0], r3));
            for (let r4 = e3[1] + 1; r4 <= t4[1] - 1; r4++) {
              const e4 = i3.lines.get(r4), t5 = i3.translateBufferLineToString(r4, true);
              e4?.isWrapped ? s3[s3.length - 1] += t5 : s3.push(t5);
            }
            if (e3[1] !== t4[1]) {
              const e4 = i3.lines.get(t4[1]), r4 = i3.translateBufferLineToString(t4[1], true, 0, t4[0]);
              e4 && e4.isWrapped ? s3[s3.length - 1] += r4 : s3.push(r4);
            }
          }
          return s3.map((e4) => e4.replace(p2, " ")).join(d.isWindows ? "\r\n" : "\n");
        }
        clearSelection() {
          this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
        }
        refresh(e3) {
          this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), d.isLinux && e3 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
        }
        _refresh() {
          this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: 3 === this._activeSelectionMode });
        }
        _isClickInSelection(e3) {
          const t4 = this._getMouseBufferCoords(e3), i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
          return !!(i3 && s3 && t4) && this._areCoordsInSelection(t4, i3, s3);
        }
        isCellInSelection(e3, t4) {
          const i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
          return !(!i3 || !s3) && this._areCoordsInSelection([e3, t4], i3, s3);
        }
        _areCoordsInSelection(e3, t4, i3) {
          return e3[1] > t4[1] && e3[1] < i3[1] || t4[1] === i3[1] && e3[1] === t4[1] && e3[0] >= t4[0] && e3[0] < i3[0] || t4[1] < i3[1] && e3[1] === i3[1] && e3[0] < i3[0] || t4[1] < i3[1] && e3[1] === t4[1] && e3[0] >= t4[0];
        }
        _selectWordAtCursor(e3, t4) {
          const i3 = this._linkifier.currentLink?.link?.range;
          if (i3) return this._model.selectionStart = [i3.start.x - 1, i3.start.y - 1], this._model.selectionStartLength = (0, _.getRangeLength)(i3, this._bufferService.cols), this._model.selectionEnd = void 0, true;
          const s3 = this._getMouseBufferCoords(e3);
          return !!s3 && (this._selectWordAt(s3, t4), this._model.selectionEnd = void 0, true);
        }
        selectAll() {
          this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
        }
        selectLines(e3, t4) {
          this._model.clearSelection(), e3 = Math.max(e3, 0), t4 = Math.min(t4, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e3], this._model.selectionEnd = [this._bufferService.cols, t4], this.refresh(), this._onSelectionChange.fire();
        }
        _handleTrim(e3) {
          this._model.handleTrim(e3) && this.refresh();
        }
        _getMouseBufferCoords(e3) {
          const t4 = this._mouseService.getCoords(e3, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
          if (t4) return t4[0]--, t4[1]--, t4[1] += this._bufferService.buffer.ydisp, t4;
        }
        _getMouseEventScrollAmount(e3) {
          let t4 = (0, n2.getCoordsRelativeToElement)(this._coreBrowserService.window, e3, this._screenElement)[1];
          const i3 = this._renderService.dimensions.css.canvas.height;
          return t4 >= 0 && t4 <= i3 ? 0 : (t4 > i3 && (t4 -= i3), t4 = Math.min(Math.max(t4, -50), 50), t4 /= 50, t4 / Math.abs(t4) + Math.round(14 * t4));
        }
        shouldForceSelection(e3) {
          return d.isMac ? e3.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e3.shiftKey;
        }
        handleMouseDown(e3) {
          if (this._mouseDownTimeStamp = e3.timeStamp, (2 !== e3.button || !this.hasSelection) && 0 === e3.button) {
            if (!this._enabled) {
              if (!this.shouldForceSelection(e3)) return;
              e3.stopPropagation();
            }
            e3.preventDefault(), this._dragScrollAmount = 0, this._enabled && e3.shiftKey ? this._handleIncrementalClick(e3) : 1 === e3.detail ? this._handleSingleClick(e3) : 2 === e3.detail ? this._handleDoubleClick(e3) : 3 === e3.detail && this._handleTripleClick(e3), this._addMouseDownListeners(), this.refresh(true);
          }
        }
        _addMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
        }
        _removeMouseDownListeners() {
          this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
        }
        _handleIncrementalClick(e3) {
          this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e3));
        }
        _handleSingleClick(e3) {
          if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e3) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e3), !this._model.selectionStart) return;
          this._model.selectionEnd = void 0;
          const t4 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
          t4 && t4.length !== this._model.selectionStart[0] && 0 === t4.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
        }
        _handleDoubleClick(e3) {
          this._selectWordAtCursor(e3, true) && (this._activeSelectionMode = 1);
        }
        _handleTripleClick(e3) {
          const t4 = this._getMouseBufferCoords(e3);
          t4 && (this._activeSelectionMode = 2, this._selectLineAt(t4[1]));
        }
        shouldColumnSelect(e3) {
          return e3.altKey && !(d.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
        }
        _handleMouseMove(e3) {
          if (e3.stopImmediatePropagation(), !this._model.selectionStart) return;
          const t4 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
          if (this._model.selectionEnd = this._getMouseBufferCoords(e3), !this._model.selectionEnd) return void this.refresh(true);
          2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e3), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
          const i3 = this._bufferService.buffer;
          if (this._model.selectionEnd[1] < i3.lines.length) {
            const e4 = i3.lines.get(this._model.selectionEnd[1]);
            e4 && 0 === e4.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
          }
          t4 && t4[0] === this._model.selectionEnd[0] && t4[1] === this._model.selectionEnd[1] || this.refresh(true);
        }
        _dragScroll() {
          if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
            this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
            const e3 = this._bufferService.buffer;
            this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e3.ydisp + this._bufferService.rows, e3.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e3.ydisp), this.refresh();
          }
        }
        _handleMouseUp(e3) {
          const t4 = e3.timeStamp - this._mouseDownTimeStamp;
          if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t4 < 500 && e3.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
            if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
              const t5 = this._mouseService.getCoords(e3, this._element, this._bufferService.cols, this._bufferService.rows, false);
              if (t5 && void 0 !== t5[0] && void 0 !== t5[1]) {
                const e4 = (0, o.moveToCellSequence)(t5[0] - 1, t5[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                this._coreService.triggerDataEvent(e4, true);
              }
            }
          } else this._fireEventIfSelectionChanged();
        }
        _fireEventIfSelectionChanged() {
          const e3 = this._model.finalSelectionStart, t4 = this._model.finalSelectionEnd, i3 = !(!e3 || !t4 || e3[0] === t4[0] && e3[1] === t4[1]);
          i3 ? e3 && t4 && (this._oldSelectionStart && this._oldSelectionEnd && e3[0] === this._oldSelectionStart[0] && e3[1] === this._oldSelectionStart[1] && t4[0] === this._oldSelectionEnd[0] && t4[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e3, t4, i3)) : this._oldHasSelection && this._fireOnSelectionChange(e3, t4, i3);
        }
        _fireOnSelectionChange(e3, t4, i3) {
          this._oldSelectionStart = e3, this._oldSelectionEnd = t4, this._oldHasSelection = i3, this._onSelectionChange.fire();
        }
        _handleBufferActivate(e3) {
          this.clearSelection(), this._trimListener.dispose(), this._trimListener = e3.activeBuffer.lines.onTrim((e4) => this._handleTrim(e4));
        }
        _convertViewportColToCharacterIndex(e3, t4) {
          let i3 = t4;
          for (let s3 = 0; t4 >= s3; s3++) {
            const r3 = e3.loadCell(s3, this._workCell).getChars().length;
            0 === this._workCell.getWidth() ? i3-- : r3 > 1 && t4 !== s3 && (i3 += r3 - 1);
          }
          return i3;
        }
        setSelection(e3, t4, i3) {
          this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e3, t4], this._model.selectionStartLength = i3, this.refresh(), this._fireEventIfSelectionChanged();
        }
        rightClickSelect(e3) {
          this._isClickInSelection(e3) || (this._selectWordAtCursor(e3, false) && this.refresh(true), this._fireEventIfSelectionChanged());
        }
        _getWordAt(e3, t4, i3 = true, s3 = true) {
          if (e3[0] >= this._bufferService.cols) return;
          const r3 = this._bufferService.buffer, n3 = r3.lines.get(e3[1]);
          if (!n3) return;
          const o2 = r3.translateBufferLineToString(e3[1], false);
          let a3 = this._convertViewportColToCharacterIndex(n3, e3[0]), h2 = a3;
          const c3 = e3[0] - a3;
          let l3 = 0, d2 = 0, _2 = 0, u3 = 0;
          if (" " === o2.charAt(a3)) {
            for (; a3 > 0 && " " === o2.charAt(a3 - 1); ) a3--;
            for (; h2 < o2.length && " " === o2.charAt(h2 + 1); ) h2++;
          } else {
            let t5 = e3[0], i4 = e3[0];
            0 === n3.getWidth(t5) && (l3++, t5--), 2 === n3.getWidth(i4) && (d2++, i4++);
            const s4 = n3.getString(i4).length;
            for (s4 > 1 && (u3 += s4 - 1, h2 += s4 - 1); t5 > 0 && a3 > 0 && !this._isCharWordSeparator(n3.loadCell(t5 - 1, this._workCell)); ) {
              n3.loadCell(t5 - 1, this._workCell);
              const e4 = this._workCell.getChars().length;
              0 === this._workCell.getWidth() ? (l3++, t5--) : e4 > 1 && (_2 += e4 - 1, a3 -= e4 - 1), a3--, t5--;
            }
            for (; i4 < n3.length && h2 + 1 < o2.length && !this._isCharWordSeparator(n3.loadCell(i4 + 1, this._workCell)); ) {
              n3.loadCell(i4 + 1, this._workCell);
              const e4 = this._workCell.getChars().length;
              2 === this._workCell.getWidth() ? (d2++, i4++) : e4 > 1 && (u3 += e4 - 1, h2 += e4 - 1), h2++, i4++;
            }
          }
          h2++;
          let f3 = a3 + c3 - l3 + _2, v3 = Math.min(this._bufferService.cols, h2 - a3 + l3 + d2 - _2 - u3);
          if (t4 || "" !== o2.slice(a3, h2).trim()) {
            if (i3 && 0 === f3 && 32 !== n3.getCodePoint(0)) {
              const t5 = r3.lines.get(e3[1] - 1);
              if (t5 && n3.isWrapped && 32 !== t5.getCodePoint(this._bufferService.cols - 1)) {
                const t6 = this._getWordAt([this._bufferService.cols - 1, e3[1] - 1], false, true, false);
                if (t6) {
                  const e4 = this._bufferService.cols - t6.start;
                  f3 -= e4, v3 += e4;
                }
              }
            }
            if (s3 && f3 + v3 === this._bufferService.cols && 32 !== n3.getCodePoint(this._bufferService.cols - 1)) {
              const t5 = r3.lines.get(e3[1] + 1);
              if (t5?.isWrapped && 32 !== t5.getCodePoint(0)) {
                const t6 = this._getWordAt([0, e3[1] + 1], false, false, true);
                t6 && (v3 += t6.length);
              }
            }
            return { start: f3, length: v3 };
          }
        }
        _selectWordAt(e3, t4) {
          const i3 = this._getWordAt(e3, t4);
          if (i3) {
            for (; i3.start < 0; ) i3.start += this._bufferService.cols, e3[1]--;
            this._model.selectionStart = [i3.start, e3[1]], this._model.selectionStartLength = i3.length;
          }
        }
        _selectToWordAt(e3) {
          const t4 = this._getWordAt(e3, true);
          if (t4) {
            let i3 = e3[1];
            for (; t4.start < 0; ) t4.start += this._bufferService.cols, i3--;
            if (!this._model.areSelectionValuesReversed()) for (; t4.start + t4.length > this._bufferService.cols; ) t4.length -= this._bufferService.cols, i3++;
            this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t4.start : t4.start + t4.length, i3];
          }
        }
        _isCharWordSeparator(e3) {
          return 0 !== e3.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e3.getChars()) >= 0;
        }
        _selectLineAt(e3) {
          const t4 = this._bufferService.buffer.getWrappedRangeForLine(e3), i3 = { start: { x: 0, y: t4.first }, end: { x: this._bufferService.cols - 1, y: t4.last } };
          this._model.selectionStart = [0, t4.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, _.getRangeLength)(i3, this._bufferService.cols);
        }
      };
      t3.SelectionService = g = s2([r2(3, f2.IBufferService), r2(4, f2.ICoreService), r2(5, h.IMouseService), r2(6, f2.IOptionsService), r2(7, h.IRenderService), r2(8, h.ICoreBrowserService)], g);
    }, 4725: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ILinkProviderService = t3.IThemeService = t3.ICharacterJoinerService = t3.ISelectionService = t3.IRenderService = t3.IMouseService = t3.ICoreBrowserService = t3.ICharSizeService = void 0;
      const s2 = i2(8343);
      t3.ICharSizeService = (0, s2.createDecorator)("CharSizeService"), t3.ICoreBrowserService = (0, s2.createDecorator)("CoreBrowserService"), t3.IMouseService = (0, s2.createDecorator)("MouseService"), t3.IRenderService = (0, s2.createDecorator)("RenderService"), t3.ISelectionService = (0, s2.createDecorator)("SelectionService"), t3.ICharacterJoinerService = (0, s2.createDecorator)("CharacterJoinerService"), t3.IThemeService = (0, s2.createDecorator)("ThemeService"), t3.ILinkProviderService = (0, s2.createDecorator)("LinkProviderService");
    }, 6731: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ThemeService = t3.DEFAULT_ANSI_COLORS = void 0;
      const n2 = i2(7239), o = i2(8055), a2 = i2(8460), h = i2(844), c2 = i2(2585), l2 = o.css.toColor("#ffffff"), d = o.css.toColor("#000000"), _ = o.css.toColor("#ffffff"), u2 = o.css.toColor("#000000"), f2 = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
      t3.DEFAULT_ANSI_COLORS = Object.freeze((() => {
        const e3 = [o.css.toColor("#2e3436"), o.css.toColor("#cc0000"), o.css.toColor("#4e9a06"), o.css.toColor("#c4a000"), o.css.toColor("#3465a4"), o.css.toColor("#75507b"), o.css.toColor("#06989a"), o.css.toColor("#d3d7cf"), o.css.toColor("#555753"), o.css.toColor("#ef2929"), o.css.toColor("#8ae234"), o.css.toColor("#fce94f"), o.css.toColor("#729fcf"), o.css.toColor("#ad7fa8"), o.css.toColor("#34e2e2"), o.css.toColor("#eeeeec")], t4 = [0, 95, 135, 175, 215, 255];
        for (let i3 = 0; i3 < 216; i3++) {
          const s3 = t4[i3 / 36 % 6 | 0], r3 = t4[i3 / 6 % 6 | 0], n3 = t4[i3 % 6];
          e3.push({ css: o.channels.toCss(s3, r3, n3), rgba: o.channels.toRgba(s3, r3, n3) });
        }
        for (let t5 = 0; t5 < 24; t5++) {
          const i3 = 8 + 10 * t5;
          e3.push({ css: o.channels.toCss(i3, i3, i3), rgba: o.channels.toRgba(i3, i3, i3) });
        }
        return e3;
      })());
      let v2 = t3.ThemeService = class extends h.Disposable {
        get colors() {
          return this._colors;
        }
        constructor(e3) {
          super(), this._optionsService = e3, this._contrastCache = new n2.ColorContrastCache(), this._halfContrastCache = new n2.ColorContrastCache(), this._onChangeColors = this.register(new a2.EventEmitter()), this.onChangeColors = this._onChangeColors.event, this._colors = { foreground: l2, background: d, cursor: _, cursorAccent: u2, selectionForeground: void 0, selectionBackgroundTransparent: f2, selectionBackgroundOpaque: o.color.blend(d, f2), selectionInactiveBackgroundTransparent: f2, selectionInactiveBackgroundOpaque: o.color.blend(d, f2), ansi: t3.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this.register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
        }
        _setTheme(e3 = {}) {
          const i3 = this._colors;
          if (i3.foreground = p2(e3.foreground, l2), i3.background = p2(e3.background, d), i3.cursor = p2(e3.cursor, _), i3.cursorAccent = p2(e3.cursorAccent, u2), i3.selectionBackgroundTransparent = p2(e3.selectionBackground, f2), i3.selectionBackgroundOpaque = o.color.blend(i3.background, i3.selectionBackgroundTransparent), i3.selectionInactiveBackgroundTransparent = p2(e3.selectionInactiveBackground, i3.selectionBackgroundTransparent), i3.selectionInactiveBackgroundOpaque = o.color.blend(i3.background, i3.selectionInactiveBackgroundTransparent), i3.selectionForeground = e3.selectionForeground ? p2(e3.selectionForeground, o.NULL_COLOR) : void 0, i3.selectionForeground === o.NULL_COLOR && (i3.selectionForeground = void 0), o.color.isOpaque(i3.selectionBackgroundTransparent)) {
            const e4 = 0.3;
            i3.selectionBackgroundTransparent = o.color.opacity(i3.selectionBackgroundTransparent, e4);
          }
          if (o.color.isOpaque(i3.selectionInactiveBackgroundTransparent)) {
            const e4 = 0.3;
            i3.selectionInactiveBackgroundTransparent = o.color.opacity(i3.selectionInactiveBackgroundTransparent, e4);
          }
          if (i3.ansi = t3.DEFAULT_ANSI_COLORS.slice(), i3.ansi[0] = p2(e3.black, t3.DEFAULT_ANSI_COLORS[0]), i3.ansi[1] = p2(e3.red, t3.DEFAULT_ANSI_COLORS[1]), i3.ansi[2] = p2(e3.green, t3.DEFAULT_ANSI_COLORS[2]), i3.ansi[3] = p2(e3.yellow, t3.DEFAULT_ANSI_COLORS[3]), i3.ansi[4] = p2(e3.blue, t3.DEFAULT_ANSI_COLORS[4]), i3.ansi[5] = p2(e3.magenta, t3.DEFAULT_ANSI_COLORS[5]), i3.ansi[6] = p2(e3.cyan, t3.DEFAULT_ANSI_COLORS[6]), i3.ansi[7] = p2(e3.white, t3.DEFAULT_ANSI_COLORS[7]), i3.ansi[8] = p2(e3.brightBlack, t3.DEFAULT_ANSI_COLORS[8]), i3.ansi[9] = p2(e3.brightRed, t3.DEFAULT_ANSI_COLORS[9]), i3.ansi[10] = p2(e3.brightGreen, t3.DEFAULT_ANSI_COLORS[10]), i3.ansi[11] = p2(e3.brightYellow, t3.DEFAULT_ANSI_COLORS[11]), i3.ansi[12] = p2(e3.brightBlue, t3.DEFAULT_ANSI_COLORS[12]), i3.ansi[13] = p2(e3.brightMagenta, t3.DEFAULT_ANSI_COLORS[13]), i3.ansi[14] = p2(e3.brightCyan, t3.DEFAULT_ANSI_COLORS[14]), i3.ansi[15] = p2(e3.brightWhite, t3.DEFAULT_ANSI_COLORS[15]), e3.extendedAnsi) {
            const s3 = Math.min(i3.ansi.length - 16, e3.extendedAnsi.length);
            for (let r3 = 0; r3 < s3; r3++) i3.ansi[r3 + 16] = p2(e3.extendedAnsi[r3], t3.DEFAULT_ANSI_COLORS[r3 + 16]);
          }
          this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
        }
        restoreColor(e3) {
          this._restoreColor(e3), this._onChangeColors.fire(this.colors);
        }
        _restoreColor(e3) {
          if (void 0 !== e3) switch (e3) {
            case 256:
              this._colors.foreground = this._restoreColors.foreground;
              break;
            case 257:
              this._colors.background = this._restoreColors.background;
              break;
            case 258:
              this._colors.cursor = this._restoreColors.cursor;
              break;
            default:
              this._colors.ansi[e3] = this._restoreColors.ansi[e3];
          }
          else for (let e4 = 0; e4 < this._restoreColors.ansi.length; ++e4) this._colors.ansi[e4] = this._restoreColors.ansi[e4];
        }
        modifyColors(e3) {
          e3(this._colors), this._onChangeColors.fire(this.colors);
        }
        _updateRestoreColors() {
          this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
        }
      };
      function p2(e3, t4) {
        if (void 0 !== e3) try {
          return o.css.toColor(e3);
        } catch {
        }
        return t4;
      }
      t3.ThemeService = v2 = s2([r2(0, c2.IOptionsService)], v2);
    }, 6349: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CircularList = void 0;
      const s2 = i2(8460), r2 = i2(844);
      class n2 extends r2.Disposable {
        constructor(e3) {
          super(), this._maxLength = e3, this.onDeleteEmitter = this.register(new s2.EventEmitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new s2.EventEmitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new s2.EventEmitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
        }
        get maxLength() {
          return this._maxLength;
        }
        set maxLength(e3) {
          if (this._maxLength === e3) return;
          const t4 = new Array(e3);
          for (let i3 = 0; i3 < Math.min(e3, this.length); i3++) t4[i3] = this._array[this._getCyclicIndex(i3)];
          this._array = t4, this._maxLength = e3, this._startIndex = 0;
        }
        get length() {
          return this._length;
        }
        set length(e3) {
          if (e3 > this._length) for (let t4 = this._length; t4 < e3; t4++) this._array[t4] = void 0;
          this._length = e3;
        }
        get(e3) {
          return this._array[this._getCyclicIndex(e3)];
        }
        set(e3, t4) {
          this._array[this._getCyclicIndex(e3)] = t4;
        }
        push(e3) {
          this._array[this._getCyclicIndex(this._length)] = e3, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
        }
        recycle() {
          if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
          return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
        }
        get isFull() {
          return this._length === this._maxLength;
        }
        pop() {
          return this._array[this._getCyclicIndex(this._length-- - 1)];
        }
        splice(e3, t4, ...i3) {
          if (t4) {
            for (let i4 = e3; i4 < this._length - t4; i4++) this._array[this._getCyclicIndex(i4)] = this._array[this._getCyclicIndex(i4 + t4)];
            this._length -= t4, this.onDeleteEmitter.fire({ index: e3, amount: t4 });
          }
          for (let t5 = this._length - 1; t5 >= e3; t5--) this._array[this._getCyclicIndex(t5 + i3.length)] = this._array[this._getCyclicIndex(t5)];
          for (let t5 = 0; t5 < i3.length; t5++) this._array[this._getCyclicIndex(e3 + t5)] = i3[t5];
          if (i3.length && this.onInsertEmitter.fire({ index: e3, amount: i3.length }), this._length + i3.length > this._maxLength) {
            const e4 = this._length + i3.length - this._maxLength;
            this._startIndex += e4, this._length = this._maxLength, this.onTrimEmitter.fire(e4);
          } else this._length += i3.length;
        }
        trimStart(e3) {
          e3 > this._length && (e3 = this._length), this._startIndex += e3, this._length -= e3, this.onTrimEmitter.fire(e3);
        }
        shiftElements(e3, t4, i3) {
          if (!(t4 <= 0)) {
            if (e3 < 0 || e3 >= this._length) throw new Error("start argument out of range");
            if (e3 + i3 < 0) throw new Error("Cannot shift elements in list beyond index 0");
            if (i3 > 0) {
              for (let s4 = t4 - 1; s4 >= 0; s4--) this.set(e3 + s4 + i3, this.get(e3 + s4));
              const s3 = e3 + t4 + i3 - this._length;
              if (s3 > 0) for (this._length += s3; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
            } else for (let s3 = 0; s3 < t4; s3++) this.set(e3 + s3 + i3, this.get(e3 + s3));
          }
        }
        _getCyclicIndex(e3) {
          return (this._startIndex + e3) % this._maxLength;
        }
      }
      t3.CircularList = n2;
    }, 1439: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.clone = void 0, t3.clone = function e3(t4, i2 = 5) {
        if ("object" != typeof t4) return t4;
        const s2 = Array.isArray(t4) ? [] : {};
        for (const r2 in t4) s2[r2] = i2 <= 1 ? t4[r2] : t4[r2] && e3(t4[r2], i2 - 1);
        return s2;
      };
    }, 8055: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.contrastRatio = t3.toPaddedHex = t3.rgba = t3.rgb = t3.css = t3.color = t3.channels = t3.NULL_COLOR = void 0;
      let i2 = 0, s2 = 0, r2 = 0, n2 = 0;
      var o, a2, h, c2, l2;
      function d(e3) {
        const t4 = e3.toString(16);
        return t4.length < 2 ? "0" + t4 : t4;
      }
      function _(e3, t4) {
        return e3 < t4 ? (t4 + 0.05) / (e3 + 0.05) : (e3 + 0.05) / (t4 + 0.05);
      }
      t3.NULL_COLOR = { css: "#00000000", rgba: 0 }, function(e3) {
        e3.toCss = function(e4, t4, i3, s3) {
          return void 0 !== s3 ? `#${d(e4)}${d(t4)}${d(i3)}${d(s3)}` : `#${d(e4)}${d(t4)}${d(i3)}`;
        }, e3.toRgba = function(e4, t4, i3, s3 = 255) {
          return (e4 << 24 | t4 << 16 | i3 << 8 | s3) >>> 0;
        }, e3.toColor = function(t4, i3, s3, r3) {
          return { css: e3.toCss(t4, i3, s3, r3), rgba: e3.toRgba(t4, i3, s3, r3) };
        };
      }(o || (t3.channels = o = {})), function(e3) {
        function t4(e4, t5) {
          return n2 = Math.round(255 * t5), [i2, s2, r2] = l2.toChannels(e4.rgba), { css: o.toCss(i2, s2, r2, n2), rgba: o.toRgba(i2, s2, r2, n2) };
        }
        e3.blend = function(e4, t5) {
          if (n2 = (255 & t5.rgba) / 255, 1 === n2) return { css: t5.css, rgba: t5.rgba };
          const a3 = t5.rgba >> 24 & 255, h2 = t5.rgba >> 16 & 255, c3 = t5.rgba >> 8 & 255, l3 = e4.rgba >> 24 & 255, d2 = e4.rgba >> 16 & 255, _2 = e4.rgba >> 8 & 255;
          return i2 = l3 + Math.round((a3 - l3) * n2), s2 = d2 + Math.round((h2 - d2) * n2), r2 = _2 + Math.round((c3 - _2) * n2), { css: o.toCss(i2, s2, r2), rgba: o.toRgba(i2, s2, r2) };
        }, e3.isOpaque = function(e4) {
          return 255 == (255 & e4.rgba);
        }, e3.ensureContrastRatio = function(e4, t5, i3) {
          const s3 = l2.ensureContrastRatio(e4.rgba, t5.rgba, i3);
          if (s3) return o.toColor(s3 >> 24 & 255, s3 >> 16 & 255, s3 >> 8 & 255);
        }, e3.opaque = function(e4) {
          const t5 = (255 | e4.rgba) >>> 0;
          return [i2, s2, r2] = l2.toChannels(t5), { css: o.toCss(i2, s2, r2), rgba: t5 };
        }, e3.opacity = t4, e3.multiplyOpacity = function(e4, i3) {
          return n2 = 255 & e4.rgba, t4(e4, n2 * i3 / 255);
        }, e3.toColorRGB = function(e4) {
          return [e4.rgba >> 24 & 255, e4.rgba >> 16 & 255, e4.rgba >> 8 & 255];
        };
      }(a2 || (t3.color = a2 = {})), function(e3) {
        let t4, a3;
        try {
          const e4 = document.createElement("canvas");
          e4.width = 1, e4.height = 1;
          const i3 = e4.getContext("2d", { willReadFrequently: true });
          i3 && (t4 = i3, t4.globalCompositeOperation = "copy", a3 = t4.createLinearGradient(0, 0, 1, 1));
        } catch {
        }
        e3.toColor = function(e4) {
          if (e4.match(/#[\da-f]{3,8}/i)) switch (e4.length) {
            case 4:
              return i2 = parseInt(e4.slice(1, 2).repeat(2), 16), s2 = parseInt(e4.slice(2, 3).repeat(2), 16), r2 = parseInt(e4.slice(3, 4).repeat(2), 16), o.toColor(i2, s2, r2);
            case 5:
              return i2 = parseInt(e4.slice(1, 2).repeat(2), 16), s2 = parseInt(e4.slice(2, 3).repeat(2), 16), r2 = parseInt(e4.slice(3, 4).repeat(2), 16), n2 = parseInt(e4.slice(4, 5).repeat(2), 16), o.toColor(i2, s2, r2, n2);
            case 7:
              return { css: e4, rgba: (parseInt(e4.slice(1), 16) << 8 | 255) >>> 0 };
            case 9:
              return { css: e4, rgba: parseInt(e4.slice(1), 16) >>> 0 };
          }
          const h2 = e4.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
          if (h2) return i2 = parseInt(h2[1]), s2 = parseInt(h2[2]), r2 = parseInt(h2[3]), n2 = Math.round(255 * (void 0 === h2[5] ? 1 : parseFloat(h2[5]))), o.toColor(i2, s2, r2, n2);
          if (!t4 || !a3) throw new Error("css.toColor: Unsupported css format");
          if (t4.fillStyle = a3, t4.fillStyle = e4, "string" != typeof t4.fillStyle) throw new Error("css.toColor: Unsupported css format");
          if (t4.fillRect(0, 0, 1, 1), [i2, s2, r2, n2] = t4.getImageData(0, 0, 1, 1).data, 255 !== n2) throw new Error("css.toColor: Unsupported css format");
          return { rgba: o.toRgba(i2, s2, r2, n2), css: e4 };
        };
      }(h || (t3.css = h = {})), function(e3) {
        function t4(e4, t5, i3) {
          const s3 = e4 / 255, r3 = t5 / 255, n3 = i3 / 255;
          return 0.2126 * (s3 <= 0.03928 ? s3 / 12.92 : Math.pow((s3 + 0.055) / 1.055, 2.4)) + 0.7152 * (r3 <= 0.03928 ? r3 / 12.92 : Math.pow((r3 + 0.055) / 1.055, 2.4)) + 0.0722 * (n3 <= 0.03928 ? n3 / 12.92 : Math.pow((n3 + 0.055) / 1.055, 2.4));
        }
        e3.relativeLuminance = function(e4) {
          return t4(e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4);
        }, e3.relativeLuminance2 = t4;
      }(c2 || (t3.rgb = c2 = {})), function(e3) {
        function t4(e4, t5, i3) {
          const s3 = e4 >> 24 & 255, r3 = e4 >> 16 & 255, n3 = e4 >> 8 & 255;
          let o2 = t5 >> 24 & 255, a4 = t5 >> 16 & 255, h2 = t5 >> 8 & 255, l3 = _(c2.relativeLuminance2(o2, a4, h2), c2.relativeLuminance2(s3, r3, n3));
          for (; l3 < i3 && (o2 > 0 || a4 > 0 || h2 > 0); ) o2 -= Math.max(0, Math.ceil(0.1 * o2)), a4 -= Math.max(0, Math.ceil(0.1 * a4)), h2 -= Math.max(0, Math.ceil(0.1 * h2)), l3 = _(c2.relativeLuminance2(o2, a4, h2), c2.relativeLuminance2(s3, r3, n3));
          return (o2 << 24 | a4 << 16 | h2 << 8 | 255) >>> 0;
        }
        function a3(e4, t5, i3) {
          const s3 = e4 >> 24 & 255, r3 = e4 >> 16 & 255, n3 = e4 >> 8 & 255;
          let o2 = t5 >> 24 & 255, a4 = t5 >> 16 & 255, h2 = t5 >> 8 & 255, l3 = _(c2.relativeLuminance2(o2, a4, h2), c2.relativeLuminance2(s3, r3, n3));
          for (; l3 < i3 && (o2 < 255 || a4 < 255 || h2 < 255); ) o2 = Math.min(255, o2 + Math.ceil(0.1 * (255 - o2))), a4 = Math.min(255, a4 + Math.ceil(0.1 * (255 - a4))), h2 = Math.min(255, h2 + Math.ceil(0.1 * (255 - h2))), l3 = _(c2.relativeLuminance2(o2, a4, h2), c2.relativeLuminance2(s3, r3, n3));
          return (o2 << 24 | a4 << 16 | h2 << 8 | 255) >>> 0;
        }
        e3.blend = function(e4, t5) {
          if (n2 = (255 & t5) / 255, 1 === n2) return t5;
          const a4 = t5 >> 24 & 255, h2 = t5 >> 16 & 255, c3 = t5 >> 8 & 255, l3 = e4 >> 24 & 255, d2 = e4 >> 16 & 255, _2 = e4 >> 8 & 255;
          return i2 = l3 + Math.round((a4 - l3) * n2), s2 = d2 + Math.round((h2 - d2) * n2), r2 = _2 + Math.round((c3 - _2) * n2), o.toRgba(i2, s2, r2);
        }, e3.ensureContrastRatio = function(e4, i3, s3) {
          const r3 = c2.relativeLuminance(e4 >> 8), n3 = c2.relativeLuminance(i3 >> 8);
          if (_(r3, n3) < s3) {
            if (n3 < r3) {
              const n4 = t4(e4, i3, s3), o3 = _(r3, c2.relativeLuminance(n4 >> 8));
              if (o3 < s3) {
                const t5 = a3(e4, i3, s3);
                return o3 > _(r3, c2.relativeLuminance(t5 >> 8)) ? n4 : t5;
              }
              return n4;
            }
            const o2 = a3(e4, i3, s3), h2 = _(r3, c2.relativeLuminance(o2 >> 8));
            if (h2 < s3) {
              const n4 = t4(e4, i3, s3);
              return h2 > _(r3, c2.relativeLuminance(n4 >> 8)) ? o2 : n4;
            }
            return o2;
          }
        }, e3.reduceLuminance = t4, e3.increaseLuminance = a3, e3.toChannels = function(e4) {
          return [e4 >> 24 & 255, e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4];
        };
      }(l2 || (t3.rgba = l2 = {})), t3.toPaddedHex = d, t3.contrastRatio = _;
    }, 8969: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CoreTerminal = void 0;
      const s2 = i2(844), r2 = i2(2585), n2 = i2(4348), o = i2(7866), a2 = i2(744), h = i2(7302), c2 = i2(6975), l2 = i2(8460), d = i2(1753), _ = i2(1480), u2 = i2(7994), f2 = i2(9282), v2 = i2(5435), p2 = i2(5981), g = i2(2660);
      let m2 = false;
      class S2 extends s2.Disposable {
        get onScroll() {
          return this._onScrollApi || (this._onScrollApi = this.register(new l2.EventEmitter()), this._onScroll.event((e3) => {
            this._onScrollApi?.fire(e3.position);
          })), this._onScrollApi.event;
        }
        get cols() {
          return this._bufferService.cols;
        }
        get rows() {
          return this._bufferService.rows;
        }
        get buffers() {
          return this._bufferService.buffers;
        }
        get options() {
          return this.optionsService.options;
        }
        set options(e3) {
          for (const t4 in e3) this.optionsService.options[t4] = e3[t4];
        }
        constructor(e3) {
          super(), this._windowsWrappingHeuristics = this.register(new s2.MutableDisposable()), this._onBinary = this.register(new l2.EventEmitter()), this.onBinary = this._onBinary.event, this._onData = this.register(new l2.EventEmitter()), this.onData = this._onData.event, this._onLineFeed = this.register(new l2.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new l2.EventEmitter()), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new l2.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new l2.EventEmitter()), this._instantiationService = new n2.InstantiationService(), this.optionsService = this.register(new h.OptionsService(e3)), this._instantiationService.setService(r2.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a2.BufferService)), this._instantiationService.setService(r2.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(o.LogService)), this._instantiationService.setService(r2.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c2.CoreService)), this._instantiationService.setService(r2.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(d.CoreMouseService)), this._instantiationService.setService(r2.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(_.UnicodeService)), this._instantiationService.setService(r2.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(u2.CharsetService), this._instantiationService.setService(r2.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(g.OscLinkService), this._instantiationService.setService(r2.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new v2.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, l2.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l2.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l2.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l2.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom())), this.register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this.register(this._bufferService.onScroll((e4) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this.register(this._inputHandler.onScroll((e4) => {
            this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
          })), this._writeBuffer = this.register(new p2.WriteBuffer((e4, t4) => this._inputHandler.parse(e4, t4))), this.register((0, l2.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
        }
        write(e3, t4) {
          this._writeBuffer.write(e3, t4);
        }
        writeSync(e3, t4) {
          this._logService.logLevel <= r2.LogLevelEnum.WARN && !m2 && (this._logService.warn("writeSync is unreliable and will be removed soon."), m2 = true), this._writeBuffer.writeSync(e3, t4);
        }
        input(e3, t4 = true) {
          this.coreService.triggerDataEvent(e3, t4);
        }
        resize(e3, t4) {
          isNaN(e3) || isNaN(t4) || (e3 = Math.max(e3, a2.MINIMUM_COLS), t4 = Math.max(t4, a2.MINIMUM_ROWS), this._bufferService.resize(e3, t4));
        }
        scroll(e3, t4 = false) {
          this._bufferService.scroll(e3, t4);
        }
        scrollLines(e3, t4, i3) {
          this._bufferService.scrollLines(e3, t4, i3);
        }
        scrollPages(e3) {
          this.scrollLines(e3 * (this.rows - 1));
        }
        scrollToTop() {
          this.scrollLines(-this._bufferService.buffer.ydisp);
        }
        scrollToBottom() {
          this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
        }
        scrollToLine(e3) {
          const t4 = e3 - this._bufferService.buffer.ydisp;
          0 !== t4 && this.scrollLines(t4);
        }
        registerEscHandler(e3, t4) {
          return this._inputHandler.registerEscHandler(e3, t4);
        }
        registerDcsHandler(e3, t4) {
          return this._inputHandler.registerDcsHandler(e3, t4);
        }
        registerCsiHandler(e3, t4) {
          return this._inputHandler.registerCsiHandler(e3, t4);
        }
        registerOscHandler(e3, t4) {
          return this._inputHandler.registerOscHandler(e3, t4);
        }
        _setup() {
          this._handleWindowsPtyOptionChange();
        }
        reset() {
          this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
        }
        _handleWindowsPtyOptionChange() {
          let e3 = false;
          const t4 = this.optionsService.rawOptions.windowsPty;
          t4 && void 0 !== t4.buildNumber && void 0 !== t4.buildNumber ? e3 = !!("conpty" === t4.backend && t4.buildNumber < 21376) : this.optionsService.rawOptions.windowsMode && (e3 = true), e3 ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
        }
        _enableWindowsWrappingHeuristics() {
          if (!this._windowsWrappingHeuristics.value) {
            const e3 = [];
            e3.push(this.onLineFeed(f2.updateWindowsModeWrappedState.bind(null, this._bufferService))), e3.push(this.registerCsiHandler({ final: "H" }, () => ((0, f2.updateWindowsModeWrappedState)(this._bufferService), false))), this._windowsWrappingHeuristics.value = (0, s2.toDisposable)(() => {
              for (const t4 of e3) t4.dispose();
            });
          }
        }
      }
      t3.CoreTerminal = S2;
    }, 8460: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.runAndSubscribe = t3.forwardEvent = t3.EventEmitter = void 0, t3.EventEmitter = class {
        constructor() {
          this._listeners = [], this._disposed = false;
        }
        get event() {
          return this._event || (this._event = (e3) => (this._listeners.push(e3), { dispose: () => {
            if (!this._disposed) {
              for (let t4 = 0; t4 < this._listeners.length; t4++) if (this._listeners[t4] === e3) return void this._listeners.splice(t4, 1);
            }
          } })), this._event;
        }
        fire(e3, t4) {
          const i2 = [];
          for (let e4 = 0; e4 < this._listeners.length; e4++) i2.push(this._listeners[e4]);
          for (let s2 = 0; s2 < i2.length; s2++) i2[s2].call(void 0, e3, t4);
        }
        dispose() {
          this.clearListeners(), this._disposed = true;
        }
        clearListeners() {
          this._listeners && (this._listeners.length = 0);
        }
      }, t3.forwardEvent = function(e3, t4) {
        return e3((e4) => t4.fire(e4));
      }, t3.runAndSubscribe = function(e3, t4) {
        return t4(void 0), e3((e4) => t4(e4));
      };
    }, 5435: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.InputHandler = t3.WindowsOptionsReportType = void 0;
      const n2 = i2(2584), o = i2(7116), a2 = i2(2015), h = i2(844), c2 = i2(482), l2 = i2(8437), d = i2(8460), _ = i2(643), u2 = i2(511), f2 = i2(3734), v2 = i2(2585), p2 = i2(1480), g = i2(6242), m2 = i2(6351), S2 = i2(5941), C2 = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, b = 131072;
      function w2(e3, t4) {
        if (e3 > 24) return t4.setWinLines || false;
        switch (e3) {
          case 1:
            return !!t4.restoreWin;
          case 2:
            return !!t4.minimizeWin;
          case 3:
            return !!t4.setWinPosition;
          case 4:
            return !!t4.setWinSizePixels;
          case 5:
            return !!t4.raiseWin;
          case 6:
            return !!t4.lowerWin;
          case 7:
            return !!t4.refreshWin;
          case 8:
            return !!t4.setWinSizeChars;
          case 9:
            return !!t4.maximizeWin;
          case 10:
            return !!t4.fullscreenWin;
          case 11:
            return !!t4.getWinState;
          case 13:
            return !!t4.getWinPosition;
          case 14:
            return !!t4.getWinSizePixels;
          case 15:
            return !!t4.getScreenSizePixels;
          case 16:
            return !!t4.getCellSizePixels;
          case 18:
            return !!t4.getWinSizeChars;
          case 19:
            return !!t4.getScreenSizeChars;
          case 20:
            return !!t4.getIconTitle;
          case 21:
            return !!t4.getWinTitle;
          case 22:
            return !!t4.pushTitle;
          case 23:
            return !!t4.popTitle;
          case 24:
            return !!t4.setWinLines;
        }
        return false;
      }
      var y2;
      !function(e3) {
        e3[e3.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e3[e3.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
      }(y2 || (t3.WindowsOptionsReportType = y2 = {}));
      let E2 = 0;
      class k2 extends h.Disposable {
        getAttrData() {
          return this._curAttrData;
        }
        constructor(e3, t4, i3, s3, r3, h2, _2, f3, v3 = new a2.EscapeSequenceParser()) {
          super(), this._bufferService = e3, this._charsetService = t4, this._coreService = i3, this._logService = s3, this._optionsService = r3, this._oscLinkService = h2, this._coreMouseService = _2, this._unicodeService = f3, this._parser = v3, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new c2.StringToUtf32(), this._utf8Decoder = new c2.Utf8ToUtf32(), this._workCell = new u2.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = l2.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l2.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new d.EventEmitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new d.EventEmitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new d.EventEmitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new d.EventEmitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new d.EventEmitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new d.EventEmitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new d.EventEmitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new d.EventEmitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new d.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new d.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new d.EventEmitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new d.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new d.EventEmitter()), this.onColor = this._onColor.event, this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this.register(this._parser), this._dirtyRowTracker = new L2(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._parser.setCsiHandlerFallback((e4, t5) => {
            this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(e4), params: t5.toArray() });
          }), this._parser.setEscHandlerFallback((e4) => {
            this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e4) });
          }), this._parser.setExecuteHandlerFallback((e4) => {
            this._logService.debug("Unknown EXECUTE code: ", { code: e4 });
          }), this._parser.setOscHandlerFallback((e4, t5, i4) => {
            this._logService.debug("Unknown OSC code: ", { identifier: e4, action: t5, data: i4 });
          }), this._parser.setDcsHandlerFallback((e4, t5, i4) => {
            "HOOK" === t5 && (i4 = i4.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(e4), action: t5, payload: i4 });
          }), this._parser.setPrintHandler((e4, t5, i4) => this.print(e4, t5, i4)), this._parser.registerCsiHandler({ final: "@" }, (e4) => this.insertChars(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (e4) => this.scrollLeft(e4)), this._parser.registerCsiHandler({ final: "A" }, (e4) => this.cursorUp(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (e4) => this.scrollRight(e4)), this._parser.registerCsiHandler({ final: "B" }, (e4) => this.cursorDown(e4)), this._parser.registerCsiHandler({ final: "C" }, (e4) => this.cursorForward(e4)), this._parser.registerCsiHandler({ final: "D" }, (e4) => this.cursorBackward(e4)), this._parser.registerCsiHandler({ final: "E" }, (e4) => this.cursorNextLine(e4)), this._parser.registerCsiHandler({ final: "F" }, (e4) => this.cursorPrecedingLine(e4)), this._parser.registerCsiHandler({ final: "G" }, (e4) => this.cursorCharAbsolute(e4)), this._parser.registerCsiHandler({ final: "H" }, (e4) => this.cursorPosition(e4)), this._parser.registerCsiHandler({ final: "I" }, (e4) => this.cursorForwardTab(e4)), this._parser.registerCsiHandler({ final: "J" }, (e4) => this.eraseInDisplay(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (e4) => this.eraseInDisplay(e4, true)), this._parser.registerCsiHandler({ final: "K" }, (e4) => this.eraseInLine(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (e4) => this.eraseInLine(e4, true)), this._parser.registerCsiHandler({ final: "L" }, (e4) => this.insertLines(e4)), this._parser.registerCsiHandler({ final: "M" }, (e4) => this.deleteLines(e4)), this._parser.registerCsiHandler({ final: "P" }, (e4) => this.deleteChars(e4)), this._parser.registerCsiHandler({ final: "S" }, (e4) => this.scrollUp(e4)), this._parser.registerCsiHandler({ final: "T" }, (e4) => this.scrollDown(e4)), this._parser.registerCsiHandler({ final: "X" }, (e4) => this.eraseChars(e4)), this._parser.registerCsiHandler({ final: "Z" }, (e4) => this.cursorBackwardTab(e4)), this._parser.registerCsiHandler({ final: "`" }, (e4) => this.charPosAbsolute(e4)), this._parser.registerCsiHandler({ final: "a" }, (e4) => this.hPositionRelative(e4)), this._parser.registerCsiHandler({ final: "b" }, (e4) => this.repeatPrecedingCharacter(e4)), this._parser.registerCsiHandler({ final: "c" }, (e4) => this.sendDeviceAttributesPrimary(e4)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (e4) => this.sendDeviceAttributesSecondary(e4)), this._parser.registerCsiHandler({ final: "d" }, (e4) => this.linePosAbsolute(e4)), this._parser.registerCsiHandler({ final: "e" }, (e4) => this.vPositionRelative(e4)), this._parser.registerCsiHandler({ final: "f" }, (e4) => this.hVPosition(e4)), this._parser.registerCsiHandler({ final: "g" }, (e4) => this.tabClear(e4)), this._parser.registerCsiHandler({ final: "h" }, (e4) => this.setMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (e4) => this.setModePrivate(e4)), this._parser.registerCsiHandler({ final: "l" }, (e4) => this.resetMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (e4) => this.resetModePrivate(e4)), this._parser.registerCsiHandler({ final: "m" }, (e4) => this.charAttributes(e4)), this._parser.registerCsiHandler({ final: "n" }, (e4) => this.deviceStatus(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (e4) => this.deviceStatusPrivate(e4)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (e4) => this.softReset(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (e4) => this.setCursorStyle(e4)), this._parser.registerCsiHandler({ final: "r" }, (e4) => this.setScrollRegion(e4)), this._parser.registerCsiHandler({ final: "s" }, (e4) => this.saveCursor(e4)), this._parser.registerCsiHandler({ final: "t" }, (e4) => this.windowOptions(e4)), this._parser.registerCsiHandler({ final: "u" }, (e4) => this.restoreCursor(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (e4) => this.insertColumns(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (e4) => this.deleteColumns(e4)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (e4) => this.selectProtected(e4)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, false)), this._parser.setExecuteHandler(n2.C0.BEL, () => this.bell()), this._parser.setExecuteHandler(n2.C0.LF, () => this.lineFeed()), this._parser.setExecuteHandler(n2.C0.VT, () => this.lineFeed()), this._parser.setExecuteHandler(n2.C0.FF, () => this.lineFeed()), this._parser.setExecuteHandler(n2.C0.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(n2.C0.BS, () => this.backspace()), this._parser.setExecuteHandler(n2.C0.HT, () => this.tab()), this._parser.setExecuteHandler(n2.C0.SO, () => this.shiftOut()), this._parser.setExecuteHandler(n2.C0.SI, () => this.shiftIn()), this._parser.setExecuteHandler(n2.C1.IND, () => this.index()), this._parser.setExecuteHandler(n2.C1.NEL, () => this.nextLine()), this._parser.setExecuteHandler(n2.C1.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new g.OscHandler((e4) => (this.setTitle(e4), this.setIconName(e4), true))), this._parser.registerOscHandler(1, new g.OscHandler((e4) => this.setIconName(e4))), this._parser.registerOscHandler(2, new g.OscHandler((e4) => this.setTitle(e4))), this._parser.registerOscHandler(4, new g.OscHandler((e4) => this.setOrReportIndexedColor(e4))), this._parser.registerOscHandler(8, new g.OscHandler((e4) => this.setHyperlink(e4))), this._parser.registerOscHandler(10, new g.OscHandler((e4) => this.setOrReportFgColor(e4))), this._parser.registerOscHandler(11, new g.OscHandler((e4) => this.setOrReportBgColor(e4))), this._parser.registerOscHandler(12, new g.OscHandler((e4) => this.setOrReportCursorColor(e4))), this._parser.registerOscHandler(104, new g.OscHandler((e4) => this.restoreIndexedColor(e4))), this._parser.registerOscHandler(110, new g.OscHandler((e4) => this.restoreFgColor(e4))), this._parser.registerOscHandler(111, new g.OscHandler((e4) => this.restoreBgColor(e4))), this._parser.registerOscHandler(112, new g.OscHandler((e4) => this.restoreCursorColor(e4))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
          for (const e4 in o.CHARSETS) this._parser.registerEscHandler({ intermediates: "(", final: e4 }, () => this.selectCharset("(" + e4)), this._parser.registerEscHandler({ intermediates: ")", final: e4 }, () => this.selectCharset(")" + e4)), this._parser.registerEscHandler({ intermediates: "*", final: e4 }, () => this.selectCharset("*" + e4)), this._parser.registerEscHandler({ intermediates: "+", final: e4 }, () => this.selectCharset("+" + e4)), this._parser.registerEscHandler({ intermediates: "-", final: e4 }, () => this.selectCharset("-" + e4)), this._parser.registerEscHandler({ intermediates: ".", final: e4 }, () => this.selectCharset("." + e4)), this._parser.registerEscHandler({ intermediates: "/", final: e4 }, () => this.selectCharset("/" + e4));
          this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((e4) => (this._logService.error("Parsing error: ", e4), e4)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new m2.DcsHandler((e4, t5) => this.requestStatusString(e4, t5)));
        }
        _preserveStack(e3, t4, i3, s3) {
          this._parseStack.paused = true, this._parseStack.cursorStartX = e3, this._parseStack.cursorStartY = t4, this._parseStack.decodedLength = i3, this._parseStack.position = s3;
        }
        _logSlowResolvingAsync(e3) {
          this._logService.logLevel <= v2.LogLevelEnum.WARN && Promise.race([e3, new Promise((e4, t4) => setTimeout(() => t4("#SLOW_TIMEOUT"), 5e3))]).catch((e4) => {
            if ("#SLOW_TIMEOUT" !== e4) throw e4;
            console.warn("async parser handler taking longer than 5000 ms");
          });
        }
        _getCurrentLinkId() {
          return this._curAttrData.extended.urlId;
        }
        parse(e3, t4) {
          let i3, s3 = this._activeBuffer.x, r3 = this._activeBuffer.y, n3 = 0;
          const o2 = this._parseStack.paused;
          if (o2) {
            if (i3 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t4)) return this._logSlowResolvingAsync(i3), i3;
            s3 = this._parseStack.cursorStartX, r3 = this._parseStack.cursorStartY, this._parseStack.paused = false, e3.length > b && (n3 = this._parseStack.position + b);
          }
          if (this._logService.logLevel <= v2.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + ("string" == typeof e3 ? ` "${e3}"` : ` "${Array.prototype.map.call(e3, (e4) => String.fromCharCode(e4)).join("")}"`), "string" == typeof e3 ? e3.split("").map((e4) => e4.charCodeAt(0)) : e3), this._parseBuffer.length < e3.length && this._parseBuffer.length < b && (this._parseBuffer = new Uint32Array(Math.min(e3.length, b))), o2 || this._dirtyRowTracker.clearRange(), e3.length > b) for (let t5 = n3; t5 < e3.length; t5 += b) {
            const n4 = t5 + b < e3.length ? t5 + b : e3.length, o3 = "string" == typeof e3 ? this._stringDecoder.decode(e3.substring(t5, n4), this._parseBuffer) : this._utf8Decoder.decode(e3.subarray(t5, n4), this._parseBuffer);
            if (i3 = this._parser.parse(this._parseBuffer, o3)) return this._preserveStack(s3, r3, o3, t5), this._logSlowResolvingAsync(i3), i3;
          }
          else if (!o2) {
            const t5 = "string" == typeof e3 ? this._stringDecoder.decode(e3, this._parseBuffer) : this._utf8Decoder.decode(e3, this._parseBuffer);
            if (i3 = this._parser.parse(this._parseBuffer, t5)) return this._preserveStack(s3, r3, t5, 0), this._logSlowResolvingAsync(i3), i3;
          }
          this._activeBuffer.x === s3 && this._activeBuffer.y === r3 || this._onCursorMove.fire();
          const a3 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
          h2 < this._bufferService.rows && this._onRequestRefreshRows.fire(Math.min(h2, this._bufferService.rows - 1), Math.min(a3, this._bufferService.rows - 1));
        }
        print(e3, t4, i3) {
          let s3, r3;
          const n3 = this._charsetService.charset, o2 = this._optionsService.rawOptions.screenReaderMode, a3 = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, d2 = this._coreService.modes.insertMode, u3 = this._curAttrData;
          let f3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && i3 - t4 > 0 && 2 === f3.getWidth(this._activeBuffer.x - 1) && f3.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, u3);
          let v3 = this._parser.precedingJoinState;
          for (let g2 = t4; g2 < i3; ++g2) {
            if (s3 = e3[g2], s3 < 127 && n3) {
              const e4 = n3[String.fromCharCode(s3)];
              e4 && (s3 = e4.charCodeAt(0));
            }
            const t5 = this._unicodeService.charProperties(s3, v3);
            r3 = p2.UnicodeService.extractWidth(t5);
            const i4 = p2.UnicodeService.extractShouldJoin(t5), m3 = i4 ? p2.UnicodeService.extractWidth(v3) : 0;
            if (v3 = t5, o2 && this._onA11yChar.fire((0, c2.stringFromCodePoint)(s3)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + r3 - m3 > a3) {
              if (h2) {
                const e4 = f3;
                let t6 = this._activeBuffer.x - m3;
                for (this._activeBuffer.x = m3, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), f3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), m3 > 0 && f3 instanceof l2.BufferLine && f3.copyCellsFrom(e4, t6, 0, m3, false); t6 < a3; ) e4.setCellFromCodepoint(t6++, 0, 1, u3);
              } else if (this._activeBuffer.x = a3 - 1, 2 === r3) continue;
            }
            if (i4 && this._activeBuffer.x) {
              const e4 = f3.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
              f3.addCodepointToCell(this._activeBuffer.x - e4, s3, r3);
              for (let e5 = r3 - m3; --e5 >= 0; ) f3.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u3);
            } else if (d2 && (f3.insertCells(this._activeBuffer.x, r3 - m3, this._activeBuffer.getNullCell(u3)), 2 === f3.getWidth(a3 - 1) && f3.setCellFromCodepoint(a3 - 1, _.NULL_CELL_CODE, _.NULL_CELL_WIDTH, u3)), f3.setCellFromCodepoint(this._activeBuffer.x++, s3, r3, u3), r3 > 0) for (; --r3; ) f3.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u3);
          }
          this._parser.precedingJoinState = v3, this._activeBuffer.x < a3 && i3 - t4 > 0 && 0 === f3.getWidth(this._activeBuffer.x) && !f3.hasContent(this._activeBuffer.x) && f3.setCellFromCodepoint(this._activeBuffer.x, 0, 1, u3), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        registerCsiHandler(e3, t4) {
          return "t" !== e3.final || e3.prefix || e3.intermediates ? this._parser.registerCsiHandler(e3, t4) : this._parser.registerCsiHandler(e3, (e4) => !w2(e4.params[0], this._optionsService.rawOptions.windowOptions) || t4(e4));
        }
        registerDcsHandler(e3, t4) {
          return this._parser.registerDcsHandler(e3, new m2.DcsHandler(t4));
        }
        registerEscHandler(e3, t4) {
          return this._parser.registerEscHandler(e3, t4);
        }
        registerOscHandler(e3, t4) {
          return this._parser.registerOscHandler(e3, new g.OscHandler(t4));
        }
        bell() {
          return this._onRequestBell.fire(), true;
        }
        lineFeed() {
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
        }
        carriageReturn() {
          return this._activeBuffer.x = 0, true;
        }
        backspace() {
          if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
          if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
          else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
            this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
            const e3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            e3.hasWidth(this._activeBuffer.x) && !e3.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
          }
          return this._restrictCursor(), true;
        }
        tab() {
          if (this._activeBuffer.x >= this._bufferService.cols) return true;
          const e3 = this._activeBuffer.x;
          return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e3), true;
        }
        shiftOut() {
          return this._charsetService.setgLevel(1), true;
        }
        shiftIn() {
          return this._charsetService.setgLevel(0), true;
        }
        _restrictCursor(e3 = this._bufferService.cols - 1) {
          this._activeBuffer.x = Math.min(e3, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _setCursor(e3, t4) {
          this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e3, this._activeBuffer.y = this._activeBuffer.scrollTop + t4) : (this._activeBuffer.x = e3, this._activeBuffer.y = t4), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
        }
        _moveCursor(e3, t4) {
          this._restrictCursor(), this._setCursor(this._activeBuffer.x + e3, this._activeBuffer.y + t4);
        }
        cursorUp(e3) {
          const t4 = this._activeBuffer.y - this._activeBuffer.scrollTop;
          return t4 >= 0 ? this._moveCursor(0, -Math.min(t4, e3.params[0] || 1)) : this._moveCursor(0, -(e3.params[0] || 1)), true;
        }
        cursorDown(e3) {
          const t4 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
          return t4 >= 0 ? this._moveCursor(0, Math.min(t4, e3.params[0] || 1)) : this._moveCursor(0, e3.params[0] || 1), true;
        }
        cursorForward(e3) {
          return this._moveCursor(e3.params[0] || 1, 0), true;
        }
        cursorBackward(e3) {
          return this._moveCursor(-(e3.params[0] || 1), 0), true;
        }
        cursorNextLine(e3) {
          return this.cursorDown(e3), this._activeBuffer.x = 0, true;
        }
        cursorPrecedingLine(e3) {
          return this.cursorUp(e3), this._activeBuffer.x = 0, true;
        }
        cursorCharAbsolute(e3) {
          return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
        }
        cursorPosition(e3) {
          return this._setCursor(e3.length >= 2 ? (e3.params[1] || 1) - 1 : 0, (e3.params[0] || 1) - 1), true;
        }
        charPosAbsolute(e3) {
          return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
        }
        hPositionRelative(e3) {
          return this._moveCursor(e3.params[0] || 1, 0), true;
        }
        linePosAbsolute(e3) {
          return this._setCursor(this._activeBuffer.x, (e3.params[0] || 1) - 1), true;
        }
        vPositionRelative(e3) {
          return this._moveCursor(0, e3.params[0] || 1), true;
        }
        hVPosition(e3) {
          return this.cursorPosition(e3), true;
        }
        tabClear(e3) {
          const t4 = e3.params[0];
          return 0 === t4 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t4 && (this._activeBuffer.tabs = {}), true;
        }
        cursorForwardTab(e3) {
          if (this._activeBuffer.x >= this._bufferService.cols) return true;
          let t4 = e3.params[0] || 1;
          for (; t4--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
          return true;
        }
        cursorBackwardTab(e3) {
          if (this._activeBuffer.x >= this._bufferService.cols) return true;
          let t4 = e3.params[0] || 1;
          for (; t4--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
          return true;
        }
        selectProtected(e3) {
          const t4 = e3.params[0];
          return 1 === t4 && (this._curAttrData.bg |= 536870912), 2 !== t4 && 0 !== t4 || (this._curAttrData.bg &= -536870913), true;
        }
        _eraseInBufferLine(e3, t4, i3, s3 = false, r3 = false) {
          const n3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
          n3.replaceCells(t4, i3, this._activeBuffer.getNullCell(this._eraseAttrData()), r3), s3 && (n3.isWrapped = false);
        }
        _resetBufferLine(e3, t4 = false) {
          const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
          i3 && (i3.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t4), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e3), i3.isWrapped = false);
        }
        eraseInDisplay(e3, t4 = false) {
          let i3;
          switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
            case 0:
              for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t4); i3 < this._bufferService.rows; i3++) this._resetBufferLine(i3, t4);
              this._dirtyRowTracker.markDirty(i3);
              break;
            case 1:
              for (i3 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(i3), this._eraseInBufferLine(i3, 0, this._activeBuffer.x + 1, true, t4), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i3 + 1).isWrapped = false); i3--; ) this._resetBufferLine(i3, t4);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 2:
              for (i3 = this._bufferService.rows, this._dirtyRowTracker.markDirty(i3 - 1); i3--; ) this._resetBufferLine(i3, t4);
              this._dirtyRowTracker.markDirty(0);
              break;
            case 3:
              const e4 = this._activeBuffer.lines.length - this._bufferService.rows;
              e4 > 0 && (this._activeBuffer.lines.trimStart(e4), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e4, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e4, 0), this._onScroll.fire(0));
          }
          return true;
        }
        eraseInLine(e3, t4 = false) {
          switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
            case 0:
              this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t4);
              break;
            case 1:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, t4);
              break;
            case 2:
              this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, t4);
          }
          return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
        }
        insertLines(e3) {
          this._restrictCursor();
          let t4 = e3.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const i3 = this._activeBuffer.ybase + this._activeBuffer.y, s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r3 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3 + 1;
          for (; t4--; ) this._activeBuffer.lines.splice(r3 - 1, 1), this._activeBuffer.lines.splice(i3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
        }
        deleteLines(e3) {
          this._restrictCursor();
          let t4 = e3.params[0] || 1;
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const i3 = this._activeBuffer.ybase + this._activeBuffer.y;
          let s3;
          for (s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s3 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3; t4--; ) this._activeBuffer.lines.splice(i3, 1), this._activeBuffer.lines.splice(s3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
        }
        insertChars(e3) {
          this._restrictCursor();
          const t4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t4 && (t4.insertCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        deleteChars(e3) {
          this._restrictCursor();
          const t4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t4 && (t4.deleteCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        scrollUp(e3) {
          let t4 = e3.params[0] || 1;
          for (; t4--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollDown(e3) {
          let t4 = e3.params[0] || 1;
          for (; t4--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(l2.DEFAULT_ATTR_DATA));
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollLeft(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const t4 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.deleteCells(0, t4, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        scrollRight(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const t4 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.insertCells(0, t4, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        insertColumns(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const t4 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.insertCells(this._activeBuffer.x, t4, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        deleteColumns(e3) {
          if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
          const t4 = e3.params[0] || 1;
          for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
            const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
            i3.deleteCells(this._activeBuffer.x, t4, this._activeBuffer.getNullCell(this._eraseAttrData())), i3.isWrapped = false;
          }
          return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
        }
        eraseChars(e3) {
          this._restrictCursor();
          const t4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
          return t4 && (t4.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e3.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
        }
        repeatPrecedingCharacter(e3) {
          const t4 = this._parser.precedingJoinState;
          if (!t4) return true;
          const i3 = e3.params[0] || 1, s3 = p2.UnicodeService.extractWidth(t4), r3 = this._activeBuffer.x - s3, n3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(r3), o2 = new Uint32Array(n3.length * i3);
          let a3 = 0;
          for (let e4 = 0; e4 < n3.length; ) {
            const t5 = n3.codePointAt(e4) || 0;
            o2[a3++] = t5, e4 += t5 > 65535 ? 2 : 1;
          }
          let h2 = a3;
          for (let e4 = 1; e4 < i3; ++e4) o2.copyWithin(h2, 0, a3), h2 += a3;
          return this.print(o2, 0, h2), true;
        }
        sendDeviceAttributesPrimary(e3) {
          return e3.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n2.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n2.C0.ESC + "[?6c")), true;
        }
        sendDeviceAttributesSecondary(e3) {
          return e3.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n2.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n2.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e3.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n2.C0.ESC + "[>83;40003;0c")), true;
        }
        _is(e3) {
          return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e3);
        }
        setMode(e3) {
          for (let t4 = 0; t4 < e3.length; t4++) switch (e3.params[t4]) {
            case 4:
              this._coreService.modes.insertMode = true;
              break;
            case 20:
              this._optionsService.options.convertEol = true;
          }
          return true;
        }
        setModePrivate(e3) {
          for (let t4 = 0; t4 < e3.length; t4++) switch (e3.params[t4]) {
            case 1:
              this._coreService.decPrivateModes.applicationCursorKeys = true;
              break;
            case 2:
              this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), this._charsetService.setgCharset(1, o.DEFAULT_CHARSET), this._charsetService.setgCharset(2, o.DEFAULT_CHARSET), this._charsetService.setgCharset(3, o.DEFAULT_CHARSET);
              break;
            case 3:
              this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
              break;
            case 6:
              this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
              break;
            case 7:
              this._coreService.decPrivateModes.wraparound = true;
              break;
            case 12:
              this._optionsService.options.cursorBlink = true;
              break;
            case 45:
              this._coreService.decPrivateModes.reverseWraparound = true;
              break;
            case 66:
              this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
              break;
            case 9:
              this._coreMouseService.activeProtocol = "X10";
              break;
            case 1e3:
              this._coreMouseService.activeProtocol = "VT200";
              break;
            case 1002:
              this._coreMouseService.activeProtocol = "DRAG";
              break;
            case 1003:
              this._coreMouseService.activeProtocol = "ANY";
              break;
            case 1004:
              this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
              break;
            case 1005:
              this._logService.debug("DECSET 1005 not supported (see #2507)");
              break;
            case 1006:
              this._coreMouseService.activeEncoding = "SGR";
              break;
            case 1015:
              this._logService.debug("DECSET 1015 not supported (see #2507)");
              break;
            case 1016:
              this._coreMouseService.activeEncoding = "SGR_PIXELS";
              break;
            case 25:
              this._coreService.isCursorHidden = false;
              break;
            case 1048:
              this.saveCursor();
              break;
            case 1049:
              this.saveCursor();
            case 47:
            case 1047:
              this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
              break;
            case 2004:
              this._coreService.decPrivateModes.bracketedPasteMode = true;
          }
          return true;
        }
        resetMode(e3) {
          for (let t4 = 0; t4 < e3.length; t4++) switch (e3.params[t4]) {
            case 4:
              this._coreService.modes.insertMode = false;
              break;
            case 20:
              this._optionsService.options.convertEol = false;
          }
          return true;
        }
        resetModePrivate(e3) {
          for (let t4 = 0; t4 < e3.length; t4++) switch (e3.params[t4]) {
            case 1:
              this._coreService.decPrivateModes.applicationCursorKeys = false;
              break;
            case 3:
              this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
              break;
            case 6:
              this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
              break;
            case 7:
              this._coreService.decPrivateModes.wraparound = false;
              break;
            case 12:
              this._optionsService.options.cursorBlink = false;
              break;
            case 45:
              this._coreService.decPrivateModes.reverseWraparound = false;
              break;
            case 66:
              this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
              break;
            case 9:
            case 1e3:
            case 1002:
            case 1003:
              this._coreMouseService.activeProtocol = "NONE";
              break;
            case 1004:
              this._coreService.decPrivateModes.sendFocus = false;
              break;
            case 1005:
              this._logService.debug("DECRST 1005 not supported (see #2507)");
              break;
            case 1006:
            case 1016:
              this._coreMouseService.activeEncoding = "DEFAULT";
              break;
            case 1015:
              this._logService.debug("DECRST 1015 not supported (see #2507)");
              break;
            case 25:
              this._coreService.isCursorHidden = true;
              break;
            case 1048:
              this.restoreCursor();
              break;
            case 1049:
            case 47:
            case 1047:
              this._bufferService.buffers.activateNormalBuffer(), 1049 === e3.params[t4] && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
              break;
            case 2004:
              this._coreService.decPrivateModes.bracketedPasteMode = false;
          }
          return true;
        }
        requestMode(e3, t4) {
          const i3 = this._coreService.decPrivateModes, { activeProtocol: s3, activeEncoding: r3 } = this._coreMouseService, o2 = this._coreService, { buffers: a3, cols: h2 } = this._bufferService, { active: c3, alt: l3 } = a3, d2 = this._optionsService.rawOptions, _2 = (e4) => e4 ? 1 : 2, u3 = e3.params[0];
          return f3 = u3, v3 = t4 ? 2 === u3 ? 4 : 4 === u3 ? _2(o2.modes.insertMode) : 12 === u3 ? 3 : 20 === u3 ? _2(d2.convertEol) : 0 : 1 === u3 ? _2(i3.applicationCursorKeys) : 3 === u3 ? d2.windowOptions.setWinLines ? 80 === h2 ? 2 : 132 === h2 ? 1 : 0 : 0 : 6 === u3 ? _2(i3.origin) : 7 === u3 ? _2(i3.wraparound) : 8 === u3 ? 3 : 9 === u3 ? _2("X10" === s3) : 12 === u3 ? _2(d2.cursorBlink) : 25 === u3 ? _2(!o2.isCursorHidden) : 45 === u3 ? _2(i3.reverseWraparound) : 66 === u3 ? _2(i3.applicationKeypad) : 67 === u3 ? 4 : 1e3 === u3 ? _2("VT200" === s3) : 1002 === u3 ? _2("DRAG" === s3) : 1003 === u3 ? _2("ANY" === s3) : 1004 === u3 ? _2(i3.sendFocus) : 1005 === u3 ? 4 : 1006 === u3 ? _2("SGR" === r3) : 1015 === u3 ? 4 : 1016 === u3 ? _2("SGR_PIXELS" === r3) : 1048 === u3 ? 1 : 47 === u3 || 1047 === u3 || 1049 === u3 ? _2(c3 === l3) : 2004 === u3 ? _2(i3.bracketedPasteMode) : 0, o2.triggerDataEvent(`${n2.C0.ESC}[${t4 ? "" : "?"}${f3};${v3}$y`), true;
          var f3, v3;
        }
        _updateAttrColor(e3, t4, i3, s3, r3) {
          return 2 === t4 ? (e3 |= 50331648, e3 &= -16777216, e3 |= f2.AttributeData.fromColorRGB([i3, s3, r3])) : 5 === t4 && (e3 &= -50331904, e3 |= 33554432 | 255 & i3), e3;
        }
        _extractColor(e3, t4, i3) {
          const s3 = [0, 0, -1, 0, 0, 0];
          let r3 = 0, n3 = 0;
          do {
            if (s3[n3 + r3] = e3.params[t4 + n3], e3.hasSubParams(t4 + n3)) {
              const i4 = e3.getSubParams(t4 + n3);
              let o2 = 0;
              do {
                5 === s3[1] && (r3 = 1), s3[n3 + o2 + 1 + r3] = i4[o2];
              } while (++o2 < i4.length && o2 + n3 + 1 + r3 < s3.length);
              break;
            }
            if (5 === s3[1] && n3 + r3 >= 2 || 2 === s3[1] && n3 + r3 >= 5) break;
            s3[1] && (r3 = 1);
          } while (++n3 + t4 < e3.length && n3 + r3 < s3.length);
          for (let e4 = 2; e4 < s3.length; ++e4) -1 === s3[e4] && (s3[e4] = 0);
          switch (s3[0]) {
            case 38:
              i3.fg = this._updateAttrColor(i3.fg, s3[1], s3[3], s3[4], s3[5]);
              break;
            case 48:
              i3.bg = this._updateAttrColor(i3.bg, s3[1], s3[3], s3[4], s3[5]);
              break;
            case 58:
              i3.extended = i3.extended.clone(), i3.extended.underlineColor = this._updateAttrColor(i3.extended.underlineColor, s3[1], s3[3], s3[4], s3[5]);
          }
          return n3;
        }
        _processUnderline(e3, t4) {
          t4.extended = t4.extended.clone(), (!~e3 || e3 > 5) && (e3 = 1), t4.extended.underlineStyle = e3, t4.fg |= 268435456, 0 === e3 && (t4.fg &= -268435457), t4.updateExtended();
        }
        _processSGR0(e3) {
          e3.fg = l2.DEFAULT_ATTR_DATA.fg, e3.bg = l2.DEFAULT_ATTR_DATA.bg, e3.extended = e3.extended.clone(), e3.extended.underlineStyle = 0, e3.extended.underlineColor &= -67108864, e3.updateExtended();
        }
        charAttributes(e3) {
          if (1 === e3.length && 0 === e3.params[0]) return this._processSGR0(this._curAttrData), true;
          const t4 = e3.length;
          let i3;
          const s3 = this._curAttrData;
          for (let r3 = 0; r3 < t4; r3++) i3 = e3.params[r3], i3 >= 30 && i3 <= 37 ? (s3.fg &= -50331904, s3.fg |= 16777216 | i3 - 30) : i3 >= 40 && i3 <= 47 ? (s3.bg &= -50331904, s3.bg |= 16777216 | i3 - 40) : i3 >= 90 && i3 <= 97 ? (s3.fg &= -50331904, s3.fg |= 16777224 | i3 - 90) : i3 >= 100 && i3 <= 107 ? (s3.bg &= -50331904, s3.bg |= 16777224 | i3 - 100) : 0 === i3 ? this._processSGR0(s3) : 1 === i3 ? s3.fg |= 134217728 : 3 === i3 ? s3.bg |= 67108864 : 4 === i3 ? (s3.fg |= 268435456, this._processUnderline(e3.hasSubParams(r3) ? e3.getSubParams(r3)[0] : 1, s3)) : 5 === i3 ? s3.fg |= 536870912 : 7 === i3 ? s3.fg |= 67108864 : 8 === i3 ? s3.fg |= 1073741824 : 9 === i3 ? s3.fg |= 2147483648 : 2 === i3 ? s3.bg |= 134217728 : 21 === i3 ? this._processUnderline(2, s3) : 22 === i3 ? (s3.fg &= -134217729, s3.bg &= -134217729) : 23 === i3 ? s3.bg &= -67108865 : 24 === i3 ? (s3.fg &= -268435457, this._processUnderline(0, s3)) : 25 === i3 ? s3.fg &= -536870913 : 27 === i3 ? s3.fg &= -67108865 : 28 === i3 ? s3.fg &= -1073741825 : 29 === i3 ? s3.fg &= 2147483647 : 39 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & l2.DEFAULT_ATTR_DATA.fg) : 49 === i3 ? (s3.bg &= -67108864, s3.bg |= 16777215 & l2.DEFAULT_ATTR_DATA.bg) : 38 === i3 || 48 === i3 || 58 === i3 ? r3 += this._extractColor(e3, r3, s3) : 53 === i3 ? s3.bg |= 1073741824 : 55 === i3 ? s3.bg &= -1073741825 : 59 === i3 ? (s3.extended = s3.extended.clone(), s3.extended.underlineColor = -1, s3.updateExtended()) : 100 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & l2.DEFAULT_ATTR_DATA.fg, s3.bg &= -67108864, s3.bg |= 16777215 & l2.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i3);
          return true;
        }
        deviceStatus(e3) {
          switch (e3.params[0]) {
            case 5:
              this._coreService.triggerDataEvent(`${n2.C0.ESC}[0n`);
              break;
            case 6:
              const e4 = this._activeBuffer.y + 1, t4 = this._activeBuffer.x + 1;
              this._coreService.triggerDataEvent(`${n2.C0.ESC}[${e4};${t4}R`);
          }
          return true;
        }
        deviceStatusPrivate(e3) {
          if (6 === e3.params[0]) {
            const e4 = this._activeBuffer.y + 1, t4 = this._activeBuffer.x + 1;
            this._coreService.triggerDataEvent(`${n2.C0.ESC}[?${e4};${t4}R`);
          }
          return true;
        }
        softReset(e3) {
          return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = l2.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
        }
        setCursorStyle(e3) {
          const t4 = e3.params[0] || 1;
          switch (t4) {
            case 1:
            case 2:
              this._optionsService.options.cursorStyle = "block";
              break;
            case 3:
            case 4:
              this._optionsService.options.cursorStyle = "underline";
              break;
            case 5:
            case 6:
              this._optionsService.options.cursorStyle = "bar";
          }
          const i3 = t4 % 2 == 1;
          return this._optionsService.options.cursorBlink = i3, true;
        }
        setScrollRegion(e3) {
          const t4 = e3.params[0] || 1;
          let i3;
          return (e3.length < 2 || (i3 = e3.params[1]) > this._bufferService.rows || 0 === i3) && (i3 = this._bufferService.rows), i3 > t4 && (this._activeBuffer.scrollTop = t4 - 1, this._activeBuffer.scrollBottom = i3 - 1, this._setCursor(0, 0)), true;
        }
        windowOptions(e3) {
          if (!w2(e3.params[0], this._optionsService.rawOptions.windowOptions)) return true;
          const t4 = e3.length > 1 ? e3.params[1] : 0;
          switch (e3.params[0]) {
            case 14:
              2 !== t4 && this._onRequestWindowsOptionsReport.fire(y2.GET_WIN_SIZE_PIXELS);
              break;
            case 16:
              this._onRequestWindowsOptionsReport.fire(y2.GET_CELL_SIZE_PIXELS);
              break;
            case 18:
              this._bufferService && this._coreService.triggerDataEvent(`${n2.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
              break;
            case 22:
              0 !== t4 && 2 !== t4 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t4 && 1 !== t4 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
              break;
            case 23:
              0 !== t4 && 2 !== t4 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t4 && 1 !== t4 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
          }
          return true;
        }
        saveCursor(e3) {
          return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
        }
        restoreCursor(e3) {
          return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
        }
        setTitle(e3) {
          return this._windowTitle = e3, this._onTitleChange.fire(e3), true;
        }
        setIconName(e3) {
          return this._iconName = e3, true;
        }
        setOrReportIndexedColor(e3) {
          const t4 = [], i3 = e3.split(";");
          for (; i3.length > 1; ) {
            const e4 = i3.shift(), s3 = i3.shift();
            if (/^\d+$/.exec(e4)) {
              const i4 = parseInt(e4);
              if (D2(i4)) if ("?" === s3) t4.push({ type: 0, index: i4 });
              else {
                const e5 = (0, S2.parseColor)(s3);
                e5 && t4.push({ type: 1, index: i4, color: e5 });
              }
            }
          }
          return t4.length && this._onColor.fire(t4), true;
        }
        setHyperlink(e3) {
          const t4 = e3.split(";");
          return !(t4.length < 2) && (t4[1] ? this._createHyperlink(t4[0], t4[1]) : !t4[0] && this._finishHyperlink());
        }
        _createHyperlink(e3, t4) {
          this._getCurrentLinkId() && this._finishHyperlink();
          const i3 = e3.split(":");
          let s3;
          const r3 = i3.findIndex((e4) => e4.startsWith("id="));
          return -1 !== r3 && (s3 = i3[r3].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: s3, uri: t4 }), this._curAttrData.updateExtended(), true;
        }
        _finishHyperlink() {
          return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
        }
        _setOrReportSpecialColor(e3, t4) {
          const i3 = e3.split(";");
          for (let e4 = 0; e4 < i3.length && !(t4 >= this._specialColors.length); ++e4, ++t4) if ("?" === i3[e4]) this._onColor.fire([{ type: 0, index: this._specialColors[t4] }]);
          else {
            const s3 = (0, S2.parseColor)(i3[e4]);
            s3 && this._onColor.fire([{ type: 1, index: this._specialColors[t4], color: s3 }]);
          }
          return true;
        }
        setOrReportFgColor(e3) {
          return this._setOrReportSpecialColor(e3, 0);
        }
        setOrReportBgColor(e3) {
          return this._setOrReportSpecialColor(e3, 1);
        }
        setOrReportCursorColor(e3) {
          return this._setOrReportSpecialColor(e3, 2);
        }
        restoreIndexedColor(e3) {
          if (!e3) return this._onColor.fire([{ type: 2 }]), true;
          const t4 = [], i3 = e3.split(";");
          for (let e4 = 0; e4 < i3.length; ++e4) if (/^\d+$/.exec(i3[e4])) {
            const s3 = parseInt(i3[e4]);
            D2(s3) && t4.push({ type: 2, index: s3 });
          }
          return t4.length && this._onColor.fire(t4), true;
        }
        restoreFgColor(e3) {
          return this._onColor.fire([{ type: 2, index: 256 }]), true;
        }
        restoreBgColor(e3) {
          return this._onColor.fire([{ type: 2, index: 257 }]), true;
        }
        restoreCursorColor(e3) {
          return this._onColor.fire([{ type: 2, index: 258 }]), true;
        }
        nextLine() {
          return this._activeBuffer.x = 0, this.index(), true;
        }
        keypadApplicationMode() {
          return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
        }
        keypadNumericMode() {
          return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
        }
        selectDefaultCharset() {
          return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, o.DEFAULT_CHARSET), true;
        }
        selectCharset(e3) {
          return 2 !== e3.length ? (this.selectDefaultCharset(), true) : ("/" === e3[0] || this._charsetService.setgCharset(C2[e3[0]], o.CHARSETS[e3[1]] || o.DEFAULT_CHARSET), true);
        }
        index() {
          return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
        }
        tabSet() {
          return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
        }
        reverseIndex() {
          if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
            const e3 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
            this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e3, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
          } else this._activeBuffer.y--, this._restrictCursor();
          return true;
        }
        fullReset() {
          return this._parser.reset(), this._onRequestReset.fire(), true;
        }
        reset() {
          this._curAttrData = l2.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = l2.DEFAULT_ATTR_DATA.clone();
        }
        _eraseAttrData() {
          return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
        }
        setgLevel(e3) {
          return this._charsetService.setgLevel(e3), true;
        }
        screenAlignmentPattern() {
          const e3 = new u2.CellData();
          e3.content = 1 << 22 | "E".charCodeAt(0), e3.fg = this._curAttrData.fg, e3.bg = this._curAttrData.bg, this._setCursor(0, 0);
          for (let t4 = 0; t4 < this._bufferService.rows; ++t4) {
            const i3 = this._activeBuffer.ybase + this._activeBuffer.y + t4, s3 = this._activeBuffer.lines.get(i3);
            s3 && (s3.fill(e3), s3.isWrapped = false);
          }
          return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
        }
        requestStatusString(e3, t4) {
          const i3 = this._bufferService.buffer, s3 = this._optionsService.rawOptions;
          return ((e4) => (this._coreService.triggerDataEvent(`${n2.C0.ESC}${e4}${n2.C0.ESC}\\`), true))('"q' === e3 ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : '"p' === e3 ? 'P1$r61;1"p' : "r" === e3 ? `P1$r${i3.scrollTop + 1};${i3.scrollBottom + 1}r` : "m" === e3 ? "P1$r0m" : " q" === e3 ? `P1$r${{ block: 2, underline: 4, bar: 6 }[s3.cursorStyle] - (s3.cursorBlink ? 1 : 0)} q` : "P0$r");
        }
        markRangeDirty(e3, t4) {
          this._dirtyRowTracker.markRangeDirty(e3, t4);
        }
      }
      t3.InputHandler = k2;
      let L2 = class {
        constructor(e3) {
          this._bufferService = e3, this.clearRange();
        }
        clearRange() {
          this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
        }
        markDirty(e3) {
          e3 < this.start ? this.start = e3 : e3 > this.end && (this.end = e3);
        }
        markRangeDirty(e3, t4) {
          e3 > t4 && (E2 = e3, e3 = t4, t4 = E2), e3 < this.start && (this.start = e3), t4 > this.end && (this.end = t4);
        }
        markAllDirty() {
          this.markRangeDirty(0, this._bufferService.rows - 1);
        }
      };
      function D2(e3) {
        return 0 <= e3 && e3 < 256;
      }
      L2 = s2([r2(0, v2.IBufferService)], L2);
    }, 844: (e2, t3) => {
      function i2(e3) {
        for (const t4 of e3) t4.dispose();
        e3.length = 0;
      }
      Object.defineProperty(t3, "__esModule", { value: true }), t3.getDisposeArrayDisposable = t3.disposeArray = t3.toDisposable = t3.MutableDisposable = t3.Disposable = void 0, t3.Disposable = class {
        constructor() {
          this._disposables = [], this._isDisposed = false;
        }
        dispose() {
          this._isDisposed = true;
          for (const e3 of this._disposables) e3.dispose();
          this._disposables.length = 0;
        }
        register(e3) {
          return this._disposables.push(e3), e3;
        }
        unregister(e3) {
          const t4 = this._disposables.indexOf(e3);
          -1 !== t4 && this._disposables.splice(t4, 1);
        }
      }, t3.MutableDisposable = class {
        constructor() {
          this._isDisposed = false;
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(e3) {
          this._isDisposed || e3 === this._value || (this._value?.dispose(), this._value = e3);
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          this._isDisposed = true, this._value?.dispose(), this._value = void 0;
        }
      }, t3.toDisposable = function(e3) {
        return { dispose: e3 };
      }, t3.disposeArray = i2, t3.getDisposeArrayDisposable = function(e3) {
        return { dispose: () => i2(e3) };
      };
    }, 1505: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.FourKeyMap = t3.TwoKeyMap = void 0;
      class i2 {
        constructor() {
          this._data = {};
        }
        set(e3, t4, i3) {
          this._data[e3] || (this._data[e3] = {}), this._data[e3][t4] = i3;
        }
        get(e3, t4) {
          return this._data[e3] ? this._data[e3][t4] : void 0;
        }
        clear() {
          this._data = {};
        }
      }
      t3.TwoKeyMap = i2, t3.FourKeyMap = class {
        constructor() {
          this._data = new i2();
        }
        set(e3, t4, s2, r2, n2) {
          this._data.get(e3, t4) || this._data.set(e3, t4, new i2()), this._data.get(e3, t4).set(s2, r2, n2);
        }
        get(e3, t4, i3, s2) {
          return this._data.get(e3, t4)?.get(i3, s2);
        }
        clear() {
          this._data.clear();
        }
      };
    }, 6114: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.isChromeOS = t3.isLinux = t3.isWindows = t3.isIphone = t3.isIpad = t3.isMac = t3.getSafariVersion = t3.isSafari = t3.isLegacyEdge = t3.isFirefox = t3.isNode = void 0, t3.isNode = "undefined" != typeof process && "title" in process;
      const i2 = t3.isNode ? "node" : navigator.userAgent, s2 = t3.isNode ? "node" : navigator.platform;
      t3.isFirefox = i2.includes("Firefox"), t3.isLegacyEdge = i2.includes("Edge"), t3.isSafari = /^((?!chrome|android).)*safari/i.test(i2), t3.getSafariVersion = function() {
        if (!t3.isSafari) return 0;
        const e3 = i2.match(/Version\/(\d+)/);
        return null === e3 || e3.length < 2 ? 0 : parseInt(e3[1]);
      }, t3.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(s2), t3.isIpad = "iPad" === s2, t3.isIphone = "iPhone" === s2, t3.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(s2), t3.isLinux = s2.indexOf("Linux") >= 0, t3.isChromeOS = /\bCrOS\b/.test(i2);
    }, 6106: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.SortedList = void 0;
      let i2 = 0;
      t3.SortedList = class {
        constructor(e3) {
          this._getKey = e3, this._array = [];
        }
        clear() {
          this._array.length = 0;
        }
        insert(e3) {
          0 !== this._array.length ? (i2 = this._search(this._getKey(e3)), this._array.splice(i2, 0, e3)) : this._array.push(e3);
        }
        delete(e3) {
          if (0 === this._array.length) return false;
          const t4 = this._getKey(e3);
          if (void 0 === t4) return false;
          if (i2 = this._search(t4), -1 === i2) return false;
          if (this._getKey(this._array[i2]) !== t4) return false;
          do {
            if (this._array[i2] === e3) return this._array.splice(i2, 1), true;
          } while (++i2 < this._array.length && this._getKey(this._array[i2]) === t4);
          return false;
        }
        *getKeyIterator(e3) {
          if (0 !== this._array.length && (i2 = this._search(e3), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3)) do {
            yield this._array[i2];
          } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
        }
        forEachByKey(e3, t4) {
          if (0 !== this._array.length && (i2 = this._search(e3), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3)) do {
            t4(this._array[i2]);
          } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
        }
        values() {
          return [...this._array].values();
        }
        _search(e3) {
          let t4 = 0, i3 = this._array.length - 1;
          for (; i3 >= t4; ) {
            let s2 = t4 + i3 >> 1;
            const r2 = this._getKey(this._array[s2]);
            if (r2 > e3) i3 = s2 - 1;
            else {
              if (!(r2 < e3)) {
                for (; s2 > 0 && this._getKey(this._array[s2 - 1]) === e3; ) s2--;
                return s2;
              }
              t4 = s2 + 1;
            }
          }
          return t4;
        }
      };
    }, 7226: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DebouncedIdleTask = t3.IdleTaskQueue = t3.PriorityTaskQueue = void 0;
      const s2 = i2(6114);
      class r2 {
        constructor() {
          this._tasks = [], this._i = 0;
        }
        enqueue(e3) {
          this._tasks.push(e3), this._start();
        }
        flush() {
          for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
          this.clear();
        }
        clear() {
          this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
        }
        _start() {
          this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
        }
        _process(e3) {
          this._idleCallback = void 0;
          let t4 = 0, i3 = 0, s3 = e3.timeRemaining(), r3 = 0;
          for (; this._i < this._tasks.length; ) {
            if (t4 = Date.now(), this._tasks[this._i]() || this._i++, t4 = Math.max(1, Date.now() - t4), i3 = Math.max(t4, i3), r3 = e3.timeRemaining(), 1.5 * i3 > r3) return s3 - t4 < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s3 - t4))}ms`), void this._start();
            s3 = r3;
          }
          this.clear();
        }
      }
      class n2 extends r2 {
        _requestCallback(e3) {
          return setTimeout(() => e3(this._createDeadline(16)));
        }
        _cancelCallback(e3) {
          clearTimeout(e3);
        }
        _createDeadline(e3) {
          const t4 = Date.now() + e3;
          return { timeRemaining: () => Math.max(0, t4 - Date.now()) };
        }
      }
      t3.PriorityTaskQueue = n2, t3.IdleTaskQueue = !s2.isNode && "requestIdleCallback" in window ? class extends r2 {
        _requestCallback(e3) {
          return requestIdleCallback(e3);
        }
        _cancelCallback(e3) {
          cancelIdleCallback(e3);
        }
      } : n2, t3.DebouncedIdleTask = class {
        constructor() {
          this._queue = new t3.IdleTaskQueue();
        }
        set(e3) {
          this._queue.clear(), this._queue.enqueue(e3);
        }
        flush() {
          this._queue.flush();
        }
      };
    }, 9282: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.updateWindowsModeWrappedState = void 0;
      const s2 = i2(643);
      t3.updateWindowsModeWrappedState = function(e3) {
        const t4 = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y - 1), i3 = t4?.get(e3.cols - 1), r2 = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y);
        r2 && i3 && (r2.isWrapped = i3[s2.CHAR_DATA_CODE_INDEX] !== s2.NULL_CELL_CODE && i3[s2.CHAR_DATA_CODE_INDEX] !== s2.WHITESPACE_CELL_CODE);
      };
    }, 3734: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ExtendedAttrs = t3.AttributeData = void 0;
      class i2 {
        constructor() {
          this.fg = 0, this.bg = 0, this.extended = new s2();
        }
        static toColorRGB(e3) {
          return [e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3];
        }
        static fromColorRGB(e3) {
          return (255 & e3[0]) << 16 | (255 & e3[1]) << 8 | 255 & e3[2];
        }
        clone() {
          const e3 = new i2();
          return e3.fg = this.fg, e3.bg = this.bg, e3.extended = this.extended.clone(), e3;
        }
        isInverse() {
          return 67108864 & this.fg;
        }
        isBold() {
          return 134217728 & this.fg;
        }
        isUnderline() {
          return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
        }
        isBlink() {
          return 536870912 & this.fg;
        }
        isInvisible() {
          return 1073741824 & this.fg;
        }
        isItalic() {
          return 67108864 & this.bg;
        }
        isDim() {
          return 134217728 & this.bg;
        }
        isStrikethrough() {
          return 2147483648 & this.fg;
        }
        isProtected() {
          return 536870912 & this.bg;
        }
        isOverline() {
          return 1073741824 & this.bg;
        }
        getFgColorMode() {
          return 50331648 & this.fg;
        }
        getBgColorMode() {
          return 50331648 & this.bg;
        }
        isFgRGB() {
          return 50331648 == (50331648 & this.fg);
        }
        isBgRGB() {
          return 50331648 == (50331648 & this.bg);
        }
        isFgPalette() {
          return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
        }
        isBgPalette() {
          return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
        }
        isFgDefault() {
          return 0 == (50331648 & this.fg);
        }
        isBgDefault() {
          return 0 == (50331648 & this.bg);
        }
        isAttributeDefault() {
          return 0 === this.fg && 0 === this.bg;
        }
        getFgColor() {
          switch (50331648 & this.fg) {
            case 16777216:
            case 33554432:
              return 255 & this.fg;
            case 50331648:
              return 16777215 & this.fg;
            default:
              return -1;
          }
        }
        getBgColor() {
          switch (50331648 & this.bg) {
            case 16777216:
            case 33554432:
              return 255 & this.bg;
            case 50331648:
              return 16777215 & this.bg;
            default:
              return -1;
          }
        }
        hasExtendedAttrs() {
          return 268435456 & this.bg;
        }
        updateExtended() {
          this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
        }
        getUnderlineColor() {
          if (268435456 & this.bg && ~this.extended.underlineColor) switch (50331648 & this.extended.underlineColor) {
            case 16777216:
            case 33554432:
              return 255 & this.extended.underlineColor;
            case 50331648:
              return 16777215 & this.extended.underlineColor;
            default:
              return this.getFgColor();
          }
          return this.getFgColor();
        }
        getUnderlineColorMode() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
        }
        isUnderlineColorRGB() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB();
        }
        isUnderlineColorPalette() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
        }
        isUnderlineColorDefault() {
          return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault();
        }
        getUnderlineStyle() {
          return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
        }
        getUnderlineVariantOffset() {
          return this.extended.underlineVariantOffset;
        }
      }
      t3.AttributeData = i2;
      class s2 {
        get ext() {
          return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
        }
        set ext(e3) {
          this._ext = e3;
        }
        get underlineStyle() {
          return this._urlId ? 5 : (469762048 & this._ext) >> 26;
        }
        set underlineStyle(e3) {
          this._ext &= -469762049, this._ext |= e3 << 26 & 469762048;
        }
        get underlineColor() {
          return 67108863 & this._ext;
        }
        set underlineColor(e3) {
          this._ext &= -67108864, this._ext |= 67108863 & e3;
        }
        get urlId() {
          return this._urlId;
        }
        set urlId(e3) {
          this._urlId = e3;
        }
        get underlineVariantOffset() {
          const e3 = (3758096384 & this._ext) >> 29;
          return e3 < 0 ? 4294967288 ^ e3 : e3;
        }
        set underlineVariantOffset(e3) {
          this._ext &= 536870911, this._ext |= e3 << 29 & 3758096384;
        }
        constructor(e3 = 0, t4 = 0) {
          this._ext = 0, this._urlId = 0, this._ext = e3, this._urlId = t4;
        }
        clone() {
          return new s2(this._ext, this._urlId);
        }
        isEmpty() {
          return 0 === this.underlineStyle && 0 === this._urlId;
        }
      }
      t3.ExtendedAttrs = s2;
    }, 9092: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Buffer = t3.MAX_BUFFER_SIZE = void 0;
      const s2 = i2(6349), r2 = i2(7226), n2 = i2(3734), o = i2(8437), a2 = i2(4634), h = i2(511), c2 = i2(643), l2 = i2(4863), d = i2(7116);
      t3.MAX_BUFFER_SIZE = 4294967295, t3.Buffer = class {
        constructor(e3, t4, i3) {
          this._hasScrollback = e3, this._optionsService = t4, this._bufferService = i3, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = o.DEFAULT_ATTR_DATA.clone(), this.savedCharset = d.DEFAULT_CHARSET, this.markers = [], this._nullCell = h.CellData.fromCharData([0, c2.NULL_CELL_CHAR, c2.NULL_CELL_WIDTH, c2.NULL_CELL_CODE]), this._whitespaceCell = h.CellData.fromCharData([0, c2.WHITESPACE_CELL_CHAR, c2.WHITESPACE_CELL_WIDTH, c2.WHITESPACE_CELL_CODE]), this._isClearing = false, this._memoryCleanupQueue = new r2.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        getNullCell(e3) {
          return e3 ? (this._nullCell.fg = e3.fg, this._nullCell.bg = e3.bg, this._nullCell.extended = e3.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n2.ExtendedAttrs()), this._nullCell;
        }
        getWhitespaceCell(e3) {
          return e3 ? (this._whitespaceCell.fg = e3.fg, this._whitespaceCell.bg = e3.bg, this._whitespaceCell.extended = e3.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n2.ExtendedAttrs()), this._whitespaceCell;
        }
        getBlankLine(e3, t4) {
          return new o.BufferLine(this._bufferService.cols, this.getNullCell(e3), t4);
        }
        get hasScrollback() {
          return this._hasScrollback && this.lines.maxLength > this._rows;
        }
        get isCursorInViewport() {
          const e3 = this.ybase + this.y - this.ydisp;
          return e3 >= 0 && e3 < this._rows;
        }
        _getCorrectBufferLength(e3) {
          if (!this._hasScrollback) return e3;
          const i3 = e3 + this._optionsService.rawOptions.scrollback;
          return i3 > t3.MAX_BUFFER_SIZE ? t3.MAX_BUFFER_SIZE : i3;
        }
        fillViewportRows(e3) {
          if (0 === this.lines.length) {
            void 0 === e3 && (e3 = o.DEFAULT_ATTR_DATA);
            let t4 = this._rows;
            for (; t4--; ) this.lines.push(this.getBlankLine(e3));
          }
        }
        clear() {
          this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
        }
        resize(e3, t4) {
          const i3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
          let s3 = 0;
          const r3 = this._getCorrectBufferLength(t4);
          if (r3 > this.lines.maxLength && (this.lines.maxLength = r3), this.lines.length > 0) {
            if (this._cols < e3) for (let t5 = 0; t5 < this.lines.length; t5++) s3 += +this.lines.get(t5).resize(e3, i3);
            let n3 = 0;
            if (this._rows < t4) for (let s4 = this._rows; s4 < t4; s4++) this.lines.length < t4 + this.ybase && (this._optionsService.rawOptions.windowsMode || void 0 !== this._optionsService.rawOptions.windowsPty.backend || void 0 !== this._optionsService.rawOptions.windowsPty.buildNumber ? this.lines.push(new o.BufferLine(e3, i3)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n3 + 1 ? (this.ybase--, n3++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new o.BufferLine(e3, i3)));
            else for (let e4 = this._rows; e4 > t4; e4--) this.lines.length > t4 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
            if (r3 < this.lines.maxLength) {
              const e4 = this.lines.length - r3;
              e4 > 0 && (this.lines.trimStart(e4), this.ybase = Math.max(this.ybase - e4, 0), this.ydisp = Math.max(this.ydisp - e4, 0), this.savedY = Math.max(this.savedY - e4, 0)), this.lines.maxLength = r3;
            }
            this.x = Math.min(this.x, e3 - 1), this.y = Math.min(this.y, t4 - 1), n3 && (this.y += n3), this.savedX = Math.min(this.savedX, e3 - 1), this.scrollTop = 0;
          }
          if (this.scrollBottom = t4 - 1, this._isReflowEnabled && (this._reflow(e3, t4), this._cols > e3)) for (let t5 = 0; t5 < this.lines.length; t5++) s3 += +this.lines.get(t5).resize(e3, i3);
          this._cols = e3, this._rows = t4, this._memoryCleanupQueue.clear(), s3 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
        }
        _batchedMemoryCleanup() {
          let e3 = true;
          this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e3 = false);
          let t4 = 0;
          for (; this._memoryCleanupPosition < this.lines.length; ) if (t4 += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t4 > 100) return true;
          return e3;
        }
        get _isReflowEnabled() {
          const e3 = this._optionsService.rawOptions.windowsPty;
          return e3 && e3.buildNumber ? this._hasScrollback && "conpty" === e3.backend && e3.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
        }
        _reflow(e3, t4) {
          this._cols !== e3 && (e3 > this._cols ? this._reflowLarger(e3, t4) : this._reflowSmaller(e3, t4));
        }
        _reflowLarger(e3, t4) {
          const i3 = (0, a2.reflowLargerGetLinesToRemove)(this.lines, this._cols, e3, this.ybase + this.y, this.getNullCell(o.DEFAULT_ATTR_DATA));
          if (i3.length > 0) {
            const s3 = (0, a2.reflowLargerCreateNewLayout)(this.lines, i3);
            (0, a2.reflowLargerApplyNewLayout)(this.lines, s3.layout), this._reflowLargerAdjustViewport(e3, t4, s3.countRemoved);
          }
        }
        _reflowLargerAdjustViewport(e3, t4, i3) {
          const s3 = this.getNullCell(o.DEFAULT_ATTR_DATA);
          let r3 = i3;
          for (; r3-- > 0; ) 0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t4 && this.lines.push(new o.BufferLine(e3, s3))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
          this.savedY = Math.max(this.savedY - i3, 0);
        }
        _reflowSmaller(e3, t4) {
          const i3 = this.getNullCell(o.DEFAULT_ATTR_DATA), s3 = [];
          let r3 = 0;
          for (let n3 = this.lines.length - 1; n3 >= 0; n3--) {
            let h2 = this.lines.get(n3);
            if (!h2 || !h2.isWrapped && h2.getTrimmedLength() <= e3) continue;
            const c3 = [h2];
            for (; h2.isWrapped && n3 > 0; ) h2 = this.lines.get(--n3), c3.unshift(h2);
            const l3 = this.ybase + this.y;
            if (l3 >= n3 && l3 < n3 + c3.length) continue;
            const d2 = c3[c3.length - 1].getTrimmedLength(), _ = (0, a2.reflowSmallerGetNewLineLengths)(c3, this._cols, e3), u2 = _.length - c3.length;
            let f2;
            f2 = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u2) : Math.max(0, this.lines.length - this.lines.maxLength + u2);
            const v2 = [];
            for (let e4 = 0; e4 < u2; e4++) {
              const e5 = this.getBlankLine(o.DEFAULT_ATTR_DATA, true);
              v2.push(e5);
            }
            v2.length > 0 && (s3.push({ start: n3 + c3.length + r3, newLines: v2 }), r3 += v2.length), c3.push(...v2);
            let p2 = _.length - 1, g = _[p2];
            0 === g && (p2--, g = _[p2]);
            let m2 = c3.length - u2 - 1, S2 = d2;
            for (; m2 >= 0; ) {
              const e4 = Math.min(S2, g);
              if (void 0 === c3[p2]) break;
              if (c3[p2].copyCellsFrom(c3[m2], S2 - e4, g - e4, e4, true), g -= e4, 0 === g && (p2--, g = _[p2]), S2 -= e4, 0 === S2) {
                m2--;
                const e5 = Math.max(m2, 0);
                S2 = (0, a2.getWrappedLineTrimmedLength)(c3, e5, this._cols);
              }
            }
            for (let t5 = 0; t5 < c3.length; t5++) _[t5] < e3 && c3[t5].setCell(_[t5], i3);
            let C2 = u2 - f2;
            for (; C2-- > 0; ) 0 === this.ybase ? this.y < t4 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + r3) - t4 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
            this.savedY = Math.min(this.savedY + u2, this.ybase + t4 - 1);
          }
          if (s3.length > 0) {
            const e4 = [], t5 = [];
            for (let e5 = 0; e5 < this.lines.length; e5++) t5.push(this.lines.get(e5));
            const i4 = this.lines.length;
            let n3 = i4 - 1, o2 = 0, a3 = s3[o2];
            this.lines.length = Math.min(this.lines.maxLength, this.lines.length + r3);
            let h2 = 0;
            for (let c4 = Math.min(this.lines.maxLength - 1, i4 + r3 - 1); c4 >= 0; c4--) if (a3 && a3.start > n3 + h2) {
              for (let e5 = a3.newLines.length - 1; e5 >= 0; e5--) this.lines.set(c4--, a3.newLines[e5]);
              c4++, e4.push({ index: n3 + 1, amount: a3.newLines.length }), h2 += a3.newLines.length, a3 = s3[++o2];
            } else this.lines.set(c4, t5[n3--]);
            let c3 = 0;
            for (let t6 = e4.length - 1; t6 >= 0; t6--) e4[t6].index += c3, this.lines.onInsertEmitter.fire(e4[t6]), c3 += e4[t6].amount;
            const l3 = Math.max(0, i4 + r3 - this.lines.maxLength);
            l3 > 0 && this.lines.onTrimEmitter.fire(l3);
          }
        }
        translateBufferLineToString(e3, t4, i3 = 0, s3) {
          const r3 = this.lines.get(e3);
          return r3 ? r3.translateToString(t4, i3, s3) : "";
        }
        getWrappedRangeForLine(e3) {
          let t4 = e3, i3 = e3;
          for (; t4 > 0 && this.lines.get(t4).isWrapped; ) t4--;
          for (; i3 + 1 < this.lines.length && this.lines.get(i3 + 1).isWrapped; ) i3++;
          return { first: t4, last: i3 };
        }
        setupTabStops(e3) {
          for (null != e3 ? this.tabs[e3] || (e3 = this.prevStop(e3)) : (this.tabs = {}, e3 = 0); e3 < this._cols; e3 += this._optionsService.rawOptions.tabStopWidth) this.tabs[e3] = true;
        }
        prevStop(e3) {
          for (null == e3 && (e3 = this.x); !this.tabs[--e3] && e3 > 0; ) ;
          return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
        }
        nextStop(e3) {
          for (null == e3 && (e3 = this.x); !this.tabs[++e3] && e3 < this._cols; ) ;
          return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
        }
        clearMarkers(e3) {
          this._isClearing = true;
          for (let t4 = 0; t4 < this.markers.length; t4++) this.markers[t4].line === e3 && (this.markers[t4].dispose(), this.markers.splice(t4--, 1));
          this._isClearing = false;
        }
        clearAllMarkers() {
          this._isClearing = true;
          for (let e3 = 0; e3 < this.markers.length; e3++) this.markers[e3].dispose(), this.markers.splice(e3--, 1);
          this._isClearing = false;
        }
        addMarker(e3) {
          const t4 = new l2.Marker(e3);
          return this.markers.push(t4), t4.register(this.lines.onTrim((e4) => {
            t4.line -= e4, t4.line < 0 && t4.dispose();
          })), t4.register(this.lines.onInsert((e4) => {
            t4.line >= e4.index && (t4.line += e4.amount);
          })), t4.register(this.lines.onDelete((e4) => {
            t4.line >= e4.index && t4.line < e4.index + e4.amount && t4.dispose(), t4.line > e4.index && (t4.line -= e4.amount);
          })), t4.register(t4.onDispose(() => this._removeMarker(t4))), t4;
        }
        _removeMarker(e3) {
          this._isClearing || this.markers.splice(this.markers.indexOf(e3), 1);
        }
      };
    }, 8437: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferLine = t3.DEFAULT_ATTR_DATA = void 0;
      const s2 = i2(3734), r2 = i2(511), n2 = i2(643), o = i2(482);
      t3.DEFAULT_ATTR_DATA = Object.freeze(new s2.AttributeData());
      let a2 = 0;
      class h {
        constructor(e3, t4, i3 = false) {
          this.isWrapped = i3, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e3);
          const s3 = t4 || r2.CellData.fromCharData([0, n2.NULL_CELL_CHAR, n2.NULL_CELL_WIDTH, n2.NULL_CELL_CODE]);
          for (let t5 = 0; t5 < e3; ++t5) this.setCell(t5, s3);
          this.length = e3;
        }
        get(e3) {
          const t4 = this._data[3 * e3 + 0], i3 = 2097151 & t4;
          return [this._data[3 * e3 + 1], 2097152 & t4 ? this._combined[e3] : i3 ? (0, o.stringFromCodePoint)(i3) : "", t4 >> 22, 2097152 & t4 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : i3];
        }
        set(e3, t4) {
          this._data[3 * e3 + 1] = t4[n2.CHAR_DATA_ATTR_INDEX], t4[n2.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e3] = t4[1], this._data[3 * e3 + 0] = 2097152 | e3 | t4[n2.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e3 + 0] = t4[n2.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t4[n2.CHAR_DATA_WIDTH_INDEX] << 22;
        }
        getWidth(e3) {
          return this._data[3 * e3 + 0] >> 22;
        }
        hasWidth(e3) {
          return 12582912 & this._data[3 * e3 + 0];
        }
        getFg(e3) {
          return this._data[3 * e3 + 1];
        }
        getBg(e3) {
          return this._data[3 * e3 + 2];
        }
        hasContent(e3) {
          return 4194303 & this._data[3 * e3 + 0];
        }
        getCodePoint(e3) {
          const t4 = this._data[3 * e3 + 0];
          return 2097152 & t4 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : 2097151 & t4;
        }
        isCombined(e3) {
          return 2097152 & this._data[3 * e3 + 0];
        }
        getString(e3) {
          const t4 = this._data[3 * e3 + 0];
          return 2097152 & t4 ? this._combined[e3] : 2097151 & t4 ? (0, o.stringFromCodePoint)(2097151 & t4) : "";
        }
        isProtected(e3) {
          return 536870912 & this._data[3 * e3 + 2];
        }
        loadCell(e3, t4) {
          return a2 = 3 * e3, t4.content = this._data[a2 + 0], t4.fg = this._data[a2 + 1], t4.bg = this._data[a2 + 2], 2097152 & t4.content && (t4.combinedData = this._combined[e3]), 268435456 & t4.bg && (t4.extended = this._extendedAttrs[e3]), t4;
        }
        setCell(e3, t4) {
          2097152 & t4.content && (this._combined[e3] = t4.combinedData), 268435456 & t4.bg && (this._extendedAttrs[e3] = t4.extended), this._data[3 * e3 + 0] = t4.content, this._data[3 * e3 + 1] = t4.fg, this._data[3 * e3 + 2] = t4.bg;
        }
        setCellFromCodepoint(e3, t4, i3, s3) {
          268435456 & s3.bg && (this._extendedAttrs[e3] = s3.extended), this._data[3 * e3 + 0] = t4 | i3 << 22, this._data[3 * e3 + 1] = s3.fg, this._data[3 * e3 + 2] = s3.bg;
        }
        addCodepointToCell(e3, t4, i3) {
          let s3 = this._data[3 * e3 + 0];
          2097152 & s3 ? this._combined[e3] += (0, o.stringFromCodePoint)(t4) : 2097151 & s3 ? (this._combined[e3] = (0, o.stringFromCodePoint)(2097151 & s3) + (0, o.stringFromCodePoint)(t4), s3 &= -2097152, s3 |= 2097152) : s3 = t4 | 1 << 22, i3 && (s3 &= -12582913, s3 |= i3 << 22), this._data[3 * e3 + 0] = s3;
        }
        insertCells(e3, t4, i3) {
          if ((e3 %= this.length) && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t4 < this.length - e3) {
            const s3 = new r2.CellData();
            for (let i4 = this.length - e3 - t4 - 1; i4 >= 0; --i4) this.setCell(e3 + t4 + i4, this.loadCell(e3 + i4, s3));
            for (let s4 = 0; s4 < t4; ++s4) this.setCell(e3 + s4, i3);
          } else for (let t5 = e3; t5 < this.length; ++t5) this.setCell(t5, i3);
          2 === this.getWidth(this.length - 1) && this.setCellFromCodepoint(this.length - 1, 0, 1, i3);
        }
        deleteCells(e3, t4, i3) {
          if (e3 %= this.length, t4 < this.length - e3) {
            const s3 = new r2.CellData();
            for (let i4 = 0; i4 < this.length - e3 - t4; ++i4) this.setCell(e3 + i4, this.loadCell(e3 + t4 + i4, s3));
            for (let e4 = this.length - t4; e4 < this.length; ++e4) this.setCell(e4, i3);
          } else for (let t5 = e3; t5 < this.length; ++t5) this.setCell(t5, i3);
          e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), 0 !== this.getWidth(e3) || this.hasContent(e3) || this.setCellFromCodepoint(e3, 0, 1, i3);
        }
        replaceCells(e3, t4, i3, s3 = false) {
          if (s3) for (e3 && 2 === this.getWidth(e3 - 1) && !this.isProtected(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t4 < this.length && 2 === this.getWidth(t4 - 1) && !this.isProtected(t4) && this.setCellFromCodepoint(t4, 0, 1, i3); e3 < t4 && e3 < this.length; ) this.isProtected(e3) || this.setCell(e3, i3), e3++;
          else for (e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodepoint(e3 - 1, 0, 1, i3), t4 < this.length && 2 === this.getWidth(t4 - 1) && this.setCellFromCodepoint(t4, 0, 1, i3); e3 < t4 && e3 < this.length; ) this.setCell(e3++, i3);
        }
        resize(e3, t4) {
          if (e3 === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
          const i3 = 3 * e3;
          if (e3 > this.length) {
            if (this._data.buffer.byteLength >= 4 * i3) this._data = new Uint32Array(this._data.buffer, 0, i3);
            else {
              const e4 = new Uint32Array(i3);
              e4.set(this._data), this._data = e4;
            }
            for (let i4 = this.length; i4 < e3; ++i4) this.setCell(i4, t4);
          } else {
            this._data = this._data.subarray(0, i3);
            const t5 = Object.keys(this._combined);
            for (let i4 = 0; i4 < t5.length; i4++) {
              const s4 = parseInt(t5[i4], 10);
              s4 >= e3 && delete this._combined[s4];
            }
            const s3 = Object.keys(this._extendedAttrs);
            for (let t6 = 0; t6 < s3.length; t6++) {
              const i4 = parseInt(s3[t6], 10);
              i4 >= e3 && delete this._extendedAttrs[i4];
            }
          }
          return this.length = e3, 4 * i3 * 2 < this._data.buffer.byteLength;
        }
        cleanupMemory() {
          if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
            const e3 = new Uint32Array(this._data.length);
            return e3.set(this._data), this._data = e3, 1;
          }
          return 0;
        }
        fill(e3, t4 = false) {
          if (t4) for (let t5 = 0; t5 < this.length; ++t5) this.isProtected(t5) || this.setCell(t5, e3);
          else {
            this._combined = {}, this._extendedAttrs = {};
            for (let t5 = 0; t5 < this.length; ++t5) this.setCell(t5, e3);
          }
        }
        copyFrom(e3) {
          this.length !== e3.length ? this._data = new Uint32Array(e3._data) : this._data.set(e3._data), this.length = e3.length, this._combined = {};
          for (const t4 in e3._combined) this._combined[t4] = e3._combined[t4];
          this._extendedAttrs = {};
          for (const t4 in e3._extendedAttrs) this._extendedAttrs[t4] = e3._extendedAttrs[t4];
          this.isWrapped = e3.isWrapped;
        }
        clone() {
          const e3 = new h(0);
          e3._data = new Uint32Array(this._data), e3.length = this.length;
          for (const t4 in this._combined) e3._combined[t4] = this._combined[t4];
          for (const t4 in this._extendedAttrs) e3._extendedAttrs[t4] = this._extendedAttrs[t4];
          return e3.isWrapped = this.isWrapped, e3;
        }
        getTrimmedLength() {
          for (let e3 = this.length - 1; e3 >= 0; --e3) if (4194303 & this._data[3 * e3 + 0]) return e3 + (this._data[3 * e3 + 0] >> 22);
          return 0;
        }
        getNoBgTrimmedLength() {
          for (let e3 = this.length - 1; e3 >= 0; --e3) if (4194303 & this._data[3 * e3 + 0] || 50331648 & this._data[3 * e3 + 2]) return e3 + (this._data[3 * e3 + 0] >> 22);
          return 0;
        }
        copyCellsFrom(e3, t4, i3, s3, r3) {
          const n3 = e3._data;
          if (r3) for (let r4 = s3 - 1; r4 >= 0; r4--) {
            for (let e4 = 0; e4 < 3; e4++) this._data[3 * (i3 + r4) + e4] = n3[3 * (t4 + r4) + e4];
            268435456 & n3[3 * (t4 + r4) + 2] && (this._extendedAttrs[i3 + r4] = e3._extendedAttrs[t4 + r4]);
          }
          else for (let r4 = 0; r4 < s3; r4++) {
            for (let e4 = 0; e4 < 3; e4++) this._data[3 * (i3 + r4) + e4] = n3[3 * (t4 + r4) + e4];
            268435456 & n3[3 * (t4 + r4) + 2] && (this._extendedAttrs[i3 + r4] = e3._extendedAttrs[t4 + r4]);
          }
          const o2 = Object.keys(e3._combined);
          for (let s4 = 0; s4 < o2.length; s4++) {
            const r4 = parseInt(o2[s4], 10);
            r4 >= t4 && (this._combined[r4 - t4 + i3] = e3._combined[r4]);
          }
        }
        translateToString(e3, t4, i3, s3) {
          t4 = t4 ?? 0, i3 = i3 ?? this.length, e3 && (i3 = Math.min(i3, this.getTrimmedLength())), s3 && (s3.length = 0);
          let r3 = "";
          for (; t4 < i3; ) {
            const e4 = this._data[3 * t4 + 0], i4 = 2097151 & e4, a3 = 2097152 & e4 ? this._combined[t4] : i4 ? (0, o.stringFromCodePoint)(i4) : n2.WHITESPACE_CELL_CHAR;
            if (r3 += a3, s3) for (let e5 = 0; e5 < a3.length; ++e5) s3.push(t4);
            t4 += e4 >> 22 || 1;
          }
          return s3 && s3.push(t4), r3;
        }
      }
      t3.BufferLine = h;
    }, 4841: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.getRangeLength = void 0, t3.getRangeLength = function(e3, t4) {
        if (e3.start.y > e3.end.y) throw new Error(`Buffer range end (${e3.end.x}, ${e3.end.y}) cannot be before start (${e3.start.x}, ${e3.start.y})`);
        return t4 * (e3.end.y - e3.start.y) + (e3.end.x - e3.start.x + 1);
      };
    }, 4634: (e2, t3) => {
      function i2(e3, t4, i3) {
        if (t4 === e3.length - 1) return e3[t4].getTrimmedLength();
        const s2 = !e3[t4].hasContent(i3 - 1) && 1 === e3[t4].getWidth(i3 - 1), r2 = 2 === e3[t4 + 1].getWidth(0);
        return s2 && r2 ? i3 - 1 : i3;
      }
      Object.defineProperty(t3, "__esModule", { value: true }), t3.getWrappedLineTrimmedLength = t3.reflowSmallerGetNewLineLengths = t3.reflowLargerApplyNewLayout = t3.reflowLargerCreateNewLayout = t3.reflowLargerGetLinesToRemove = void 0, t3.reflowLargerGetLinesToRemove = function(e3, t4, s2, r2, n2) {
        const o = [];
        for (let a2 = 0; a2 < e3.length - 1; a2++) {
          let h = a2, c2 = e3.get(++h);
          if (!c2.isWrapped) continue;
          const l2 = [e3.get(a2)];
          for (; h < e3.length && c2.isWrapped; ) l2.push(c2), c2 = e3.get(++h);
          if (r2 >= a2 && r2 < h) {
            a2 += l2.length - 1;
            continue;
          }
          let d = 0, _ = i2(l2, d, t4), u2 = 1, f2 = 0;
          for (; u2 < l2.length; ) {
            const e4 = i2(l2, u2, t4), r3 = e4 - f2, o2 = s2 - _, a3 = Math.min(r3, o2);
            l2[d].copyCellsFrom(l2[u2], f2, _, a3, false), _ += a3, _ === s2 && (d++, _ = 0), f2 += a3, f2 === e4 && (u2++, f2 = 0), 0 === _ && 0 !== d && 2 === l2[d - 1].getWidth(s2 - 1) && (l2[d].copyCellsFrom(l2[d - 1], s2 - 1, _++, 1, false), l2[d - 1].setCell(s2 - 1, n2));
          }
          l2[d].replaceCells(_, s2, n2);
          let v2 = 0;
          for (let e4 = l2.length - 1; e4 > 0 && (e4 > d || 0 === l2[e4].getTrimmedLength()); e4--) v2++;
          v2 > 0 && (o.push(a2 + l2.length - v2), o.push(v2)), a2 += l2.length - 1;
        }
        return o;
      }, t3.reflowLargerCreateNewLayout = function(e3, t4) {
        const i3 = [];
        let s2 = 0, r2 = t4[s2], n2 = 0;
        for (let o = 0; o < e3.length; o++) if (r2 === o) {
          const i4 = t4[++s2];
          e3.onDeleteEmitter.fire({ index: o - n2, amount: i4 }), o += i4 - 1, n2 += i4, r2 = t4[++s2];
        } else i3.push(o);
        return { layout: i3, countRemoved: n2 };
      }, t3.reflowLargerApplyNewLayout = function(e3, t4) {
        const i3 = [];
        for (let s2 = 0; s2 < t4.length; s2++) i3.push(e3.get(t4[s2]));
        for (let t5 = 0; t5 < i3.length; t5++) e3.set(t5, i3[t5]);
        e3.length = t4.length;
      }, t3.reflowSmallerGetNewLineLengths = function(e3, t4, s2) {
        const r2 = [], n2 = e3.map((s3, r3) => i2(e3, r3, t4)).reduce((e4, t5) => e4 + t5);
        let o = 0, a2 = 0, h = 0;
        for (; h < n2; ) {
          if (n2 - h < s2) {
            r2.push(n2 - h);
            break;
          }
          o += s2;
          const c2 = i2(e3, a2, t4);
          o > c2 && (o -= c2, a2++);
          const l2 = 2 === e3[a2].getWidth(o - 1);
          l2 && o--;
          const d = l2 ? s2 - 1 : s2;
          r2.push(d), h += d;
        }
        return r2;
      }, t3.getWrappedLineTrimmedLength = i2;
    }, 5295: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferSet = void 0;
      const s2 = i2(8460), r2 = i2(844), n2 = i2(9092);
      class o extends r2.Disposable {
        constructor(e3, t4) {
          super(), this._optionsService = e3, this._bufferService = t4, this._onBufferActivate = this.register(new s2.EventEmitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
        }
        reset() {
          this._normal = new n2.Buffer(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new n2.Buffer(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
        }
        get alt() {
          return this._alt;
        }
        get active() {
          return this._activeBuffer;
        }
        get normal() {
          return this._normal;
        }
        activateNormalBuffer() {
          this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
        }
        activateAltBuffer(e3) {
          this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e3), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
        }
        resize(e3, t4) {
          this._normal.resize(e3, t4), this._alt.resize(e3, t4), this.setupTabStops(e3);
        }
        setupTabStops(e3) {
          this._normal.setupTabStops(e3), this._alt.setupTabStops(e3);
        }
      }
      t3.BufferSet = o;
    }, 511: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CellData = void 0;
      const s2 = i2(482), r2 = i2(643), n2 = i2(3734);
      class o extends n2.AttributeData {
        constructor() {
          super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n2.ExtendedAttrs(), this.combinedData = "";
        }
        static fromCharData(e3) {
          const t4 = new o();
          return t4.setFromCharData(e3), t4;
        }
        isCombined() {
          return 2097152 & this.content;
        }
        getWidth() {
          return this.content >> 22;
        }
        getChars() {
          return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s2.stringFromCodePoint)(2097151 & this.content) : "";
        }
        getCode() {
          return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
        }
        setFromCharData(e3) {
          this.fg = e3[r2.CHAR_DATA_ATTR_INDEX], this.bg = 0;
          let t4 = false;
          if (e3[r2.CHAR_DATA_CHAR_INDEX].length > 2) t4 = true;
          else if (2 === e3[r2.CHAR_DATA_CHAR_INDEX].length) {
            const i3 = e3[r2.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
            if (55296 <= i3 && i3 <= 56319) {
              const s3 = e3[r2.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
              56320 <= s3 && s3 <= 57343 ? this.content = 1024 * (i3 - 55296) + s3 - 56320 + 65536 | e3[r2.CHAR_DATA_WIDTH_INDEX] << 22 : t4 = true;
            } else t4 = true;
          } else this.content = e3[r2.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e3[r2.CHAR_DATA_WIDTH_INDEX] << 22;
          t4 && (this.combinedData = e3[r2.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e3[r2.CHAR_DATA_WIDTH_INDEX] << 22);
        }
        getAsCharData() {
          return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
        }
      }
      t3.CellData = o;
    }, 643: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.WHITESPACE_CELL_CODE = t3.WHITESPACE_CELL_WIDTH = t3.WHITESPACE_CELL_CHAR = t3.NULL_CELL_CODE = t3.NULL_CELL_WIDTH = t3.NULL_CELL_CHAR = t3.CHAR_DATA_CODE_INDEX = t3.CHAR_DATA_WIDTH_INDEX = t3.CHAR_DATA_CHAR_INDEX = t3.CHAR_DATA_ATTR_INDEX = t3.DEFAULT_EXT = t3.DEFAULT_ATTR = t3.DEFAULT_COLOR = void 0, t3.DEFAULT_COLOR = 0, t3.DEFAULT_ATTR = 256 | t3.DEFAULT_COLOR << 9, t3.DEFAULT_EXT = 0, t3.CHAR_DATA_ATTR_INDEX = 0, t3.CHAR_DATA_CHAR_INDEX = 1, t3.CHAR_DATA_WIDTH_INDEX = 2, t3.CHAR_DATA_CODE_INDEX = 3, t3.NULL_CELL_CHAR = "", t3.NULL_CELL_WIDTH = 1, t3.NULL_CELL_CODE = 0, t3.WHITESPACE_CELL_CHAR = " ", t3.WHITESPACE_CELL_WIDTH = 1, t3.WHITESPACE_CELL_CODE = 32;
    }, 4863: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Marker = void 0;
      const s2 = i2(8460), r2 = i2(844);
      class n2 {
        get id() {
          return this._id;
        }
        constructor(e3) {
          this.line = e3, this.isDisposed = false, this._disposables = [], this._id = n2._nextId++, this._onDispose = this.register(new s2.EventEmitter()), this.onDispose = this._onDispose.event;
        }
        dispose() {
          this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), (0, r2.disposeArray)(this._disposables), this._disposables.length = 0);
        }
        register(e3) {
          return this._disposables.push(e3), e3;
        }
      }
      t3.Marker = n2, n2._nextId = 1;
    }, 7116: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DEFAULT_CHARSET = t3.CHARSETS = void 0, t3.CHARSETS = {}, t3.DEFAULT_CHARSET = t3.CHARSETS.B, t3.CHARSETS[0] = { "`": "◆", a: "▒", b: "␉", c: "␌", d: "␍", e: "␊", f: "°", g: "±", h: "␤", i: "␋", j: "┘", k: "┐", l: "┌", m: "└", n: "┼", o: "⎺", p: "⎻", q: "─", r: "⎼", s: "⎽", t: "├", u: "┤", v: "┴", w: "┬", x: "│", y: "≤", z: "≥", "{": "π", "|": "≠", "}": "£", "~": "·" }, t3.CHARSETS.A = { "#": "£" }, t3.CHARSETS.B = void 0, t3.CHARSETS[4] = { "#": "£", "@": "¾", "[": "ij", "\\": "½", "]": "|", "{": "¨", "|": "f", "}": "¼", "~": "´" }, t3.CHARSETS.C = t3.CHARSETS[5] = { "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, t3.CHARSETS.R = { "#": "£", "@": "à", "[": "°", "\\": "ç", "]": "§", "{": "é", "|": "ù", "}": "è", "~": "¨" }, t3.CHARSETS.Q = { "@": "à", "[": "â", "\\": "ç", "]": "ê", "^": "î", "`": "ô", "{": "é", "|": "ù", "}": "è", "~": "û" }, t3.CHARSETS.K = { "@": "§", "[": "Ä", "\\": "Ö", "]": "Ü", "{": "ä", "|": "ö", "}": "ü", "~": "ß" }, t3.CHARSETS.Y = { "#": "£", "@": "§", "[": "°", "\\": "ç", "]": "é", "`": "ù", "{": "à", "|": "ò", "}": "è", "~": "ì" }, t3.CHARSETS.E = t3.CHARSETS[6] = { "@": "Ä", "[": "Æ", "\\": "Ø", "]": "Å", "^": "Ü", "`": "ä", "{": "æ", "|": "ø", "}": "å", "~": "ü" }, t3.CHARSETS.Z = { "#": "£", "@": "§", "[": "¡", "\\": "Ñ", "]": "¿", "{": "°", "|": "ñ", "}": "ç" }, t3.CHARSETS.H = t3.CHARSETS[7] = { "@": "É", "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, t3.CHARSETS["="] = { "#": "ù", "@": "à", "[": "é", "\\": "ç", "]": "ê", "^": "î", _: "è", "`": "ô", "{": "ä", "|": "ö", "}": "ü", "~": "û" };
    }, 2584: (e2, t3) => {
      var i2, s2, r2;
      Object.defineProperty(t3, "__esModule", { value: true }), t3.C1_ESCAPED = t3.C1 = t3.C0 = void 0, function(e3) {
        e3.NUL = "\0", e3.SOH = "", e3.STX = "", e3.ETX = "", e3.EOT = "", e3.ENQ = "", e3.ACK = "", e3.BEL = "\x07", e3.BS = "\b", e3.HT = "	", e3.LF = "\n", e3.VT = "\v", e3.FF = "\f", e3.CR = "\r", e3.SO = "", e3.SI = "", e3.DLE = "", e3.DC1 = "", e3.DC2 = "", e3.DC3 = "", e3.DC4 = "", e3.NAK = "", e3.SYN = "", e3.ETB = "", e3.CAN = "", e3.EM = "", e3.SUB = "", e3.ESC = "\x1B", e3.FS = "", e3.GS = "", e3.RS = "", e3.US = "", e3.SP = " ", e3.DEL = "";
      }(i2 || (t3.C0 = i2 = {})), function(e3) {
        e3.PAD = "", e3.HOP = "", e3.BPH = "", e3.NBH = "", e3.IND = "", e3.NEL = "", e3.SSA = "", e3.ESA = "", e3.HTS = "", e3.HTJ = "", e3.VTS = "", e3.PLD = "", e3.PLU = "", e3.RI = "", e3.SS2 = "", e3.SS3 = "", e3.DCS = "", e3.PU1 = "", e3.PU2 = "", e3.STS = "", e3.CCH = "", e3.MW = "", e3.SPA = "", e3.EPA = "", e3.SOS = "", e3.SGCI = "", e3.SCI = "", e3.CSI = "", e3.ST = "", e3.OSC = "", e3.PM = "", e3.APC = "";
      }(s2 || (t3.C1 = s2 = {})), function(e3) {
        e3.ST = `${i2.ESC}\\`;
      }(r2 || (t3.C1_ESCAPED = r2 = {}));
    }, 7399: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.evaluateKeyboardEvent = void 0;
      const s2 = i2(2584), r2 = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
      t3.evaluateKeyboardEvent = function(e3, t4, i3, n2) {
        const o = { type: 0, cancel: false, key: void 0 }, a2 = (e3.shiftKey ? 1 : 0) | (e3.altKey ? 2 : 0) | (e3.ctrlKey ? 4 : 0) | (e3.metaKey ? 8 : 0);
        switch (e3.keyCode) {
          case 0:
            "UIKeyInputUpArrow" === e3.key ? o.key = t4 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e3.key ? o.key = t4 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D" : "UIKeyInputRightArrow" === e3.key ? o.key = t4 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C" : "UIKeyInputDownArrow" === e3.key && (o.key = t4 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B");
            break;
          case 8:
            o.key = e3.ctrlKey ? "\b" : s2.C0.DEL, e3.altKey && (o.key = s2.C0.ESC + o.key);
            break;
          case 9:
            if (e3.shiftKey) {
              o.key = s2.C0.ESC + "[Z";
              break;
            }
            o.key = s2.C0.HT, o.cancel = true;
            break;
          case 13:
            o.key = e3.altKey ? s2.C0.ESC + s2.C0.CR : s2.C0.CR, o.cancel = true;
            break;
          case 27:
            o.key = s2.C0.ESC, e3.altKey && (o.key = s2.C0.ESC + s2.C0.ESC), o.cancel = true;
            break;
          case 37:
            if (e3.metaKey) break;
            a2 ? (o.key = s2.C0.ESC + "[1;" + (a2 + 1) + "D", o.key === s2.C0.ESC + "[1;3D" && (o.key = s2.C0.ESC + (i3 ? "b" : "[1;5D"))) : o.key = t4 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D";
            break;
          case 39:
            if (e3.metaKey) break;
            a2 ? (o.key = s2.C0.ESC + "[1;" + (a2 + 1) + "C", o.key === s2.C0.ESC + "[1;3C" && (o.key = s2.C0.ESC + (i3 ? "f" : "[1;5C"))) : o.key = t4 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C";
            break;
          case 38:
            if (e3.metaKey) break;
            a2 ? (o.key = s2.C0.ESC + "[1;" + (a2 + 1) + "A", i3 || o.key !== s2.C0.ESC + "[1;3A" || (o.key = s2.C0.ESC + "[1;5A")) : o.key = t4 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A";
            break;
          case 40:
            if (e3.metaKey) break;
            a2 ? (o.key = s2.C0.ESC + "[1;" + (a2 + 1) + "B", i3 || o.key !== s2.C0.ESC + "[1;3B" || (o.key = s2.C0.ESC + "[1;5B")) : o.key = t4 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B";
            break;
          case 45:
            e3.shiftKey || e3.ctrlKey || (o.key = s2.C0.ESC + "[2~");
            break;
          case 46:
            o.key = a2 ? s2.C0.ESC + "[3;" + (a2 + 1) + "~" : s2.C0.ESC + "[3~";
            break;
          case 36:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "H" : t4 ? s2.C0.ESC + "OH" : s2.C0.ESC + "[H";
            break;
          case 35:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "F" : t4 ? s2.C0.ESC + "OF" : s2.C0.ESC + "[F";
            break;
          case 33:
            e3.shiftKey ? o.type = 2 : e3.ctrlKey ? o.key = s2.C0.ESC + "[5;" + (a2 + 1) + "~" : o.key = s2.C0.ESC + "[5~";
            break;
          case 34:
            e3.shiftKey ? o.type = 3 : e3.ctrlKey ? o.key = s2.C0.ESC + "[6;" + (a2 + 1) + "~" : o.key = s2.C0.ESC + "[6~";
            break;
          case 112:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "P" : s2.C0.ESC + "OP";
            break;
          case 113:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "Q" : s2.C0.ESC + "OQ";
            break;
          case 114:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "R" : s2.C0.ESC + "OR";
            break;
          case 115:
            o.key = a2 ? s2.C0.ESC + "[1;" + (a2 + 1) + "S" : s2.C0.ESC + "OS";
            break;
          case 116:
            o.key = a2 ? s2.C0.ESC + "[15;" + (a2 + 1) + "~" : s2.C0.ESC + "[15~";
            break;
          case 117:
            o.key = a2 ? s2.C0.ESC + "[17;" + (a2 + 1) + "~" : s2.C0.ESC + "[17~";
            break;
          case 118:
            o.key = a2 ? s2.C0.ESC + "[18;" + (a2 + 1) + "~" : s2.C0.ESC + "[18~";
            break;
          case 119:
            o.key = a2 ? s2.C0.ESC + "[19;" + (a2 + 1) + "~" : s2.C0.ESC + "[19~";
            break;
          case 120:
            o.key = a2 ? s2.C0.ESC + "[20;" + (a2 + 1) + "~" : s2.C0.ESC + "[20~";
            break;
          case 121:
            o.key = a2 ? s2.C0.ESC + "[21;" + (a2 + 1) + "~" : s2.C0.ESC + "[21~";
            break;
          case 122:
            o.key = a2 ? s2.C0.ESC + "[23;" + (a2 + 1) + "~" : s2.C0.ESC + "[23~";
            break;
          case 123:
            o.key = a2 ? s2.C0.ESC + "[24;" + (a2 + 1) + "~" : s2.C0.ESC + "[24~";
            break;
          default:
            if (!e3.ctrlKey || e3.shiftKey || e3.altKey || e3.metaKey) if (i3 && !n2 || !e3.altKey || e3.metaKey) !i3 || e3.altKey || e3.ctrlKey || e3.shiftKey || !e3.metaKey ? e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && e3.keyCode >= 48 && 1 === e3.key.length ? o.key = e3.key : e3.key && e3.ctrlKey && ("_" === e3.key && (o.key = s2.C0.US), "@" === e3.key && (o.key = s2.C0.NUL)) : 65 === e3.keyCode && (o.type = 1);
            else {
              const t5 = r2[e3.keyCode], i4 = t5?.[e3.shiftKey ? 1 : 0];
              if (i4) o.key = s2.C0.ESC + i4;
              else if (e3.keyCode >= 65 && e3.keyCode <= 90) {
                const t6 = e3.ctrlKey ? e3.keyCode - 64 : e3.keyCode + 32;
                let i5 = String.fromCharCode(t6);
                e3.shiftKey && (i5 = i5.toUpperCase()), o.key = s2.C0.ESC + i5;
              } else if (32 === e3.keyCode) o.key = s2.C0.ESC + (e3.ctrlKey ? s2.C0.NUL : " ");
              else if ("Dead" === e3.key && e3.code.startsWith("Key")) {
                let t6 = e3.code.slice(3, 4);
                e3.shiftKey || (t6 = t6.toLowerCase()), o.key = s2.C0.ESC + t6, o.cancel = true;
              }
            }
            else e3.keyCode >= 65 && e3.keyCode <= 90 ? o.key = String.fromCharCode(e3.keyCode - 64) : 32 === e3.keyCode ? o.key = s2.C0.NUL : e3.keyCode >= 51 && e3.keyCode <= 55 ? o.key = String.fromCharCode(e3.keyCode - 51 + 27) : 56 === e3.keyCode ? o.key = s2.C0.DEL : 219 === e3.keyCode ? o.key = s2.C0.ESC : 220 === e3.keyCode ? o.key = s2.C0.FS : 221 === e3.keyCode && (o.key = s2.C0.GS);
        }
        return o;
      };
    }, 482: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Utf8ToUtf32 = t3.StringToUtf32 = t3.utf32ToString = t3.stringFromCodePoint = void 0, t3.stringFromCodePoint = function(e3) {
        return e3 > 65535 ? (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10)) + String.fromCharCode(e3 % 1024 + 56320)) : String.fromCharCode(e3);
      }, t3.utf32ToString = function(e3, t4 = 0, i2 = e3.length) {
        let s2 = "";
        for (let r2 = t4; r2 < i2; ++r2) {
          let t5 = e3[r2];
          t5 > 65535 ? (t5 -= 65536, s2 += String.fromCharCode(55296 + (t5 >> 10)) + String.fromCharCode(t5 % 1024 + 56320)) : s2 += String.fromCharCode(t5);
        }
        return s2;
      }, t3.StringToUtf32 = class {
        constructor() {
          this._interim = 0;
        }
        clear() {
          this._interim = 0;
        }
        decode(e3, t4) {
          const i2 = e3.length;
          if (!i2) return 0;
          let s2 = 0, r2 = 0;
          if (this._interim) {
            const i3 = e3.charCodeAt(r2++);
            56320 <= i3 && i3 <= 57343 ? t4[s2++] = 1024 * (this._interim - 55296) + i3 - 56320 + 65536 : (t4[s2++] = this._interim, t4[s2++] = i3), this._interim = 0;
          }
          for (let n2 = r2; n2 < i2; ++n2) {
            const r3 = e3.charCodeAt(n2);
            if (55296 <= r3 && r3 <= 56319) {
              if (++n2 >= i2) return this._interim = r3, s2;
              const o = e3.charCodeAt(n2);
              56320 <= o && o <= 57343 ? t4[s2++] = 1024 * (r3 - 55296) + o - 56320 + 65536 : (t4[s2++] = r3, t4[s2++] = o);
            } else 65279 !== r3 && (t4[s2++] = r3);
          }
          return s2;
        }
      }, t3.Utf8ToUtf32 = class {
        constructor() {
          this.interim = new Uint8Array(3);
        }
        clear() {
          this.interim.fill(0);
        }
        decode(e3, t4) {
          const i2 = e3.length;
          if (!i2) return 0;
          let s2, r2, n2, o, a2 = 0, h = 0, c2 = 0;
          if (this.interim[0]) {
            let s3 = false, r3 = this.interim[0];
            r3 &= 192 == (224 & r3) ? 31 : 224 == (240 & r3) ? 15 : 7;
            let n3, o2 = 0;
            for (; (n3 = 63 & this.interim[++o2]) && o2 < 4; ) r3 <<= 6, r3 |= n3;
            const h2 = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, l3 = h2 - o2;
            for (; c2 < l3; ) {
              if (c2 >= i2) return 0;
              if (n3 = e3[c2++], 128 != (192 & n3)) {
                c2--, s3 = true;
                break;
              }
              this.interim[o2++] = n3, r3 <<= 6, r3 |= 63 & n3;
            }
            s3 || (2 === h2 ? r3 < 128 ? c2-- : t4[a2++] = r3 : 3 === h2 ? r3 < 2048 || r3 >= 55296 && r3 <= 57343 || 65279 === r3 || (t4[a2++] = r3) : r3 < 65536 || r3 > 1114111 || (t4[a2++] = r3)), this.interim.fill(0);
          }
          const l2 = i2 - 4;
          let d = c2;
          for (; d < i2; ) {
            for (; !(!(d < l2) || 128 & (s2 = e3[d]) || 128 & (r2 = e3[d + 1]) || 128 & (n2 = e3[d + 2]) || 128 & (o = e3[d + 3])); ) t4[a2++] = s2, t4[a2++] = r2, t4[a2++] = n2, t4[a2++] = o, d += 4;
            if (s2 = e3[d++], s2 < 128) t4[a2++] = s2;
            else if (192 == (224 & s2)) {
              if (d >= i2) return this.interim[0] = s2, a2;
              if (r2 = e3[d++], 128 != (192 & r2)) {
                d--;
                continue;
              }
              if (h = (31 & s2) << 6 | 63 & r2, h < 128) {
                d--;
                continue;
              }
              t4[a2++] = h;
            } else if (224 == (240 & s2)) {
              if (d >= i2) return this.interim[0] = s2, a2;
              if (r2 = e3[d++], 128 != (192 & r2)) {
                d--;
                continue;
              }
              if (d >= i2) return this.interim[0] = s2, this.interim[1] = r2, a2;
              if (n2 = e3[d++], 128 != (192 & n2)) {
                d--;
                continue;
              }
              if (h = (15 & s2) << 12 | (63 & r2) << 6 | 63 & n2, h < 2048 || h >= 55296 && h <= 57343 || 65279 === h) continue;
              t4[a2++] = h;
            } else if (240 == (248 & s2)) {
              if (d >= i2) return this.interim[0] = s2, a2;
              if (r2 = e3[d++], 128 != (192 & r2)) {
                d--;
                continue;
              }
              if (d >= i2) return this.interim[0] = s2, this.interim[1] = r2, a2;
              if (n2 = e3[d++], 128 != (192 & n2)) {
                d--;
                continue;
              }
              if (d >= i2) return this.interim[0] = s2, this.interim[1] = r2, this.interim[2] = n2, a2;
              if (o = e3[d++], 128 != (192 & o)) {
                d--;
                continue;
              }
              if (h = (7 & s2) << 18 | (63 & r2) << 12 | (63 & n2) << 6 | 63 & o, h < 65536 || h > 1114111) continue;
              t4[a2++] = h;
            }
          }
          return a2;
        }
      };
    }, 225: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.UnicodeV6 = void 0;
      const s2 = i2(1480), r2 = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], n2 = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
      let o;
      t3.UnicodeV6 = class {
        constructor() {
          if (this.version = "6", !o) {
            o = new Uint8Array(65536), o.fill(1), o[0] = 0, o.fill(0, 1, 32), o.fill(0, 127, 160), o.fill(2, 4352, 4448), o[9001] = 2, o[9002] = 2, o.fill(2, 11904, 42192), o[12351] = 1, o.fill(2, 44032, 55204), o.fill(2, 63744, 64256), o.fill(2, 65040, 65050), o.fill(2, 65072, 65136), o.fill(2, 65280, 65377), o.fill(2, 65504, 65511);
            for (let e3 = 0; e3 < r2.length; ++e3) o.fill(0, r2[e3][0], r2[e3][1] + 1);
          }
        }
        wcwidth(e3) {
          return e3 < 32 ? 0 : e3 < 127 ? 1 : e3 < 65536 ? o[e3] : function(e4, t4) {
            let i3, s3 = 0, r3 = t4.length - 1;
            if (e4 < t4[0][0] || e4 > t4[r3][1]) return false;
            for (; r3 >= s3; ) if (i3 = s3 + r3 >> 1, e4 > t4[i3][1]) s3 = i3 + 1;
            else {
              if (!(e4 < t4[i3][0])) return true;
              r3 = i3 - 1;
            }
            return false;
          }(e3, n2) ? 0 : e3 >= 131072 && e3 <= 196605 || e3 >= 196608 && e3 <= 262141 ? 2 : 1;
        }
        charProperties(e3, t4) {
          let i3 = this.wcwidth(e3), r3 = 0 === i3 && 0 !== t4;
          if (r3) {
            const e4 = s2.UnicodeService.extractWidth(t4);
            0 === e4 ? r3 = false : e4 > i3 && (i3 = e4);
          }
          return s2.UnicodeService.createPropertyValue(0, i3, r3);
        }
      };
    }, 5981: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.WriteBuffer = void 0;
      const s2 = i2(8460), r2 = i2(844);
      class n2 extends r2.Disposable {
        constructor(e3) {
          super(), this._action = e3, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = false, this._syncCalls = 0, this._didUserInput = false, this._onWriteParsed = this.register(new s2.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event;
        }
        handleUserInput() {
          this._didUserInput = true;
        }
        writeSync(e3, t4) {
          if (void 0 !== t4 && this._syncCalls > t4) return void (this._syncCalls = 0);
          if (this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
          let i3;
          for (this._isSyncWriting = true; i3 = this._writeBuffer.shift(); ) {
            this._action(i3);
            const e4 = this._callbacks.shift();
            e4 && e4();
          }
          this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
        }
        write(e3, t4) {
          if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
          if (!this._writeBuffer.length) {
            if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = false, this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t4), void this._innerWrite();
            setTimeout(() => this._innerWrite());
          }
          this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t4);
        }
        _innerWrite(e3 = 0, t4 = true) {
          const i3 = e3 || Date.now();
          for (; this._writeBuffer.length > this._bufferOffset; ) {
            const e4 = this._writeBuffer[this._bufferOffset], s3 = this._action(e4, t4);
            if (s3) {
              const e5 = (e6) => Date.now() - i3 >= 12 ? setTimeout(() => this._innerWrite(0, e6)) : this._innerWrite(i3, e6);
              return void s3.catch((e6) => (queueMicrotask(() => {
                throw e6;
              }), Promise.resolve(false))).then(e5);
            }
            const r3 = this._callbacks[this._bufferOffset];
            if (r3 && r3(), this._bufferOffset++, this._pendingData -= e4.length, Date.now() - i3 >= 12) break;
          }
          this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
        }
      }
      t3.WriteBuffer = n2;
    }, 5941: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.toRgbString = t3.parseColor = void 0;
      const i2 = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s2 = /^[\da-f]+$/;
      function r2(e3, t4) {
        const i3 = e3.toString(16), s3 = i3.length < 2 ? "0" + i3 : i3;
        switch (t4) {
          case 4:
            return i3[0];
          case 8:
            return s3;
          case 12:
            return (s3 + s3).slice(0, 3);
          default:
            return s3 + s3;
        }
      }
      t3.parseColor = function(e3) {
        if (!e3) return;
        let t4 = e3.toLowerCase();
        if (0 === t4.indexOf("rgb:")) {
          t4 = t4.slice(4);
          const e4 = i2.exec(t4);
          if (e4) {
            const t5 = e4[1] ? 15 : e4[4] ? 255 : e4[7] ? 4095 : 65535;
            return [Math.round(parseInt(e4[1] || e4[4] || e4[7] || e4[10], 16) / t5 * 255), Math.round(parseInt(e4[2] || e4[5] || e4[8] || e4[11], 16) / t5 * 255), Math.round(parseInt(e4[3] || e4[6] || e4[9] || e4[12], 16) / t5 * 255)];
          }
        } else if (0 === t4.indexOf("#") && (t4 = t4.slice(1), s2.exec(t4) && [3, 6, 9, 12].includes(t4.length))) {
          const e4 = t4.length / 3, i3 = [0, 0, 0];
          for (let s3 = 0; s3 < 3; ++s3) {
            const r3 = parseInt(t4.slice(e4 * s3, e4 * s3 + e4), 16);
            i3[s3] = 1 === e4 ? r3 << 4 : 2 === e4 ? r3 : 3 === e4 ? r3 >> 4 : r3 >> 8;
          }
          return i3;
        }
      }, t3.toRgbString = function(e3, t4 = 16) {
        const [i3, s3, n2] = e3;
        return `rgb:${r2(i3, t4)}/${r2(s3, t4)}/${r2(n2, t4)}`;
      };
    }, 5770: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.PAYLOAD_LIMIT = void 0, t3.PAYLOAD_LIMIT = 1e7;
    }, 6351: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DcsHandler = t3.DcsParser = void 0;
      const s2 = i2(482), r2 = i2(8742), n2 = i2(5770), o = [];
      t3.DcsParser = class {
        constructor() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {
          }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
        }
        dispose() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._active = o;
        }
        registerHandler(e3, t4) {
          void 0 === this._handlers[e3] && (this._handlers[e3] = []);
          const i3 = this._handlers[e3];
          return i3.push(t4), { dispose: () => {
            const e4 = i3.indexOf(t4);
            -1 !== e4 && i3.splice(e4, 1);
          } };
        }
        clearHandler(e3) {
          this._handlers[e3] && delete this._handlers[e3];
        }
        setHandlerFallback(e3) {
          this._handlerFb = e3;
        }
        reset() {
          if (this._active.length) for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3) this._active[e3].unhook(false);
          this._stack.paused = false, this._active = o, this._ident = 0;
        }
        hook(e3, t4) {
          if (this.reset(), this._ident = e3, this._active = this._handlers[e3] || o, this._active.length) for (let e4 = this._active.length - 1; e4 >= 0; e4--) this._active[e4].hook(t4);
          else this._handlerFb(this._ident, "HOOK", t4);
        }
        put(e3, t4, i3) {
          if (this._active.length) for (let s3 = this._active.length - 1; s3 >= 0; s3--) this._active[s3].put(e3, t4, i3);
          else this._handlerFb(this._ident, "PUT", (0, s2.utf32ToString)(e3, t4, i3));
        }
        unhook(e3, t4 = true) {
          if (this._active.length) {
            let i3 = false, s3 = this._active.length - 1, r3 = false;
            if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t4, r3 = this._stack.fallThrough, this._stack.paused = false), !r3 && false === i3) {
              for (; s3 >= 0 && (i3 = this._active[s3].unhook(e3), true !== i3); s3--) if (i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
              s3--;
            }
            for (; s3 >= 0; s3--) if (i3 = this._active[s3].unhook(false), i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
          } else this._handlerFb(this._ident, "UNHOOK", e3);
          this._active = o, this._ident = 0;
        }
      };
      const a2 = new r2.Params();
      a2.addParam(0), t3.DcsHandler = class {
        constructor(e3) {
          this._handler = e3, this._data = "", this._params = a2, this._hitLimit = false;
        }
        hook(e3) {
          this._params = e3.length > 1 || e3.params[0] ? e3.clone() : a2, this._data = "", this._hitLimit = false;
        }
        put(e3, t4, i3) {
          this._hitLimit || (this._data += (0, s2.utf32ToString)(e3, t4, i3), this._data.length > n2.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
        }
        unhook(e3) {
          let t4 = false;
          if (this._hitLimit) t4 = false;
          else if (e3 && (t4 = this._handler(this._data, this._params), t4 instanceof Promise)) return t4.then((e4) => (this._params = a2, this._data = "", this._hitLimit = false, e4));
          return this._params = a2, this._data = "", this._hitLimit = false, t4;
        }
      };
    }, 2015: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.EscapeSequenceParser = t3.VT500_TRANSITION_TABLE = t3.TransitionTable = void 0;
      const s2 = i2(844), r2 = i2(8742), n2 = i2(6242), o = i2(6351);
      class a2 {
        constructor(e3) {
          this.table = new Uint8Array(e3);
        }
        setDefault(e3, t4) {
          this.table.fill(e3 << 4 | t4);
        }
        add(e3, t4, i3, s3) {
          this.table[t4 << 8 | e3] = i3 << 4 | s3;
        }
        addMany(e3, t4, i3, s3) {
          for (let r3 = 0; r3 < e3.length; r3++) this.table[t4 << 8 | e3[r3]] = i3 << 4 | s3;
        }
      }
      t3.TransitionTable = a2;
      const h = 160;
      t3.VT500_TRANSITION_TABLE = function() {
        const e3 = new a2(4095), t4 = Array.apply(null, Array(256)).map((e4, t5) => t5), i3 = (e4, i4) => t4.slice(e4, i4), s3 = i3(32, 127), r3 = i3(0, 24);
        r3.push(25), r3.push.apply(r3, i3(28, 32));
        const n3 = i3(0, 14);
        let o2;
        for (o2 in e3.setDefault(1, 0), e3.addMany(s3, 0, 2, 0), n3) e3.addMany([24, 26, 153, 154], o2, 3, 0), e3.addMany(i3(128, 144), o2, 3, 0), e3.addMany(i3(144, 152), o2, 3, 0), e3.add(156, o2, 0, 0), e3.add(27, o2, 11, 1), e3.add(157, o2, 4, 8), e3.addMany([152, 158, 159], o2, 0, 7), e3.add(155, o2, 11, 3), e3.add(144, o2, 11, 9);
        return e3.addMany(r3, 0, 3, 0), e3.addMany(r3, 1, 3, 1), e3.add(127, 1, 0, 1), e3.addMany(r3, 8, 0, 8), e3.addMany(r3, 3, 3, 3), e3.add(127, 3, 0, 3), e3.addMany(r3, 4, 3, 4), e3.add(127, 4, 0, 4), e3.addMany(r3, 6, 3, 6), e3.addMany(r3, 5, 3, 5), e3.add(127, 5, 0, 5), e3.addMany(r3, 2, 3, 2), e3.add(127, 2, 0, 2), e3.add(93, 1, 4, 8), e3.addMany(s3, 8, 5, 8), e3.add(127, 8, 5, 8), e3.addMany([156, 27, 24, 26, 7], 8, 6, 0), e3.addMany(i3(28, 32), 8, 0, 8), e3.addMany([88, 94, 95], 1, 0, 7), e3.addMany(s3, 7, 0, 7), e3.addMany(r3, 7, 0, 7), e3.add(156, 7, 0, 0), e3.add(127, 7, 0, 7), e3.add(91, 1, 11, 3), e3.addMany(i3(64, 127), 3, 7, 0), e3.addMany(i3(48, 60), 3, 8, 4), e3.addMany([60, 61, 62, 63], 3, 9, 4), e3.addMany(i3(48, 60), 4, 8, 4), e3.addMany(i3(64, 127), 4, 7, 0), e3.addMany([60, 61, 62, 63], 4, 0, 6), e3.addMany(i3(32, 64), 6, 0, 6), e3.add(127, 6, 0, 6), e3.addMany(i3(64, 127), 6, 0, 0), e3.addMany(i3(32, 48), 3, 9, 5), e3.addMany(i3(32, 48), 5, 9, 5), e3.addMany(i3(48, 64), 5, 0, 6), e3.addMany(i3(64, 127), 5, 7, 0), e3.addMany(i3(32, 48), 4, 9, 5), e3.addMany(i3(32, 48), 1, 9, 2), e3.addMany(i3(32, 48), 2, 9, 2), e3.addMany(i3(48, 127), 2, 10, 0), e3.addMany(i3(48, 80), 1, 10, 0), e3.addMany(i3(81, 88), 1, 10, 0), e3.addMany([89, 90, 92], 1, 10, 0), e3.addMany(i3(96, 127), 1, 10, 0), e3.add(80, 1, 11, 9), e3.addMany(r3, 9, 0, 9), e3.add(127, 9, 0, 9), e3.addMany(i3(28, 32), 9, 0, 9), e3.addMany(i3(32, 48), 9, 9, 12), e3.addMany(i3(48, 60), 9, 8, 10), e3.addMany([60, 61, 62, 63], 9, 9, 10), e3.addMany(r3, 11, 0, 11), e3.addMany(i3(32, 128), 11, 0, 11), e3.addMany(i3(28, 32), 11, 0, 11), e3.addMany(r3, 10, 0, 10), e3.add(127, 10, 0, 10), e3.addMany(i3(28, 32), 10, 0, 10), e3.addMany(i3(48, 60), 10, 8, 10), e3.addMany([60, 61, 62, 63], 10, 0, 11), e3.addMany(i3(32, 48), 10, 9, 12), e3.addMany(r3, 12, 0, 12), e3.add(127, 12, 0, 12), e3.addMany(i3(28, 32), 12, 0, 12), e3.addMany(i3(32, 48), 12, 9, 12), e3.addMany(i3(48, 64), 12, 0, 11), e3.addMany(i3(64, 127), 12, 12, 13), e3.addMany(i3(64, 127), 10, 12, 13), e3.addMany(i3(64, 127), 9, 12, 13), e3.addMany(r3, 13, 13, 13), e3.addMany(s3, 13, 13, 13), e3.add(127, 13, 0, 13), e3.addMany([27, 156, 24, 26], 13, 14, 0), e3.add(h, 0, 2, 0), e3.add(h, 8, 5, 8), e3.add(h, 6, 0, 6), e3.add(h, 11, 0, 11), e3.add(h, 13, 13, 13), e3;
      }();
      class c2 extends s2.Disposable {
        constructor(e3 = t3.VT500_TRANSITION_TABLE) {
          super(), this._transitions = e3, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new r2.Params(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e4, t4, i3) => {
          }, this._executeHandlerFb = (e4) => {
          }, this._csiHandlerFb = (e4, t4) => {
          }, this._escHandlerFb = (e4) => {
          }, this._errorHandlerFb = (e4) => e4, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this.register((0, s2.toDisposable)(() => {
            this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
          })), this._oscParser = this.register(new n2.OscParser()), this._dcsParser = this.register(new o.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
        }
        _identifier(e3, t4 = [64, 126]) {
          let i3 = 0;
          if (e3.prefix) {
            if (e3.prefix.length > 1) throw new Error("only one byte as prefix supported");
            if (i3 = e3.prefix.charCodeAt(0), i3 && 60 > i3 || i3 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
          }
          if (e3.intermediates) {
            if (e3.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
            for (let t5 = 0; t5 < e3.intermediates.length; ++t5) {
              const s4 = e3.intermediates.charCodeAt(t5);
              if (32 > s4 || s4 > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
              i3 <<= 8, i3 |= s4;
            }
          }
          if (1 !== e3.final.length) throw new Error("final must be a single byte");
          const s3 = e3.final.charCodeAt(0);
          if (t4[0] > s3 || s3 > t4[1]) throw new Error(`final must be in range ${t4[0]} .. ${t4[1]}`);
          return i3 <<= 8, i3 |= s3, i3;
        }
        identToString(e3) {
          const t4 = [];
          for (; e3; ) t4.push(String.fromCharCode(255 & e3)), e3 >>= 8;
          return t4.reverse().join("");
        }
        setPrintHandler(e3) {
          this._printHandler = e3;
        }
        clearPrintHandler() {
          this._printHandler = this._printHandlerFb;
        }
        registerEscHandler(e3, t4) {
          const i3 = this._identifier(e3, [48, 126]);
          void 0 === this._escHandlers[i3] && (this._escHandlers[i3] = []);
          const s3 = this._escHandlers[i3];
          return s3.push(t4), { dispose: () => {
            const e4 = s3.indexOf(t4);
            -1 !== e4 && s3.splice(e4, 1);
          } };
        }
        clearEscHandler(e3) {
          this._escHandlers[this._identifier(e3, [48, 126])] && delete this._escHandlers[this._identifier(e3, [48, 126])];
        }
        setEscHandlerFallback(e3) {
          this._escHandlerFb = e3;
        }
        setExecuteHandler(e3, t4) {
          this._executeHandlers[e3.charCodeAt(0)] = t4;
        }
        clearExecuteHandler(e3) {
          this._executeHandlers[e3.charCodeAt(0)] && delete this._executeHandlers[e3.charCodeAt(0)];
        }
        setExecuteHandlerFallback(e3) {
          this._executeHandlerFb = e3;
        }
        registerCsiHandler(e3, t4) {
          const i3 = this._identifier(e3);
          void 0 === this._csiHandlers[i3] && (this._csiHandlers[i3] = []);
          const s3 = this._csiHandlers[i3];
          return s3.push(t4), { dispose: () => {
            const e4 = s3.indexOf(t4);
            -1 !== e4 && s3.splice(e4, 1);
          } };
        }
        clearCsiHandler(e3) {
          this._csiHandlers[this._identifier(e3)] && delete this._csiHandlers[this._identifier(e3)];
        }
        setCsiHandlerFallback(e3) {
          this._csiHandlerFb = e3;
        }
        registerDcsHandler(e3, t4) {
          return this._dcsParser.registerHandler(this._identifier(e3), t4);
        }
        clearDcsHandler(e3) {
          this._dcsParser.clearHandler(this._identifier(e3));
        }
        setDcsHandlerFallback(e3) {
          this._dcsParser.setHandlerFallback(e3);
        }
        registerOscHandler(e3, t4) {
          return this._oscParser.registerHandler(e3, t4);
        }
        clearOscHandler(e3) {
          this._oscParser.clearHandler(e3);
        }
        setOscHandlerFallback(e3) {
          this._oscParser.setHandlerFallback(e3);
        }
        setErrorHandler(e3) {
          this._errorHandler = e3;
        }
        clearErrorHandler() {
          this._errorHandler = this._errorHandlerFb;
        }
        reset() {
          this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
        }
        _preserveStack(e3, t4, i3, s3, r3) {
          this._parseStack.state = e3, this._parseStack.handlers = t4, this._parseStack.handlerPos = i3, this._parseStack.transition = s3, this._parseStack.chunkPos = r3;
        }
        parse(e3, t4, i3) {
          let s3, r3 = 0, n3 = 0, o2 = 0;
          if (this._parseStack.state) if (2 === this._parseStack.state) this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1;
          else {
            if (void 0 === i3 || 1 === this._parseStack.state) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
            const t5 = this._parseStack.handlers;
            let n4 = this._parseStack.handlerPos - 1;
            switch (this._parseStack.state) {
              case 3:
                if (false === i3 && n4 > -1) {
                  for (; n4 >= 0 && (s3 = t5[n4](this._params), true !== s3); n4--) if (s3 instanceof Promise) return this._parseStack.handlerPos = n4, s3;
                }
                this._parseStack.handlers = [];
                break;
              case 4:
                if (false === i3 && n4 > -1) {
                  for (; n4 >= 0 && (s3 = t5[n4](), true !== s3); n4--) if (s3 instanceof Promise) return this._parseStack.handlerPos = n4, s3;
                }
                this._parseStack.handlers = [];
                break;
              case 6:
                if (r3 = e3[this._parseStack.chunkPos], s3 = this._dcsParser.unhook(24 !== r3 && 26 !== r3, i3), s3) return s3;
                27 === r3 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                break;
              case 5:
                if (r3 = e3[this._parseStack.chunkPos], s3 = this._oscParser.end(24 !== r3 && 26 !== r3, i3), s3) return s3;
                27 === r3 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
            }
            this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
          }
          for (let i4 = o2; i4 < t4; ++i4) {
            switch (r3 = e3[i4], n3 = this._transitions.table[this.currentState << 8 | (r3 < 160 ? r3 : h)], n3 >> 4) {
              case 2:
                for (let s4 = i4 + 1; ; ++s4) {
                  if (s4 >= t4 || (r3 = e3[s4]) < 32 || r3 > 126 && r3 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t4 || (r3 = e3[s4]) < 32 || r3 > 126 && r3 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t4 || (r3 = e3[s4]) < 32 || r3 > 126 && r3 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                  if (++s4 >= t4 || (r3 = e3[s4]) < 32 || r3 > 126 && r3 < h) {
                    this._printHandler(e3, i4, s4), i4 = s4 - 1;
                    break;
                  }
                }
                break;
              case 3:
                this._executeHandlers[r3] ? this._executeHandlers[r3]() : this._executeHandlerFb(r3), this.precedingJoinState = 0;
                break;
              case 0:
                break;
              case 1:
                if (this._errorHandler({ position: i4, code: r3, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
                break;
              case 7:
                const o3 = this._csiHandlers[this._collect << 8 | r3];
                let a3 = o3 ? o3.length - 1 : -1;
                for (; a3 >= 0 && (s3 = o3[a3](this._params), true !== s3); a3--) if (s3 instanceof Promise) return this._preserveStack(3, o3, a3, n3, i4), s3;
                a3 < 0 && this._csiHandlerFb(this._collect << 8 | r3, this._params), this.precedingJoinState = 0;
                break;
              case 8:
                do {
                  switch (r3) {
                    case 59:
                      this._params.addParam(0);
                      break;
                    case 58:
                      this._params.addSubParam(-1);
                      break;
                    default:
                      this._params.addDigit(r3 - 48);
                  }
                } while (++i4 < t4 && (r3 = e3[i4]) > 47 && r3 < 60);
                i4--;
                break;
              case 9:
                this._collect <<= 8, this._collect |= r3;
                break;
              case 10:
                const c3 = this._escHandlers[this._collect << 8 | r3];
                let l2 = c3 ? c3.length - 1 : -1;
                for (; l2 >= 0 && (s3 = c3[l2](), true !== s3); l2--) if (s3 instanceof Promise) return this._preserveStack(4, c3, l2, n3, i4), s3;
                l2 < 0 && this._escHandlerFb(this._collect << 8 | r3), this.precedingJoinState = 0;
                break;
              case 11:
                this._params.reset(), this._params.addParam(0), this._collect = 0;
                break;
              case 12:
                this._dcsParser.hook(this._collect << 8 | r3, this._params);
                break;
              case 13:
                for (let s4 = i4 + 1; ; ++s4) if (s4 >= t4 || 24 === (r3 = e3[s4]) || 26 === r3 || 27 === r3 || r3 > 127 && r3 < h) {
                  this._dcsParser.put(e3, i4, s4), i4 = s4 - 1;
                  break;
                }
                break;
              case 14:
                if (s3 = this._dcsParser.unhook(24 !== r3 && 26 !== r3), s3) return this._preserveStack(6, [], 0, n3, i4), s3;
                27 === r3 && (n3 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
                break;
              case 4:
                this._oscParser.start();
                break;
              case 5:
                for (let s4 = i4 + 1; ; s4++) if (s4 >= t4 || (r3 = e3[s4]) < 32 || r3 > 127 && r3 < h) {
                  this._oscParser.put(e3, i4, s4), i4 = s4 - 1;
                  break;
                }
                break;
              case 6:
                if (s3 = this._oscParser.end(24 !== r3 && 26 !== r3), s3) return this._preserveStack(5, [], 0, n3, i4), s3;
                27 === r3 && (n3 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
            }
            this.currentState = 15 & n3;
          }
        }
      }
      t3.EscapeSequenceParser = c2;
    }, 6242: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.OscHandler = t3.OscParser = void 0;
      const s2 = i2(5770), r2 = i2(482), n2 = [];
      t3.OscParser = class {
        constructor() {
          this._state = 0, this._active = n2, this._id = -1, this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
        }
        registerHandler(e3, t4) {
          void 0 === this._handlers[e3] && (this._handlers[e3] = []);
          const i3 = this._handlers[e3];
          return i3.push(t4), { dispose: () => {
            const e4 = i3.indexOf(t4);
            -1 !== e4 && i3.splice(e4, 1);
          } };
        }
        clearHandler(e3) {
          this._handlers[e3] && delete this._handlers[e3];
        }
        setHandlerFallback(e3) {
          this._handlerFb = e3;
        }
        dispose() {
          this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
          }, this._active = n2;
        }
        reset() {
          if (2 === this._state) for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3) this._active[e3].end(false);
          this._stack.paused = false, this._active = n2, this._id = -1, this._state = 0;
        }
        _start() {
          if (this._active = this._handlers[this._id] || n2, this._active.length) for (let e3 = this._active.length - 1; e3 >= 0; e3--) this._active[e3].start();
          else this._handlerFb(this._id, "START");
        }
        _put(e3, t4, i3) {
          if (this._active.length) for (let s3 = this._active.length - 1; s3 >= 0; s3--) this._active[s3].put(e3, t4, i3);
          else this._handlerFb(this._id, "PUT", (0, r2.utf32ToString)(e3, t4, i3));
        }
        start() {
          this.reset(), this._state = 1;
        }
        put(e3, t4, i3) {
          if (3 !== this._state) {
            if (1 === this._state) for (; t4 < i3; ) {
              const i4 = e3[t4++];
              if (59 === i4) {
                this._state = 2, this._start();
                break;
              }
              if (i4 < 48 || 57 < i4) return void (this._state = 3);
              -1 === this._id && (this._id = 0), this._id = 10 * this._id + i4 - 48;
            }
            2 === this._state && i3 - t4 > 0 && this._put(e3, t4, i3);
          }
        }
        end(e3, t4 = true) {
          if (0 !== this._state) {
            if (3 !== this._state) if (1 === this._state && this._start(), this._active.length) {
              let i3 = false, s3 = this._active.length - 1, r3 = false;
              if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t4, r3 = this._stack.fallThrough, this._stack.paused = false), !r3 && false === i3) {
                for (; s3 >= 0 && (i3 = this._active[s3].end(e3), true !== i3); s3--) if (i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                s3--;
              }
              for (; s3 >= 0; s3--) if (i3 = this._active[s3].end(false), i3 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
            } else this._handlerFb(this._id, "END", e3);
            this._active = n2, this._id = -1, this._state = 0;
          }
        }
      }, t3.OscHandler = class {
        constructor(e3) {
          this._handler = e3, this._data = "", this._hitLimit = false;
        }
        start() {
          this._data = "", this._hitLimit = false;
        }
        put(e3, t4, i3) {
          this._hitLimit || (this._data += (0, r2.utf32ToString)(e3, t4, i3), this._data.length > s2.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
        }
        end(e3) {
          let t4 = false;
          if (this._hitLimit) t4 = false;
          else if (e3 && (t4 = this._handler(this._data), t4 instanceof Promise)) return t4.then((e4) => (this._data = "", this._hitLimit = false, e4));
          return this._data = "", this._hitLimit = false, t4;
        }
      };
    }, 8742: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.Params = void 0;
      const i2 = 2147483647;
      class s2 {
        static fromArray(e3) {
          const t4 = new s2();
          if (!e3.length) return t4;
          for (let i3 = Array.isArray(e3[0]) ? 1 : 0; i3 < e3.length; ++i3) {
            const s3 = e3[i3];
            if (Array.isArray(s3)) for (let e4 = 0; e4 < s3.length; ++e4) t4.addSubParam(s3[e4]);
            else t4.addParam(s3);
          }
          return t4;
        }
        constructor(e3 = 32, t4 = 32) {
          if (this.maxLength = e3, this.maxSubParamsLength = t4, t4 > 256) throw new Error("maxSubParamsLength must not be greater than 256");
          this.params = new Int32Array(e3), this.length = 0, this._subParams = new Int32Array(t4), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e3), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
        }
        clone() {
          const e3 = new s2(this.maxLength, this.maxSubParamsLength);
          return e3.params.set(this.params), e3.length = this.length, e3._subParams.set(this._subParams), e3._subParamsLength = this._subParamsLength, e3._subParamsIdx.set(this._subParamsIdx), e3._rejectDigits = this._rejectDigits, e3._rejectSubDigits = this._rejectSubDigits, e3._digitIsSub = this._digitIsSub, e3;
        }
        toArray() {
          const e3 = [];
          for (let t4 = 0; t4 < this.length; ++t4) {
            e3.push(this.params[t4]);
            const i3 = this._subParamsIdx[t4] >> 8, s3 = 255 & this._subParamsIdx[t4];
            s3 - i3 > 0 && e3.push(Array.prototype.slice.call(this._subParams, i3, s3));
          }
          return e3;
        }
        reset() {
          this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
        }
        addParam(e3) {
          if (this._digitIsSub = false, this.length >= this.maxLength) this._rejectDigits = true;
          else {
            if (e3 < -1) throw new Error("values lesser than -1 are not allowed");
            this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e3 > i2 ? i2 : e3;
          }
        }
        addSubParam(e3) {
          if (this._digitIsSub = true, this.length) if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = true;
          else {
            if (e3 < -1) throw new Error("values lesser than -1 are not allowed");
            this._subParams[this._subParamsLength++] = e3 > i2 ? i2 : e3, this._subParamsIdx[this.length - 1]++;
          }
        }
        hasSubParams(e3) {
          return (255 & this._subParamsIdx[e3]) - (this._subParamsIdx[e3] >> 8) > 0;
        }
        getSubParams(e3) {
          const t4 = this._subParamsIdx[e3] >> 8, i3 = 255 & this._subParamsIdx[e3];
          return i3 - t4 > 0 ? this._subParams.subarray(t4, i3) : null;
        }
        getSubParamsAll() {
          const e3 = {};
          for (let t4 = 0; t4 < this.length; ++t4) {
            const i3 = this._subParamsIdx[t4] >> 8, s3 = 255 & this._subParamsIdx[t4];
            s3 - i3 > 0 && (e3[t4] = this._subParams.slice(i3, s3));
          }
          return e3;
        }
        addDigit(e3) {
          let t4;
          if (this._rejectDigits || !(t4 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
          const s3 = this._digitIsSub ? this._subParams : this.params, r2 = s3[t4 - 1];
          s3[t4 - 1] = ~r2 ? Math.min(10 * r2 + e3, i2) : e3;
        }
      }
      t3.Params = s2;
    }, 5741: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.AddonManager = void 0, t3.AddonManager = class {
        constructor() {
          this._addons = [];
        }
        dispose() {
          for (let e3 = this._addons.length - 1; e3 >= 0; e3--) this._addons[e3].instance.dispose();
        }
        loadAddon(e3, t4) {
          const i2 = { instance: t4, dispose: t4.dispose, isDisposed: false };
          this._addons.push(i2), t4.dispose = () => this._wrappedAddonDispose(i2), t4.activate(e3);
        }
        _wrappedAddonDispose(e3) {
          if (e3.isDisposed) return;
          let t4 = -1;
          for (let i2 = 0; i2 < this._addons.length; i2++) if (this._addons[i2] === e3) {
            t4 = i2;
            break;
          }
          if (-1 === t4) throw new Error("Could not dispose an addon that has not been loaded");
          e3.isDisposed = true, e3.dispose.apply(e3.instance), this._addons.splice(t4, 1);
        }
      };
    }, 8771: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferApiView = void 0;
      const s2 = i2(3785), r2 = i2(511);
      t3.BufferApiView = class {
        constructor(e3, t4) {
          this._buffer = e3, this.type = t4;
        }
        init(e3) {
          return this._buffer = e3, this;
        }
        get cursorY() {
          return this._buffer.y;
        }
        get cursorX() {
          return this._buffer.x;
        }
        get viewportY() {
          return this._buffer.ydisp;
        }
        get baseY() {
          return this._buffer.ybase;
        }
        get length() {
          return this._buffer.lines.length;
        }
        getLine(e3) {
          const t4 = this._buffer.lines.get(e3);
          if (t4) return new s2.BufferLineApiView(t4);
        }
        getNullCell() {
          return new r2.CellData();
        }
      };
    }, 3785: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferLineApiView = void 0;
      const s2 = i2(511);
      t3.BufferLineApiView = class {
        constructor(e3) {
          this._line = e3;
        }
        get isWrapped() {
          return this._line.isWrapped;
        }
        get length() {
          return this._line.length;
        }
        getCell(e3, t4) {
          if (!(e3 < 0 || e3 >= this._line.length)) return t4 ? (this._line.loadCell(e3, t4), t4) : this._line.loadCell(e3, new s2.CellData());
        }
        translateToString(e3, t4, i3) {
          return this._line.translateToString(e3, t4, i3);
        }
      };
    }, 8285: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferNamespaceApi = void 0;
      const s2 = i2(8771), r2 = i2(8460), n2 = i2(844);
      class o extends n2.Disposable {
        constructor(e3) {
          super(), this._core = e3, this._onBufferChange = this.register(new r2.EventEmitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new s2.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s2.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
        }
        get active() {
          if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
          if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
          throw new Error("Active buffer is neither normal nor alternate");
        }
        get normal() {
          return this._normal.init(this._core.buffers.normal);
        }
        get alternate() {
          return this._alternate.init(this._core.buffers.alt);
        }
      }
      t3.BufferNamespaceApi = o;
    }, 7975: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.ParserApi = void 0, t3.ParserApi = class {
        constructor(e3) {
          this._core = e3;
        }
        registerCsiHandler(e3, t4) {
          return this._core.registerCsiHandler(e3, (e4) => t4(e4.toArray()));
        }
        addCsiHandler(e3, t4) {
          return this.registerCsiHandler(e3, t4);
        }
        registerDcsHandler(e3, t4) {
          return this._core.registerDcsHandler(e3, (e4, i2) => t4(e4, i2.toArray()));
        }
        addDcsHandler(e3, t4) {
          return this.registerDcsHandler(e3, t4);
        }
        registerEscHandler(e3, t4) {
          return this._core.registerEscHandler(e3, t4);
        }
        addEscHandler(e3, t4) {
          return this.registerEscHandler(e3, t4);
        }
        registerOscHandler(e3, t4) {
          return this._core.registerOscHandler(e3, t4);
        }
        addOscHandler(e3, t4) {
          return this.registerOscHandler(e3, t4);
        }
      };
    }, 7090: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.UnicodeApi = void 0, t3.UnicodeApi = class {
        constructor(e3) {
          this._core = e3;
        }
        register(e3) {
          this._core.unicodeService.register(e3);
        }
        get versions() {
          return this._core.unicodeService.versions;
        }
        get activeVersion() {
          return this._core.unicodeService.activeVersion;
        }
        set activeVersion(e3) {
          this._core.unicodeService.activeVersion = e3;
        }
      };
    }, 744: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.BufferService = t3.MINIMUM_ROWS = t3.MINIMUM_COLS = void 0;
      const n2 = i2(8460), o = i2(844), a2 = i2(5295), h = i2(2585);
      t3.MINIMUM_COLS = 2, t3.MINIMUM_ROWS = 1;
      let c2 = t3.BufferService = class extends o.Disposable {
        get buffer() {
          return this.buffers.active;
        }
        constructor(e3) {
          super(), this.isUserScrolling = false, this._onResize = this.register(new n2.EventEmitter()), this.onResize = this._onResize.event, this._onScroll = this.register(new n2.EventEmitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(e3.rawOptions.cols || 0, t3.MINIMUM_COLS), this.rows = Math.max(e3.rawOptions.rows || 0, t3.MINIMUM_ROWS), this.buffers = this.register(new a2.BufferSet(e3, this));
        }
        resize(e3, t4) {
          this.cols = e3, this.rows = t4, this.buffers.resize(e3, t4), this._onResize.fire({ cols: e3, rows: t4 });
        }
        reset() {
          this.buffers.reset(), this.isUserScrolling = false;
        }
        scroll(e3, t4 = false) {
          const i3 = this.buffer;
          let s3;
          s3 = this._cachedBlankLine, s3 && s3.length === this.cols && s3.getFg(0) === e3.fg && s3.getBg(0) === e3.bg || (s3 = i3.getBlankLine(e3, t4), this._cachedBlankLine = s3), s3.isWrapped = t4;
          const r3 = i3.ybase + i3.scrollTop, n3 = i3.ybase + i3.scrollBottom;
          if (0 === i3.scrollTop) {
            const e4 = i3.lines.isFull;
            n3 === i3.lines.length - 1 ? e4 ? i3.lines.recycle().copyFrom(s3) : i3.lines.push(s3.clone()) : i3.lines.splice(n3 + 1, 0, s3.clone()), e4 ? this.isUserScrolling && (i3.ydisp = Math.max(i3.ydisp - 1, 0)) : (i3.ybase++, this.isUserScrolling || i3.ydisp++);
          } else {
            const e4 = n3 - r3 + 1;
            i3.lines.shiftElements(r3 + 1, e4 - 1, -1), i3.lines.set(n3, s3.clone());
          }
          this.isUserScrolling || (i3.ydisp = i3.ybase), this._onScroll.fire(i3.ydisp);
        }
        scrollLines(e3, t4, i3) {
          const s3 = this.buffer;
          if (e3 < 0) {
            if (0 === s3.ydisp) return;
            this.isUserScrolling = true;
          } else e3 + s3.ydisp >= s3.ybase && (this.isUserScrolling = false);
          const r3 = s3.ydisp;
          s3.ydisp = Math.max(Math.min(s3.ydisp + e3, s3.ybase), 0), r3 !== s3.ydisp && (t4 || this._onScroll.fire(s3.ydisp));
        }
      };
      t3.BufferService = c2 = s2([r2(0, h.IOptionsService)], c2);
    }, 7994: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CharsetService = void 0, t3.CharsetService = class {
        constructor() {
          this.glevel = 0, this._charsets = [];
        }
        reset() {
          this.charset = void 0, this._charsets = [], this.glevel = 0;
        }
        setgLevel(e3) {
          this.glevel = e3, this.charset = this._charsets[e3];
        }
        setgCharset(e3, t4) {
          this._charsets[e3] = t4, this.glevel === e3 && (this.charset = t4);
        }
      };
    }, 1753: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CoreMouseService = void 0;
      const n2 = i2(2585), o = i2(8460), a2 = i2(844), h = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (e3) => 4 !== e3.button && 1 === e3.action && (e3.ctrl = false, e3.alt = false, e3.shift = false, true) }, VT200: { events: 19, restrict: (e3) => 32 !== e3.action }, DRAG: { events: 23, restrict: (e3) => 32 !== e3.action || 3 !== e3.button }, ANY: { events: 31, restrict: (e3) => true } };
      function c2(e3, t4) {
        let i3 = (e3.ctrl ? 16 : 0) | (e3.shift ? 4 : 0) | (e3.alt ? 8 : 0);
        return 4 === e3.button ? (i3 |= 64, i3 |= e3.action) : (i3 |= 3 & e3.button, 4 & e3.button && (i3 |= 64), 8 & e3.button && (i3 |= 128), 32 === e3.action ? i3 |= 32 : 0 !== e3.action || t4 || (i3 |= 3)), i3;
      }
      const l2 = String.fromCharCode, d = { DEFAULT: (e3) => {
        const t4 = [c2(e3, false) + 32, e3.col + 32, e3.row + 32];
        return t4[0] > 255 || t4[1] > 255 || t4[2] > 255 ? "" : `\x1B[M${l2(t4[0])}${l2(t4[1])}${l2(t4[2])}`;
      }, SGR: (e3) => {
        const t4 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
        return `\x1B[<${c2(e3, true)};${e3.col};${e3.row}${t4}`;
      }, SGR_PIXELS: (e3) => {
        const t4 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
        return `\x1B[<${c2(e3, true)};${e3.x};${e3.y}${t4}`;
      } };
      let _ = t3.CoreMouseService = class extends a2.Disposable {
        constructor(e3, t4) {
          super(), this._bufferService = e3, this._coreService = t4, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new o.EventEmitter()), this.onProtocolChange = this._onProtocolChange.event;
          for (const e4 of Object.keys(h)) this.addProtocol(e4, h[e4]);
          for (const e4 of Object.keys(d)) this.addEncoding(e4, d[e4]);
          this.reset();
        }
        addProtocol(e3, t4) {
          this._protocols[e3] = t4;
        }
        addEncoding(e3, t4) {
          this._encodings[e3] = t4;
        }
        get activeProtocol() {
          return this._activeProtocol;
        }
        get areMouseEventsActive() {
          return 0 !== this._protocols[this._activeProtocol].events;
        }
        set activeProtocol(e3) {
          if (!this._protocols[e3]) throw new Error(`unknown protocol "${e3}"`);
          this._activeProtocol = e3, this._onProtocolChange.fire(this._protocols[e3].events);
        }
        get activeEncoding() {
          return this._activeEncoding;
        }
        set activeEncoding(e3) {
          if (!this._encodings[e3]) throw new Error(`unknown encoding "${e3}"`);
          this._activeEncoding = e3;
        }
        reset() {
          this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
        }
        triggerMouseEvent(e3) {
          if (e3.col < 0 || e3.col >= this._bufferService.cols || e3.row < 0 || e3.row >= this._bufferService.rows) return false;
          if (4 === e3.button && 32 === e3.action) return false;
          if (3 === e3.button && 32 !== e3.action) return false;
          if (4 !== e3.button && (2 === e3.action || 3 === e3.action)) return false;
          if (e3.col++, e3.row++, 32 === e3.action && this._lastEvent && this._equalEvents(this._lastEvent, e3, "SGR_PIXELS" === this._activeEncoding)) return false;
          if (!this._protocols[this._activeProtocol].restrict(e3)) return false;
          const t4 = this._encodings[this._activeEncoding](e3);
          return t4 && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t4) : this._coreService.triggerDataEvent(t4, true)), this._lastEvent = e3, true;
        }
        explainEvents(e3) {
          return { down: !!(1 & e3), up: !!(2 & e3), drag: !!(4 & e3), move: !!(8 & e3), wheel: !!(16 & e3) };
        }
        _equalEvents(e3, t4, i3) {
          if (i3) {
            if (e3.x !== t4.x) return false;
            if (e3.y !== t4.y) return false;
          } else {
            if (e3.col !== t4.col) return false;
            if (e3.row !== t4.row) return false;
          }
          return e3.button === t4.button && e3.action === t4.action && e3.ctrl === t4.ctrl && e3.alt === t4.alt && e3.shift === t4.shift;
        }
      };
      t3.CoreMouseService = _ = s2([r2(0, n2.IBufferService), r2(1, n2.ICoreService)], _);
    }, 6975: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.CoreService = void 0;
      const n2 = i2(1439), o = i2(8460), a2 = i2(844), h = i2(2585), c2 = Object.freeze({ insertMode: false }), l2 = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, origin: false, reverseWraparound: false, sendFocus: false, wraparound: true });
      let d = t3.CoreService = class extends a2.Disposable {
        constructor(e3, t4, i3) {
          super(), this._bufferService = e3, this._logService = t4, this._optionsService = i3, this.isCursorInitialized = false, this.isCursorHidden = false, this._onData = this.register(new o.EventEmitter()), this.onData = this._onData.event, this._onUserInput = this.register(new o.EventEmitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new o.EventEmitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new o.EventEmitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n2.clone)(c2), this.decPrivateModes = (0, n2.clone)(l2);
        }
        reset() {
          this.modes = (0, n2.clone)(c2), this.decPrivateModes = (0, n2.clone)(l2);
        }
        triggerDataEvent(e3, t4 = false) {
          if (this._optionsService.rawOptions.disableStdin) return;
          const i3 = this._bufferService.buffer;
          t4 && this._optionsService.rawOptions.scrollOnUserInput && i3.ybase !== i3.ydisp && this._onRequestScrollToBottom.fire(), t4 && this._onUserInput.fire(), this._logService.debug(`sending data "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onData.fire(e3);
        }
        triggerBinaryEvent(e3) {
          this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onBinary.fire(e3));
        }
      };
      t3.CoreService = d = s2([r2(0, h.IBufferService), r2(1, h.ILogService), r2(2, h.IOptionsService)], d);
    }, 9074: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.DecorationService = void 0;
      const s2 = i2(8055), r2 = i2(8460), n2 = i2(844), o = i2(6106);
      let a2 = 0, h = 0;
      class c2 extends n2.Disposable {
        get decorations() {
          return this._decorations.values();
        }
        constructor() {
          super(), this._decorations = new o.SortedList((e3) => e3?.marker.line), this._onDecorationRegistered = this.register(new r2.EventEmitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new r2.EventEmitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n2.toDisposable)(() => this.reset()));
        }
        registerDecoration(e3) {
          if (e3.marker.isDisposed) return;
          const t4 = new l2(e3);
          if (t4) {
            const e4 = t4.marker.onDispose(() => t4.dispose());
            t4.onDispose(() => {
              t4 && (this._decorations.delete(t4) && this._onDecorationRemoved.fire(t4), e4.dispose());
            }), this._decorations.insert(t4), this._onDecorationRegistered.fire(t4);
          }
          return t4;
        }
        reset() {
          for (const e3 of this._decorations.values()) e3.dispose();
          this._decorations.clear();
        }
        *getDecorationsAtCell(e3, t4, i3) {
          let s3 = 0, r3 = 0;
          for (const n3 of this._decorations.getKeyIterator(t4)) s3 = n3.options.x ?? 0, r3 = s3 + (n3.options.width ?? 1), e3 >= s3 && e3 < r3 && (!i3 || (n3.options.layer ?? "bottom") === i3) && (yield n3);
        }
        forEachDecorationAtCell(e3, t4, i3, s3) {
          this._decorations.forEachByKey(t4, (t5) => {
            a2 = t5.options.x ?? 0, h = a2 + (t5.options.width ?? 1), e3 >= a2 && e3 < h && (!i3 || (t5.options.layer ?? "bottom") === i3) && s3(t5);
          });
        }
      }
      t3.DecorationService = c2;
      class l2 extends n2.Disposable {
        get isDisposed() {
          return this._isDisposed;
        }
        get backgroundColorRGB() {
          return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s2.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
        }
        get foregroundColorRGB() {
          return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s2.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
        }
        constructor(e3) {
          super(), this.options = e3, this.onRenderEmitter = this.register(new r2.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r2.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e3.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
        }
        dispose() {
          this._onDispose.fire(), super.dispose();
        }
      }
    }, 4348: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.InstantiationService = t3.ServiceCollection = void 0;
      const s2 = i2(2585), r2 = i2(8343);
      class n2 {
        constructor(...e3) {
          this._entries = /* @__PURE__ */ new Map();
          for (const [t4, i3] of e3) this.set(t4, i3);
        }
        set(e3, t4) {
          const i3 = this._entries.get(e3);
          return this._entries.set(e3, t4), i3;
        }
        forEach(e3) {
          for (const [t4, i3] of this._entries.entries()) e3(t4, i3);
        }
        has(e3) {
          return this._entries.has(e3);
        }
        get(e3) {
          return this._entries.get(e3);
        }
      }
      t3.ServiceCollection = n2, t3.InstantiationService = class {
        constructor() {
          this._services = new n2(), this._services.set(s2.IInstantiationService, this);
        }
        setService(e3, t4) {
          this._services.set(e3, t4);
        }
        getService(e3) {
          return this._services.get(e3);
        }
        createInstance(e3, ...t4) {
          const i3 = (0, r2.getServiceDependencies)(e3).sort((e4, t5) => e4.index - t5.index), s3 = [];
          for (const t5 of i3) {
            const i4 = this._services.get(t5.id);
            if (!i4) throw new Error(`[createInstance] ${e3.name} depends on UNKNOWN service ${t5.id}.`);
            s3.push(i4);
          }
          const n3 = i3.length > 0 ? i3[0].index : t4.length;
          if (t4.length !== n3) throw new Error(`[createInstance] First service dependency of ${e3.name} at position ${n3 + 1} conflicts with ${t4.length} static arguments`);
          return new e3(...[...t4, ...s3]);
        }
      };
    }, 7866: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a3 = e3.length - 1; a3 >= 0; a3--) (r3 = e3[a3]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.traceCall = t3.setTraceLogger = t3.LogService = void 0;
      const n2 = i2(844), o = i2(2585), a2 = { trace: o.LogLevelEnum.TRACE, debug: o.LogLevelEnum.DEBUG, info: o.LogLevelEnum.INFO, warn: o.LogLevelEnum.WARN, error: o.LogLevelEnum.ERROR, off: o.LogLevelEnum.OFF };
      let h, c2 = t3.LogService = class extends n2.Disposable {
        get logLevel() {
          return this._logLevel;
        }
        constructor(e3) {
          super(), this._optionsService = e3, this._logLevel = o.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), h = this;
        }
        _updateLogLevel() {
          this._logLevel = a2[this._optionsService.rawOptions.logLevel];
        }
        _evalLazyOptionalParams(e3) {
          for (let t4 = 0; t4 < e3.length; t4++) "function" == typeof e3[t4] && (e3[t4] = e3[t4]());
        }
        _log(e3, t4, i3) {
          this._evalLazyOptionalParams(i3), e3.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + t4, ...i3);
        }
        trace(e3, ...t4) {
          this._logLevel <= o.LogLevelEnum.TRACE && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e3, t4);
        }
        debug(e3, ...t4) {
          this._logLevel <= o.LogLevelEnum.DEBUG && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e3, t4);
        }
        info(e3, ...t4) {
          this._logLevel <= o.LogLevelEnum.INFO && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e3, t4);
        }
        warn(e3, ...t4) {
          this._logLevel <= o.LogLevelEnum.WARN && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e3, t4);
        }
        error(e3, ...t4) {
          this._logLevel <= o.LogLevelEnum.ERROR && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e3, t4);
        }
      };
      t3.LogService = c2 = s2([r2(0, o.IOptionsService)], c2), t3.setTraceLogger = function(e3) {
        h = e3;
      }, t3.traceCall = function(e3, t4, i3) {
        if ("function" != typeof i3.value) throw new Error("not supported");
        const s3 = i3.value;
        i3.value = function(...e4) {
          if (h.logLevel !== o.LogLevelEnum.TRACE) return s3.apply(this, e4);
          h.trace(`GlyphRenderer#${s3.name}(${e4.map((e5) => JSON.stringify(e5)).join(", ")})`);
          const t5 = s3.apply(this, e4);
          return h.trace(`GlyphRenderer#${s3.name} return`, t5), t5;
        };
      };
    }, 7302: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.OptionsService = t3.DEFAULT_OPTIONS = void 0;
      const s2 = i2(8460), r2 = i2(844), n2 = i2(6114);
      t3.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "courier-new, courier, monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, rescaleOverlappingGlyphs: false, rightClickSelectsWord: n2.isMac, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRulerWidth: 0 };
      const o = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
      class a2 extends r2.Disposable {
        constructor(e3) {
          super(), this._onOptionChange = this.register(new s2.EventEmitter()), this.onOptionChange = this._onOptionChange.event;
          const i3 = { ...t3.DEFAULT_OPTIONS };
          for (const t4 in e3) if (t4 in i3) try {
            const s3 = e3[t4];
            i3[t4] = this._sanitizeAndValidateOption(t4, s3);
          } catch (e4) {
            console.error(e4);
          }
          this.rawOptions = i3, this.options = { ...i3 }, this._setupOptions(), this.register((0, r2.toDisposable)(() => {
            this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
          }));
        }
        onSpecificOptionChange(e3, t4) {
          return this.onOptionChange((i3) => {
            i3 === e3 && t4(this.rawOptions[e3]);
          });
        }
        onMultipleOptionChange(e3, t4) {
          return this.onOptionChange((i3) => {
            -1 !== e3.indexOf(i3) && t4();
          });
        }
        _setupOptions() {
          const e3 = (e4) => {
            if (!(e4 in t3.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e4}"`);
            return this.rawOptions[e4];
          }, i3 = (e4, i4) => {
            if (!(e4 in t3.DEFAULT_OPTIONS)) throw new Error(`No option with key "${e4}"`);
            i4 = this._sanitizeAndValidateOption(e4, i4), this.rawOptions[e4] !== i4 && (this.rawOptions[e4] = i4, this._onOptionChange.fire(e4));
          };
          for (const t4 in this.rawOptions) {
            const s3 = { get: e3.bind(this, t4), set: i3.bind(this, t4) };
            Object.defineProperty(this.options, t4, s3);
          }
        }
        _sanitizeAndValidateOption(e3, i3) {
          switch (e3) {
            case "cursorStyle":
              if (i3 || (i3 = t3.DEFAULT_OPTIONS[e3]), !/* @__PURE__ */ function(e4) {
                return "block" === e4 || "underline" === e4 || "bar" === e4;
              }(i3)) throw new Error(`"${i3}" is not a valid value for ${e3}`);
              break;
            case "wordSeparator":
              i3 || (i3 = t3.DEFAULT_OPTIONS[e3]);
              break;
            case "fontWeight":
            case "fontWeightBold":
              if ("number" == typeof i3 && 1 <= i3 && i3 <= 1e3) break;
              i3 = o.includes(i3) ? i3 : t3.DEFAULT_OPTIONS[e3];
              break;
            case "cursorWidth":
              i3 = Math.floor(i3);
            case "lineHeight":
            case "tabStopWidth":
              if (i3 < 1) throw new Error(`${e3} cannot be less than 1, value: ${i3}`);
              break;
            case "minimumContrastRatio":
              i3 = Math.max(1, Math.min(21, Math.round(10 * i3) / 10));
              break;
            case "scrollback":
              if ((i3 = Math.min(i3, 4294967295)) < 0) throw new Error(`${e3} cannot be less than 0, value: ${i3}`);
              break;
            case "fastScrollSensitivity":
            case "scrollSensitivity":
              if (i3 <= 0) throw new Error(`${e3} cannot be less than or equal to 0, value: ${i3}`);
              break;
            case "rows":
            case "cols":
              if (!i3 && 0 !== i3) throw new Error(`${e3} must be numeric, value: ${i3}`);
              break;
            case "windowsPty":
              i3 = i3 ?? {};
          }
          return i3;
        }
      }
      t3.OptionsService = a2;
    }, 2660: function(e2, t3, i2) {
      var s2 = this && this.__decorate || function(e3, t4, i3, s3) {
        var r3, n3 = arguments.length, o2 = n3 < 3 ? t4 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t4, i3) : s3;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o2 = Reflect.decorate(e3, t4, i3, s3);
        else for (var a2 = e3.length - 1; a2 >= 0; a2--) (r3 = e3[a2]) && (o2 = (n3 < 3 ? r3(o2) : n3 > 3 ? r3(t4, i3, o2) : r3(t4, i3)) || o2);
        return n3 > 3 && o2 && Object.defineProperty(t4, i3, o2), o2;
      }, r2 = this && this.__param || function(e3, t4) {
        return function(i3, s3) {
          t4(i3, s3, e3);
        };
      };
      Object.defineProperty(t3, "__esModule", { value: true }), t3.OscLinkService = void 0;
      const n2 = i2(2585);
      let o = t3.OscLinkService = class {
        constructor(e3) {
          this._bufferService = e3, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
        }
        registerLink(e3) {
          const t4 = this._bufferService.buffer;
          if (void 0 === e3.id) {
            const i4 = t4.addMarker(t4.ybase + t4.y), s4 = { data: e3, id: this._nextId++, lines: [i4] };
            return i4.onDispose(() => this._removeMarkerFromLink(s4, i4)), this._dataByLinkId.set(s4.id, s4), s4.id;
          }
          const i3 = e3, s3 = this._getEntryIdKey(i3), r3 = this._entriesWithId.get(s3);
          if (r3) return this.addLineToLink(r3.id, t4.ybase + t4.y), r3.id;
          const n3 = t4.addMarker(t4.ybase + t4.y), o2 = { id: this._nextId++, key: this._getEntryIdKey(i3), data: i3, lines: [n3] };
          return n3.onDispose(() => this._removeMarkerFromLink(o2, n3)), this._entriesWithId.set(o2.key, o2), this._dataByLinkId.set(o2.id, o2), o2.id;
        }
        addLineToLink(e3, t4) {
          const i3 = this._dataByLinkId.get(e3);
          if (i3 && i3.lines.every((e4) => e4.line !== t4)) {
            const e4 = this._bufferService.buffer.addMarker(t4);
            i3.lines.push(e4), e4.onDispose(() => this._removeMarkerFromLink(i3, e4));
          }
        }
        getLinkData(e3) {
          return this._dataByLinkId.get(e3)?.data;
        }
        _getEntryIdKey(e3) {
          return `${e3.id};;${e3.uri}`;
        }
        _removeMarkerFromLink(e3, t4) {
          const i3 = e3.lines.indexOf(t4);
          -1 !== i3 && (e3.lines.splice(i3, 1), 0 === e3.lines.length && (void 0 !== e3.data.id && this._entriesWithId.delete(e3.key), this._dataByLinkId.delete(e3.id)));
        }
      };
      t3.OscLinkService = o = s2([r2(0, n2.IBufferService)], o);
    }, 8343: (e2, t3) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.createDecorator = t3.getServiceDependencies = t3.serviceRegistry = void 0;
      const i2 = "di$target", s2 = "di$dependencies";
      t3.serviceRegistry = /* @__PURE__ */ new Map(), t3.getServiceDependencies = function(e3) {
        return e3[s2] || [];
      }, t3.createDecorator = function(e3) {
        if (t3.serviceRegistry.has(e3)) return t3.serviceRegistry.get(e3);
        const r2 = function(e4, t4, n2) {
          if (3 !== arguments.length) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
          !function(e5, t5, r3) {
            t5[i2] === t5 ? t5[s2].push({ id: e5, index: r3 }) : (t5[s2] = [{ id: e5, index: r3 }], t5[i2] = t5);
          }(r2, e4, n2);
        };
        return r2.toString = () => e3, t3.serviceRegistry.set(e3, r2), r2;
      };
    }, 2585: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.IDecorationService = t3.IUnicodeService = t3.IOscLinkService = t3.IOptionsService = t3.ILogService = t3.LogLevelEnum = t3.IInstantiationService = t3.ICharsetService = t3.ICoreService = t3.ICoreMouseService = t3.IBufferService = void 0;
      const s2 = i2(8343);
      var r2;
      t3.IBufferService = (0, s2.createDecorator)("BufferService"), t3.ICoreMouseService = (0, s2.createDecorator)("CoreMouseService"), t3.ICoreService = (0, s2.createDecorator)("CoreService"), t3.ICharsetService = (0, s2.createDecorator)("CharsetService"), t3.IInstantiationService = (0, s2.createDecorator)("InstantiationService"), function(e3) {
        e3[e3.TRACE = 0] = "TRACE", e3[e3.DEBUG = 1] = "DEBUG", e3[e3.INFO = 2] = "INFO", e3[e3.WARN = 3] = "WARN", e3[e3.ERROR = 4] = "ERROR", e3[e3.OFF = 5] = "OFF";
      }(r2 || (t3.LogLevelEnum = r2 = {})), t3.ILogService = (0, s2.createDecorator)("LogService"), t3.IOptionsService = (0, s2.createDecorator)("OptionsService"), t3.IOscLinkService = (0, s2.createDecorator)("OscLinkService"), t3.IUnicodeService = (0, s2.createDecorator)("UnicodeService"), t3.IDecorationService = (0, s2.createDecorator)("DecorationService");
    }, 1480: (e2, t3, i2) => {
      Object.defineProperty(t3, "__esModule", { value: true }), t3.UnicodeService = void 0;
      const s2 = i2(8460), r2 = i2(225);
      class n2 {
        static extractShouldJoin(e3) {
          return 0 != (1 & e3);
        }
        static extractWidth(e3) {
          return e3 >> 1 & 3;
        }
        static extractCharKind(e3) {
          return e3 >> 3;
        }
        static createPropertyValue(e3, t4, i3 = false) {
          return (16777215 & e3) << 3 | (3 & t4) << 1 | (i3 ? 1 : 0);
        }
        constructor() {
          this._providers = /* @__PURE__ */ Object.create(null), this._active = "", this._onChange = new s2.EventEmitter(), this.onChange = this._onChange.event;
          const e3 = new r2.UnicodeV6();
          this.register(e3), this._active = e3.version, this._activeProvider = e3;
        }
        dispose() {
          this._onChange.dispose();
        }
        get versions() {
          return Object.keys(this._providers);
        }
        get activeVersion() {
          return this._active;
        }
        set activeVersion(e3) {
          if (!this._providers[e3]) throw new Error(`unknown Unicode version "${e3}"`);
          this._active = e3, this._activeProvider = this._providers[e3], this._onChange.fire(e3);
        }
        register(e3) {
          this._providers[e3.version] = e3;
        }
        wcwidth(e3) {
          return this._activeProvider.wcwidth(e3);
        }
        getStringCellWidth(e3) {
          let t4 = 0, i3 = 0;
          const s3 = e3.length;
          for (let r3 = 0; r3 < s3; ++r3) {
            let o = e3.charCodeAt(r3);
            if (55296 <= o && o <= 56319) {
              if (++r3 >= s3) return t4 + this.wcwidth(o);
              const i4 = e3.charCodeAt(r3);
              56320 <= i4 && i4 <= 57343 ? o = 1024 * (o - 55296) + i4 - 56320 + 65536 : t4 += this.wcwidth(i4);
            }
            const a2 = this.charProperties(o, i3);
            let h = n2.extractWidth(a2);
            n2.extractShouldJoin(a2) && (h -= n2.extractWidth(i3)), t4 += h, i3 = a2;
          }
          return t4;
        }
        charProperties(e3, t4) {
          return this._activeProvider.charProperties(e3, t4);
        }
      }
      t3.UnicodeService = n2;
    } }, t2 = {};
    function i(s2) {
      var r2 = t2[s2];
      if (void 0 !== r2) return r2.exports;
      var n2 = t2[s2] = { exports: {} };
      return e[s2].call(n2.exports, n2, n2.exports, i), n2.exports;
    }
    var s = {};
    return (() => {
      var e2 = s;
      Object.defineProperty(e2, "__esModule", { value: true }), e2.Terminal = void 0;
      const t3 = i(9042), r2 = i(3236), n2 = i(844), o = i(5741), a2 = i(8285), h = i(7975), c2 = i(7090), l2 = ["cols", "rows"];
      class d extends n2.Disposable {
        constructor(e3) {
          super(), this._core = this.register(new r2.Terminal(e3)), this._addonManager = this.register(new o.AddonManager()), this._publicOptions = { ...this._core.options };
          const t4 = (e4) => this._core.options[e4], i2 = (e4, t5) => {
            this._checkReadonlyOptions(e4), this._core.options[e4] = t5;
          };
          for (const e4 in this._core.options) {
            const s2 = { get: t4.bind(this, e4), set: i2.bind(this, e4) };
            Object.defineProperty(this._publicOptions, e4, s2);
          }
        }
        _checkReadonlyOptions(e3) {
          if (l2.includes(e3)) throw new Error(`Option "${e3}" can only be set in the constructor`);
        }
        _checkProposedApi() {
          if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
        }
        get onBell() {
          return this._core.onBell;
        }
        get onBinary() {
          return this._core.onBinary;
        }
        get onCursorMove() {
          return this._core.onCursorMove;
        }
        get onData() {
          return this._core.onData;
        }
        get onKey() {
          return this._core.onKey;
        }
        get onLineFeed() {
          return this._core.onLineFeed;
        }
        get onRender() {
          return this._core.onRender;
        }
        get onResize() {
          return this._core.onResize;
        }
        get onScroll() {
          return this._core.onScroll;
        }
        get onSelectionChange() {
          return this._core.onSelectionChange;
        }
        get onTitleChange() {
          return this._core.onTitleChange;
        }
        get onWriteParsed() {
          return this._core.onWriteParsed;
        }
        get element() {
          return this._core.element;
        }
        get parser() {
          return this._parser || (this._parser = new h.ParserApi(this._core)), this._parser;
        }
        get unicode() {
          return this._checkProposedApi(), new c2.UnicodeApi(this._core);
        }
        get textarea() {
          return this._core.textarea;
        }
        get rows() {
          return this._core.rows;
        }
        get cols() {
          return this._core.cols;
        }
        get buffer() {
          return this._buffer || (this._buffer = this.register(new a2.BufferNamespaceApi(this._core))), this._buffer;
        }
        get markers() {
          return this._checkProposedApi(), this._core.markers;
        }
        get modes() {
          const e3 = this._core.coreService.decPrivateModes;
          let t4 = "none";
          switch (this._core.coreMouseService.activeProtocol) {
            case "X10":
              t4 = "x10";
              break;
            case "VT200":
              t4 = "vt200";
              break;
            case "DRAG":
              t4 = "drag";
              break;
            case "ANY":
              t4 = "any";
          }
          return { applicationCursorKeysMode: e3.applicationCursorKeys, applicationKeypadMode: e3.applicationKeypad, bracketedPasteMode: e3.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: t4, originMode: e3.origin, reverseWraparoundMode: e3.reverseWraparound, sendFocusMode: e3.sendFocus, wraparoundMode: e3.wraparound };
        }
        get options() {
          return this._publicOptions;
        }
        set options(e3) {
          for (const t4 in e3) this._publicOptions[t4] = e3[t4];
        }
        blur() {
          this._core.blur();
        }
        focus() {
          this._core.focus();
        }
        input(e3, t4 = true) {
          this._core.input(e3, t4);
        }
        resize(e3, t4) {
          this._verifyIntegers(e3, t4), this._core.resize(e3, t4);
        }
        open(e3) {
          this._core.open(e3);
        }
        attachCustomKeyEventHandler(e3) {
          this._core.attachCustomKeyEventHandler(e3);
        }
        attachCustomWheelEventHandler(e3) {
          this._core.attachCustomWheelEventHandler(e3);
        }
        registerLinkProvider(e3) {
          return this._core.registerLinkProvider(e3);
        }
        registerCharacterJoiner(e3) {
          return this._checkProposedApi(), this._core.registerCharacterJoiner(e3);
        }
        deregisterCharacterJoiner(e3) {
          this._checkProposedApi(), this._core.deregisterCharacterJoiner(e3);
        }
        registerMarker(e3 = 0) {
          return this._verifyIntegers(e3), this._core.registerMarker(e3);
        }
        registerDecoration(e3) {
          return this._checkProposedApi(), this._verifyPositiveIntegers(e3.x ?? 0, e3.width ?? 0, e3.height ?? 0), this._core.registerDecoration(e3);
        }
        hasSelection() {
          return this._core.hasSelection();
        }
        select(e3, t4, i2) {
          this._verifyIntegers(e3, t4, i2), this._core.select(e3, t4, i2);
        }
        getSelection() {
          return this._core.getSelection();
        }
        getSelectionPosition() {
          return this._core.getSelectionPosition();
        }
        clearSelection() {
          this._core.clearSelection();
        }
        selectAll() {
          this._core.selectAll();
        }
        selectLines(e3, t4) {
          this._verifyIntegers(e3, t4), this._core.selectLines(e3, t4);
        }
        dispose() {
          super.dispose();
        }
        scrollLines(e3) {
          this._verifyIntegers(e3), this._core.scrollLines(e3);
        }
        scrollPages(e3) {
          this._verifyIntegers(e3), this._core.scrollPages(e3);
        }
        scrollToTop() {
          this._core.scrollToTop();
        }
        scrollToBottom() {
          this._core.scrollToBottom();
        }
        scrollToLine(e3) {
          this._verifyIntegers(e3), this._core.scrollToLine(e3);
        }
        clear() {
          this._core.clear();
        }
        write(e3, t4) {
          this._core.write(e3, t4);
        }
        writeln(e3, t4) {
          this._core.write(e3), this._core.write("\r\n", t4);
        }
        paste(e3) {
          this._core.paste(e3);
        }
        refresh(e3, t4) {
          this._verifyIntegers(e3, t4), this._core.refresh(e3, t4);
        }
        reset() {
          this._core.reset();
        }
        clearTextureAtlas() {
          this._core.clearTextureAtlas();
        }
        loadAddon(e3) {
          this._addonManager.loadAddon(this, e3);
        }
        static get strings() {
          return t3;
        }
        _verifyIntegers(...e3) {
          for (const t4 of e3) if (t4 === 1 / 0 || isNaN(t4) || t4 % 1 != 0) throw new Error("This API only accepts integers");
        }
        _verifyPositiveIntegers(...e3) {
          for (const t4 of e3) if (t4 && (t4 === 1 / 0 || isNaN(t4) || t4 % 1 != 0 || t4 < 0)) throw new Error("This API only accepts positive integers");
        }
      }
      e2.Terminal = d;
    })(), s;
  })());
})(xterm);
var xtermExports = xterm.exports;
var addonFit = { exports: {} };
(function(module, exports) {
  !function(e, t2) {
    module.exports = t2();
  }(self, () => (() => {
    var e = {};
    return (() => {
      var t2 = e;
      Object.defineProperty(t2, "__esModule", { value: true }), t2.FitAddon = void 0, t2.FitAddon = class {
        activate(e2) {
          this._terminal = e2;
        }
        dispose() {
        }
        fit() {
          const e2 = this.proposeDimensions();
          if (!e2 || !this._terminal || isNaN(e2.cols) || isNaN(e2.rows)) return;
          const t3 = this._terminal._core;
          this._terminal.rows === e2.rows && this._terminal.cols === e2.cols || (t3._renderService.clear(), this._terminal.resize(e2.cols, e2.rows));
        }
        proposeDimensions() {
          if (!this._terminal) return;
          if (!this._terminal.element || !this._terminal.element.parentElement) return;
          const e2 = this._terminal._core, t3 = e2._renderService.dimensions;
          if (0 === t3.css.cell.width || 0 === t3.css.cell.height) return;
          const r2 = 0 === this._terminal.options.scrollback ? 0 : e2.viewport.scrollBarWidth, i = window.getComputedStyle(this._terminal.element.parentElement), o = parseInt(i.getPropertyValue("height")), s = Math.max(0, parseInt(i.getPropertyValue("width"))), n2 = window.getComputedStyle(this._terminal.element), l2 = o - (parseInt(n2.getPropertyValue("padding-top")) + parseInt(n2.getPropertyValue("padding-bottom"))), a2 = s - (parseInt(n2.getPropertyValue("padding-right")) + parseInt(n2.getPropertyValue("padding-left"))) - r2;
          return { cols: Math.max(2, Math.floor(a2 / t3.css.cell.width)), rows: Math.max(1, Math.floor(l2 / t3.css.cell.height)) };
        }
      };
    })(), e;
  })());
})(addonFit);
var addonFitExports = addonFit.exports;
const ANSI = /\x1b\[[0-9;?]*[ -/]*[@-~]|\x1b\][^\x07]*\x07|\x1b[@-_]/g;
const stripAnsi = (s) => s.replace(ANSI, "").replace(/\r(?!\n)/g, "\n");
const NEEDS_PATTERNS = [
  /do you want to (proceed|allow|continue|trust|run|make)/i,
  /would you like to (proceed|allow|continue)/i,
  /allow .{0,80}(to|access|run|use)/i,
  /permission (required|needed|to)/i,
  /trust (the )?(files|folder|this|all)/i,
  /\[y\/n\]/i,
  /\(y\/n\)/i,
  /press (enter|any key) to (continue|confirm)/i,
  /❯\s*\d\.\s/,
  /^\s*\d\.\s+(yes|no)\b/im,
  /waiting for (your )?(input|approval|confirmation)/i,
  /approve (this|the) (action|command|edit)/i
];
const READY_PATTERNS = [
  /(^|\n)\s*[›❯>]\s*$/,
  /(^|\n)\s*\$\s*$/,
  /(^|\n)\s*[A-Za-z]:\\[^>\n]*>\s*$/,
  /ready for (your )?(next|input|prompt)/i,
  /what would you like/i
];
const ERROR_PATTERNS = [
  /^\s*(error|fatal|exception|traceback)\b/im,
  /\b(command not found|is not recognized as an internal)/i,
  /\b(failed|failure)\b.{0,60}(exit|command|build|test)/i
];
function detectNeedsYou(tail) {
  const text = stripAnsi(tail);
  const lines = text.trimEnd().split("\n").slice(-14).join("\n");
  for (const re2 of NEEDS_PATTERNS) {
    const m2 = lines.match(re2);
    if (m2) return m2[0].slice(0, 140);
  }
  return null;
}
function detectError(tail) {
  const text = stripAnsi(tail).trimEnd();
  const lines = text.split("\n").slice(-4).join("\n");
  return ERROR_PATTERNS.some((re2) => re2.test(lines));
}
function looksReady(tail) {
  const text = stripAnsi(tail).trimEnd();
  return READY_PATTERNS.some((re2) => re2.test(text));
}
function deriveStatus(opts) {
  if (opts.exited) return { status: "DONE" };
  if (opts.paused) return { status: "PAUSED" };
  if (!opts.started) return { status: "STARTING" };
  const needs = detectNeedsYou(opts.tail);
  if (needs && opts.sinceData > 600) return { status: "NEEDS YOU", detail: needs };
  if (opts.sinceData < 900) return { status: "WORKING" };
  if (detectError(opts.tail)) return { status: "ERROR" };
  if (looksReady(opts.tail)) return { status: "READY" };
  return { status: "IDLE" };
}
const handles = /* @__PURE__ */ new Map();
const pending = /* @__PURE__ */ new Map();
const waiters = /* @__PURE__ */ new Map();
function registerConsole(handle) {
  handles.set(handle.nodeId, handle);
  const queued = pending.get(handle.nodeId);
  if (queued?.length) {
    pending.delete(handle.nodeId);
    for (const text of queued) sendOrder(handle.nodeId, text);
  }
  return () => {
    if (handles.get(handle.nodeId) === handle) handles.delete(handle.nodeId);
  };
}
const getHandle = (id2) => handles.get(id2);
function sendOrder(id2, text) {
  const h = handles.get(id2);
  if (!h) return false;
  const status = h.status();
  if (status === "NEEDS YOU") {
    pending.set(id2, [...pending.get(id2) ?? [], text]);
    if (!waiters.has(id2)) {
      const timer2 = setTimeout(() => {
        const queue = pending.get(id2) ?? [];
        pending.delete(id2);
        waiters.delete(id2);
        const hh2 = handles.get(id2);
        if (hh2 && queue.length && hh2.status() !== "NEEDS YOU") {
          for (const t2 of queue) directSend(hh2, t2);
        }
      }, 6e4);
      waiters.set(id2, timer2);
    }
    return false;
  }
  directSend(h, text);
  return true;
}
function directSend(h, text) {
  h.write(text);
  setTimeout(() => h.write("\r"), 220);
}
function flushQueue(id2) {
  const h = handles.get(id2);
  const queue = pending.get(id2);
  if (!h || !queue?.length) return;
  if (h.status() === "NEEDS YOU") return;
  pending.delete(id2);
  const t2 = waiters.get(id2);
  if (t2) clearTimeout(t2);
  waiters.delete(id2);
  for (const text of queue) directSend(h, text);
}
function digest(id2, max = 4e3) {
  const tail = stripAnsi(handles.get(id2)?.tail() ?? "").trim();
  if (!tail) return "";
  const lines = tail.split("\n").map((l2) => l2.trimEnd());
  while (lines.length && !lines[0].trim()) lines.shift();
  return lines.join("\n").slice(-max);
}
const norm = (s) => s.trim().replace(/\s+/g, " ");
function matchConsole(ctx, token) {
  const t2 = token.replace(/^@/, "").toLowerCase();
  return ctx.consoles.find(
    (c2) => c2.name.toLowerCase() === t2 || c2.agentName.toLowerCase() === t2 || c2.id === t2
  );
}
function parseCommand(raw, ctx) {
  const text = norm(raw);
  if (!text) return { kind: "empty" };
  const lower = text.toLowerCase();
  let m2 = lower.match(/^(go to|switch to|gehe zu) workspace (\d+)$/);
  if (m2) return { kind: "action", action: "goto-workspace", args: { index: +m2[2] - 1 }, echo: text };
  m2 = lower.match(/^(new workspace)( called| named| namens)? (.+)$/);
  if (m2) return { kind: "action", action: "new-workspace", args: { name: text.slice(m2[1].length + m2[2].length).trim() }, echo: text };
  m2 = lower.match(/^rename (this|the) workspace to (.+)$/);
  if (m2) return { kind: "action", action: "rename-workspace", args: { name: m2[2] }, echo: text };
  m2 = lower.match(/^close workspace (\d+)$/);
  if (m2) return { kind: "action", action: "close-workspace", args: { index: +m2[1] - 1 }, echo: text };
  m2 = lower.match(/^spawn (\d+|a|an|one|two|three|four|five|six|eight) ?(?:agents?|consoles?)?(?: (?:with|of|using))? ?(.*)$/);
  if (m2) {
    const words = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, eight: 8 };
    const count = words[m2[1]] ?? Math.min(+m2[1] || 1, 16);
    const rest = m2[2]?.trim() ?? "";
    const agentToken = rest.split(" ")[0] ?? "";
    return {
      kind: "action",
      action: "spawn",
      args: { count, agentQuery: agentToken, roleToken: rest.split(" ").slice(1).join(" ") },
      echo: text
    };
  }
  m2 = lower.match(/^(add|new) (?:an? )?(?:agent|console)(?: (?:for|in|to))?(?: (?:group|team) (\d+))?(?: (?:called|named) (.+))?$/);
  if (m2 && /^(add|new) (an? )?(agent|console)/.test(lower)) {
    return { kind: "action", action: "spawn", args: { count: 1, groupIndex: m2[2] ? +m2[2] - 1 : void 0, name: m2[3] }, echo: text };
  }
  m2 = lower.match(/^(?:add|new) (\d+|two|three|four) (?:agents|consoles)(?: to group (\d+))?$/);
  if (m2) {
    const words = { two: 2, three: 3, four: 4 };
    return { kind: "action", action: "spawn", args: { count: words[m2[1]] ?? +m2[1], groupIndex: m2[2] ? +m2[2] - 1 : void 0 }, echo: text };
  }
  const targetName = (s) => {
    const t2 = s.trim().replace(/^(the |agent )/, "");
    return matchConsole(ctx, t2)?.id ?? (ctx.consoles.length === 1 ? ctx.consoles[0].id : void 0);
  };
  m2 = lower.match(/^(kill|close|stop) (?:the )?(?:console |agent )?(.+)$/);
  if (m2 && !lower.startsWith("close workspace")) {
    const id2 = targetName(m2[2]);
    if (id2) return { kind: "action", action: "kill-console", args: { id: id2 }, echo: text };
  }
  m2 = lower.match(/^(restart|relaunch) (?:the )?(?:console |agent )?(.+)$/);
  if (m2) {
    const id2 = targetName(m2[2]);
    if (id2) return { kind: "action", action: "restart-console", args: { id: id2 }, echo: text };
  }
  m2 = lower.match(/^(pause|resume) (?:the )?(?:console |agent )?(.+)$/);
  if (m2) {
    const id2 = targetName(m2[2]);
    if (id2) return { kind: "action", action: `${m2[1]}-console`, args: { id: id2 }, echo: text };
  }
  m2 = lower.match(/^(focus|show|frame|zoom to) (?:the )?(.+)$/);
  if (m2) {
    const id2 = targetName(m2[2]);
    if (id2) return { kind: "action", action: "focus-console", args: { id: id2 }, echo: text };
  }
  m2 = lower.match(/^rename (?:the )?console (.+?) to (.+)$/);
  if (m2) {
    const id2 = targetName(m2[1]);
    if (id2) return { kind: "action", action: "rename-console", args: { id: id2, name: m2[2] }, echo: text };
  }
  m2 = lower.match(/^open (documents?|diagrams?|code|markdown|memory|skills?|git(?:hub)?|usage|tokens?|settings|presets?|mission map|map)$/);
  if (m2) {
    const map = {
      document: "documents",
      documents: "documents",
      diagram: "diagrams",
      diagrams: "diagrams",
      code: "code",
      markdown: "markdown",
      memory: "memory",
      skill: "skills",
      skills: "skills",
      git: "git",
      github: "git",
      usage: "usage",
      token: "usage",
      tokens: "usage",
      settings: "settings",
      preset: "presets",
      presets: "presets",
      "mission map": "mission",
      map: "mission"
    };
    return { kind: "action", action: "open-panel", args: { panel: map[m2[1]] }, echo: text };
  }
  m2 = lower.match(/^add (?:a |an )?(note|kanban|calendar|checklist|web tile|browser|orchestrator|branches|memory card)(?: (?:called|named) (.+))?$/);
  if (m2) {
    return { kind: "action", action: "add-node", args: { node: m2[1], name: m2[2] }, echo: text };
  }
  m2 = lower.match(/^add (?:a )?note (?:that )?says (.+)$/);
  if (m2) return { kind: "action", action: "add-node", args: { node: "note", text: m2[1] }, echo: text };
  m2 = lower.match(/^open (localhost|127\.0\.0\.1)(?::(\d+))?$/);
  if (m2) return { kind: "action", action: "add-node", args: { node: "web tile", url: `http://${m2[1]}:${m2[2] ?? 3e3}` }, echo: text };
  m2 = lower.match(/^connect (?:group|team) (\d+) to (?:the )?orchestrator(?: (\d+))?$/);
  if (m2) return { kind: "action", action: "connect-group", args: { groupIndex: +m2[1] - 1, orchIndex: m2[2] ? +m2[2] - 1 : 0 }, echo: text };
  m2 = lower.match(/^(?:add|insert) (?:an? )?orchestrator(?: for group (\d+))?(?: (?:called|named) (.+))?$/);
  if (m2) return { kind: "action", action: "add-node", args: { node: "orchestrator", groupIndex: m2[1] ? +m2[1] - 1 : void 0, name: m2[2] }, echo: text };
  m2 = lower.match(/^(?:use|deploy|apply|start) (?:the )?preset (.+)$/);
  if (m2) {
    const presetName = m2[1].trim();
    const p2 = ctx.presets.find((x2) => x2.name.toLowerCase() === presetName);
    return { kind: "action", action: "deploy-preset", args: { id: p2?.id, name: presetName }, echo: text };
  }
  if (/^(commit and push|commit & push|push everything)$/.test(lower))
    return { kind: "action", action: "git", args: { op: "commit-push" }, echo: text };
  if (/^(push|pull)$/.test(lower)) return { kind: "action", action: "git", args: { op: lower }, echo: text };
  m2 = lower.match(/^commit with (?:the )?message (.+)$/);
  if (m2) return { kind: "action", action: "git", args: { op: "commit", message: m2[1] }, echo: text };
  if (/^(push|send) (the )?memory( to (all|agents))?$/.test(lower))
    return { kind: "action", action: "memory-push", args: {}, echo: text };
  if (/^(zoom in|fit|zoom to fit|fit board)$/.test(lower))
    return { kind: "action", action: "fit-board", args: {}, echo: text };
  if (/^(zoom out)$/.test(lower)) return { kind: "action", action: "zoom", args: { delta: -0.15 }, echo: text };
  if (/^@all\b/i.test(text)) {
    const rest = text.replace(/^@all\s*/i, "").trim();
    if (rest) return { kind: "order", text: rest, targets: ctx.consoles.map((c2) => c2.id), echo: text };
  }
  if (text.startsWith("@")) {
    const [head, ...rest] = text.split(" ");
    const target = matchConsole(ctx, head);
    if (target && rest.length) {
      return { kind: "order", text: rest.join(" "), targets: [target.id], echo: text };
    }
  }
  const mentions = [...text.matchAll(/@([\w.-]+)/g)].map((mm) => matchConsole(ctx, mm[1])).filter(Boolean);
  if (mentions.length) {
    return { kind: "order", text, targets: [...new Set(mentions.map((x2) => x2.id))], echo: text };
  }
  return { kind: "planner", text };
}
const RISKY = /(rm\s+-rf|sudo|del\s+\/|format\s+[a-z]:|--yolo|dangerously-skip|\.env\b|git\s+reset\s+--hard|drop\s+table)/i;
function riskOf(text) {
  const m2 = text.match(RISKY);
  return m2 ? m2[0] : null;
}
const NAMES = ["Otto", "Dax", "Mira", "Nova", "Kai", "Ada", "Rune", "Fable", "Juno", "Vesper", "Echo", "Lux", "Pax", "Sable", "Wren", "Iris", "Nico", "Tess", "Bram", "Oona"];
function nextName(existing) {
  const free = NAMES.find((n2) => !existing.includes(n2));
  if (free) return free;
  return `${NAMES[existing.length % NAMES.length]} ${existing.length + 1}`;
}
function agentFromQuery(query) {
  if (!query) return useApp.getState().settings.defaultAgent;
  const q2 = query.toLowerCase().replace(/^@/, "");
  const found = allAgents().find(
    (a2) => a2.id === q2 || a2.command.toLowerCase() === q2 || a2.name.toLowerCase().startsWith(q2)
  );
  return found?.id ?? useApp.getState().settings.defaultAgent;
}
function viewportOrigin() {
  const st = useApp.getState();
  const b = st.board();
  const v2 = b?.viewport ?? { x: 0, y: 0, zoom: 1 };
  return { x: (window.innerWidth / 2 - 380 - v2.x) / v2.zoom, y: (window.innerHeight / 2 - 220 - v2.y) / v2.zoom };
}
const CELL_W = 400;
const CELL_H = 260;
const GAP_X = 32;
const GAP_Y = 42;
function freeOriginFor(b, w2, h, start) {
  const v2 = b.viewport;
  const base2 = start ?? {
    x: (window.innerWidth / 2 - 380 - v2.x) / v2.zoom,
    y: (window.innerHeight / 2 - 220 - v2.y) / v2.zoom
  };
  for (let gy = -3; gy <= 5; gy++) {
    for (let gx = -4; gx <= 6; gx++) {
      const x2 = base2.x + gx * 440;
      const y2 = base2.y + gy * 310;
      const pad = 40;
      const clash = b.nodes.some(
        (n2) => x2 - pad < n2.x + n2.w && x2 + w2 + pad > n2.x && y2 - pad < n2.y + n2.h && y2 + h + pad > n2.y
      );
      if (!clash) return { x: x2, y: y2 };
    }
  }
  const maxX = b.nodes.length ? Math.max(...b.nodes.map((n2) => n2.x + n2.w)) : base2.x;
  const minY = b.nodes.length ? Math.min(...b.nodes.map((n2) => n2.y)) : base2.y;
  return { x: maxX + 64, y: minY };
}
function freeOrigin(b, cols, rows) {
  return freeOriginFor(b, cols * CELL_W + (cols - 1) * GAP_X, rows * CELL_H + (rows - 1) * GAP_Y);
}
function spawnConsoles(count, opts = {}) {
  const st = useApp.getState();
  const b = st.board();
  if (!b) return [];
  const repo = activeRepo(st);
  const agentId = opts.role && ROLE_AGENT[opts.role] ? ROLE_AGENT[opts.role] : agentFromQuery(opts.agentQuery);
  const origin = freeOrigin(b, Math.min(3, count), Math.ceil(count / 3));
  const existingNames = consolesOf(b).map((c2) => c2.title);
  const made = [];
  for (let i = 0; i < count; i++) {
    const n2 = makeConsole(origin.x + i % 3 * (CELL_W + GAP_X), origin.y + Math.floor(i / 3) * (CELL_H + GAP_Y), {
      agentId,
      cwd: repo?.path ?? "",
      title: opts.name && count === 1 ? opts.name : nextName([...existingNames, ...made.map((m2) => m2.title)]),
      yolo: st.settings.yolo
    });
    made.push(n2);
  }
  st.addNodes(made);
  if (opts.groupId) {
    st.updateBoard((board) => ({
      ...board,
      groups: board.groups.map((g) => g.id === opts.groupId ? { ...g, memberIds: [...g.memberIds, ...made.map((m2) => m2.id)] } : g)
    }));
  }
  st.setSelection(made.map((m2) => m2.id));
  st.toast(`${count} console${count > 1 ? "s" : ""} started with ${getAgent(agentId).name}`, "ok");
  setTimeout(() => {
    if (made.length === 1) {
      window.dispatchEvent(new CustomEvent("hive:frame", { detail: made[0].id }));
    } else {
      window.dispatchEvent(
        new CustomEvent("hive:frame-rect", {
          detail: {
            x: origin.x,
            y: origin.y,
            w: Math.min(3, count) * CELL_W + (Math.min(3, count) - 1) * GAP_X,
            h: Math.ceil(count / 3) * CELL_H + (Math.ceil(count / 3) - 1) * GAP_Y
          }
        })
      );
    }
  }, 340);
  return made;
}
function spawnDirector() {
  const st = useApp.getState();
  const b = st.board();
  const repo = activeRepo(st);
  if (!b || !repo) {
    st.toast("Open a project first", "error");
    return null;
  }
  const v2 = b.viewport;
  const origin = freeOriginFor(b, 360, 420, {
    x: (window.innerWidth / 2 - 420 - v2.x) / v2.zoom,
    y: (110 - v2.y) / v2.zoom
  });
  const director = makeOrchestrator(origin.x, origin.y, "Director");
  director.w = 360;
  director.h = 420;
  st.addNode(director);
  st.setSelection([director.id]);
  st.setTool("select");
  st.toast("Director spawned — rope in your agents", "ok");
  setTimeout(() => window.dispatchEvent(new CustomEvent("hive:frame", { detail: director.id })), 280);
  return director;
}
function spawnTeam(slots, opts = {}) {
  const st = useApp.getState();
  const b = st.board();
  const repo = activeRepo(st);
  if (!b || !repo || !slots.length) return [];
  const origin = freeOrigin(b, Math.min(3, slots.length), Math.ceil(slots.length / 3));
  const startX = origin.x;
  const startY = origin.y;
  const names = consolesOf(b).map((c2) => c2.title);
  const made = [];
  for (let i = 0; i < Math.min(12, slots.length); i++) {
    const slot2 = slots[i];
    const title = slot2.title?.trim() || nextName(names);
    names.push(title);
    made.push(
      makeConsole(startX + i % 3 * (CELL_W + GAP_X), startY + Math.floor(i / 3) * (CELL_H + GAP_Y), {
        agentId: slot2.agentId,
        cwd: repo.path,
        title,
        args: slot2.args,
        yolo: st.settings.yolo
      })
    );
  }
  st.addNodes(made);
  const groups = [];
  if (made.length > 1) {
    groups.push({
      id: uid(),
      name: opts.name?.trim() || `Team ${b.groups.length + 1}`,
      role: "Team",
      tint: ["violet", "cyan", "amber", "rose", "sage", "sky"][b.groups.length % 6],
      memberIds: made.map((m2) => m2.id)
    });
  }
  if (groups.length) st.updateBoard((board) => ({ ...board, groups: [...board.groups, ...groups] }));
  st.setSelection(made.map((m2) => m2.id));
  if (!opts.quiet) {
    st.toast(
      `${made.length} terminal${made.length === 1 ? "" : "s"} launched at once`,
      "ok"
    );
  }
  const cols = Math.min(3, made.length);
  const rows = Math.ceil(made.length / 3);
  setTimeout(
    () => window.dispatchEvent(
      new CustomEvent("hive:frame-rect", {
        detail: {
          x: startX,
          y: startY,
          w: cols * 400 + (cols - 1) * 32,
          h: rows * 260 + (rows - 1) * 42
        }
      })
    ),
    360
  );
  return made;
}
function deployPreset(id2) {
  const st = useApp.getState();
  const preset = PRESETS.find((p2) => p2.id === id2);
  const b = st.board();
  const repo = activeRepo(st);
  if (!preset || !b || !repo) return;
  const origin = viewportOrigin();
  const nodes = [];
  const byRole = /* @__PURE__ */ new Map();
  for (const lane of preset.lanes) {
    const node = makeConsole(origin.x + lane.x, origin.y + lane.y, {
      agentId: lane.agentId || st.settings.defaultAgent,
      cwd: repo.path,
      title: nextName([...consolesOf(b).map((c2) => c2.title), ...nodes.map((n2) => n2.title)]),
      yolo: st.settings.yolo
    });
    nodes.push(node);
    if (lane.role) byRole.set(lane.role, [...byRole.get(lane.role) ?? [], node.id]);
  }
  const groups = [...byRole.entries()].map(([role, ids], i) => ({
    id: uid(),
    name: `${role} ${i + 1}`,
    role,
    tint: ["violet", "cyan", "amber", "rose", "sage", "sky"][i % 6],
    memberIds: ids
  }));
  const right = origin.x + 80 + Math.max(...preset.lanes.map((l2) => l2.x)) + 420;
  const wires = [];
  if (preset.extras?.includes("kanban")) {
    const kb2 = makeKanban(right, origin.y + 80);
    nodes.push(kb2);
  }
  if (preset.extras?.includes("preview")) {
    nodes.push(makeWeb(right, origin.y + 500));
  }
  if (preset.extras?.includes("orchestrator")) {
    const orch = makeOrchestrator(origin.x, origin.y - 300, "Director");
    orch.w = 360;
    orch.h = 420;
    orch.wired = nodes.filter((n2) => n2.kind === "console").map((n2) => n2.id);
    nodes.push(orch);
    for (const id22 of orch.wired) {
      wires.push({ id: uid(), from: id22, to: orch.id, kind: "orchestrator" });
    }
  }
  st.addNodes(nodes);
  st.updateBoard((board) => ({ ...board, groups: [...board.groups, ...groups], wires: [...board.wires, ...wires] }));
  st.setSelection(nodes.filter((n2) => n2.kind === "console").map((n2) => n2.id));
  st.toast(`${preset.name} deployed · ${preset.lanes.length} consoles`, "ok");
  setTimeout(() => window.dispatchEvent(new CustomEvent("hive:fit")), 320);
}
function orderConsoles(text, targets, record = true) {
  const st = useApp.getState();
  const b = st.board();
  const repo = activeRepo(st);
  if (!b) return false;
  const risk = riskOf(text);
  if (risk && !window.confirm(`This order mentions "${risk}". Send it anyway?`)) return false;
  const running = consolesOf(b).filter((c2) => ["READY", "IDLE", "WORKING", "RUNNING"].includes(c2.status));
  const ids = targets?.length ? targets : running.map((c2) => c2.id);
  if (!ids.length) {
    st.toast("No running console can take an order. Spawn an agent first.", "error");
    return false;
  }
  for (const id2 of ids) sendOrder(id2, text);
  if (repo && record) st.addMessage(repo.id, { role: "user", text });
  return true;
}
const sharedUpdates = /* @__PURE__ */ new Map();
function announceAgentUpdate(sourceId, text) {
  const st = useApp.getState();
  const board = st.board();
  if (!board) return;
  const clean = text.trim();
  if (clean.length < 30 || clean.includes("[GoT team update")) return;
  if (!/(modified|updated|created|deleted|wrote|changed|patched|diff|commit|\.(tsx?|jsx?|css|scss|json|md|py|go|rs|java|html|ya?ml)\b)/i.test(clean)) return;
  const source = consolesOf(board).find((c2) => c2.id === sourceId);
  if (!source) return;
  const now2 = Date.now();
  const hash = clean.slice(-420);
  const prev = sharedUpdates.get(sourceId);
  if (prev && (now2 - prev.at < 2e4 || prev.hash === hash)) return;
  sharedUpdates.set(sourceId, { at: now2, hash });
  const targets = consolesOf(board).filter(
    (c2) => c2.id !== sourceId && !c2.paused && (c2.status === "READY" || c2.status === "IDLE")
  );
  if (!targets.length) return;
  const summary = clean.slice(-900);
  for (const target of targets) {
    sendOrder(
      target.id,
      `[GoT team update from ${source.title}]
${summary}

Another agent changed the project. Check the relevant files before editing and avoid duplicate work. Do not repeat this notice.`
    );
  }
}
function gatherContext() {
  const st = useApp.getState();
  const b = st.board();
  const nodes = b?.nodes ?? [];
  return {
    consoles: nodes.filter((n2) => n2.kind === "console").map((n2) => {
      const c2 = n2;
      return {
        id: c2.id,
        name: c2.title,
        agentName: getAgent(c2.agentId).name,
        status: c2.status,
        groupId: b?.groups.find((g) => g.memberIds.includes(c2.id))?.id
      };
    }),
    groups: (b?.groups ?? []).map((g) => ({ id: g.id, name: g.name })),
    workspaceCount: activeRepo(st)?.workspaces.length ?? 1,
    currentWorkspace: activeRepo(st)?.workspaces.findIndex((w2) => w2.id === activeRepo(st)?.activeWorkspaceId) ?? 0,
    presets: PRESETS.map((p2) => ({ id: p2.id, name: p2.name })),
    orchestrators: nodes.filter((n2) => n2.kind === "orchestrator").map((n2) => ({ id: n2.id, name: n2.title }))
  };
}
function executeAction(action, args, echo) {
  const st = useApp.getState();
  const b = st.board();
  if (echo) {
    const repo = activeRepo(st);
    if (repo) st.addMessage(repo.id, { role: "system", text: echo });
  }
  switch (action) {
    case "spawn": {
      spawnConsoles(Number(args.count ?? 1), {
        agentQuery: args.agentQuery,
        role: args.roleToken,
        name: args.name
      });
      break;
    }
    case "new-workspace":
      st.addWorkspace(args.name);
      break;
    case "goto-workspace": {
      const repo = activeRepo(st);
      const ws = repo?.workspaces[Number(args.index)];
      if (ws) st.setWorkspace(ws.id);
      break;
    }
    case "rename-workspace": {
      const repo = activeRepo(st);
      if (repo) st.renameWorkspace(repo.activeWorkspaceId, args.name || "Workspace");
      break;
    }
    case "close-workspace": {
      const repo = activeRepo(st);
      const ws = repo?.workspaces[Number(args.index)];
      if (ws) st.closeWorkspace(ws.id);
      break;
    }
    case "kill-console": {
      const id2 = args.id;
      if (window.confirm("Kill this session? The console stays on the board.")) {
        st.patchNode(id2, { status: "DONE", launchKey: b?.nodes.find((n2) => n2.id === id2)?.launchKey + 1 });
      }
      break;
    }
    case "restart-console": {
      const node = b?.nodes.find((n2) => n2.id === args.id);
      if (node) st.patchNode(node.id, { launchKey: node.launchKey + 1, status: "STARTING" });
      break;
    }
    case "pause-console":
    case "resume-console": {
      const node = b?.nodes.find((n2) => n2.id === args.id);
      if (node) {
        if (action === "resume-console") st.patchNode(node.id, { paused: false, launchKey: node.launchKey + 1, status: "STARTING" });
        else st.patchNode(node.id, { paused: true, status: "PAUSED" });
      }
      break;
    }
    case "focus-console":
      window.dispatchEvent(new CustomEvent("hive:frame", { detail: args.id }));
      break;
    case "rename-console":
      st.patchNode(args.id, { title: args.name.slice(0, 24) });
      break;
    case "open-panel":
      st.setPanel(args.panel);
      break;
    case "add-node": {
      const origin = viewportOrigin();
      const node = newNode(String(args.node), origin.x + 40, origin.y + 40, args);
      if (args.name) node.title = String(args.name);
      if (args.groupIndex !== void 0) {
        const g = b?.groups[Number(args.groupIndex)];
        if (g && node.kind === "orchestrator") node.wired = g.memberIds;
      }
      st.addNode(node);
      st.setSelection([node.id]);
      break;
    }
    case "connect-group": {
      const g = b?.groups[Number(args.groupIndex)];
      const orch = b?.nodes.filter((n2) => n2.kind === "orchestrator")[Number(args.orchIndex ?? 0)];
      if (g && orch && orch.kind === "orchestrator") {
        st.patchNode(orch.id, { wired: [.../* @__PURE__ */ new Set([...orch.wired, ...g.memberIds])] });
        st.updateBoard((board) => ({
          ...board,
          wires: [
            ...board.wires.filter((w2) => w2.to !== orch.id),
            ...g.memberIds.map((id2) => ({ id: uid(), from: id2, to: orch.id, kind: "orchestrator" }))
          ]
        }));
      }
      break;
    }
    case "deploy-preset": {
      const preset = PRESETS.find((p2) => p2.id === args.id || p2.name.toLowerCase() === String(args.name ?? "").toLowerCase());
      if (preset) deployPreset(preset.id);
      break;
    }
    case "memory-push":
      pushMemory();
      break;
    case "fit-board":
      window.dispatchEvent(new CustomEvent("hive:fit"));
      break;
    case "zoom":
      st.updateBoard((board) => ({ ...board, viewport: { ...board.viewport, zoom: Math.max(0.2, board.viewport.zoom + Number(args.delta ?? 0)) } }));
      break;
    case "git":
      void quickGit(String(args.op), args.message);
      break;
    default:
      st.toast(`Unknown action: ${action}`, "error");
  }
}
async function quickGit(op, message) {
  const st = useApp.getState();
  const repo = activeRepo(st);
  if (!repo) return;
  try {
    if (op === "pull") {
      st.toast(await window.api.git.pull(repo.path) || "Pulled", "ok");
      return;
    }
    if (op === "push") {
      st.toast(await window.api.git.push(repo.path) || "Pushed", "ok");
      return;
    }
    const status = await window.api.git.status(repo.path);
    const files = status.files.map((f2) => f2.path);
    if (!files.length) {
      st.toast("Nothing to commit", "info");
      return;
    }
    await window.api.git.commit(repo.path, message || `Update from GoT (${(/* @__PURE__ */ new Date()).toLocaleString()})`, files);
    if (op === "commit-push") st.toast(await window.api.git.push(repo.path) || "Committed and pushed", "ok");
    else st.toast("Committed", "ok");
  } catch (err) {
    st.toast(err instanceof Error ? err.message : "Git failed", "error");
  }
}
function pushMemory(targets) {
  const st = useApp.getState();
  const b = st.board();
  const repo = activeRepo(st);
  if (!b || !repo) return;
  const facts = st.memory.filter((f2) => f2.scope === "global" || f2.scope === repo.id);
  if (!facts.length) return st.toast("Memory is empty — add facts first", "error");
  let text = "Background context for this repo (not a task):\n" + facts.map((f2) => `- [${f2.kind}] ${f2.text}`).join("\n");
  text = text.slice(0, 3400) + "\n\nReply with OK.";
  const ids = consolesOf(b).filter((c2) => ["READY", "IDLE", "WORKING"].includes(c2.status)).map((c2) => c2.id);
  if (!ids.length) return st.toast("No running console to brief", "error");
  for (const id2 of ids) sendOrder(id2, text);
  st.toast(`Memory pushed to ${ids.length} console(s)`, "ok");
}
function boardSnapshot() {
  const st = useApp.getState();
  const b = st.board();
  const repo = activeRepo(st);
  return {
    project: repo ? { name: repo.name, path: repo.path } : null,
    consoles: consolesOf(b).map((c2) => ({
      id: c2.id,
      name: c2.title,
      agent: getAgent(c2.agentId).name,
      status: c2.status,
      cwd: c2.cwd
    })),
    groups: b?.groups.map((g) => ({ id: g.id, name: g.name, members: g.memberIds })) ?? [],
    notes: b?.nodes.filter((n2) => n2.kind === "note" || n2.kind === "checklist").map((n2) => ({ kind: n2.kind, title: n2.title })) ?? [],
    recent: (st.threads[repo?.id ?? ""] ?? []).slice(-10).map((m2) => ({
      from: m2.role === "user" ? "user" : m2.role === "agent" ? m2.agent ?? "agent" : "brain",
      text: m2.text.slice(0, 320)
    }))
  };
}
const BRAIN_SYSTEM = `You are the Main Brain of God Terminal (GoT). You talk with the user and coordinate a crew of agent terminals working in one local project.
Answer with pure JSON only:
{"say":"your reply to the user", "actions":[]}
Allowed actions: order (ids, text), spawn (count, agentQuery), add-node (node: note|kanban|calendar|checklist|orchestrator), focus-console (id), open-panel (panel).
Rules:
- If the user is chatting, asking a question or thinking aloud: answer in say and return no actions.
- If the user gives work: split it into one self-contained, imperative order per suitable console. Use only ids that exist. Do not invent consoles.
- If no console fits, you may spawn one or more consoles with spawn (count, agentQuery) and then order them.
- Agents work in the same folder at the same time. Avoid duplicate work and use the recent agent updates in the board snapshot.
- Keep say short, natural and in the user's language. Do not mention JSON.
- No markdown, no prose outside JSON.`;
async function askBrain(text) {
  const st = useApp.getState();
  const repo = activeRepo(st);
  const cfg = llmConfig(st.settings);
  if (repo) st.addMessage(repo.id, { role: "user", text });
  if (cfg.provider === "lmstudio" && !cfg.model.trim()) {
    if (repo) st.addMessage(repo.id, { role: "brain", text: "Wähle zuerst ein LM-Studio-Modell in Settings → Local models." });
    st.toast("Choose an LM Studio model in Settings", "error");
    return;
  }
  st.setBrainBusy(true);
  try {
    const res = await window.api.llm.chat({
      provider: cfg.provider,
      url: cfg.url,
      model: cfg.model,
      json: true,
      messages: [
        { role: "system", content: BRAIN_SYSTEM },
        { role: "user", content: `Board:
${JSON.stringify(boardSnapshot())}

Message: ${text}` }
      ]
    });
    if (!res.ok) {
      const msg = res.error ?? "Das lokale Modell antwortet nicht.";
      if (repo) st.addMessage(repo.id, { role: "brain", text: msg });
      st.toast(msg, "error");
      return;
    }
    let parsed = {};
    try {
      parsed = JSON.parse(res.text);
    } catch {
      const m2 = res.text.match(/\{[\s\S]*\}/);
      if (m2) {
        try {
          parsed = JSON.parse(m2[0]);
        } catch {
          parsed = {};
        }
      }
    }
    const say = String(parsed.say ?? "").trim();
    const actions = parsed.actions ?? [];
    if (say) {
      if (repo) st.addMessage(repo.id, { role: "brain", text: say });
    } else if (!actions.length) {
      const fallback = res.text.trim();
      if (fallback && repo) st.addMessage(repo.id, { role: "brain", text: fallback });
    }
    for (const a2 of actions) {
      if (a2.action === "order") {
        const ids = a2.args?.ids ?? [];
        const order = String(a2.args?.text ?? "").trim();
        if (order) orderConsoles(order, ids, false);
      } else {
        executeAction(a2.action, a2.args ?? {}, "");
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Das Main Brain ist gerade nicht erreichbar.";
    if (repo) st.addMessage(repo.id, { role: "brain", text: msg });
    st.toast(msg, "error");
  } finally {
    st.setBrainBusy(false);
  }
}
async function runCommand(raw) {
  const st = useApp.getState();
  const text = raw.trim();
  if (!text) return;
  if (!st.board()) {
    st.toast("Open a repo first", "error");
    return;
  }
  const parsed = parseCommand(text, gatherContext());
  if (parsed.kind === "empty") return;
  if (parsed.kind === "planner") {
    st.setCommandDraft("");
    await askBrain(parsed.text);
    return;
  }
  if (parsed.kind === "order") {
    st.setCommandDraft("");
    orderConsoles(parsed.text, parsed.targets);
    return;
  }
  st.setCommandDraft("");
  executeAction(parsed.action, parsed.args, text);
}
const THEMES = {
  ink: {
    background: "#0c0e12",
    foreground: "#cbd5e1",
    cursor: "#7dd3fc",
    selectionBackground: "#33415580",
    black: "#0f172a",
    red: "#f87171",
    green: "#86efac",
    yellow: "#fcd34d",
    blue: "#7dd3fc",
    magenta: "#c084fc",
    cyan: "#67e8f9",
    white: "#e2e8f0",
    brightBlack: "#64748b"
  },
  light: {
    background: "#fbfaf7",
    foreground: "#1f2937",
    cursor: "#0f766e",
    selectionBackground: "#99f6e480",
    black: "#111827",
    red: "#b91c1c",
    green: "#15803d",
    yellow: "#a16207",
    blue: "#0369a1",
    magenta: "#7e22ce",
    cyan: "#0e7490",
    white: "#374151",
    brightBlack: "#6b7280"
  }
};
function ConsoleNode({ node }) {
  const hostRef = reactExports.useRef(null);
  const termRef = reactExports.useRef(null);
  const fitRef = reactExports.useRef(null);
  const tailRef = reactExports.useRef("");
  const lastData = reactExports.useRef(0);
  const started = reactExports.useRef(false);
  const [menu, setMenu] = reactExports.useState(false);
  const [localStatus, setLocalStatus] = reactExports.useState(node.status);
  const [detail, setDetail] = reactExports.useState();
  const [connState, setConnState] = reactExports.useState("");
  const settings = useApp((s) => s.settings);
  const profiles = useApp((s) => s.profiles);
  const patchNode = useApp((s) => s.patchNode);
  const repo = useApp((s) => s.repos.find((r2) => r2.id === s.activeRepoId));
  const toast = useApp((s) => s.toast);
  const addMessage = useApp((s) => s.addMessage);
  const removeNodes = useApp((s) => s.removeNodes);
  const addConsole = useApp((s) => s.addNode);
  const activeRepoId = useApp((s) => s.activeRepoId);
  const agent = getAgent(node.agentId);
  const profile = profiles.find((p2) => p2.id === node.profileId);
  reactExports.useEffect(() => {
    if (!hostRef.current) return;
    const term = new xtermExports.Terminal({
      fontFamily: "'Cascadia Mono', 'JetBrains Mono', Consolas, monospace",
      fontSize: 12.5 * (settings.fontSize / 100),
      lineHeight: 1.15,
      cursorBlink: true,
      scrollback: 1e4,
      allowProposedApi: true,
      theme: THEMES[settings.theme] ?? THEMES.ink
    });
    const fit = new addonFitExports.FitAddon();
    term.loadAddon(fit);
    term.open(hostRef.current);
    termRef.current = term;
    fitRef.current = fit;
    tailRef.current = "";
    started.current = false;
    const sessionId = `${node.id}:${node.launchKey}`;
    let disposed = false;
    const doFit = () => {
      try {
        fit.fit();
        if (started.current) void window.api.pty.resize(sessionId, term.cols, term.rows);
      } catch {
      }
    };
    setTimeout(doFit, 60);
    const ro = new ResizeObserver(() => doFit());
    ro.observe(hostRef.current);
    const offData = window.api.pty.onData((id2, data) => {
      if (id2 !== sessionId || disposed) return;
      term.write(data);
      tailRef.current = (tailRef.current + data).slice(-12e3);
      lastData.current = Date.now();
    });
    const offExit = window.api.pty.onExit((id2, code) => {
      if (id2 !== sessionId || disposed) return;
      term.write(`\r
\x1B[38;5;245m[process exited with code ${code}]\x1B[0m\r
`);
      started.current = false;
      setLocalStatus("DONE");
      patchNode(node.id, { status: "DONE" });
    });
    const args = node.args ? [...node.args] : agent.id === "ollama" ? ["run", settings.ollamaModel] : agent.id === "codex-ollama" ? [
      "launch",
      "codex",
      "-m",
      settings.ollamaModel,
      "--",
      "--sandbox",
      "workspace-write",
      "-c",
      "check_for_update_on_startup=false"
    ] : agent.id === "codex-lmstudio" ? [
      "--oss",
      "--local-provider",
      "lmstudio",
      ...settings.lmStudioModel.trim() ? ["-m", settings.lmStudioModel.trim()] : [],
      "--sandbox",
      "workspace-write",
      "-c",
      "check_for_update_on_startup=false"
    ] : [...agent.args ?? []];
    if (node.yolo && agent.yoloFlag) args.push(...agent.yoloFlag.split(" "));
    const env = {};
    if (profile) {
      if (profile.agentId === "claude") env.CLAUDE_CONFIG_DIR = profile.dir;
      if (profile.agentId === "codex") env.CODEX_HOME = profile.dir;
    }
    setConnState("starting");
    window.api.pty.create({ id: sessionId, cwd: node.cwd || repo?.path || "", command: agent.command, args, env }).then(({ shell }) => {
      if (disposed) {
        void window.api.pty.kill(sessionId);
        return;
      }
      started.current = true;
      setConnState("");
      doFit();
      term.focus();
      if (settings.resumeChats) {
        term.write(`\x1B[38;5;245mSession restored — previous scrollback is gone.\x1B[0m\r
`);
      }
      console.info("console started", shell);
    }).catch((err) => {
      setConnState(`failed: ${err.message}`);
      term.write(`\r
\x1B[31mCould not start ${agent.command}: ${err.message}\x1B[0m\r
`);
    });
    const inputSub = term.onData((data) => {
      if (started.current) void window.api.pty.write(sessionId, data);
    });
    term.attachCustomKeyEventHandler((ev) => {
      if (ev.type === "keydown" && ev.ctrlKey && ev.key.toLowerCase() === "v") {
        void navigator.clipboard.readText().then((text) => {
          if (!text) return;
          const lines = text.split(/\r?\n/).filter((l2) => l2.trim().length > 0);
          if (lines.length > 1) {
            const asCommands = window.confirm(
              `Paste ${lines.length} lines as commands?

OK = paste with line breaks
Cancel = paste as one line`
            );
            const value = asCommands ? text : lines.join(" ");
            void window.api.pty.write(sessionId, value);
          } else {
            void window.api.pty.write(sessionId, text);
          }
        });
        return false;
      }
      return true;
    });
    const unregister = registerConsole({
      nodeId: node.id,
      write: (data) => {
        if (started.current) void window.api.pty.write(sessionId, data);
      },
      status: () => findConsole(useApp.getState(), node.id)?.status ?? "IDLE",
      tail: () => tailRef.current,
      restart: () => patchNode(node.id, { launchKey: node.launchKey + 1, status: "STARTING" })
    });
    const tick = setInterval(() => {
      if (disposed) return;
      if (!started.current) {
        if (localStatus !== "DONE" && localStatus !== "PAUSED") setLocalStatus("STARTING");
        return;
      }
      const next = deriveStatus({
        tail: tailRef.current,
        sinceData: Date.now() - (lastData.current || Date.now()),
        started: started.current,
        paused: node.paused
      });
      const prev = findConsole(useApp.getState(), node.id)?.status;
      if (next.status !== prev) {
        patchNode(node.id, { status: next.status, statusDetail: next.detail });
        setLocalStatus(next.status);
        setDetail(next.detail);
        if (next.status === "READY") flushQueue(node.id);
        if ((next.status === "READY" || next.status === "DONE") && prev === "WORKING" && activeRepoId) {
          const d = digest(node.id, 700);
          if (d) {
            addMessage(activeRepoId, {
              role: "agent",
              text: d,
              agent: node.title,
              consoleId: node.id
            });
            announceAgentUpdate(node.id, d);
          }
        }
      }
    }, 800);
    return () => {
      disposed = true;
      clearInterval(tick);
      ro.disconnect();
      offData();
      offExit();
      inputSub.dispose();
      unregister();
      void window.api.pty.kill(sessionId);
      term.dispose();
      termRef.current = null;
    };
  }, [node.id, node.launchKey, activeRepoId]);
  reactExports.useEffect(() => {
    const t2 = termRef.current;
    if (!t2) return;
    t2.options.fontSize = 12.5 * (settings.fontSize / 100);
    t2.options.theme = THEMES[settings.theme] ?? THEMES.ink;
    try {
      fitRef.current?.fit();
    } catch {
    }
  }, [settings.fontSize, settings.theme]);
  const statusClass = localStatus === "NEEDS YOU" ? "needs" : localStatus === "WORKING" || localStatus === "RUNNING" ? "working" : localStatus === "ERROR" ? "error" : localStatus === "READY" ? "ready" : localStatus === "DONE" ? "done" : localStatus === "PAUSED" ? "paused" : "idle";
  const restart = () => {
    setLocalStatus("STARTING");
    patchNode(node.id, { launchKey: node.launchKey + 1, status: "STARTING", paused: false });
    setMenu(false);
  };
  const handoff = () => {
    const summary = digest(node.id, 1200);
    const created = makeConsole(node.x + 60, node.y + node.h + 40, {
      title: `${node.title} handoff`,
      agentId: node.agentId,
      cwd: node.cwd,
      launchKey: 0
    });
    addConsole(created);
    if (summary) {
      setTimeout(() => sendOrder(created.id, `Context from ${node.title}:
${summary}

Continue from here.`), 2e3);
    }
    toast("Handoff console created", "ok");
    setMenu(false);
  };
  const forward = () => {
    const text = window.prompt("Forward the last result to which console? Type its name.");
    if (!text) return;
    const board = useApp.getState().board();
    const target = board?.nodes.find((n2) => n2.kind === "console" && n2.title.toLowerCase() === text.toLowerCase());
    if (!target) return toast("No matching console", "error");
    const d = digest(node.id, 1500);
    if (d) sendOrder(target.id, `Forwarded result from ${node.title}:
${d}`);
    setMenu(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `console-body ${node.paused ? "is-paused" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "console-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "agent-dot", style: { background: agent.color } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "console-title",
          onDoubleClick: () => {
            const name = window.prompt("Console name", node.title);
            if (name) patchNode(node.id, { title: name.slice(0, 24) });
          },
          children: node.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "console-agent", children: agent.name }),
      profile && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: profile.initials }),
      node.yolo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge yolo", children: "YOLO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill ${statusClass}`, title: detail ?? localStatus, children: localStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", title: "Restart", onClick: restart, children: "⟳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", title: "More", onClick: () => setMenu((v2) => !v2), children: "⋯" }),
      menu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "node-menu", onMouseLeave: () => setMenu(false), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: restart, children: "Restart session" }),
        profiles.filter((p2) => p2.agentId === agent.id).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-label", children: "Account" }),
        profiles.filter((p2) => p2.agentId === agent.id).map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: node.profileId === p2.id ? "on" : "",
            onClick: () => {
              patchNode(node.id, {
                profileId: p2.id,
                launchKey: node.launchKey + 1,
                status: "STARTING"
              });
              setLocalStatus("STARTING");
              setMenu(false);
            },
            children: [
              node.profileId === p2.id ? "✓ " : "",
              p2.name
            ]
          },
          p2.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "menu-label", children: "Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          patchNode(node.id, { w: 360, h: 240 });
          setMenu(false);
        }, children: "Compact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          patchNode(node.id, { w: 560, h: 260 });
          setMenu(false);
        }, children: "Wide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          patchNode(node.id, { w: 400, h: 430 });
          setMenu(false);
        }, children: "Tall" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              void window.api.pty.kill(`${node.id}:${node.launchKey}`);
              patchNode(node.id, { paused: true, status: "PAUSED" });
              setLocalStatus("PAUSED");
              setMenu(false);
            },
            children: "Pause session"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handoff, children: "Handoff to new console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: forward, children: "Forward last result…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              if (window.confirm(`Kill ${node.title}? The console stays on the board, marked done.`)) {
                void window.api.pty.kill(`${node.id}:${node.launchKey}`);
                setLocalStatus("DONE");
                patchNode(node.id, { status: "DONE", paused: true });
              }
              setMenu(false);
            },
            children: "Kill session"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          removeNodes([node.id]);
          setMenu(false);
        }, children: "Remove from board" })
      ] })
    ] }),
    node.paused ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paused-cover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Paused" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
        setLocalStatus("STARTING");
        patchNode(node.id, { paused: false, launchKey: node.launchKey + 1, status: "STARTING" });
      }, children: "Resume" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "term-host", ref: hostRef, onMouseDown: (e) => e.stopPropagation() }),
    connState === "starting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "term-hint", children: [
      "starting ",
      agent.command || "shell",
      "…"
    ] }),
    connState.startsWith("failed") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "term-hint error", children: connState })
  ] });
}
const md$1 = (text) => ({ __html: marked.parse(text, { async: false }) });
function Head({ node, children }) {
  const patch = useApp((s) => s.patchNode);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "node-head", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "node-title", onDoubleClick: () => {
      const name = window.prompt("Name", node.title);
      if (name) patch(node.id, { title: name.slice(0, 60) });
    }, children: node.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
    children
  ] });
}
function NoteView({ node }) {
  const patch = useApp((s) => s.patchNode);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "note-body", style: { background: node.paper }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "note-grip", title: "Drag note" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "note-fold", onClick: () => patch(node.id, { paper: node.paper === "#f5e6a8" ? "#bfe3c8" : node.paper === "#bfe3c8" ? "#f7c6d0" : "#f5e6a8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: "note-input",
        value: node.text,
        placeholder: "Write a note…",
        onChange: (e) => patch(node.id, { text: e.target.value })
      }
    )
  ] });
}
function TextView({ node }) {
  const patch = useApp((s) => s.patchNode);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-node-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-handle", title: "Drag text" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-body",
        contentEditable: true,
        suppressContentEditableWarning: true,
        style: { textAlign: node.align, fontSize: node.size },
        onBlur: (e) => patch(node.id, { text: e.currentTarget.innerText }),
        children: node.text || "Text"
      }
    )
  ] });
}
function ChecklistView({ node }) {
  const patch = useApp((s) => s.patchNode);
  const done = node.items.filter((i) => i.done).length;
  const pct = node.items.length ? Math.round(done / node.items.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pad", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row muted small", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        done,
        "/",
        node.items.length,
        " done"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => patch(node.id, { items: node.items.filter((i) => !i.done) }), children: "Clear done" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { width: `${pct}%` } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "checklist", children: node.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `check ${it.done ? "done" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: it.done,
          onChange: () => patch(node.id, { items: node.items.map((x2) => x2.id === it.id ? { ...x2, done: !x2.done } : x2) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it.text })
    ] }, it.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        className: "ghost-input",
        placeholder: "Add an objective…",
        onKeyDown: (e) => {
          if (e.key !== "Enter") return;
          const text = e.currentTarget.value.trim();
          if (!text) return;
          patch(node.id, { items: [...node.items, { id: uid(), text, done: false }] });
          e.currentTarget.value = "";
        }
      }
    )
  ] });
}
function KanbanView({ node }) {
  const patch = useApp((s) => s.patchNode);
  const dragRef = reactExports.useRef(null);
  const [over, setOver] = reactExports.useState(null);
  const addCard = (colId) => {
    const title = window.prompt("Card title");
    if (!title) return;
    patch(node.id, {
      columns: node.columns.map(
        (c2) => c2.id === colId ? { ...c2, cards: [...c2.cards, { id: uid(), title, priority: "none", done: false }] } : c2
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kanban", children: node.columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `kb-col ${over === col.id ? "drop" : ""}`,
      onDragOver: (e) => {
        e.preventDefault();
        setOver(col.id);
      },
      onDragLeave: () => setOver((o) => o === col.id ? null : o),
      onDrop: (e) => {
        e.preventDefault();
        const d = dragRef.current;
        setOver(null);
        dragRef.current = null;
        if (!d || d.colId === col.id) return;
        const card = node.columns.find((c2) => c2.id === d.colId)?.cards.find((x2) => x2.id === d.cardId);
        if (!card) return;
        patch(node.id, {
          columns: node.columns.map(
            (c2) => c2.id === d.colId ? { ...c2, cards: c2.cards.filter((x2) => x2.id !== d.cardId) } : c2.id === col.id ? { ...c2, cards: [...c2.cards, card] } : c2
          )
        });
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kb-col-head", style: { borderColor: col.color }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: col.color }, children: col.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => addCard(col.id), children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kb-cards", children: col.cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `kb-card ${card.done ? "done" : ""} prio-${card.priority}`,
            draggable: true,
            onDragStart: (e) => {
              dragRef.current = { colId: col.id, cardId: card.id };
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", card.id);
            },
            onDragEnd: () => {
              dragRef.current = null;
              setOver(null);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kb-title", children: card.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row tiny", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => patch(node.id, {
                  columns: node.columns.map((c2) => c2.id === col.id ? { ...c2, cards: c2.cards.map((x2) => x2.id === card.id ? { ...x2, done: !x2.done } : x2) } : c2)
                }), children: card.done ? "reopen" : "done" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => patch(node.id, {
                  columns: node.columns.map((c2) => ({ ...c2, cards: c2.cards.filter((x2) => x2.id !== card.id) }))
                }), children: "×" })
              ] })
            ]
          },
          card.id
        )) })
      ]
    },
    col.id
  )) });
}
function CalendarView({ node }) {
  const patch = useApp((s) => s.patchNode);
  const [year, month] = node.month.split("-").map(Number);
  const first = new Date(year, month - 1, 1);
  const days = new Date(year, month, 0).getDate();
  const offset = (first.getDay() + 6) % 7;
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const shift = (delta) => {
    const d = new Date(year, month - 1 + delta, 1);
    patch(node.id, { month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` });
  };
  const addEvent = (day) => {
    const title = window.prompt("Event title");
    if (!title) return;
    const ev = {
      id: uid(),
      title,
      date: `${node.month}-${String(day).padStart(2, "0")}`,
      allDay: true,
      color: "#a78bfa"
    };
    patch(node.id, { events: [...node.events, ev] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pad", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => shift(-1), children: "‹" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        first.toLocaleString("en", { month: "long" }),
        " ",
        year
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => shift(1), children: "›" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cal-grid", children: [
      ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cal-dow", children: d }, d)),
      cells.map((day, i) => {
        const key = day ? `${node.month}-${String(day).padStart(2, "0")}` : "";
        const events = node.events.filter((e) => e.date === key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `cal-cell ${key === dayKey(/* @__PURE__ */ new Date()) ? "today" : ""}`, onDoubleClick: () => day && addEvent(day), children: [
          day && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cal-day", children: day }),
          events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "cal-ev",
              style: { background: e.color },
              title: `${e.title} — double-click to remove`,
              onDoubleClick: (ev) => {
                ev.stopPropagation();
                if (window.confirm(`Delete “${e.title}”?`)) patch(node.id, { events: node.events.filter((x2) => x2.id !== e.id) });
              },
              children: e.title
            },
            e.id
          ))
        ] }, i);
      })
    ] })
  ] });
}
function WebView({ node }) {
  const patch = useApp((s) => s.patchNode);
  const [url, setUrl] = reactExports.useState(node.url);
  const [key, setKey] = reactExports.useState(0);
  reactExports.useEffect(() => setUrl(node.url), [node.url]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "web-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "web-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => setKey((k2) => k2 + 1), children: "⟳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: url,
          onChange: (e) => setUrl(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              const next = url.startsWith("http") ? url : `http://${url}`;
              patch(node.id, { url: next });
              setKey((k2) => k2 + 1);
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => window.api.shell.openExternal(node.url), children: "↗" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: node.zoom, onChange: (e) => patch(node.id, { zoom: +e.target.value }), children: [50, 75, 100, 125, 150].map((z2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: z2, children: [
        z2,
        "%"
      ] }, z2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("webview", { src: node.url, style: { width: "100%", height: `calc(100% - 34px)`, transform: `scale(${node.zoom / 100})`, transformOrigin: "0 0" } }, key)
  ] });
}
function ShapeView({ node }) {
  const patch = useApp((s) => s.patchNode);
  const fill = node.style.fill === "transparent" ? "none" : node.style.fill;
  if (node.shape === "sticky") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky", style: { background: "#fdf0a8" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: "note-input",
        placeholder: "Sticky…",
        value: node.title === "sticky" ? "" : node.title,
        onChange: (e) => patch(node.id, { title: e.target.value })
      }
    ) });
  }
  if ((node.shape === "line" || node.shape === "arrow") && node.points?.length) {
    const pts = node.points.map((p2) => `${p2.x},${p2.y}`).join(" ");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "shape-svg", viewBox: `0 0 ${node.w} ${node.h}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: pts, fill: "none", stroke: node.style.stroke, strokeWidth: node.style.width }),
      node.shape === "arrow" && node.points.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: node.points[node.points.length - 1].x, cy: node.points[node.points.length - 1].y, r: 4, fill: node.style.stroke })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "shape-svg", viewBox: `0 0 ${node.w} ${node.h}`, preserveAspectRatio: "none", children: [
    node.shape === "rect" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: 2,
        y: 2,
        width: node.w - 4,
        height: node.h - 4,
        rx: 8,
        fill,
        stroke: node.style.stroke,
        strokeWidth: node.style.width,
        strokeDasharray: node.style.dashed ? "6 5" : void 0
      }
    ),
    node.shape === "ellipse" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ellipse",
      {
        cx: node.w / 2,
        cy: node.h / 2,
        rx: node.w / 2 - 3,
        ry: node.h / 2 - 3,
        fill,
        stroke: node.style.stroke,
        strokeWidth: node.style.width,
        strokeDasharray: node.style.dashed ? "6 5" : void 0
      }
    ),
    node.shape === "diamond" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "polygon",
      {
        points: `${node.w / 2},3 ${node.w - 3},${node.h / 2} ${node.w / 2},${node.h - 3} 3,${node.h / 2}`,
        fill,
        stroke: node.style.stroke,
        strokeWidth: node.style.width
      }
    )
  ] });
}
function CardView({ node }) {
  const [text, setText] = reactExports.useState(node.content ?? "");
  reactExports.useEffect(() => {
    if (!node.path) return;
    void window.api.fs.readFile(node.path).then((r2) => setText(r2.text));
  }, [node.path]);
  if (node.cardKind === "markdown") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-md", dangerouslySetInnerHTML: md$1(text || "# Empty") });
  }
  if (node.cardKind === "doc") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-md", dangerouslySetInnerHTML: md$1(text || node.content || "") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-code", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row tiny", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: node.path?.split(/[\\/]/).pop() ?? "snippet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => void navigator.clipboard.writeText(text), children: "copy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: text.slice(0, 2e4) || node.content || "No content" })
  ] });
}
function OrchestratorView({ node }) {
  const board = useApp((s) => s.board());
  const connectNodes = useApp((s) => s.connectNodes);
  const setTool = useApp((s) => s.setTool);
  const setWireFrom = useApp((s) => s.setWireFrom);
  const tool = useApp((s) => s.tool);
  const wireFrom = useApp((s) => s.wireFrom);
  const toast = useApp((s) => s.toast);
  const [text, setText] = reactExports.useState("");
  const consoles = board?.nodes.filter((n2) => n2.kind === "console") ?? [];
  const linked = new Set(node.wired);
  for (const w2 of board?.wires ?? []) {
    if (w2.from === node.id) linked.add(w2.to);
    if (w2.to === node.id) linked.add(w2.from);
  }
  const wired = consoles.filter((c2) => linked.has(c2.id));
  const linking = tool === "wire" && wireFrom === node.id;
  const toggleLink = () => {
    if (linking) {
      setTool("select");
      setWireFrom(null);
      return;
    }
    setTool("wire");
    setWireFrom(node.id);
    toast("Director linking — pick an agent on the board", "info");
  };
  const spawnAndLink = () => {
    const made = spawnConsoles(1);
    if (!made[0]) return;
    connectNodes(node.id, made[0].id);
    toast(`Linked ${made[0].title} to the Director`, "ok");
  };
  const send = () => {
    const order = text.trim();
    if (!order) return;
    if (wired.length) {
      for (const c2 of wired) sendOrder(c2.id, order);
      toast(`Order sent to ${wired.length} agent${wired.length === 1 ? "" : "s"}`, "ok");
    } else {
      void runCommand(order);
    }
    setText("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "director-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "director-top", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "director-kicker", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "director-dot" }),
        " ",
        wired.length ? `${wired.length} linked` : "No consoles connected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `director-connect ${linking ? "on" : ""}`, onClick: toggleLink, "aria-pressed": linking, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "link-mark", children: "⌁" }),
        " ",
        linking ? "Linking" : "Connect"
      ] })
    ] }),
    wired.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "director-links", children: wired.map((c2) => {
      const agent = getAgent(c2.agentId);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "director-link", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "director-avatar",
            style: {
              background: `color-mix(in srgb, ${agent.color} 18%, var(--panel-2))`,
              borderColor: `color-mix(in srgb, ${agent.color} 38%, transparent)`,
              color: agent.color
            },
            children: agent.name.slice(0, 1)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "director-link-main",
            onClick: () => window.dispatchEvent(new CustomEvent("hive:frame", { detail: c2.id })),
            title: `Focus ${c2.title}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: c2.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
                agent.name,
                " · ",
                c2.status
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "director-unlink",
            onClick: () => connectNodes(node.id, c2.id),
            title: `Disconnect ${c2.title}`,
            "aria-label": `Disconnect ${c2.title}`,
            children: "×"
          }
        )
      ] }, c2.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "director-stage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `director-orb ${linking ? "linking" : ""}`,
          onClick: toggleLink,
          "aria-label": linking ? "Cancel linking" : "Link an agent",
          "aria-pressed": linking,
          title: linking ? "Linking — pick an agent" : "Click to link an agent",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "director-ring", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "director-gem", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "director-gem-core" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "director-gem-shine" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "director-spark s1", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "director-spark s2", "aria-hidden": "true" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: wired.length ? `${wired.length} agent${wired.length === 1 ? "" : "s"} wired` : "No agents wired" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: linking ? "Click any agent on the board to rope it in." : wired.length ? "Every order goes to the whole wired crew." : "Spawn a fresh lane below, or tap Connect and pick consoles on the board." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "director-spawn", onClick: spawnAndLink, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "＋" }),
        " Spawn agent"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "director-cmd", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: text,
          placeholder: wired.length ? "Order the wired crew…" : "Try 'spawn two reviewers'…",
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "director-send", onClick: send, disabled: !text.trim(), title: "Send order", "aria-label": "Send order", children: "↑" })
    ] })
  ] });
}
function MemoryView({ node }) {
  const memory = useApp((s) => s.memory);
  const activeRepoId = useApp((s) => s.activeRepoId);
  const panel = useApp((s) => s.setPanel);
  const facts = memory.filter((f2) => f2.scope === "global" || f2.scope === activeRepoId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pad", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
      facts.length,
      " facts · ",
      node.scope === "global" ? "all repos" : "this repo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "fact-list", children: facts.slice(0, 6).map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: f2.kind }),
      " ",
      f2.text.slice(0, 80)
    ] }, f2.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => panel("memory"), children: "Open memory" })
  ] });
}
function BranchesView({ node }) {
  const repo = useApp((s) => s.repos.find((r2) => r2.id === s.activeRepoId));
  const [branches, setBranches] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState("");
  const toast = useApp((s) => s.toast);
  const load = () => {
    if (!repo) return;
    void window.api.git.status(repo.path).then((s) => setCurrent(s.branch));
    void window.api.git.branches(repo.path).then(setBranches);
  };
  reactExports.useEffect(load, [repo?.path]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pad", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
      "on ",
      current || "unknown"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "branch-list", children: branches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `branch ${b === current ? "on" : ""}`,
        onClick: () => {
          if (!repo) return;
          void window.api.git.checkout(repo.path, b).then(() => {
            setCurrent(b);
            toast(`Switched to ${b}`, "ok");
          }).catch((e) => toast(e.message, "error"));
        },
        children: b
      },
      b
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
      const name = window.prompt("New branch name");
      if (!name || !repo) return;
      void window.api.git.createBranch(repo.path, name).then(load);
    }, children: "New branch" })
  ] });
}
function NodeBody({ node }) {
  switch (node.kind) {
    case "console":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ConsoleNode, { node });
    case "note":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NoteView, { node });
    case "text":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TextView, { node });
    case "checklist":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChecklistView, { node })
      ] });
    case "kanban":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KanbanView, { node })
      ] });
    case "calendar":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarView, { node })
      ] });
    case "web":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WebView, { node })
      ] });
    case "image":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "image-body", src: node.src, alt: node.title })
      ] });
    case "shape":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ShapeView, { node });
    case "card":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardView, { node })
      ] });
    case "orchestrator":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrchestratorView, { node })
      ] });
    case "memory":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryView, { node })
      ] });
    case "branches":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head, { node }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BranchesView, { node })
      ] });
    default:
      return null;
  }
}
function wireGeometry(a2, b) {
  const acx = a2.x + a2.w / 2;
  const acy = a2.y + a2.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const horizontal = Math.abs(bcx - acx) >= Math.abs(bcy - acy);
  let x1, y1, x2, y2;
  let c1x, c1y, c2x, c2y;
  if (horizontal) {
    const right = bcx >= acx;
    x1 = right ? a2.x + a2.w : a2.x;
    y1 = acy;
    x2 = right ? b.x : b.x + b.w;
    y2 = bcy;
    const bend = Math.min(140, Math.max(18, Math.abs(x2 - x1) * 0.45)) * (right ? 1 : -1);
    c1x = x1 + bend;
    c1y = y1;
    c2x = x2 - bend;
    c2y = y2;
  } else {
    const down = bcy >= acy;
    x1 = acx;
    y1 = down ? a2.y + a2.h : a2.y;
    x2 = bcx;
    y2 = down ? b.y : b.y + b.h;
    const bend = Math.min(140, Math.max(18, Math.abs(y2 - y1) * 0.45)) * (down ? 1 : -1);
    c1x = x1;
    c1y = y1 + bend;
    c2x = x2;
    c2y = y2 - bend;
  }
  return { d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`, x1, y1, x2, y2 };
}
function Board({ board, active = true }) {
  const ref = reactExports.useRef(null);
  const worldRef = reactExports.useRef(null);
  const [size, setSize] = reactExports.useState({ w: 1200, h: 800 });
  const [space, setSpace] = reactExports.useState(false);
  const [drag, setDrag] = reactExports.useState(null);
  const [resize, setResize] = reactExports.useState(null);
  const [pan, setPan] = reactExports.useState(null);
  const [pen, setPen] = reactExports.useState(null);
  const [marquee, setMarquee] = reactExports.useState(null);
  const [wireCursor, setWireCursor] = reactExports.useState(null);
  const marqueeRef = reactExports.useRef(null);
  const clipboard = reactExports.useRef([]);
  const tool = useApp((s) => s.tool);
  const holdSpace = useApp((s) => s.settings.holdSpace);
  const setTool = useApp((s) => s.setTool);
  const selected = useApp((s) => s.selected);
  const setSelection = useApp((s) => s.setSelection);
  const toggleSelect = useApp((s) => s.toggleSelect);
  const addNode = useApp((s) => s.addNode);
  const addNodes = useApp((s) => s.addNodes);
  const updateBoard = useApp((s) => s.updateBoard);
  const patchNode = useApp((s) => s.patchNode);
  const removeNodes = useApp((s) => s.removeNodes);
  const bringToFront = useApp((s) => s.bringToFront);
  const toast = useApp((s) => s.toast);
  const wireFrom = useApp((s) => s.wireFrom);
  const setWireFrom = useApp((s) => s.setWireFrom);
  const connectNodes = useApp((s) => s.connectNodes);
  const v2 = board.viewport;
  const wireSource = wireFrom ? board.nodes.find((n2) => n2.id === wireFrom) : void 0;
  reactExports.useEffect(() => {
    const el2 = ref.current;
    if (!el2) return;
    const ro = new ResizeObserver(() => setSize({ w: el2.clientWidth, h: el2.clientHeight }));
    ro.observe(el2);
    setSize({ w: el2.clientWidth, h: el2.clientHeight });
    return () => ro.disconnect();
  }, []);
  reactExports.useEffect(() => {
    const el2 = ref.current;
    if (!el2) return;
    let raf = 0;
    let x2 = 0;
    let y2 = 0;
    const move = (e) => {
      const rect = el2.getBoundingClientRect();
      x2 = e.clientX - rect.left;
      y2 = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el2.style.setProperty("--mx", `${x2}px`);
        el2.style.setProperty("--my", `${y2}px`);
        raf = 0;
      });
    };
    el2.addEventListener("pointermove", move);
    return () => {
      el2.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  reactExports.useEffect(() => {
    if (tool !== "wire") {
      setWireCursor(null);
      return;
    }
    const el2 = ref.current;
    if (!el2) return;
    const move = (e) => {
      const rect = el2.getBoundingClientRect();
      setWireCursor({ x: (e.clientX - rect.left - v2.x) / v2.zoom, y: (e.clientY - rect.top - v2.y) / v2.zoom });
    };
    el2.addEventListener("pointermove", move);
    return () => el2.removeEventListener("pointermove", move);
  }, [tool, v2.x, v2.y, v2.zoom]);
  reactExports.useEffect(() => {
    const down = (e) => {
      if (!holdSpace && e.code === "Space" && !e.target.closest("input,textarea,[contenteditable]")) {
        setSpace(true);
        e.preventDefault();
      }
    };
    const up = (e) => {
      if (e.code === "Space") setSpace(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [holdSpace]);
  reactExports.useEffect(() => {
    if (!active) return;
    const frame2 = (e) => frameNode(e.detail);
    const fit = () => {
      if (!board.nodes.length) return;
      const minX = Math.min(...board.nodes.map((n2) => n2.x)) - 60;
      const minY = Math.min(...board.nodes.map((n2) => n2.y)) - 60;
      const maxX = Math.max(...board.nodes.map((n2) => n2.x + n2.w)) + 60;
      const maxY = Math.max(...board.nodes.map((n2) => n2.y + n2.h)) + 60;
      const zoom = Math.min(1.2, Math.min(size.w / (maxX - minX), size.h / (maxY - minY)));
      updateBoard((b) => ({
        ...b,
        viewport: { zoom, x: -minX * zoom + (size.w - (maxX - minX) * zoom) / 2, y: -minY * zoom + (size.h - (maxY - minY) * zoom) / 2 }
      }));
    };
    const frameRect = (e) => {
      const r2 = e.detail;
      if (!r2?.w || !r2?.h) return;
      const zoom = Math.min(1, (size.w - 150) / r2.w, (size.h - 210) / r2.h);
      updateBoard((b) => ({
        ...b,
        viewport: {
          zoom,
          x: size.w / 2 - (r2.x + r2.w / 2) * zoom,
          y: size.h / 2 - (r2.y + r2.h / 2) * zoom
        }
      }));
    };
    window.addEventListener("hive:frame", frame2);
    window.addEventListener("hive:fit", fit);
    window.addEventListener("hive:frame-rect", frameRect);
    return () => {
      window.removeEventListener("hive:frame", frame2);
      window.removeEventListener("hive:fit", fit);
      window.removeEventListener("hive:frame-rect", frameRect);
    };
  }, [board.nodes, size, updateBoard, active]);
  reactExports.useEffect(() => {
    if (!drag && !resize && !pan && !pen) return;
    const move = (e) => {
      if (pan) {
        updateBoard((b) => ({
          ...b,
          viewport: { ...b.viewport, x: pan.vx + (e.clientX - pan.startX), y: pan.vy + (e.clientY - pan.startY) }
        }));
      } else if (drag) {
        const dx = (e.clientX - drag.startX) / v2.zoom;
        const dy = (e.clientY - drag.startY) / v2.zoom;
        updateBoard((b) => ({
          ...b,
          nodes: b.nodes.map(
            (n2) => drag.ids.includes(n2.id) && drag.origins[n2.id] ? { ...n2, x: drag.origins[n2.id].x + dx, y: drag.origins[n2.id].y + dy } : n2
          )
        }));
      } else if (resize) {
        const w2 = Math.max(180, resize.w + (e.clientX - resize.startX) / v2.zoom);
        const h = Math.max(80, resize.h + (e.clientY - resize.startY) / v2.zoom);
        patchNode(resize.id, { w: w2, h });
      } else if (pen) {
        const p2 = toWorld(e.clientX, e.clientY);
        setPen({ points: [...pen.points, p2] });
      }
    };
    const up = () => {
      if (pen && pen.points.length > 2) {
        const xs = pen.points.map((p2) => p2.x);
        const ys = pen.points.map((p2) => p2.y);
        const shape = makeShape(Math.min(...xs), Math.min(...ys), "line");
        shape.w = Math.max(20, Math.max(...xs) - Math.min(...xs));
        shape.h = Math.max(20, Math.max(...ys) - Math.min(...ys));
        shape.points = pen.points.map((p2) => ({ x: p2.x - shape.x, y: p2.y - shape.y }));
        shape.style = { ...shape.style, stroke: "#f472b6", width: 3 };
        addNode(shape);
      }
      setDrag(null);
      setResize(null);
      setPan(null);
      setPen(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, resize, pan, pen, v2.zoom, updateBoard, patchNode, addNode]);
  const toWorld = (cx, cy) => {
    const rect = ref.current?.getBoundingClientRect();
    const left = rect?.left ?? 0;
    const top = rect?.top ?? 0;
    return { x: (cx - left - v2.x) / v2.zoom, y: (cy - top - v2.y) / v2.zoom };
  };
  const frameNode = (id2) => {
    const n2 = board.nodes.find((x2) => x2.id === id2);
    if (!n2) return;
    const zoom = Math.min(1.6, Math.max(0.5, Math.min((size.w - 160) / n2.w, (size.h - 160) / n2.h)));
    updateBoard((b) => ({
      ...b,
      viewport: {
        zoom,
        x: size.w / 2 - (n2.x + n2.w / 2) * zoom,
        y: size.h / 2 - (n2.y + n2.h / 2) * zoom
      }
    }));
  };
  reactExports.useEffect(() => {
    const el2 = ref.current;
    if (!el2 || !active) return;
    const handler = (e) => {
      e.preventDefault();
      const st = useApp.getState();
      const b = st.board();
      if (!b) return;
      const cur = b.viewport;
      const rect = el2.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * 14e-4);
      const next = Math.min(3, Math.max(0.2, cur.zoom * factor));
      st.updateBoard((bb2) => ({
        ...bb2,
        viewport: {
          zoom: next,
          x: mx - (mx - cur.x) * next / cur.zoom,
          y: my - (my - cur.y) * next / cur.zoom
        }
      }));
    };
    el2.addEventListener("wheel", handler, { passive: false });
    return () => el2.removeEventListener("wheel", handler);
  }, [active]);
  reactExports.useEffect(() => {
    if (!marquee) return;
    const move = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect || !marqueeRef.current) return;
      const next = { ...marqueeRef.current, x: e.clientX - rect.left, y: e.clientY - rect.top };
      marqueeRef.current = next;
      setMarquee(next);
    };
    const up = () => {
      const m2 = marqueeRef.current;
      marqueeRef.current = null;
      setMarquee(null);
      if (!m2 || Math.abs(m2.x - m2.startX) < 4 || Math.abs(m2.y - m2.startY) < 4) return;
      const x1 = (Math.min(m2.startX, m2.x) - v2.x) / v2.zoom;
      const y1 = (Math.min(m2.startY, m2.y) - v2.y) / v2.zoom;
      const x2 = (Math.max(m2.startX, m2.x) - v2.x) / v2.zoom;
      const y2 = (Math.max(m2.startY, m2.y) - v2.y) / v2.zoom;
      const hits = board.nodes.filter((n2) => n2.x < x2 && n2.x + n2.w > x1 && n2.y < y2 && n2.y + n2.h > y1).map((n2) => n2.id);
      setSelection(m2.additive ? [.../* @__PURE__ */ new Set([...selected, ...hits])] : hits);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [marquee !== null, board.nodes, selected, v2.x, v2.y, v2.zoom, setSelection]);
  reactExports.useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      const el2 = e.target;
      if (el2.closest("input,textarea,select,[contenteditable]")) return;
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if (mod && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.min(3, b.viewport.zoom + 0.1) } }));
      } else if (mod && e.key === "-") {
        e.preventDefault();
        updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.max(0.2, b.viewport.zoom - 0.1) } }));
      } else if (mod && key === "c" && selected.length) {
        clipboard.current = structuredClone(board.nodes.filter((n2) => selected.includes(n2.id)));
      } else if (mod && key === "x" && selected.length) {
        clipboard.current = structuredClone(board.nodes.filter((n2) => selected.includes(n2.id)));
        removeNodes(selected);
      } else if (mod && key === "v" && clipboard.current.length) {
        e.preventDefault();
        const copies = clipboard.current.map((n2) => {
          const copy = structuredClone(n2);
          copy.id = uid();
          copy.x += 36;
          copy.y += 36;
          if (copy.kind === "console") copy.launchKey = 0;
          return copy;
        });
        addNodes(copies);
        setSelection(copies.map((c2) => c2.id));
      } else if (mod && key === "a") {
        e.preventDefault();
        setSelection(board.nodes.map((n2) => n2.id));
      } else if (mod && key === "d") {
        e.preventDefault();
        const copies = board.nodes.filter((n2) => selected.includes(n2.id)).map((n2) => {
          const copy = structuredClone(n2);
          copy.id = uid();
          copy.x += 34;
          copy.y += 34;
          if (copy.kind === "console") copy.launchKey = 0;
          return copy;
        });
        if (copies.length) {
          addNodes(copies);
          setSelection(copies.map((c2) => c2.id));
        }
      } else if (e.key.startsWith("Arrow") && selected.length) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
        updateBoard((b) => ({
          ...b,
          nodes: b.nodes.map((n2) => selected.includes(n2.id) ? { ...n2, x: n2.x + dx, y: n2.y + dy } : n2)
        }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, board.nodes, selected, setSelection, addNodes, updateBoard, removeNodes]);
  const insertAt = (cx, cy) => {
    const p2 = toWorld(cx, cy);
    if (tool === "image") {
      void window.api.dialog.pickFiles().then((files) => {
        if (!files.length) return;
        addNode({
          id: uid(),
          kind: "image",
          x: p2.x,
          y: p2.y,
          w: 380,
          h: 260,
          z: 1,
          title: files[0].split(/[\\/]/).pop() ?? "Image",
          src: `file:///${files[0].replace(/\\/g, "/")}`,
          path: files[0]
        });
      });
      return;
    }
    const kind = tool === "note" ? "note" : tool === "text" ? "text" : tool === "web" ? "web tile" : tool === "console" ? "console" : tool === "shape" ? "shape" : null;
    if (!kind) return;
    const st = useApp.getState();
    const node = newNode(kind, p2.x - 60, p2.y - 30, {
      cwd: st.repos.find((r2) => r2.id === st.activeRepoId)?.path,
      ...kind === "console" ? { agentId: st.settings.defaultAgent } : {}
    });
    addNode(node);
    setSelection([node.id]);
    if (tool !== "console") setTool("select");
  };
  const onBackgroundDown = (e) => {
    if (e.button === 1 || e.button === 2 || tool === "hand" || space) {
      e.preventDefault();
      setPan({ kind: "pan", startX: e.clientX, startY: e.clientY, vx: v2.x, vy: v2.y });
      return;
    }
    if (e.button !== 0) return;
    if (tool === "wire") {
      if (wireFrom) {
        setWireFrom(null);
        toast("Connection canceled", "info");
      }
      return;
    }
    if (tool === "pen") {
      setPen({ points: [toWorld(e.clientX, e.clientY)] });
      return;
    }
    if (["note", "text", "web", "console", "shape", "image"].includes(tool)) {
      insertAt(e.clientX, e.clientY);
      return;
    }
    if (tool === "select") {
      const rect = ref.current.getBoundingClientRect();
      const m2 = {
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        additive: e.shiftKey
      };
      marqueeRef.current = m2;
      setMarquee(m2);
      if (!e.shiftKey) setSelection([]);
      return;
    }
    if (tool === "eraser") setSelection([]);
  };
  const onNodeDown = (e, node) => {
    e.stopPropagation();
    if (e.button === 1 || e.button === 2 || tool === "hand" || space) {
      e.preventDefault();
      setPan({ kind: "pan", startX: e.clientX, startY: e.clientY, vx: v2.x, vy: v2.y });
      return;
    }
    if (tool === "wire") {
      e.preventDefault();
      if (!wireFrom) {
        setWireFrom(node.id);
        setSelection([node.id]);
        toast("Rope: click another node", "info");
        return;
      }
      if (wireFrom === node.id) {
        setWireFrom(null);
        return;
      }
      const source = board.nodes.find((n2) => n2.id === wireFrom);
      if (!source) {
        setWireFrom(node.id);
        setSelection([node.id]);
        return;
      }
      const result = connectNodes(wireFrom, node.id);
      if (result === "added") toast(`Roped ${source.title} to ${node.title}`, "ok");
      else if (result === "removed") toast("Connection removed", "info");
      setSelection([node.id]);
      if (source.kind !== "orchestrator") setWireFrom(null);
      return;
    }
    if (tool === "eraser") {
      if (node.kind === "console") {
        if (window.confirm(`Remove ${node.title} from the board? Its session ends.`)) removeNodes([node.id]);
      } else removeNodes([node.id]);
      return;
    }
    if (e.button !== 0) return;
    const interactive = e.target.closest(
      "input,textarea,select,button,a,webview,.term-host,[contenteditable],.no-drag,.kb-card,[draggable]"
    );
    if (!interactive) {
      if (e.shiftKey) toggleSelect(node.id);
      else if (!selected.includes(node.id)) setSelection([node.id]);
      bringToFront(node.id);
      const ids = selected.includes(node.id) ? selected : [node.id];
      const origins = {};
      for (const n2 of board.nodes) if (ids.includes(n2.id)) origins[n2.id] = { x: n2.x, y: n2.y };
      setDrag({ kind: "drag", startX: e.clientX, startY: e.clientY, ids, origins });
      return;
    }
    bringToFront(node.id);
    if (!e.shiftKey) setSelection([node.id]);
  };
  const startResize = (e, node) => {
    e.stopPropagation();
    setResize({ kind: "resize", id: node.id, startX: e.clientX, startY: e.clientY, w: node.w, h: node.h });
  };
  const groupBounds = (ids) => {
    const members = board.nodes.filter((n2) => ids.includes(n2.id));
    if (!members.length) return null;
    const x2 = Math.min(...members.map((n2) => n2.x)) - 18;
    const y2 = Math.min(...members.map((n2) => n2.y)) - 34;
    const right = Math.max(...members.map((n2) => n2.x + n2.w)) + 18;
    const bottom = Math.max(...members.map((n2) => n2.y + n2.h)) + 18;
    return { x: x2, y: y2, w: right - x2, h: bottom - y2 };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `board tool-${tool} ${pan ? "panning" : ""}`,
      style: { backgroundPosition: `${Math.round(v2.x)}px ${Math.round(v2.y)}px` },
      onPointerDown: onBackgroundDown,
      onContextMenu: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "world",
            ref: worldRef,
            style: { transform: `translate(${Math.round(v2.x)}px, ${Math.round(v2.y)}px) scale(${v2.zoom})` },
            children: [
              board.groups.map((g) => {
                const b = groupBounds(g.memberIds);
                if (!b) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `group-box tint-${g.tint}`, style: { left: b.x, top: b.y, width: b.w, height: b.h }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group-label", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: g.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: g.role })
                ] }) }, g.id);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "wire-layer", children: [
                board.wires.map((w2) => {
                  const a2 = board.nodes.find((n2) => n2.id === w2.from);
                  const b = board.nodes.find((n2) => n2.id === w2.to);
                  if (!a2 || !b) return null;
                  const g = wireGeometry(a2, b);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: `wire-group wire-${w2.kind}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: `wire-base wire-${w2.kind}`, d: g.d }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: `wire wire-core wire-${w2.kind}`, d: g.d }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: `wire-port wire-${w2.kind}`, cx: g.x1, cy: g.y1, r: 2.6 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: `wire-port wire-${w2.kind}`, cx: g.x2, cy: g.y2, r: 2.6 })
                  ] }, w2.id);
                }),
                wireSource && wireCursor && (() => {
                  const g = wireGeometry(wireSource, { x: wireCursor.x, y: wireCursor.y, w: 0, h: 0 });
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "wire wire-ghost", d: g.d });
                })()
              ] }),
              board.nodes.map((node) => {
                const accent = node.kind === "console" ? getAgent(node.agentId).color : void 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `node node-${node.kind} ${selected.includes(node.id) ? "selected" : ""} ${wireFrom === node.id ? "wire-source" : ""} ${drag && drag.ids.includes(node.id) ? "dragging" : ""}`,
                    style: { left: node.x, top: node.y, width: node.w, height: node.h, zIndex: node.z, ...accent ? { "--node-accent": accent } : {} },
                    onPointerDown: (e) => onNodeDown(e, node),
                    onDoubleClick: (e) => {
                      if (node.kind === "console" && e.target.closest(".node-head")) frameNode(node.id);
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(NodeBody, { node }),
                      selected.includes(node.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resize-handle", onPointerDown: (e) => startResize(e, node) })
                    ]
                  },
                  node.id
                );
              })
            ]
          }
        ),
        pen && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "pen-layer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polyline",
          {
            points: pen.points.map((p2) => `${p2.x * v2.zoom + v2.x},${p2.y * v2.zoom + v2.y}`).join(" "),
            fill: "none",
            stroke: "#f472b6",
            strokeWidth: 3
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "zoom-hud", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.max(0.2, b.viewport.zoom - 0.1) } })), children: "−" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.round(v2.zoom * 100),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: Math.min(3, b.viewport.zoom + 0.1) } })), children: "+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", title: "Fit", onClick: () => window.dispatchEvent(new CustomEvent("hive:fit")), children: "⤢" })
        ] }),
        marquee && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "marquee",
            style: {
              left: Math.min(marquee.startX, marquee.x),
              top: Math.min(marquee.startY, marquee.y),
              width: Math.abs(marquee.x - marquee.startX),
              height: Math.abs(marquee.y - marquee.startY)
            }
          }
        ),
        tool === "wire" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tool-note wire-banner", onPointerDown: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wire-banner-dot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: wireSource ? `Connect ${wireSource.title} to…` : "Connect: click the first node" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => {
            setWireFrom(null);
            setTool("select");
          }, children: "Cancel" })
        ] }),
        tool === "pen" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tool-note", children: "Pen: drag to draw. P/E switch pen and eraser." }),
        tool === "eraser" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tool-note", children: "Eraser: click a node to remove it." }),
        tool === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tool-note", children: "Click anywhere to place a text box." })
      ]
    }
  );
}
const HINTS = [
  "Ask the brain to split this task across the crew",
  "spawn 4 codex",
  "add a kanban",
  "deploy preset Dev HQ",
  "@Otto fix the login",
  "commit and push"
];
function CommandBar({
  recording,
  onVoiceStart,
  onVoiceStop
}) {
  const draft = useApp((s) => s.commandDraft);
  const setDraft = useApp((s) => s.setCommandDraft);
  const threadOpen = useApp((s) => s.threadOpen);
  const setThreadOpen = useApp((s) => s.setThreadOpen);
  const threads = useApp((s) => s.threads);
  const activeRepoId = useApp((s) => s.activeRepoId);
  const board = useApp((s) => s.board());
  const settings = useApp((s) => s.settings);
  const brainBusy = useApp((s) => s.brainBusy);
  const setPanel = useApp((s) => s.setPanel);
  useApp((s) => s.addMessage);
  const clearThread = useApp((s) => s.clearThread);
  const selected = useApp((s) => s.selected);
  const toast = useApp((s) => s.toast);
  const [history, setHistory] = reactExports.useState([]);
  const [histIndex, setHistIndex] = reactExports.useState(-1);
  const [showHints, setShowHints] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const messages = (threads[activeRepoId ?? ""] ?? []).slice(-60);
  const cfg = llmConfig(settings);
  const provider = cfg.provider === "lmstudio" ? "LM Studio" : "Ollama";
  const model = cfg.model || "choose model";
  const last = [...messages].reverse().find((m2) => m2.role === "user" || m2.role === "brain");
  const preview = brainBusy ? "thinking…" : last ? last.text.replace(/\s+/g, " ").slice(0, 118) : "Ready — ask for a plan or just talk.";
  reactExports.useEffect(() => {
    const focus = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setThreadOpen(true);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
    };
    const focusBrain = () => {
      setThreadOpen(true);
      setTimeout(() => inputRef.current?.focus(), 40);
    };
    window.addEventListener("keydown", focus);
    window.addEventListener("hive:brain", focusBrain);
    return () => {
      window.removeEventListener("keydown", focus);
      window.removeEventListener("hive:brain", focusBrain);
    };
  }, [setThreadOpen]);
  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    setHistory((h) => [text, ...h].slice(0, 40));
    setHistIndex(-1);
    setShowHints(false);
    setThreadOpen(true);
    void runCommand(text);
  };
  const mod = window.api.platform === "darwin" ? "⌘" : "Ctrl";
  const running = consolesOf(board).filter((c2) => ["READY", "IDLE", "WORKING"].includes(c2.status)).length;
  const needs = consolesOf(board).filter((c2) => c2.status === "NEEDS YOU").length;
  const groupSelection = () => {
    if (selected.length < 2) {
      toast("Select two or more consoles to group", "info");
      return;
    }
    const role = window.prompt(
      `Role for ${selected.length} selected consoles (${ROLES.join(", ")})`,
      "General"
    );
    if (!role) return;
    const clean = ROLES.find((r2) => r2.toLowerCase() === role.toLowerCase()) ?? role;
    useApp.getState().updateBoard((b) => ({
      ...b,
      groups: [
        ...b.groups,
        {
          id: uid(),
          name: `${clean} ${b.groups.length + 1}`,
          role: clean,
          tint: TINTS[b.groups.length % TINTS.length],
          memberIds: [...selected]
        }
      ]
    }));
    toast(`Grouped ${selected.length} consoles as ${clean}`, "ok");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-dock", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-dock", role: "toolbar", "aria-label": "Board actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => spawnConsoles(1), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "＋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "New console" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => spawnConsoles(4), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "✦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Spawn 4" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: groupSelection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "▦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Group" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPanel("presets"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "▤" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Presets" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPanel("memory"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "◈" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Memory" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.dispatchEvent(new CustomEvent("hive:fit")), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "⤢" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fit" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-brain", "data-testid": "main-brain", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `brain-strip ${threadOpen ? "open" : ""}`,
          onClick: () => setThreadOpen(!threadOpen),
          role: "button",
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") setThreadOpen(!threadOpen);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brain-orb-mini", children: "B" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brain-strip-name", children: "Main Brain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `brain-strip-state ${brainBusy ? "busy" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
              preview
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "brain-model-btn",
                title: "Choose model in Settings",
                onClick: (e) => {
                  e.stopPropagation();
                  setPanel("settings");
                },
                children: [
                  provider,
                  " · ",
                  model
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brain-chevron", children: threadOpen ? "⌄" : "⌃" })
          ]
        }
      ),
      threadOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thread main-brain-thread", "data-testid": "main-brain-thread", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thread-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brain-pulse-small" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Main Brain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted small", children: "local · coordinates the crew" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => activeRepoId && clearThread(activeRepoId), children: "Clear" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => setThreadOpen(false), title: "Collapse", children: "×" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thread-body", children: [
          !messages.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brain-empty", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Ask me anything." }),
            " I can split a task across the agents, answer questions about the board, or just talk. Use ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "@Name" }),
            " when you want to speak to one agent directly."
          ] }),
          messages.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `msg msg-${m2.role}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "msg-meta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m2.role === "user" ? "You" : m2.role === "agent" ? m2.agent ?? "Agent" : m2.role === "brain" ? "Main Brain" : "GoT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(m2.at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "msg-text", children: m2.text })
          ] }, m2.id)),
          brainBusy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brain-typing", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Main Brain is thinking…" })
          ] })
        ] })
      ] })
    ] }),
    showHints && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hints", children: [
      HINTS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setDraft(h);
        setShowHints(false);
        inputRef.current?.focus();
      }, children: h }, h)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hint-sep" }),
      PRESETS.slice(0, 4).map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setDraft(`deploy preset ${p2.name}`);
        setShowHints(false);
      }, children: p2.name }, p2.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `command-bar ${recording ? "recording" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "chip cmd-key", onClick: () => setShowHints((v2) => !v2), title: "Commands", children: mod }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          "data-testid": "brain-input",
          value: draft,
          placeholder: recording ? "Listening…" : "Message the Main Brain… or @agent for a direct order",
          onChange: (e) => setDraft(e.target.value),
          onBlur: () => setTimeout(() => setShowHints(false), 180),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            } else if (e.key === "ArrowUp" && history.length) {
              const next = Math.min(history.length - 1, histIndex + 1);
              setHistIndex(next);
              setDraft(history[next]);
            } else if (e.key === "ArrowDown") {
              const next = histIndex - 1;
              setHistIndex(next);
              setDraft(next >= 0 ? history[next] : "");
            } else if (e.key === "Escape") {
              setShowHints(false);
              inputRef.current?.blur();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `mic ${recording ? "on" : ""}`,
          title: "Hold to talk (Space)",
          onPointerDown: (e) => {
            e.preventDefault();
            onVoiceStart();
          },
          onPointerUp: (e) => {
            e.preventDefault();
            onVoiceStop();
          },
          onPointerLeave: () => recording && onVoiceStop(),
          children: recording ? "●" : "🎙"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "send", onClick: submit, title: "Send", "data-testid": "brain-send", children: "↑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `count ${needs ? "warn" : ""}`, title: "running consoles", children: [
        running,
        " live",
        needs ? ` · ${needs} need${needs === 1 ? "s" : ""} you` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dock-hint", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Space" }),
        " talk"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          mod,
          "K"
        ] }),
        " focus brain"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "@name" }),
        " direct to agent"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        provider,
        " · ",
        model
      ] })
    ] })
  ] });
}
function Home() {
  const repos = useApp((s) => s.repos);
  const activeId = useApp((s) => s.activeRepoId);
  const recent = useApp((s) => s.recent);
  const addRepo = useApp((s) => s.addRepo);
  const setRepo = useApp((s) => s.setRepo);
  const removeRepo = useApp((s) => s.removeRepo);
  const goHome = useApp((s) => s.goHome);
  const setComposerOpen = useApp((s) => s.setComposerOpen);
  const [preset, setPreset] = reactExports.useState("");
  const [branches, setBranches] = reactExports.useState({});
  const [menu, setMenu] = reactExports.useState(null);
  const toast = useApp((s) => s.toast);
  reactExports.useEffect(() => {
    void (async () => {
      const out = {};
      for (const r2 of repos) {
        try {
          const s = await window.api.git.status(r2.path);
          if (s.repo) out[r2.path] = s.branch;
        } catch {
        }
      }
      setBranches(out);
    })();
  }, [repos]);
  const add2 = async () => {
    const path = await window.api.dialog.pickFolder();
    if (path) addRepo(path);
  };
  const startMainBrain = async () => {
    if (!activeRepo(useApp.getState())) {
      const path = await window.api.dialog.pickFolder();
      if (!path) return;
      addRepo(path);
    }
    useApp.setState({ showHome: false, threadOpen: true });
    setTimeout(() => window.dispatchEvent(new CustomEvent("hive:brain")), 80);
  };
  const addAndCompose = async () => {
    const path = await window.api.dialog.pickFolder();
    if (!path) return;
    addRepo(path);
    setTimeout(() => setComposerOpen(true), 160);
  };
  const dispatch2 = async () => {
    const repo = activeRepo(useApp.getState());
    if (!repo) {
      toast("Add a repo first", "error");
      return;
    }
    goHome();
    useApp.setState({ showHome: false });
    if (preset) setTimeout(() => deployPreset(preset), 60);
  };
  const ordered = [...repos].sort((a2, b) => {
    const ra2 = recent.indexOf(a2.id);
    const rb2 = recent.indexOf(b.id);
    return (ra2 < 0 ? 99 : ra2) - (rb2 < 0 ? 99 : rb2);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-badge", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
        " Main Brain · local models · one project"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
        "Talk to the brain.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Run the whole crew." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Main Brain is always on the board. Chat with it in your language, let it split work across agents, and talk to any agent directly when you want. Ollama and LM Studio stay local." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "pill-btn brain-cta", onClick: () => void startMainBrain(), children: "◉ Talk to Main Brain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn",
            onClick: () => activeRepo(useApp.getState()) ? setComposerOpen(true) : void addAndCompose(),
            children: "＋ Launch a team"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "compose", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "or start from a preset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: preset, onChange: (e) => setPreset(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Start from a preset…" }),
          PRESETS.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p2.id, children: [
            p2.name,
            " · ",
            p2.lanes.length,
            " agents"
          ] }, p2.id))
        ] }),
        ordered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: dispatch2, children: "Deploy preset" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-preview", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-glow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-card hp-a", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Otto" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "WORKING" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-scan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-term", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "›" }),
            " refactor the checkout flow"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-dim", children: "reading 12 files · planning 3 edits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-line short" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "›" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hp-caret" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-card hp-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "ready" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mira" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "ready", children: "READY" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-term", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-dim", children: "tests pass · 42 files checked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-line short" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hp-note", children: [
        "Ship the beta",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "on Friday."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hp-ring" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Repos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted small", children: [
          repos.length,
          " tracked"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: add2, children: "Add a repo" })
      ] }),
      !repos.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-card", onClick: add2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Drop a project here" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Click to choose a folder. Nothing is copied; the board points at it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "repo-grid", children: ordered.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `repo-card ${r2.id === activeId ? "active" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "repo-card-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "repo-badge", children: r2.name.slice(0, 2).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "repo-card-name", children: r2.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted tiny", children: r2.path })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => setMenu(menu === r2.id ? null : r2.id), children: "⋯" }),
          menu === r2.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "node-menu right", onMouseLeave: () => setMenu(null), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              removeRepo(r2.id);
              setMenu(null);
            }, children: "Remove from GoT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              void window.api.shell.openPath(r2.path);
              setMenu(null);
            }, children: "Open folder" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row tiny muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: branches[r2.path] ? `on ${branches[r2.path]}` : "no git repo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            r2.workspaces.length,
            " workspace",
            r2.workspaces.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setRepo(r2.id), children: "Open board" })
      ] }, r2.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "steps", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "1." }),
          " Add a folder. Each workspace is a board saved as JSON."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "2." }),
          " Add a crew of real PTYs — all working in the same folder."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "3." }),
          " Chat with the Main Brain. It splits work and relays team updates."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "4." }),
          " Watch the Mission Map, push memory, and commit from the board."
        ] })
      ] })
    ] })
  ] });
}
function tree_add(d) {
  const x2 = +this._x.call(null, d), y2 = +this._y.call(null, d);
  return add(this.cover(x2, y2), x2, y2, d);
}
function add(tree, x2, y2, d) {
  if (isNaN(x2) || isNaN(y2)) return tree;
  var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
  if (!node) return tree._root = leaf, tree;
  while (node.length) {
    if (right = x2 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y2 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x2 === xp && y2 === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x2 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y2 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  if (!Array.isArray(data)) data = Array.from(data);
  const n2 = data.length;
  const xz = new Float64Array(n2);
  const yz = new Float64Array(n2);
  let x0 = Infinity, y0 = x0, x1 = -x0, y1 = x1;
  for (let i = 0, d, x2, y2; i < n2; ++i) {
    if (isNaN(x2 = +this._x.call(null, d = data[i])) || isNaN(y2 = +this._y.call(null, d))) {
      xz[i] = NaN;
      continue;
    }
    xz[i] = x2;
    yz[i] = y2;
    if (x2 < x0) x0 = x2;
    if (x2 > x1) x1 = x2;
    if (y2 < y0) y0 = y2;
    if (y2 > y1) y1 = y2;
  }
  if (x0 > x1 || y0 > y1) return this;
  this.cover(x0, y0).cover(x1, y1);
  for (let i = 0; i < n2; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}
function tree_cover(x2, y2) {
  if (isNaN(x2 = +x2) || isNaN(y2 = +y2)) return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x2)) + 1;
    y1 = (y0 = Math.floor(y2)) + 1;
  } else {
    var z2 = x1 - x0 || 1, node = this._root, parent, i;
    while (x0 > x2 || x2 >= x1 || y0 > y2 || y2 >= y1) {
      i = (y2 < y0) << 1 | x2 < x0;
      parent = new Array(4), parent[i] = node, node = parent, z2 *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z2, y1 = y0 + z2;
          break;
        case 1:
          x0 = x1 - z2, y1 = y0 + z2;
          break;
        case 2:
          x1 = x0 + z2, y0 = y1 - z2;
          break;
        case 3:
          x0 = x1 - z2, y0 = y1 - z2;
          break;
      }
    }
    if (this._root && this._root.length) this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}
function tree_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do
      data.push(node.data);
    while (node = node.next);
  });
  return data;
}
function tree_extent(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}
function tree_find(x2, y2, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q2, i;
  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x2 - radius, y0 = y2 - radius;
    x3 = x2 + radius, y3 = y2 + radius;
    radius *= radius;
  }
  while (q2 = quads.pop()) {
    if (!(node = q2.node) || (x1 = q2.x0) > x3 || (y1 = q2.y0) > y3 || (x22 = q2.x1) < x0 || (y22 = q2.y1) < y0) continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(
        new Quad(node[3], xm, ym, x22, y22),
        new Quad(node[2], x1, ym, xm, y22),
        new Quad(node[1], xm, y1, x22, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );
      if (i = (y2 >= ym) << 1 | x2 >= xm) {
        q2 = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q2;
      }
    } else {
      var dx = x2 - +this._x.call(null, node.data), dy = y2 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x2 - d, y0 = y2 - d;
        x3 = x2 + d, y3 = y2 + d;
        data = node.data;
      }
    }
  }
  return data;
}
function tree_remove(d) {
  if (isNaN(x2 = +this._x.call(null, d)) || isNaN(y2 = +this._y.call(null, d))) return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x2, y2, xm, ym, right, bottom, i, j;
  if (!node) return this;
  if (node.length) while (true) {
    if (right = x2 >= (xm = (x0 + x1) / 2)) x0 = xm;
    else x1 = xm;
    if (bottom = y2 >= (ym = (y0 + y1) / 2)) y0 = ym;
    else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
  }
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;
  if (previous) return next ? previous.next = next : delete previous.next, this;
  if (!parent) return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n2 = data.length; i < n2; ++i) this.remove(data[i]);
  return this;
}
function tree_root() {
  return this._root;
}
function tree_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do
      ++size;
    while (node = node.next);
  });
  return size;
}
function tree_visit(callback) {
  var quads = [], q2, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    if (!callback(node = q2.node, x0 = q2.x0, y0 = q2.y0, x1 = q2.x1, y1 = q2.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}
function tree_visitAfter(callback) {
  var quads = [], next = [], q2;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    var node = q2.node;
    if (node.length) {
      var child, x0 = q2.x0, y0 = q2.y0, x1 = q2.x1, y1 = q2.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q2);
  }
  while (q2 = next.pop()) {
    callback(q2.node, q2.x0, q2.y0, q2.x1, q2.y1);
  }
  return this;
}
function defaultX(d) {
  return d[0];
}
function tree_x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}
function defaultY(d) {
  return d[1];
}
function tree_y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}
function quadtree(nodes, x2, y2) {
  var tree = new Quadtree(x2 == null ? defaultX : x2, y2 == null ? defaultY : y2, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x2, y2, x0, y0, x1, y1) {
  this._x = x2;
  this._y = y2;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy = { data: leaf.data }, next = copy;
  while (leaf = leaf.next) next = next.next = { data: leaf.data };
  return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node) return copy;
  if (!node.length) return copy._root = leaf_copy(node), copy;
  nodes = [{ source: node, target: copy._root = new Array(4) }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({ source: child, target: node.target[i] = new Array(4) });
        else node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy;
};
treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n2 = arguments.length, _ = {}, t2; i < n2; ++i) {
    if (!(t2 = arguments[i] + "") || t2 in _ || /[\s.]/.test(t2)) throw new Error("illegal type: " + t2);
    _[t2] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t2) {
    var name = "", i = t2.indexOf(".");
    if (i >= 0) name = t2.slice(i + 1), t2 = t2.slice(0, i);
    if (t2 && !types.hasOwnProperty(t2)) throw new Error("unknown type: " + t2);
    return { type: t2, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T2 = parseTypenames(typename + "", _), t2, i = -1, n2 = T2.length;
    if (arguments.length < 2) {
      while (++i < n2) if ((t2 = (typename = T2[i]).type) && (t2 = get(_[t2], typename.name))) return t2;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n2) {
      if (t2 = (typename = T2[i]).type) _[t2] = set(_[t2], typename.name, callback);
      else if (callback == null) for (t2 in _) _[t2] = set(_[t2], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t2 in _) copy[t2] = _[t2].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n2 = arguments.length - 2) > 0) for (var args = new Array(n2), i = 0, n2, t2; i < n2; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t2 = this._[type], i = 0, n2 = t2.length; i < n2; ++i) t2[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t2 = this._[type], i = 0, n2 = t2.length; i < n2; ++i) t2[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n2 = type.length, c2; i < n2; ++i) {
    if ((c2 = type[i]).name === name) {
      return c2.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n2 = type.length; i < n2; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({ name, value: callback });
  return type;
}
var frame = 0, timeout$1 = 0, interval$1 = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f2) {
  setTimeout(f2, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t2 = new Timer();
  t2.restart(callback, delay, time);
  return t2;
}
function timerFlush() {
  now();
  ++frame;
  var t2 = taskHead, e;
  while (t2) {
    if ((e = clockNow - t2._time) >= 0) t2._call.call(void 0, e);
    t2 = t2._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, Math.ceil(time - clock.now() - clockSkew) + 1);
    if (interval$1) interval$1 = clearInterval(interval$1);
  } else {
    if (!interval$1) clockLast = clock.now(), interval$1 = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function center(x2, y2) {
  var nodes, strength = 1;
  if (x2 == null) x2 = 0;
  if (y2 == null) y2 = 0;
  function force() {
    var i, n2 = nodes.length, node, sx = 0, sy = 0;
    for (i = 0; i < n2; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }
    for (sx = (sx / n2 - x2) * strength, sy = (sy / n2 - y2) * strength, i = 0; i < n2; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  };
  force.x = function(_) {
    return arguments.length ? (x2 = +_, force) : x2;
  };
  force.y = function(_) {
    return arguments.length ? (y2 = +_, force) : y2;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  return force;
}
function constant(x2) {
  return function() {
    return x2;
  };
}
function jiggle(random) {
  return (random() - 0.5) * 1e-6;
}
function index(d) {
  return d.index;
}
function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}
function link(links) {
  var id2 = index, strength = defaultStrength, strengths, distance = constant(30), distances, nodes, count, bias, random, iterations = 1;
  if (links == null) links = [];
  function defaultStrength(link2) {
    return 1 / Math.min(count[link2.source.index], count[link2.target.index]);
  }
  function force(alpha) {
    for (var k2 = 0, n2 = links.length; k2 < iterations; ++k2) {
      for (var i = 0, link2, source, target, x2, y2, l2, b; i < n2; ++i) {
        link2 = links[i], source = link2.source, target = link2.target;
        x2 = target.x + target.vx - source.x - source.vx || jiggle(random);
        y2 = target.y + target.vy - source.y - source.vy || jiggle(random);
        l2 = Math.sqrt(x2 * x2 + y2 * y2);
        l2 = (l2 - distances[i]) / l2 * alpha * strengths[i];
        x2 *= l2, y2 *= l2;
        target.vx -= x2 * (b = bias[i]);
        target.vy -= y2 * b;
        source.vx += x2 * (b = 1 - b);
        source.vy += y2 * b;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n2 = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id2(d, i2, nodes), d])), link2;
    for (i = 0, count = new Array(n2); i < m2; ++i) {
      link2 = links[i], link2.index = i;
      if (typeof link2.source !== "object") link2.source = find(nodeById, link2.source);
      if (typeof link2.target !== "object") link2.target = find(nodeById, link2.target);
      count[link2.source.index] = (count[link2.source.index] || 0) + 1;
      count[link2.target.index] = (count[link2.target.index] || 0) + 1;
    }
    for (i = 0, bias = new Array(m2); i < m2; ++i) {
      link2 = links[i], bias[i] = count[link2.source.index] / (count[link2.source.index] + count[link2.target.index]);
    }
    strengths = new Array(m2), initializeStrength();
    distances = new Array(m2), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes) return;
    for (var i = 0, n2 = links.length; i < n2; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }
  function initializeDistance() {
    if (!nodes) return;
    for (var i = 0, n2 = links.length; i < n2; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function(_) {
    return arguments.length ? (id2 = _, force) : id2;
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
  };
  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
  };
  return force;
}
const a = 1664525;
const c = 1013904223;
const m = 4294967296;
function lcg() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}
function x$1(d) {
  return d.x;
}
function y$1(d) {
  return d.y;
}
var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation(nodes) {
  var simulation2, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch("tick", "end"), random = lcg();
  if (nodes == null) nodes = [];
  function step() {
    tick();
    event.call("tick", simulation2);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation2);
    }
  }
  function tick(iterations) {
    var i, n2 = nodes.length, node;
    if (iterations === void 0) iterations = 1;
    for (var k2 = 0; k2 < iterations; ++k2) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function(force) {
        force(alpha);
      });
      for (i = 0; i < n2; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }
    return simulation2;
  }
  function initializeNodes() {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation2 = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation2;
    },
    stop: function() {
      return stepper.stop(), simulation2;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation2) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation2) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation2) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation2) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation2) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation2) : 1 - velocityDecay;
    },
    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation2) : random;
    },
    force: function(name, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation2) : forces.get(name);
    },
    find: function(x2, y2, radius) {
      var i = 0, n2 = nodes.length, dx, dy, d2, node, closest;
      if (radius == null) radius = Infinity;
      else radius *= radius;
      for (i = 0; i < n2; ++i) {
        node = nodes[i];
        dx = x2 - node.x;
        dy = y2 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation2) : event.on(name);
    }
  };
}
function manyBody() {
  var nodes, node, random, alpha, strength = constant(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
  function force(_) {
    var i, n2 = nodes.length, tree = quadtree(nodes, x$1, y$1).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n2; ++i) node = nodes[i], tree.visit(apply);
  }
  function initialize() {
    if (!nodes) return;
    var i, n2 = nodes.length, node2;
    strengths = new Array(n2);
    for (i = 0; i < n2; ++i) node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
  }
  function accumulate(quad) {
    var strength2 = 0, q2, c2, weight = 0, x2, y2, i;
    if (quad.length) {
      for (x2 = y2 = i = 0; i < 4; ++i) {
        if ((q2 = quad[i]) && (c2 = Math.abs(q2.value))) {
          strength2 += q2.value, weight += c2, x2 += c2 * q2.x, y2 += c2 * q2.y;
        }
      }
      quad.x = x2 / weight;
      quad.y = y2 / weight;
    } else {
      q2 = quad;
      q2.x = q2.data.x;
      q2.y = q2.data.y;
      do
        strength2 += strengths[q2.data.index];
      while (q2 = q2.next);
    }
    quad.value = strength2;
  }
  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;
    var x3 = quad.x - node.x, y2 = quad.y - node.y, w2 = x2 - x1, l2 = x3 * x3 + y2 * y2;
    if (w2 * w2 / theta2 < l2) {
      if (l2 < distanceMax2) {
        if (x3 === 0) x3 = jiggle(random), l2 += x3 * x3;
        if (y2 === 0) y2 = jiggle(random), l2 += y2 * y2;
        if (l2 < distanceMin2) l2 = Math.sqrt(distanceMin2 * l2);
        node.vx += x3 * quad.value * alpha / l2;
        node.vy += y2 * quad.value * alpha / l2;
      }
      return true;
    } else if (quad.length || l2 >= distanceMax2) return;
    if (quad.data !== node || quad.next) {
      if (x3 === 0) x3 = jiggle(random), l2 += x3 * x3;
      if (y2 === 0) y2 = jiggle(random), l2 += y2 * y2;
      if (l2 < distanceMin2) l2 = Math.sqrt(distanceMin2 * l2);
    }
    do
      if (quad.data !== node) {
        w2 = strengths[quad.data.index] * alpha / l2;
        node.vx += x3 * w2;
        node.vy += y2 * w2;
      }
    while (quad = quad.next);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };
  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}
function x(x2) {
  var strength = constant(0.1), nodes, strengths, xz;
  if (typeof x2 !== "function") x2 = constant(x2 == null ? 0 : +x2);
  function force(alpha) {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n2 = nodes.length;
    strengths = new Array(n2);
    xz = new Array(n2);
    for (i = 0; i < n2; ++i) {
      strengths[i] = isNaN(xz[i] = +x2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };
  force.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x2;
  };
  return force;
}
function y(y2) {
  var strength = constant(0.1), nodes, strengths, yz;
  if (typeof y2 !== "function") y2 = constant(y2 == null ? 0 : +y2);
  function force(alpha) {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i, n2 = nodes.length;
    strengths = new Array(n2);
    yz = new Array(n2);
    for (i = 0; i < n2; ++i) {
      strengths[i] = isNaN(yz[i] = +y2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };
  force.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y2;
  };
  return force;
}
const md = (text) => ({ __html: marked.parse(text, { async: false }) });
function Studios({ panel }) {
  if (panel === "documents") return /* @__PURE__ */ jsxRuntimeExports.jsx(Documents, {});
  if (panel === "diagrams") return /* @__PURE__ */ jsxRuntimeExports.jsx(Diagrams, {});
  if (panel === "code") return /* @__PURE__ */ jsxRuntimeExports.jsx(CodeStudio, {});
  if (panel === "markdown") return /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownStudio, {});
  if (panel === "skills") return /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {});
  return null;
}
const DOC_TYPES = ["Project overview", "Onboarding guide", "Architecture", "README", "API reference", "Data model", "Security overview", "Testing guide", "Release notes"];
function Documents() {
  const repo = activeRepo(useApp((s) => s));
  const settings = useApp((s) => s.settings);
  const toast = useApp((s) => s.toast);
  const addNode = useApp((s) => s.addNode);
  const [type, setType] = reactExports.useState(DOC_TYPES[0]);
  const [effort, setEffort] = reactExports.useState("Balanced");
  const [custom, setCustom] = reactExports.useState("");
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [versions, setVersions] = reactExports.useState([]);
  const words = effort === "Quick" ? "400 to 700" : effort === "Thorough" ? "900 to 1,500" : "700 to 1,100";
  const generate = async () => {
    if (!repo) return;
    setBusy(true);
    setText("");
    try {
      const entries = await window.api.fs.readDir(repo.path);
      let readme = "";
      try {
        readme = (await window.api.fs.readFile(`${repo.path}/README.md`)).text.slice(0, 6e3);
      } catch {
        readme = "";
      }
      const cfg = llmConfig(settings);
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        messages: [
          {
            role: "system",
            content: `You write ${type} documents for a software repository, in English Markdown. Target ${words} words. Use headings, short paragraphs and concrete file names. Do not invent APIs you cannot infer. Start with a # title.`
          },
          {
            role: "user",
            content: `Repository: ${repo.name}
Path: ${repo.path}
Top level: ${entries.map((e) => `${e.name}${e.dir ? "/" : ""}`).join(", ")}

README:
${readme || "(none)"}

${custom ? `Extra request: ${custom}` : ""}`
          }
        ]
      });
      if (!res.ok) {
        toast(res.error ?? "Generation failed", "error");
        return;
      }
      setText(res.text);
      setVersions((v2) => [{ id: uid(), title: type, at: Date.now(), text: res.text }, ...v2].slice(0, 20));
    } finally {
      setBusy(false);
    }
  };
  const exportPdf = async () => {
    if (!text) return;
    const headings = [...text.matchAll(/^#{1,3} (.+)$/gm)].map((m2) => m2[1]);
    const body = marked.parse(text, { async: false });
    const html2 = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page { size: A4; margin: 18mm 16mm; }
      body{font-family:Georgia,serif;color:#1f2937;line-height:1.55;font-size:11.5pt}
      .cover{height:250mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always}
      .cover .mark{font:600 12px system-ui;letter-spacing:.22em;color:#0f766e;text-transform:uppercase}
      .cover h1{font-size:34pt;margin:12mm 0 6mm;line-height:1.1}
      .cover .meta{font:12px system-ui;color:#6b7280}
      .toc{page-break-after:always}
      .toc h2{font-size:18pt}
      .toc ol{font:12px system-ui;line-height:1.9}
      h1,h2,h3{page-break-after:avoid} pre{background:#f3f4f6;padding:8px;font-size:9pt;overflow:hidden}
      code{font-family:Consolas,monospace;font-size:9.5pt}
      img{max-width:100%} hr{border:none;border-top:1px solid #e5e7eb}
    </style></head><body>
      <div class="cover">
        <div class="mark">GoT · ${escapeHtml(type)}</div>
        <h1>${escapeHtml(text.match(/^#\s+(.+)$/m)?.[1] ?? `${repo?.name} — ${type}`)}</h1>
        <div class="meta">${escapeHtml(repo?.name ?? "")} · ${(/* @__PURE__ */ new Date()).toLocaleDateString()} · ${escapeHtml(llmConfig(settings).model)}</div>
      </div>
      ${headings.length >= 3 ? `<div class="toc"><h2>Contents</h2><ol>${headings.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ol></div>` : ""}
      ${body}
    </body></html>`;
    const path = await window.api.pdf.export(html2, `${repo?.name ?? "document"}-${type.toLowerCase().replace(/\s+/g, "-")}`);
    if (path) toast(`PDF written to ${path}`, "ok");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Ask the local model for a document about this repo. It reads the folder listing and README, never your whole disk." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: type, onChange: (e) => setType(e.target.value), children: DOC_TYPES.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t2 }, t2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Effort" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["Quick", "Balanced", "Thorough"].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: effort === e ? "on" : "", onClick: () => setEffort(e), children: e }, e)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ask for anything" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", placeholder: "e.g. a migration plan from REST to GraphQL", value: custom, onChange: (e) => setCustom(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", disabled: busy || !repo, onClick: () => void generate(), children: busy ? "Writing…" : "Generate" }),
      text && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => void exportPdf(), children: "Export PDF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => {
          navigator.clipboard.writeText(text);
          toast("Markdown copied", "ok");
        }, children: "Copy Markdown" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      text && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => {
        addNode({
          id: uid(),
          kind: "card",
          cardKind: "doc",
          x: 120,
          y: 120,
          w: 420,
          h: 320,
          z: 1,
          title: `${type} · ${repo?.name}`,
          content: text
        });
        toast("Document placed on the board", "ok");
      }, children: "Add to board" })
    ] }),
    busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-line", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) }),
    text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "doc-preview", dangerouslySetInnerHTML: md(text) }),
    versions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Library" }),
      versions.map((v2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-row clickable", onClick: () => {
        setText(v2.text);
        setType(v2.title);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: v2.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted tiny", children: new Date(v2.at).toLocaleTimeString() })
      ] }, v2.id))
    ] })
  ] });
}
function Diagrams() {
  const repo = activeRepo(useApp((s) => s));
  const settings = useApp((s) => s.settings);
  const toast = useApp((s) => s.toast);
  const addNodes = useApp((s) => s.addNodes);
  const updateBoard = useApp((s) => s.updateBoard);
  const [kind, setKind] = reactExports.useState("Architecture");
  const [style, setStyle] = reactExports.useState("Ink");
  const [effort, setEffort] = reactExports.useState("Balanced");
  const [busy, setBusy] = reactExports.useState(false);
  const [spec, setSpec] = reactExports.useState(null);
  const generate = async () => {
    if (!repo) return;
    setBusy(true);
    try {
      const entries = await window.api.fs.readDir(repo.path);
      const count = effort === "Quick" ? "6 to 10" : effort === "Thorough" ? "10 to 16" : "8 to 14";
      const cfg = llmConfig(settings);
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        json: true,
        messages: [
          {
            role: "system",
            content: `You describe a ${kind} diagram of a repository as JSON:
{"title":"...","nodes":[{"id":"a","label":"...","note":"...","shape":"box|ellipse|diamond"}],"edges":[{"from":"a","to":"b","label":"short verb"}]}
Use ${count} nodes. Labels are 1-4 words. Edges only between existing ids. Answer JSON only.`
          },
          { role: "user", content: `Repo ${repo.name}. Top level: ${entries.map((e) => e.name + (e.dir ? "/" : "")).join(", ")}` }
        ]
      });
      if (!res.ok) return toast(res.error ?? "Diagram failed", "error");
      const parsed = JSON.parse(res.text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
      if (!parsed.nodes?.length) return toast("The model returned no usable diagram", "error");
      setSpec(parsed);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Diagram failed", "error");
    } finally {
      setBusy(false);
    }
  };
  const place = () => {
    if (!spec) return;
    const colors = ["#f472b6", "#38bdf8", "#fbbf24", "#34d399", "#a78bfa", "#fb923c"];
    const cols = Math.ceil(Math.sqrt(spec.nodes.length));
    const shapes = spec.nodes.map((n2, i) => {
      const s = makeShape(160 + i % cols * 260, 200 + Math.floor(i / cols) * 200, n2.shape === "ellipse" ? "ellipse" : n2.shape === "diamond" ? "diamond" : "rect");
      s.title = n2.label;
      s.w = 200;
      s.h = 110;
      s.style = {
        ...s.style,
        stroke: style === "Colorful" ? colors[i % colors.length] : "#cbd5e1",
        fill: style === "Colorful" ? `${colors[i % colors.length]}22` : "transparent"
      };
      if (n2.note) s.style = s.style;
      return s;
    });
    const index2 = new Map(spec.nodes.map((n2, i) => [n2.id, shapes[i]]));
    addNodes(shapes);
    updateBoard((b) => ({
      ...b,
      wires: [
        ...b.wires,
        ...spec.edges.filter((e) => index2.has(e.from) && index2.has(e.to)).map((e) => ({ id: uid(), from: index2.get(e.from).id, to: index2.get(e.to).id, kind: "plain" }))
      ]
    }));
    toast(`${shapes.length} shapes placed on the board`, "ok");
  };
  const exportPng = () => {
    if (!spec) return;
    const canvas = document.createElement("canvas");
    const cols = Math.ceil(Math.sqrt(spec.nodes.length));
    canvas.width = cols * 300 + 100;
    canvas.height = Math.ceil(spec.nodes.length / cols) * 220 + 100;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0b0d10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "14px Segoe UI";
    const pos = /* @__PURE__ */ new Map();
    spec.nodes.forEach((n2, i) => {
      const x2 = 50 + i % cols * 300;
      const y2 = 50 + Math.floor(i / cols) * 220;
      pos.set(n2.id, { x: x2, y: y2 });
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.strokeRect(x2, y2, 220, 90);
      ctx.fillStyle = "#e2e8f0";
      ctx.fillText(n2.label.slice(0, 26), x2 + 14, y2 + 40);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px Segoe UI";
      if (n2.note) ctx.fillText(n2.note.slice(0, 30), x2 + 14, y2 + 62);
      ctx.font = "14px Segoe UI";
    });
    ctx.strokeStyle = "#475569";
    ctx.fillStyle = "#94a3b8";
    for (const e of spec.edges) {
      const a22 = pos.get(e.from);
      const b = pos.get(e.to);
      if (!a22 || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a22.x + 220, a22.y + 45);
      ctx.lineTo(b.x, b.y + 45);
      ctx.stroke();
    }
    const a2 = document.createElement("a");
    a2.href = canvas.toDataURL("image/png");
    a2.download = `${spec.title || "diagram"}.png`;
    a2.click();
  };
  const exportExcalidraw = () => {
    if (!spec) return;
    const elements = spec.nodes.map((n2, i) => ({
      id: n2.id,
      type: n2.shape === "ellipse" ? "ellipse" : n2.shape === "diamond" ? "diamond" : "rectangle",
      x: i % 3 * 300,
      y: Math.floor(i / 3) * 200,
      width: 220,
      height: 100,
      strokeColor: "#cbd5e1",
      backgroundColor: "transparent",
      strokeWidth: 2,
      roughness: 1,
      seed: i + 1,
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      text: n2.label
    }));
    const blob = new Blob([JSON.stringify({ type: "excalidraw", version: 2, source: "god-terminal", elements, appState: { viewBackgroundColor: "#0b0d10" } }, null, 2)], { type: "application/json" });
    const a2 = document.createElement("a");
    a2.href = URL.createObjectURL(blob);
    a2.download = `${spec.title || "diagram"}.excalidraw`;
    a2.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "The model describes boxes and arrows; they land as ordinary shapes you can move and restyle." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draw" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: kind, onChange: (e) => setKind(e.target.value), children: ["Architecture", "User flow", "Data flow", "Components", "Request lifecycle", "State flow"].map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: k2 }, k2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Effort" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["Quick", "Balanced", "Thorough"].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: effort === e ? "on" : "", onClick: () => setEffort(e), children: e }, e)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Style" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["Ink", "Colorful"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: style === s ? "on" : "", onClick: () => setStyle(s), children: s }, s)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", disabled: busy || !repo, onClick: () => void generate(), children: busy ? "Drawing…" : "Generate diagram" }),
      spec && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: place, children: "Add to board" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: exportPng, children: "PNG" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: exportExcalidraw, children: ".excalidraw" })
      ] })
    ] }),
    busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-line", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) }),
    spec && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diagram-preview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: spec.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "diagram-list", children: spec.nodes.map((n2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diagram-node", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n2.label }),
        n2.note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n2.note })
      ] }, n2.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
        spec.edges.length,
        " arrows"
      ] })
    ] })
  ] });
}
function CodeStudio() {
  const repo = activeRepo(useApp((s) => s));
  const addNode = useApp((s) => s.addNode);
  const toast = useApp((s) => s.toast);
  const [dir, setDir] = reactExports.useState(repo?.path ?? "");
  const [entries, setEntries] = reactExports.useState([]);
  const [file, setFile] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [original, setOriginal] = reactExports.useState("");
  const [truncated, setTruncated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (repo) setDir(repo.path);
  }, [repo?.path]);
  reactExports.useEffect(() => {
    if (!dir) return;
    void window.api.fs.readDir(dir).then(setEntries);
  }, [dir]);
  const openFile = async (p2) => {
    const res = await window.api.fs.readFile(p2);
    setFile(p2);
    setText(res.text);
    setOriginal(res.text);
    setTruncated(res.truncated);
  };
  reactExports.useEffect(() => {
    const save = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && file) {
        e.preventDefault();
        void window.api.fs.writeFile(file, text).then(() => {
          setOriginal(text);
          toast("Saved", "ok");
        });
      }
    };
    window.addEventListener("keydown", save);
    return () => window.removeEventListener("keydown", save);
  }, [file, text, toast]);
  const dirty = text !== original;
  const crumbs = repo ? dir.replace(repo.path, "").split(/[\\/]/).filter(Boolean) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "studio-split", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-pane", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row small", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setDir(repo?.path ?? ""), children: "root" }),
        crumbs.map((c2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
          "/ ",
          c2
        ] }, i))
      ] }),
      dir !== repo?.path && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setDir(dir.replace(/[\\/][^\\/]+$/, "")), children: "↑ up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "file-list", children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `file-row ${e.dir ? "dir" : ""} ${file === e.path ? "on" : ""}`,
          onClick: () => e.dir ? setDir(e.path) : void openFile(e.path),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.dir ? "▸" : extIcon(e.ext) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "file-name", children: e.name }),
            !e.dir && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted tiny", children: [
              Math.max(1, Math.round(e.size / 1024)),
              "k"
            ] })
          ]
        },
        e.path
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-pane", children: file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row small", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: file.replace(repo?.path ?? "", "") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "warn", children: "too large to show" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", disabled: !dirty, onClick: () => window.api.fs.writeFile(file, text).then(() => {
          setOriginal(text);
          toast("Saved", "ok");
        }), children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
          addNode({ id: uid(), kind: "card", cardKind: "code", x: 160, y: 120, w: 420, h: 300, z: 1, title: file.split(/[\\/]/).pop() ?? "Code", path: file, content: text });
          toast("Code card placed", "ok");
        }, children: "Insert" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "code-area", value: text, onChange: (e) => setText(e.target.value), spellCheck: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row tiny muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          text.split("\n").length,
          " lines"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          text.length,
          " chars"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        dirty ? "unsaved" : "saved"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Pick a file on the left. README first when you open a folder." }) })
  ] });
}
const extIcon = (ext) => [".ts", ".tsx", ".js", ".jsx"].includes(ext) ? "TS" : [".py"].includes(ext) ? "PY" : [".md", ".mdx"].includes(ext) ? "MD" : [".json"].includes(ext) ? "{}" : [".css", ".scss"].includes(ext) ? "#" : "·";
function MarkdownStudio() {
  const repo = activeRepo(useApp((s) => s));
  const addNode = useApp((s) => s.addNode);
  const toast = useApp((s) => s.toast);
  const [files, setFiles] = reactExports.useState([]);
  const [query, setQuery] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("Reading");
  const [graph, setGraph] = reactExports.useState([]);
  const saveTimer2 = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!repo) return;
    void window.api.fs.scanMarkdown(repo.path).then(setFiles);
  }, [repo?.path]);
  const open = async (p2) => {
    const res = await window.api.fs.readFile(p2);
    setFile(p2);
    setText(res.text);
    setTab("Reading");
    if (files.length) buildGraph(files, res.text, p2);
  };
  const buildGraph = (all, current, currentPath) => {
    const nodes = all.slice(0, 400).map((f2) => ({ id: f2.path, name: f2.name.replace(/\.(md|markdown|mdx)$/i, ""), x: 0, y: 0, links: 0 }));
    const byName = new Map(nodes.map((n2) => [n2.name.toLowerCase(), n2]));
    const links = [];
    const text2 = current;
    for (const m2 of text2.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
      const t2 = byName.get(m2[1].trim().toLowerCase());
      if (t2) links.push({ source: currentPath, target: t2.id });
    }
    for (const m2 of text2.matchAll(/\[[^\]]+\]\(([^)]+\.mdx?)\)/g)) {
      const base2 = m2[1].split("/").pop().replace(/\.mdx?$/, "").toLowerCase();
      const t2 = byName.get(base2);
      if (t2) links.push({ source: currentPath, target: t2.id });
    }
    if (!nodes.find((n2) => n2.id === currentPath)) {
      nodes.push({ id: currentPath, name: current.split(/[\\/]/).pop() ?? "note", x: 0, y: 0, links: 0 });
    }
    const sim = simulation(nodes).force("charge", manyBody().strength(-220)).force("link", link(links).id((d) => d.id).distance(90)).force("center", center(320, 240)).force("x", x(320).strength(0.04)).force("y", y(240).strength(0.04)).stop();
    for (let i = 0; i < 260; i++) sim.tick();
    for (const l2 of links) {
      const s = nodes.find((n2) => n2.id === l2.source);
      const t2 = nodes.find((n2) => n2.id === l2.target);
      if (s) s.links++;
      if (t2) t2.links++;
    }
    setGraph(nodes);
  };
  const edit2 = (v2) => {
    setText(v2);
    if (!file) return;
    if (saveTimer2.current) clearTimeout(saveTimer2.current);
    saveTimer2.current = setTimeout(() => {
      void window.api.fs.writeFile(file, v2);
    }, 1500);
  };
  const shown = files.filter((f2) => f2.name.toLowerCase().includes(query.toLowerCase()) || f2.path.toLowerCase().includes(query.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "studio-split", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-pane", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", placeholder: "Search notes…", value: query, onChange: (e) => setQuery(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted tiny", children: [
        files.length,
        " Markdown files"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "file-list", children: shown.slice(0, 300).map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `file-row ${file === f2.path ? "on" : ""}`, onClick: () => void open(f2.path), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "file-name", children: f2.name })
      ] }, f2.path)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-pane", children: !file ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Pick a note. Links between notes build the graph." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row small", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["Reading", "Source", "Graph"].map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === t2 ? "on" : "", onClick: () => setTab(t2), children: t2 }, t2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
          addNode({ id: uid(), kind: "card", cardKind: "markdown", x: 140, y: 120, w: 420, h: 320, z: 1, title: file.split(/[\\/]/).pop() ?? "Note", path: file });
          toast("Live Markdown card placed", "ok");
        }, children: "Add to board" })
      ] }),
      tab === "Reading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "doc-preview", dangerouslySetInnerHTML: md(text) }),
      tab === "Source" && /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "code-area", value: text, onChange: (e) => edit2(e.target.value), spellCheck: false }),
      tab === "Graph" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "graph", viewBox: "0 0 640 480", children: graph.map((n2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { onClick: () => void open(n2.id), className: "graph-node", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: n2.x, cy: n2.y, r: 4 + Math.min(9, n2.links) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: n2.x + 10, y: n2.y + 4, children: n2.name.slice(0, 18) })
      ] }, n2.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted tiny", children: tab === "Source" ? "Saves 1.5s after you stop typing." : "Notes are re-read from disk when you open them." })
    ] }) })
  ] });
}
function Skills() {
  const repo = activeRepo(useApp((s) => s));
  const toast = useApp((s) => s.toast);
  const board = useApp((s) => s.board());
  const [skills, setSkills] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const [draft, setDraft] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const load = () => {
    if (!repo) return;
    void window.api.skills.scan(repo.path).then(setSkills);
  };
  reactExports.useEffect(load, [repo?.path]);
  const current = skills.find((s) => s.path === selected);
  const shown = skills.filter((s) => filter === "all" || s.scope === filter);
  const create2 = async () => {
    if (!repo || !name.trim()) return;
    const dir = `${repo.path}/.claude/skills/${name.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-")}`;
    await window.api.fs.mkdir(dir);
    await window.api.fs.writeFile(`${dir}/SKILL.md`, `---
name: ${name.trim()}
description: ${desc.trim() || "Describe when to use this skill."}
---

Instructions for the agent.
`);
    toast("Skill created", "ok");
    setName("");
    setDesc("");
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "studio-split", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-pane", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["all", "personal", "project", "command"].map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: filter === f2 ? "on" : "", onClick: () => setFilter(f2), children: f2 }, f2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-list", children: [
        shown.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `file-row ${selected === s.path ? "on" : ""}`, onClick: () => {
          setSelected(s.path);
          setDraft(s.body);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.findings.length ? "⚠" : "✓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "file-name", children: [
            "/",
            s.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: s.scope })
        ] }, s.path)),
        !shown.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "No SKILL.md found in ~/.claude/skills or .claude/skills." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-pane", children: current ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row small", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "/",
          current.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
          void window.api.fs.writeFile(current.path, draft).then(() => {
            toast("Skill saved", "ok");
            load();
          });
        }, children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
          const running = consolesOf(board).find((c2) => ["READY", "IDLE"].includes(c2.status));
          if (!running) return toast("Start a console first", "error");
          sendOrder(running.id, `/${current.name}`);
          toast(`/${current.name} sent to ${running.title}`, "ok");
        }, children: "Run" })
      ] }),
      current.findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "findings", children: current.findings.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "• ",
        f2
      ] }, f2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "code-area", value: draft, onChange: (e) => setDraft(e.target.value), spellCheck: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted tiny", children: [
        draft.split("\n").length,
        " lines · ",
        Math.round(draft.length / 4),
        " tokens (estimate)"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Pick a skill, or create one in this repo." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "New skill" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: name, onChange: (e) => setName(e.target.value), placeholder: "release-check" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: desc, onChange: (e) => setDesc(e.target.value), placeholder: "Use when preparing a release." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", disabled: !name.trim(), onClick: () => void create2(), children: "Create in .claude/skills" })
    ] }) })
  ] });
}
function PanelHost({ panel }) {
  const setPanel = useApp((s) => s.setPanel);
  const titles = {
    presets: "Presets",
    mission: "Mission Map",
    git: "Git",
    usage: "Usage and tokens",
    settings: "Settings",
    memory: "Project memory",
    loops: "Loops",
    profiles: "Account profiles",
    documents: "Documents",
    diagrams: "Diagrams",
    code: "Code",
    markdown: "Markdown",
    skills: "Skills"
  };
  if (panel === "mission") return /* @__PURE__ */ jsxRuntimeExports.jsx(Mission, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drawer-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawer-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kicker", children: "GoT · God Terminal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: titles[panel] ?? panel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon big", onClick: () => setPanel(null), children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawer-body", children: [
      panel === "presets" && /* @__PURE__ */ jsxRuntimeExports.jsx(Presets, {}),
      panel === "git" && /* @__PURE__ */ jsxRuntimeExports.jsx(Git, {}),
      panel === "usage" && /* @__PURE__ */ jsxRuntimeExports.jsx(Usage, {}),
      panel === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}),
      panel === "memory" && /* @__PURE__ */ jsxRuntimeExports.jsx(Memory, {}),
      panel === "loops" && /* @__PURE__ */ jsxRuntimeExports.jsx(Loops, {}),
      panel === "profiles" && /* @__PURE__ */ jsxRuntimeExports.jsx(Profiles, {}),
      ["documents", "diagrams", "code", "markdown", "skills"].includes(panel) && /* @__PURE__ */ jsxRuntimeExports.jsx(Studios, { panel })
    ] })
  ] }) });
}
function Presets() {
  const saved = useApp((s) => s.savedPresets);
  const board = useApp((s) => s.board());
  const addNodes = useApp((s) => s.addNodes);
  const deleteSaved = useApp((s) => s.deleteSavedPreset);
  const saveLayout = useApp((s) => s.saveLayout);
  const toast = useApp((s) => s.toast);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "A preset lays consoles, groups and helper tiles onto this workspace in one action." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preset-list", children: PRESETS.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preset-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preset-name", children: p2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: p2.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tag-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tag", children: [
            p2.lanes.length,
            " agents"
          ] }),
          p2.extras?.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: e }, e))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => deployPreset(p2.id), children: "Deploy" })
    ] }, p2.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Saved layouts" }),
    !saved.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "Save the current board to reuse its arrangement." }),
    saved.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preset-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preset-name", children: s.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
          s.nodes.length,
          " nodes"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn small",
            onClick: () => {
              const v2 = board?.viewport ?? { x: 0, y: 0, zoom: 1 };
              const x2 = (window.innerWidth / 2 - v2.x) / v2.zoom;
              const y2 = (window.innerHeight / 2 - v2.y) / v2.zoom;
              addNodes(s.nodes.map((n2) => ({
                ...JSON.parse(JSON.stringify(n2)),
                id: `${n2.id}-${Math.random().toString(36).slice(2, 6)}`,
                x: n2.x + x2,
                y: n2.y + y2,
                ...n2.kind === "console" ? { launchKey: 0, status: "STARTING" } : {}
              })));
            },
            children: "Stamp"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => deleteSaved(s.id), children: "Delete" })
      ] })
    ] }, s.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => {
      if (!board?.nodes.length) return toast("Nothing to save", "error");
      saveLayout(JSON.parse(JSON.stringify(board.nodes)));
      toast("Layout saved", "ok");
    }, children: "Save current layout" })
  ] });
}
const COLUMNS = [
  { key: "needs", title: "Needs you", statuses: ["NEEDS YOU", "ERROR"] },
  { key: "working", title: "Working", statuses: ["WORKING", "RUNNING", "STARTING"] },
  { key: "ready", title: "Ready", statuses: ["READY", "IDLE", "PAUSED", "DONE"] }
];
function Mission() {
  const board = useApp((s) => s.board());
  const setPanel = useApp((s) => s.setPanel);
  const [filter, setFilter] = reactExports.useState("all");
  const groups = board?.groups ?? [];
  const consoles = consolesOf(board).filter((c2) => filter === "all" || groups.find((g) => g.id === filter)?.memberIds.includes(c2.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mission", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mission-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kicker", children: "Mission Map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          consoles.length,
          " consoles on this workspace"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All groups" }),
          groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g.id, children: g.name }, g.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon big", onClick: () => setPanel(null), children: "×" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mission-cols", children: COLUMNS.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mission-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mission-col-head", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: consoles.filter((c2) => col.statuses.includes(c2.status)).length })
      ] }),
      consoles.filter((c2) => col.statuses.includes(c2.status)).map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "mission-card",
          onClick: () => {
            window.dispatchEvent(new CustomEvent("hive:frame", { detail: c2.id }));
            setPanel(null);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "agent-dot", style: { background: getAgent(c2.agentId).color } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: c2.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill small ${c2.status === "NEEDS YOU" ? "needs" : c2.status === "ERROR" ? "error" : "idle"}`, children: c2.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted tiny", children: getAgent(c2.agentId).name }),
            c2.statusDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mission-detail", children: c2.statusDetail }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tag-row", children: groups.filter((g) => g.memberIds.includes(c2.id)).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: g.name }, g.id)) })
          ]
        },
        c2.id
      ))
    ] }, col.key)) })
  ] });
}
function Git() {
  const repo = activeRepo(useApp((s) => s));
  const toast = useApp((s) => s.toast);
  const [status, setStatus] = reactExports.useState(null);
  const [log, setLog] = reactExports.useState([]);
  const [branches, setBranches] = reactExports.useState([]);
  const [checked, setChecked] = reactExports.useState([]);
  const [message, setMessage] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const load = async () => {
    if (!repo) return;
    const st = await window.api.git.status(repo.path);
    setStatus(st);
    setChecked(st.files.map((f2) => f2.path));
    setBranches(await window.api.git.branches(repo.path));
    setLog(await window.api.git.log(repo.path));
  };
  reactExports.useEffect(() => {
    void load();
  }, [repo?.path]);
  const suggest = () => {
    if (!status?.files.length) return;
    const areas = [...new Set(status.files.map((f2) => f2.path.split(/[\\/]/)[0]))].slice(0, 3);
    setMessage(`${status.files.length} files updated${areas.length ? ` in ${areas.join(", ")}` : ""}`);
  };
  if (!repo) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Open a repo first." });
  if (status && !status.repo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "This folder is not a git repository yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: async () => {
        await window.api.git.init(repo.path);
        toast("Repository created on main", "ok");
        await load();
      }, children: "Create repository" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "branch-pill", children: [
        "⑂ ",
        status?.branch ?? "…"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted small", children: [
        status?.ahead ? `↑${status.ahead}` : "",
        " ",
        status?.behind ? `↓${status.behind}` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", disabled: busy, onClick: async () => {
        setBusy(true);
        try {
          await window.api.git.pull(repo.path);
          toast("Pulled", "ok");
          await load();
        } catch (e) {
          toast(e instanceof Error ? e.message : "Pull failed", "error");
        }
        setBusy(false);
      }, children: "Pull" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", disabled: busy, onClick: async () => {
        setBusy(true);
        try {
          await window.api.git.push(repo.path);
          toast("Pushed", "ok");
          await load();
        } catch (e) {
          toast(e instanceof Error ? e.message : "Push failed", "error");
        }
        setBusy(false);
      }, children: "Push" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon", onClick: () => void load(), children: "⟳" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row small", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setChecked(status?.files.map((f2) => f2.path) ?? []), children: "All" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setChecked([]), children: "None" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
        checked.length,
        "/",
        status?.files.length ?? 0,
        " selected"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "changes", children: [
      !status?.files.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "Working tree clean." }),
      status?.files.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "change-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: checked.includes(f2.path),
            onChange: () => setChecked((c2) => c2.includes(f2.path) ? c2.filter((x2) => x2 !== f2.path) : [...c2, f2.path])
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `git-stat ${f2.worktree}`, children: f2.worktree === " " ? f2.index : f2.worktree }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "change-path", children: f2.path })
      ] }, f2.path))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "text-input",
          placeholder: "Commit message",
          value: message,
          onChange: (e) => setMessage(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: suggest, title: "Suggest from changes", children: "✨" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn primary",
          disabled: busy || !checked.length,
          onClick: async () => {
            setBusy(true);
            try {
              await window.api.git.commit(repo.path, message || "Update from GoT", checked);
              if (status?.hasRemote) await window.api.git.push(repo.path);
              toast("Committed", "ok");
              setMessage("");
              await load();
            } catch (e) {
              toast(e instanceof Error ? e.message : "Commit failed", "error");
            }
            setBusy(false);
          },
          children: "Commit & Push"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", disabled: busy || !checked.length, onClick: async () => {
        setBusy(true);
        try {
          await window.api.git.commit(repo.path, message || "Update from GoT", checked);
          toast("Committed", "ok");
          setMessage("");
          await load();
        } catch (e) {
          toast(e instanceof Error ? e.message : "Commit failed", "error");
        }
        setBusy(false);
      }, children: "Commit only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => window.api.shell.openExternal(`https://github.com`), children: "GitHub" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Branches" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tag-row", children: [
      branches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `tag clickable ${b === status?.branch ? "on" : ""}`, onClick: async () => {
        await window.api.git.checkout(repo.path, b);
        await load();
      }, children: b }, b)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tag clickable", onClick: async () => {
        const name = window.prompt("New branch name");
        if (!name) return;
        await window.api.git.createBranch(repo.path, name);
        await load();
      }, children: "+ branch" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "History" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-list", children: [
      log.map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: c2.hash }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c2.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted tiny", children: new Date(c2.date).toLocaleDateString() })
      ] }, c2.hash)),
      !log.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "No commits yet." })
    ] })
  ] });
}
function Usage() {
  const [days, setDays] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLoading(true);
    void window.api.usage.scan().then((d) => {
      setDays(d);
      setLoading(false);
    });
  }, []);
  const last30 = reactExports.useMemo(() => {
    const start = /* @__PURE__ */ new Date();
    start.setDate(start.getDate() - 30);
    return days.filter((d) => new Date(d.date) >= start);
  }, [days]);
  const byDay = reactExports.useMemo(() => {
    const m2 = /* @__PURE__ */ new Map();
    for (const d of last30) m2.set(d.date, (m2.get(d.date) ?? 0) + d.total);
    return [...m2.entries()].sort((a2, b) => a2[0].localeCompare(b[0]));
  }, [last30]);
  const max = Math.max(1, ...byDay.map(([, v2]) => v2));
  const total = last30.reduce((s, d) => s + d.total, 0);
  const byAgent = reactExports.useMemo(() => {
    const m2 = /* @__PURE__ */ new Map();
    for (const d of last30) m2.set(d.agent, (m2.get(d.agent) ?? 0) + d.total);
    return [...m2.entries()].sort((a2, b) => b[1] - a2[1]);
  }, [last30]);
  const busiest = byDay.reduce((a2, b) => b[1] > a2[1] ? b : a2, ["—", 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Read from the CLIs' own logs on this machine. Not a bill — your provider's dashboard is the source of truth." }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "Scanning logs…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Last 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: formatTokens(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Busiest day" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: busiest[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: formatTokens(busiest[1]) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Top agent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: byAgent[0]?.[0] ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: formatTokens(byAgent[0]?.[1] ?? 0) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Tokens per day" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart", children: [
      !byDay.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "No token logs found in ~/.claude/projects or ~/.codex/sessions." }),
      byDay.map(([date, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bar-wrap", title: `${date}: ${value.toLocaleString()}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar", style: { height: `${value / max * 100}%` } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bar-label", children: date.slice(5) })
      ] }, date))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "By agent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-list", children: byAgent.map(([agent, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: agent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: formatTokens(value) })
    ] }, agent)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: async () => {
      setLoading(true);
      setDays(await window.api.usage.scan());
      setLoading(false);
    }, children: "Scan again" })
  ] });
}
function Settings() {
  const settings = useApp((s) => s.settings);
  const patch = useApp((s) => s.patchSettings);
  const [models, setModels] = reactExports.useState([]);
  const [doctor, setDoctor] = reactExports.useState("");
  const [agentName, setAgentName] = reactExports.useState("");
  const [agentCommand, setAgentCommand] = reactExports.useState("");
  const cfg = llmConfig(settings);
  const lm = settings.llmProvider === "lmstudio";
  const refreshModels = async () => setModels(await window.api.llm.models(cfg.url, cfg.provider));
  reactExports.useEffect(() => {
    void refreshModels();
  }, [settings.llmProvider, cfg.url]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "General" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Theme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.theme, onChange: (e) => patch({ theme: e.target.value }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ink", children: "Ink" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "light", children: "Light" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Console text size" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 85, max: 200, step: 15, value: settings.fontSize, onChange: (e) => patch({ fontSize: +e.target.value }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
        settings.fontSize,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reopen last repo on launch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.reopenLastRepo, onChange: (e) => patch({ reopenLastRepo: e.target.checked }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Resume agent chats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.resumeChats, onChange: (e) => patch({ resumeChats: e.target.checked }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Agents" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Default agent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: settings.defaultAgent, onChange: (e) => patch({ defaultAgent: e.target.value }), children: allAgents().filter((a2) => a2.command).map((a2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a2.id, children: a2.name }, a2.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yolo: skip permission prompts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.yolo, onChange: (e) => patch({ yolo: e.target.checked }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: "With Yolo on, agents run commands, edit files and use the network without asking. Applies to consoles started afterwards; the studios never add it." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Custom agents" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: "Any executable on your PATH can run in a console. The command is the binary; the optional Yolo flag is passed to skip permission prompts." }),
    settings.customAgents.map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loop-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: c2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hint", children: [
          c2.command,
          c2.yoloFlag ? ` · ${c2.yoloFlag}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => patch({ customAgents: settings.customAgents.filter((x2) => x2.id !== c2.id) }), children: "Remove" })
    ] }, c2.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", placeholder: "Name", value: agentName, onChange: (e) => setAgentName(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", placeholder: "command (e.g. aider)", value: agentCommand, onChange: (e) => setAgentCommand(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn small",
          onClick: () => {
            const name = agentName.trim();
            const command = agentCommand.trim();
            if (!name || !command) return;
            patch({ customAgents: [...settings.customAgents, { id: `custom-${Date.now()}`, name, command }] });
            setAgentName("");
            setAgentCommand("");
          },
          children: "Add agent"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Local models" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Provider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.llmProvider, onChange: (e) => patch({ llmProvider: e.target.value }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ollama", children: "Ollama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "lmstudio", children: "LM Studio" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lm ? "LM Studio URL" : "Ollama URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "text-input",
          value: lm ? settings.lmStudioUrl : settings.ollamaUrl,
          onChange: (e) => patch(lm ? { lmStudioUrl: e.target.value } : { ollamaUrl: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Model" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: lm ? settings.lmStudioModel : settings.ollamaModel,
          onChange: (e) => patch(lm ? { lmStudioModel: e.target.value } : { ollamaModel: e.target.value }),
          children: [
            (lm ? settings.lmStudioModel : settings.ollamaModel) && !models.includes(lm ? settings.lmStudioModel : settings.ollamaModel) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: lm ? settings.lmStudioModel : settings.ollamaModel, children: lm ? settings.lmStudioModel : settings.ollamaModel }),
            !models.length && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No models found" }),
            models.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m2, children: m2 }, m2))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: lm ? "Start the local server in LM Studio (Developer → Local Server). Codex workers use its default port 1234." : "Ollama is the default. Pull a model and keep “ollama serve” running." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: async () => {
        const r2 = await window.api.doctor();
        setDoctor(
          `Ollama: ${r2.ollama.ok ? r2.ollama.models.join(", ") : r2.ollama.error} · STT: ${r2.stt.ok ? "ready" : r2.stt.error} · git: ${r2.git.ok ? "ok" : "missing"}`
        );
      }, children: "Run doctor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => void refreshModels(), children: "Refresh models" })
    ] }),
    doctor && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: doctor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Voice" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: "Audio is recorded here, converted to WAV and sent only to your own STT server (whisper.cpp compatible). Nothing leaves this machine." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Local STT server" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: settings.sttUrl, onChange: (e) => patch({ sttUrl: e.target.value }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hold Space to talk" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.holdSpace, onChange: (e) => patch({ holdSpace: e.target.checked }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Speak confirmations (system voices)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.ttsEnabled, onChange: (e) => patch({ ttsEnabled: e.target.checked }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Language" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: settings.voiceLanguage, onChange: (e) => patch({ voiceLanguage: e.target.value }), children: [["de", "Deutsch"], ["en", "English"], ["es", "Español"], ["fr", "Français"], ["it", "Italiano"], ["pt", "Português"]].map(([v2, l2]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v2, children: l2 }, v2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: "Ctrl+Space dictates into the focused field without sending. Space sends an order." })
  ] });
}
function Memory() {
  const facts = useApp((s) => s.memory);
  const addFact = useApp((s) => s.addFact);
  const removeFact = useApp((s) => s.removeFact);
  const repo = activeRepo(useApp((s) => s));
  const settings = useApp((s) => s.settings);
  const toast = useApp((s) => s.toast);
  const [scope, setScope] = reactExports.useState("repo");
  const [kind, setKind] = reactExports.useState("Architecture");
  const [text, setText] = reactExports.useState("");
  const [scanning, setScanning] = reactExports.useState(false);
  const [proposed, setProposed] = reactExports.useState([]);
  const shown = facts.filter((f2) => f2.scope === (scope === "global" ? "global" : repo?.id));
  const scan = async () => {
    if (!repo) return;
    setScanning(true);
    try {
      const listing = await window.api.fs.scanMarkdown(repo.path);
      const entries = await window.api.fs.readDir(repo.path);
      const cfg = llmConfig(settings);
      const res = await window.api.llm.chat({
        provider: cfg.provider,
        url: cfg.url,
        model: cfg.model,
        json: true,
        messages: [
          {
            role: "system",
            content: 'You write a short repo briefing. Answer JSON: {"facts":[{"kind":"Architecture|Structure|Commands|Conventions|Gotchas|Context","text":"..."}]} with 6 to 12 facts. Be concrete and short.'
          },
          {
            role: "user",
            content: `Repo: ${repo.path}
Top level: ${entries.map((e) => `${e.name}${e.dir ? "/" : ""}`).join(", ")}
Docs: ${listing.slice(0, 40).map((f2) => f2.name).join(", ")}`
          }
        ]
      });
      if (!res.ok) {
        toast(res.error ?? "Scan failed", "error");
        return;
      }
      const parsed = JSON.parse(res.text.match(/\{[\s\S]*\}/)?.[0] ?? '{"facts":[]}');
      setProposed((parsed.facts ?? []).map((f2) => ({ ...f2, id: Math.random().toString(36).slice(2), scope: scope === "global" ? "global" : repo.id })));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Scan failed", "error");
    } finally {
      setScanning(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Facts you push into agents on purpose. Nothing is saved from a scan until you add it." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: scope === "repo" ? "on" : "", onClick: () => setScope("repo"), children: "This repo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: scope === "global" ? "on" : "", onClick: () => setScope("global"), children: "All repos" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fact-add", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: kind, onChange: (e) => setKind(e.target.value), children: ["Architecture", "Structure", "Commands", "Conventions", "Gotchas", "Context"].map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: k2 }, k2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", placeholder: "A fact about this repo…", value: text, onChange: (e) => setText(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => {
        if (!text.trim()) return;
        addFact({ kind, text: text.trim(), scope: scope === "global" ? "global" : repo?.id ?? "global" });
        setText("");
      }, children: "Add" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fact-list-2", children: [
      shown.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fact-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: f2.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f2.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => removeFact(f2.id), children: "×" })
      ] }, f2.id)),
      !shown.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "No facts yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", disabled: scanning || !repo, onClick: () => void scan(), children: scanning ? "Scanning repo…" : "Scan repo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: () => pushMemory(), children: "Push to running consoles" })
    ] }),
    proposed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "proposed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Proposed facts" }),
      proposed.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fact-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: p2.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p2.text })
      ] }, p2.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: () => {
          proposed.forEach((p2) => addFact({ kind: p2.kind, text: p2.text, scope: p2.scope }));
          setProposed([]);
          toast(`${proposed.length} facts added`, "ok");
        }, children: "Add to memory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setProposed([]), children: "Discard" })
      ] })
    ] })
  ] });
}
function Loops() {
  const loops = useApp((s) => s.loops);
  const setLoops = useApp((s) => s.setLoops);
  const board = useApp((s) => s.board());
  const [name, setName] = reactExports.useState("");
  const [instruction, setInstruction] = reactExports.useState("");
  const [seconds, setSeconds] = reactExports.useState(300);
  const [pattern, setPattern] = reactExports.useState("");
  const [type, setType] = reactExports.useState("interval");
  const [target, setTarget] = reactExports.useState("all");
  const groups = board?.groups ?? [];
  const create2 = () => {
    if (!instruction.trim()) return;
    const loop = {
      id: Math.random().toString(36).slice(2),
      name: name.trim() || `Loop ${loops.length + 1}`,
      instruction: instruction.trim(),
      target,
      trigger: { type, seconds, pattern },
      goal: { type: "agent" },
      maxRuns: 200,
      runs: 0,
      enabled: true
    };
    setLoops([...loops, loop]);
    setName("");
    setInstruction("");
    setPattern("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lede", children: "Recurring work that spends your plan. A loop types its instruction into the target consoles, at most 200 times." }),
    loops.map((l2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loop-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: l2.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill small ${l2.enabled ? "ready" : "idle"}`, children: l2.enabled ? "on" : "off" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
          l2.trigger.type,
          l2.trigger.type === "interval" ? ` every ${l2.trigger.seconds}s` : l2.trigger.type === "contains" ? ` on “${l2.trigger.pattern}”` : " when idle",
          " · ",
          l2.runs,
          "/",
          l2.maxRuns,
          " runs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted small", children: [
          "→ ",
          l2.target === "all" ? "all consoles" : groups.find((g) => g.id === l2.target)?.name ?? l2.target
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn small", onClick: () => setLoops(loops.map((x2) => x2.id === l2.id ? { ...x2, enabled: !x2.enabled } : x2)), children: l2.enabled ? "Pause" : "Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "link", onClick: () => setLoops(loops.filter((x2) => x2.id !== l2.id)), children: "Delete" })
      ] })
    ] }, l2.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "New loop" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: name, onChange: (e) => setName(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Instruction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "text-input", rows: 3, value: instruction, onChange: (e) => setInstruction(e.target.value), placeholder: "Run the tests and fix what fails." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trigger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "interval", children: "On a schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "idle", children: "When agents go idle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "contains", children: "When output contains" })
      ] })
    ] }),
    type === "interval" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Every (seconds, min 60)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", type: "number", min: 60, value: seconds, onChange: (e) => setSeconds(+e.target.value) })
    ] }),
    type === "contains" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Text to watch for" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: pattern, onChange: (e) => setPattern(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Target" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: target, onChange: (e) => setTarget(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All consoles" }),
        groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g.id, children: g.name }, g.id)),
        consolesOf(board).map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c2.id, children: c2.title }, c2.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: create2, children: "Create loop" })
  ] });
}
function Profiles() {
  const profiles = useApp((s) => s.profiles);
  const addProfile = useApp((s) => s.addProfile);
  const toast = useApp((s) => s.toast);
  const [agentId, setAgentId] = reactExports.useState("claude");
  const [name, setName] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-stack", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "lede", children: [
      "A profile is another sign-in kept in its own folder: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CLAUDE_CONFIG_DIR" }),
      " or ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "CODEX_HOME" }),
      ". Consoles pick it at start."
    ] }),
    profiles.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loop-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        p2.name,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: p2.agentId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted tiny", children: p2.dir })
    ] }) }, p2.id)),
    !profiles.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted small", children: "No profiles yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "New profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CLI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: agentId, onChange: (e) => setAgentId(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "claude", children: "Claude Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "codex", children: "Codex" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "text-input", value: name, onChange: (e) => setName(e.target.value), placeholder: "Work" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: async () => {
      if (!name.trim()) return;
      const res = await window.api.profiles.create(agentId, name.trim());
      addProfile({ id: res.id, name: name.trim(), agentId, dir: res.dir, initials: res.initials });
      toast("Profile created — choose it on a console", "ok");
      setName("");
    }, children: "Create profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hint", children: "Profiles here are empty folders. Sign in by starting a console with the profile (the CLI's own login flow runs inside it)." })
  ] });
}
const MAX = 12;
let seq = 0;
const slot = (agentId) => ({ key: ++seq, agentId });
const TEMPLATES = [
  { id: "solo", name: "Solo", agents: 1 },
  { id: "pair", name: "Pair", agents: 2 },
  { id: "trio", name: "Trio", agents: 3 },
  { id: "squad", name: "Squad of 6", agents: 6 }
];
function TeamComposer() {
  const open = useApp((s) => s.composerOpen);
  const setOpen = useApp((s) => s.setComposerOpen);
  const defaultAgent = useApp((s) => s.settings.defaultAgent);
  const repo = useApp((s) => activeRepo(s));
  const [slots, setSlots] = reactExports.useState([]);
  const [name, setName] = reactExports.useState("");
  const agents = reactExports.useMemo(() => allAgents().filter((a2) => a2.command), [open]);
  reactExports.useEffect(() => {
    if (open && !slots.length) setSlots([slot(defaultAgent), slot(defaultAgent), slot(defaultAgent)]);
  }, [open, slots.length, defaultAgent]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        launch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slots, name]);
  if (!open) return null;
  const add2 = () => {
    if (slots.length >= MAX) return;
    setSlots((s) => [...s, slot(defaultAgent)]);
  };
  const remove = (key) => setSlots((s) => s.length === 1 ? s : s.filter((x2) => x2.key !== key));
  const setAgent = (key, agentId) => setSlots((s) => s.map((x2) => x2.key === key ? { ...x2, agentId } : x2));
  const fill = (count) => setSlots(Array.from({ length: Math.min(MAX, count) }, () => slot(defaultAgent)));
  const fillPreset = (id2) => {
    const preset = PRESETS.find((p2) => p2.id === id2);
    if (!preset) return;
    setSlots(preset.lanes.slice(0, MAX).map((l2) => slot(l2.agentId || defaultAgent)));
    setName(preset.name);
  };
  const launch = () => {
    if (!repo || !slots.length) return;
    spawnTeam(slots.map((s) => ({ agentId: s.agentId })), { name: name.trim() });
    useApp.setState({ showHome: false });
    setOpen(false);
    setName("");
  };
  const totals = slots.reduce((acc, s) => {
    const agent = getAgent(s.agentId).name;
    acc[agent] = (acc[agent] ?? 0) + 1;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "composer-overlay", onPointerDown: (e) => e.target === e.currentTarget && setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "team-composer", "data-testid": "team-composer", role: "dialog", "aria-label": "Launch a team", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "tc-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kicker", children: "Launch together" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Compose a team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Line up the consoles, pick an agent for each, and start them in one action. Each console runs the CLI installed on your PATH." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tc-close", onClick: () => setOpen(false), "aria-label": "Close", children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-templates", children: [
        TEMPLATES.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => fill(t2.agents), className: slots.length === t2.agents ? "on" : "", children: t2.name }, t2.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tc-divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: "", onChange: (e) => e.target.value && fillPreset(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "From a preset…" }),
          PRESETS.filter((p2) => p2.lanes.length <= MAX).map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p2.id, children: [
            p2.name,
            " · ",
            p2.lanes.length
          ] }, p2.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tc-count", children: [
        slots.length,
        "/",
        MAX
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-grid", children: [
      slots.map((s, i) => {
        const agent = getAgent(s.agentId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "tc-slot", style: { animationDelay: `${Math.min(i, 11) * 34}ms` }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-slot-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tc-index", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tc-dot", style: { background: agent.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tc-remove", onClick: () => remove(s.key), disabled: slots.length === 1, "aria-label": "Remove", children: "×" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tc-agent-name", children: agent.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tc-agent-cmd", children: agent.command || "shell" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: s.agentId, onChange: (e) => setAgent(s.key, e.target.value), children: [
            !agents.some((a2) => a2.id === s.agentId) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.agentId, children: agent.name }),
            agents.map((a2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a2.id, children: a2.name }, a2.id))
          ] })
        ] }, s.key);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tc-add", onClick: add2, disabled: slots.length >= MAX, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "＋" }),
        "Add console"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "tc-foot", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-summary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "tc-name",
            placeholder: `Team ${(repo?.workspaces.length ?? 1) + 1}`,
            value: name,
            onChange: (e) => setName(e.target.value),
            maxLength: 32
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tc-mix", children: Object.entries(totals).map(([n2, c2]) => `${c2}× ${n2}`).join(" · ") || "No agents yet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tc-where", children: repo ? repo.name : "Add a repo first" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => setOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary launch", "data-testid": "launch-team", onClick: launch, disabled: !repo, children: [
          "Launch ",
          slots.length,
          " console",
          slots.length === 1 ? "" : "s",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Ctrl ↵" })
        ] })
      ] })
    ] })
  ] }) });
}
function useRipples() {
  const [ripples, setRipples] = reactExports.useState([]);
  const seq2 = reactExports.useRef(0);
  const spawn = (e) => {
    const r2 = e.currentTarget.getBoundingClientRect();
    const id2 = ++seq2.current;
    setRipples((list2) => [...list2, { id: id2, x: e.clientX - r2.left, y: e.clientY - r2.top }]);
    window.setTimeout(() => setRipples((list2) => list2.filter((x2) => x2.id !== id2)), 620);
  };
  return { ripples, spawn };
}
const icons = {
  select: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 3.2 18.2 10l-5.4 1.4-2.4 5.8L5 3.2Z" }) }),
  hand: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5a1.5 1.5 0 0 1 3 0V11m0-4a1.5 1.5 0 0 1 3 0v4m0-1.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-5.1-2.8L4.8 14a1.6 1.6 0 0 1 2.7-1.7L9 14" }) }),
  director: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.5 18.8 6.4l2.7 6.4-6 8.7H8.5l-6-8.7 2.7-6.4L12 2.5Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.5 9 12l3 9.5M12 2.5l3 9.5-3 9.5M2.6 12.8h18.8M5.2 6.4l6.8 6.4 6.8-6.4" })
  ] }),
  link: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 14.5 14.5 9M8 17.4l-1.1 1.1a3.4 3.4 0 0 1-4.8-4.8l3-3a3.4 3.4 0 0 1 4.8 0M16 6.6l1.1-1.1a3.4 3.4 0 0 1 4.8 4.8l-3 3a3.4 3.4 0 0 1-4.8 0" }) }),
  brain: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.8l1.7 5.5 5.5 1.8-5.5 1.8L12 17.4l-1.7-5.5-5.5-1.8 5.5-1.8L12 2.8Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 16.4l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z" })
  ] }),
  team: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  ] }),
  console: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m6 9 3 3-3 3M12.5 15H18" })
  ] }),
  note: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 3.5h14v11l-5.5 6H5v-17Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.5 20.5v-6H19" })
  ] }),
  text: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "12", y: "16", textAnchor: "middle", fontSize: "12", fontWeight: "650", fill: "currentColor", stroke: "none", children: "Aa" }) }),
  shape: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m12 3 9 9-9 9-9-9 9-9Z" }) }),
  pen: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m14 7 3 3" })
  ] }),
  eraser: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 18-4-4 9-9a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8L9 18H7Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 18h11M9 8l7 7" })
  ] }),
  web: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" })
  ] }),
  image: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8.5", cy: "9", r: "1.4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m4 17 5-5 4 4 2.5-2.5L20 18" })
  ] }),
  fit: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" }) }),
  mission: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "8.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 1.8v3M22.2 12h-3M12 22.2v-3M1.8 12h3" })
  ] }),
  git: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "6", r: "2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "18", r: "2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "8", r: "2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 8.5v7M18 10.5c0 4-4 4-6.5 4.5" })
  ] }),
  settings: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 7h8M17 7h3M4 17h3M12 17h8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "14.5", cy: "7", r: "2.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9.5", cy: "17", r: "2.5" })
  ] })
};
function ToolButton({
  label,
  hint,
  active = false,
  disabled = false,
  onClick,
  testId,
  tone = "",
  children
}) {
  const { ripples, spawn } = useRipples();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `tool-btn ${tone} ${active ? "on" : ""}`,
      title: hint ?? label,
      "aria-label": label,
      "aria-pressed": active || void 0,
      "data-testid": testId,
      disabled,
      onClick,
      onPointerDown: spawn,
      children: [
        children,
        ripples.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rail-ripple", style: { left: r2.x, top: r2.y } }, r2.id))
      ]
    }
  );
}
function ToolRail() {
  const tool = useApp((s) => s.tool);
  const panel = useApp((s) => s.panel);
  const threadOpen = useApp((s) => s.threadOpen);
  const selected = useApp((s) => s.selected);
  const repo = useApp((s) => s.repos.find((r2) => r2.id === s.activeRepoId) ?? null);
  const setTool = useApp((s) => s.setTool);
  const setPanel = useApp((s) => s.setPanel);
  const setThreadOpen = useApp((s) => s.setThreadOpen);
  const setComposerOpen = useApp((s) => s.setComposerOpen);
  const setWireFrom = useApp((s) => s.setWireFrom);
  const toast = useApp((s) => s.toast);
  const disabled = !repo;
  const pick = (next) => {
    setTool(next);
    setWireFrom(null);
  };
  const openBrain = () => {
    setThreadOpen(true);
    window.dispatchEvent(new CustomEvent("hive:brain"));
  };
  const toggleWire = () => {
    if (tool === "wire") {
      setTool("select");
      setWireFrom(null);
      return;
    }
    setTool("wire");
    const source = selected.length === 1 ? selected[0] : null;
    setWireFrom(source);
    toast(source ? "Rope: click a second node" : "Rope: click the first node", "info");
  };
  const spawnDirectorNode = () => {
    setTool("select");
    spawnDirector();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "tool-rail", "data-testid": "tool-rail", "aria-label": "God Terminal tools", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Select", hint: "Select (V)", active: tool === "select", tone: "select", onClick: () => pick("select"), children: icons.select }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Pan", hint: "Pan (hold Space)", active: tool === "hand", onClick: () => pick("hand"), children: icons.hand }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tool-sep" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Spawn Director", hint: "Spawn Director — link the crew", testId: "spawn-director", tone: "director", disabled, onClick: spawnDirectorNode, children: icons.director }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Connect nodes", hint: "Connect nodes with a rope", testId: "wire-tool", tone: "link", active: tool === "wire", disabled, onClick: toggleWire, children: icons.link }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tool-sep" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Main Brain", hint: "Main Brain (Ctrl+Shift+B)", testId: "open-brain", active: threadOpen, onClick: openBrain, children: icons.brain }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Launch a team", hint: "Launch a team (Ctrl+Shift+T)", testId: "open-team", disabled, onClick: () => setComposerOpen(true), children: icons.team }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "New console", hint: "New console (T)", disabled, onClick: () => spawnConsoles(1), children: icons.console }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tool-sep" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Note", hint: "Add a note", active: tool === "note", disabled, onClick: () => pick("note"), children: icons.note }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Text", hint: "Add text", active: tool === "text", disabled, onClick: () => pick("text"), children: icons.text }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Shape", hint: "Add a shape", active: tool === "shape", disabled, onClick: () => pick("shape"), children: icons.shape }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Pen", hint: "Draw (P)", active: tool === "pen", disabled, onClick: () => pick("pen"), children: icons.pen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Eraser", hint: "Eraser (E)", active: tool === "eraser", disabled, onClick: () => pick("eraser"), children: icons.eraser }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Web tile", hint: "Add a web tile", active: tool === "web", disabled, onClick: () => pick("web"), children: icons.web }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Image", hint: "Add an image", active: tool === "image", disabled, onClick: () => pick("image"), children: icons.image }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tool-spacer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tool-sep" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Fit board", hint: "Fit board (Shift+1)", onClick: () => window.dispatchEvent(new CustomEvent("hive:fit")), children: icons.fit }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Mission Map", hint: "Mission Map", active: panel === "mission", onClick: () => setPanel("mission"), children: icons.mission }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Git", hint: "Git (G)", active: panel === "git", onClick: () => setPanel("git"), children: icons.git }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolButton, { label: "Settings", hint: "Settings", active: panel === "settings", onClick: () => setPanel("settings"), children: icons.settings })
  ] });
}
const LIVE = /* @__PURE__ */ new Set(["STARTING", "WORKING", "RUNNING", "READY", "IDLE"]);
const statusKey = (s) => s.toLowerCase().replace(/\s+/g, "-");
function TeamRail({ board }) {
  const setComposerOpen = useApp((s) => s.setComposerOpen);
  const setThreadOpen = useApp((s) => s.setThreadOpen);
  const consoles = consolesOf(board);
  const running = consoles.filter((c2) => LIVE.has(c2.status)).length;
  const needs = consoles.filter((c2) => c2.status === "NEEDS YOU").length;
  const openBrain = () => {
    setThreadOpen(true);
    window.dispatchEvent(new CustomEvent("hive:brain"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "team-rail", "aria-label": "Team", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "team-rail-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rail-title", children: "Team" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          running,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: " running" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "team-add", onClick: () => setComposerOpen(true), title: "Launch a team", "aria-label": "Launch a team", children: "＋" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "team-card team-brain", onClick: openBrain, title: "Open Main Brain", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "team-orb", children: "G" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "team-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Main Brain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "local · coordinates the crew" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "live-dot on" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "team-list", children: [
      consoles.map((c2) => {
        const agent = getAgent(c2.agentId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `team-card status-${statusKey(c2.status)}`,
            onClick: () => window.dispatchEvent(new CustomEvent("hive:frame", { detail: c2.id })),
            title: `Focus ${c2.title}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "team-avatar",
                  style: {
                    background: `color-mix(in srgb, ${agent.color} 18%, var(--panel-2))`,
                    borderColor: `color-mix(in srgb, ${agent.color} 38%, transparent)`,
                    color: agent.color
                  },
                  children: agent.name.slice(0, 1)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "team-copy", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: c2.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: agent.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "team-status", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
                  " ",
                  c2.status
                ] })
              ] })
            ]
          },
          c2.id
        );
      }),
      !consoles.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "team-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No agents on this board yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setComposerOpen(true), children: "Launch a team" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "team-rail-foot", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => spawnConsoles(1), children: [
        "＋ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "New console" })
      ] }),
      needs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "team-needs", children: [
        needs,
        " needed"
      ] })
    ] })
  ] });
}
let demoSeeded = false;
function App() {
  const hydrated = useApp((s) => s.hydrated);
  const hydrate = useApp((s) => s.hydrate);
  const settings = useApp((s) => s.settings);
  const theme = settings.theme;
  const showHome = useApp((s) => s.showHome);
  const repo = useApp((s) => s.repos.find((r2) => r2.id === s.activeRepoId) ?? null);
  const ws = useApp((s) => s.repos.find((r2) => r2.id === s.activeRepoId)?.workspaces.find((w2) => w2.id === s.repos.find((x2) => x2.id === s.activeRepoId)?.activeWorkspaceId) ?? null);
  const board = useApp((s) => s.board());
  const panel = useApp((s) => s.panel);
  const setPanel = useApp((s) => s.setPanel);
  const setWorkspace = useApp((s) => s.setWorkspace);
  const addWorkspace = useApp((s) => s.addWorkspace);
  const closeWorkspace = useApp((s) => s.closeWorkspace);
  const renameWorkspace = useApp((s) => s.renameWorkspace);
  const setTool = useApp((s) => s.setTool);
  const setWireFrom = useApp((s) => s.setWireFrom);
  useApp((s) => s.tool);
  const goHome = useApp((s) => s.goHome);
  const setThreadOpen = useApp((s) => s.setThreadOpen);
  const toasts = useApp((s) => s.toasts);
  const dismissToast = useApp((s) => s.dismissToast);
  useApp((s) => s.addRepo);
  const toast = useApp((s) => s.toast);
  const setComposerOpen = useApp((s) => s.setComposerOpen);
  useApp((s) => s.threadOpen);
  const loops = useApp((s) => s.loops);
  const setLoops = useApp((s) => s.setLoops);
  const [recording, setRecording] = reactExports.useState(false);
  const [recMode, setRecMode] = reactExports.useState("order");
  const recorder = reactExports.useRef(null);
  const chunks = reactExports.useRef([]);
  const stream = reactExports.useRef(null);
  const recTimer = reactExports.useRef(null);
  const voiceBusy = reactExports.useRef(false);
  const demo = typeof location !== "undefined" && new URLSearchParams(location.search).has("demo");
  reactExports.useEffect(() => {
    if (demo) {
      if (demoSeeded) return;
      demoSeeded = true;
      void (async () => {
        const path = await window.api.cwd();
        const st = useApp.getState();
        st.addRepo(path);
        st.patchSettings({ defaultAgent: "shell" });
        activeRepo(useApp.getState());
        const otto = makeConsole(80, 100, { title: "Otto", agentId: "shell", cwd: path });
        const mira = makeConsole(80, 400, { title: "Mira", agentId: "shell", cwd: path });
        const note = makeNote(990, 80, "Ship the beta on Friday.\n\nThe board is local: every node lives in state.json.");
        const orch = makeOrchestrator(570, 70, "Director");
        orch.wired = [otto.id, mira.id];
        st.addNodes([otto, mira, note, orch]);
        st.updateBoard((b) => ({
          ...b,
          groups: [{ id: "demo-group", name: "Frontend squad", role: "Frontend", tint: "violet", memberIds: [otto.id, mira.id] }],
          wires: [
            { id: "demo-wire", from: otto.id, to: orch.id, kind: "orchestrator" },
            { id: "demo-wire-2", from: mira.id, to: orch.id, kind: "orchestrator" }
          ]
        }));
        useApp.setState({ hydrated: true, showHome: false });
      })();
    } else if (!hydrated) void hydrate();
  }, [hydrated, hydrate, demo]);
  reactExports.useEffect(() => demo ? () => void 0 : startPersistence(), [demo]);
  reactExports.useEffect(() => {
    document.body.dataset.theme = theme;
    void window.api.win?.setTitleBar({
      color: theme === "light" ? "#f6f4ee" : "#080a0e",
      symbolColor: theme === "light" ? "#1b202b" : "#f1f4f9",
      height: 58
    }).catch(() => void 0);
  }, [theme]);
  const finishRecording = reactExports.useCallback(async () => {
    const rec = recorder.current;
    if (!rec || rec.state === "inactive") return;
    rec.stop();
  }, []);
  const startRecording = reactExports.useCallback(async (mode) => {
    if (voiceBusy.current || recording) return;
    if (!settings.sttUrl) {
      toast("Set a local STT server in Settings → Voice", "error");
      return;
    }
    voiceBusy.current = true;
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = media;
      const rec = new MediaRecorder(media);
      recorder.current = rec;
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data);
      };
      rec.onstop = async () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        media.getTracks().forEach((t2) => t2.stop());
        stream.current = null;
        setRecording(false);
        if (recTimer.current) clearTimeout(recTimer.current);
        if (!blob.size) {
          voiceBusy.current = false;
          return;
        }
        try {
          const buf = await blob.arrayBuffer();
          const ctx = new AudioContext();
          const audio = await ctx.decodeAudioData(buf);
          const b64 = audioToWavBase64(audio);
          await ctx.close();
          const res = await window.api.stt.transcribe(b64, settings.sttUrl);
          if (!res.text) {
            toast(res.error ? `Speech failed: ${res.error}` : "No speech recognized", "error");
            return;
          }
          if (mode === "dictation") {
            const el2 = document.activeElement;
            if (el2 && "value" in el2) el2.value = `${el2.value}${el2.value ? " " : ""}${res.text}`;
            else useApp.getState().setCommandDraft(`${useApp.getState().commandDraft} ${res.text}`.trim());
            toast("Dictated (not sent)", "ok");
          } else {
            useApp.getState().setCommandDraft(res.text);
            void runCommand(res.text);
            if (settings.ttsEnabled && "speechSynthesis" in window) {
              const utter = new SpeechSynthesisUtterance("Order sent.");
              utter.lang = settings.voiceLanguage;
              window.speechSynthesis.speak(utter);
            }
          }
        } catch (err) {
          toast(err instanceof Error ? err.message : "Speech failed", "error");
        } finally {
          voiceBusy.current = false;
        }
      };
      rec.start();
      setRecMode(mode);
      setRecording(true);
      recTimer.current = setTimeout(() => void finishRecording(), 6e4);
    } catch (err) {
      voiceBusy.current = false;
      toast(err instanceof Error ? err.message : "Microphone unavailable", "error");
    }
  }, [recording, settings.sttUrl, settings.ttsEnabled, settings.voiceLanguage, toast, finishRecording]);
  const stopRecording = reactExports.useCallback(() => void finishRecording(), [finishRecording]);
  reactExports.useEffect(() => {
    const down = (e) => {
      const el2 = e.target;
      const typing = !!el2.closest("input,textarea,[contenteditable],select");
      if (e.code === "Space" && settings.holdSpace && !typing && !recording) {
        e.preventDefault();
        e.stopImmediatePropagation();
        void startRecording("order");
        return;
      }
      if (e.code === "Space" && e.ctrlKey && !typing && !recording) {
        e.preventDefault();
        e.stopImmediatePropagation();
        void startRecording("dictation");
        return;
      }
      if (typing) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) useApp.getState().redo();
        else useApp.getState().undo();
        return;
      }
      if (e.repeat) return;
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if (e.key === "Escape") {
        setPanel(null);
        useApp.getState().setSelection([]);
        useApp.getState().setComposerOpen(false);
        setTool("select");
        setWireFrom(null);
      }
      if (mod && e.shiftKey && key === "b") {
        e.preventDefault();
        setThreadOpen(true);
        window.dispatchEvent(new CustomEvent("hive:brain"));
        return;
      }
      if (mod && e.shiftKey && key === "t") {
        e.preventDefault();
        setComposerOpen(true);
        return;
      }
      if (e.code === "Digit0" && mod) {
        e.preventDefault();
        useApp.getState().updateBoard((b) => ({ ...b, viewport: { ...b.viewport, zoom: 1 } }));
        return;
      }
      if (e.code === "Digit1" && e.shiftKey) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("hive:fit"));
        return;
      }
      if (mod) return;
      if (key === "v") {
        e.preventDefault();
        setTool("select");
      } else if (key === "t" && e.shiftKey) setThreadOpen(true);
      else if (key === "t") {
        e.preventDefault();
        spawnConsoles(1);
      } else if (key === "p") setTool("pen");
      else if (key === "e") setTool("eraser");
      else if (key === "g") setPanel("git");
      else if (key === "m") setPanel("memory");
      else if (key === "s") setPanel("skills");
      else if (key === "d") setPanel("markdown");
      else if (key === "l") setPanel("loops");
      else if (key === "x") setPanel("mission");
      else if (key === "n") {
        const needs2 = consolesOf(useApp.getState().board()).find((c2) => c2.status === "NEEDS YOU");
        if (needs2) window.dispatchEvent(new CustomEvent("hive:frame", { detail: needs2.id }));
        else toast("Nothing needs you", "ok");
      } else if (key === "delete" || key === "backspace") {
        const sel = useApp.getState().selected;
        if (sel.length) useApp.getState().removeNodes(sel);
      }
    };
    const up = (e) => {
      if (e.code === "Space" && recording) stopRecording();
    };
    window.addEventListener("keydown", down, true);
    window.addEventListener("keyup", up, true);
    return () => {
      window.removeEventListener("keydown", down, true);
      window.removeEventListener("keyup", up, true);
    };
  }, [settings.holdSpace, recording, recMode, startRecording, stopRecording, setPanel, setThreadOpen, setTool, setWireFrom, toast]);
  reactExports.useEffect(() => {
    const tick = setInterval(() => {
      const st = useApp.getState();
      const b = st.board();
      if (!b) return;
      const now2 = Date.now();
      let changed = false;
      const next = st.loops.map((loop) => {
        if (!loop.enabled || loop.runs >= loop.maxRuns) return loop;
        const targets = loop.target === "all" ? consolesOf(b).map((c2) => c2.id) : b.groups.find((g) => g.id === loop.target)?.memberIds ?? (b.nodes.find((n2) => n2.id === loop.target) ? [loop.target] : []);
        if (!targets.length) return loop;
        let due = false;
        if (loop.trigger.type === "interval") {
          const period = Math.max(60, loop.trigger.seconds ?? 300) * 1e3;
          due = !loop.lastRun || now2 - loop.lastRun >= period;
        } else if (loop.trigger.type === "idle") {
          const allIdle = targets.every((id2) => {
            const n2 = b.nodes.find((x2) => x2.id === id2);
            return n2?.kind === "console" && ["READY", "IDLE"].includes(n2.status);
          });
          due = allIdle && (!loop.lastRun || now2 - loop.lastRun > 6e4);
        } else if (loop.trigger.type === "contains" && loop.trigger.pattern) {
          due = targets.some((id2) => (getHandle(id2)?.tail() ?? "").includes(loop.trigger.pattern));
        }
        if (!due) return loop;
        for (const id2 of targets) {
          const h = getHandle(id2);
          if (h) {
            h.write(loop.instruction);
            setTimeout(() => h.write("\r"), 220);
          }
        }
        toast(`Loop “${loop.name}” ran (${loop.runs + 1}/${loop.maxRuns})`, "info");
        changed = true;
        return { ...loop, runs: loop.runs + 1, lastRun: now2 };
      });
      if (changed) setLoops(next);
    }, 5e3);
    return () => clearInterval(tick);
  }, [setLoops, toast, loops.length]);
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "splash", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-mark", children: "G" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading board…" })
    ] });
  }
  const needs = consolesOf(board).filter((c2) => c2.status === "NEEDS YOU").length;
  const running = consolesOf(board).filter((c2) => ["READY", "IDLE", "WORKING"].includes(c2.status)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `app theme-${theme}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "topbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `brand ${!showHome && repo ? "back" : ""}`,
          onClick: goHome,
          title: !showHome && repo ? "Back to home" : "Home",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "logo-mark small", children: "G" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brand-word", children: !showHome && repo ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "back-arrow", children: "←" }),
              " Back to home"
            ] }) : "God Terminal" })
          ]
        }
      ),
      repo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "repo-chip", onClick: goHome, title: "Repos", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "repo-name", children: repo.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted tiny", children: repo.path.replace(/^.*[\\/]/, "") })
      ] }),
      repo && !showHome && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ws-tabs", children: [
        repo.workspaces.map((w2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `ws-tab ${ws?.id === w2.id ? "on" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setWorkspace(w2.id),
              onDoubleClick: () => {
                const name = window.prompt("Workspace name", w2.name);
                if (name) renameWorkspace(w2.id, name);
              },
              children: w2.name
            }
          ),
          repo.workspaces.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "ws-close",
              onClick: () => {
                if (confirm(`Close workspace “${w2.name}”? Its consoles end.`)) closeWorkspace(w2.id);
              },
              children: "×"
            }
          )
        ] }, w2.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "ws-add", onClick: () => addWorkspace(), children: "+" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spacer" }),
      !showHome && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-actions", children: [
        needs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "needs-chip", onClick: () => setPanel("mission"), children: [
          needs,
          " need",
          needs === 1 ? "s" : "",
          " you"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "live-pill", onClick: () => setPanel("mission"), title: "Every running console", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `live-dot ${running ? "on" : ""}` }),
          " ",
          running,
          " live"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "top-sep" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "top-icon", title: "Mission Map", onClick: () => setPanel("mission"), children: "◎" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "top-icon", title: "Git", onClick: () => setPanel("git"), children: "⑂" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "top-icon", title: "Settings", onClick: () => setPanel("settings"), children: "⚙" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main", children: [
      !showHome && /* @__PURE__ */ jsxRuntimeExports.jsx(ToolRail, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage", children: [
        showHome || !repo || !board ? /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) : repo.workspaces.map((w2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `ws-layer ${w2.id === repo.activeWorkspaceId ? "on" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Board, { board: w2.board, active: w2.id === repo.activeWorkspaceId }) }, w2.id)),
        !showHome && board && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommandBar,
          {
            recording,
            onVoiceStart: () => void startRecording("order"),
            onVoiceStop: () => stopRecording()
          }
        )
      ] }),
      !showHome && board && /* @__PURE__ */ jsxRuntimeExports.jsx(TeamRail, { board }),
      !showHome && panel && /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHost, { panel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toasts", children: toasts.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `toast ${t2.kind}`, onClick: () => dismissToast(t2.id), children: t2.text }, t2.id)) }),
    recording && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voice-hud", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rec-dot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: recMode === "dictation" ? "Dictating — release to insert" : "Listening — release to send" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted small", children: [
        settings.llmProvider === "lmstudio" ? settings.lmStudioModel : settings.ollamaModel,
        " · local STT"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamComposer, {})
  ] });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
