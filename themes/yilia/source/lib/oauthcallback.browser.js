var _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
function(e) {
  return typeof e
}: function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
},
_typeof2 = "function" == typeof Symbol && "symbol" == _typeof3(Symbol.iterator) ?
function(e) {
  return void 0 === e ? "undefined": _typeof3(e)
}: function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": void 0 === e ? "undefined": _typeof3(e)
},
_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ?
function(e) {
  return void 0 === e ? "undefined": _typeof2(e)
}: function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": void 0 === e ? "undefined": _typeof2(e)
},
Oauthcallback = function(n) {
  var o = {};
  function r(e) {
    if (o[e]) return o[e].exports;
    var t = o[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return n[e].call(t.exports, t, t.exports, r),
    t.l = !0,
    t.exports
  }
  return r.m = n,
  r.c = o,
  r.d = function(e, t, n) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  },
  r.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }),
    Object.defineProperty(e, "__esModule", {
      value: !0
    })
  },
  r.t = function(t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == (void 0 === t ? "undefined": _typeof(t)) && t && t.__esModule) return t;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) r.d(n, o,
    function(e) {
      return t[e]
    }.bind(null, o));
    return n
  },
  r.n = function(e) {
    var t = e && e.__esModule ?
    function() {
      return e.
    default
    }:
    function() {
      return e
    };
    return r.d(t, "a", t),
    t
  },
  r.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  },
  r.p = "",
  r(r.s = 0)
} ([function(e, t, n) {
  var o = n(1);
  e.exports = function() {
    var e = o.Query.parse();
    e.code && (window.location.href = decodeURIComponent(e.bkurl + "?code=" + e.code))
  }
},
function(e, t, n) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }),
  t.http = t.Query = t.isString = void 0,
  t.getTargetContainer = function(e) {
    return e instanceof Element ? e: o(e) ? document.getElementById(e) : document.createElement("div")
  };
  var l = n(2),
  o = t.isString = function(e) {
    return "[object String]" === toString.call(e)
  },
  a = t.Query = {
    parse: function(e) {
      var t = 0 < arguments.length && void 0 !== e ? e: window.location.search;
      if (!t) return {};
      var r = {};
      return ("?" === t[0] ? t.substring(1) : t).split("&").forEach(function(e) {
        var t = function(e) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e) {
            var t = [],
            n = !0,
            o = !1,
            r = void 0;
            try {
              for (var i, u = e[Symbol.iterator](); ! (n = (i = u.next()).done) && (t.push(i.value), 2 !== t.length); n = !0);
            } catch(e) {
              o = !0,
              r = e
            } finally {
              try { ! n && u.
                return && u.
                return ()
              } finally {
                if (o) throw r
              }
            }
            return t
          } (e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        } (e.split("=")),
        n = t[0],
        o = t[1];
        n && (r[n] = o)
      }),
      r
    },
    stringify: function(t, e) {
      var n = 1 < arguments.length && void 0 !== e ? e: "?",
      o = Object.keys(t).map(function(e) {
        return e + "=" + encodeURIComponent(t[e] || "")
      }).join("&");
      return o ? n + o: ""
    }
  };
  function r(c) {
    return function(e) {
      var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "https://gitee.com/api/v5",
      i = new XMLHttpRequest,
      o = localStorage.getItem(l.LS_ACCESS_TOKEN_KEY),
      r = "" + n + e,
      u = null;
      "GET" !== c && "DELETE" !== c || (r += a.stringify(t));
      var f = new Promise(function(o, r) {
        i.addEventListener("load",
        function() {
          var e = i.getResponseHeader("content-type"),
          t = i.responseText;
          if (/json/.test(e)) {
            var n = i.responseText ? JSON.parse(t) : {};
            n.message ? r(new Error(n.message)) : o(n)
          } else o(t)
        }),
        i.addEventListener("error",
        function(e) {
          return r(e)
        })
      });
      return i.open(c, r, !0),
      i.setRequestHeader("Accept", "application/json, text/plain"),
      o && i.setRequestHeader("Authorization", "token " + o),
      "GET" !== c && "DELETE" !== c && (u = JSON.stringify(t), i.setRequestHeader("Content-Type", "application/json")),
      i.send(u),
      f
    }
  }
  t.http = {
    get: r("GET"),
    post: r("POST"),
    delete: r("DELETE"),
    put: r("PUT")
  }
},
function(e, t, n) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }),
  t.LS_ACCESS_TOKEN_KEY = "giteement-comments-token",
  t.LS_USER_KEY = "giteement-user-info",
  t.NOT_INITIALIZED_ERROR = new Error("Comments Not Initialized")
}]);