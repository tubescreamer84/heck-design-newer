! function e(t, n, i) {
    function r(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return r(n ? n : e)
            }, c, c.exports, e, t, n, i)
        }
        return n[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
    return r
}({
    1: [function(e, t, n) {
        (function(e) {
            ! function(e, i) {
                "object" == typeof n && "undefined" != typeof t ? t.exports = i() : "function" == typeof define && define.amd ? define(i) : (e.Vimeo = e.Vimeo || {}, e.Vimeo.Player = i())
            }(this, function() {
                "use strict";

                function t(e, t) {
                    return t = {
                        exports: {}
                    }, e(t, t.exports), t.exports
                }

                function n(e, t, n) {
                    var i = A.get(e.element) || {};
                    t in i || (i[t] = []), i[t].push(n), A.set(e.element, i)
                }

                function i(e, t) {
                    var n = A.get(e.element) || {};
                    return n[t] || []
                }

                function r(e, t, n) {
                    var i = A.get(e.element) || {};
                    if (!i[t]) return !0;
                    if (!n) return i[t] = [], A.set(e.element, i), !0;
                    var r = i[t].indexOf(n);
                    return -1 !== r && i[t].splice(r, 1), A.set(e.element, i), i[t] && 0 === i[t].length
                }

                function o(e, t) {
                    var n = A.get(e);
                    A.set(t, n), A["delete"](e)
                }

                function a(e, t) {
                    return 0 === e.indexOf(t.toLowerCase()) ? e : "" + t.toLowerCase() + e.substr(0, 1).toUpperCase() + e.substr(1)
                }

                function s(e) {
                    return e instanceof window.HTMLElement
                }

                function u(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e
                }

                function l(e) {
                    return /^(https?:)?\/\/(player.)?vimeo.com/.test(e)
                }

                function c() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = e.id,
                        n = e.url,
                        i = t || n;
                    if (!i) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
                    if (u(i)) return "https://vimeo.com/" + i;
                    if (l(i)) return i.replace("http:", "https:");
                    if (t) throw new TypeError("â€œ" + t + "â€ is not a valid video id.");
                    throw new TypeError("â€œ" + i + "â€ is not a vimeo.com url.")
                }

                function p(e) {
                    for (var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = T, i = Array.isArray(n), r = 0, n = i ? n : n[Symbol.iterator]();;) {
                        var o;
                        if (i) {
                            if (r >= n.length) break;
                            o = n[r++]
                        } else {
                            if (r = n.next(), r.done) break;
                            o = r.value
                        }
                        var a = o,
                            s = e.getAttribute("data-vimeo-" + a);
                        (s || "" === s) && (t[a] = "" === s ? 1 : s)
                    }
                    return t
                }

                function d(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    return new Promise(function(n, i) {
                        if (!l(e)) throw new TypeError("â€œ" + e + "â€ is not a vimeo.com url.");
                        var r = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(e);
                        for (var o in t) t.hasOwnProperty(o) && (r += "&" + o + "=" + encodeURIComponent(t[o]));
                        var a = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
                        a.open("GET", r, !0), a.onload = function() {
                            if (404 === a.status) return void i(new Error("â€œ" + e + "â€ was not found."));
                            if (403 === a.status) return void i(new Error("â€œ" + e + "â€ is not embeddable."));
                            try {
                                var t = JSON.parse(a.responseText);
                                n(t)
                            } catch (r) {
                                i(r)
                            }
                        }, a.onerror = function() {
                            var e = a.status ? " (" + a.status + ")" : "";
                            i(new Error("There was an error fetching the embed code from Vimeo" + e + "."))
                        }, a.send()
                    })
                }

                function f(e, t) {
                    var n = e.html;
                    if (!t) throw new TypeError("An element must be provided");
                    if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
                    var i = document.createElement("div");
                    i.innerHTML = n;
                    var r = i.firstChild;
                    return t.appendChild(r), t.setAttribute("data-vimeo-initialized", "true"), r
                }

                function h() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? document : arguments[0],
                        t = [].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),
                        n = function(e) {
                            "console" in window && console.error && console.error("There was an error creating an embed: " + e)
                        },
                        i = function() {
                            if (o) {
                                if (a >= r.length) return "break";
                                s = r[a++]
                            } else {
                                if (a = r.next(), a.done) return "break";
                                s = a.value
                            }
                            var e = s;
                            try {
                                if (null !== e.getAttribute("data-vimeo-defer")) return "continue";
                                var t = c(e),
                                    i = p(e);
                                d(t, i).then(function(t) {
                                    return f(t, e)
                                })["catch"](n)
                            } catch (u) {
                                n(u)
                            }
                        };
                    e: for (var r = t, o = Array.isArray(r), a = 0, r = o ? r : r[Symbol.iterator]();;) {
                        var s, u = i();
                        switch (u) {
                            case "break":
                                break e;
                            case "continue":
                                continue
                        }
                    }
                }

                function v(e) {
                    return "string" == typeof e && (e = JSON.parse(e)), e
                }

                function g(e, t, n) {
                    if (e.element.contentWindow.postMessage) {
                        var i = {
                            method: t
                        };
                        void 0 !== n && (i.value = n);
                        var r = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
                        r >= 8 && 10 > r && (i = JSON.stringify(i)), e.element.contentWindow.postMessage(i, e.origin)
                    }
                }

                function m(e, t) {
                    t = v(t);
                    var n = [],
                        o = void 0;
                    if (t.event) {
                        if ("error" === t.event)
                            for (var a = i(e, t.data.method), s = a, u = Array.isArray(s), l = 0, s = u ? s : s[Symbol.iterator]();;) {
                                var c;
                                if (u) {
                                    if (l >= s.length) break;
                                    c = s[l++]
                                } else {
                                    if (l = s.next(), l.done) break;
                                    c = l.value
                                }
                                var p = c,
                                    d = new Error(t.data.message);
                                d.name = t.data.name, p.reject(d), r(e, t.data.method, p)
                            }
                        n = i(e, "event:" + t.event), o = t.data
                    } else t.method && (n = i(e, t.method), o = t.value, r(e, t.method));
                    for (var f = n, h = Array.isArray(f), g = 0, f = h ? f : f[Symbol.iterator]();;) {
                        var m;
                        if (h) {
                            if (g >= f.length) break;
                            m = f[g++]
                        } else {
                            if (g = f.next(), g.done) break;
                            m = g.value
                        }
                        var y = m;
                        try {
                            if ("function" == typeof y) {
                                y.call(e, o);
                                continue
                            }
                            y.resolve(o)
                        } catch (b) {}
                    }
                }
                var y = "undefined" != typeof Array.prototype.indexOf,
                    b = "undefined" != typeof window.postMessage;
                if (!y || !b) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
                var w = "undefined" != typeof window ? window : "undefined" != typeof e ? e : "undefined" != typeof self ? self : {},
                    _ = (t(function(t, n) {
                        ! function(e) {
                            function t(e, t) {
                                function i(e) {
                                    return this && this.constructor === i ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = t, void(e && n.call(this, e))) : new i(e)
                                }
                                return t || b(e, "size", {
                                    get: g
                                }), e.constructor = i, i.prototype = e, i
                            }

                            function n(e) {
                                this.add ? e.forEach(this.add, this) : e.forEach(function(e) {
                                    this.set(e[0], e[1])
                                }, this)
                            }

                            function i(e) {
                                return this.has(e) && (this._keys.splice(y, 1), this._values.splice(y, 1), this._itp.forEach(function(e) {
                                    y < e[0] && e[0]--
                                })), y > -1
                            }

                            function r(e) {
                                return this.has(e) ? this._values[y] : void 0
                            }

                            function o(e, t) {
                                if (this.objectOnly && t !== Object(t)) throw new TypeError("Invalid value used as weak collection key");
                                if (t != t || 0 === t)
                                    for (y = e.length; y-- && !w(e[y], t););
                                else y = e.indexOf(t);
                                return y > -1
                            }

                            function a(e) {
                                return o.call(this, this._values, e)
                            }

                            function s(e) {
                                return o.call(this, this._keys, e)
                            }

                            function u(e, t) {
                                return this.has(e) ? this._values[y] = t : this._values[this._keys.push(e) - 1] = t, this
                            }

                            function l(e) {
                                return this.has(e) || this._values.push(e), this
                            }

                            function c() {
                                (this._keys || 0).length = this._values.length = 0
                            }

                            function p() {
                                return v(this._itp, this._keys)
                            }

                            function d() {
                                return v(this._itp, this._values)
                            }

                            function f() {
                                return v(this._itp, this._keys, this._values)
                            }

                            function h() {
                                return v(this._itp, this._values, this._values)
                            }

                            function v(e, t, n) {
                                var i = [0],
                                    r = !1;
                                return e.push(i), {
                                    next: function() {
                                        var o, a = i[0];
                                        return !r && a < t.length ? (o = n ? [t[a], n[a]] : t[a], i[0]++) : (r = !0, e.splice(e.indexOf(i), 1)), {
                                            done: r,
                                            value: o
                                        }
                                    }
                                }
                            }

                            function g() {
                                return this._values.length
                            }

                            function m(e, t) {
                                for (var n = this.entries();;) {
                                    var i = n.next();
                                    if (i.done) break;
                                    e.call(t, i.value[1], i.value[0], this)
                                }
                            }
                            var y, b = Object.defineProperty,
                                w = function(e, t) {
                                    return e === t || e !== e && t !== t
                                };
                            "undefined" == typeof WeakMap && (e.WeakMap = t({
                                "delete": i,
                                clear: c,
                                get: r,
                                has: s,
                                set: u
                            }, !0)), "undefined" != typeof Map && "function" == typeof(new Map).values && (new Map).values().next || (e.Map = t({
                                "delete": i,
                                has: s,
                                get: r,
                                set: u,
                                keys: p,
                                values: d,
                                entries: f,
                                forEach: m,
                                clear: c
                            })), "undefined" != typeof Set && "function" == typeof(new Set).values && (new Set).values().next || (e.Set = t({
                                has: a,
                                add: l,
                                "delete": i,
                                clear: c,
                                keys: d,
                                values: d,
                                entries: h,
                                forEach: m
                            })), "undefined" == typeof WeakSet && (e.WeakSet = t({
                                "delete": i,
                                add: l,
                                clear: c,
                                has: a
                            }, !0))
                        }("undefined" != typeof n && "undefined" != typeof e ? w : window)
                    }), t(function(t) {
                        ! function(e, n, i) {
                            n[e] = n[e] || i(), "undefined" != typeof t && t.exports ? t.exports = n[e] : "function" == typeof define && define.amd && define(function() {
                                return n[e]
                            })
                        }("Promise", "undefined" != typeof e ? e : w, function() {
                            function e(e, t) {
                                d.add(e, t), p || (p = h(d.drain))
                            }

                            function t(e) {
                                var t, n = typeof e;
                                return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t && t
                            }

                            function n() {
                                for (var e = 0; e < this.chain.length; e++) i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                                this.chain.length = 0
                            }

                            function i(e, n, i) {
                                var r, o;
                                try {
                                    n === !1 ? i.reject(e.msg) : (r = n === !0 ? e.msg : n.call(void 0, e.msg), r === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (o = t(r)) ? o.call(r, i.resolve, i.reject) : i.resolve(r))
                                } catch (a) {
                                    i.reject(a)
                                }
                            }

                            function r(i) {
                                var a, u = this;
                                if (!u.triggered) {
                                    u.triggered = !0, u.def && (u = u.def);
                                    try {
                                        (a = t(i)) ? e(function() {
                                            var e = new s(u);
                                            try {
                                                a.call(i, function() {
                                                    r.apply(e, arguments)
                                                }, function() {
                                                    o.apply(e, arguments)
                                                })
                                            } catch (t) {
                                                o.call(e, t)
                                            }
                                        }): (u.msg = i, u.state = 1, u.chain.length > 0 && e(n, u))
                                    } catch (l) {
                                        o.call(new s(u), l)
                                    }
                                }
                            }

                            function o(t) {
                                var i = this;
                                i.triggered || (i.triggered = !0, i.def && (i = i.def), i.msg = t, i.state = 2, i.chain.length > 0 && e(n, i))
                            }

                            function a(e, t, n, i) {
                                for (var r = 0; r < t.length; r++) ! function(r) {
                                    e.resolve(t[r]).then(function(e) {
                                        n(r, e)
                                    }, i)
                                }(r)
                            }

                            function s(e) {
                                this.def = e, this.triggered = !1
                            }

                            function u(e) {
                                this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                            }

                            function l(t) {
                                if ("function" != typeof t) throw TypeError("Not a function");
                                if (0 !== this.__NPO__) throw TypeError("Not a promise");
                                this.__NPO__ = 1;
                                var i = new u(this);
                                this.then = function(t, r) {
                                    var o = {
                                        success: "function" != typeof t || t,
                                        failure: "function" == typeof r && r
                                    };
                                    return o.promise = new this.constructor(function(e, t) {
                                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                                        o.resolve = e, o.reject = t
                                    }), i.chain.push(o), 0 !== i.state && e(n, i), o.promise
                                }, this["catch"] = function(e) {
                                    return this.then(void 0, e)
                                };
                                try {
                                    t.call(void 0, function(e) {
                                        r.call(i, e)
                                    }, function(e) {
                                        o.call(i, e)
                                    })
                                } catch (a) {
                                    o.call(i, a)
                                }
                            }
                            var c, p, d, f = Object.prototype.toString,
                                h = "undefined" != typeof setImmediate ? function(e) {
                                    return setImmediate(e)
                                } : setTimeout;
                            try {
                                Object.defineProperty({}, "x", {}), c = function(e, t, n, i) {
                                    return Object.defineProperty(e, t, {
                                        value: n,
                                        writable: !0,
                                        configurable: i !== !1
                                    })
                                }
                            } catch (v) {
                                c = function(e, t, n) {
                                    return e[t] = n, e
                                }
                            }
                            d = function() {
                                function e(e, t) {
                                    this.fn = e, this.self = t, this.next = void 0
                                }
                                var t, n, i;
                                return {
                                    add: function(r, o) {
                                        i = new e(r, o), n ? n.next = i : t = i, n = i, i = void 0
                                    },
                                    drain: function() {
                                        var e = t;
                                        for (t = n = p = void 0; e;) e.fn.call(e.self), e = e.next
                                    }
                                }
                            }();
                            var g = c({}, "constructor", l, !1);
                            return l.prototype = g, c(g, "__NPO__", 0, !1), c(l, "resolve", function(e) {
                                var t = this;
                                return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function(t, n) {
                                    if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                                    t(e)
                                })
                            }), c(l, "reject", function(e) {
                                return new this(function(t, n) {
                                    if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                                    n(e)
                                })
                            }), c(l, "all", function(e) {
                                var t = this;
                                return "[object Array]" != f.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function(n, i) {
                                    if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                                    var r = e.length,
                                        o = Array(r),
                                        s = 0;
                                    a(t, e, function(e, t) {
                                        o[e] = t, ++s === r && n(o)
                                    }, i)
                                })
                            }), c(l, "race", function(e) {
                                var t = this;
                                return "[object Array]" != f.call(e) ? t.reject(TypeError("Not an array")) : new t(function(n, i) {
                                    if ("function" != typeof n || "function" != typeof i) throw TypeError("Not a function");
                                    a(t, e, function(e, t) {
                                        n(t)
                                    }, i)
                                })
                            }), l
                        })
                    })),
                    x = _ && "object" == typeof _ && "default" in _ ? _["default"] : _,
                    A = new WeakMap,
                    T = ["id", "url", "width", "maxwidth", "height", "maxheight", "portrait", "title", "byline", "color", "autoplay", "autopause", "loop", "responsive"],
                    C = function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    },
                    S = new WeakMap,
                    k = new WeakMap,
                    E = function() {
                        function e(t) {
                            var n = this,
                                i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                            if (C(this, e), "jQuery" in window && t instanceof jQuery && (t.length > 1 && "console" in window && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), t = t[0]), "string" == typeof t && (t = document.getElementById(t)), !s(t)) throw new TypeError("You must pass either a valid element or a valid id.");
                            if ("IFRAME" !== t.nodeName) {
                                var r = t.querySelector("iframe");
                                r && (t = r)
                            }
                            if ("IFRAME" === t.nodeName && !l(t.getAttribute("src") || "")) throw new Error("The player element passed isnâ€™t a Vimeo embed.");
                            if (S.has(t)) return S.get(t);
                            this.element = t, this.origin = "*";
                            var a = new x(function(e, r) {
                                var a = function(t) {
                                    if (l(t.origin) && n.element.contentWindow === t.source) {
                                        "*" === n.origin && (n.origin = t.origin);
                                        var i = v(t.data),
                                            r = "event" in i && "ready" === i.event,
                                            o = "method" in i && "ping" === i.method;
                                        return r || o ? (n.element.setAttribute("data-ready", "true"), void e()) : void m(n, i)
                                    }
                                };
                                if (window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a), "IFRAME" !== n.element.nodeName) {
                                    var s = p(t, i),
                                        u = c(s);
                                    d(u, s).then(function(e) {
                                        var i = f(e, t);
                                        return n.element = i, o(t, i), e
                                    })["catch"](function(e) {
                                        return r(e)
                                    })
                                }
                            });
                            return k.set(this, a), S.set(this.element, this), "IFRAME" === this.element.nodeName && g(this, "ping"), this
                        }
                        return e.prototype.then = function(e) {
                            var t = arguments.length <= 1 || void 0 === arguments[1] ? function() {} : arguments[1];
                            return this.ready().then(e, t)
                        }, e.prototype.callMethod = function(e) {
                            var t = this,
                                i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                            return new x(function(r, o) {
                                return t.ready().then(function() {
                                    n(t, e, {
                                        resolve: r,
                                        reject: o
                                    }), g(t, e, i)
                                })
                            })
                        }, e.prototype.get = function(e) {
                            var t = this;
                            return new x(function(i, r) {
                                return e = a(e, "get"), t.ready().then(function() {
                                    n(t, e, {
                                        resolve: i,
                                        reject: r
                                    }), g(t, e)
                                })
                            })
                        }, e.prototype.set = function(e, t) {
                            var i = this;
                            return x.resolve(t).then(function(t) {
                                if (e = a(e, "set"), void 0 === t || null === t) throw new TypeError("There must be a value to set.");
                                return i.ready().then(function() {
                                    return new x(function(r, o) {
                                        n(i, e, {
                                            resolve: r,
                                            reject: o
                                        }), g(i, e, t)
                                    })
                                })
                            })
                        }, e.prototype.on = function(e, t) {
                            if (!e) throw new TypeError("You must pass an event name.");
                            if (!t) throw new TypeError("You must pass a callback function.");
                            if ("function" != typeof t) throw new TypeError("The callback must be a function.");
                            var r = i(this, "event:" + e);
                            0 === r.length && this.callMethod("addEventListener", e)["catch"](function() {}), n(this, "event:" + e, t)
                        }, e.prototype.off = function(e, t) {
                            if (!e) throw new TypeError("You must pass an event name.");
                            if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
                            var n = r(this, "event:" + e, t);
                            n && this.callMethod("removeEventListener", e)["catch"](function(e) {})
                        }, e.prototype.loadVideo = function(e) {
                            return this.callMethod("loadVideo", e)
                        }, e.prototype.ready = function() {
                            var e = k.get(this);
                            return x.resolve(e)
                        }, e.prototype.enableTextTrack = function(e, t) {
                            if (!e) throw new TypeError("You must pass a language.");
                            return this.callMethod("enableTextTrack", {
                                language: e,
                                kind: t
                            })
                        }, e.prototype.disableTextTrack = function() {
                            return this.callMethod("disableTextTrack")
                        }, e.prototype.pause = function() {
                            return this.callMethod("pause")
                        }, e.prototype.play = function() {
                            return this.callMethod("play")
                        }, e.prototype.unload = function() {
                            return this.callMethod("unload")
                        }, e.prototype.getAutopause = function() {
                            return this.get("autopause")
                        }, e.prototype.setAutopause = function(e) {
                            return this.set("autopause", e)
                        }, e.prototype.getColor = function() {
                            return this.get("color")
                        }, e.prototype.setColor = function(e) {
                            return this.set("color", e)
                        }, e.prototype.getCurrentTime = function() {
                            return this.get("currentTime")
                        }, e.prototype.setCurrentTime = function(e) {
                            return this.set("currentTime", e)
                        }, e.prototype.getDuration = function() {
                            return this.get("duration")
                        }, e.prototype.getEnded = function() {
                            return this.get("ended")
                        }, e.prototype.getLoop = function() {
                            return this.get("loop")
                        }, e.prototype.setLoop = function(e) {
                            return this.set("loop", e)
                        }, e.prototype.getPaused = function() {
                            return this.get("paused")
                        }, e.prototype.getTextTracks = function() {
                            return this.get("textTracks")
                        }, e.prototype.getVideoEmbedCode = function() {
                            return this.get("videoEmbedCode")
                        }, e.prototype.getVideoId = function() {
                            return this.get("videoId")
                        }, e.prototype.getVideoTitle = function() {
                            return this.get("videoTitle")
                        }, e.prototype.getVideoWidth = function() {
                            return this.get("videoWidth")
                        }, e.prototype.getVideoHeight = function() {
                            return this.get("videoHeight")
                        }, e.prototype.getVideoUrl = function() {
                            return this.get("videoUrl")
                        }, e.prototype.getVolume = function() {
                            return this.get("volume")
                        }, e.prototype.setVolume = function(e) {
                            return this.set("volume", e)
                        }, e
                    }();
                return h(), E
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    2: [function(e, t, n) {
        ! function(i, r) {
            "function" == typeof define && define.amd ? define(["underscore", "backbone", "jquery"], r) : "undefined" != typeof n ? t.exports = r(e("underscore"), e("backbone"), e("backbone").$) : r(i._, i.Backbone, i.jQuery || i.Zepto || i.$)
        }(this, function(e, t, n) {
            var i = /^(\S+)\s*(.*)$/,
                r = e.isFunction(n) ? n("body")[0] : null;
            return t.Courier = {}, t.Courier.add = function(t) {
                function n(t) {
                    e.isFunction(t.$el.data) && !t.$el.data("view") && t.$el.data("view", t)
                }

                function o(t, n, r) {
                    var o = [];
                    for (var a in t) {
                        var s = a.match(i),
                            u = s[1],
                            l = s[2],
                            c = new RegExp("^" + u.replace("*", "[\\w]*") + "$");
                        c.test(n.name) && ("" !== l && r._getChildViewNamed(l) !== n.source || o.push({
                            eventName: u,
                            subviewName: l,
                            value: t[a]
                        }))
                    }
                    return o.length > 1 && (o = e.sortBy(o, function(e) {
                        var t = e.eventName.replace("*", ""),
                            n = "" !== e.subviewName,
                            i = (n ? 1e3 : 0) + t.length;
                        return -i
                    })), o.length ? o[0].value : null
                }
                var a = {
                    setElement: t.setElement
                };
                t.spawn = function(n, i) {
                    if (e.isString(n)) n = {
                        name: n,
                        data: i
                    };
                    else if (e.isUndefined(n.name)) throw new Error("Undefined message name.");
                    n.source = t, n.data = n.data || {}, this.trigger(n.name, n.data);
                    for (var r, a, s = "!" === n.name.charAt(n.name.length - 1), u = this._getParentView(); u;) {
                        if (e.isObject(u.onMessages) && (a = o(u.onMessages, n, u), null !== a)) {
                            var l = a;
                            if (e.isFunction(l) || (l = u[a]), !l) throw new Error('Method "' + a + '" does not exist');
                            var c = l.call(u, n.data, n.source, n.name);
                            if (s) return c
                        }
                        r = s;
                        var p = e.result(u, "passMessages");
                        if (e.isObject(p) && (a = o(p, n, u), null !== a)) {
                            if ("." === a);
                            else {
                                if (!e.isString(a)) throw new TypeError("Values of passMessages hash should be strings.");
                                n.name = a
                            }
                            r = !0
                        }
                        if (!r) break;
                        n.source = u, u = u._getParentView()
                    }
                    if (s) throw new Error('Round trip message "' + n.name + '" was not handled. All round trip messages must be handled.')
                }, e.isFunction(t._getParentView) || (t._getParentView = function() {
                    for (var t = null, n = this.$el.parent(); n.length > 0 && n[0] !== r;) {
                        var i = n.data("view");
                        if (i && e.isFunction(i.render)) {
                            t = i;
                            break
                        }
                        n = n.parent()
                    }
                    return t
                }), e.isFunction(t._getChildViewNamed) || (t._getChildViewNamed = function(t) {
                    return e.isObject(this.subviews) ? this.subviews[t] : null
                }), t.setElement = function(e, i) {
                    var r = a.setElement.call(this, e, i);
                    return n(t), r
                }, t.$el && n(t)
            }, t.Courier
        })
    }, {
        backbone: 3,
        underscore: 14
    }],
    3: [function(e, t, n) {
        (function(t) {
            ! function(i) {
                var r = "object" == typeof self && self.self === self && self || "object" == typeof t && t.global === t && t;
                if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(e, t, n) {
                    r.Backbone = i(r, n, e, t)
                });
                else if ("undefined" != typeof n) {
                    var o, a = e("underscore");
                    try {
                        o = e("jquery")
                    } catch (s) {}
                    i(r, n, a, o)
                } else r.Backbone = i(r, {}, r._, r.jQuery || r.Zepto || r.ender || r.$)
            }(function(e, t, n, i) {
                var r = e.Backbone,
                    o = Array.prototype.slice;
                t.VERSION = "1.3.3", t.$ = i, t.noConflict = function() {
                    return e.Backbone = r, this
                }, t.emulateHTTP = !1, t.emulateJSON = !1;
                var a = function(e, t, i) {
                        switch (e) {
                            case 1:
                                return function() {
                                    return n[t](this[i])
                                };
                            case 2:
                                return function(e) {
                                    return n[t](this[i], e)
                                };
                            case 3:
                                return function(e, r) {
                                    return n[t](this[i], u(e, this), r)
                                };
                            case 4:
                                return function(e, r, o) {
                                    return n[t](this[i], u(e, this), r, o)
                                };
                            default:
                                return function() {
                                    var e = o.call(arguments);
                                    return e.unshift(this[i]), n[t].apply(n, e)
                                }
                        }
                    },
                    s = function(e, t, i) {
                        n.each(t, function(t, r) {
                            n[r] && (e.prototype[r] = a(t, r, i))
                        })
                    },
                    u = function(e, t) {
                        return n.isFunction(e) ? e : n.isObject(e) && !t._isModel(e) ? l(e) : n.isString(e) ? function(t) {
                            return t.get(e)
                        } : e
                    },
                    l = function(e) {
                        var t = n.matches(e);
                        return function(e) {
                            return t(e.attributes)
                        }
                    },
                    c = t.Events = {},
                    p = /\s+/,
                    d = function(e, t, i, r, o) {
                        var a, s = 0;
                        if (i && "object" == typeof i) {
                            void 0 !== r && "context" in o && void 0 === o.context && (o.context = r);
                            for (a = n.keys(i); s < a.length; s++) t = d(e, t, a[s], i[a[s]], o)
                        } else if (i && p.test(i))
                            for (a = i.split(p); s < a.length; s++) t = e(t, a[s], r, o);
                        else t = e(t, i, r, o);
                        return t
                    };
                c.on = function(e, t, n) {
                    return f(this, e, t, n)
                };
                var f = function(e, t, n, i, r) {
                    if (e._events = d(h, e._events || {}, t, n, {
                            context: i,
                            ctx: e,
                            listening: r
                        }), r) {
                        var o = e._listeners || (e._listeners = {});
                        o[r.id] = r
                    }
                    return e
                };
                c.listenTo = function(e, t, i) {
                    if (!e) return this;
                    var r = e._listenId || (e._listenId = n.uniqueId("l")),
                        o = this._listeningTo || (this._listeningTo = {}),
                        a = o[r];
                    if (!a) {
                        var s = this._listenId || (this._listenId = n.uniqueId("l"));
                        a = o[r] = {
                            obj: e,
                            objId: r,
                            id: s,
                            listeningTo: o,
                            count: 0
                        }
                    }
                    return f(e, t, i, this, a), this
                };
                var h = function(e, t, n, i) {
                    if (n) {
                        var r = e[t] || (e[t] = []),
                            o = i.context,
                            a = i.ctx,
                            s = i.listening;
                        s && s.count++, r.push({
                            callback: n,
                            context: o,
                            ctx: o || a,
                            listening: s
                        })
                    }
                    return e
                };
                c.off = function(e, t, n) {
                    return this._events ? (this._events = d(v, this._events, e, t, {
                        context: n,
                        listeners: this._listeners
                    }), this) : this
                }, c.stopListening = function(e, t, i) {
                    var r = this._listeningTo;
                    if (!r) return this;
                    for (var o = e ? [e._listenId] : n.keys(r), a = 0; a < o.length; a++) {
                        var s = r[o[a]];
                        if (!s) break;
                        s.obj.off(t, i, this)
                    }
                    return this
                };
                var v = function(e, t, i, r) {
                    if (e) {
                        var o, a = 0,
                            s = r.context,
                            u = r.listeners;
                        if (t || i || s) {
                            for (var l = t ? [t] : n.keys(e); a < l.length; a++) {
                                t = l[a];
                                var c = e[t];
                                if (!c) break;
                                for (var p = [], d = 0; d < c.length; d++) {
                                    var f = c[d];
                                    i && i !== f.callback && i !== f.callback._callback || s && s !== f.context ? p.push(f) : (o = f.listening, o && 0 === --o.count && (delete u[o.id], delete o.listeningTo[o.objId]))
                                }
                                p.length ? e[t] = p : delete e[t]
                            }
                            return e
                        }
                        for (var h = n.keys(u); a < h.length; a++) o = u[h[a]], delete u[o.id], delete o.listeningTo[o.objId]
                    }
                };
                c.once = function(e, t, i) {
                    var r = d(g, {}, e, t, n.bind(this.off, this));
                    return "string" == typeof e && null == i && (t = void 0), this.on(r, t, i)
                }, c.listenToOnce = function(e, t, i) {
                    var r = d(g, {}, t, i, n.bind(this.stopListening, this, e));
                    return this.listenTo(e, r)
                };
                var g = function(e, t, i, r) {
                    if (i) {
                        var o = e[t] = n.once(function() {
                            r(t, o), i.apply(this, arguments)
                        });
                        o._callback = i
                    }
                    return e
                };
                c.trigger = function(e) {
                    if (!this._events) return this;
                    for (var t = Math.max(0, arguments.length - 1), n = Array(t), i = 0; i < t; i++) n[i] = arguments[i + 1];
                    return d(m, this._events, e, void 0, n), this
                };
                var m = function(e, t, n, i) {
                        if (e) {
                            var r = e[t],
                                o = e.all;
                            r && o && (o = o.slice()), r && y(r, i), o && y(o, [t].concat(i))
                        }
                        return e
                    },
                    y = function(e, t) {
                        var n, i = -1,
                            r = e.length,
                            o = t[0],
                            a = t[1],
                            s = t[2];
                        switch (t.length) {
                            case 0:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx);
                                return;
                            case 1:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o);
                                return;
                            case 2:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a);
                                return;
                            case 3:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a, s);
                                return;
                            default:
                                for (; ++i < r;)(n = e[i]).callback.apply(n.ctx, t);
                                return
                        }
                    };
                c.bind = c.on, c.unbind = c.off, n.extend(t, c);
                var b = t.Model = function(e, t) {
                    var i = e || {};
                    t || (t = {}), this.cid = n.uniqueId(this.cidPrefix), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (i = this.parse(i, t) || {});
                    var r = n.result(this, "defaults");
                    i = n.defaults(n.extend({}, r, i), r), this.set(i, t), this.changed = {}, this.initialize.apply(this, arguments)
                };
                n.extend(b.prototype, c, {
                    changed: null,
                    validationError: null,
                    idAttribute: "id",
                    cidPrefix: "c",
                    initialize: function() {},
                    toJSON: function(e) {
                        return n.clone(this.attributes)
                    },
                    sync: function() {
                        return t.sync.apply(this, arguments)
                    },
                    get: function(e) {
                        return this.attributes[e]
                    },
                    escape: function(e) {
                        return n.escape(this.get(e))
                    },
                    has: function(e) {
                        return null != this.get(e)
                    },
                    matches: function(e) {
                        return !!n.iteratee(e, this)(this.attributes)
                    },
                    set: function(e, t, i) {
                        if (null == e) return this;
                        var r;
                        if ("object" == typeof e ? (r = e, i = t) : (r = {})[e] = t, i || (i = {}), !this._validate(r, i)) return !1;
                        var o = i.unset,
                            a = i.silent,
                            s = [],
                            u = this._changing;
                        this._changing = !0, u || (this._previousAttributes = n.clone(this.attributes), this.changed = {});
                        var l = this.attributes,
                            c = this.changed,
                            p = this._previousAttributes;
                        for (var d in r) t = r[d], n.isEqual(l[d], t) || s.push(d), n.isEqual(p[d], t) ? delete c[d] : c[d] = t, o ? delete l[d] : l[d] = t;
                        if (this.idAttribute in r && (this.id = this.get(this.idAttribute)), !a) {
                            s.length && (this._pending = i);
                            for (var f = 0; f < s.length; f++) this.trigger("change:" + s[f], this, l[s[f]], i)
                        }
                        if (u) return this;
                        if (!a)
                            for (; this._pending;) i = this._pending, this._pending = !1, this.trigger("change", this, i);
                        return this._pending = !1, this._changing = !1, this
                    },
                    unset: function(e, t) {
                        return this.set(e, void 0, n.extend({}, t, {
                            unset: !0
                        }))
                    },
                    clear: function(e) {
                        var t = {};
                        for (var i in this.attributes) t[i] = void 0;
                        return this.set(t, n.extend({}, e, {
                            unset: !0
                        }))
                    },
                    hasChanged: function(e) {
                        return null == e ? !n.isEmpty(this.changed) : n.has(this.changed, e)
                    },
                    changedAttributes: function(e) {
                        if (!e) return !!this.hasChanged() && n.clone(this.changed);
                        var t = this._changing ? this._previousAttributes : this.attributes,
                            i = {};
                        for (var r in e) {
                            var o = e[r];
                            n.isEqual(t[r], o) || (i[r] = o)
                        }
                        return !!n.size(i) && i
                    },
                    previous: function(e) {
                        return null != e && this._previousAttributes ? this._previousAttributes[e] : null
                    },
                    previousAttributes: function() {
                        return n.clone(this._previousAttributes)
                    },
                    fetch: function(e) {
                        e = n.extend({
                            parse: !0
                        }, e);
                        var t = this,
                            i = e.success;
                        return e.success = function(n) {
                            var r = e.parse ? t.parse(n, e) : n;
                            return !!t.set(r, e) && (i && i.call(e.context, t, n, e), void t.trigger("sync", t, n, e))
                        }, H(this, e), this.sync("read", this, e)
                    },
                    save: function(e, t, i) {
                        var r;
                        null == e || "object" == typeof e ? (r = e, i = t) : (r = {})[e] = t, i = n.extend({
                            validate: !0,
                            parse: !0
                        }, i);
                        var o = i.wait;
                        if (r && !o) {
                            if (!this.set(r, i)) return !1
                        } else if (!this._validate(r, i)) return !1;
                        var a = this,
                            s = i.success,
                            u = this.attributes;
                        i.success = function(e) {
                            a.attributes = u;
                            var t = i.parse ? a.parse(e, i) : e;
                            return o && (t = n.extend({}, r, t)), !(t && !a.set(t, i)) && (s && s.call(i.context, a, e, i), void a.trigger("sync", a, e, i))
                        }, H(this, i), r && o && (this.attributes = n.extend({}, u, r));
                        var l = this.isNew() ? "create" : i.patch ? "patch" : "update";
                        "patch" !== l || i.attrs || (i.attrs = r);
                        var c = this.sync(l, this, i);
                        return this.attributes = u, c
                    },
                    destroy: function(e) {
                        e = e ? n.clone(e) : {};
                        var t = this,
                            i = e.success,
                            r = e.wait,
                            o = function() {
                                t.stopListening(), t.trigger("destroy", t, t.collection, e)
                            };
                        e.success = function(n) {
                            r && o(), i && i.call(e.context, t, n, e), t.isNew() || t.trigger("sync", t, n, e)
                        };
                        var a = !1;
                        return this.isNew() ? n.defer(e.success) : (H(this, e), a = this.sync("delete", this, e)), r || o(), a
                    },
                    url: function() {
                        var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || B();
                        if (this.isNew()) return e;
                        var t = this.get(this.idAttribute);
                        return e.replace(/[^\/]$/, "$&/") + encodeURIComponent(t)
                    },
                    parse: function(e, t) {
                        return e
                    },
                    clone: function() {
                        return new this.constructor(this.attributes)
                    },
                    isNew: function() {
                        return !this.has(this.idAttribute)
                    },
                    isValid: function(e) {
                        return this._validate({}, n.extend({}, e, {
                            validate: !0
                        }))
                    },
                    _validate: function(e, t) {
                        if (!t.validate || !this.validate) return !0;
                        e = n.extend({}, this.attributes, e);
                        var i = this.validationError = this.validate(e, t) || null;
                        return !i || (this.trigger("invalid", this, i, n.extend(t, {
                            validationError: i
                        })), !1)
                    }
                });
                var w = {
                    keys: 1,
                    values: 1,
                    pairs: 1,
                    invert: 1,
                    pick: 0,
                    omit: 0,
                    chain: 1,
                    isEmpty: 1
                };
                s(b, w, "attributes");
                var _ = t.Collection = function(e, t) {
                        t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
                            silent: !0
                        }, t))
                    },
                    x = {
                        add: !0,
                        remove: !0,
                        merge: !0
                    },
                    A = {
                        add: !0,
                        remove: !1
                    },
                    T = function(e, t, n) {
                        n = Math.min(Math.max(n, 0), e.length);
                        var i, r = Array(e.length - n),
                            o = t.length;
                        for (i = 0; i < r.length; i++) r[i] = e[i + n];
                        for (i = 0; i < o; i++) e[i + n] = t[i];
                        for (i = 0; i < r.length; i++) e[i + o + n] = r[i]
                    };
                n.extend(_.prototype, c, {
                    model: b,
                    initialize: function() {},
                    toJSON: function(e) {
                        return this.map(function(t) {
                            return t.toJSON(e)
                        })
                    },
                    sync: function() {
                        return t.sync.apply(this, arguments)
                    },
                    add: function(e, t) {
                        return this.set(e, n.extend({
                            merge: !1
                        }, t, A))
                    },
                    remove: function(e, t) {
                        t = n.extend({}, t);
                        var i = !n.isArray(e);
                        e = i ? [e] : e.slice();
                        var r = this._removeModels(e, t);
                        return !t.silent && r.length && (t.changes = {
                            added: [],
                            merged: [],
                            removed: r
                        }, this.trigger("update", this, t)), i ? r[0] : r
                    },
                    set: function(e, t) {
                        if (null != e) {
                            t = n.extend({}, x, t), t.parse && !this._isModel(e) && (e = this.parse(e, t) || []);
                            var i = !n.isArray(e);
                            e = i ? [e] : e.slice();
                            var r = t.at;
                            null != r && (r = +r), r > this.length && (r = this.length), r < 0 && (r += this.length + 1);
                            var o, a, s = [],
                                u = [],
                                l = [],
                                c = [],
                                p = {},
                                d = t.add,
                                f = t.merge,
                                h = t.remove,
                                v = !1,
                                g = this.comparator && null == r && t.sort !== !1,
                                m = n.isString(this.comparator) ? this.comparator : null;
                            for (a = 0; a < e.length; a++) {
                                o = e[a];
                                var y = this.get(o);
                                if (y) {
                                    if (f && o !== y) {
                                        var b = this._isModel(o) ? o.attributes : o;
                                        t.parse && (b = y.parse(b, t)), y.set(b, t), l.push(y), g && !v && (v = y.hasChanged(m))
                                    }
                                    p[y.cid] || (p[y.cid] = !0, s.push(y)), e[a] = y
                                } else d && (o = e[a] = this._prepareModel(o, t), o && (u.push(o), this._addReference(o, t), p[o.cid] = !0, s.push(o)))
                            }
                            if (h) {
                                for (a = 0; a < this.length; a++) o = this.models[a], p[o.cid] || c.push(o);
                                c.length && this._removeModels(c, t)
                            }
                            var w = !1,
                                _ = !g && d && h;
                            if (s.length && _ ? (w = this.length !== s.length || n.some(this.models, function(e, t) {
                                    return e !== s[t]
                                }), this.models.length = 0, T(this.models, s, 0), this.length = this.models.length) : u.length && (g && (v = !0), T(this.models, u, null == r ? this.length : r), this.length = this.models.length), v && this.sort({
                                    silent: !0
                                }), !t.silent) {
                                for (a = 0; a < u.length; a++) null != r && (t.index = r + a), o = u[a], o.trigger("add", o, this, t);
                                (v || w) && this.trigger("sort", this, t), (u.length || c.length || l.length) && (t.changes = {
                                    added: u,
                                    removed: c,
                                    merged: l
                                }, this.trigger("update", this, t))
                            }
                            return i ? e[0] : e
                        }
                    },
                    reset: function(e, t) {
                        t = t ? n.clone(t) : {};
                        for (var i = 0; i < this.models.length; i++) this._removeReference(this.models[i], t);
                        return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
                            silent: !0
                        }, t)), t.silent || this.trigger("reset", this, t), e
                    },
                    push: function(e, t) {
                        return this.add(e, n.extend({
                            at: this.length
                        }, t))
                    },
                    pop: function(e) {
                        var t = this.at(this.length - 1);
                        return this.remove(t, e)
                    },
                    unshift: function(e, t) {
                        return this.add(e, n.extend({
                            at: 0
                        }, t))
                    },
                    shift: function(e) {
                        var t = this.at(0);
                        return this.remove(t, e)
                    },
                    slice: function() {
                        return o.apply(this.models, arguments)
                    },
                    get: function(e) {
                        if (null != e) return this._byId[e] || this._byId[this.modelId(e.attributes || e)] || e.cid && this._byId[e.cid]
                    },
                    has: function(e) {
                        return null != this.get(e)
                    },
                    at: function(e) {
                        return e < 0 && (e += this.length), this.models[e]
                    },
                    where: function(e, t) {
                        return this[t ? "find" : "filter"](e)
                    },
                    findWhere: function(e) {
                        return this.where(e, !0)
                    },
                    sort: function(e) {
                        var t = this.comparator;
                        if (!t) throw new Error("Cannot sort a set without a comparator");
                        e || (e = {});
                        var i = t.length;
                        return n.isFunction(t) && (t = n.bind(t, this)), 1 === i || n.isString(t) ? this.models = this.sortBy(t) : this.models.sort(t), e.silent || this.trigger("sort", this, e), this
                    },
                    pluck: function(e) {
                        return this.map(e + "")
                    },
                    fetch: function(e) {
                        e = n.extend({
                            parse: !0
                        }, e);
                        var t = e.success,
                            i = this;
                        return e.success = function(n) {
                            var r = e.reset ? "reset" : "set";
                            i[r](n, e), t && t.call(e.context, i, n, e), i.trigger("sync", i, n, e)
                        }, H(this, e), this.sync("read", this, e)
                    },
                    create: function(e, t) {
                        t = t ? n.clone(t) : {};
                        var i = t.wait;
                        if (e = this._prepareModel(e, t), !e) return !1;
                        i || this.add(e, t);
                        var r = this,
                            o = t.success;
                        return t.success = function(e, t, n) {
                            i && r.add(e, n), o && o.call(n.context, e, t, n)
                        }, e.save(null, t), e
                    },
                    parse: function(e, t) {
                        return e
                    },
                    clone: function() {
                        return new this.constructor(this.models, {
                            model: this.model,
                            comparator: this.comparator
                        })
                    },
                    modelId: function(e) {
                        return e[this.model.prototype.idAttribute || "id"]
                    },
                    _reset: function() {
                        this.length = 0, this.models = [], this._byId = {}
                    },
                    _prepareModel: function(e, t) {
                        if (this._isModel(e)) return e.collection || (e.collection = this), e;
                        t = t ? n.clone(t) : {}, t.collection = this;
                        var i = new this.model(e, t);
                        return i.validationError ? (this.trigger("invalid", this, i.validationError, t), !1) : i
                    },
                    _removeModels: function(e, t) {
                        for (var n = [], i = 0; i < e.length; i++) {
                            var r = this.get(e[i]);
                            if (r) {
                                var o = this.indexOf(r);
                                this.models.splice(o, 1), this.length--, delete this._byId[r.cid];
                                var a = this.modelId(r.attributes);
                                null != a && delete this._byId[a], t.silent || (t.index = o, r.trigger("remove", r, this, t)), n.push(r), this._removeReference(r, t)
                            }
                        }
                        return n
                    },
                    _isModel: function(e) {
                        return e instanceof b
                    },
                    _addReference: function(e, t) {
                        this._byId[e.cid] = e;
                        var n = this.modelId(e.attributes);
                        null != n && (this._byId[n] = e), e.on("all", this._onModelEvent, this)
                    },
                    _removeReference: function(e, t) {
                        delete this._byId[e.cid];
                        var n = this.modelId(e.attributes);
                        null != n && delete this._byId[n], this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
                    },
                    _onModelEvent: function(e, t, n, i) {
                        if (t) {
                            if (("add" === e || "remove" === e) && n !== this) return;
                            if ("destroy" === e && this.remove(t, i), "change" === e) {
                                var r = this.modelId(t.previousAttributes()),
                                    o = this.modelId(t.attributes);
                                r !== o && (null != r && delete this._byId[r], null != o && (this._byId[o] = t))
                            }
                        }
                        this.trigger.apply(this, arguments)
                    }
                });
                var C = {
                    forEach: 3,
                    each: 3,
                    map: 3,
                    collect: 3,
                    reduce: 0,
                    foldl: 0,
                    inject: 0,
                    reduceRight: 0,
                    foldr: 0,
                    find: 3,
                    detect: 3,
                    filter: 3,
                    select: 3,
                    reject: 3,
                    every: 3,
                    all: 3,
                    some: 3,
                    any: 3,
                    include: 3,
                    includes: 3,
                    contains: 3,
                    invoke: 0,
                    max: 3,
                    min: 3,
                    toArray: 1,
                    size: 1,
                    first: 3,
                    head: 3,
                    take: 3,
                    initial: 3,
                    rest: 3,
                    tail: 3,
                    drop: 3,
                    last: 3,
                    without: 0,
                    difference: 0,
                    indexOf: 3,
                    shuffle: 1,
                    lastIndexOf: 3,
                    isEmpty: 1,
                    chain: 1,
                    sample: 3,
                    partition: 3,
                    groupBy: 3,
                    countBy: 3,
                    sortBy: 3,
                    indexBy: 3,
                    findIndex: 3,
                    findLastIndex: 3
                };
                s(_, C, "models");
                var S = t.View = function(e) {
                        this.cid = n.uniqueId("view"), n.extend(this, n.pick(e, E)), this._ensureElement(), this.initialize.apply(this, arguments)
                    },
                    k = /^(\S+)\s*(.*)$/,
                    E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
                n.extend(S.prototype, c, {
                    tagName: "div",
                    $: function(e) {
                        return this.$el.find(e)
                    },
                    initialize: function() {},
                    render: function() {
                        return this
                    },
                    remove: function() {
                        return this._removeElement(), this.stopListening(), this
                    },
                    _removeElement: function() {
                        this.$el.remove()
                    },
                    setElement: function(e) {
                        return this.undelegateEvents(), this._setElement(e), this.delegateEvents(), this
                    },
                    _setElement: function(e) {
                        this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0]
                    },
                    delegateEvents: function(e) {
                        if (e || (e = n.result(this, "events")), !e) return this;
                        this.undelegateEvents();
                        for (var t in e) {
                            var i = e[t];
                            if (n.isFunction(i) || (i = this[i]), i) {
                                var r = t.match(k);
                                this.delegate(r[1], r[2], n.bind(i, this))
                            }
                        }
                        return this
                    },
                    delegate: function(e, t, n) {
                        return this.$el.on(e + ".delegateEvents" + this.cid, t, n), this
                    },
                    undelegateEvents: function() {
                        return this.$el && this.$el.off(".delegateEvents" + this.cid), this
                    },
                    undelegate: function(e, t, n) {
                        return this.$el.off(e + ".delegateEvents" + this.cid, t, n), this
                    },
                    _createElement: function(e) {
                        return document.createElement(e)
                    },
                    _ensureElement: function() {
                        if (this.el) this.setElement(n.result(this, "el"));
                        else {
                            var e = n.extend({}, n.result(this, "attributes"));
                            this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className")), this.setElement(this._createElement(n.result(this, "tagName"))), this._setAttributes(e)
                        }
                    },
                    _setAttributes: function(e) {
                        this.$el.attr(e)
                    }
                }), t.sync = function(e, i, r) {
                    var o = I[e];
                    n.defaults(r || (r = {}), {
                        emulateHTTP: t.emulateHTTP,
                        emulateJSON: t.emulateJSON
                    });
                    var a = {
                        type: o,
                        dataType: "json"
                    };
                    if (r.url || (a.url = n.result(i, "url") || B()), null != r.data || !i || "create" !== e && "update" !== e && "patch" !== e || (a.contentType = "application/json", a.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
                            model: a.data
                        } : {}), r.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
                        a.type = "POST", r.emulateJSON && (a.data._method = o);
                        var s = r.beforeSend;
                        r.beforeSend = function(e) {
                            if (e.setRequestHeader("X-HTTP-Method-Override", o), s) return s.apply(this, arguments)
                        }
                    }
                    "GET" === a.type || r.emulateJSON || (a.processData = !1);
                    var u = r.error;
                    r.error = function(e, t, n) {
                        r.textStatus = t, r.errorThrown = n, u && u.call(r.context, e, t, n)
                    };
                    var l = r.xhr = t.ajax(n.extend(a, r));
                    return i.trigger("request", i, l, r), l
                };
                var I = {
                    create: "POST",
                    update: "PUT",
                    patch: "PATCH",
                    "delete": "DELETE",
                    read: "GET"
                };
                t.ajax = function() {
                    return t.$.ajax.apply(t.$, arguments)
                };
                var j = t.Router = function(e) {
                        e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                    },
                    N = /\((.*?)\)/g,
                    P = /(\(\?)?:\w+/g,
                    D = /\*\w+/g,
                    M = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                n.extend(j.prototype, c, {
                    initialize: function() {},
                    route: function(e, i, r) {
                        n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(i) && (r = i, i = ""), r || (r = this[i]);
                        var o = this;
                        return t.history.route(e, function(n) {
                            var a = o._extractParameters(e, n);
                            o.execute(r, a, i) !== !1 && (o.trigger.apply(o, ["route:" + i].concat(a)), o.trigger("route", i, a), t.history.trigger("route", o, i, a))
                        }), this
                    },
                    execute: function(e, t, n) {
                        e && e.apply(this, t)
                    },
                    navigate: function(e, n) {
                        return t.history.navigate(e, n), this
                    },
                    _bindRoutes: function() {
                        if (this.routes) {
                            this.routes = n.result(this, "routes");
                            for (var e, t = n.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
                        }
                    },
                    _routeToRegExp: function(e) {
                        return e = e.replace(M, "\\$&").replace(N, "(?:$1)?").replace(P, function(e, t) {
                            return t ? e : "([^/?]+)"
                        }).replace(D, "([^?]*?)"), new RegExp("^" + e + "(?:\\?([\\s\\S]*))?$")
                    },
                    _extractParameters: function(e, t) {
                        var i = e.exec(t).slice(1);
                        return n.map(i, function(e, t) {
                            return t === i.length - 1 ? e || null : e ? decodeURIComponent(e) : null
                        })
                    }
                });
                var R = t.History = function() {
                        this.handlers = [], this.checkUrl = n.bind(this.checkUrl, this), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                    },
                    O = /^[#\/]|\s+$/g,
                    q = /^\/+|\/+$/g,
                    F = /#.*$/;
                R.started = !1, n.extend(R.prototype, c, {
                    interval: 50,
                    atRoot: function() {
                        var e = this.location.pathname.replace(/[^\/]$/, "$&/");
                        return e === this.root && !this.getSearch()
                    },
                    matchRoot: function() {
                        var e = this.decodeFragment(this.location.pathname),
                            t = e.slice(0, this.root.length - 1) + "/";
                        return t === this.root
                    },
                    decodeFragment: function(e) {
                        return decodeURI(e.replace(/%25/g, "%2525"))
                    },
                    getSearch: function() {
                        var e = this.location.href.replace(/#.*/, "").match(/\?.+/);
                        return e ? e[0] : ""
                    },
                    getHash: function(e) {
                        var t = (e || this).location.href.match(/#(.*)$/);
                        return t ? t[1] : ""
                    },
                    getPath: function() {
                        var e = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                        return "/" === e.charAt(0) ? e.slice(1) : e
                    },
                    getFragment: function(e) {
                        return null == e && (e = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()), e.replace(O, "")
                    },
                    start: function(e) {
                        if (R.started) throw new Error("Backbone.history has already been started");
                        if (R.started = !0, this.options = n.extend({
                                root: "/"
                            }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._hasHashChange = "onhashchange" in window && (void 0 === document.documentMode || document.documentMode > 7), this._useHashChange = this._wantsHashChange && this._hasHashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = this.getFragment(), this.root = ("/" + this.root + "/").replace(q, "/"), this._wantsHashChange && this._wantsPushState) {
                            if (!this._hasPushState && !this.atRoot()) {
                                var t = this.root.slice(0, -1) || "/";
                                return this.location.replace(t + "#" + this.getPath()), !0
                            }
                            this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
                                replace: !0
                            })
                        }
                        if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                            this.iframe = document.createElement("iframe"), this.iframe.src = "javascript:0", this.iframe.style.display = "none", this.iframe.tabIndex = -1;
                            var i = document.body,
                                r = i.insertBefore(this.iframe, i.firstChild).contentWindow;
                            r.document.open(), r.document.close(), r.location.hash = "#" + this.fragment
                        }
                        var o = window.addEventListener || function(e, t) {
                            return attachEvent("on" + e, t)
                        };
                        if (this._usePushState ? o("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? o("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), !this.options.silent) return this.loadUrl()
                    },
                    stop: function() {
                        var e = window.removeEventListener || function(e, t) {
                            return detachEvent("on" + e, t)
                        };
                        this._usePushState ? e("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && e("hashchange", this.checkUrl, !1), this.iframe && (document.body.removeChild(this.iframe), this.iframe = null), this._checkUrlInterval && clearInterval(this._checkUrlInterval), R.started = !1
                    },
                    route: function(e, t) {
                        this.handlers.unshift({
                            route: e,
                            callback: t
                        })
                    },
                    checkUrl: function(e) {
                        var t = this.getFragment();
                        return t === this.fragment && this.iframe && (t = this.getHash(this.iframe.contentWindow)), t !== this.fragment && (this.iframe && this.navigate(t), void this.loadUrl())
                    },
                    loadUrl: function(e) {
                        return !!this.matchRoot() && (e = this.fragment = this.getFragment(e), n.some(this.handlers, function(t) {
                            if (t.route.test(e)) return t.callback(e), !0
                        }))
                    },
                    navigate: function(e, t) {
                        if (!R.started) return !1;
                        t && t !== !0 || (t = {
                            trigger: !!t
                        }), e = this.getFragment(e || "");
                        var n = this.root;
                        "" !== e && "?" !== e.charAt(0) || (n = n.slice(0, -1) || "/");
                        var i = n + e;
                        if (e = this.decodeFragment(e.replace(F, "")), this.fragment !== e) {
                            if (this.fragment = e, this._usePushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, i);
                            else {
                                if (!this._wantsHashChange) return this.location.assign(i);
                                if (this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getHash(this.iframe.contentWindow)) {
                                    var r = this.iframe.contentWindow;
                                    t.replace || (r.document.open(), r.document.close()), this._updateHash(r.location, e, t.replace)
                                }
                            }
                            return t.trigger ? this.loadUrl(e) : void 0
                        }
                    },
                    _updateHash: function(e, t, n) {
                        if (n) {
                            var i = e.href.replace(/(javascript:|#).*$/, "");
                            e.replace(i + "#" + t)
                        } else e.hash = "#" + t
                    }
                }), t.history = new R;
                var L = function(e, t) {
                    var i, r = this;
                    return i = e && n.has(e, "constructor") ? e.constructor : function() {
                        return r.apply(this, arguments)
                    }, n.extend(i, r, t), i.prototype = n.create(r.prototype, e), i.prototype.constructor = i, i.__super__ = r.prototype, i
                };
                b.extend = _.extend = j.extend = S.extend = R.extend = L;
                var B = function() {
                        throw new Error('A "url" property or function must be specified')
                    },
                    H = function(e, t) {
                        var n = t.error;
                        t.error = function(i) {
                            n && n.call(t.context, e, i, t), e.trigger("error", e, i, t)
                        }
                    };
                return t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        jquery: 11,
        underscore: 14
    }],
    4: [function(e, t, n) {
        "use strict";

        function i(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
        }

        function r(e) {
            return 3 * e.length / 4 - i(e)
        }

        function o(e) {
            var t, n, r, o, a, s, u = e.length;
            a = i(e), s = new p(3 * u / 4 - a), r = a > 0 ? u - 4 : u;
            var l = 0;
            for (t = 0, n = 0; t < r; t += 4, n += 3) o = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)], s[l++] = o >> 16 & 255, s[l++] = o >> 8 & 255, s[l++] = 255 & o;
            return 2 === a ? (o = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4, s[l++] = 255 & o) : 1 === a && (o = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2, s[l++] = o >> 8 & 255, s[l++] = 255 & o), s
        }

        function a(e) {
            return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
        }

        function s(e, t, n) {
            for (var i, r = [], o = t; o < n; o += 3) i = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2], r.push(a(i));
            return r.join("")
        }

        function u(e) {
            for (var t, n = e.length, i = n % 3, r = "", o = [], a = 16383, u = 0, c = n - i; u < c; u += a) o.push(s(e, u, u + a > c ? c : u + a));
            return 1 === i ? (t = e[n - 1], r += l[t >> 2], r += l[t << 4 & 63], r += "==") : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], r += l[t >> 10], r += l[t >> 4 & 63], r += l[t << 2 & 63], r += "="), o.push(r), o.join("")
        }
        n.byteLength = r, n.toByteArray = o, n.fromByteArray = u;
        for (var l = [], c = [], p = "undefined" != typeof Uint8Array ? Uint8Array : Array, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, h = d.length; f < h; ++f) l[f] = d[f], c[d.charCodeAt(f)] = f;
        c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63
    }, {}],
    5: [function(e, t, n) {}, {}],
    6: [function(e, t, n) {
        (function(t) {
            "use strict";

            function i() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }

            function r() {
                return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function o(e, t) {
                if (r() < t) throw new RangeError("Invalid typed array length");
                return a.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = a.prototype) : (null === e && (e = new a(t)), e.length = t), e
            }

            function a(e, t, n) {
                if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a)) return new a(e, t, n);
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return c(this, e)
                }
                return s(this, e, t, n)
            }

            function s(e, t, n, i) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? f(e, t, n, i) : "string" == typeof t ? p(e, t, n) : h(e, t)
            }

            function u(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative')
            }

            function l(e, t, n, i) {
                return u(t), t <= 0 ? o(e, t) : void 0 !== n ? "string" == typeof i ? o(e, t).fill(n, i) : o(e, t).fill(n) : o(e, t)
            }

            function c(e, t) {
                if (u(t), e = o(e, t < 0 ? 0 : 0 | v(t)), !a.TYPED_ARRAY_SUPPORT)
                    for (var n = 0; n < t; ++n) e[n] = 0;
                return e
            }

            function p(e, t, n) {
                if ("string" == typeof n && "" !== n || (n = "utf8"), !a.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var i = 0 | m(t, n);
                e = o(e, i);
                var r = e.write(t, n);
                return r !== i && (e = e.slice(0, r)), e
            }

            function d(e, t) {
                var n = t.length < 0 ? 0 : 0 | v(t.length);
                e = o(e, n);
                for (var i = 0; i < n; i += 1) e[i] = 255 & t[i];
                return e
            }

            function f(e, t, n, i) {
                if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
                return t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, n) : new Uint8Array(t, n, i), a.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = a.prototype) : e = d(e, t), e
            }

            function h(e, t) {
                if (a.isBuffer(t)) {
                    var n = 0 | v(t.length);
                    return e = o(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || J(t.length) ? o(e, 0) : d(e, t);
                    if ("Buffer" === t.type && Z(t.data)) return d(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function v(e) {
                if (e >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                return 0 | e
            }

            function g(e) {
                return +e != e && (e = 0), a.alloc(+e)
            }

            function m(e, t) {
                if (a.isBuffer(e)) return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var n = e.length;
                if (0 === n) return 0;
                for (var i = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return n;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return z(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * n;
                    case "hex":
                        return n >>> 1;
                    case "base64":
                        return G(e).length;
                    default:
                        if (i) return z(e).length;
                        t = ("" + t).toLowerCase(), i = !0
                }
            }

            function y(e, t, n) {
                var i = !1;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if (n >>>= 0, t >>>= 0, n <= t) return "";
                for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                        return D(this, t, n);
                    case "utf8":
                    case "utf-8":
                        return I(this, t, n);
                    case "ascii":
                        return N(this, t, n);
                    case "latin1":
                    case "binary":
                        return P(this, t, n);
                    case "base64":
                        return E(this, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return M(this, t, n);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), i = !0
                }
            }

            function b(e, t, n) {
                var i = e[t];
                e[t] = e[n], e[n] = i
            }

            function w(e, t, n, i, r) {
                if (0 === e.length) return -1;
                if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = r ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                    if (r) return -1;
                    n = e.length - 1
                } else if (n < 0) {
                    if (!r) return -1;
                    n = 0
                }
                if ("string" == typeof t && (t = a.from(t, i)), a.isBuffer(t)) return 0 === t.length ? -1 : _(e, t, n, i, r);
                if ("number" == typeof t) return t = 255 & t, a.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : _(e, [t], n, i, r);
                throw new TypeError("val must be string, number or Buffer")
            }

            function _(e, t, n, i, r) {
                function o(e, t) {
                    return 1 === a ? e[t] : e.readUInt16BE(t * a)
                }
                var a = 1,
                    s = e.length,
                    u = t.length;
                if (void 0 !== i && (i = String(i).toLowerCase(), "ucs2" === i || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    a = 2, s /= 2, u /= 2, n /= 2
                }
                var l;
                if (r) {
                    var c = -1;
                    for (l = n; l < s; l++)
                        if (o(e, l) === o(t, c === -1 ? 0 : l - c)) {
                            if (c === -1 && (c = l), l - c + 1 === u) return c * a
                        } else c !== -1 && (l -= l - c), c = -1
                } else
                    for (n + u > s && (n = s - u), l = n; l >= 0; l--) {
                        for (var p = !0, d = 0; d < u; d++)
                            if (o(e, l + d) !== o(t, d)) {
                                p = !1;
                                break
                            }
                        if (p) return l
                    }
                return -1
            }

            function x(e, t, n, i) {
                n = Number(n) || 0;
                var r = e.length - n;
                i ? (i = Number(i), i > r && (i = r)) : i = r;
                var o = t.length;
                if (o % 2 !== 0) throw new TypeError("Invalid hex string");
                i > o / 2 && (i = o / 2);
                for (var a = 0; a < i; ++a) {
                    var s = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(s)) return a;
                    e[n + a] = s
                }
                return a
            }

            function A(e, t, n, i) {
                return K(z(t, e.length - n), e, n, i)
            }

            function T(e, t, n, i) {
                return K(W(t), e, n, i)
            }

            function C(e, t, n, i) {
                return T(e, t, n, i)
            }

            function S(e, t, n, i) {
                return K(G(t), e, n, i)
            }

            function k(e, t, n, i) {
                return K(Y(t, e.length - n), e, n, i)
            }

            function E(e, t, n) {
                return 0 === t && n === e.length ? X.fromByteArray(e) : X.fromByteArray(e.slice(t, n))
            }

            function I(e, t, n) {
                n = Math.min(e.length, n);
                for (var i = [], r = t; r < n;) {
                    var o = e[r],
                        a = null,
                        s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                    if (r + s <= n) {
                        var u, l, c, p;
                        switch (s) {
                            case 1:
                                o < 128 && (a = o);
                                break;
                            case 2:
                                u = e[r + 1], 128 === (192 & u) && (p = (31 & o) << 6 | 63 & u, p > 127 && (a = p));
                                break;
                            case 3:
                                u = e[r + 1], l = e[r + 2], 128 === (192 & u) && 128 === (192 & l) && (p = (15 & o) << 12 | (63 & u) << 6 | 63 & l, p > 2047 && (p < 55296 || p > 57343) && (a = p));
                                break;
                            case 4:
                                u = e[r + 1], l = e[r + 2], c = e[r + 3], 128 === (192 & u) && 128 === (192 & l) && 128 === (192 & c) && (p = (15 & o) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & c, p > 65535 && p < 1114112 && (a = p))
                        }
                    }
                    null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, i.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), i.push(a), r += s
                }
                return j(i)
            }

            function j(e) {
                var t = e.length;
                if (t <= ee) return String.fromCharCode.apply(String, e);
                for (var n = "", i = 0; i < t;) n += String.fromCharCode.apply(String, e.slice(i, i += ee));
                return n
            }

            function N(e, t, n) {
                var i = "";
                n = Math.min(e.length, n);
                for (var r = t; r < n; ++r) i += String.fromCharCode(127 & e[r]);
                return i
            }

            function P(e, t, n) {
                var i = "";
                n = Math.min(e.length, n);
                for (var r = t; r < n; ++r) i += String.fromCharCode(e[r]);
                return i
            }

            function D(e, t, n) {
                var i = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > i) && (n = i);
                for (var r = "", o = t; o < n; ++o) r += V(e[o]);
                return r
            }

            function M(e, t, n) {
                for (var i = e.slice(t, n), r = "", o = 0; o < i.length; o += 2) r += String.fromCharCode(i[o] + 256 * i[o + 1]);
                return r
            }

            function R(e, t, n) {
                if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function O(e, t, n, i, r, o) {
                if (!a.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > r || t < o) throw new RangeError('"value" argument is out of bounds');
                if (n + i > e.length) throw new RangeError("Index out of range")
            }

            function q(e, t, n, i) {
                t < 0 && (t = 65535 + t + 1);
                for (var r = 0, o = Math.min(e.length - n, 2); r < o; ++r) e[n + r] = (t & 255 << 8 * (i ? r : 1 - r)) >>> 8 * (i ? r : 1 - r)
            }

            function F(e, t, n, i) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var r = 0, o = Math.min(e.length - n, 4); r < o; ++r) e[n + r] = t >>> 8 * (i ? r : 3 - r) & 255
            }

            function L(e, t, n, i, r, o) {
                if (n + i > e.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function B(e, t, n, i, r) {
                return r || L(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), Q.write(e, t, n, i, 23, 4), n + 4
            }

            function H(e, t, n, i, r) {
                return r || L(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), Q.write(e, t, n, i, 52, 8), n + 8
            }

            function $(e) {
                if (e = U(e).replace(te, ""), e.length < 2) return "";
                for (; e.length % 4 !== 0;) e += "=";
                return e
            }

            function U(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function V(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function z(e, t) {
                t = t || 1 / 0;
                for (var n, i = e.length, r = null, o = [], a = 0; a < i; ++a) {
                    if (n = e.charCodeAt(a), n > 55295 && n < 57344) {
                        if (!r) {
                            if (n > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === i) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            r = n;
                            continue
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && o.push(239, 191, 189), r = n;
                            continue
                        }
                        n = (r - 55296 << 10 | n - 56320) + 65536
                    } else r && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (r = null, n < 128) {
                        if ((t -= 1) < 0) break;
                        o.push(n)
                    } else if (n < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return o
            }

            function W(e) {
                for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                return t
            }

            function Y(e, t) {
                for (var n, i, r, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) n = e.charCodeAt(a), i = n >> 8, r = n % 256, o.push(r), o.push(i);
                return o
            }

            function G(e) {
                return X.toByteArray($(e))
            }

            function K(e, t, n, i) {
                for (var r = 0; r < i && !(r + n >= t.length || r >= e.length); ++r) t[r + n] = e[r];
                return r
            }

            function J(e) {
                return e !== e
            }
            var X = e("base64-js"),
                Q = e("ieee754"),
                Z = e("isarray");
            n.Buffer = a, n.SlowBuffer = g, n.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), n.kMaxLength = r(), a.poolSize = 8192, a._augment = function(e) {
                return e.__proto__ = a.prototype, e
            }, a.from = function(e, t, n) {
                return s(null, e, t, n)
            }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
                value: null,
                configurable: !0
            })), a.alloc = function(e, t, n) {
                return l(null, e, t, n)
            }, a.allocUnsafe = function(e) {
                return c(null, e)
            }, a.allocUnsafeSlow = function(e) {
                return c(null, e)
            }, a.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }, a.compare = function(e, t) {
                if (!a.isBuffer(e) || !a.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var n = e.length, i = t.length, r = 0, o = Math.min(n, i); r < o; ++r)
                    if (e[r] !== t[r]) {
                        n = e[r], i = t[r];
                        break
                    }
                return n < i ? -1 : i < n ? 1 : 0
            }, a.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, a.concat = function(e, t) {
                if (!Z(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return a.alloc(0);
                var n;
                if (void 0 === t)
                    for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                var i = a.allocUnsafe(t),
                    r = 0;
                for (n = 0; n < e.length; ++n) {
                    var o = e[n];
                    if (!a.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(i, r), r += o.length
                }
                return i
            }, a.byteLength = m, a.prototype._isBuffer = !0, a.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) b(this, t, t + 1);
                return this
            }, a.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) b(this, t, t + 3), b(this, t + 1, t + 2);
                return this
            }, a.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) b(this, t, t + 7), b(this, t + 1, t + 6), b(this, t + 2, t + 5), b(this, t + 3, t + 4);
                return this
            }, a.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? I(this, 0, e) : y.apply(this, arguments)
            }, a.prototype.equals = function(e) {
                if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === a.compare(this, e)
            }, a.prototype.inspect = function() {
                var e = "",
                    t = n.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, a.prototype.compare = function(e, t, n, i, r) {
                if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === i && (i = 0), void 0 === r && (r = this.length), t < 0 || n > e.length || i < 0 || r > this.length) throw new RangeError("out of range index");
                if (i >= r && t >= n) return 0;
                if (i >= r) return -1;
                if (t >= n) return 1;
                if (t >>>= 0, n >>>= 0, i >>>= 0, r >>>= 0, this === e) return 0;
                for (var o = r - i, s = n - t, u = Math.min(o, s), l = this.slice(i, r), c = e.slice(t, n), p = 0; p < u; ++p)
                    if (l[p] !== c[p]) {
                        o = l[p], s = c[p];
                        break
                    }
                return o < s ? -1 : s < o ? 1 : 0
            }, a.prototype.includes = function(e, t, n) {
                return this.indexOf(e, t, n) !== -1
            }, a.prototype.indexOf = function(e, t, n) {
                return w(this, e, t, n, !0)
            }, a.prototype.lastIndexOf = function(e, t, n) {
                return w(this, e, t, n, !1)
            }, a.prototype.write = function(e, t, n, i) {
                if (void 0 === t) i = "utf8", n = this.length, t = 0;
                else if (void 0 === n && "string" == typeof t) i = t, n = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t = 0 | t, isFinite(n) ? (n = 0 | n, void 0 === i && (i = "utf8")) : (i = n, n = void 0)
                }
                var r = this.length - t;
                if ((void 0 === n || n > r) && (n = r), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                i || (i = "utf8");
                for (var o = !1;;) switch (i) {
                    case "hex":
                        return x(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                        return A(this, e, t, n);
                    case "ascii":
                        return T(this, e, t, n);
                    case "latin1":
                    case "binary":
                        return C(this, e, t, n);
                    case "base64":
                        return S(this, e, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return k(this, e, t, n);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(), o = !0
                }
            }, a.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var ee = 4096;
            a.prototype.slice = function(e, t) {
                var n = this.length;
                e = ~~e, t = void 0 === t ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
                var i;
                if (a.TYPED_ARRAY_SUPPORT) i = this.subarray(e, t), i.__proto__ = a.prototype;
                else {
                    var r = t - e;
                    i = new a(r, (void 0));
                    for (var o = 0; o < r; ++o) i[o] = this[o + e]
                }
                return i
            }, a.prototype.readUIntLE = function(e, t, n) {
                e = 0 | e, t = 0 | t, n || R(e, t, this.length);
                for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256);) i += this[e + o] * r;
                return i
            }, a.prototype.readUIntBE = function(e, t, n) {
                e = 0 | e, t = 0 | t, n || R(e, t, this.length);
                for (var i = this[e + --t], r = 1; t > 0 && (r *= 256);) i += this[e + --t] * r;
                return i
            }, a.prototype.readUInt8 = function(e, t) {
                return t || R(e, 1, this.length), this[e]
            }, a.prototype.readUInt16LE = function(e, t) {
                return t || R(e, 2, this.length), this[e] | this[e + 1] << 8
            }, a.prototype.readUInt16BE = function(e, t) {
                return t || R(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, a.prototype.readUInt32LE = function(e, t) {
                return t || R(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, a.prototype.readUInt32BE = function(e, t) {
                return t || R(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, a.prototype.readIntLE = function(e, t, n) {
                e = 0 | e, t = 0 | t, n || R(e, t, this.length);
                for (var i = this[e], r = 1, o = 0; ++o < t && (r *= 256);) i += this[e + o] * r;
                return r *= 128, i >= r && (i -= Math.pow(2, 8 * t)), i
            }, a.prototype.readIntBE = function(e, t, n) {
                e = 0 | e, t = 0 | t, n || R(e, t, this.length);
                for (var i = t, r = 1, o = this[e + --i]; i > 0 && (r *= 256);) o += this[e + --i] * r;
                return r *= 128, o >= r && (o -= Math.pow(2, 8 * t)), o
            }, a.prototype.readInt8 = function(e, t) {
                return t || R(e, 1, this.length), 128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
            }, a.prototype.readInt16LE = function(e, t) {
                t || R(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, a.prototype.readInt16BE = function(e, t) {
                t || R(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, a.prototype.readInt32LE = function(e, t) {
                return t || R(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, a.prototype.readInt32BE = function(e, t) {
                return t || R(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, a.prototype.readFloatLE = function(e, t) {
                return t || R(e, 4, this.length), Q.read(this, e, !0, 23, 4)
            }, a.prototype.readFloatBE = function(e, t) {
                return t || R(e, 4, this.length), Q.read(this, e, !1, 23, 4)
            }, a.prototype.readDoubleLE = function(e, t) {
                return t || R(e, 8, this.length), Q.read(this, e, !0, 52, 8)
            }, a.prototype.readDoubleBE = function(e, t) {
                return t || R(e, 8, this.length), Q.read(this, e, !1, 52, 8)
            }, a.prototype.writeUIntLE = function(e, t, n, i) {
                if (e = +e, t = 0 | t, n = 0 | n, !i) {
                    var r = Math.pow(2, 8 * n) - 1;
                    O(this, e, t, n, r, 0)
                }
                var o = 1,
                    a = 0;
                for (this[t] = 255 & e; ++a < n && (o *= 256);) this[t + a] = e / o & 255;
                return t + n
            }, a.prototype.writeUIntBE = function(e, t, n, i) {
                if (e = +e, t = 0 | t, n = 0 | n, !i) {
                    var r = Math.pow(2, 8 * n) - 1;
                    O(this, e, t, n, r, 0)
                }
                var o = n - 1,
                    a = 1;
                for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) this[t + o] = e / a & 255;
                return t + n
            }, a.prototype.writeUInt8 = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
            }, a.prototype.writeUInt16LE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : q(this, e, t, !0), t + 2
            }, a.prototype.writeUInt16BE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : q(this, e, t, !1), t + 2
            }, a.prototype.writeUInt32LE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : F(this, e, t, !0), t + 4
            }, a.prototype.writeUInt32BE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : F(this, e, t, !1), t + 4
            }, a.prototype.writeIntLE = function(e, t, n, i) {
                if (e = +e, t = 0 | t, !i) {
                    var r = Math.pow(2, 8 * n - 1);
                    O(this, e, t, n, r - 1, -r)
                }
                var o = 0,
                    a = 1,
                    s = 0;
                for (this[t] = 255 & e; ++o < n && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                return t + n
            }, a.prototype.writeIntBE = function(e, t, n, i) {
                if (e = +e, t = 0 | t, !i) {
                    var r = Math.pow(2, 8 * n - 1);
                    O(this, e, t, n, r - 1, -r)
                }
                var o = n - 1,
                    a = 1,
                    s = 0;
                for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                return t + n
            }, a.prototype.writeInt8 = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, a.prototype.writeInt16LE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : q(this, e, t, !0), t + 2
            }, a.prototype.writeInt16BE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : q(this, e, t, !1), t + 2
            }, a.prototype.writeInt32LE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : F(this, e, t, !0), t + 4
            }, a.prototype.writeInt32BE = function(e, t, n) {
                return e = +e, t = 0 | t, n || O(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : F(this, e, t, !1), t + 4
            }, a.prototype.writeFloatLE = function(e, t, n) {
                return B(this, e, t, !0, n)
            }, a.prototype.writeFloatBE = function(e, t, n) {
                return B(this, e, t, !1, n)
            }, a.prototype.writeDoubleLE = function(e, t, n) {
                return H(this, e, t, !0, n)
            }, a.prototype.writeDoubleBE = function(e, t, n) {
                return H(this, e, t, !1, n)
            }, a.prototype.copy = function(e, t, n, i) {
                if (n || (n = 0), i || 0 === i || (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
                var r, o = i - n;
                if (this === e && n < t && t < i)
                    for (r = o - 1; r >= 0; --r) e[r + t] = this[r + n];
                else if (o < 1e3 || !a.TYPED_ARRAY_SUPPORT)
                    for (r = 0; r < o; ++r) e[r + t] = this[r + n];
                else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
                return o
            }, a.prototype.fill = function(e, t, n, i) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (i = t, t = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), 1 === e.length) {
                        var r = e.charCodeAt(0);
                        r < 256 && (e = r)
                    }
                    if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                    if ("string" == typeof i && !a.isEncoding(i)) throw new TypeError("Unknown encoding: " + i)
                } else "number" == typeof e && (e = 255 & e);
                if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
                if (n <= t) return this;
                t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0);
                var o;
                if ("number" == typeof e)
                    for (o = t; o < n; ++o) this[o] = e;
                else {
                    var s = a.isBuffer(e) ? e : z(new a(e, i).toString()),
                        u = s.length;
                    for (o = 0; o < n - t; ++o) this[o + t] = s[o % u]
                }
                return this
            };
            var te = /[^+\/0-9A-Za-z-_]/g
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "base64-js": 4,
        ieee754: 7,
        isarray: 8
    }],
    7: [function(e, t, n) {
        n.read = function(e, t, n, i, r) {
            var o, a, s = 8 * r - i - 1,
                u = (1 << s) - 1,
                l = u >> 1,
                c = -7,
                p = n ? r - 1 : 0,
                d = n ? -1 : 1,
                f = e[t + p];
            for (p += d, o = f & (1 << -c) - 1, f >>= -c, c += s; c > 0; o = 256 * o + e[t + p], p += d, c -= 8);
            for (a = o & (1 << -c) - 1, o >>= -c, c += i; c > 0; a = 256 * a + e[t + p], p += d, c -= 8);
            if (0 === o) o = 1 - l;
            else {
                if (o === u) return a ? NaN : (f ? -1 : 1) * (1 / 0);
                a += Math.pow(2, i), o -= l
            }
            return (f ? -1 : 1) * a * Math.pow(2, o - i)
        }, n.write = function(e, t, n, i, r, o) {
            var a, s, u, l = 8 * o - r - 1,
                c = (1 << l) - 1,
                p = c >> 1,
                d = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                f = i ? 0 : o - 1,
                h = i ? 1 : -1,
                v = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = c) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), t += a + p >= 1 ? d / u : d * Math.pow(2, 1 - p), t * u >= 2 && (a++, u /= 2), a + p >= c ? (s = 0, a = c) : a + p >= 1 ? (s = (t * u - 1) * Math.pow(2, r), a += p) : (s = t * Math.pow(2, p - 1) * Math.pow(2, r), a = 0)); r >= 8; e[n + f] = 255 & s, f += h, s /= 256, r -= 8);
            for (a = a << r | s, l += r; l > 0; e[n + f] = 255 & a, f += h, a /= 256, l -= 8);
            e[n + f - h] |= 128 * v
        }
    }, {}],
    8: [function(e, t, n) {
        var i = {}.toString;
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == i.call(e)
        }
    }, {}],
    9: [function(e, t, n) {
        ! function(e) {
            "use strict";

            function t(e) {
                return (e || "").toLowerCase()
            }
            var n = "2.1.6";
            e.fn.cycle = function(n) {
                var i;
                return 0 !== this.length || e.isReady ? this.each(function() {
                    var i, r, o, a, s = e(this),
                        u = e.fn.cycle.log;
                    if (!s.data("cycle.opts")) {
                        (s.data("cycle-log") === !1 || n && n.log === !1 || r && r.log === !1) && (u = e.noop), u("--c2 init--"), i = s.data();
                        for (var l in i) i.hasOwnProperty(l) && /^cycle[A-Z]+/.test(l) && (a = i[l], o = l.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), u(o + ":", a, "(" + typeof a + ")"), i[o] = a);
                        r = e.extend({}, e.fn.cycle.defaults, i, n || {}), r.timeoutId = 0, r.paused = r.paused || !1, r.container = s, r._maxZ = r.maxZ, r.API = e.extend({
                                _container: s
                            }, e.fn.cycle.API), r.API.log = u, r.API.trigger = function(e, t) {
                                return r.container.trigger(e, t), r.API
                            }, s.data("cycle.opts", r), s.data("cycle.API", r.API),
                            r.API.trigger("cycle-bootstrap", [r, r.API]), r.API.addInitialSlides(), r.API.preInitSlideshow(), r.slides.length && r.API.initSlideshow()
                    }
                }) : (i = {
                    s: this.selector,
                    c: this.context
                }, e.fn.cycle.log("requeuing slideshow (dom not ready)"), e(function() {
                    e(i.s, i.c).cycle(n)
                }), this)
            }, e.fn.cycle.API = {
                opts: function() {
                    return this._container.data("cycle.opts")
                },
                addInitialSlides: function() {
                    var t = this.opts(),
                        n = t.slides;
                    t.slideCount = 0, t.slides = e(), n = n.jquery ? n : t.container.find(n), t.random && n.sort(function() {
                        return Math.random() - .5
                    }), t.API.add(n)
                },
                preInitSlideshow: function() {
                    var t = this.opts();
                    t.API.trigger("cycle-pre-initialize", [t]);
                    var n = e.fn.cycle.transitions[t.fx];
                    n && e.isFunction(n.preInit) && n.preInit(t), t._preInitialized = !0
                },
                postInitSlideshow: function() {
                    var t = this.opts();
                    t.API.trigger("cycle-post-initialize", [t]);
                    var n = e.fn.cycle.transitions[t.fx];
                    n && e.isFunction(n.postInit) && n.postInit(t)
                },
                initSlideshow: function() {
                    var t, n = this.opts(),
                        i = n.container;
                    n.API.calcFirstSlide(), "static" == n.container.css("position") && n.container.css("position", "relative"), e(n.slides[n.currSlide]).css({
                        opacity: 1,
                        display: "block",
                        visibility: "visible"
                    }), n.API.stackSlides(n.slides[n.currSlide], n.slides[n.nextSlide], !n.reverse), n.pauseOnHover && (n.pauseOnHover !== !0 && (i = e(n.pauseOnHover)), i.hover(function() {
                        n.API.pause(!0)
                    }, function() {
                        n.API.resume(!0)
                    })), n.timeout && (t = n.API.getSlideOpts(n.currSlide), n.API.queueTransition(t, t.timeout + n.delay)), n._initialized = !0, n.API.updateView(!0), n.API.trigger("cycle-initialized", [n]), n.API.postInitSlideshow()
                },
                pause: function(t) {
                    var n = this.opts(),
                        i = n.API.getSlideOpts(),
                        r = n.hoverPaused || n.paused;
                    t ? n.hoverPaused = !0 : n.paused = !0, r || (n.container.addClass("cycle-paused"), n.API.trigger("cycle-paused", [n]).log("cycle-paused"), i.timeout && (clearTimeout(n.timeoutId), n.timeoutId = 0, n._remainingTimeout -= e.now() - n._lastQueue, (n._remainingTimeout < 0 || isNaN(n._remainingTimeout)) && (n._remainingTimeout = void 0)))
                },
                resume: function(e) {
                    var t = this.opts(),
                        n = !t.hoverPaused && !t.paused;
                    e ? t.hoverPaused = !1 : t.paused = !1, n || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"))
                },
                add: function(t, n) {
                    var i, r = this.opts(),
                        o = r.slideCount,
                        a = !1;
                    "string" == e.type(t) && (t = e.trim(t)), e(t).each(function() {
                        var t, i = e(this);
                        n ? r.container.prepend(i) : r.container.append(i), r.slideCount++, t = r.API.buildSlideOpts(i), r.slides = n ? e(i).add(r.slides) : r.slides.add(i), r.API.initSlide(t, i, --r._maxZ), i.data("cycle.opts", t), r.API.trigger("cycle-slide-added", [r, t, i])
                    }), r.API.updateView(!0), a = r._preInitialized && 2 > o && r.slideCount >= 1, a && (r._initialized ? r.timeout && (i = r.slides.length, r.nextSlide = r.reverse ? i - 1 : 1, r.timeoutId || r.API.queueTransition(r)) : r.API.initSlideshow())
                },
                calcFirstSlide: function() {
                    var e, t = this.opts();
                    e = parseInt(t.startingSlide || 0, 10), (e >= t.slides.length || 0 > e) && (e = 0), t.currSlide = e, t.reverse ? (t.nextSlide = e - 1, t.nextSlide < 0 && (t.nextSlide = t.slides.length - 1)) : (t.nextSlide = e + 1, t.nextSlide == t.slides.length && (t.nextSlide = 0))
                },
                calcNextSlide: function() {
                    var e, t = this.opts();
                    t.reverse ? (e = t.nextSlide - 1 < 0, t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1, t.currSlide = e ? 0 : t.nextSlide + 1) : (e = t.nextSlide + 1 == t.slides.length, t.nextSlide = e ? 0 : t.nextSlide + 1, t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1)
                },
                calcTx: function(t, n) {
                    var i, r = t;
                    return r._tempFx ? i = e.fn.cycle.transitions[r._tempFx] : n && r.manualFx && (i = e.fn.cycle.transitions[r.manualFx]), i || (i = e.fn.cycle.transitions[r.fx]), r._tempFx = null, this.opts()._tempFx = null, i || (i = e.fn.cycle.transitions.fade, r.API.log('Transition "' + r.fx + '" not found.  Using fade.')), i
                },
                prepareTx: function(e, t) {
                    var n, i, r, o, a, s = this.opts();
                    return s.slideCount < 2 ? void(s.timeoutId = 0) : (!e || s.busy && !s.manualTrump || (s.API.stopTransition(), s.busy = !1, clearTimeout(s.timeoutId), s.timeoutId = 0), void(s.busy || (0 !== s.timeoutId || e) && (i = s.slides[s.currSlide], r = s.slides[s.nextSlide], o = s.API.getSlideOpts(s.nextSlide), a = s.API.calcTx(o, e), s._tx = a, e && void 0 !== o.manualSpeed && (o.speed = o.manualSpeed), s.nextSlide != s.currSlide && (e || !s.paused && !s.hoverPaused && s.timeout) ? (s.API.trigger("cycle-before", [o, i, r, t]), a.before && a.before(o, i, r, t), n = function() {
                        s.busy = !1, s.container.data("cycle.opts") && (a.after && a.after(o, i, r, t), s.API.trigger("cycle-after", [o, i, r, t]), s.API.queueTransition(o), s.API.updateView(!0))
                    }, s.busy = !0, a.transition ? a.transition(o, i, r, t, n) : s.API.doTransition(o, i, r, t, n), s.API.calcNextSlide(), s.API.updateView()) : s.API.queueTransition(o))))
                },
                doTransition: function(t, n, i, r, o) {
                    var a = t,
                        s = e(n),
                        u = e(i),
                        l = function() {
                            u.animate(a.animIn || {
                                opacity: 1
                            }, a.speed, a.easeIn || a.easing, o)
                        };
                    u.css(a.cssBefore || {}), s.animate(a.animOut || {}, a.speed, a.easeOut || a.easing, function() {
                        s.css(a.cssAfter || {}), a.sync || l()
                    }), a.sync && l()
                },
                queueTransition: function(t, n) {
                    var i = this.opts(),
                        r = void 0 !== n ? n : t.timeout;
                    return 0 === i.nextSlide && 0 === --i.loop ? (i.API.log("terminating; loop=0"), i.timeout = 0, r ? setTimeout(function() {
                        i.API.trigger("cycle-finished", [i])
                    }, r) : i.API.trigger("cycle-finished", [i]), void(i.nextSlide = i.currSlide)) : void 0 !== i.continueAuto && (i.continueAuto === !1 || e.isFunction(i.continueAuto) && i.continueAuto() === !1) ? (i.API.log("terminating automatic transitions"), i.timeout = 0, void(i.timeoutId && clearTimeout(i.timeoutId))) : void(r && (i._lastQueue = e.now(), void 0 === n && (i._remainingTimeout = t.timeout), i.paused || i.hoverPaused || (i.timeoutId = setTimeout(function() {
                        i.API.prepareTx(!1, !i.reverse)
                    }, r))))
                },
                stopTransition: function() {
                    var e = this.opts();
                    e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e)
                },
                advanceSlide: function(e) {
                    var t = this.opts();
                    return clearTimeout(t.timeoutId), t.timeoutId = 0, t.nextSlide = t.currSlide + e, t.nextSlide < 0 ? t.nextSlide = t.slides.length - 1 : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, e >= 0), !1
                },
                buildSlideOpts: function(n) {
                    var i, r, o = this.opts(),
                        a = n.data() || {};
                    for (var s in a) a.hasOwnProperty(s) && /^cycle[A-Z]+/.test(s) && (i = a[s], r = s.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), o.API.log("[" + (o.slideCount - 1) + "]", r + ":", i, "(" + typeof i + ")"), a[r] = i);
                    a = e.extend({}, e.fn.cycle.defaults, o, a), a.slideNum = o.slideCount;
                    try {
                        delete a.API, delete a.slideCount, delete a.currSlide, delete a.nextSlide, delete a.slides
                    } catch (u) {}
                    return a
                },
                getSlideOpts: function(t) {
                    var n = this.opts();
                    void 0 === t && (t = n.currSlide);
                    var i = n.slides[t],
                        r = e(i).data("cycle.opts");
                    return e.extend({}, n, r)
                },
                initSlide: function(t, n, i) {
                    var r = this.opts();
                    n.css(t.slideCss || {}), i > 0 && n.css("zIndex", i), isNaN(t.speed) && (t.speed = e.fx.speeds[t.speed] || e.fx.speeds._default), t.sync || (t.speed = t.speed / 2), n.addClass(r.slideClass)
                },
                updateView: function(e, t) {
                    var n = this.opts();
                    if (n._initialized) {
                        var i = n.API.getSlideOpts(),
                            r = n.slides[n.currSlide];
                        !e && t !== !0 && (n.API.trigger("cycle-update-view-before", [n, i, r]), n.updateView < 0) || (n.slideActiveClass && n.slides.removeClass(n.slideActiveClass).eq(n.currSlide).addClass(n.slideActiveClass), e && n.hideNonActive && n.slides.filter(":not(." + n.slideActiveClass + ")").css("visibility", "hidden"), 0 === n.updateView && setTimeout(function() {
                            n.API.trigger("cycle-update-view", [n, i, r, e])
                        }, i.speed / (n.sync ? 2 : 1)), 0 !== n.updateView && n.API.trigger("cycle-update-view", [n, i, r, e]), e && n.API.trigger("cycle-update-view-after", [n, i, r]))
                    }
                },
                getComponent: function(t) {
                    var n = this.opts(),
                        i = n[t];
                    return "string" == typeof i ? /^\s*[\>|\+|~]/.test(i) ? n.container.find(i) : e(i) : i.jquery ? i : e(i)
                },
                stackSlides: function(t, n, i) {
                    var r = this.opts();
                    t || (t = r.slides[r.currSlide], n = r.slides[r.nextSlide], i = !r.reverse), e(t).css("zIndex", r.maxZ);
                    var o, a = r.maxZ - 2,
                        s = r.slideCount;
                    if (i) {
                        for (o = r.currSlide + 1; s > o; o++) e(r.slides[o]).css("zIndex", a--);
                        for (o = 0; o < r.currSlide; o++) e(r.slides[o]).css("zIndex", a--)
                    } else {
                        for (o = r.currSlide - 1; o >= 0; o--) e(r.slides[o]).css("zIndex", a--);
                        for (o = s - 1; o > r.currSlide; o--) e(r.slides[o]).css("zIndex", a--)
                    }
                    e(n).css("zIndex", r.maxZ - 1)
                },
                getSlideIndex: function(e) {
                    return this.opts().slides.index(e)
                }
            }, e.fn.cycle.log = function() {
                window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
            }, e.fn.cycle.version = function() {
                return "Cycle2: " + n
            }, e.fn.cycle.transitions = {
                custom: {},
                none: {
                    before: function(e, t, n, i) {
                        e.API.stackSlides(n, t, i), e.cssBefore = {
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }
                    }
                },
                fade: {
                    before: function(t, n, i, r) {
                        var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                        t.API.stackSlides(n, i, r), t.cssBefore = e.extend(o, {
                            opacity: 0,
                            visibility: "visible",
                            display: "block"
                        }), t.animIn = {
                            opacity: 1
                        }, t.animOut = {
                            opacity: 0
                        }
                    }
                },
                fadeout: {
                    before: function(t, n, i, r) {
                        var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                        t.API.stackSlides(n, i, r), t.cssBefore = e.extend(o, {
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }), t.animOut = {
                            opacity: 0
                        }
                    }
                },
                scrollHorz: {
                    before: function(e, t, n, i) {
                        e.API.stackSlides(t, n, i);
                        var r = e.container.css("overflow", "hidden").width();
                        e.cssBefore = {
                            left: i ? r : -r,
                            top: 0,
                            opacity: 1,
                            visibility: "visible",
                            display: "block"
                        }, e.cssAfter = {
                            zIndex: e._maxZ - 2,
                            left: 0
                        }, e.animIn = {
                            left: 0
                        }, e.animOut = {
                            left: i ? -r : r
                        }
                    }
                }
            }, e.fn.cycle.defaults = {
                allowWrap: !0,
                autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
                delay: 0,
                easing: null,
                fx: "fade",
                hideNonActive: !0,
                loop: 0,
                manualFx: void 0,
                manualSpeed: void 0,
                manualTrump: !0,
                maxZ: 100,
                pauseOnHover: !1,
                reverse: !1,
                slideActiveClass: "cycle-slide-active",
                slideClass: "cycle-slide",
                slideCss: {
                    position: "absolute",
                    top: 0,
                    left: 0
                },
                slides: "> img",
                speed: 500,
                startingSlide: 0,
                sync: !0,
                timeout: 4e3,
                updateView: 0
            }, e(document).ready(function() {
                e(e.fn.cycle.defaults.autoSelector).cycle()
            })
        }(jQuery),
        function(e) {
            "use strict";

            function t(t, i) {
                var r, o, a, s = i.autoHeight;
                if ("container" == s) o = e(i.slides[i.currSlide]).outerHeight(), i.container.height(o);
                else if (i._autoHeightRatio) i.container.height(i.container.width() / i._autoHeightRatio);
                else if ("calc" === s || "number" == e.type(s) && s >= 0) {
                    if (a = "calc" === s ? n(t, i) : s >= i.slides.length ? 0 : s, a == i._sentinelIndex) return;
                    i._sentinelIndex = a, i._sentinel && i._sentinel.remove(), r = e(i.slides[a].cloneNode(!0)), r.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), r.css({
                        position: "static",
                        visibility: "hidden",
                        display: "block"
                    }).prependTo(i.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), r.find("*").css("visibility", "hidden"), i._sentinel = r
                }
            }

            function n(t, n) {
                var i = 0,
                    r = -1;
                return n.slides.each(function(t) {
                    var n = e(this).height();
                    n > r && (r = n, i = t)
                }), i
            }

            function i(t, n, i, r) {
                var o = e(r).outerHeight();
                n.container.animate({
                    height: o
                }, n.autoHeightSpeed, n.autoHeightEasing)
            }

            function r(n, o) {
                o._autoHeightOnResize && (e(window).off("resize orientationchange", o._autoHeightOnResize), o._autoHeightOnResize = null), o.container.off("cycle-slide-added cycle-slide-removed", t), o.container.off("cycle-destroyed", r), o.container.off("cycle-before", i), o._sentinel && (o._sentinel.remove(), o._sentinel = null)
            }
            e.extend(e.fn.cycle.defaults, {
                autoHeight: 0,
                autoHeightSpeed: 250,
                autoHeightEasing: null
            }), e(document).on("cycle-initialized", function(n, o) {
                function a() {
                    t(n, o)
                }
                var s, u = o.autoHeight,
                    l = e.type(u),
                    c = null;
                ("string" === l || "number" === l) && (o.container.on("cycle-slide-added cycle-slide-removed", t), o.container.on("cycle-destroyed", r), "container" == u ? o.container.on("cycle-before", i) : "string" === l && /\d+\:\d+/.test(u) && (s = u.match(/(\d+)\:(\d+)/), s = s[1] / s[2], o._autoHeightRatio = s), "number" !== l && (o._autoHeightOnResize = function() {
                    clearTimeout(c), c = setTimeout(a, 50)
                }, e(window).on("resize orientationchange", o._autoHeightOnResize)), setTimeout(a, 30))
            })
        }(jQuery),
        function(e) {
            "use strict";
            e.extend(e.fn.cycle.defaults, {
                caption: "> .cycle-caption",
                captionTemplate: "{{slideNum}} / {{slideCount}}",
                overlay: "> .cycle-overlay",
                overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
                captionModule: "caption"
            }), e(document).on("cycle-update-view", function(t, n, i, r) {
                "caption" === n.captionModule && e.each(["caption", "overlay"], function() {
                    var e = this,
                        t = i[e + "Template"],
                        o = n.API.getComponent(e);
                    o.length && t ? (o.html(n.API.tmpl(t, i, n, r)), o.show()) : o.hide()
                })
            }), e(document).on("cycle-destroyed", function(t, n) {
                var i;
                e.each(["caption", "overlay"], function() {
                    var e = this,
                        t = n[e + "Template"];
                    n[e] && t && (i = n.API.getComponent("caption"), i.empty())
                })
            })
        }(jQuery),
        function(e) {
            "use strict";
            var t = e.fn.cycle;
            e.fn.cycle = function(n) {
                var i, r, o, a = e.makeArray(arguments);
                return "number" == e.type(n) ? this.cycle("goto", n) : "string" == e.type(n) ? this.each(function() {
                    var s;
                    return i = n, o = e(this).data("cycle.opts"), void 0 === o ? void t.log('slideshow must be initialized before sending commands; "' + i + '" ignored') : (i = "goto" == i ? "jump" : i, r = o.API[i], e.isFunction(r) ? (s = e.makeArray(a), s.shift(), r.apply(o.API, s)) : void t.log("unknown command: ", i))
                }) : t.apply(this, arguments)
            }, e.extend(e.fn.cycle, t), e.extend(t.API, {
                next: function() {
                    var e = this.opts();
                    if (!e.busy || e.manualTrump) {
                        var t = e.reverse ? -1 : 1;
                        e.allowWrap === !1 && e.currSlide + t >= e.slideCount || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
                    }
                },
                prev: function() {
                    var e = this.opts();
                    if (!e.busy || e.manualTrump) {
                        var t = e.reverse ? 1 : -1;
                        e.allowWrap === !1 && e.currSlide + t < 0 || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"))
                    }
                },
                destroy: function() {
                    this.stop();
                    var t = this.opts(),
                        n = e.isFunction(e._data) ? e._data : e.noop;
                    clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stop(), t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"), t.container.removeData(), n(t.container[0], "parsedAttrs", !1), t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.removeAttr("style"), t.slides.removeClass(t.slideActiveClass)), t.slides.each(function() {
                        var i = e(this);
                        i.removeData(), i.removeClass(t.slideClass), n(this, "parsedAttrs", !1)
                    })
                },
                jump: function(e, t) {
                    var n, i = this.opts();
                    if (!i.busy || i.manualTrump) {
                        var r = parseInt(e, 10);
                        if (isNaN(r) || 0 > r || r >= i.slides.length) return void i.API.log("goto: invalid slide index: " + r);
                        if (r == i.currSlide) return void i.API.log("goto: skipping, already on slide", r);
                        i.nextSlide = r, clearTimeout(i.timeoutId), i.timeoutId = 0, i.API.log("goto: ", r, " (zero-index)"), n = i.currSlide < i.nextSlide, i._tempFx = t, i.API.prepareTx(!0, n)
                    }
                },
                stop: function() {
                    var t = this.opts(),
                        n = t.container;
                    clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stopTransition(), t.pauseOnHover && (t.pauseOnHover !== !0 && (n = e(t.pauseOnHover)), n.off("mouseenter mouseleave")), t.API.trigger("cycle-stopped", [t]).log("cycle-stopped")
                },
                reinit: function() {
                    var e = this.opts();
                    e.API.destroy(), e.container.cycle()
                },
                remove: function(t) {
                    for (var n, i, r = this.opts(), o = [], a = 1, s = 0; s < r.slides.length; s++) n = r.slides[s], s == t ? i = n : (o.push(n), e(n).data("cycle.opts").slideNum = a, a++);
                    i && (r.slides = e(o), r.slideCount--, e(i).remove(), t == r.currSlide ? r.API.advanceSlide(1) : t < r.currSlide ? r.currSlide-- : r.currSlide++, r.API.trigger("cycle-slide-removed", [r, t, i]).log("cycle-slide-removed"), r.API.updateView())
                }
            }), e(document).on("click.cycle", "[data-cycle-cmd]", function(t) {
                t.preventDefault();
                var n = e(this),
                    i = n.data("cycle-cmd"),
                    r = n.data("cycle-context") || ".cycle-slideshow";
                e(r).cycle(i, n.data("cycle-arg"))
            })
        }(jQuery),
        function(e) {
            "use strict";

            function t(t, n) {
                var i;
                return t._hashFence ? void(t._hashFence = !1) : (i = window.location.hash.substring(1), void t.slides.each(function(r) {
                    if (e(this).data("cycle-hash") == i) {
                        if (n === !0) t.startingSlide = r;
                        else {
                            var o = t.currSlide < r;
                            t.nextSlide = r, t.API.prepareTx(!0, o)
                        }
                        return !1
                    }
                }))
            }
            e(document).on("cycle-pre-initialize", function(n, i) {
                t(i, !0), i._onHashChange = function() {
                    t(i, !1)
                }, e(window).on("hashchange", i._onHashChange)
            }), e(document).on("cycle-update-view", function(e, t, n) {
                n.hash && "#" + n.hash != window.location.hash && (t._hashFence = !0, window.location.hash = n.hash)
            }), e(document).on("cycle-destroyed", function(t, n) {
                n._onHashChange && e(window).off("hashchange", n._onHashChange)
            })
        }(jQuery),
        function(e) {
            "use strict";
            e.extend(e.fn.cycle.defaults, {
                loader: !1
            }), e(document).on("cycle-bootstrap", function(t, n) {
                function i(t, i) {
                    function o(t) {
                        var o;
                        "wait" == n.loader ? (s.push(t), 0 === l && (s.sort(a), r.apply(n.API, [s, i]), n.container.removeClass("cycle-loading"))) : (o = e(n.slides[n.currSlide]), r.apply(n.API, [t, i]), o.show(), n.container.removeClass("cycle-loading"))
                    }

                    function a(e, t) {
                        return e.data("index") - t.data("index")
                    }
                    var s = [];
                    if ("string" == e.type(t)) t = e.trim(t);
                    else if ("array" === e.type(t))
                        for (var u = 0; u < t.length; u++) t[u] = e(t[u])[0];
                    t = e(t);
                    var l = t.length;
                    l && (t.css("visibility", "hidden").appendTo("body").each(function(t) {
                        function a() {
                            0 === --u && (--l, o(c))
                        }
                        var u = 0,
                            c = e(this),
                            p = c.is("img") ? c : c.find("img");
                        return c.data("index", t), p = p.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'), p.length ? (u = p.length, void p.each(function() {
                            this.complete ? a() : e(this).load(function() {
                                a()
                            }).on("error", function() {
                                0 === --u && (n.API.log("slide skipped; img not loaded:", this.src), 0 === --l && "wait" == n.loader && r.apply(n.API, [s, i]))
                            })
                        })) : (--l, void s.push(c))
                    }), l && n.container.addClass("cycle-loading"))
                }
                var r;
                n.loader && (r = n.API.add, n.API.add = i)
            })
        }(jQuery),
        function(e) {
            "use strict";

            function t(t, n, i) {
                var r, o = t.API.getComponent("pager");
                o.each(function() {
                    var o = e(this);
                    if (n.pagerTemplate) {
                        var a = t.API.tmpl(n.pagerTemplate, n, t, i[0]);
                        r = e(a).appendTo(o)
                    } else r = o.children().eq(t.slideCount - 1);
                    r.on(t.pagerEvent, function(e) {
                        t.pagerEventBubble || e.preventDefault(), t.API.page(o, e.currentTarget)
                    })
                })
            }

            function n(e, t) {
                var n = this.opts();
                if (!n.busy || n.manualTrump) {
                    var i = e.children().index(t),
                        r = i,
                        o = n.currSlide < r;
                    n.currSlide != r && (n.nextSlide = r, n._tempFx = n.pagerFx, n.API.prepareTx(!0, o), n.API.trigger("cycle-pager-activated", [n, e, t]))
                }
            }
            e.extend(e.fn.cycle.defaults, {
                pager: "> .cycle-pager",
                pagerActiveClass: "cycle-pager-active",
                pagerEvent: "click.cycle",
                pagerEventBubble: void 0,
                pagerTemplate: "<span>&bull;</span>"
            }), e(document).on("cycle-bootstrap", function(e, n, i) {
                i.buildPagerLink = t
            }), e(document).on("cycle-slide-added", function(e, t, i, r) {
                t.pager && (t.API.buildPagerLink(t, i, r), t.API.page = n)
            }), e(document).on("cycle-slide-removed", function(t, n, i) {
                if (n.pager) {
                    var r = n.API.getComponent("pager");
                    r.each(function() {
                        var t = e(this);
                        e(t.children()[i]).remove()
                    })
                }
            }), e(document).on("cycle-update-view", function(t, n) {
                var i;
                n.pager && (i = n.API.getComponent("pager"), i.each(function() {
                    e(this).children().removeClass(n.pagerActiveClass).eq(n.currSlide).addClass(n.pagerActiveClass)
                }))
            }), e(document).on("cycle-destroyed", function(e, t) {
                var n = t.API.getComponent("pager");
                n && (n.children().off(t.pagerEvent), t.pagerTemplate && n.empty())
            })
        }(jQuery),
        function(e) {
            "use strict";
            e.extend(e.fn.cycle.defaults, {
                next: "> .cycle-next",
                nextEvent: "click.cycle",
                disabledClass: "disabled",
                prev: "> .cycle-prev",
                prevEvent: "click.cycle",
                swipe: !1
            }), e(document).on("cycle-initialized", function(e, t) {
                if (t.API.getComponent("next").on(t.nextEvent, function(e) {
                        e.preventDefault(), t.API.next()
                    }), t.API.getComponent("prev").on(t.prevEvent, function(e) {
                        e.preventDefault(), t.API.prev()
                    }), t.swipe) {
                    var n = t.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                        i = t.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
                    t.container.on(n, function() {
                        t._tempFx = t.swipeFx, t.API.next()
                    }), t.container.on(i, function() {
                        t._tempFx = t.swipeFx, t.API.prev()
                    })
                }
            }), e(document).on("cycle-update-view", function(e, t) {
                if (!t.allowWrap) {
                    var n = t.disabledClass,
                        i = t.API.getComponent("next"),
                        r = t.API.getComponent("prev"),
                        o = t._prevBoundry || 0,
                        a = void 0 !== t._nextBoundry ? t._nextBoundry : t.slideCount - 1;
                    t.currSlide == a ? i.addClass(n).prop("disabled", !0) : i.removeClass(n).prop("disabled", !1), t.currSlide === o ? r.addClass(n).prop("disabled", !0) : r.removeClass(n).prop("disabled", !1)
                }
            }), e(document).on("cycle-destroyed", function(e, t) {
                t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
            })
        }(jQuery),
        function(e) {
            "use strict";
            e.extend(e.fn.cycle.defaults, {
                progressive: !1
            }), e(document).on("cycle-pre-initialize", function(t, n) {
                if (n.progressive) {
                    var i, r, o = n.API,
                        a = o.next,
                        s = o.prev,
                        u = o.prepareTx,
                        l = e.type(n.progressive);
                    if ("array" == l) i = n.progressive;
                    else if (e.isFunction(n.progressive)) i = n.progressive(n);
                    else if ("string" == l) {
                        if (r = e(n.progressive), i = e.trim(r.html()), !i) return;
                        if (/^(\[)/.test(i)) try {
                            i = e.parseJSON(i)
                        } catch (c) {
                            return void o.log("error parsing progressive slides", c)
                        } else i = i.split(new RegExp(r.data("cycle-split") || "\n")), i[i.length - 1] || i.pop()
                    }
                    u && (o.prepareTx = function(e, t) {
                        var r, o;
                        return e || 0 === i.length ? void u.apply(n.API, [e, t]) : void(t && n.currSlide == n.slideCount - 1 ? (o = i[0], i = i.slice(1), n.container.one("cycle-slide-added", function(e, t) {
                            setTimeout(function() {
                                t.API.advanceSlide(1)
                            }, 50)
                        }), n.API.add(o)) : t || 0 !== n.currSlide ? u.apply(n.API, [e, t]) : (r = i.length - 1, o = i[r], i = i.slice(0, r), n.container.one("cycle-slide-added", function(e, t) {
                            setTimeout(function() {
                                t.currSlide = 1, t.API.advanceSlide(-1)
                            }, 50)
                        }), n.API.add(o, !0)))
                    }), a && (o.next = function() {
                        var e = this.opts();
                        if (i.length && e.currSlide == e.slideCount - 1) {
                            var t = i[0];
                            i = i.slice(1), e.container.one("cycle-slide-added", function(e, t) {
                                a.apply(t.API), t.container.removeClass("cycle-loading")
                            }), e.container.addClass("cycle-loading"), e.API.add(t)
                        } else a.apply(e.API)
                    }), s && (o.prev = function() {
                        var e = this.opts();
                        if (i.length && 0 === e.currSlide) {
                            var t = i.length - 1,
                                n = i[t];
                            i = i.slice(0, t), e.container.one("cycle-slide-added", function(e, t) {
                                t.currSlide = 1, t.API.advanceSlide(-1), t.container.removeClass("cycle-loading")
                            }), e.container.addClass("cycle-loading"), e.API.add(n, !0)
                        } else s.apply(e.API)
                    })
                }
            })
        }(jQuery),
        function(e) {
            "use strict";
            e.extend(e.fn.cycle.defaults, {
                tmplRegex: "{{((.)?.*?)}}"
            }), e.extend(e.fn.cycle.API, {
                tmpl: function(t, n) {
                    var i = new RegExp(n.tmplRegex || e.fn.cycle.defaults.tmplRegex, "g"),
                        r = e.makeArray(arguments);
                    return r.shift(), t.replace(i, function(t, n) {
                        var i, o, a, s, u = n.split(".");
                        for (i = 0; i < r.length; i++)
                            if (a = r[i]) {
                                if (u.length > 1)
                                    for (s = a, o = 0; o < u.length; o++) a = s, s = s[u[o]] || n;
                                else s = a[n];
                                if (e.isFunction(s)) return s.apply(a, r);
                                if (void 0 !== s && null !== s && s != n) return s
                            }
                        return n
                    })
                }
            })
        }(jQuery)
    }, {}],
    10: [function(e, t, n) {
        ! function(e) {
            e.session = {
                _id: null,
                _cookieCache: void 0,
                _init: function() {
                    window.name || (window.name = Math.random()), this._id = window.name, this._initCache();
                    var e = new RegExp(this._generatePrefix() + "=([^;]+);").exec(document.cookie);
                    if (e && document.location.protocol !== e[1]) {
                        this._clearSession();
                        for (var t in this._cookieCache) try {
                            window.sessionStorage.setItem(t, this._cookieCache[t])
                        } catch (n) {}
                    }
                    document.cookie = this._generatePrefix() + "=" + document.location.protocol + ";path=/;expires=" + new Date((new Date).getTime() + 12e4).toUTCString()
                },
                _generatePrefix: function() {
                    return "__session:" + this._id + ":"
                },
                _initCache: function() {
                    var e = document.cookie.split(";");
                    this._cookieCache = {};
                    for (var t in e) {
                        var n = e[t].split("=");
                        new RegExp(this._generatePrefix() + ".+").test(n[0]) && n[1] && (this._cookieCache[n[0].split(":", 3)[2]] = n[1])
                    }
                },
                _setFallback: function(e, t, n) {
                    var i = this._generatePrefix() + e + "=" + t + "; path=/";
                    return n && (i += "; expires=" + new Date(Date.now() + 12e4).toUTCString()), document.cookie = i, this._cookieCache[e] = t, this
                },
                _getFallback: function(e) {
                    return this._cookieCache || this._initCache(), this._cookieCache[e]
                },
                _clearFallback: function() {
                    for (var e in this._cookieCache) document.cookie = this._generatePrefix() + e + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    this._cookieCache = {}
                },
                _deleteFallback: function(e) {
                    document.cookie = this._generatePrefix() + e + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;", delete this._cookieCache[e]
                },
                get: function(e) {
                    return window.sessionStorage.getItem(e) || this._getFallback(e)
                },
                set: function(e, t, n) {
                    try {
                        window.sessionStorage.setItem(e, t)
                    } catch (i) {}
                    return this._setFallback(e, t, n || !1), this
                },
                "delete": function(e) {
                    return this.remove(e)
                },
                remove: function(e) {
                    try {
                        window.sessionStorage.removeItem(e)
                    } catch (t) {}
                    return this._deleteFallback(e), this
                },
                _clearSession: function() {
                    try {
                        window.sessionStorage.clear()
                    } catch (e) {
                        for (var t in window.sessionStorage) window.sessionStorage.removeItem(t)
                    }
                },
                clear: function() {
                    return this._clearSession(), this._clearFallback(), this
                }
            }, e.session._init()
        }(jQuery)
    }, {}],
    11: [function(e, t, n) {
        ! function(e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return n(e)
            } : n(e)
        }("undefined" != typeof window ? window : this, function(e, t) {
            function n(e) {
                var t = !!e && "length" in e && e.length,
                    n = oe.type(e);
                return "function" !== n && !oe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
            }

            function i(e, t, n) {
                if (oe.isFunction(t)) return oe.grep(e, function(e, i) {
                    return !!t.call(e, i, e) !== n
                });
                if (t.nodeType) return oe.grep(e, function(e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (ve.test(t)) return oe.filter(t, e, n);
                    t = oe.filter(t, e)
                }
                return oe.grep(e, function(e) {
                    return Z.call(t, e) > -1 !== n
                })
            }

            function r(e, t) {
                for (;
                    (e = e[t]) && 1 !== e.nodeType;);
                return e
            }

            function o(e) {
                var t = {};
                return oe.each(e.match(_e) || [], function(e, n) {
                    t[n] = !0
                }), t
            }

            function a() {
                K.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a), oe.ready()
            }

            function s() {
                this.expando = oe.expando + s.uid++
            }

            function u(e, t, n) {
                var i;
                if (void 0 === n && 1 === e.nodeType)
                    if (i = "data-" + t.replace(Ee, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                        try {
                            n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : ke.test(n) ? oe.parseJSON(n) : n)
                        } catch (r) {}
                        Se.set(e, t, n)
                    } else n = void 0;
                return n
            }

            function l(e, t, n, i) {
                var r, o = 1,
                    a = 20,
                    s = i ? function() {
                        return i.cur()
                    } : function() {
                        return oe.css(e, t, "")
                    },
                    u = s(),
                    l = n && n[3] || (oe.cssNumber[t] ? "" : "px"),
                    c = (oe.cssNumber[t] || "px" !== l && +u) && je.exec(oe.css(e, t));
                if (c && c[3] !== l) {
                    l = l || c[3], n = n || [], c = +u || 1;
                    do o = o || ".5", c /= o, oe.style(e, t, c + l); while (o !== (o = s() / u) && 1 !== o && --a)
                }
                return n && (c = +c || +u || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = l, i.start = c, i.end = r)), r
            }

            function c(e, t) {
                var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
                return void 0 === t || t && oe.nodeName(e, t) ? oe.merge([e], n) : n
            }

            function p(e, t) {
                for (var n = 0, i = e.length; n < i; n++) Ce.set(e[n], "globalEval", !t || Ce.get(t[n], "globalEval"))
            }

            function d(e, t, n, i, r) {
                for (var o, a, s, u, l, d, f = t.createDocumentFragment(), h = [], v = 0, g = e.length; v < g; v++)
                    if (o = e[v], o || 0 === o)
                        if ("object" === oe.type(o)) oe.merge(h, o.nodeType ? [o] : o);
                        else if (qe.test(o)) {
                    for (a = a || f.appendChild(t.createElement("div")), s = (Me.exec(o) || ["", ""])[1].toLowerCase(), u = Oe[s] || Oe._default, a.innerHTML = u[1] + oe.htmlPrefilter(o) + u[2], d = u[0]; d--;) a = a.lastChild;
                    oe.merge(h, a.childNodes), a = f.firstChild, a.textContent = ""
                } else h.push(t.createTextNode(o));
                for (f.textContent = "", v = 0; o = h[v++];)
                    if (i && oe.inArray(o, i) > -1) r && r.push(o);
                    else if (l = oe.contains(o.ownerDocument, o), a = c(f.appendChild(o), "script"), l && p(a), n)
                    for (d = 0; o = a[d++];) Re.test(o.type || "") && n.push(o);
                return f
            }

            function f() {
                return !0
            }

            function h() {
                return !1
            }

            function v() {
                try {
                    return K.activeElement
                } catch (e) {}
            }

            function g(e, t, n, i, r, o) {
                var a, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (i = i || n, n = void 0);
                    for (s in t) g(e, s, n, i, t[s], o);
                    return e
                }
                if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = h;
                else if (!r) return e;
                return 1 === o && (a = r, r = function(e) {
                    return oe().off(e), a.apply(this, arguments)
                }, r.guid = a.guid || (a.guid = oe.guid++)), e.each(function() {
                    oe.event.add(this, t, r, i, n)
                })
            }

            function m(e, t) {
                return oe.nodeName(e, "table") && oe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function y(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
            }

            function b(e) {
                var t = Ve.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function w(e, t) {
                var n, i, r, o, a, s, u, l;
                if (1 === t.nodeType) {
                    if (Ce.hasData(e) && (o = Ce.access(e), a = Ce.set(t, o), l = o.events)) {
                        delete a.handle, a.events = {};
                        for (r in l)
                            for (n = 0, i = l[r].length; n < i; n++) oe.event.add(t, r, l[r][n])
                    }
                    Se.hasData(e) && (s = Se.access(e), u = oe.extend({}, s), Se.set(t, u))
                }
            }

            function _(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && De.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
            }

            function x(e, t, n, i) {
                t = X.apply([], t);
                var r, o, a, s, u, l, p = 0,
                    f = e.length,
                    h = f - 1,
                    v = t[0],
                    g = oe.isFunction(v);
                if (g || f > 1 && "string" == typeof v && !ie.checkClone && Ue.test(v)) return e.each(function(r) {
                    var o = e.eq(r);
                    g && (t[0] = v.call(this, r, o.html())), x(o, t, n, i)
                });
                if (f && (r = d(t, e[0].ownerDocument, !1, e, i), o = r.firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
                    for (a = oe.map(c(r, "script"), y), s = a.length; p < f; p++) u = r, p !== h && (u = oe.clone(u, !0, !0), s && oe.merge(a, c(u, "script"))), n.call(e[p], u, p);
                    if (s)
                        for (l = a[a.length - 1].ownerDocument, oe.map(a, b), p = 0; p < s; p++) u = a[p], Re.test(u.type || "") && !Ce.access(u, "globalEval") && oe.contains(l, u) && (u.src ? oe._evalUrl && oe._evalUrl(u.src) : oe.globalEval(u.textContent.replace(ze, "")))
                }
                return e
            }

            function A(e, t, n) {
                for (var i, r = t ? oe.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || oe.cleanData(c(i)), i.parentNode && (n && oe.contains(i.ownerDocument, i) && p(c(i, "script")), i.parentNode.removeChild(i));
                return e
            }

            function T(e, t) {
                var n = oe(t.createElement(e)).appendTo(t.body),
                    i = oe.css(n[0], "display");
                return n.detach(), i
            }

            function C(e) {
                var t = K,
                    n = Ye[e];
                return n || (n = T(e, t), "none" !== n && n || (We = (We || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = We[0].contentDocument, t.write(), t.close(), n = T(e, t), We.detach()), Ye[e] = n), n
            }

            function S(e, t, n) {
                var i, r, o, a, s = e.style;
                return n = n || Je(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || oe.contains(e.ownerDocument, e) || (a = oe.style(e, t)), n && !ie.pixelMarginRight() && Ke.test(a) && Ge.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o), void 0 !== a ? a + "" : a
            }

            function k(e, t) {
                return {
                    get: function() {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }

            function E(e) {
                if (e in it) return e;
                for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)
                    if (e = nt[n] + t, e in it) return e
            }

            function I(e, t, n) {
                var i = je.exec(t);
                return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
            }

            function j(e, t, n, i, r) {
                for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += oe.css(e, n + Ne[o], !0, r)), i ? ("content" === n && (a -= oe.css(e, "padding" + Ne[o], !0, r)), "margin" !== n && (a -= oe.css(e, "border" + Ne[o] + "Width", !0, r))) : (a += oe.css(e, "padding" + Ne[o], !0, r), "padding" !== n && (a += oe.css(e, "border" + Ne[o] + "Width", !0, r)));
                return a
            }

            function N(e, t, n) {
                var i = !0,
                    r = "width" === t ? e.offsetWidth : e.offsetHeight,
                    o = Je(e),
                    a = "border-box" === oe.css(e, "boxSizing", !1, o);
                if (r <= 0 || null == r) {
                    if (r = S(e, t, o), (r < 0 || null == r) && (r = e.style[t]), Ke.test(r)) return r;
                    i = a && (ie.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
                }
                return r + j(e, t, n || (a ? "border" : "content"), i, o) + "px"
            }

            function P(e, t) {
                for (var n, i, r, o = [], a = 0, s = e.length; a < s; a++) i = e[a], i.style && (o[a] = Ce.get(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Pe(i) && (o[a] = Ce.access(i, "olddisplay", C(i.nodeName)))) : (r = Pe(i), "none" === n && r || Ce.set(i, "olddisplay", r ? n : oe.css(i, "display"))));
                for (a = 0; a < s; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
                return e
            }

            function D(e, t, n, i, r) {
                return new D.prototype.init(e, t, n, i, r)
            }

            function M() {
                return e.setTimeout(function() {
                    rt = void 0
                }), rt = oe.now()
            }

            function R(e, t) {
                var n, i = 0,
                    r = {
                        height: e
                    };
                for (t = t ? 1 : 0; i < 4; i += 2 - t) n = Ne[i], r["margin" + n] = r["padding" + n] = e;
                return t && (r.opacity = r.width = e), r
            }

            function O(e, t, n) {
                for (var i, r = (L.tweeners[t] || []).concat(L.tweeners["*"]), o = 0, a = r.length; o < a; o++)
                    if (i = r[o].call(n, t, e)) return i
            }

            function q(e, t, n) {
                var i, r, o, a, s, u, l, c, p = this,
                    d = {},
                    f = e.style,
                    h = e.nodeType && Pe(e),
                    v = Ce.get(e, "fxshow");
                n.queue || (s = oe._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || u()
                }), s.unqueued++, p.always(function() {
                    p.always(function() {
                        s.unqueued--, oe.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], l = oe.css(e, "display"), c = "none" === l ? Ce.get(e, "olddisplay") || C(e.nodeName) : l, "inline" === c && "none" === oe.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", p.always(function() {
                    f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
                }));
                for (i in t)
                    if (r = t[i], at.exec(r)) {
                        if (delete t[i], o = o || "toggle" === r, r === (h ? "hide" : "show")) {
                            if ("show" !== r || !v || void 0 === v[i]) continue;
                            h = !0
                        }
                        d[i] = v && v[i] || oe.style(e, i)
                    } else l = void 0;
                if (oe.isEmptyObject(d)) "inline" === ("none" === l ? C(e.nodeName) : l) && (f.display = l);
                else {
                    v ? "hidden" in v && (h = v.hidden) : v = Ce.access(e, "fxshow", {}), o && (v.hidden = !h), h ? oe(e).show() : p.done(function() {
                        oe(e).hide()
                    }), p.done(function() {
                        var t;
                        Ce.remove(e, "fxshow");
                        for (t in d) oe.style(e, t, d[t])
                    });
                    for (i in d) a = O(h ? v[i] : 0, i, p), i in v || (v[i] = a.start, h && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
                }
            }

            function F(e, t) {
                var n, i, r, o, a;
                for (n in e)
                    if (i = oe.camelCase(n), r = t[i], o = e[n], oe.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = oe.cssHooks[i], a && "expand" in a) {
                        o = a.expand(o), delete e[i];
                        for (n in o) n in e || (e[n] = o[n], t[n] = r)
                    } else t[i] = r
            }

            function L(e, t, n) {
                var i, r, o = 0,
                    a = L.prefilters.length,
                    s = oe.Deferred().always(function() {
                        delete u.elem
                    }),
                    u = function() {
                        if (r) return !1;
                        for (var t = rt || M(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, o = 1 - i, a = 0, u = l.tweens.length; a < u; a++) l.tweens[a].run(o);
                        return s.notifyWith(e, [l, o, n]), o < 1 && u ? n : (s.resolveWith(e, [l]), !1)
                    },
                    l = s.promise({
                        elem: e,
                        props: oe.extend({}, t),
                        opts: oe.extend(!0, {
                            specialEasing: {},
                            easing: oe.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: rt || M(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var i = oe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                            return l.tweens.push(i), i
                        },
                        stop: function(t) {
                            var n = 0,
                                i = t ? l.tweens.length : 0;
                            if (r) return this;
                            for (r = !0; n < i; n++) l.tweens[n].run(1);
                            return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                        }
                    }),
                    c = l.props;
                for (F(c, l.opts.specialEasing); o < a; o++)
                    if (i = L.prefilters[o].call(l, e, c, l.opts)) return oe.isFunction(i.stop) && (oe._queueHooks(l.elem, l.opts.queue).stop = oe.proxy(i.stop, i)), i;
                return oe.map(c, O, l), oe.isFunction(l.opts.start) && l.opts.start.call(e, l), oe.fx.timer(oe.extend(u, {
                    elem: e,
                    anim: l,
                    queue: l.opts.queue
                })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            }

            function B(e) {
                return e.getAttribute && e.getAttribute("class") || ""
            }

            function H(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var i, r = 0,
                        o = t.toLowerCase().match(_e) || [];
                    if (oe.isFunction(n))
                        for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                }
            }

            function $(e, t, n, i) {
                function r(s) {
                    var u;
                    return o[s] = !0, oe.each(e[s] || [], function(e, s) {
                        var l = s(t, n, i);
                        return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), r(l), !1)
                    }), u
                }
                var o = {},
                    a = e === St;
                return r(t.dataTypes[0]) || !o["*"] && r("*")
            }

            function U(e, t) {
                var n, i, r = oe.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
                return i && oe.extend(!0, e, i), e
            }

            function V(e, t, n) {
                for (var i, r, o, a, s = e.contents, u = e.dataTypes;
                    "*" === u[0];) u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i)
                    for (r in s)
                        if (s[r] && s[r].test(i)) {
                            u.unshift(r);
                            break
                        }
                if (u[0] in n) o = u[0];
                else {
                    for (r in n) {
                        if (!u[0] || e.converters[r + " " + u[0]]) {
                            o = r;
                            break
                        }
                        a || (a = r)
                    }
                    o = o || a
                }
                if (o) return o !== u[0] && u.unshift(o), n[o]
            }

            function z(e, t, n, i) {
                var r, o, a, s, u, l = {},
                    c = e.dataTypes.slice();
                if (c[1])
                    for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                for (o = c.shift(); o;)
                    if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                        if ("*" === o) o = u;
                        else if ("*" !== u && u !== o) {
                    if (a = l[u + " " + o] || l["* " + o], !a)
                        for (r in l)
                            if (s = r.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                a === !0 ? a = l[r] : l[r] !== !0 && (o = s[0], c.unshift(s[1]));
                                break
                            }
                    if (a !== !0)
                        if (a && e["throws"]) t = a(t);
                        else try {
                            t = a(t)
                        } catch (p) {
                            return {
                                state: "parsererror",
                                error: a ? p : "No conversion from " + u + " to " + o
                            }
                        }
                }
                return {
                    state: "success",
                    data: t
                }
            }

            function W(e, t, n, i) {
                var r;
                if (oe.isArray(t)) oe.each(t, function(t, r) {
                    n || jt.test(e) ? i(e, r) : W(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
                });
                else if (n || "object" !== oe.type(t)) i(e, t);
                else
                    for (r in t) W(e + "[" + r + "]", t[r], n, i)
            }

            function Y(e) {
                return oe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
            }
            var G = [],
                K = e.document,
                J = G.slice,
                X = G.concat,
                Q = G.push,
                Z = G.indexOf,
                ee = {},
                te = ee.toString,
                ne = ee.hasOwnProperty,
                ie = {},
                re = "2.2.4",
                oe = function(e, t) {
                    return new oe.fn.init(e, t)
                },
                ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                se = /^-ms-/,
                ue = /-([\da-z])/gi,
                le = function(e, t) {
                    return t.toUpperCase()
                };
            oe.fn = oe.prototype = {
                jquery: re,
                constructor: oe,
                selector: "",
                length: 0,
                toArray: function() {
                    return J.call(this)
                },
                get: function(e) {
                    return null != e ? e < 0 ? this[e + this.length] : this[e] : J.call(this)
                },
                pushStack: function(e) {
                    var t = oe.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function(e) {
                    return oe.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(oe.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(J.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: Q,
                sort: G.sort,
                splice: G.splice
            }, oe.extend = oe.fn.extend = function() {
                var e, t, n, i, r, o, a = arguments[0] || {},
                    s = 1,
                    u = arguments.length,
                    l = !1;
                for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || oe.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                    if (null != (e = arguments[s]))
                        for (t in e) n = a[t], i = e[t], a !== i && (l && i && (oe.isPlainObject(i) || (r = oe.isArray(i))) ? (r ? (r = !1, o = n && oe.isArray(n) ? n : []) : o = n && oe.isPlainObject(n) ? n : {}, a[t] = oe.extend(l, o, i)) : void 0 !== i && (a[t] = i));
                return a
            }, oe.extend({
                expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === oe.type(e)
                },
                isArray: Array.isArray,
                isWindow: function(e) {
                    return null != e && e === e.window
                },
                isNumeric: function(e) {
                    var t = e && e.toString();
                    return !oe.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isPlainObject: function(e) {
                    var t;
                    if ("object" !== oe.type(e) || e.nodeType || oe.isWindow(e)) return !1;
                    if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
                    for (t in e);
                    return void 0 === t || ne.call(e, t)
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                type: function(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
                },
                globalEval: function(e) {
                    var t, n = eval;
                    e = oe.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                },
                camelCase: function(e) {
                    return e.replace(se, "ms-").replace(ue, le)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t) {
                    var i, r = 0;
                    if (n(e))
                        for (i = e.length; r < i && t.call(e[r], r, e[r]) !== !1; r++);
                    else
                        for (r in e)
                            if (t.call(e[r], r, e[r]) === !1) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(ae, "")
                },
                makeArray: function(e, t) {
                    var i = t || [];
                    return null != e && (n(Object(e)) ? oe.merge(i, "string" == typeof e ? [e] : e) : Q.call(i, e)), i
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : Z.call(t, e, n)
                },
                merge: function(e, t) {
                    for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                    return e.length = r, e
                },
                grep: function(e, t, n) {
                    for (var i, r = [], o = 0, a = e.length, s = !n; o < a; o++) i = !t(e[o], o), i !== s && r.push(e[o]);
                    return r
                },
                map: function(e, t, i) {
                    var r, o, a = 0,
                        s = [];
                    if (n(e))
                        for (r = e.length; a < r; a++) o = t(e[a], a, i), null != o && s.push(o);
                    else
                        for (a in e) o = t(e[a], a, i), null != o && s.push(o);
                    return X.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, i, r;
                    if ("string" == typeof t && (n = e[t], t = e, e = n), oe.isFunction(e)) return i = J.call(arguments, 2), r = function() {
                        return e.apply(t || this, i.concat(J.call(arguments)))
                    }, r.guid = e.guid = e.guid || oe.guid++, r
                },
                now: Date.now,
                support: ie
            }), "function" == typeof Symbol && (oe.fn[Symbol.iterator] = G[Symbol.iterator]), oe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                ee["[object " + t + "]"] = t.toLowerCase()
            });
            var ce = function(e) {
                function t(e, t, n, i) {
                    var r, o, a, s, u, l, p, f, h = t && t.ownerDocument,
                        v = t ? t.nodeType : 9;
                    if (n = n || [], "string" != typeof e || !e || 1 !== v && 9 !== v && 11 !== v) return n;
                    if (!i && ((t ? t.ownerDocument || t : B) !== P && N(t), t = t || P, M)) {
                        if (11 !== v && (l = me.exec(e)))
                            if (r = l[1]) {
                                if (9 === v) {
                                    if (!(a = t.getElementById(r))) return n;
                                    if (a.id === r) return n.push(a), n
                                } else if (h && (a = h.getElementById(r)) && F(t, a) && a.id === r) return n.push(a), n
                            } else {
                                if (l[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                                if ((r = l[3]) && _.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(r)), n
                            }
                        if (_.qsa && !z[e + " "] && (!R || !R.test(e))) {
                            if (1 !== v) h = t, f = e;
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = L), p = C(e), o = p.length, u = de.test(s) ? "#" + s : "[id='" + s + "']"; o--;) p[o] = u + " " + d(p[o]);
                                f = p.join(","), h = ye.test(e) && c(t.parentNode) || t
                            }
                            if (f) try {
                                return Q.apply(n, h.querySelectorAll(f)), n
                            } catch (g) {} finally {
                                s === L && t.removeAttribute("id")
                            }
                        }
                    }
                    return k(e.replace(se, "$1"), t, n, i)
                }

                function n() {
                    function e(n, i) {
                        return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = i
                    }
                    var t = [];
                    return e
                }

                function i(e) {
                    return e[L] = !0, e
                }

                function r(e) {
                    var t = P.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function o(e, t) {
                    for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
                }

                function a(e, t) {
                    var n = t && e,
                        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                    if (i) return i;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function s(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function u(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function l(e) {
                    return i(function(t) {
                        return t = +t, i(function(n, i) {
                            for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }

                function c(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }

                function p() {}

                function d(e) {
                    for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                    return i
                }

                function f(e, t, n) {
                    var i = t.dir,
                        r = n && "parentNode" === i,
                        o = $++;
                    return t.first ? function(t, n, o) {
                        for (; t = t[i];)
                            if (1 === t.nodeType || r) return e(t, n, o)
                    } : function(t, n, a) {
                        var s, u, l, c = [H, o];
                        if (a) {
                            for (; t = t[i];)
                                if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                        } else
                            for (; t = t[i];)
                                if (1 === t.nodeType || r) {
                                    if (l = t[L] || (t[L] = {}), u = l[t.uniqueID] || (l[t.uniqueID] = {}), (s = u[i]) && s[0] === H && s[1] === o) return c[2] = s[2];
                                    if (u[i] = c, c[2] = e(t, n, a)) return !0
                                }
                    }
                }

                function h(e) {
                    return e.length > 1 ? function(t, n, i) {
                        for (var r = e.length; r--;)
                            if (!e[r](t, n, i)) return !1;
                        return !0
                    } : e[0]
                }

                function v(e, n, i) {
                    for (var r = 0, o = n.length; r < o; r++) t(e, n[r], i);
                    return i
                }

                function g(e, t, n, i, r) {
                    for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), l && t.push(s)));
                    return a
                }

                function m(e, t, n, r, o, a) {
                    return r && !r[L] && (r = m(r)), o && !o[L] && (o = m(o, a)), i(function(i, a, s, u) {
                        var l, c, p, d = [],
                            f = [],
                            h = a.length,
                            m = i || v(t || "*", s.nodeType ? [s] : s, []),
                            y = !e || !i && t ? m : g(m, d, e, s, u),
                            b = n ? o || (i ? e : h || r) ? [] : a : y;
                        if (n && n(y, b, s, u), r)
                            for (l = g(b, f), r(l, [], s, u), c = l.length; c--;)(p = l[c]) && (b[f[c]] = !(y[f[c]] = p));
                        if (i) {
                            if (o || e) {
                                if (o) {
                                    for (l = [], c = b.length; c--;)(p = b[c]) && l.push(y[c] = p);
                                    o(null, b = [], l, u)
                                }
                                for (c = b.length; c--;)(p = b[c]) && (l = o ? ee(i, p) : d[c]) > -1 && (i[l] = !(a[l] = p))
                            }
                        } else b = g(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, u) : Q.apply(a, b)
                    })
                }

                function y(e) {
                    for (var t, n, i, r = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, u = f(function(e) {
                            return e === t
                        }, a, !0), l = f(function(e) {
                            return ee(t, e) > -1
                        }, a, !0), c = [function(e, n, i) {
                            var r = !o && (i || n !== E) || ((t = n).nodeType ? u(e, n, i) : l(e, n, i));
                            return t = null, r
                        }]; s < r; s++)
                        if (n = x.relative[e[s].type]) c = [f(h(c), n)];
                        else {
                            if (n = x.filter[e[s].type].apply(null, e[s].matches), n[L]) {
                                for (i = ++s; i < r && !x.relative[e[i].type]; i++);
                                return m(s > 1 && h(c), s > 1 && d(e.slice(0, s - 1).concat({
                                    value: " " === e[s - 2].type ? "*" : ""
                                })).replace(se, "$1"), n, s < i && y(e.slice(s, i)), i < r && y(e = e.slice(i)), i < r && d(e))
                            }
                            c.push(n)
                        }
                    return h(c)
                }

                function b(e, n) {
                    var r = n.length > 0,
                        o = e.length > 0,
                        a = function(i, a, s, u, l) {
                            var c, p, d, f = 0,
                                h = "0",
                                v = i && [],
                                m = [],
                                y = E,
                                b = i || o && x.find.TAG("*", l),
                                w = H += null == y ? 1 : Math.random() || .1,
                                _ = b.length;
                            for (l && (E = a === P || a || l); h !== _ && null != (c = b[h]); h++) {
                                if (o && c) {
                                    for (p = 0, a || c.ownerDocument === P || (N(c), s = !M); d = e[p++];)
                                        if (d(c, a || P, s)) {
                                            u.push(c);
                                            break
                                        }
                                    l && (H = w)
                                }
                                r && ((c = !d && c) && f--, i && v.push(c))
                            }
                            if (f += h, r && h !== f) {
                                for (p = 0; d = n[p++];) d(v, m, a, s);
                                if (i) {
                                    if (f > 0)
                                        for (; h--;) v[h] || m[h] || (m[h] = J.call(u));
                                    m = g(m)
                                }
                                Q.apply(u, m), l && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(u)
                            }
                            return l && (H = w, E = y), v
                        };
                    return r ? i(a) : a
                }
                var w, _, x, A, T, C, S, k, E, I, j, N, P, D, M, R, O, q, F, L = "sizzle" + 1 * new Date,
                    B = e.document,
                    H = 0,
                    $ = 0,
                    U = n(),
                    V = n(),
                    z = n(),
                    W = function(e, t) {
                        return e === t && (j = !0), 0
                    },
                    Y = 1 << 31,
                    G = {}.hasOwnProperty,
                    K = [],
                    J = K.pop,
                    X = K.push,
                    Q = K.push,
                    Z = K.slice,
                    ee = function(e, t) {
                        for (var n = 0, i = e.length; n < i; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ne = "[\\x20\\t\\r\\n\\f]",
                    ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                    oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
                    ae = new RegExp(ne + "+", "g"),
                    se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                    ue = new RegExp("^" + ne + "*," + ne + "*"),
                    le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                    ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                    pe = new RegExp(oe),
                    de = new RegExp("^" + ie + "$"),
                    fe = {
                        ID: new RegExp("^#(" + ie + ")"),
                        CLASS: new RegExp("^\\.(" + ie + ")"),
                        TAG: new RegExp("^(" + ie + "|[*])"),
                        ATTR: new RegExp("^" + re),
                        PSEUDO: new RegExp("^" + oe),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + te + ")$", "i"),
                        needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                    },
                    he = /^(?:input|select|textarea|button)$/i,
                    ve = /^h\d$/i,
                    ge = /^[^{]+\{\s*\[native \w/,
                    me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ye = /[+~]/,
                    be = /'|\\/g,
                    we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                    _e = function(e, t, n) {
                        var i = "0x" + t - 65536;
                        return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                    },
                    xe = function() {
                        N()
                    };
                try {
                    Q.apply(K = Z.call(B.childNodes), B.childNodes), K[B.childNodes.length].nodeType
                } catch (Ae) {
                    Q = {
                        apply: K.length ? function(e, t) {
                            X.apply(e, Z.call(t))
                        } : function(e, t) {
                            for (var n = e.length, i = 0; e[n++] = t[i++];);
                            e.length = n - 1
                        }
                    }
                }
                _ = t.support = {}, T = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, N = t.setDocument = function(e) {
                    var t, n, i = e ? e.ownerDocument || e : B;
                    return i !== P && 9 === i.nodeType && i.documentElement ? (P = i, D = P.documentElement, M = !T(P), (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), _.attributes = r(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), _.getElementsByTagName = r(function(e) {
                        return e.appendChild(P.createComment("")), !e.getElementsByTagName("*").length
                    }), _.getElementsByClassName = ge.test(P.getElementsByClassName), _.getById = r(function(e) {
                        return D.appendChild(e).id = L, !P.getElementsByName || !P.getElementsByName(L).length
                    }), _.getById ? (x.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && M) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, x.filter.ID = function(e) {
                        var t = e.replace(we, _e);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete x.find.ID, x.filter.ID = function(e) {
                        var t = e.replace(we, _e);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), x.find.TAG = _.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : _.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var n, i = [],
                            r = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, x.find.CLASS = _.getElementsByClassName && function(e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && M) return t.getElementsByClassName(e)
                    }, O = [], R = [], (_.qsa = ge.test(P.querySelectorAll)) && (r(function(e) {
                        D.appendChild(e).innerHTML = "<a id='" + L + "'></a><select id='" + L + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || R.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + L + "-]").length || R.push("~="), e.querySelectorAll(":checked").length || R.push(":checked"), e.querySelectorAll("a#" + L + "+*").length || R.push(".#.+[+~]")
                    }), r(function(e) {
                        var t = P.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && R.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (_.matchesSelector = ge.test(q = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && r(function(e) {
                        _.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), O.push("!=", oe)
                    }), R = R.length && new RegExp(R.join("|")), O = O.length && new RegExp(O.join("|")), t = ge.test(D.compareDocumentPosition), F = t || ge.test(D.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, W = t ? function(e, t) {
                        if (e === t) return j = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !_.sortDetached && t.compareDocumentPosition(e) === n ? e === P || e.ownerDocument === B && F(B, e) ? -1 : t === P || t.ownerDocument === B && F(B, t) ? 1 : I ? ee(I, e) - ee(I, t) : 0 : 4 & n ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return j = !0, 0;
                        var n, i = 0,
                            r = e.parentNode,
                            o = t.parentNode,
                            s = [e],
                            u = [t];
                        if (!r || !o) return e === P ? -1 : t === P ? 1 : r ? -1 : o ? 1 : I ? ee(I, e) - ee(I, t) : 0;
                        if (r === o) return a(e, t);
                        for (n = e; n = n.parentNode;) s.unshift(n);
                        for (n = t; n = n.parentNode;) u.unshift(n);
                        for (; s[i] === u[i];) i++;
                        return i ? a(s[i], u[i]) : s[i] === B ? -1 : u[i] === B ? 1 : 0
                    }, P) : P
                }, t.matches = function(e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== P && N(e), n = n.replace(ce, "='$1']"), _.matchesSelector && M && !z[n + " "] && (!O || !O.test(n)) && (!R || !R.test(n))) try {
                        var i = q.call(e, n);
                        if (i || _.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                    } catch (r) {}
                    return t(n, P, null, [e]).length > 0
                }, t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== P && N(e), F(e, t)
                }, t.attr = function(e, t) {
                    (e.ownerDocument || e) !== P && N(e);
                    var n = x.attrHandle[t.toLowerCase()],
                        i = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !M) : void 0;
                    return void 0 !== i ? i : _.attributes || !M ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }, t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function(e) {
                    var t, n = [],
                        i = 0,
                        r = 0;
                    if (j = !_.detectDuplicates, I = !_.sortStable && e.slice(0), e.sort(W), j) {
                        for (; t = e[r++];) t === e[r] && (i = n.push(r));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return I = null, e
                }, A = t.getText = function(e) {
                    var t, n = "",
                        i = 0,
                        r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += A(e)
                        } else if (3 === r || 4 === r) return e.nodeValue
                    } else
                        for (; t = e[i++];) n += A(t);
                    return n
                }, x = t.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(we, _e), e[3] = (e[3] || e[4] || e[5] || "").replace(we, _e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(we, _e).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = U[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && U(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, i) {
                            return function(r) {
                                var o = t.attr(r, e);
                                return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                            }
                        },
                        CHILD: function(e, t, n, i, r) {
                            var o = "nth" !== e.slice(0, 3),
                                a = "last" !== e.slice(-4),
                                s = "of-type" === t;
                            return 1 === i && 0 === r ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, u) {
                                var l, c, p, d, f, h, v = o !== a ? "nextSibling" : "previousSibling",
                                    g = t.parentNode,
                                    m = s && t.nodeName.toLowerCase(),
                                    y = !u && !s,
                                    b = !1;
                                if (g) {
                                    if (o) {
                                        for (; v;) {
                                            for (d = t; d = d[v];)
                                                if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                            h = v = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                        for (d = g, p = d[L] || (d[L] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), l = c[e] || [], f = l[0] === H && l[1], b = f && l[2], d = f && g.childNodes[f]; d = ++f && d && d[v] || (b = f = 0) || h.pop();)
                                            if (1 === d.nodeType && ++b && d === t) {
                                                c[e] = [H, f, b];
                                                break
                                            }
                                    } else if (y && (d = t, p = d[L] || (d[L] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), l = c[e] || [], f = l[0] === H && l[1], b = f), b === !1)
                                        for (;
                                            (d = ++f && d && d[v] || (b = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++b || (y && (p = d[L] || (d[L] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), c[e] = [H, b]), d !== t)););
                                    return b -= r, b === i || b % i === 0 && b / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var r, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return o[L] ? o(n) : o.length > 1 ? (r = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                                for (var i, r = o(e, n), a = r.length; a--;) i = ee(e, r[a]), e[i] = !(t[i] = r[a])
                            }) : function(e) {
                                return o(e, 0, r)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: i(function(e) {
                            var t = [],
                                n = [],
                                r = S(e.replace(se, "$1"));
                            return r[L] ? i(function(e, t, n, i) {
                                for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function(e, i, o) {
                                return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: i(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: i(function(e) {
                            return e = e.replace(we, _e),
                                function(t) {
                                    return (t.textContent || t.innerText || A(t)).indexOf(e) > -1
                                }
                        }),
                        lang: i(function(e) {
                            return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, _e).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = M ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === D
                        },
                        focus: function(e) {
                            return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !x.pseudos.empty(e)
                        },
                        header: function(e) {
                            return ve.test(e.nodeName)
                        },
                        input: function(e) {
                            return he.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: l(function() {
                            return [0]
                        }),
                        last: l(function(e, t) {
                            return [t - 1]
                        }),
                        eq: l(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: l(function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: l(function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: l(function(e, t, n) {
                            for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                            return e
                        }),
                        gt: l(function(e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                }, x.pseudos.nth = x.pseudos.eq;
                for (w in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) x.pseudos[w] = s(w);
                for (w in {
                        submit: !0,
                        reset: !0
                    }) x.pseudos[w] = u(w);
                return p.prototype = x.filters = x.pseudos, x.setFilters = new p, C = t.tokenize = function(e, n) {
                    var i, r, o, a, s, u, l, c = V[e + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (s = e, u = [], l = x.preFilter; s;) {
                        i && !(r = ue.exec(s)) || (r && (s = s.slice(r[0].length) || s), u.push(o = [])), i = !1, (r = le.exec(s)) && (i = r.shift(), o.push({
                            value: i,
                            type: r[0].replace(se, " ")
                        }), s = s.slice(i.length));
                        for (a in x.filter) !(r = fe[a].exec(s)) || l[a] && !(r = l[a](r)) || (i = r.shift(), o.push({
                            value: i,
                            type: a,
                            matches: r
                        }), s = s.slice(i.length));
                        if (!i) break
                    }
                    return n ? s.length : s ? t.error(e) : V(e, u).slice(0)
                }, S = t.compile = function(e, t) {
                    var n, i = [],
                        r = [],
                        o = z[e + " "];
                    if (!o) {
                        for (t || (t = C(e)), n = t.length; n--;) o = y(t[n]), o[L] ? i.push(o) : r.push(o);
                        o = z(e, b(r, i)), o.selector = e
                    }
                    return o
                }, k = t.select = function(e, t, n, i) {
                    var r, o, a, s, u, l = "function" == typeof e && e,
                        p = !i && C(e = l.selector || e);
                    if (n = n || [], 1 === p.length) {
                        if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && _.getById && 9 === t.nodeType && M && x.relative[o[1].type]) {
                            if (t = (x.find.ID(a.matches[0].replace(we, _e), t) || [])[0], !t) return n;
                            l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                        }
                        for (r = fe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !x.relative[s = a.type]);)
                            if ((u = x.find[s]) && (i = u(a.matches[0].replace(we, _e), ye.test(o[0].type) && c(t.parentNode) || t))) {
                                if (o.splice(r, 1), e = i.length && d(o), !e) return Q.apply(n, i), n;
                                break
                            }
                    }
                    return (l || S(e, p))(i, t, !M, n, !t || ye.test(e) && c(t.parentNode) || t), n
                }, _.sortStable = L.split("").sort(W).join("") === L, _.detectDuplicates = !!j, N(), _.sortDetached = r(function(e) {
                    return 1 & e.compareDocumentPosition(P.createElement("div"))
                }), r(function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function(e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }), _.attributes && r(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }) || o("value", function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
                }), r(function(e) {
                    return null == e.getAttribute("disabled")
                }) || o(te, function(e, t, n) {
                    var i;
                    if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }), t
            }(e);
            oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.uniqueSort = oe.unique = ce.uniqueSort, oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
            var pe = function(e, t, n) {
                    for (var i = [], r = void 0 !== n;
                        (e = e[t]) && 9 !== e.nodeType;)
                        if (1 === e.nodeType) {
                            if (r && oe(e).is(n)) break;
                            i.push(e)
                        }
                    return i
                },
                de = function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                },
                fe = oe.expr.match.needsContext,
                he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                ve = /^.[^:#\[\.,]*$/;
            oe.filter = function(e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? oe.find.matchesSelector(i, e) ? [i] : [] : oe.find.matches(e, oe.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }, oe.fn.extend({
                find: function(e) {
                    var t, n = this.length,
                        i = [],
                        r = this;
                    if ("string" != typeof e) return this.pushStack(oe(e).filter(function() {
                        for (t = 0; t < n; t++)
                            if (oe.contains(r[t], this)) return !0
                    }));
                    for (t = 0; t < n; t++) oe.find(e, r[t], i);
                    return i = this.pushStack(n > 1 ? oe.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
                },
                filter: function(e) {
                    return this.pushStack(i(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(i(this, e || [], !0))
                },
                is: function(e) {
                    return !!i(this, "string" == typeof e && fe.test(e) ? oe(e) : e || [], !1).length
                }
            });
            var ge, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                ye = oe.fn.init = function(e, t, n) {
                    var i, r;
                    if (!e) return this;
                    if (n = n || ge, "string" == typeof e) {
                        if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : me.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (i[1]) {
                            if (t = t instanceof oe ? t[0] : t, oe.merge(this, oe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), he.test(i[1]) && oe.isPlainObject(t))
                                for (i in t) oe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                            return this
                        }
                        return r = K.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = K, this.selector = e, this
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : oe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(oe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), oe.makeArray(e, this))
                };
            ye.prototype = oe.fn, ge = oe(K);
            var be = /^(?:parents|prev(?:Until|All))/,
                we = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            oe.fn.extend({
                has: function(e) {
                    var t = oe(e, this),
                        n = t.length;
                    return this.filter(function() {
                        for (var e = 0; e < n; e++)
                            if (oe.contains(this, t[e])) return !0
                    })
                },
                closest: function(e, t) {
                    for (var n, i = 0, r = this.length, o = [], a = fe.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; i < r; i++)
                        for (n = this[i]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                    return this.pushStack(o.length > 1 ? oe.uniqueSort(o) : o)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? Z.call(oe(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(oe.uniqueSort(oe.merge(this.get(), oe(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }), oe.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return pe(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return pe(e, "parentNode", n)
                },
                next: function(e) {
                    return r(e, "nextSibling")
                },
                prev: function(e) {
                    return r(e, "previousSibling")
                },
                nextAll: function(e) {
                    return pe(e, "nextSibling")
                },
                prevAll: function(e) {
                    return pe(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return pe(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return pe(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return de((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return de(e.firstChild)
                },
                contents: function(e) {
                    return e.contentDocument || oe.merge([], e.childNodes)
                }
            }, function(e, t) {
                oe.fn[e] = function(n, i) {
                    var r = oe.map(this, t, n);
                    return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = oe.filter(i, r)), this.length > 1 && (we[e] || oe.uniqueSort(r), be.test(e) && r.reverse()), this.pushStack(r)
                }
            });
            var _e = /\S+/g;
            oe.Callbacks = function(e) {
                e = "string" == typeof e ? o(e) : oe.extend({}, e);
                var t, n, i, r, a = [],
                    s = [],
                    u = -1,
                    l = function() {
                        for (r = e.once, i = t = !0; s.length; u = -1)
                            for (n = s.shift(); ++u < a.length;) a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = a.length, n = !1);
                        e.memory || (n = !1), t = !1, r && (a = n ? [] : "")
                    },
                    c = {
                        add: function() {
                            return a && (n && !t && (u = a.length - 1, s.push(n)), function i(t) {
                                oe.each(t, function(t, n) {
                                    oe.isFunction(n) ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== oe.type(n) && i(n)
                                })
                            }(arguments), n && !t && l()), this
                        },
                        remove: function() {
                            return oe.each(arguments, function(e, t) {
                                for (var n;
                                    (n = oe.inArray(t, a, n)) > -1;) a.splice(n, 1), n <= u && u--
                            }), this
                        },
                        has: function(e) {
                            return e ? oe.inArray(e, a) > -1 : a.length > 0
                        },
                        empty: function() {
                            return a && (a = []), this
                        },
                        disable: function() {
                            return r = s = [], a = n = "", this
                        },
                        disabled: function() {
                            return !a
                        },
                        lock: function() {
                            return r = s = [], n || (a = n = ""), this
                        },
                        locked: function() {
                            return !!r
                        },
                        fireWith: function(e, n) {
                            return r || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || l()), this
                        },
                        fire: function() {
                            return c.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!i
                        }
                    };
                return c
            }, oe.extend({
                Deferred: function(e) {
                    var t = [
                            ["resolve", "done", oe.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", oe.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", oe.Callbacks("memory")]
                        ],
                        n = "pending",
                        i = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return r.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var e = arguments;
                                return oe.Deferred(function(n) {
                                    oe.each(t, function(t, o) {
                                        var a = oe.isFunction(e[t]) && e[t];
                                        r[o[1]](function() {
                                            var e = a && a.apply(this, arguments);
                                            e && oe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? oe.extend(e, i) : i
                            }
                        },
                        r = {};
                    return i.pipe = i.then, oe.each(t, function(e, o) {
                        var a = o[2],
                            s = o[3];
                        i[o[1]] = a.add, s && a.add(function() {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                            return r[o[0] + "With"](this === r ? i : this, arguments), this
                        }, r[o[0] + "With"] = a.fireWith
                    }), i.promise(r), e && e.call(r, r), r
                },
                when: function(e) {
                    var t, n, i, r = 0,
                        o = J.call(arguments),
                        a = o.length,
                        s = 1 !== a || e && oe.isFunction(e.promise) ? a : 0,
                        u = 1 === s ? e : oe.Deferred(),
                        l = function(e, n, i) {
                            return function(r) {
                                n[e] = this, i[e] = arguments.length > 1 ? J.call(arguments) : r, i === t ? u.notifyWith(n, i) : --s || u.resolveWith(n, i)
                            }
                        };
                    if (a > 1)
                        for (t = new Array(a), n = new Array(a), i = new Array(a); r < a; r++) o[r] && oe.isFunction(o[r].promise) ? o[r].promise().progress(l(r, n, t)).done(l(r, i, o)).fail(u.reject) : --s;
                    return s || u.resolveWith(i, o), u.promise()
                }
            });
            var xe;
            oe.fn.ready = function(e) {
                return oe.ready.promise().done(e), this
            }, oe.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? oe.readyWait++ : oe.ready(!0)
                },
                ready: function(e) {
                    (e === !0 ? --oe.readyWait : oe.isReady) || (oe.isReady = !0, e !== !0 && --oe.readyWait > 0 || (xe.resolveWith(K, [oe]), oe.fn.triggerHandler && (oe(K).triggerHandler("ready"), oe(K).off("ready"))))
                }
            }), oe.ready.promise = function(t) {
                return xe || (xe = oe.Deferred(), "complete" === K.readyState || "loading" !== K.readyState && !K.documentElement.doScroll ? e.setTimeout(oe.ready) : (K.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a))), xe.promise(t)
            }, oe.ready.promise();
            var Ae = function(e, t, n, i, r, o, a) {
                    var s = 0,
                        u = e.length,
                        l = null == n;
                    if ("object" === oe.type(n)) {
                        r = !0;
                        for (s in n) Ae(e, t, s, n[s], !0, o, a)
                    } else if (void 0 !== i && (r = !0, oe.isFunction(i) || (a = !0), l && (a ? (t.call(e, i), t = null) : (l = t, t = function(e, t, n) {
                            return l.call(oe(e), n)
                        })), t))
                        for (; s < u; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                    return r ? e : l ? t.call(e) : u ? t(e[0], n) : o
                },
                Te = function(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                };
            s.uid = 1, s.prototype = {
                register: function(e, t) {
                    var n = t || {};
                    return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                        value: n,
                        writable: !0,
                        configurable: !0
                    }), e[this.expando]
                },
                cache: function(e) {
                    if (!Te(e)) return {};
                    var t = e[this.expando];
                    return t || (t = {}, Te(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t
                },
                set: function(e, t, n) {
                    var i, r = this.cache(e);
                    if ("string" == typeof t) r[t] = n;
                    else
                        for (i in t) r[i] = t[i];
                    return r
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
                },
                access: function(e, t, n) {
                    var i;
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, oe.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
                },
                remove: function(e, t) {
                    var n, i, r, o = e[this.expando];
                    if (void 0 !== o) {
                        if (void 0 === t) this.register(e);
                        else {
                            oe.isArray(t) ? i = t.concat(t.map(oe.camelCase)) : (r = oe.camelCase(t), t in o ? i = [t, r] : (i = r, i = i in o ? [i] : i.match(_e) || [])), n = i.length;
                            for (; n--;) delete o[i[n]]
                        }(void 0 === t || oe.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !oe.isEmptyObject(t)
                }
            };
            var Ce = new s,
                Se = new s,
                ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                Ee = /[A-Z]/g;
            oe.extend({
                hasData: function(e) {
                    return Se.hasData(e) || Ce.hasData(e)
                },
                data: function(e, t, n) {
                    return Se.access(e, t, n)
                },
                removeData: function(e, t) {
                    Se.remove(e, t)
                },
                _data: function(e, t, n) {
                    return Ce.access(e, t, n)
                },
                _removeData: function(e, t) {
                    Ce.remove(e, t)
                }
            }), oe.fn.extend({
                data: function(e, t) {
                    var n, i, r, o = this[0],
                        a = o && o.attributes;
                    if (void 0 === e) {
                        if (this.length && (r = Se.get(o), 1 === o.nodeType && !Ce.get(o, "hasDataAttrs"))) {
                            for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), u(o, i, r[i])));
                            Ce.set(o, "hasDataAttrs", !0)
                        }
                        return r
                    }
                    return "object" == typeof e ? this.each(function() {
                        Se.set(this, e)
                    }) : Ae(this, function(t) {
                        var n, i;
                        if (o && void 0 === t) {
                            if (n = Se.get(o, e) || Se.get(o, e.replace(Ee, "-$&").toLowerCase()), void 0 !== n) return n;
                            if (i = oe.camelCase(e), n = Se.get(o, i), void 0 !== n) return n;
                            if (n = u(o, i, void 0), void 0 !== n) return n
                        } else i = oe.camelCase(e), this.each(function() {
                            var n = Se.get(this, i);
                            Se.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && Se.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        Se.remove(this, e)
                    })
                }
            }), oe.extend({
                queue: function(e, t, n) {
                    var i;
                    if (e) return t = (t || "fx") + "queue", i = Ce.get(e, t), n && (!i || oe.isArray(n) ? i = Ce.access(e, t, oe.makeArray(n)) : i.push(n)), i || []
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = oe.queue(e, t),
                        i = n.length,
                        r = n.shift(),
                        o = oe._queueHooks(e, t),
                        a = function() {
                            oe.dequeue(e, t)
                        };
                    "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return Ce.get(e, n) || Ce.access(e, n, {
                        empty: oe.Callbacks("once memory").add(function() {
                            Ce.remove(e, [t + "queue", n])
                        })
                    })
                }
            }), oe.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? oe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = oe.queue(this, e, t);
                        oe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && oe.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        oe.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, i = 1,
                        r = oe.Deferred(),
                        o = this,
                        a = this.length,
                        s = function() {
                            --i || r.resolveWith(o, [o])
                        };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Ce.get(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                    return s(), r.promise(t)
                }
            });
            var Ie = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                je = new RegExp("^(?:([+-])=|)(" + Ie + ")([a-z%]*)$", "i"),
                Ne = ["Top", "Right", "Bottom", "Left"],
                Pe = function(e, t) {
                    return e = t || e, "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
                },
                De = /^(?:checkbox|radio)$/i,
                Me = /<([\w:-]+)/,
                Re = /^$|\/(?:java|ecma)script/i,
                Oe = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            Oe.optgroup = Oe.option, Oe.tbody = Oe.tfoot = Oe.colgroup = Oe.caption = Oe.thead, Oe.th = Oe.td;
            var qe = /<|&#?\w+;/;
            ! function() {
                var e = K.createDocumentFragment(),
                    t = e.appendChild(K.createElement("div")),
                    n = K.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
            }();
            var Fe = /^key/,
                Le = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                Be = /^([^.]*)(?:\.(.+)|)/;
            oe.event = {
                global: {},
                add: function(e, t, n, i, r) {
                    var o, a, s, u, l, c, p, d, f, h, v, g = Ce.get(e);
                    if (g)
                        for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = oe.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                                return "undefined" != typeof oe && oe.event.triggered !== t.type ? oe.event.dispatch.apply(e, arguments) : void 0
                            }), t = (t || "").match(_e) || [""], l = t.length; l--;) s = Be.exec(t[l]) || [], f = v = s[1], h = (s[2] || "").split(".").sort(), f && (p = oe.event.special[f] || {}, f = (r ? p.delegateType : p.bindType) || f, p = oe.event.special[f] || {}, c = oe.extend({
                            type: f,
                            origType: v,
                            data: i,
                            handler: n,
                            guid: n.guid,
                            selector: r,
                            needsContext: r && oe.expr.match.needsContext.test(r),
                            namespace: h.join(".")
                        }, o), (d = u[f]) || (d = u[f] = [], d.delegateCount = 0, p.setup && p.setup.call(e, i, h, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), oe.event.global[f] = !0)
                },
                remove: function(e, t, n, i, r) {
                    var o, a, s, u, l, c, p, d, f, h, v, g = Ce.hasData(e) && Ce.get(e);
                    if (g && (u = g.events)) {
                        for (t = (t || "").match(_e) || [""], l = t.length; l--;)
                            if (s = Be.exec(t[l]) || [], f = v = s[1], h = (s[2] || "").split(".").sort(), f) {
                                for (p = oe.event.special[f] || {}, f = (i ? p.delegateType : p.bindType) || f, d = u[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) c = d[o], !r && v !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, p.remove && p.remove.call(e, c));
                                a && !d.length && (p.teardown && p.teardown.call(e, h, g.handle) !== !1 || oe.removeEvent(e, f, g.handle), delete u[f])
                            } else
                                for (f in u) oe.event.remove(e, f + t[l], n, i, !0);
                        oe.isEmptyObject(u) && Ce.remove(e, "handle events")
                    }
                },
                dispatch: function(e) {
                    e = oe.event.fix(e);
                    var t, n, i, r, o, a = [],
                        s = J.call(arguments),
                        u = (Ce.get(this, "events") || {})[e.type] || [],
                        l = oe.event.special[e.type] || {};
                    if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                        for (a = oe.event.handlers.call(this, e, u), t = 0;
                            (r = a[t++]) && !e.isPropagationStopped();)
                            for (e.currentTarget = r.elem, n = 0;
                                (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, i = ((oe.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, e), e.result
                    }
                },
                handlers: function(e, t) {
                    var n, i, r, o, a = [],
                        s = t.delegateCount,
                        u = e.target;
                    if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                        for (; u !== this; u = u.parentNode || this)
                            if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                                for (i = [], n = 0; n < s; n++) o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? oe(r, this).index(u) > -1 : oe.find(r, this, null, [u]).length), i[r] && i.push(o);
                                i.length && a.push({
                                    elem: u,
                                    handlers: i
                                })
                            }
                    return s < t.length && a.push({
                        elem: this,
                        handlers: t.slice(s)
                    }), a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, i, r, o = t.button;
                        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, i = n.documentElement, r = n.body, e.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                    }
                },
                fix: function(e) {
                    if (e[oe.expando]) return e;
                    var t, n, i, r = e.type,
                        o = e,
                        a = this.fixHooks[r];
                    for (a || (this.fixHooks[r] = a = Le.test(r) ? this.mouseHooks : Fe.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new oe.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
                    return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== v() && this.focus) return this.focus(), !1
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === v() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if ("checkbox" === this.type && this.click && oe.nodeName(this, "input")) return this.click(), !1
                        },
                        _default: function(e) {
                            return oe.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                }
            }, oe.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            }, oe.Event = function(e, t) {
                return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : h) : this.type = e, t && oe.extend(this, t), this.timeStamp = e && e.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(e, t)
            }, oe.Event.prototype = {
                constructor: oe.Event,
                isDefaultPrevented: h,
                isPropagationStopped: h,
                isImmediatePropagationStopped: h,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = f, e && !this.isSimulated && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = f, e && !this.isSimulated && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = f, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, oe.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                oe.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, i = this,
                            r = e.relatedTarget,
                            o = e.handleObj;
                        return r && (r === i || oe.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }), oe.fn.extend({
                on: function(e, t, n, i) {
                    return g(this, e, t, n, i)
                },
                one: function(e, t, n, i) {
                    return g(this, e, t, n, i, 1)
                },
                off: function(e, t, n) {
                    var i, r;
                    if (e && e.preventDefault && e.handleObj) return i = e.handleObj, oe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                    if ("object" == typeof e) {
                        for (r in e) this.off(r, t, e[r]);
                        return this
                    }
                    return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = h), this.each(function() {
                        oe.event.remove(this, e, n, t)
                    })
                }
            });
            var He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                $e = /<script|<style|<link/i,
                Ue = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Ve = /^true\/(.*)/,
                ze = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            oe.extend({
                htmlPrefilter: function(e) {
                    return e.replace(He, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var i, r, o, a, s = e.cloneNode(!0),
                        u = oe.contains(e.ownerDocument, e);
                    if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))
                        for (a = c(s), o = c(e), i = 0, r = o.length; i < r; i++) _(o[i], a[i]);
                    if (t)
                        if (n)
                            for (o = o || c(e), a = a || c(s), i = 0, r = o.length; i < r; i++) w(o[i], a[i]);
                        else w(e, s);
                    return a = c(s, "script"), a.length > 0 && p(a, !u && c(e, "script")), s
                },
                cleanData: function(e) {
                    for (var t, n, i, r = oe.event.special, o = 0; void 0 !== (n = e[o]); o++)
                        if (Te(n)) {
                            if (t = n[Ce.expando]) {
                                if (t.events)
                                    for (i in t.events) r[i] ? oe.event.remove(n, i) : oe.removeEvent(n, i, t.handle);
                                n[Ce.expando] = void 0
                            }
                            n[Se.expando] && (n[Se.expando] = void 0)
                        }
                }
            }), oe.fn.extend({
                domManip: x,
                detach: function(e) {
                    return A(this, e, !0)
                },
                remove: function(e) {
                    return A(this, e)
                },
                text: function(e) {
                    return Ae(this, function(e) {
                        return void 0 === e ? oe.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return x(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = m(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return x(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = m(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return x(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return x(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (oe.cleanData(c(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map(function() {
                        return oe.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return Ae(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            i = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !$e.test(e) && !Oe[(Me.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = oe.htmlPrefilter(e);
                            try {
                                for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (oe.cleanData(c(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (r) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return x(this, arguments, function(t) {
                        var n = this.parentNode;
                        oe.inArray(this, e) < 0 && (oe.cleanData(c(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }), oe.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                oe.fn[e] = function(e) {
                    for (var n, i = [], r = oe(e), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), oe(r[a])[t](n), Q.apply(i, n.get());
                    return this.pushStack(i)
                }
            });
            var We, Ye = {
                    HTML: "block",
                    BODY: "block"
                },
                Ge = /^margin/,
                Ke = new RegExp("^(" + Ie + ")(?!px)[a-z%]+$", "i"),
                Je = function(t) {
                    var n = t.ownerDocument.defaultView;
                    return n && n.opener || (n = e), n.getComputedStyle(t)
                },
                Xe = function(e, t, n, i) {
                    var r, o, a = {};
                    for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                    r = n.apply(e, i || []);
                    for (o in t) e.style[o] = a[o];
                    return r
                },
                Qe = K.documentElement;
            ! function() {
                function t() {
                    s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Qe.appendChild(a);
                    var t = e.getComputedStyle(s);
                    n = "1%" !== t.top, o = "2px" === t.marginLeft, i = "4px" === t.width, s.style.marginRight = "50%", r = "4px" === t.marginRight, Qe.removeChild(a)
                }
                var n, i, r, o, a = K.createElement("div"),
                    s = K.createElement("div");
                s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), oe.extend(ie, {
                    pixelPosition: function() {
                        return t(), n
                    },
                    boxSizingReliable: function() {
                        return null == i && t(), i
                    },
                    pixelMarginRight: function() {
                        return null == i && t(), r
                    },
                    reliableMarginLeft: function() {
                        return null == i && t(), o
                    },
                    reliableMarginRight: function() {
                        var t, n = s.appendChild(K.createElement("div"));
                        return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Qe.appendChild(a), t = !parseFloat(e.getComputedStyle(n).marginRight), Qe.removeChild(a), s.removeChild(n), t
                    }
                }))
            }();
            var Ze = /^(none|table(?!-c[ea]).+)/,
                et = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                tt = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                nt = ["Webkit", "O", "Moz", "ms"],
                it = K.createElement("div").style;
            oe.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = S(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": "cssFloat"
                },
                style: function(e, t, n, i) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var r, o, a, s = oe.camelCase(t),
                            u = e.style;
                        return t = oe.cssProps[s] || (oe.cssProps[s] = E(s) || s), a = oe.cssHooks[t] || oe.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : u[t] : (o = typeof n, "string" === o && (r = je.exec(n)) && r[1] && (n = l(e, t, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (oe.cssNumber[s] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (u[t] = n)), void 0)
                    }
                },
                css: function(e, t, n, i) {
                    var r, o, a, s = oe.camelCase(t);
                    return t = oe.cssProps[s] || (oe.cssProps[s] = E(s) || s), a = oe.cssHooks[t] || oe.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = S(e, t, i)), "normal" === r && t in tt && (r = tt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
                }
            }), oe.each(["height", "width"], function(e, t) {
                oe.cssHooks[t] = {
                    get: function(e, n, i) {
                        if (n) return Ze.test(oe.css(e, "display")) && 0 === e.offsetWidth ? Xe(e, et, function() {
                            return N(e, t, i)
                        }) : N(e, t, i)
                    },
                    set: function(e, n, i) {
                        var r, o = i && Je(e),
                            a = i && j(e, t, i, "border-box" === oe.css(e, "boxSizing", !1, o), o);
                        return a && (r = je.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = oe.css(e, t)), I(e, n, a)
                    }
                }
            }), oe.cssHooks.marginLeft = k(ie.reliableMarginLeft, function(e, t) {
                if (t) return (parseFloat(S(e, "marginLeft")) || e.getBoundingClientRect().left - Xe(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
            }), oe.cssHooks.marginRight = k(ie.reliableMarginRight, function(e, t) {
                if (t) return Xe(e, {
                    display: "inline-block"
                }, S, [e, "marginRight"])
            }), oe.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                oe.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + Ne[i] + t] = o[i] || o[i - 2] || o[0];
                        return r
                    }
                }, Ge.test(e) || (oe.cssHooks[e + t].set = I)
            }), oe.fn.extend({
                css: function(e, t) {
                    return Ae(this, function(e, t, n) {
                        var i, r, o = {},
                            a = 0;
                        if (oe.isArray(t)) {
                            for (i = Je(e), r = t.length; a < r; a++) o[t[a]] = oe.css(e, t[a], !1, i);
                            return o
                        }
                        return void 0 !== n ? oe.style(e, t, n) : oe.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return P(this, !0)
                },
                hide: function() {
                    return P(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        Pe(this) ? oe(this).show() : oe(this).hide()
                    })
                }
            }), oe.Tween = D, D.prototype = {
                constructor: D,
                init: function(e, t, n, i, r, o) {
                    this.elem = e, this.prop = n, this.easing = r || oe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (oe.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = D.propHooks[this.prop];
                    return e && e.get ? e.get(this) : D.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = D.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
                }
            }, D.prototype.init.prototype = D.prototype, D.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = oe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                    },
                    set: function(e) {
                        oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[oe.cssProps[e.prop]] && !oe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : oe.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, oe.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, oe.fx = D.prototype.init, oe.fx.step = {};
            var rt, ot, at = /^(?:toggle|show|hide)$/,
                st = /queueHooks$/;
            oe.Animation = oe.extend(L, {
                    tweeners: {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t);
                            return l(n.elem, e, je.exec(t), n), n
                        }]
                    },
                    tweener: function(e, t) {
                        oe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(_e);
                        for (var n, i = 0, r = e.length; i < r; i++) n = e[i], L.tweeners[n] = L.tweeners[n] || [], L.tweeners[n].unshift(t)
                    },
                    prefilters: [q],
                    prefilter: function(e, t) {
                        t ? L.prefilters.unshift(e) : L.prefilters.push(e)
                    }
                }), oe.speed = function(e, t, n) {
                    var i = e && "object" == typeof e ? oe.extend({}, e) : {
                        complete: n || !n && t || oe.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !oe.isFunction(t) && t
                    };
                    return i.duration = oe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in oe.fx.speeds ? oe.fx.speeds[i.duration] : oe.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                        oe.isFunction(i.old) && i.old.call(this), i.queue && oe.dequeue(this, i.queue)
                    }, i
                }, oe.fn.extend({
                    fadeTo: function(e, t, n, i) {
                        return this.filter(Pe).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, i)
                    },
                    animate: function(e, t, n, i) {
                        var r = oe.isEmptyObject(e),
                            o = oe.speed(t, n, i),
                            a = function() {
                                var t = L(this, oe.extend({}, e), o);
                                (r || Ce.get(this, "finish")) && t.stop(!0)
                            };
                        return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                    },
                    stop: function(e, t, n) {
                        var i = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                r = null != e && e + "queueHooks",
                                o = oe.timers,
                                a = Ce.get(this);
                            if (r) a[r] && a[r].stop && i(a[r]);
                            else
                                for (r in a) a[r] && a[r].stop && st.test(r) && i(a[r]);
                            for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                            !t && n || oe.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var t, n = Ce.get(this),
                                i = n[e + "queue"],
                                r = n[e + "queueHooks"],
                                o = oe.timers,
                                a = i ? i.length : 0;
                            for (n.finish = !0, oe.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                            for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), oe.each(["toggle", "show", "hide"], function(e, t) {
                    var n = oe.fn[t];
                    oe.fn[t] = function(e, i, r) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, i, r)
                    }
                }), oe.each({
                    slideDown: R("show"),
                    slideUp: R("hide"),
                    slideToggle: R("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, t) {
                    oe.fn[e] = function(e, n, i) {
                        return this.animate(t, e, n, i)
                    }
                }), oe.timers = [], oe.fx.tick = function() {
                    var e, t = 0,
                        n = oe.timers;
                    for (rt = oe.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                    n.length || oe.fx.stop(), rt = void 0
                }, oe.fx.timer = function(e) {
                    oe.timers.push(e), e() ? oe.fx.start() : oe.timers.pop()
                }, oe.fx.interval = 13, oe.fx.start = function() {
                    ot || (ot = e.setInterval(oe.fx.tick, oe.fx.interval))
                }, oe.fx.stop = function() {
                    e.clearInterval(ot), ot = null
                }, oe.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, oe.fn.delay = function(t, n) {
                    return t = oe.fx ? oe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                        var r = e.setTimeout(n, t);
                        i.stop = function() {
                            e.clearTimeout(r)
                        }
                    })
                },
                function() {
                    var e = K.createElement("input"),
                        t = K.createElement("select"),
                        n = t.appendChild(K.createElement("option"));
                    e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected = n.selected, t.disabled = !0, ie.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", ie.radioValue = "t" === e.value
                }();
            var ut, lt = oe.expr.attrHandle;
            oe.fn.extend({
                attr: function(e, t) {
                    return Ae(this, oe.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        oe.removeAttr(this, e)
                    })
                }
            }), oe.extend({
                attr: function(e, t, n) {
                    var i, r, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? oe.prop(e, t, n) : (1 === o && oe.isXMLDoc(e) || (t = t.toLowerCase(), r = oe.attrHooks[t] || (oe.expr.match.bool.test(t) ? ut : void 0)), void 0 !== n ? null === n ? void oe.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = oe.find.attr(e, t), null == i ? void 0 : i))
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!ie.radioValue && "radio" === t && oe.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, i, r = 0,
                        o = t && t.match(_e);
                    if (o && 1 === e.nodeType)
                        for (; n = o[r++];) i = oe.propFix[n] || n, oe.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
                }
            }), ut = {
                set: function(e, t, n) {
                    return t === !1 ? oe.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            }, oe.each(oe.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = lt[t] || oe.find.attr;
                lt[t] = function(e, t, i) {
                    var r, o;
                    return i || (o = lt[t], lt[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, lt[t] = o), r
                }
            });
            var ct = /^(?:input|select|textarea|button)$/i,
                pt = /^(?:a|area)$/i;
            oe.fn.extend({
                prop: function(e, t) {
                    return Ae(this, oe.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return this.each(function() {
                        delete this[oe.propFix[e] || e]
                    })
                }
            }), oe.extend({
                prop: function(e, t, n) {
                    var i, r, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && oe.isXMLDoc(e) || (t = oe.propFix[t] || t, r = oe.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = oe.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : ct.test(e.nodeName) || pt.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                }
            }), ie.optSelected || (oe.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                }
            }), oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                oe.propFix[this.toLowerCase()] = this
            });
            var dt = /[\t\r\n\f]/g;
            oe.fn.extend({
                addClass: function(e) {
                    var t, n, i, r, o, a, s, u = 0;
                    if (oe.isFunction(e)) return this.each(function(t) {
                        oe(this).addClass(e.call(this, t, B(this)))
                    });
                    if ("string" == typeof e && e)
                        for (t = e.match(_e) || []; n = this[u++];)
                            if (r = B(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                                for (a = 0; o = t[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                                s = oe.trim(i), r !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t, n, i, r, o, a, s, u = 0;
                    if (oe.isFunction(e)) return this.each(function(t) {
                        oe(this).removeClass(e.call(this, t, B(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if ("string" == typeof e && e)
                        for (t = e.match(_e) || []; n = this[u++];)
                            if (r = B(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                                for (a = 0; o = t[a++];)
                                    for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                                s = oe.trim(i), r !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : oe.isFunction(e) ? this.each(function(n) {
                        oe(this).toggleClass(e.call(this, n, B(this), t), t)
                    }) : this.each(function() {
                        var t, i, r, o;
                        if ("string" === n)
                            for (i = 0, r = oe(this), o = e.match(_e) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                        else void 0 !== e && "boolean" !== n || (t = B(this), t && Ce.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ce.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, n, i = 0;
                    for (t = " " + e + " "; n = this[i++];)
                        if (1 === n.nodeType && (" " + B(n) + " ").replace(dt, " ").indexOf(t) > -1) return !0;
                    return !1
                }
            });
            var ft = /\r/g,
                ht = /[\x20\t\r\n\f]+/g;
            oe.fn.extend({
                val: function(e) {
                    var t, n, i, r = this[0]; {
                        if (arguments.length) return i = oe.isFunction(e), this.each(function(n) {
                            var r;
                            1 === this.nodeType && (r = i ? e.call(this, n, oe(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : oe.isArray(r) && (r = oe.map(r, function(e) {
                                return null == e ? "" : e + ""
                            })), t = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                        });
                        if (r) return t = oe.valHooks[r.type] || oe.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(ft, "") : null == n ? "" : n)
                    }
                }
            }), oe.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = oe.find.attr(e, "value");
                            return null != t ? t : oe.trim(oe.text(e)).replace(ht, " ")
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, a = o ? null : [], s = o ? r + 1 : i.length, u = r < 0 ? s : o ? r : 0; u < s; u++)
                                if (n = i[u], (n.selected || u === r) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !oe.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = oe(n).val(), o) return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            for (var n, i, r = e.options, o = oe.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = oe.inArray(oe.valHooks.option.get(i), o) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), o
                        }
                    }
                }
            }), oe.each(["radio", "checkbox"], function() {
                oe.valHooks[this] = {
                    set: function(e, t) {
                        if (oe.isArray(t)) return e.checked = oe.inArray(oe(e).val(), t) > -1
                    }
                }, ie.checkOn || (oe.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            });
            var vt = /^(?:focusinfocus|focusoutblur)$/;
            oe.extend(oe.event, {
                trigger: function(t, n, i, r) {
                    var o, a, s, u, l, c, p, d = [i || K],
                        f = ne.call(t, "type") ? t.type : t,
                        h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (a = s = i = i || K, 3 !== i.nodeType && 8 !== i.nodeType && !vt.test(f + oe.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), l = f.indexOf(":") < 0 && "on" + f, t = t[oe.expando] ? t : new oe.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : oe.makeArray(n, [t]), p = oe.event.special[f] || {}, r || !p.trigger || p.trigger.apply(i, n) !== !1)) {
                        if (!r && !p.noBubble && !oe.isWindow(i)) {
                            for (u = p.delegateType || f, vt.test(u + f) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
                            s === (i.ownerDocument || K) && d.push(s.defaultView || s.parentWindow || e)
                        }
                        for (o = 0;
                            (a = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u : p.bindType || f, c = (Ce.get(a, "events") || {})[t.type] && Ce.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && Te(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
                        return t.type = f, r || t.isDefaultPrevented() || p._default && p._default.apply(d.pop(), n) !== !1 || !Te(i) || l && oe.isFunction(i[f]) && !oe.isWindow(i) && (s = i[l], s && (i[l] = null), oe.event.triggered = f, i[f](), oe.event.triggered = void 0, s && (i[l] = s)), t.result
                    }
                },
                simulate: function(e, t, n) {
                    var i = oe.extend(new oe.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    oe.event.trigger(i, null, t)
                }
            }), oe.fn.extend({
                trigger: function(e, t) {
                    return this.each(function() {
                        oe.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n) return oe.event.trigger(e, t, n, !0)
                }
            }), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                oe.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), oe.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }), ie.focusin = "onfocusin" in e, ie.focusin || oe.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    oe.event.simulate(t, e.target, oe.event.fix(e))
                };
                oe.event.special[t] = {
                    setup: function() {
                        var i = this.ownerDocument || this,
                            r = Ce.access(i, t);
                        r || i.addEventListener(e, n, !0), Ce.access(i, t, (r || 0) + 1)
                    },
                    teardown: function() {
                        var i = this.ownerDocument || this,
                            r = Ce.access(i, t) - 1;
                        r ? Ce.access(i, t, r) : (i.removeEventListener(e, n, !0), Ce.remove(i, t))
                    }
                }
            });
            var gt = e.location,
                mt = oe.now(),
                yt = /\?/;
            oe.parseJSON = function(e) {
                return JSON.parse(e + "")
            }, oe.parseXML = function(t) {
                var n;
                if (!t || "string" != typeof t) return null;
                try {
                    n = (new e.DOMParser).parseFromString(t, "text/xml")
                } catch (i) {
                    n = void 0
                }
                return n && !n.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + t), n
            };
            var bt = /#.*$/,
                wt = /([?&])_=[^&]*/,
                _t = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                xt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                At = /^(?:GET|HEAD)$/,
                Tt = /^\/\//,
                Ct = {},
                St = {},
                kt = "*/".concat("*"),
                Et = K.createElement("a");
            Et.href = gt.href, oe.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: gt.href,
                    type: "GET",
                    isLocal: xt.test(gt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": kt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": oe.parseJSON,
                        "text xml": oe.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? U(U(e, oe.ajaxSettings), t) : U(oe.ajaxSettings, e)
                },
                ajaxPrefilter: H(Ct),
                ajaxTransport: H(St),
                ajax: function(t, n) {
                    function i(t, n, i, s) {
                        var l, p, y, b, _, A = n;
                        2 !== w && (w = 2, u && e.clearTimeout(u), r = void 0, a = s || "", x.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, i && (b = V(d, x, i)), b = z(d, b, x, l), l ? (d.ifModified && (_ = x.getResponseHeader("Last-Modified"), _ && (oe.lastModified[o] = _), _ = x.getResponseHeader("etag"), _ && (oe.etag[o] = _)), 204 === t || "HEAD" === d.type ? A = "nocontent" : 304 === t ? A = "notmodified" : (A = b.state, p = b.data, y = b.error, l = !y)) : (y = A, !t && A || (A = "error", t < 0 && (t = 0))), x.status = t, x.statusText = (n || A) + "", l ? v.resolveWith(f, [p, A, x]) : v.rejectWith(f, [x, A, y]), x.statusCode(m), m = void 0, c && h.trigger(l ? "ajaxSuccess" : "ajaxError", [x, d, l ? p : y]), g.fireWith(f, [x, A]), c && (h.trigger("ajaxComplete", [x, d]), --oe.active || oe.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (n = t, t = void 0), n = n || {};
                    var r, o, a, s, u, l, c, p, d = oe.ajaxSetup({}, n),
                        f = d.context || d,
                        h = d.context && (f.nodeType || f.jquery) ? oe(f) : oe.event,
                        v = oe.Deferred(),
                        g = oe.Callbacks("once memory"),
                        m = d.statusCode || {},
                        y = {},
                        b = {},
                        w = 0,
                        _ = "canceled",
                        x = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (2 === w) {
                                    if (!s)
                                        for (s = {}; t = _t.exec(a);) s[t[1].toLowerCase()] = t[2];
                                    t = s[e.toLowerCase()]
                                }
                                return null == t ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return 2 === w ? a : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return w || (e = b[n] = b[n] || e, y[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return w || (d.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (w < 2)
                                        for (t in e) m[t] = [m[t], e[t]];
                                    else x.always(e[x.status]);
                                return this
                            },
                            abort: function(e) {
                                var t = e || _;
                                return r && r.abort(t), i(0, t), this
                            }
                        };
                    if (v.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((t || d.url || gt.href) + "").replace(bt, "").replace(Tt, gt.protocol + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = oe.trim(d.dataType || "*").toLowerCase().match(_e) || [""], null == d.crossDomain) {
                        l = K.createElement("a");
                        try {
                            l.href = d.url, l.href = l.href, d.crossDomain = Et.protocol + "//" + Et.host != l.protocol + "//" + l.host
                        } catch (A) {
                            d.crossDomain = !0
                        }
                    }
                    if (d.data && d.processData && "string" != typeof d.data && (d.data = oe.param(d.data, d.traditional)), $(Ct, d, n, x), 2 === w) return x;
                    c = oe.event && d.global, c && 0 === oe.active++ && oe.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !At.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (yt.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = wt.test(o) ? o.replace(wt, "$1_=" + mt++) : o + (yt.test(o) ? "&" : "?") + "_=" + mt++)), d.ifModified && (oe.lastModified[o] && x.setRequestHeader("If-Modified-Since", oe.lastModified[o]), oe.etag[o] && x.setRequestHeader("If-None-Match", oe.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + kt + "; q=0.01" : "") : d.accepts["*"]);
                    for (p in d.headers) x.setRequestHeader(p, d.headers[p]);
                    if (d.beforeSend && (d.beforeSend.call(f, x, d) === !1 || 2 === w)) return x.abort();
                    _ = "abort";
                    for (p in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) x[p](d[p]);
                    if (r = $(St, d, n, x)) {
                        if (x.readyState = 1, c && h.trigger("ajaxSend", [x, d]), 2 === w) return x;
                        d.async && d.timeout > 0 && (u = e.setTimeout(function() {
                            x.abort("timeout")
                        }, d.timeout));
                        try {
                            w = 1, r.send(y, i)
                        } catch (A) {
                            if (!(w < 2)) throw A;
                            i(-1, A)
                        }
                    } else i(-1, "No Transport");
                    return x
                },
                getJSON: function(e, t, n) {
                    return oe.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return oe.get(e, void 0, t, "script")
                }
            }), oe.each(["get", "post"], function(e, t) {
                oe[t] = function(e, n, i, r) {
                    return oe.isFunction(n) && (r = r || i, i = n, n = void 0), oe.ajax(oe.extend({
                        url: e,
                        type: t,
                        dataType: r,
                        data: n,
                        success: i
                    }, oe.isPlainObject(e) && e))
                }
            }), oe._evalUrl = function(e) {
                return oe.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, oe.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return oe.isFunction(e) ? this.each(function(t) {
                        oe(this).wrapAll(e.call(this, t))
                    }) : (this[0] && (t = oe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                        return e
                    }).append(this)), this)
                },
                wrapInner: function(e) {
                    return oe.isFunction(e) ? this.each(function(t) {
                        oe(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = oe(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = oe.isFunction(e);
                    return this.each(function(n) {
                        oe(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), oe.expr.filters.hidden = function(e) {
                return !oe.expr.filters.visible(e)
            }, oe.expr.filters.visible = function(e) {
                return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
            };
            var It = /%20/g,
                jt = /\[\]$/,
                Nt = /\r?\n/g,
                Pt = /^(?:submit|button|image|reset|file)$/i,
                Dt = /^(?:input|select|textarea|keygen)/i;
            oe.param = function(e, t) {
                var n, i = [],
                    r = function(e, t) {
                        t = oe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function() {
                    r(this.name, this.value)
                });
                else
                    for (n in e) W(n, e[n], t, r);
                return i.join("&").replace(It, "+")
            }, oe.fn.extend({
                serialize: function() {
                    return oe.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = oe.prop(this, "elements");
                        return e ? oe.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !oe(this).is(":disabled") && Dt.test(this.nodeName) && !Pt.test(e) && (this.checked || !De.test(e))
                    }).map(function(e, t) {
                        var n = oe(this).val();
                        return null == n ? null : oe.isArray(n) ? oe.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(Nt, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(Nt, "\r\n")
                        }
                    }).get()
                }
            }), oe.ajaxSettings.xhr = function() {
                try {
                    return new e.XMLHttpRequest
                } catch (t) {}
            };
            var Mt = {
                    0: 200,
                    1223: 204
                },
                Rt = oe.ajaxSettings.xhr();
            ie.cors = !!Rt && "withCredentials" in Rt, ie.ajax = Rt = !!Rt, oe.ajaxTransport(function(t) {
                var n, i;
                if (ie.cors || Rt && !t.crossDomain) return {
                    send: function(r, o) {
                        var a, s = t.xhr();
                        if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                            for (a in t.xhrFields) s[a] = t.xhrFields[a];
                        t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        for (a in r) s.setRequestHeader(a, r[a]);
                        n = function(e) {
                            return function() {
                                n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Mt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()))
                            }
                        }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function() {
                            4 === s.readyState && e.setTimeout(function() {
                                n && i()
                            })
                        }, n = n("abort");
                        try {
                            s.send(t.hasContent && t.data || null)
                        } catch (u) {
                            if (n) throw u
                        }
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }), oe.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return oe.globalEval(e), e
                    }
                }
            }), oe.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
            }), oe.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n;
                    return {
                        send: function(i, r) {
                            t = oe("<script>").prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                            }), K.head.appendChild(t[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }
            });
            var Ot = [],
                qt = /(=)\?(?=&|$)|\?\?/;
            oe.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = Ot.pop() || oe.expando + "_" + mt++;
                    return this[e] = !0, e
                }
            }), oe.ajaxPrefilter("json jsonp", function(t, n, i) {
                var r, o, a, s = t.jsonp !== !1 && (qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && qt.test(t.data) && "data");
                if (s || "jsonp" === t.dataTypes[0]) return r = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(qt, "$1" + r) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
                    return a || oe.error(r + " was not called"), a[0]
                }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
                    a = arguments
                }, i.always(function() {
                    void 0 === o ? oe(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Ot.push(r)), a && oe.isFunction(o) && o(a[0]), a = o = void 0
                }), "script"
            }), oe.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || K;
                var i = he.exec(e),
                    r = !n && [];
                return i ? [t.createElement(i[1])] : (i = d([e], t, r), r && r.length && oe(r).remove(), oe.merge([], i.childNodes))
            };
            var Ft = oe.fn.load;
            oe.fn.load = function(e, t, n) {
                if ("string" != typeof e && Ft) return Ft.apply(this, arguments);
                var i, r, o, a = this,
                    s = e.indexOf(" ");
                return s > -1 && (i = oe.trim(e.slice(s)), e = e.slice(0, s)), oe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && oe.ajax({
                    url: e,
                    type: r || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    o = arguments, a.html(i ? oe("<div>").append(oe.parseHTML(e)).find(i) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(this, o || [e.responseText, t, e])
                    })
                }), this
            }, oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                oe.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), oe.expr.filters.animated = function(e) {
                return oe.grep(oe.timers, function(t) {
                    return e === t.elem
                }).length
            }, oe.offset = {
                setOffset: function(e, t, n) {
                    var i, r, o, a, s, u, l, c = oe.css(e, "position"),
                        p = oe(e),
                        d = {};
                    "static" === c && (e.style.position = "relative"), s = p.offset(), o = oe.css(e, "top"), u = oe.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (i = p.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(u) || 0), oe.isFunction(t) && (t = t.call(e, n, oe.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), "using" in t ? t.using.call(e, d) : p.css(d)
                }
            }, oe.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                        oe.offset.setOffset(this, e, t)
                    });
                    var t, n, i = this[0],
                        r = {
                            top: 0,
                            left: 0
                        },
                        o = i && i.ownerDocument;
                    if (o) return t = o.documentElement, oe.contains(t, i) ? (r = i.getBoundingClientRect(), n = Y(o), {
                        top: r.top + n.pageYOffset - t.clientTop,
                        left: r.left + n.pageXOffset - t.clientLeft
                    }) : r
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = this[0],
                            i = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === oe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), oe.nodeName(e[0], "html") || (i = e.offset()), i.top += oe.css(e[0], "borderTopWidth", !0), i.left += oe.css(e[0], "borderLeftWidth", !0)), {
                            top: t.top - i.top - oe.css(n, "marginTop", !0),
                            left: t.left - i.left - oe.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && "static" === oe.css(e, "position");) e = e.offsetParent;
                        return e || Qe
                    })
                }
            }), oe.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = "pageYOffset" === t;
                oe.fn[e] = function(i) {
                    return Ae(this, function(e, i, r) {
                        var o = Y(e);
                        return void 0 === r ? o ? o[t] : e[i] : void(o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r)
                    }, e, i, arguments.length)
                }
            }), oe.each(["top", "left"], function(e, t) {
                oe.cssHooks[t] = k(ie.pixelPosition, function(e, n) {
                    if (n) return n = S(e, t), Ke.test(n) ? oe(e).position()[t] + "px" : n
                })
            }), oe.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                oe.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, i) {
                    oe.fn[i] = function(i, r) {
                        var o = arguments.length && (n || "boolean" != typeof i),
                            a = n || (i === !0 || r === !0 ? "margin" : "border");
                        return Ae(this, function(t, n, i) {
                            var r;
                            return oe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? oe.css(t, n, a) : oe.style(t, n, i, a)
                        }, t, o ? i : void 0, o, null)
                    }
                })
            }), oe.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, i) {
                    return this.on(t, e, n, i)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                },
                size: function() {
                    return this.length
                }
            }), oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return oe
            });
            var Lt = e.jQuery,
                Bt = e.$;
            return oe.noConflict = function(t) {
                return e.$ === oe && (e.$ = Bt), t && e.jQuery === oe && (e.jQuery = Lt), oe
            }, t || (e.jQuery = e.$ = oe), oe
        })
    }, {}],
    12: [function(e, t, n) {
        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (p === setTimeout) return setTimeout(e, 0);
            if ((p === i || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);
            try {
                return p(e, 0)
            } catch (t) {
                try {
                    return p.call(null, e, 0)
                } catch (t) {
                    return p.call(this, e, 0)
                }
            }
        }

        function a(e) {
            if (d === clearTimeout) return clearTimeout(e);
            if ((d === r || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
            try {
                return d(e)
            } catch (t) {
                try {
                    return d.call(null, e)
                } catch (t) {
                    return d.call(this, e)
                }
            }
        }

        function s() {
            g && h && (g = !1, h.length ? v = h.concat(v) : m = -1, v.length && u())
        }

        function u() {
            if (!g) {
                var e = o(s);
                g = !0;
                for (var t = v.length; t;) {
                    for (h = v, v = []; ++m < t;) h && h[m].run();
                    m = -1, t = v.length
                }
                h = null, g = !1, a(e)
            }
        }

        function l(e, t) {
            this.fun = e, this.array = t
        }

        function c() {}
        var p, d, f = t.exports = {};
        ! function() {
            try {
                p = "function" == typeof setTimeout ? setTimeout : i
            } catch (e) {
                p = i
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                d = r
            }
        }();
        var h, v = [],
            g = !1,
            m = -1;
        f.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            v.push(new l(e, t)), 1 !== v.length || g || o(u)
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, f.removeAllListeners = c, f.emit = c, f.prependListener = c, f.prependOnceListener = c, f.listeners = function(e) {
            return []
        }, f.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, f.cwd = function() {
            return "/"
        }, f.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, f.umask = function() {
            return 0
        }
    }, {}],
    13: [function(e, t, n) {
        (function(n, i) {
            ! function(r) {
                "use strict";

                function o(e, t) {
                    if (t = t || {
                            type: "Array"
                        }, "undefined" != typeof n && "number" == typeof n.pid) return a(e, t);
                    var i = window.crypto || window.msCrypto;
                    if (!i) throw new Error("Your browser does not support window.crypto.");
                    return s(e, t)
                }

                function a(t, n) {
                    var i = e("crypto"),
                        r = i.randomBytes(t);
                    switch (n.type) {
                        case "Array":
                            return [].slice.call(r);
                        case "Buffer":
                            return r;
                        case "Uint8Array":
                            for (var o = new Uint8Array(t), a = 0; a < t; ++a) o[a] = r.readUInt8(a);
                            return o;
                        default:
                            throw new Error(n.type + " is unsupported.")
                    }
                }

                function s(e, t) {
                    var n = new Uint8Array(e),
                        r = window.crypto || window.msCrypto;
                    switch (r.getRandomValues(n), t.type) {
                        case "Array":
                            return [].slice.call(n);
                        case "Buffer":
                            try {
                                new i(1)
                            } catch (o) {
                                throw new Error("Buffer not supported in this environment. Use Node.js or Browserify for browser support.")
                            }
                            return new i(n);
                        case "Uint8Array":
                            return n;
                        default:
                            throw new Error(t.type + " is unsupported.")
                    }
                }
                "undefined" != typeof define && define.amd ? define([], function() {
                    return o
                }) : "undefined" != typeof t && t.exports ? t.exports = o : r.secureRandom = o, o.randomArray = function(e) {
                    return o(e, {
                        type: "Array"
                    })
                }, o.randomUint8Array = function(e) {
                    return o(e, {
                        type: "Uint8Array"
                    })
                }, o.randomBuffer = function(e) {
                    return o(e, {
                        type: "Buffer"
                    })
                }
            }(this)
        }).call(this, e("_process"), e("buffer").Buffer)
    }, {
        _process: 12,
        buffer: 6,
        crypto: 5
    }],
    14: [function(e, t, n) {
        (function() {
            function e(e) {
                function t(t, n, i, r, o, a) {
                    for (; o >= 0 && o < a; o += e) {
                        var s = r ? r[o] : o;
                        i = n(i, t[s], s, t)
                    }
                    return i
                }
                return function(n, i, r, o) {
                    i = _(i, o, 4);
                    var a = !E(n) && w.keys(n),
                        s = (a || n).length,
                        u = e > 0 ? 0 : s - 1;
                    return arguments.length < 3 && (r = n[a ? a[u] : u], u += e), t(n, i, r, a, u, s)
                }
            }

            function i(e) {
                return function(t, n, i) {
                    n = x(n, i);
                    for (var r = k(t), o = e > 0 ? 0 : r - 1; o >= 0 && o < r; o += e)
                        if (n(t[o], o, t)) return o;
                    return -1
                }
            }

            function r(e, t, n) {
                return function(i, r, o) {
                    var a = 0,
                        s = k(i);
                    if ("number" == typeof o) e > 0 ? a = o >= 0 ? o : Math.max(o + s, a) : s = o >= 0 ? Math.min(o + 1, s) : o + s + 1;
                    else if (n && o && s) return o = n(i, r), i[o] === r ? o : -1;
                    if (r !== r) return o = t(d.call(i, a, s), w.isNaN), o >= 0 ? o + a : -1;
                    for (o = e > 0 ? a : s - 1; o >= 0 && o < s; o += e)
                        if (i[o] === r) return o;
                    return -1
                }
            }

            function o(e, t) {
                var n = D.length,
                    i = e.constructor,
                    r = w.isFunction(i) && i.prototype || l,
                    o = "constructor";
                for (w.has(e, o) && !w.contains(t, o) && t.push(o); n--;) o = D[n], o in e && e[o] !== r[o] && !w.contains(t, o) && t.push(o)
            }
            var a = this,
                s = a._,
                u = Array.prototype,
                l = Object.prototype,
                c = Function.prototype,
                p = u.push,
                d = u.slice,
                f = l.toString,
                h = l.hasOwnProperty,
                v = Array.isArray,
                g = Object.keys,
                m = c.bind,
                y = Object.create,
                b = function() {},
                w = function(e) {
                    return e instanceof w ? e : this instanceof w ? void(this._wrapped = e) : new w(e)
                };
            "undefined" != typeof n ? ("undefined" != typeof t && t.exports && (n = t.exports = w), n._ = w) : a._ = w, w.VERSION = "1.8.3";
            var _ = function(e, t, n) {
                    if (void 0 === t) return e;
                    switch (null == n ? 3 : n) {
                        case 1:
                            return function(n) {
                                return e.call(t, n)
                            };
                        case 2:
                            return function(n, i) {
                                return e.call(t, n, i)
                            };
                        case 3:
                            return function(n, i, r) {
                                return e.call(t, n, i, r)
                            };
                        case 4:
                            return function(n, i, r, o) {
                                return e.call(t, n, i, r, o)
                            }
                    }
                    return function() {
                        return e.apply(t, arguments)
                    }
                },
                x = function(e, t, n) {
                    return null == e ? w.identity : w.isFunction(e) ? _(e, t, n) : w.isObject(e) ? w.matcher(e) : w.property(e)
                };
            w.iteratee = function(e, t) {
                return x(e, t, 1 / 0)
            };
            var A = function(e, t) {
                    return function(n) {
                        var i = arguments.length;
                        if (i < 2 || null == n) return n;
                        for (var r = 1; r < i; r++)
                            for (var o = arguments[r], a = e(o), s = a.length, u = 0; u < s; u++) {
                                var l = a[u];
                                t && void 0 !== n[l] || (n[l] = o[l])
                            }
                        return n
                    }
                },
                T = function(e) {
                    if (!w.isObject(e)) return {};
                    if (y) return y(e);
                    b.prototype = e;
                    var t = new b;
                    return b.prototype = null, t
                },
                C = function(e) {
                    return function(t) {
                        return null == t ? void 0 : t[e]
                    }
                },
                S = Math.pow(2, 53) - 1,
                k = C("length"),
                E = function(e) {
                    var t = k(e);
                    return "number" == typeof t && t >= 0 && t <= S
                };
            w.each = w.forEach = function(e, t, n) {
                t = _(t, n);
                var i, r;
                if (E(e))
                    for (i = 0, r = e.length; i < r; i++) t(e[i], i, e);
                else {
                    var o = w.keys(e);
                    for (i = 0, r = o.length; i < r; i++) t(e[o[i]], o[i], e)
                }
                return e
            }, w.map = w.collect = function(e, t, n) {
                t = x(t, n);
                for (var i = !E(e) && w.keys(e), r = (i || e).length, o = Array(r), a = 0; a < r; a++) {
                    var s = i ? i[a] : a;
                    o[a] = t(e[s], s, e)
                }
                return o
            }, w.reduce = w.foldl = w.inject = e(1), w.reduceRight = w.foldr = e(-1), w.find = w.detect = function(e, t, n) {
                var i;
                if (i = E(e) ? w.findIndex(e, t, n) : w.findKey(e, t, n), void 0 !== i && i !== -1) return e[i]
            }, w.filter = w.select = function(e, t, n) {
                var i = [];
                return t = x(t, n), w.each(e, function(e, n, r) {
                    t(e, n, r) && i.push(e)
                }), i
            }, w.reject = function(e, t, n) {
                return w.filter(e, w.negate(x(t)), n)
            }, w.every = w.all = function(e, t, n) {
                t = x(t, n);
                for (var i = !E(e) && w.keys(e), r = (i || e).length, o = 0; o < r; o++) {
                    var a = i ? i[o] : o;
                    if (!t(e[a], a, e)) return !1
                }
                return !0
            }, w.some = w.any = function(e, t, n) {
                t = x(t, n);
                for (var i = !E(e) && w.keys(e), r = (i || e).length, o = 0; o < r; o++) {
                    var a = i ? i[o] : o;
                    if (t(e[a], a, e)) return !0
                }
                return !1
            }, w.contains = w.includes = w.include = function(e, t, n, i) {
                return E(e) || (e = w.values(e)), ("number" != typeof n || i) && (n = 0), w.indexOf(e, t, n) >= 0
            }, w.invoke = function(e, t) {
                var n = d.call(arguments, 2),
                    i = w.isFunction(t);
                return w.map(e, function(e) {
                    var r = i ? t : e[t];
                    return null == r ? r : r.apply(e, n)
                })
            }, w.pluck = function(e, t) {
                return w.map(e, w.property(t))
            }, w.where = function(e, t) {
                return w.filter(e, w.matcher(t))
            }, w.findWhere = function(e, t) {
                return w.find(e, w.matcher(t))
            }, w.max = function(e, t, n) {
                var i, r, o = -(1 / 0),
                    a = -(1 / 0);
                if (null == t && null != e) {
                    e = E(e) ? e : w.values(e);
                    for (var s = 0, u = e.length; s < u; s++) i = e[s], i > o && (o = i)
                } else t = x(t, n), w.each(e, function(e, n, i) {
                    r = t(e, n, i), (r > a || r === -(1 / 0) && o === -(1 / 0)) && (o = e, a = r)
                });
                return o
            }, w.min = function(e, t, n) {
                var i, r, o = 1 / 0,
                    a = 1 / 0;
                if (null == t && null != e) {
                    e = E(e) ? e : w.values(e);
                    for (var s = 0, u = e.length; s < u; s++) i = e[s], i < o && (o = i)
                } else t = x(t, n), w.each(e, function(e, n, i) {
                    r = t(e, n, i), (r < a || r === 1 / 0 && o === 1 / 0) && (o = e, a = r)
                });
                return o
            }, w.shuffle = function(e) {
                for (var t, n = E(e) ? e : w.values(e), i = n.length, r = Array(i), o = 0; o < i; o++) t = w.random(0, o), t !== o && (r[o] = r[t]), r[t] = n[o];
                return r
            }, w.sample = function(e, t, n) {
                return null == t || n ? (E(e) || (e = w.values(e)), e[w.random(e.length - 1)]) : w.shuffle(e).slice(0, Math.max(0, t))
            }, w.sortBy = function(e, t, n) {
                return t = x(t, n), w.pluck(w.map(e, function(e, n, i) {
                    return {
                        value: e,
                        index: n,
                        criteria: t(e, n, i)
                    }
                }).sort(function(e, t) {
                    var n = e.criteria,
                        i = t.criteria;
                    if (n !== i) {
                        if (n > i || void 0 === n) return 1;
                        if (n < i || void 0 === i) return -1
                    }
                    return e.index - t.index
                }), "value")
            };
            var I = function(e) {
                return function(t, n, i) {
                    var r = {};
                    return n = x(n, i), w.each(t, function(i, o) {
                        var a = n(i, o, t);
                        e(r, i, a)
                    }), r
                }
            };
            w.groupBy = I(function(e, t, n) {
                w.has(e, n) ? e[n].push(t) : e[n] = [t]
            }), w.indexBy = I(function(e, t, n) {
                e[n] = t
            }), w.countBy = I(function(e, t, n) {
                w.has(e, n) ? e[n]++ : e[n] = 1
            }), w.toArray = function(e) {
                return e ? w.isArray(e) ? d.call(e) : E(e) ? w.map(e, w.identity) : w.values(e) : []
            }, w.size = function(e) {
                return null == e ? 0 : E(e) ? e.length : w.keys(e).length
            }, w.partition = function(e, t, n) {
                t = x(t, n);
                var i = [],
                    r = [];
                return w.each(e, function(e, n, o) {
                    (t(e, n, o) ? i : r).push(e)
                }), [i, r]
            }, w.first = w.head = w.take = function(e, t, n) {
                if (null != e) return null == t || n ? e[0] : w.initial(e, e.length - t)
            }, w.initial = function(e, t, n) {
                return d.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
            }, w.last = function(e, t, n) {
                if (null != e) return null == t || n ? e[e.length - 1] : w.rest(e, Math.max(0, e.length - t))
            }, w.rest = w.tail = w.drop = function(e, t, n) {
                return d.call(e, null == t || n ? 1 : t)
            }, w.compact = function(e) {
                return w.filter(e, w.identity)
            };
            var j = function(e, t, n, i) {
                for (var r = [], o = 0, a = i || 0, s = k(e); a < s; a++) {
                    var u = e[a];
                    if (E(u) && (w.isArray(u) || w.isArguments(u))) {
                        t || (u = j(u, t, n));
                        var l = 0,
                            c = u.length;
                        for (r.length += c; l < c;) r[o++] = u[l++]
                    } else n || (r[o++] = u)
                }
                return r
            };
            w.flatten = function(e, t) {
                return j(e, t, !1)
            }, w.without = function(e) {
                return w.difference(e, d.call(arguments, 1))
            }, w.uniq = w.unique = function(e, t, n, i) {
                w.isBoolean(t) || (i = n, n = t, t = !1), null != n && (n = x(n, i));
                for (var r = [], o = [], a = 0, s = k(e); a < s; a++) {
                    var u = e[a],
                        l = n ? n(u, a, e) : u;
                    t ? (a && o === l || r.push(u), o = l) : n ? w.contains(o, l) || (o.push(l), r.push(u)) : w.contains(r, u) || r.push(u)
                }
                return r
            }, w.union = function() {
                return w.uniq(j(arguments, !0, !0))
            }, w.intersection = function(e) {
                for (var t = [], n = arguments.length, i = 0, r = k(e); i < r; i++) {
                    var o = e[i];
                    if (!w.contains(t, o)) {
                        for (var a = 1; a < n && w.contains(arguments[a], o); a++);
                        a === n && t.push(o)
                    }
                }
                return t
            }, w.difference = function(e) {
                var t = j(arguments, !0, !0, 1);
                return w.filter(e, function(e) {
                    return !w.contains(t, e)
                })
            }, w.zip = function() {
                return w.unzip(arguments)
            }, w.unzip = function(e) {
                for (var t = e && w.max(e, k).length || 0, n = Array(t), i = 0; i < t; i++) n[i] = w.pluck(e, i);
                return n
            }, w.object = function(e, t) {
                for (var n = {}, i = 0, r = k(e); i < r; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
                return n
            }, w.findIndex = i(1), w.findLastIndex = i(-1), w.sortedIndex = function(e, t, n, i) {
                n = x(n, i, 1);
                for (var r = n(t), o = 0, a = k(e); o < a;) {
                    var s = Math.floor((o + a) / 2);
                    n(e[s]) < r ? o = s + 1 : a = s
                }
                return o
            }, w.indexOf = r(1, w.findIndex, w.sortedIndex), w.lastIndexOf = r(-1, w.findLastIndex), w.range = function(e, t, n) {
                null == t && (t = e || 0, e = 0), n = n || 1;
                for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), o = 0; o < i; o++, e += n) r[o] = e;
                return r
            };
            var N = function(e, t, n, i, r) {
                if (!(i instanceof t)) return e.apply(n, r);
                var o = T(e.prototype),
                    a = e.apply(o, r);
                return w.isObject(a) ? a : o
            };
            w.bind = function(e, t) {
                if (m && e.bind === m) return m.apply(e, d.call(arguments, 1));
                if (!w.isFunction(e)) throw new TypeError("Bind must be called on a function");
                var n = d.call(arguments, 2),
                    i = function() {
                        return N(e, i, t, this, n.concat(d.call(arguments)))
                    };
                return i
            }, w.partial = function(e) {
                var t = d.call(arguments, 1),
                    n = function() {
                        for (var i = 0, r = t.length, o = Array(r), a = 0; a < r; a++) o[a] = t[a] === w ? arguments[i++] : t[a];
                        for (; i < arguments.length;) o.push(arguments[i++]);
                        return N(e, n, this, this, o)
                    };
                return n
            }, w.bindAll = function(e) {
                var t, n, i = arguments.length;
                if (i <= 1) throw new Error("bindAll must be passed function names");
                for (t = 1; t < i; t++) n = arguments[t], e[n] = w.bind(e[n], e);
                return e
            }, w.memoize = function(e, t) {
                var n = function(i) {
                    var r = n.cache,
                        o = "" + (t ? t.apply(this, arguments) : i);
                    return w.has(r, o) || (r[o] = e.apply(this, arguments)), r[o]
                };
                return n.cache = {}, n
            }, w.delay = function(e, t) {
                var n = d.call(arguments, 2);
                return setTimeout(function() {
                    return e.apply(null, n)
                }, t)
            }, w.defer = w.partial(w.delay, w, 1), w.throttle = function(e, t, n) {
                var i, r, o, a = null,
                    s = 0;
                n || (n = {});
                var u = function() {
                    s = n.leading === !1 ? 0 : w.now(), a = null, o = e.apply(i, r), a || (i = r = null)
                };
                return function() {
                    var l = w.now();
                    s || n.leading !== !1 || (s = l);
                    var c = t - (l - s);
                    return i = this, r = arguments, c <= 0 || c > t ? (a && (clearTimeout(a), a = null), s = l, o = e.apply(i, r), a || (i = r = null)) : a || n.trailing === !1 || (a = setTimeout(u, c)), o
                }
            }, w.debounce = function(e, t, n) {
                var i, r, o, a, s, u = function() {
                    var l = w.now() - a;
                    l < t && l >= 0 ? i = setTimeout(u, t - l) : (i = null, n || (s = e.apply(o, r), i || (o = r = null)))
                };
                return function() {
                    o = this, r = arguments, a = w.now();
                    var l = n && !i;
                    return i || (i = setTimeout(u, t)), l && (s = e.apply(o, r), o = r = null), s
                }
            }, w.wrap = function(e, t) {
                return w.partial(t, e)
            }, w.negate = function(e) {
                return function() {
                    return !e.apply(this, arguments)
                }
            }, w.compose = function() {
                var e = arguments,
                    t = e.length - 1;
                return function() {
                    for (var n = t, i = e[t].apply(this, arguments); n--;) i = e[n].call(this, i);
                    return i
                }
            }, w.after = function(e, t) {
                return function() {
                    if (--e < 1) return t.apply(this, arguments)
                }
            }, w.before = function(e, t) {
                var n;
                return function() {
                    return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n
                }
            }, w.once = w.partial(w.before, 2);
            var P = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                D = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
            w.keys = function(e) {
                if (!w.isObject(e)) return [];
                if (g) return g(e);
                var t = [];
                for (var n in e) w.has(e, n) && t.push(n);
                return P && o(e, t), t
            }, w.allKeys = function(e) {
                if (!w.isObject(e)) return [];
                var t = [];
                for (var n in e) t.push(n);
                return P && o(e, t), t
            }, w.values = function(e) {
                for (var t = w.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++) i[r] = e[t[r]];
                return i
            }, w.mapObject = function(e, t, n) {
                t = x(t, n);
                for (var i, r = w.keys(e), o = r.length, a = {}, s = 0; s < o; s++) i = r[s], a[i] = t(e[i], i, e);
                return a
            }, w.pairs = function(e) {
                for (var t = w.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++) i[r] = [t[r], e[t[r]]];
                return i
            }, w.invert = function(e) {
                for (var t = {}, n = w.keys(e), i = 0, r = n.length; i < r; i++) t[e[n[i]]] = n[i];
                return t
            }, w.functions = w.methods = function(e) {
                var t = [];
                for (var n in e) w.isFunction(e[n]) && t.push(n);
                return t.sort()
            }, w.extend = A(w.allKeys), w.extendOwn = w.assign = A(w.keys), w.findKey = function(e, t, n) {
                t = x(t, n);
                for (var i, r = w.keys(e), o = 0, a = r.length; o < a; o++)
                    if (i = r[o], t(e[i], i, e)) return i
            }, w.pick = function(e, t, n) {
                var i, r, o = {},
                    a = e;
                if (null == a) return o;
                w.isFunction(t) ? (r = w.allKeys(a), i = _(t, n)) : (r = j(arguments, !1, !1, 1), i = function(e, t, n) {
                    return t in n
                }, a = Object(a));
                for (var s = 0, u = r.length; s < u; s++) {
                    var l = r[s],
                        c = a[l];
                    i(c, l, a) && (o[l] = c)
                }
                return o
            }, w.omit = function(e, t, n) {
                if (w.isFunction(t)) t = w.negate(t);
                else {
                    var i = w.map(j(arguments, !1, !1, 1), String);
                    t = function(e, t) {
                        return !w.contains(i, t)
                    }
                }
                return w.pick(e, t, n)
            }, w.defaults = A(w.allKeys, !0), w.create = function(e, t) {
                var n = T(e);
                return t && w.extendOwn(n, t), n
            }, w.clone = function(e) {
                return w.isObject(e) ? w.isArray(e) ? e.slice() : w.extend({}, e) : e
            }, w.tap = function(e, t) {
                return t(e), e
            }, w.isMatch = function(e, t) {
                var n = w.keys(t),
                    i = n.length;
                if (null == e) return !i;
                for (var r = Object(e), o = 0; o < i; o++) {
                    var a = n[o];
                    if (t[a] !== r[a] || !(a in r)) return !1
                }
                return !0
            };
            var M = function(e, t, n, i) {
                if (e === t) return 0 !== e || 1 / e === 1 / t;
                if (null == e || null == t) return e === t;
                e instanceof w && (e = e._wrapped), t instanceof w && (t = t._wrapped);
                var r = f.call(e);
                if (r !== f.call(t)) return !1;
                switch (r) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + e == "" + t;
                    case "[object Number]":
                        return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +e === +t
                }
                var o = "[object Array]" === r;
                if (!o) {
                    if ("object" != typeof e || "object" != typeof t) return !1;
                    var a = e.constructor,
                        s = t.constructor;
                    if (a !== s && !(w.isFunction(a) && a instanceof a && w.isFunction(s) && s instanceof s) && "constructor" in e && "constructor" in t) return !1
                }
                n = n || [], i = i || [];
                for (var u = n.length; u--;)
                    if (n[u] === e) return i[u] === t;
                if (n.push(e), i.push(t), o) {
                    if (u = e.length, u !== t.length) return !1;
                    for (; u--;)
                        if (!M(e[u], t[u], n, i)) return !1
                } else {
                    var l, c = w.keys(e);
                    if (u = c.length, w.keys(t).length !== u) return !1;
                    for (; u--;)
                        if (l = c[u], !w.has(t, l) || !M(e[l], t[l], n, i)) return !1
                }
                return n.pop(), i.pop(), !0
            };
            w.isEqual = function(e, t) {
                return M(e, t)
            }, w.isEmpty = function(e) {
                return null == e || (E(e) && (w.isArray(e) || w.isString(e) || w.isArguments(e)) ? 0 === e.length : 0 === w.keys(e).length)
            }, w.isElement = function(e) {
                return !(!e || 1 !== e.nodeType)
            }, w.isArray = v || function(e) {
                return "[object Array]" === f.call(e)
            }, w.isObject = function(e) {
                var t = typeof e;
                return "function" === t || "object" === t && !!e
            }, w.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
                w["is" + e] = function(t) {
                    return f.call(t) === "[object " + e + "]"
                }
            }), w.isArguments(arguments) || (w.isArguments = function(e) {
                return w.has(e, "callee")
            }), "function" != typeof /./ && "object" != typeof Int8Array && (w.isFunction = function(e) {
                return "function" == typeof e || !1
            }), w.isFinite = function(e) {
                return isFinite(e) && !isNaN(parseFloat(e))
            }, w.isNaN = function(e) {
                return w.isNumber(e) && e !== +e
            }, w.isBoolean = function(e) {
                return e === !0 || e === !1 || "[object Boolean]" === f.call(e)
            }, w.isNull = function(e) {
                return null === e
            }, w.isUndefined = function(e) {
                return void 0 === e
            }, w.has = function(e, t) {
                return null != e && h.call(e, t)
            }, w.noConflict = function() {
                return a._ = s, this
            }, w.identity = function(e) {
                return e
            }, w.constant = function(e) {
                return function() {
                    return e
                }
            }, w.noop = function() {}, w.property = C, w.propertyOf = function(e) {
                return null == e ? function() {} : function(t) {
                    return e[t]
                }
            }, w.matcher = w.matches = function(e) {
                return e = w.extendOwn({}, e),
                    function(t) {
                        return w.isMatch(t, e)
                    }
            }, w.times = function(e, t, n) {
                var i = Array(Math.max(0, e));
                t = _(t, n, 1);
                for (var r = 0; r < e; r++) i[r] = t(r);
                return i
            }, w.random = function(e, t) {
                return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
            }, w.now = Date.now || function() {
                return (new Date).getTime()
            };
            var R = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                O = w.invert(R),
                q = function(e) {
                    var t = function(t) {
                            return e[t]
                        },
                        n = "(?:" + w.keys(e).join("|") + ")",
                        i = RegExp(n),
                        r = RegExp(n, "g");
                    return function(e) {
                        return e = null == e ? "" : "" + e, i.test(e) ? e.replace(r, t) : e
                    }
                };
            w.escape = q(R), w.unescape = q(O), w.result = function(e, t, n) {
                var i = null == e ? void 0 : e[t];
                return void 0 === i && (i = n), w.isFunction(i) ? i.call(e) : i
            };
            var F = 0;
            w.uniqueId = function(e) {
                var t = ++F + "";
                return e ? e + t : t
            }, w.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var L = /(.)^/,
                B = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                H = /\\|'|\r|\n|\u2028|\u2029/g,
                $ = function(e) {
                    return "\\" + B[e]
                };
            w.template = function(e, t, n) {
                !t && n && (t = n), t = w.defaults({}, t, w.templateSettings);
                var i = RegExp([(t.escape || L).source, (t.interpolate || L).source, (t.evaluate || L).source].join("|") + "|$", "g"),
                    r = 0,
                    o = "__p+='";
                e.replace(i, function(t, n, i, a, s) {
                    return o += e.slice(r, s).replace(H, $), r = s + t.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"), t
                }), o += "';\n", t.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                try {
                    var a = new Function(t.variable || "obj", "_", o)
                } catch (s) {
                    throw s.source = o, s
                }
                var u = function(e) {
                        return a.call(this, e, w)
                    },
                    l = t.variable || "obj";
                return u.source = "function(" + l + "){\n" + o + "}", u
            }, w.chain = function(e) {
                var t = w(e);
                return t._chain = !0, t
            };
            var U = function(e, t) {
                return e._chain ? w(t).chain() : t
            };
            w.mixin = function(e) {
                w.each(w.functions(e), function(t) {
                    var n = w[t] = e[t];
                    w.prototype[t] = function() {
                        var e = [this._wrapped];
                        return p.apply(e, arguments), U(this, n.apply(w, e))
                    }
                })
            }, w.mixin(w), w.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
                var t = u[e];
                w.prototype[e] = function() {
                    var n = this._wrapped;
                    return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], U(this, n)
                }
            }), w.each(["concat", "join", "slice"], function(e) {
                var t = u[e];
                w.prototype[e] = function() {
                    return U(this, t.apply(this._wrapped, arguments))
                }
            }), w.prototype.value = function() {
                return this._wrapped
            }, w.prototype.valueOf = w.prototype.toJSON = w.prototype.value, w.prototype.toString = function() {
                return "" + this._wrapped
            }, "function" == typeof define && define.amd && define("underscore", [], function() {
                return w
            })
        }).call(this)
    }, {}],
    15: [function(e, t, n) {
        ! function(e, i) {
            "use strict";
            "function" == typeof define && define.amd ? define([], i) : "object" == typeof n ? t.exports = i() : e.viewportUnitsBuggyfill = i()
        }(this, function() {
            "use strict";

            function e(e, t) {
                var n;
                return function() {
                    var i = this,
                        r = arguments,
                        o = function() {
                            e.apply(i, r)
                        };
                    clearTimeout(n), n = setTimeout(o, t)
                }
            }

            function t() {
                try {
                    return window.self !== window.top
                } catch (e) {
                    return !0
                }
            }

            function n(n) {
                if (!w) {
                    if (n === !0 && (n = {
                            force: !0
                        }), g = n || {}, g.isMobileSafari = k, g.isBadStockAndroid = E, !g.ignoreVmax || g.force || C || (T = !1), C || !g.force && !k && !T && !E && !S && (!g.hacks || !g.hacks.required(g))) return window.console && C && console.info("viewport-units-buggyfill requires a proper CSSOM and basic viewport unit support, which are not available in IE8 and below"), {
                        init: function() {}
                    };
                    window.dispatchEvent(new j("viewport-units-buggyfill-init")), g.hacks && g.hacks.initialize(g), w = !0, b = document.createElement("style"), b.id = "patched-viewport", document.head.appendChild(b), d(function() {
                        var n = e(r, g.refreshDebounceWait || 100);
                        window.addEventListener("orientationchange", n, !0), window.addEventListener("pageshow", n, !0), (g.force || T || t()) && (window.addEventListener("resize", n, !0), g._listeningToResize = !0), g.hacks && g.hacks.initializeEvents(g, r, n), r()
                    })
                }
            }

            function i() {
                b.textContent = u(), b.parentNode.appendChild(b), window.dispatchEvent(new j("viewport-units-buggyfill-style"))
            }

            function r() {
                w && (a(), setTimeout(function() {
                    i()
                }, 1))
            }

            function o(e) {
                try {
                    if (!e.cssRules) return
                } catch (t) {
                    if ("SecurityError" !== t.name) throw t;
                    return
                }
                for (var n = [], i = 0; i < e.cssRules.length; i++) {
                    var r = e.cssRules[i];
                    n.push(r)
                }
                return n
            }

            function a() {
                return y = [], A.call(document.styleSheets, function(e) {
                    var t = o(e);
                    t && "patched-viewport" !== e.ownerNode.id && "ignore" !== e.ownerNode.getAttribute("data-viewport-units-buggyfill") && (e.media && e.media.mediaText && window.matchMedia && !window.matchMedia(e.media.mediaText).matches || A.call(t, s))
                }), y
            }

            function s(e) {
                if (7 === e.type) {
                    var t;
                    try {
                        t = e.cssText
                    } catch (n) {
                        return
                    }
                    return x.lastIndex = 0, void(x.test(t) && (y.push([e, null, t]), g.hacks && g.hacks.findDeclarations(y, e, null, t)))
                }
                if (!e.style) {
                    if (!e.cssRules) return;
                    return void A.call(e.cssRules, function(e) {
                        s(e)
                    })
                }
                A.call(e.style, function(t) {
                    var n = e.style.getPropertyValue(t);
                    e.style.getPropertyPriority(t) && (n += " !important"), x.lastIndex = 0, x.test(n) && (y.push([e, t, n]), g.hacks && g.hacks.findDeclarations(y, e, t, n))
                })
            }

            function u() {
                m = p();
                var e, t, n = [],
                    i = [];
                return y.forEach(function(r) {
                    var o = l.apply(null, r),
                        a = o.selector.length ? o.selector.join(" {\n") + " {\n" : "",
                        s = new Array(o.selector.length + 1).join("\n}");
                    return a && a === e ? (a && !e && (e = a, t = s), void i.push(o.content)) : (i.length && (n.push(e + i.join("\n") + t), i.length = 0), void(a ? (e = a, t = s, i.push(o.content)) : (n.push(o.content), e = null, t = null)))
                }), i.length && n.push(e + i.join("\n") + t), S && n.push("* { content: normal !important; }"), n.join("\n\n")
            }

            function l(e, t, n) {
                var i, r = [];
                i = n.replace(x, c), g.hacks && (i = g.hacks.overwriteDeclaration(e, t, i)), t && (r.push(e.selectorText), i = t + ": " + i + ";");
                for (var o = e.parentRule; o;) o.media ? r.unshift("@media " + o.media.mediaText) : o.conditionText && r.unshift("@supports " + o.conditionText), o = o.parentRule;
                return {
                    selector: r,
                    content: i
                }
            }

            function c(e, t, n) {
                var i = m[n],
                    r = parseFloat(t) / 100;
                return r * i + "px"
            }

            function p() {
                var e = window.innerHeight,
                    t = window.innerWidth;
                return {
                    vh: e,
                    vw: t,
                    vmax: Math.max(t, e),
                    vmin: Math.min(t, e)
                }
            }

            function d(e) {
                var t = 0,
                    n = function() {
                        t--, t || e()
                    };
                A.call(document.styleSheets, function(e) {
                    e.href && f(e.href) !== f(location.href) && "ignore" !== e.ownerNode.getAttribute("data-viewport-units-buggyfill") && (t++, h(e.ownerNode, n))
                }), t || e()
            }

            function f(e) {
                return e.slice(0, e.indexOf("/", e.indexOf("://") + 3))
            }

            function h(e, t) {
                v(e.href, function() {
                    var n = document.createElement("style");
                    n.media = e.media, n.setAttribute("data-href", e.href), n.textContent = this.responseText, e.parentNode.replaceChild(n, e), t()
                }, t)
            }

            function v(e, t, n) {
                var i = new XMLHttpRequest;
                if ("withCredentials" in i) i.open("GET", e, !0);
                else {
                    if ("undefined" == typeof XDomainRequest) throw new Error("cross-domain XHR not supported");
                    i = new XDomainRequest, i.open("GET", e)
                }
                return i.onload = t, i.onerror = n, i.send(), i
            }
            var g, m, y, b, w = !1,
                _ = window.navigator.userAgent,
                x = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g,
                A = [].forEach,
                T = /MSIE [0-9]\./i.test(_),
                C = /MSIE [0-8]\./i.test(_),
                S = _.indexOf("Opera Mini") > -1,
                k = /(iPhone|iPod|iPad).+AppleWebKit/i.test(_) && function() {
                    var e = _.match(/OS (\d)/);
                    return e && e.length > 1 && parseInt(e[1]) < 10
                }(),
                E = function() {
                    var e = _.indexOf(" Android ") > -1;
                    if (!e) return !1;
                    var t = _.indexOf("Version/") > -1;
                    if (!t) return !1;
                    var n = parseFloat((_.match("Android ([0-9.]+)") || [])[1]);
                    return n <= 4.4
                }();
            T || (T = !!navigator.userAgent.match(/MSIE 10\.|Trident.*rv[ :]*1[01]\.| Edge\/1\d\./));
            try {
                new j("test")
            } catch (I) {
                var j = function(e, t) {
                    var n;
                    return t = t || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }, n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
                };
                j.prototype = window.Event.prototype, window.CustomEvent = j
            }
            return {
                version: "0.6.1",
                findProperties: a,
                getCss: u,
                init: n,
                refresh: r
            }
        })
    }, {}],
    16: [function(e, t, n) {
        var i = e("jquery"),
            r = e("underscore"),
            o = e("backbone"),
            a = (e("./config"), e("./views/app")),
            s = e("./views/pages/home"),
            u = e("./views/pages/sodas"),
            l = e("./views/pages/about"),
            c = e("./views/pages/locations"),
            p = e("./views/pages/contact"),
            d = e("./views/pages/notFound"),
            f = o.Router.extend({
                initialize: function(e) {
                    this.appView = new a({
                        el: i(e)
                    }), this.listenTo(this.appView, "navigate", this.navigate)
                },
                displayView: function(e, t) {
                    t = "undefined" == typeof t ? {} : t, t = r.defaults(t, {
                        title: "Hansen's Natural Sodas",
                        description: "This is what original tastes likeâ„¢.",
                        keywords: "",
                        type: "company",
                        image: "/images/logo-hansens@2x.png",
                        url: o.history.location.origin + o.history.location.pathname
                    }), r.each(t, function(e, t) {
                        switch (t) {
                            case "description":
                            case "keywords":
                                i('meta[name="' + t + '"]').attr("content", e);
                                break;
                            case "title":
                            case "url":
                            case "type":
                            case "image":
                                "url" == t ? i("link[rel=canonical]").attr("href", e) : "title" == t && (document.title = e), i('meta[property="og:' + t + '"]').attr("content", e)
                        }
                    }), this.appView.activateContent(e)
                },
                routes: {
                    "": "root",
                    "index.html": "root",
                    sodas: "sodas",
                    about: "about",
                    locations: "locations",
                    contact: "contact",
                    "*badRequest": "pageNotFound"
                },
                root: function() {
                    var e = new s;
                    this.displayView(e)
                },
                sodas: function() {
                    var e = new u;
                    this.displayView(e, {
                        title: "Products | Hansen's Natural Sodas",
                        description: "At Hansenâ€™s, weâ€™re all about crafting remarkable flavors. This is what original tastes likeâ„¢."
                    })
                },
                about: function() {
                    var e = new l;
                    this.displayView(e, {
                        title: "About Us | Hansen's Natural Sodas",
                        description: "The social spirit runs deep at Hansen'sÂ®. We celebrate originality. We don't take ourselves too seriously. What fun would that be?"
                    })
                },
                locations: function(e) {
                    var t = new c({
                        UPC: e
                    });
                    this.displayView(t, {
                        title: "Find Us | Hansen's Natural Sodas",
                        description: "Find original near you."
                    })
                },
                contact: function() {
                    var e = new p;
                    this.displayView(e, {
                        title: "Contact Us | Hansen's Natural Sodas",
                        description: "We'd love to hear from you! Give us a call at 877-265-3632."
                    })
                },
                pageNotFound: function(e) {
                    var t = new d({
                        request: e
                    });
                    this.displayView(t)
                }
            });
        t.exports = f
    }, {
        "./config": 17,
        "./views/app": 30,
        "./views/pages/about": 34,
        "./views/pages/contact": 35,
        "./views/pages/home": 36,
        "./views/pages/locations": 37,
        "./views/pages/notFound": 38,
        "./views/pages/sodas": 40,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    17: [function(e, t, n) {
        t.exports = {
            recaptcha_key: "6LdkICkTAAAAAG93w0lwCoHMtgQk_hOwuvUMDAEk",
            desktop_breakpoint: 992,
            breakpoints: {
                xs: 0,
                sm: 544,
                md: 768,
                lg: 992,
                xl: 1200
            },
            fruits_per_soda: 16,
            sodas: [{
                id: "cherry-vanilla",
                name: "Cherry Vanilla",
                type: "original",
                find_url: "049000070866,049000070910",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Cherry Vanilla.jpg",
                fruits: ["fruit-svgs_cherry-vanilla1.svg", "fruit-svgs_cherry-vanilla2.svg"]
            }, {
                id: "creamy-root-beer",
                name: "Creamy Root Beer",
                type: "original",
                find_url: "049000070583,049000070958",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Creamy Root Beer.jpg",
                fruits: ["fruit-svgs_root-beer1.svg", "fruit-svgs_root-beer2.svg", "fruit-svgs_root-beer3.svg"]
            }, {
                id: "ginger-ale",
                name: "Ginger Ale",
                type: "original",
                find_url: "049000070644,049000071191,049000070279",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Ginger Ale.jpg",
                fruits: ["fruit-svgs_ginger-ale1.svg", "fruit-svgs_ginger-ale2.svg", "fruit-svgs_ginger-ale3.svg"]
            }, {
                id: "grape",
                name: "Grape",
                type: "original",
                find_url: "049000070675",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Grape.jpg",
                fruits: ["fruit-svgs_grape1.svg", "fruit-svgs_grape2.svg"]
            }, {
                id: "grapefruit",
                name: "Grapefruit",
                type: "original",
                find_url: "049000071238",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Grapefruit.jpg",
                fruits: ["fruit-svgs_grapefruit1.svg", "fruit-svgs_grapefruit2.svg", "fruit-svgs_grapefruit3.svg"]
            }, {
                id: "key-lime-twist",
                name: "Key Lime Twist",
                type: "original",
                find_url: "049000071252",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Key Lime Twist.jpg",
                fruits: ["fruit-svgs_key-lime1.svg", "fruit-svgs_key-lime2.svg", "fruit-svgs_key-lime3.svg"]
            }, {
                id: "kiwi-strawberry",
                name: "Kiwi-Strawberry",
                type: "original",
                find_url: "049000070682,049000070699",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Kiwi Strawberry.jpg",
                fruits: ["fruit-svgs_kiwi-strawberry1.svg", "fruit-svgs_kiwi-strawberry2.svg"]
            }, {
                id: "mandarin-lime",
                name: "Mandarin Lime",
                type: "original",
                find_url: "049000070705,049000071290",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Mandarin Lime.jpg",
                fruits: ["fruit-svgs_mandarin-lime1.svg", "fruit-svgs_mandarin-lime2.svg"]
            }, {
                id: "orange",
                name: "Orange",
                type: "original",
                find_url: "049000070729,049000070736",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Orange.jpg",
                fruits: ["fruit-svgs_orange1.svg", "fruit-svgs_orange2.svg", "fruit-svgs_orange3.svg"]
            }, {
                id: "orange-mango",
                name: "Orange Mango",
                type: "original",
                find_url: "049000071313",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Orange Mango.jpg",
                fruits: ["fruit-svgs_orange-mango1.svg", "fruit-svgs_orange-mango2.svg", "fruit-svgs_orange-mango3.svg"]
            }, {
                id: "original-cola",
                name: "Cola",
                type: "original",
                find_url: "049000070569,049000070576",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Original Cola.jpg",
                fruits: ["fruit-svgs_original-cola1.svg", "fruit-svgs_original-cola2.svg", "fruit-svgs_original-cola3.svg"]
            }, {
                id: "pomegranate",
                name: "Pomegranate",
                type: "original",
                find_url: "049000071351",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Pomegranate.jpg",
                fruits: ["fruit-svgs_pomegranate1.svg", "fruit-svgs_pomegranate2.svg", "fruit-svgs_pomegranate3.svg"]
            }, {
                id: "vanilla-cola",
                name: "Vanilla Cola",
                type: "original",
                find_url: "049000071399",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Vanilla Cola.jpg",
                fruits: ["fruit-svgs_vanilla-coke1.svg", "fruit-svgs_vanilla-coke2.svg"]
            }, {
                id: "diet-black-cherry",
                name: "Black Cherry",
                type: "diet",
                find_url: "049000070545,049000070552",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Black Cherry.jpg",
                fruits: ["fruit-svgs_black-cherry1.svg", "fruit-svgs_black-cherry2.svg", "fruit-svgs_black-cherry3.svg"]
            }, {
                id: "diet-cherry-vanilla",
                name: "Cherry Vanilla",
                type: "diet",
                find_url: "049000070897",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Cherry Vanilla.jpg",
                fruits: ["fruit-svgs_cherry-vanilla1.svg", "fruit-svgs_cherry-vanilla2.svg"]
            }, {
                id: "diet-creamy-root-beer",
                name: "Creamy Root Beer",
                type: "diet",
                find_url: "049000070743,049000071139",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Creamy RootBeer.jpg",
                fruits: ["fruit-svgs_root-beer1.svg", "fruit-svgs_root-beer2.svg", "fruit-svgs_root-beer3.svg"]
            }, {
                id: "diet-ginger-ale",
                name: "Ginger Ale",
                type: "diet",
                find_url: "049000070613",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Ginger Ale.jpg",
                fruits: ["fruit-svgs_ginger-ale1.svg", "fruit-svgs_ginger-ale2.svg", "fruit-svgs_ginger-ale3.svg"]
            }, {
                id: "diet-kiwi-strawberry",
                name: "Kiwi Strawberry",
                type: "diet",
                find_url: "049000071078",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Kiwi Strawberry.jpg",
                fruits: ["fruit-svgs_kiwi-strawberry1.svg", "fruit-svgs_kiwi-strawberry2.svg"]
            }, {
                id: "diet-original-cola",
                name: "Original Cola",
                type: "diet",
                find_url: "049000071016",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Original Cola.jpg",
                fruits: ["fruit-svgs_original-cola1.svg", "fruit-svgs_original-cola2.svg", "fruit-svgs_original-cola3.svg"]
            }, {
                id: "diet-pomegranate",
                name: "Pomegranate",
                type: "diet",
                find_url: "049000071115",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Pomegranate.jpg",
                fruits: ["fruit-svgs_pomegranate1.svg", "fruit-svgs_pomegranate2.svg", "fruit-svgs_pomegranate3.svg"]
            }, {
                id: "diet-tangerine-lime",
                name: "Tangerine Lime",
                type: "diet",
                find_url: "049000070842,049000071177",
                buy_url: "#",
                nutrition_url: "NutritionLabels_Diet Tangerine Lime.jpg",
                fruits: ["fruit-svgs_tangerine-lime1.svg", "fruit-svgs_tangerine-lime2.svg", "fruit-svgs_tangerine-lime3.svg"]
            }]
        }
    }, {}],
    18: [function(e, t, n) {
        var i, r, o = e("jquery"),
            a = (e("underscore"), e("backbone")),
            s = (e("./config"), e("./appRouter"));
        o(document).ready(function() {
            console.log("document ready, waiting for stylesheet"), o("#main-stylesheet").attr("media", "all"), r = setInterval(function() {
                console.log("checking..."), "hidden" == o("#application").css("overflow-x") && (clearInterval(r), console.log("stylesheet loaded, starting application"), i = new s("#application"), a.history.start({
                    pushState: !0
                }))
            }, 100)
        })
    }, {
        "./appRouter": 16,
        "./config": 17,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    19: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<main id="main-content"></main> <nav id="logo"><a href="/"></a></nav> <nav id="menu-toggle"></nav> <nav id="main-menu"> <div class="v-align-wrapper"> <div class="v-align-content"> <ul class="menu main-menu"> <li><a class="js-nav" href="/sodas">Sodas</a></li> <li><a class="js-nav" href="/about">About</a></li> <li><a class="js-nav" href="/locations">Find Us</a></li> <li><a target="_blank" href="http://www.google.com/url?q=http%3A%2F%2Fwww.amazon.com%2FHansens-Natural-Cane-Variety-12-Ounce%2Fdp%2FB00DDKQI6O%2Fref%3Dsr_1_2_a_it%3Fie%3DUTF8%26qid%3D1464368460%26sr%3D8-2%26keywords%3DHansen%2527s&sa=D&sntz=1&usg=AFQjCNGuKlfj-cdl_qW8vNM6xeOoXUhDcA">Buy Now</a></li> </ul> <p>We&rsquo;ve been free-wheeling, authentic and creative from the beginning. What&rsquo;s more, we like to celebrate the uniqueness and creativity in all of us by crafting 21 bold flavors and always experimenting with new ones. We want soda drinkers to take pride in being unconventional and leading a life of originality just like Hansen&rsquo;s.</p> <ul class="menu social-menu"> <li><a class="facebook" href="https://www.facebook.com/hansensnatural/" target="_blank"></a></li> <li><a class="twitter" href="https://twitter.com/HansensNatural" target="_blank"></a></li> <li><a class="instagram" href="https://www.instagram.com/hansensnatural/" target="_blank"></a></li> <li><a class="email" href="mailto:hansens@coca-cola.com" target="_blank"></a></li> </ul> </div> </div> </nav>';
            return __p
        }
    }, {
        underscore: 14
    }],
    20: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<ul class="menu footer-menu"> <li><a class="js-nav" href="/contact">Contact</a></li> <li><a target="_blank" href="http://us.coca-cola.com/home/terms-of-use/">Terms of Use</a></li> <li><a target="_blank" href="http://us.coca-cola.com/home/privacy-policy/">Privacy Policy</a></li> <li><a target="_blank" href="http://us.coca-cola.com/home/privacy-policy/#Advertising">About Our Ads</a></li> </ul> <span class="copyright">&copy;2016 Hansen Beverage <br class="mobile-only">All Rights Reserved.</span>';
            return __p
        }
    }, {
        underscore: 14
    }],
    21: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<div class="global-message"> <div class="message-close">X</div> ' + (null == (__t = message) ? "" : __t) + " </div>";
            return __p
        }
    }, {
        underscore: 14
    }],
    22: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<div class="modal-wrapper-outer"> <div class="modal-wrapper-inner"> <div class="modal-content ' + (null == (__t = content === !1 ? "no-content hidden" : content === !0 ? "no-content" : "") ? "" : __t) + '"> ', closable && (__p += ' <a class="modal-close" href="#"></a> '), __p += " " + (null == (__t = content !== !1 && content !== !0 ? content : "") ? "" : __t) + " </div> </div> </div>";
            return __p
        }
    }, {
        underscore: 14
    }],
    23: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<article class="container"> <div class="cycle-container"> <div class="cycle"> <div class="slide"> <p><strong>The SoCal spirit runs deep at Hansen&rsquo;s<sup>&reg;</sup>.</strong> We&rsquo;ve been free-wheeling, authentic and creative from the beginning. In the 1930s, we established our company by selling fresh non-pasteurized juices to the film studios. <strong>Nothing but the best would do</strong>, and we&rsquo;ve been making our products this way ever since.</p> </div> <div class="slide"> <p><strong>The unconventional route.</strong> Walking to the beat of our own drum is just how we do things. Looking for a better option, we introduced our <strong>pioneering line of natural sodas in the 1970s</strong>, and in 2008 we pushed them further, switching to a <strong>real cane sugar recipe</strong> for our original soda line-up<sup>*</sup>.</p> <p class="disclaimer"><sup>*</sup>In addition to our original cane sugar sodas, we also offer a range of bold diet sodas that don&rsquo;t compromise on flavor. Our diet sodas are sweetened with sucralose (Splenda<sup>&reg;</sup> Brand) and Acesulfame Potassium.</p> </div> <div class="slide"> <p><strong>Nothing is too bold.</strong> Today, we celebrate the <strong>uniqueness and creativity</strong> in all of us by crafting a remarkable range of <strong>bold flavors</strong> across our original and diet offerings, and always experimenting with new ones.</p> </div> <div class="slide"> <p><strong>We celebrate originality.</strong> We want our soda fans to <strong>take pride in being unconventional</strong> and leading a life of originality, just like we do. <strong>We don&rsquo;t take ourselves too seriously.</strong></p> <p><strong class="style-me">What fun would that be?</strong></p> </div> <div class="cycle-pager"></div> </div> </div> </article> <div class="video-wrapper"></div>';
            return __p
        }
    }, {
        underscore: 14
    }],
    24: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<script src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoadCallback&render=explicit" async defer="defer"></script> <header class="banner"> <h2>Contact Us</h2> </header> <article class="container"> <form id="contact-form" action="/form-emailer/index.php" method="POST"> <input type="hidden" name="referrer" value="https://www.hansens.com/contact"> <input type="hidden" name="form-name" value="Contact Form"> <input type="text" name="legit-name" class="required" autocomplete="off"> <input type="text" name="legit-email" class="required" autocomplete="off"> <div class="half-field thirds first-field"> <label for="f-email">Email Address<sup>*</sup> </label> <input id="f-email" type="email" name="form-data[email]" maxlength="241" required> </div> <div class="half-field thirds last-field"> <label for="f-phone">Phone Number<sup>*</sup> </label> <input id="f-phone" type="tel" name="form-data[phone]" maxlength="30" required> </div> <div class="clear"></div> <div class="half-field first-field"> <label for="f-title">Title </label> <select id="f-title" name="form-data[title]"> <option value=""> - </option> <option value="Miss">Miss</option> <option value="Mr.">Mr.</option> <option value="Ms.">Ms.</option> <option value="Mrs.">Mrs.</option> <option value="Dr.">Dr.</option> </select> </div> <div class="half-field last-field"> <label for="f-gender">Gender </label> <select id="f-gender" name="form-data[gender]"> <option value=""> - </option> <option value="M">Male</option> <option value="F">Female</option> </select> </div> <div class="clear"></div> <div class="half-field first-field"> <label for="f-first-name">First Name<sup>*</sup> </label> <input id="f-first-name" type="text" name="form-data[first-name]" maxlength="40" required> </div> <div class="half-field last-field"> <label for="f-last-name">Last Name<sup>*</sup> </label> <input id="f-last-name" type="text" name="form-data[last-name]" maxlength="40" required> </div> <div class="clear"></div> <label>Birthdate<sup>*</sup> </label> <div id="birthdate"></div> <div class="clear"></div> <label for="f-address">Address<sup>*</sup> </label> <input id="f-address" type="text" name="form-data[address]" maxlength="60" required> <div class="half-field thirds first-field"> <label for="f-country">Country<sup>*</sup> </label> <select id="f-country" name="form-data[country]" required> <option value=""> - </option> <option value="AF">Afghanistan</option> <option value="AL">Albania</option> <option value="DZ">Algeria</option> <option value="AS">American Samoa</option> <option value="AD">Andorra</option> <option value="AO">Angola</option> <option value="AI">Anguilla</option> <option value="AQ">Antarctica</option> <option value="AG">Antigua &amp; Barbuda</option> <option value="AR">Argentina</option> <option value="AM">Armenia</option> <option value="AW">Aruba</option> <option value="AU">Australia</option> <option value="AT">Austria</option> <option value="AZ">Azerbaijan</option> <option value="AA">Azores</option> <option value="BS">Bahamas</option> <option value="BH">Bahrain</option> <option value="BD">Bangladesh</option> <option value="BB">Barbados</option> <option value="BY">Belarus</option> <option value="BE">Belgium</option> <option value="BZ">Belize</option> <option value="BJ">Benin</option> <option value="BM">Bermuda</option> <option value="BT">Bhutan</option> <option value="BO">Bolivia</option> <option value="BA">Bosnia And Herzegovina</option> <option value="BW">Botswana</option> <option value="BR">Brazil</option> <option value="IO">British Indian Ocean Terr</option> <option value="VG">British Virgin Islands</option> <option value="BN">Brunei</option> <option value="BG">Bulgaria</option> <option value="BF">Burkina Faso</option> <option value="BI">Burundi</option> <option value="KH">Cambodia</option> <option value="CM">Cameroon</option> <option value="CA">Canada</option> <option value="CV">Cape Verde</option> <option value="KY">Cayman Islands</option> <option value="CF">Central African Republic</option> <option value="TD">Chad</option> <option value="CL">Chile</option> <option value="CN">China</option> <option value="CX">Christmas Island</option> <option value="CC">Cocos (Keeling) Islands</option> <option value="CO">Colombia</option> <option value="KM">Comoros</option> <option value="CG">Congo, Republic of the</option> <option value="CD">Congo, Democratic Republic of the</option> <option value="CK">Cook Islands</option> <option value="CR">Costa Rica</option> <option value="HR">Croatia</option> <option value="CU">Cuba</option> <option value="CT">Curacao</option> <option value="CY">Cyprus</option> <option value="CZ">Czech Republic</option> <option value="DK">Denmark</option> <option value="DJ">Djibouti</option> <option value="DM">Dominica</option> <option value="DO">Dominican Republic</option> <option value="TP">East Timor</option> <option value="EC">Ecuador</option> <option value="EG">Egypt</option> <option value="SV">El Salvador</option> <option value="GQ">Equatorial Guinea</option> <option value="ER">Eritrea</option> <option value="EE">Estonia</option> <option value="ET">Ethiopia</option> <option value="FK">Falkland Islands</option> <option value="FO">Faroe Islands</option> <option value="FJ">Fiji</option> <option value="FI">Finland</option> <option value="FR">France</option> <option value="GF">French Guiana</option> <option value="PF">French Polynesia</option> <option value="TF">French Southern Terr.</option> <option value="GA">Gabon</option> <option value="GM">Gambia</option> <option value="GE">Georgia</option> <option value="DE">Germany</option> <option value="GH">Ghana</option> <option value="GI">Gibraltar</option> <option value="GB">Great Britain</option> <option value="GR">Greece</option> <option value="GL">Greenland</option> <option value="GD">Grenada</option> <option value="GP">Guadeloupe</option> <option value="GU">Guam</option> <option value="GT">Guatemala</option> <option value="GN">Guinea</option> <option value="GW">Guinea-Bissau</option> <option value="GY">Guyana</option> <option value="HT">Haiti</option> <option value="VA">Holy See (Vatican City)</option> <option value="HN">Honduras</option> <option value="HK">Hong Kong</option> <option value="HU">Hungary</option> <option value="IS">Iceland</option> <option value="IN">India</option> <option value="ID">Indonesia</option> <option value="IR">Iran, Republic Of</option> <option value="IQ">Iraq</option> <option value="IE">Ireland</option> <option value="IL">Israel</option> <option value="IT">Italy</option> <option value="CI">Ivory Coast</option> <option value="JM">Jamaica</option> <option value="JP">Japan</option> <option value="JO">Jordan</option> <option value="KZ">Kazakhstan</option> <option value="KE">Kenya</option> <option value="KI">Kiribati</option> <option value="KP">Korea, North</option> <option value="KR">Korea, Republic of</option> <option value="KW">Kuwait</option> <option value="KG">Kyrgyzstan</option> <option value="LA">Laos</option> <option value="LV">Latvia</option> <option value="LB">Lebanon</option> <option value="LS">Lesotho</option> <option value="LR">Liberia</option> <option value="LY">Libya</option> <option value="LI">Liechtenstein</option> <option value="LT">Lithuania</option> <option value="LU">Luxembourg</option> <option value="MO">Macau (Macao)</option> <option value="MK">Macedonia</option> <option value="MG">Madagascar</option> <option value="MW">Malawi</option> <option value="MY">Malaysia</option> <option value="MV">Maldives</option> <option value="ML">Mali</option> <option value="MT">Malta</option> <option value="MH">Marshall Islands</option> <option value="MQ">Martinique</option> <option value="MR">Mauritania</option> <option value="MU">Mauritius</option> <option value="YT">Mayotte</option> <option value="MX">Mexico</option> <option value="FM">Micronesia</option> <option value="MD">Moldova</option> <option value="MC">Monaco</option> <option value="MN">Mongolia</option> <option value="MS">Montserrat</option> <option value="MA">Morocco</option> <option value="MZ">Mozambique</option> <option value="MM">Myanmar (Burma)</option> <option value="NA">Namibia</option> <option value="NR">Nauru</option> <option value="NP">Nepal</option> <option value="NL">Netherlands</option> <option value="AN">Netherlands Antilles</option> <option value="NC">New Caledonia</option> <option value="NZ">New Zealand</option> <option value="NI">Nicaragua</option> <option value="NE">Niger</option> <option value="NG">Nigeria</option> <option value="NU">Niue Islands</option> <option value="NF">Norfolk Island</option> <option value="ND">Northern Ireland</option> <option value="MP">Northern Mariana Islands</option> <option value="NO">Norway</option> <option value="OM">Oman</option> <option value="PK">Pakistan</option> <option value="PW">Palau</option> <option value="PA">Panama</option> <option value="PG">Papua New Guinea</option> <option value="PY">Paraguay</option> <option value="PE">Peru</option> <option value="PH">Philippines</option> <option value="PN">Pitcairn</option> <option value="PL">Poland</option> <option value="PT">Portugal</option> <option value="PR">Puerto Rico</option> <option value="QA">Qatar</option> <option value="RE">Reunion</option> <option value="RO">Romania</option> <option value="RU">Russia</option> <option value="RW">Rwanda</option> <option value="SH">Saint Helena</option> <option value="KN">Saint Kitts And Nevis</option> <option value="LC">Saint Lucia</option> <option value="SX">Saint Maarteen</option> <option value="PM">Saint Pierre And Miquelon</option> <option value="VC">Saint Vincent</option> <option value="WS">Samoa</option> <option value="SM">San Marino</option> <option value="ST">Sao Tome &amp; Principe</option> <option value="SA">Saudi Arabia</option> <option value="SN">Senegal</option> <option value="CS">Serbia &amp; Montenegro</option> <option value="SC">Seychelles</option> <option value="SL">Sierra Leone</option> <option value="SG">Singapore</option> <option value="SK">Slovakia</option> <option value="SI">Slovenia</option> <option value="SB">Solomon Islands</option> <option value="SO">Somalia</option> <option value="ZA">South Africa</option> <option value="ES">Spain</option> <option value="LK">Sri Lanka</option> <option value="SD">Sudan</option> <option value="SR">Suriname</option> <option value="SJ">Svalbard And Jan Mayen</option> <option value="SZ">Swaziland</option> <option value="SE">Sweden</option> <option value="CH">Switzerland</option> <option value="SY">Syria</option> <option value="TW">Taiwan</option> <option value="TJ">Tajikistan</option> <option value="TZ">Tanzania</option> <option value="TH">Thailand</option> <option value="TG">Togo</option> <option value="TK">Tokelau</option> <option value="TO">Tonga</option> <option value="TT">Trinidad &amp; Tobago</option> <option value="TN">Tunisia</option> <option value="TR">Turkey</option> <option value="TM">Turkmenistan</option> <option value="TC">Turks &amp; Caicos Islands</option> <option value="TV">Tuvalu</option> <option value="UG">Uganda</option> <option value="UA">Ukraine</option> <option value="AE">United Arab Emirates</option> <option value="US">United States</option> <option value="UY">Uruguay</option> <option value="UZ">Uzbekistan</option> <option value="VU">Vanuatu</option> <option value="VE">Venezuela</option> <option value="VN">Vietnam</option> <option value="VI">Virgin Islands, U.S</option> <option value="WF">Wallis And Futuna</option> <option value="PS">West Bank-Gaza</option> <option value="EH">Western Sahara</option> <option value="YE">Yemen</option> <option value="ZM">Zambia</option> <option value="ZW">Zimbabwe</option> </select> </div> <div class="half-field thirds last-field"> <label for="f-zip">Zip Code<sup>*</sup> </label> <input id="f-zip" type="text" name="form-data[zip]" maxlength="10" required> </div> <div class="clear"></div> <div class="half-field thirds first-field"> <label for="f-city">City<sup>*</sup> </label> <input id="f-city" type="text" name="form-data[city]" maxlength="40" required> </div> <div class="half-field thirds last-field f-state"> <label for="f-state">State:<sup style="visibility: hidden">*</sup> </label> <select id="f-state" name="form-data[state]" disabled="disabled"> <option value=""> - </option> <option value="AK">AK</option> <option value="AL">AL</option> <option value="AR">AR</option> <option value="AZ">AZ</option> <option value="CA">CA</option> <option value="CO">CO</option> <option value="CT">CT</option> <option value="DC">DC</option> <option value="DE">DE</option> <option value="FL">FL</option> <option value="GA">GA</option> <option value="HI">HI</option> <option value="IA">IA</option> <option value="ID">ID</option> <option value="IL">IL</option> <option value="IN">IN</option> <option value="KS">KS</option> <option value="KY">KY</option> <option value="LA">LA</option> <option value="MA">MA</option> <option value="MD">MD</option> <option value="ME">ME</option> <option value="MI">MI</option> <option value="MN">MN</option> <option value="MO">MO</option> <option value="MS">MS</option> <option value="MT">MT</option> <option value="NC">NC</option> <option value="ND">ND</option> <option value="NE">NE</option> <option value="NH">NH</option> <option value="NJ">NJ</option> <option value="NM">NM</option> <option value="NV">NV</option> <option value="AB">AB</option> <option value="BC">BC</option> <option value="MB">MB</option> <option value="NB">NB</option> <option value="NL">NL</option> <option value="NS">NS</option> <option value="NT">NT</option> <option value="NU">NU</option> <option value="NY">NY</option> <option value="ON">ON</option> <option value="PE">PE</option> <option value="QC">QC</option> <option value="SK">SK</option> <option value="YT">YT</option> <option value="OH">OH</option> <option value="OK">OK</option> <option value="OR">OR</option> <option value="PA">PA</option> <option value="PR">PR</option> <option value="RI">RI</option> <option value="SC">SC</option> <option value="SD">SD</option> <option value="TN">TN</option> <option value="TX">TX</option> <option value="UT">UT</option> <option value="VA">VA</option> <option value="VI">VI</option> <option value="VT">VT</option> <option value="WA">WA</option> <option value="WI">WI</option> <option value="WV">WV</option> <option value="WY">WY</option> </select> </div> <div class="clear"></div> <div class="half-field first-field"> <label for="f-contact">Can We Contact You?</label> <select id="f-contact" name="form-data[contact]"> <option value=""> - </option> <option value="Yes">Yes</option> <option value="No">No</option> </select> </div> <div class="half-field last-field"> <label for="f-communication-method">Preferred Communication Method</label> <select id="f-communication-method" name="form-data[communication-method]"> <option value=""> - </option> <option value="E-Mail">E-Mail</option> <option value="Home Phone">Home Phone</option> <option value="Work Phone">Work Phone</option> </select> </div> <div class="clear"></div> <label for="f-comments">Comments<sup>*</sup> </label> <textarea id="f-comments" name="form-data[comments]" required rows="5" maxlength="383" minlength="16"></textarea> <br> <div class="submit-wrapper"> <div class="g-recaptcha"></div> <input type="submit" value="Submit" class="btn"> </div> <br> </form> </article>';
            return __p
        }
    }, {
        underscore: 14
    }],
    25: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<div id="home-section-1" class="section full-screen js-snap js-nav-green"> <div id="home-video-1" class="video-wrapper"></div> <div class="full-screen v-align-wrapper"> <div class="v-align-content"> <div class="full-width"> <div class="half-width"> <h2>This is What</h2> <h1>Original</h1> <h2 class="second">Tastes Like<sup>TM</sup></h2> <div class="title"></div> <a class="btn js-nav" href="/sodas">Our Bold Flavors</a> </div> </div> </div> </div> <div class="scroll-arrow page-asset home-asset"></div> </div> <div id="home-section-2" class="section full-screen js-snap"> <div id="home-video-2" class="video-wrapper"></div> <div class="full-screen v-align-wrapper"> <div class="v-align-content"> <div class="full-width"> <div class="half-width"> <h2>Hey... We Began In</h2> <h1>California</h1> <div class="title"></div> <a class="btn js-nav" href="/about">Since 1935</a> </div> </div> </div> </div> <div class="scroll-arrow page-asset home-asset"></div> </div> <div id="home-section-3" class="section full-screen js-snap js-nav-green"> <div id="home-video-3" class="video-wrapper"></div> <div class="full-screen v-align-wrapper"> <div class="v-align-content"> <div class="full-width"> <div class="half-width"> <h2>Find Your</h2> <h1>Flavor</h1> <div class="title"></div> <a class="btn js-nav" href="/locations">Store Locator</a> </div> </div> </div> </div> <div class="scroll-arrow page-asset home-asset"></div> </div> <div id="home-section-4" class="section full-screen js-snap js-snap-last"> <div id="home-video-4" class="video-wrapper"></div> <div class="full-screen v-align-wrapper"> <div class="v-align-content"> <div class="full-width"> <div class="half-width"> <h2>Get The</h2> <h1>Goods</h1> <div class="title"></div> <a class="btn" target="_blank" href="http://www.google.com/url?q=http%3A%2F%2Fwww.amazon.com%2FHansens-Natural-Cane-Variety-12-Ounce%2Fdp%2FB00DDKQI6O%2Fref%3Dsr_1_2_a_it%3Fie%3DUTF8%26qid%3D1464368460%26sr%3D8-2%26keywords%3DHansen%2527s&sa=D&sntz=1&usg=AFQjCNGuKlfj-cdl_qW8vNM6xeOoXUhDcA">Buy Now</a> </div> </div> </div> </div> <div class="scroll-arrow page-asset home-asset"></div> </div>';
            return __p
        }
    }, {
        underscore: 14
    }],
    26: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<header class="banner"></header> <iframe id="destini" src="//destinilocators.com/hansens/site/locator.php' + (null == (__t = UPC ? "?MM=panel2&PROD=" + UPC : "") ? "" : __t) + '"></iframe> <script type="text/javascript" src="//destinilocators.com/control/pscript.js"></script>';
            return __p
        }
    }, {
        underscore: 14
    }],
    27: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<h1 style="text-align: center; margin: 40vh 0">Sorry, the page <em>/' + (null == (__t = request) ? "" : __t) + "</em> was not found</h1>";
            return __p
        }
    }, {
        underscore: 14
    }],
    28: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += "", _.each(sodas, function(e) {
                __p += ' <div class="can ' + (null == (__t = e.type) ? "" : __t) + '" id="' + (null == (__t = e.id) ? "" : __t) + '" data-fruit="' + (null == (__t = e.fruit) ? "" : __t) + '"> <div class="bg-translate"> <div class="bg" style="background-image: url(images/can_' + (null == (__t = e.id) ? "" : __t) + '.png)"></div> </div> <div class="fruits"> ';
                for (var t = 0, n = 0; n < fruits_per_soda; n++) t >= e.fruits.length && (t = 0), __p += ' <div class="fruit-translate"> <div class="fruit no-preload" data-postload-background-image="images/fruits/' + (null == (__t = e.fruits[t]) ? "" : __t) + '"></div> </div> ', t++;
                __p += ' </div> <div class="details"> <div class="soda-sub-title">Hansen&rsquo;s ' + (null == (__t = e.type) ? "" : __t) + '</div> <div class="soda-title">' + (null == (__t = e.name) ? "" : __t) + '</div> <ul class="menu soda-menu"> <li><a class="js-nav" href="/locations' + (null == (__t = "" == e.find_url ? "" : "?" + e.find_url) ? "" : __t) + '">Find</a></li> <li><a target="_blank" href="http://www.amazon.com/Hansens-Natural-Cane-Variety-12-Ounce/dp/B00DDKQI6O/ref=sr_1_2_a_it?ie=UTF8&qid=1464368460&sr=8-2&keywords=Hansen%27s">Buy</a></li> <li><a href="images/nutrition/' + (null == (__t = e.nutrition_url) ? "" : __t) + '" class="js-modal">Nutrition</a></li> </ul> </div> </div> '
            }), __p += "";
            return __p
        }
    }, {
        underscore: 14
    }],
    29: [function(require, module, exports) {
        var _ = require("underscore");
        module.exports = function(obj) {
            var __t, __p = "",
                __j = Array.prototype.join,
                print = function() {
                    __p += __j.call(arguments, "")
                };
            with(obj || {}) __p += '<div class="video"> </div> <article class="container"> <div class="title"> <h2>Find Your</h2> <h1>Flavor</h1> </div> <p>At Hansen&rsquo;s, we&rsquo;re all about crafting remarkable flavors. Hey, we began in California, so for us nothing is too bold or unconventional. We use real cane sugar (of course) for all our cane sugar sodas. And&hellip; its no secret&hellip; our diet sodas don&rsquo;t compromise on bold flavor either. This is what original tastes like<sup>&trade;</sup>.</p> </article> <div id="cans-loader"><span>Loading Sodas...</span></div> <div id="cans" class="container"></div>';
            return __p
        }
    }, {
        underscore: 14
    }],
    30: [function(e, t, n) {
        var i = e("jquery"),
            r = (e("underscore"), e("backbone")),
            o = (e("backbone-courier"), e("../config"), e("viewport-units-buggyfill")),
            a = e("./footer"),
            s = e("./modal"),
            u = e("../templates/app.tpl"),
            l = e("../templates/message.tpl"),
            c = r.View.extend({
                events: {
                    "click #menu-toggle": "menuToggle",
                    "click #logo a": "_clickJsNav",
                    "click #main-menu a": "_clickJsNav"
                },
                onMessages: {
                    modal: "modal",
                    appNav: "appNav",
                    "*": "bubbledEvent"
                },
                initialize: function(e) {
                    !window.ActiveXObject && "ActiveXObject" in window || (console.log("VIEWPORT-UNITS-BUGGYFILL"), o.init()), r.Courier.add(this), this.modalView = new s({
                        el: this.$("#global-modal")
                    }), this.$el.html(u()), this.$el.append(this.modalView.$el), this.$("#menu-toggle").load("/images/nav.svg"), this.footerView = new a, this.$("main#main-content").append(this.footerView.$el), this.footerView.render()
                },
                _clickJsNav: function(e) {
                    "_blank" !== i(e.currentTarget).attr("target") && (e.preventDefault(), this.appNav(e.currentTarget.pathname))
                },
                menuToggle: function() {
                    i("body").toggleClass("main-menu-open")
                },
                flash: function(e, t, n, r) {
                    if (r) this.modalView.flash(e, t, n);
                    else {
                        var o = i(l({
                            message: e,
                            status: t
                        }));
                        o.find(".message-close").click(function(e) {
                            o.remove()
                        }), this.$("#global-message-container").prepend(o), n > 0 && setTimeout(function() {
                            o.remove()
                        }, n)
                    }
                },
                closeAllMessages: function() {
                    this.$("#global-message-container").html("")
                },
                appNav: function(e) {
                    i("body").removeClass("main-menu-open"), this.trigger("navigate", e, {
                        trigger: !0
                    })
                },
                bubbledEvent: function(e, t, n) {
                    console.log("_bubbledEvent()", e, t, n)
                },
                activateContent: function(e) {
                    window.prerenderReady = !1;
                    var t = this;
                    "loading" !== t.modalView.status ? t.modalView.loading(!1) : t.activeContent || t.modalView.loading("loading page..."), t.closeAllMessages(), console.log("AppView.activateContent( " + e["class"].trim() + " )");
                    var n = !t.activeContent || t.hideContent();
                    n !== !0 && n.then(function() {
                        console.log("\t" + t.activeContent["class"].trim() + ".remove()"), t.activeContent.remove(), t.modalView.loading("loading page...")
                    });
                    var r = t.renderContent(e);
                    i.when(r, n).then(function() {
                        e.postRender(), t.modalView.loading(!1), t.activeContent = e, t.activeContent.$el.hasClass("nav-green") ? i("body").addClass("nav-green") : i("body").removeClass("nav-green"), t.showContent().then(function() {
                            "loading" == t.modalView.status && t.modalView.close(), window.prerenderReady = !0, console.log("AppView.activateContent() - done\n\n")
                        })
                    })
                },
                renderContent: function(e) {
                    var t = this;
                    return i.Deferred(function() {
                        var n = this;
                        e.$el.css({
                            position: "fixed",
                            top: "200%"
                        }), t.$el.append(e.$el), e.render_d().then(function() {
                            n.resolve()
                        })
                    })
                },
                hideContent: function() {
                    var e = this;
                    return console.log("\tAppView.hideContent( " + e.activeContent["class"].trim() + " )"), i.Deferred(function() {
                        var t = this;
                        i(".page-asset").removeClass("shown"), e.activeContent.$el.removeClass("shown"), i("body").addClass("loading"), setTimeout(function() {
                            console.log("\tAppView.hideContent() - done"), t.resolve()
                        }, 1001)
                    })
                },
                showContent: function() {
                    var e = this;
                    return console.log("\tAppView.showContent( " + e.activeContent["class"].trim() + " )"), i("main#main-content").scrollTop(0), e.activeContent.$el.prependTo(e.$("main#main-content")), e.activeContent.$el.attr("style", ""), i.Deferred(function() {
                        var t = this;
                        setTimeout(function() {
                            i(".page-asset").addClass("shown"), e.activeContent.$el.addClass("shown"), i("body").removeClass("loading"), setTimeout(function() {
                                console.log("\tAppView.showContent() - done"), t.resolve()
                            }, 1001)
                        }, 1)
                    })
                },
                modal: function(e, t, n) {
                    var i = this;
                    switch (e.type) {
                        case "image":
                            i.modalView.content = '<img src="' + e.value.href + '" />';
                            break;
                        case "iframe":
                            i.modalView.content = '<iframe src="' + e.value.href + '" />'
                    }
                    i.modalView.status = "normal", i.modalView.closable = !0, i.modalView.blocking = !1, i.modalView.render(), "dom" == e.type && i.modalView.$(".modal-content").append(e.value), i.modalView.$el.addClass("opaque")
                }
            });
        t.exports = c
    }, {
        "../config": 17,
        "../templates/app.tpl": 19,
        "../templates/message.tpl": 21,
        "./footer": 32,
        "./modal": 33,
        backbone: 3,
        "backbone-courier": 2,
        jquery: 11,
        underscore: 14,
        "viewport-units-buggyfill": 15
    }],
    31: [function(e, t, n) {
        var i = e("jquery"),
            r = (e("underscore"), e("backbone")),
            o = (e("backbone-courier"), e("../config"), r.View.extend({
                "class": "BaseView",
                events: {
                    "click .js-nav": "_clickJsNav"
                },
                passMessages: {
                    "*": "."
                },
                initialize: function(e) {
                    r.Courier.add(this)
                },
                render: function() {},
                render_d: function() {
                    var e = this;
                    return i.Deferred(function() {
                        var t = this;
                        console.log(e["class"] + ".render_d()"), e.render();
                        var n = [i.Deferred(function() {
                            var t = this;
                            e.$el.ready(function() {
                                console.log("\t" + e["class"] + ".render_d() - DOM ready"), t.resolve()
                            })
                        })];
                        e.$("img").not(".no-preload").each(function() {
                            var e = this;
                            i(e).attr("src");
                            n.push(i.Deferred(function() {
                                var t = this;
                                i(e).load(function() {
                                    t.resolve()
                                }).error(function() {
                                    "" !== i(e).attr("alt") && i(e).attr("alt", "Not Found"), t.resolve()
                                })
                            }))
                        }), e.$("div").not(".no-preload").each(function() {
                            var e = i(this).css("background-image");
                            "" !== e && "none" !== e && (e = e.replace(/.*\s?url\([\'\"]?/, "").replace(/[\'\"]?\).*/, ""), n.push(i.Deferred(function() {
                                var t = this;
                                i("<img/>").attr("src", e).load(function() {
                                    t.resolve(), i(this).remove()
                                }).error(function() {
                                    t.resolve()
                                })
                            })))
                        }), i.when.apply(i, n).then(function() {
                            e.$("img.no-preload").each(function() {
                                var e = i(this);
                                e.attr("src", e.data("postload-src"))
                            }), e.$("div.no-preload").each(function() {
                                var e = i(this);
                                e.css("background-image", "url(" + e.data("postload-background-image") + ")")
                            }), console.log(e["class"] + ".render_d() - done"), t.resolve()
                        })
                    })
                },
                postRender: function() {},
                _clickJsNav: function(e) {
                    "_blank" !== i(e.currentTarget).attr("target") && (e.preventDefault(), this.spawn("appNav", e.currentTarget.pathname + e.currentTarget.search))
                },
                generateID: function() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16)
                }
            }));
        t.exports = o
    }, {
        "../config": 17,
        backbone: 3,
        "backbone-courier": 2,
        jquery: 11,
        underscore: 14
    }],
    32: [function(e, t, n) {
        var i = (e("jquery"), e("underscore"), e("backbone"), e("../config"), e("./base")),
            r = e("../templates/footer.tpl"),
            o = i.extend({
                "class": "\tFooterView",
                id: "main-footer",
                tagName: "footer",
                render: function() {
                    this.$el.html(r())
                }
            });
        t.exports = o
    }, {
        "../config": 17,
        "../templates/footer.tpl": 20,
        "./base": 31,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    33: [function(e, t, n) {
        var i = e("jquery"),
            r = (e("underscore"), e("backbone")),
            o = (e("../config"), e("../templates/modal.tpl")),
            a = r.View.extend({
                id: "global-modal",
                tagName: "a",
                events: {
                    "click .modal-close": "close",
                    click: "_closeUnlessBlocking"
                },
                initialize: function() {
                    var e = this;
                    e.status = e.$el.hasClass("loading") ? "loading" : e.$el.hasClass("danger") ? "danger" : e.$el.hasClass("normal") ? "normal" : "closed", e.content = e.$el.html(), e.closable = !e.$el.hasClass("loading"), e.blocking = e.$el.hasClass("loading"), i(document).keydown(function(t) {
                        27 == t.keyCode && (e.blocking && !e.closable || e.close())
                    })
                },
                render: function() {
                    var e = this;
                    e.$el.empty(), e.$el.append(o({
                        content: e.content,
                        status: e.status,
                        closable: e.closable
                    })), e.$el.removeClass().addClass("open " + e.status), e.delegateEvents()
                },
                close: function(e) {
                    e && (e.preventDefault(), e.stopPropagation()), console.log("ModalView.close()"), this.undelegateEvents(), this.$el.removeClass(), this.$el.html(""), this.status = "closed"
                },
                flash: function(e, t, n) {
                    this.status = t ? t : "normal", this.content = e, this.closable = !0, this.blocking = !1, this.render()
                },
                loading: function(e) {
                    "loading" !== this.status ? (this.status = "loading", this.content = e, this.closable = !1, this.blocking = !0, this.render()) : (this.content = e, e === !1 ? this.$(".modal-content").addClass("no-content").addClass("hidden") : e === !0 ? this.$(".modal-content").addClass("no-content").removeClass("hidden") : this.$(".modal-content").html(e).removeClass("no-content").removeClass("hidden"))
                },
                _closeUnlessBlocking: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.blocking || "modal-wrapper-inner" != e.originalEvent.srcElement.className || this.close()
                }
            });
        t.exports = a
    }, {
        "../config": 17,
        "../templates/modal.tpl": 22,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    34: [function(e, t, n) {
        var i = e("jquery"),
            r = (e("underscore"), e("backbone"), e("../../config")),
            o = e("@vimeo/player");
        window.jQuery = i.noConflict(!0), e("jquery-cycle2/build/jquery.cycle2.min");
        var a = e("../base"),
            s = e("../../templates/pages/about.tpl"),
            u = a.extend({
                "class": "\tAboutView",
                className: "about nav-green full-screen",
                render: function() {
                    var e = this;
                    if (e.$el.html(s()), i(document).width() >= r.breakpoints.md) {
                        var t = 0,
                            n = e.$(".cycle");
                        n.find(".slide").each(function() {
                            i(this).height() > t && (t = i(this).height())
                        }), n.css("min-height", t + 50 + "px").cycle({
                            slides: "> .slide",
                            timeout: 6e3
                        }), n.find(".cycle-pager *").on("click", function() {
                            n.cycle("pause")
                        })
                    }
                },
                postRender: function() {
                    var e = this;
                    if (i(document).width() >= r.desktop_breakpoint) {
                        console.log("AboutView.postRender() - Adding Video");
                        var t = "168225566",
                            n = i("<iframe>", {
                                src: "//player.vimeo.com/video/" + t + "?autoplay=0&autopause=0&loop=1&background=1&wmode=transparent",
                                frameborder: 0
                            });
                        e.$(".video-wrapper").append(n);
                        var a = new o(n.get(0));
                        a.ready().then(function() {
                            console.log("ready"), a.play()
                        }), a.on("loaded", function(e) {
                            console.log("loaded")
                        }), a.on("play", function(e) {
                            console.log("play")
                        }), a.on("progress", function(e) {
                            console.log("progress"), n.addClass("ready"), a.off("progress")
                        })
                    }
                }
            });
        t.exports = u
    }, {
        "../../config": 17,
        "../../templates/pages/about.tpl": 23,
        "../base": 31,
        "@vimeo/player": 1,
        backbone: 3,
        jquery: 11,
        "jquery-cycle2/build/jquery.cycle2.min": 9,
        underscore: 14
    }],
    35: [function(e, t, n) {
        var i = e("jquery"),
            r = e("underscore"),
            o = (e("backbone"), e("../../config")),
            a = e("../base");
        e("../../../vendor/jquery.date-dropdowns.min"), e("jquery.session");
        var s = e("secure-random"),
            u = e("../../templates/pages/contact.tpl"),
            l = a.extend({
                "class": "\tContactView",
                className: "contact",
                events: function() {
                    return r.extend(l.__super__.events, {
                        "change #f-country": "countryChanged",
                        "submit #contact-form": "formSubmitted"
                    })
                },
                render: function() {
                    var e = this;
                    window.recaptchaLoadCallback = function() {
                        grecaptcha.render(e.$(".g-recaptcha").get(0), {
                            sitekey: o.recaptcha_key
                        })
                    }, this.$el.html(u()), this.$("#birthdate").dateDropdowns({
                        defaultDate: null,
                        displayFormat: "mdy",
                        daySuffixes: !1,
                        submitFieldName: "form-data[birthdate]",
                        required: !0
                    }), this.$("#birthdate .month").attr("name", "form-data[birthdate][month]"), this.$("#birthdate .day").attr("name", "form-data[birthdate][day]"), this.$("#birthdate .year").attr("name", "form-data[birthdate][year]"), i.session.get("bd") && this.disableSubmit()
                },
                disableSubmit: function() {
                    this.$("input[type=submit]").prop("disabled", !0)
                },
                countryChanged: function(e) {
                    "US" == i("#f-country").val() || "CA" == i("#f-country").val() ? (i("#f-state").prop("disabled", !1).prop("required", !0), i(".f-state label sup").css("visibility", "visible")) : (i("#f-state").prop("disabled", !0).prop("required", !1).val(""), i(".f-state label sup").css("visibility", "hidden"))
                },
                formSubmitted: function(e) {
                    e.preventDefault(), this.disableSubmit();
                    var t = this;
                    i("#contact-form input[type=submit]").prop("disabled", !0), i.ajax({
                        type: "POST",
                        url: i("#contact-form").attr("action"),
                        data: i("#contact-form").serialize(),
                        dataType: "json",
                        success: function(e, n, r) {
                            grecaptcha.reset(), i("#contact-form input[type=submit]").prop("disabled", !1), e.success ? (i("#contact-form").find("input[type=text], input[type=email], input[type=tel], select, textarea").val(""), i("#contact-form").replaceWith('<p class="form-thanks"><strong>THANKS!</strong> We&rsquo;ll get back to you soon.<br />In the meantime, keep spreading those <strong>GOOD VIBES.</strong></p>')) : e.age_restriction ? (i.session.set("bd", s(10)), t.disableSubmit(), alert(e.errors.join("\n"))) : alert("Please correct the following errors and try again:\n\n" + e.errors.join("\n"))
                        },
                        error: function(e, t) {
                            grecaptcha.reset(), i("#contact-form input[type=submit]").prop("disabled", !1), alert("Something went wrong. Please try again later.")
                        }
                    })
                }
            });
        t.exports = l
    }, {
        "../../../vendor/jquery.date-dropdowns.min": 41,
        "../../config": 17,
        "../../templates/pages/contact.tpl": 24,
        "../base": 31,
        backbone: 3,
        jquery: 11,
        "jquery.session": 10,
        "secure-random": 13,
        underscore: 14
    }],
    36: [function(e, t, n) {
        var i = e("jquery"),
            r = e("underscore"),
            o = (e("backbone"), e("../../config")),
            a = e("@vimeo/player"),
            s = e("../base"),
            u = e("../../templates/pages/home.tpl"),
            l = s.extend({
                "class": "\tHomeView",
                tagName: "article",
                className: "home",
                events: function() {
                    return r.extend(l.__super__.events, {
                        "click .scroll-arrow": "onScrollArrowClick"
                    })
                },
                initialize: function() {
                    l.__super__.initialize.apply(this, arguments), this.snap_offsets = {}, this.viewport_pos = {}, this.scroll_timeout = null
                },
                render: function() {
                    var e = this;
                    e.$el.html(u()), i(window).on("resize.HomeView", function() {
                        e.onResize()
                    }), i("main#main-content").on("scroll.HomeView", function() {
                        e.onScroll()
                    })
                },
                postRender: function() {
                    if (i(document).width() >= o.desktop_breakpoint, !1) {
                        console.log("HomeView.postRender() - Adding Videos");
                        var e = ["168102082", "168126897", "168126898", "168126899"];
                        this.$("> .full-screen").each(function(t) {
                            var n = i("<iframe>", {
                                src: "//player.vimeo.com/video/" + e[t] + "?autoplay=0&autopause=0&loop=1&background=1&wmode=transparent",
                                frameborder: 0
                            });
                            i(this).find(".video-wrapper").append(n);
                            var r = new a(n.get(0));
                            r.ready().then(function() {
                                console.log(t + " ready"), r.play()
                            }), r.on("loaded", function(e) {
                                console.log(t + " loaded")
                            }), r.on("play", function(e) {
                                console.log(t + " play")
                            }), r.on("progress", function(e) {
                                console.log(t + " progress"), n.addClass("ready"), r.off("progress")
                            })
                        })
                    }
                    this.onResize(), this.onScroll()
                },
                remove: function() {
                    i(".home-asset").remove(), i(window).off(".HomeView"), i("main#main-content").off(".HomeView"), i("body").removeClass("nav-green at-bottom"), l.__super__.remove.apply(this, arguments)
                },
                onResize: function() {
                    var e = this;
                    e.$(".js-snap").each(function() {
                        i(this).attr("id") || i(this).attr("id", e.generateID()), e.snap_offsets[i(this).attr("id")] = i(this).position()
                    }), e.viewport_pos.height = i("main#main-content").height()
                },
                onScroll: function() {
                    var e = this;
                    e.viewport_pos.top = i("main#main-content").scrollTop(), clearTimeout(e.scroll_timeout);
                    var t = e.viewport_pos.height,
                        n = e.viewport_pos.height,
                        r = !1;
                    i(".js-snap").each(function() {
                        var o = e.snap_offsets[i(this).attr("id")];
                        Math.abs(o.top - e.viewport_pos.top) < n && (t = o.top - e.viewport_pos.top, n = Math.abs(t), r = this)
                    }), i(r).hasClass("js-nav-green") ? (i("body").addClass("nav-green"), e.$el.addClass("nav-green")) : (i("body").removeClass("nav-green"), e.$el.removeClass("nav-green")), i(r).hasClass("js-snap-last") ? i("body").addClass("at-bottom") : i("body").removeClass("at-bottom"), r && n > 0 && !(i(r).hasClass("js-snap-last") && t < 0) && (e.scroll_timeout = setTimeout(function() {
                        console.log("Scroll to ", r), i("main#main-content").animate({
                            scrollTop: "+=" + t
                        }, 300)
                    }, 800))
                },
                onScrollArrowClick: function(e) {
                    i("body").hasClass("at-bottom") ? i("main#main-content").animate({
                        scrollTop: 0
                    }, 800) : i("main#main-content").animate({
                        scrollTop: "+=" + this.viewport_pos.height
                    }, 500)
                }
            });
        t.exports = l
    }, {
        "../../config": 17,
        "../../templates/pages/home.tpl": 25,
        "../base": 31,
        "@vimeo/player": 1,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    37: [function(e, t, n) {
        var i = (e("jquery"), e("underscore"), e("backbone"), e("../../config"), e("../base")),
            r = e("../../templates/pages/locations.tpl"),
            o = i.extend({
                "class": "\tLocationsView",
                tagName: "article",
                className: "locations full-screen",
                initialize: function(e) {
                    o.__super__.initialize.apply(this, arguments), this.UPC = !!e.UPC && e.UPC
                },
                render: function() {
                    this.$el.html(r({
                        UPC: this.UPC
                    }))
                }
            });
        t.exports = o
    }, {
        "../../config": 17,
        "../../templates/pages/locations.tpl": 26,
        "../base": 31,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    38: [function(e, t, n) {
        var i = (e("jquery"), e("underscore"), e("backbone"), e("../../config"), e("../base")),
            r = e("../../templates/pages/notFound.tpl"),
            o = i.extend({
                "class": "\tNotFoundView",
                className: "not-found desktop-full-screen container nav-green",
                initialize: function(e) {
                    o.__super__.initialize.apply(this, arguments), this.request = e.request
                },
                render: function() {
                    this.$el.html(r({
                        request: this.request
                    }))
                }
            });
        t.exports = o
    }, {
        "../../config": 17,
        "../../templates/pages/notFound.tpl": 27,
        "../base": 31,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    39: [function(e, t, n) {
        var i = e("jquery"),
            r = e("underscore"),
            o = (e("backbone"), e("../../config")),
            a = e("../base"),
            s = e("../../templates/pages/sodaCans.tpl"),
            u = a.extend({
                "class": "\tSodaCansView",
                className: "container",
                id: "cans",
                events: function() {
                    return r.extend(u.__super__.events, {
                        "mouseenter .can": "can_mouseover",
                        "mouseleave .can": "can_mouseout",
                        "click .can": "can_tap",
                        "click .js-modal": "view_nutrition"
                    })
                },
                initialize: function() {
                    u.__super__.initialize.apply(this, arguments), this.safe_distance = 900, this.push_rate_x = .15, this.push_rate_y = .24, this.can_offsets = [], this.mouseover_timeout = !1
                },
                render: function() {
                    var e = this;
                    this.$el.html(s({
                        sodas: o.sodas,
                        fruits_per_soda: o.fruits_per_soda
                    })), i(window).on("resize.SodaCansView", function() {
                        e.onResize()
                    })
                },
                remove: function() {
                    clearTimeout(this.mouseover_timeout), i(window).off(".SodaCansView"), u.__super__.remove.apply(this, arguments)
                },
                onResize: function() {
                    var e = this;
                    e.viewport_width = i(document).width(), e.$(".can").each(function(t) {
                        i(this).attr("id") || i(this).attr("id", "can-" + t);
                        var n = this.getBoundingClientRect(),
                            r = {
                                top: n.top + window.pageYOffset,
                                left: n.left + window.pageXOffset,
                                width: n.width,
                                height: n.height
                            };
                        r.y = r.top + r.height / 2, r.x = r.left + r.width / 2, e.can_offsets[i(this).attr("id")] = r
                    })
                },
                offsets_distance: function(e, t) {
                    var n = {
                        x: e.x - t.x,
                        y: e.y - t.y
                    };
                    return n.x_abs = Math.abs(n.x), n.y_abs = Math.abs(n.y), n.abs = Math.sqrt(n.x_abs * n.x_abs + n.y_abs * n.y_abs), n
                },
                can_mouseover: function(e) {
                    i(document).width() < o.desktop_breakpoint || (console.log("MOUSEOVER"), this.can_activate(e))
                },
                can_tap: function(e) {
                    if (!(i(document).width() >= o.desktop_breakpoint)) {
                        console.log("TAPPED");
                        var t = this;
                        t.$(".can.hover").length ? (t.can_deactivate(), setTimeout(function() {
                            t.$(".can").css({
                                "margin-bottom": "",
                                opacity: ""
                            }), i("#mobile-active").remove(), "mobile-active" != i(e.currentTarget).attr("id") && t.can_activate(e)
                        }, 600)) : t.can_activate(e)
                    }
                },
                can_activate: function(e) {
                    var t = this;
                    t.$(".can").css({
                        transform: "",
                        "-webkit-transform": ""
                    });
                    var n = i(e.currentTarget),
                        r = t.can_offsets[n.attr("id")];
                    if (i(document).width() < o.desktop_breakpoint) {
                        var a = n;
                        n = n.clone(), n.attr("id", "mobile-active");
                        var s = "translateX(" + (r.x - t.viewport_width / 2) + "px)";
                        n.find(".bg-translate, .fruits").css({
                            transform: s,
                            "-webkit-transform": s
                        }), a.css({
                            "margin-bottom": "25%",
                            opacity: "0"
                        }), n.insertAfter(a)
                    }
                    setTimeout(function() {
                        n.addClass("hover")
                    }, 1), clearTimeout(t.mouseover_timeout), t.mouseover_timeout = setTimeout(function() {
                        n.addClass("active");
                        var e = [{
                            y: 20,
                            x: 4,
                            scale: .4
                        }, {
                            y: 30,
                            x: 10,
                            scale: .6
                        }, {
                            y: 50,
                            x: 20,
                            scale: 1
                        }, {
                            y: 70,
                            x: 10,
                            scale: .6
                        }, {
                            y: 80,
                            x: 4,
                            scale: .4
                        }];
                        n.find(".fruit").each(function(t) {
                            var n, o, a;
                            if (t < 2 * e.length) {
                                var s;
                                t < e.length ? (s = e[t], n = 0 - s.x) : (s = e[t - e.length], n = 100 + s.x), o = s.y, a = s.scale
                            } else {
                                var u = 0,
                                    l = 30,
                                    c = 0,
                                    p = 40,
                                    d = 40,
                                    f = 100;
                                o = Math.floor(Math.random() * p) + c;
                                var h = (p - o) / p;
                                a = (Math.floor(Math.random() * (h * f)) + d) / 100, n = Math.floor(Math.random() * (h * l)) + u, n = Math.random() > .5 ? 0 - n : 100 + n, o = Math.random() > .5 ? 50 + o : 50 - o
                            }
                            n = n / 100 * r.width - r.width / 2, o = o / 100 * r.height - r.height / 2;
                            var v = Math.floor(360 * Math.random()) + 1,
                                g = "scale(" + a + ", " + a + ") rotate(" + v + "deg)";
                            i(this).css({
                                transform: g,
                                "-webkit-transform": g
                            });
                            var m = "translate(" + n + "px, " + o + "px)";
                            i(this).parent(".fruit-translate").css({
                                transform: m,
                                "-webkit-transform": m
                            })
                        })
                    }, 500), i(document).width() >= o.desktop_breakpoint && t.$(".can").each(function() {
                        if (i(this).attr("id") != n.attr("id")) {
                            var e = t.offsets_distance(r, t.can_offsets[i(this).attr("id")]);
                            if (e.abs < t.safe_distance) {
                                var o = 0;
                                if (e.x_abs > 0 && e.x_abs < t.safe_distance) {
                                    var a = e.y_abs > 0 ? e.y_abs / (e.x_abs + e.y_abs) : 1;
                                    o = (t.safe_distance - e.abs) * a * t.push_rate_x, o *= e.x > 0 ? -1 : 1
                                }
                                var s = 0;
                                if (e.y_abs > 0 && e.y_abs < t.safe_distance) {
                                    var u = e.x_abs > 0 ? e.x_abs / (e.x_abs + e.y_abs) : 1;
                                    s = (t.safe_distance - e.abs) * u * t.push_rate_y, s *= e.y > 0 ? -1 : 1
                                }
                                var l = "translate(" + o + "px, " + s + "px)";
                                i(this).css({
                                    transform: l,
                                    "-webkit-transform": l
                                })
                            }
                        }
                    })
                },
                can_mouseout: function(e) {
                    i(document).width() < o.desktop_breakpoint || (clearTimeout(this.mouseover_timeout), this.can_deactivate(e))
                },
                can_deactivate: function(e) {
                    this.$(".can").removeClass("active hover").css({
                        transform: "",
                        "-webkit-transform": ""
                    }), this.$(".fruit, .fruit-translate").css({
                        transform: "",
                        "-webkit-transform": ""
                    })
                },
                view_nutrition: function(e) {
                    e.preventDefault(), e.stopPropagation(), this.spawn("modal", {
                        type: "image",
                        value: e.currentTarget
                    })
                }
            });
        t.exports = u
    }, {
        "../../config": 17,
        "../../templates/pages/sodaCans.tpl": 28,
        "../base": 31,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    40: [function(e, t, n) {
        var i = e("jquery"),
            r = (e("underscore"), e("backbone"), e("../../config"), e("../base")),
            o = e("./sodaCans"),
            a = e("../../templates/pages/sodas.tpl"),
            s = r.extend({
                "class": "\tSodasView",
                className: "sodas nav-green",
                passMessages: {
                    "*": "."
                },
                initialize: function() {
                    this.cansView = new o, s.__super__.initialize.apply(this, arguments)
                },
                render: function() {
                    var e = this;
                    this.$el.html(a()), i("#application").append(i("<nav>", {
                        id: "sodas-nav",
                        "class": "page-asset sodas-asset"
                    }).append(i("<a>", {
                        "class": "btn blue active",
                        text: "All",
                        href: "#",
                        "data-hide-class": ""
                    })).append(i("<a>", {
                        "class": "btn blue",
                        text: "Original",
                        href: "#original",
                        "data-hide-class": "diet"
                    })).append(i("<a>", {
                        "class": "btn blue",
                        text: "Diet",
                        href: "#diet",
                        "data-hide-class": "original"
                    }))), i("#sodas-nav .btn").on("click.SodasView", function(t) {
                        e.onClickSodasNav(t)
                    })
                },
                postRender: function() {
                    var e = this;
                    this.cansView.setElement(this.$("#cans")), this.cansView.render_d().then(function() {
                        setTimeout(function() {
                            e.$("#cans, #cans-loader").addClass("loaded"), e.cansView.onResize()
                        }, 10)
                    })
                },
                remove: function() {
                    i(".sodas-asset").remove(), s.__super__.remove.apply(this, arguments)
                },
                onClickSodasNav: function(e) {
                    var t = this,
                        n = i(e.currentTarget);
                    i("#sodas-nav .btn").removeClass("active"), t.$(".can").show(), n.data("hide-class") && t.$(".can." + n.data("hide-class")).hide(), t.cansView.onResize(), n.addClass("active")
                }
            });
        t.exports = s
    }, {
        "../../config": 17,
        "../../templates/pages/sodas.tpl": 29,
        "../base": 31,
        "./sodaCans": 39,
        backbone: 3,
        jquery: 11,
        underscore: 14
    }],
    41: [function(e, t, n) {
        ! function(e, t, n) {
            "use strict";

            function i(t, n) {
                return this.element = t, this.$element = e(t), this.config = e.extend({}, o, n), this.internals = {
                    objectRefs: {}
                }, this.init(), this
            }
            var r = "dateDropdowns",
                o = {
                    defaultDate: null,
                    defaultDateFormat: "yyyy-mm-dd",
                    displayFormat: "dmy",
                    submitFormat: "yyyy-mm-dd",
                    minAge: 0,
                    maxAge: 120,
                    minYear: null,
                    maxYear: null,
                    submitFieldName: "date",
                    wrapperClass: "date-dropdowns",
                    dropdownClass: null,
                    daySuffixes: !0,
                    monthSuffixes: !0,
                    monthFormat: "long",
                    required: !1
                };
            i.message = {
                day: "Day",
                month: "Month",
                year: "Year"
            }, e.extend(i.prototype, {
                init: function() {
                    this.checkForDuplicateElement(), this.setInternalVariables(), this.setupMarkup(), this.buildDropdowns(), this.attachDropdowns(), this.bindChangeEvent(), this.config.defaultDate && this.populateDefaultDate()
                },
                checkForDuplicateElement: function() {
                    return !e('input[name="' + this.config.submitFieldName + '"]').length || (e.error("Duplicate element found"), !1)
                },
                setInternalVariables: function() {
                    var e = new Date;
                    this.internals.currentDay = e.getDate(), this.internals.currentMonth = e.getMonth() + 1, this.internals.currentYear = e.getFullYear(), this.internals.monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.internals.monthLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                setupMarkup: function() {
                    var t, n;
                    if ("input" === this.element.tagName.toLowerCase()) {
                        this.config.defaultDate || (this.config.defaultDate = this.element.value), n = this.$element.attr("type", "hidden").wrap('<div class="' + this.config.wrapperClass + '"></div>');
                        var i = this.config.submitFieldName !== o.submitFieldName,
                            r = this.element.hasAttribute("name");
                        r || i ? i && this.$element.attr("name", this.config.submitFieldName) : this.$element.attr("name", o.submitFieldName), t = this.$element.parent()
                    } else n = e("<input/>", {
                        type: "hidden",
                        name: this.config.submitFieldName
                    }), this.$element.append(n).addClass(this.config.wrapperClass), t = this.$element;
                    return this.internals.objectRefs.pluginWrapper = t, this.internals.objectRefs.hiddenField = n, !0
                },
                buildDropdowns: function() {
                    var e, t, n;
                    return e = this.buildDayDropdown(), this.internals.objectRefs.dayDropdown = e, t = this.buildMonthDropdown(), this.internals.objectRefs.monthDropdown = t, n = this.buildYearDropdown(), this.internals.objectRefs.yearDropdown = n, !0
                },
                attachDropdowns: function() {
                    var e = this.internals.objectRefs.pluginWrapper,
                        t = this.internals.objectRefs.dayDropdown,
                        n = this.internals.objectRefs.monthDropdown,
                        i = this.internals.objectRefs.yearDropdown;
                    switch (this.config.displayFormat) {
                        case "mdy":
                            e.append(n, t, i);
                            break;
                        case "ymd":
                            e.append(i, n, t);
                            break;
                        case "dmy":
                        default:
                            e.append(t, n, i)
                    }
                    return !0
                },
                bindChangeEvent: function() {
                    var e = this.internals.objectRefs.dayDropdown,
                        t = this.internals.objectRefs.monthDropdown,
                        n = this.internals.objectRefs.yearDropdown,
                        i = this,
                        r = this.internals.objectRefs;
                    r.pluginWrapper.on("change", "select", function() {
                        var o, a, s = e.val(),
                            u = t.val(),
                            l = n.val();
                        return (o = i.checkDate(s, u, l)) ? (r.dayDropdown.addClass("invalid"), !1) : ("00" !== r.dayDropdown.val() && r.dayDropdown.removeClass("invalid"), r.hiddenField.val(""), o || s * u * l === 0 || (a = i.formatSubmitDate(s, u, l), r.hiddenField.val(a)), void r.hiddenField.change())
                    })
                },
                populateDefaultDate: function() {
                    var e = this.config.defaultDate,
                        t = [],
                        n = "",
                        i = "",
                        r = "";
                    switch (this.config.defaultDateFormat) {
                        case "yyyy-mm-dd":
                        default:
                            t = e.split("-"), n = t[2], i = t[1], r = t[0];
                            break;
                        case "dd/mm/yyyy":
                            t = e.split("/"), n = t[0], i = t[1], r = t[2];
                            break;
                        case "mm/dd/yyyy":
                            t = e.split("/"), n = t[1], i = t[0], r = t[2];
                            break;
                        case "unix":
                            t = new Date, t.setTime(1e3 * e), n = t.getDate() + "", i = t.getMonth() + 1 + "", r = t.getFullYear(), n.length < 2 && (n = "0" + n), i.length < 2 && (i = "0" + i)
                    }
                    return this.internals.objectRefs.dayDropdown.val(n), this.internals.objectRefs.monthDropdown.val(i), this.internals.objectRefs.yearDropdown.val(r), this.internals.objectRefs.hiddenField.val(e), !0 === this.checkDate(n, i, r) && this.internals.objectRefs.dayDropdown.addClass("invalid"), !0
                },
                buildBaseDropdown: function(t) {
                    var n = t;
                    return this.config.dropdownClass && (n += " " + this.config.dropdownClass), e("<select></select>", {
                        "class": n,
                        name: this.config.submitFieldName + "_[" + t + "]",
                        required: this.config.required
                    })
                },
                buildDayDropdown: function() {
                    var e, t = this.buildBaseDropdown("day"),
                        r = n.createElement("option");
                    r.setAttribute("value", ""), r.appendChild(n.createTextNode(i.message.day)), t.append(r);
                    for (var o = 1; 10 > o; o++) e = this.config.daySuffixes ? o + this.getSuffix(o) : "0" + o, r = n.createElement("option"), r.setAttribute("value", "0" + o), r.appendChild(n.createTextNode(e)), t.append(r);
                    for (var a = 10; 31 >= a; a++) e = a, this.config.daySuffixes && (e = a + this.getSuffix(a)), r = n.createElement("option"), r.setAttribute("value", a), r.appendChild(n.createTextNode(e)), t.append(r);
                    return t
                },
                buildMonthDropdown: function() {
                    var e = this.buildBaseDropdown("month"),
                        t = n.createElement("option");
                    t.setAttribute("value", ""), t.appendChild(n.createTextNode(i.message.month)), e.append(t);
                    for (var r = 1; 12 >= r; r++) {
                        var o;
                        switch (this.config.monthFormat) {
                            case "short":
                                o = this.internals.monthShort[r - 1];
                                break;
                            case "long":
                                o = this.internals.monthLong[r - 1];
                                break;
                            case "numeric":
                                o = r, this.config.monthSuffixes && (o += this.getSuffix(r))
                        }
                        10 > r && (r = "0" + r), t = n.createElement("option"), t.setAttribute("value", r),
                            t.appendChild(n.createTextNode(o)), e.append(t)
                    }
                    return e
                },
                buildYearDropdown: function() {
                    var e = this.config.minYear,
                        t = this.config.maxYear,
                        r = this.buildBaseDropdown("year"),
                        o = n.createElement("option");
                    o.setAttribute("value", ""), o.appendChild(n.createTextNode(i.message.year)), r.append(o), e || (e = this.internals.currentYear - (this.config.maxAge + 1)), t || (t = this.internals.currentYear - this.config.minAge);
                    for (var a = t; a >= e; a--) o = n.createElement("option"), o.setAttribute("value", a), o.appendChild(n.createTextNode(a)), r.append(o);
                    return r
                },
                getSuffix: function(e) {
                    var t = "";
                    switch (e % 10) {
                        case 1:
                            t = e % 100 === 11 ? "th" : "st";
                            break;
                        case 2:
                            t = e % 100 === 12 ? "th" : "nd";
                            break;
                        case 3:
                            t = e % 100 === 13 ? "th" : "rd";
                            break;
                        default:
                            t = "th"
                    }
                    return t
                },
                checkDate: function(e, t, n) {
                    var i;
                    if ("00" !== t) {
                        var r = new Date(n, t, 0).getDate(),
                            o = parseInt(e, 10);
                        i = this.updateDayOptions(r, o), i && this.internals.objectRefs.hiddenField.val("")
                    }
                    return i
                },
                updateDayOptions: function(e, t) {
                    var i = parseInt(this.internals.objectRefs.dayDropdown.children(":last").val(), 10),
                        r = "",
                        o = "",
                        a = !1;
                    if (i > e) {
                        for (; i > e;) this.internals.objectRefs.dayDropdown.children(":last").remove(), i--;
                        t > e && (a = !0)
                    } else if (e > i)
                        for (; e > i;) {
                            r = ++i, o = r, this.config.daySuffixes && (o += this.getSuffix(i));
                            var s = n.createElement("option");
                            s.setAttribute("value", r), s.appendChild(n.createTextNode(o)), this.internals.objectRefs.dayDropdown.append(s)
                        }
                    return a
                },
                formatSubmitDate: function(e, t, n) {
                    var i, r;
                    switch (this.config.submitFormat) {
                        case "unix":
                            r = new Date, r.setDate(e), r.setMonth(t - 1), r.setYear(n), i = Math.round(r.getTime() / 1e3);
                            break;
                        default:
                            i = this.config.submitFormat.replace("dd", e).replace("mm", t).replace("yyyy", n)
                    }
                    return i
                },
                destroy: function() {
                    var e = this.config.wrapperClass;
                    if (this.$element.hasClass(e)) this.$element.empty();
                    else {
                        var t = this.$element.parent(),
                            n = t.find("select");
                        this.$element.unwrap(), n.remove()
                    }
                }
            }), e.fn[r] = function(t) {
                return this.each(function() {
                    if ("string" == typeof t) {
                        var n = Array.prototype.slice.call(arguments, 1),
                            o = e.data(this, "plugin_" + r);
                        if ("undefined" == typeof o) return e.error("Please initialize the plugin before calling this method."), !1;
                        o[t].apply(o, n)
                    } else e.data(this, "plugin_" + r) || e.data(this, "plugin_" + r, new i(this, t))
                }), this
            }
        }(jQuery, window, document)
    }, {}]
}, {}, [18]);