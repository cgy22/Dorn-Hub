
/* modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-animation-appearance-audio-audioloop-backgroundblendmode-backgroundcliptext-borderradius-boxsizing-canvas-checked-contenteditable-contextmenu-cookies-cssanimations-csscolumns-cssgradients-csspositionsticky-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-emoji-filereader-flash-flexbox-flexboxlegacy-fontface-fullscreen-geolocation-hashchange-history-ie8compat-inlinesvg-inputtypes-json-lastchild-mediaqueries-multiplebgs-nthchild-objectfit-opacity-search-smil-svg-svgasimg-svgclippaths-textshadow-touchevents-unicode-video-videoautoplay-webgl-xdomainrequest-setclasses !*/
! function(ac, aD, J) {
	function at(a, b) {
		return typeof a === b
	}

	function av() {
		var d, k, c, g, f, b, h;
		for (var j in aE) {
			if (aE.hasOwnProperty(j)) {
				if (d = [], k = aE[j], k.name && (d.push(k.name.toLowerCase()), k.options && k.options.aliases && k.options.aliases.length)) {
					for (c = 0; c < k.options.aliases.length; c++) {
						d.push(k.options.aliases[c].toLowerCase())
					}
				}
				for (g = at(k.fn, "function") ? k.fn() : k.fn, f = 0; f < d.length; f++) {
					b = d[f], h = b.split("."), 1 === h.length ? ar[h[0]] = g : (!ar[h[0]] || ar[h[0]] instanceof Boolean || (ar[h[0]] = new Boolean(ar[h[0]])), ar[h[0]][h[1]] = g), aJ.push((g ? "" : "no-") + h.join("-"))
				}
			}
		}
	}

	function ak(b) {
		var d = K.className,
			a = ar._config.classPrefix || "";
		if (aA && (d = d.baseVal), ar._config.enableJSClass) {
			var c = new RegExp("(^|\\s)" + a + "no-js(\\s|$)");
			d = d.replace(c, "$1" + a + "js$2")
		}
		ar._config.enableClasses && (d += " " + a + b.join(" " + a), aA ? K.className.baseVal = d : K.className = d)
	}

	function q() {
		return "function" != typeof aD.createElement ? aD.createElement(arguments[0]) : aA ? aD.createElementNS.call(aD, "http://www.w3.org/2000/svg", arguments[0]) : aD.createElement.apply(aD, arguments)
	}

	function az() {
		var a = aD.body;
		return a || (a = q(aA ? "svg" : "body"), a.fake = !0), a
	}

	function aB(a, b) {
		return a - 1 === b || a === b || a + 1 === b
	}

	function aa(b, f) {
		if ("object" == typeof b) {
			for (var a in b) {
				ax(b, a) && aa(a, b[a])
			}
		} else {
			b = b.toLowerCase();
			var c = b.split("."),
				d = ar[c[0]];
			if (2 == c.length && (d = d[c[1]]), "undefined" != typeof d) {
				return ar
			}
			f = "function" == typeof f ? f() : f, 1 == c.length ? ar[c[0]] = f : (!ar[c[0]] || ar[c[0]] instanceof Boolean || (ar[c[0]] = new Boolean(ar[c[0]])), ar[c[0]][c[1]] = f), ak([(f && 0 != f ? "" : "no-") + c.join("-")]), ar._trigger(b, f)
		}
		return ar
	}

	function ao(a) {
		return a.replace(/([a-z])-([a-z])/g, function(c, d, b) {
				return d + b.toUpperCase()
			})
			.replace(/^-/, "")
	}

	function O(g, a, k, m) {
		var h, t, f, j, b = "modernizr",
			v = q("div"),
			r = az();
		if (parseInt(k, 10)) {
			for (; k--;) {
				f = q("div"), f.id = m ? m[k] : b + (k + 1), v.appendChild(f)
			}
		}
		return h = q("style"), h.type = "text/css", h.id = "s" + b, (r.fake ? r : v)
			.appendChild(h), r.appendChild(v), h.styleSheet ? h.styleSheet.cssText = g : h.appendChild(aD.createTextNode(g)), v.id = b, r.fake && (r.style.background = "", r.style.overflow = "hidden", j = K.style.overflow, K.style.overflow = "hidden", K.appendChild(r)), t = a(v, g), r.fake ? (r.parentNode.removeChild(r), K.style.overflow = j, K.offsetHeight) : v.parentNode.removeChild(v), !!t
	}

	function aF(a, b) {
		return !!~("" + a)
			.indexOf(b)
	}

	function aw(a, b) {
		return function() {
			return a.apply(b, arguments)
		}
	}

	function ae(b, f, a) {
		var d;
		for (var c in b) {
			if (b[c] in f) {
				return a === !1 ? b[c] : (d = f[b[c]], at(d, "function") ? aw(d, a || f) : d)
			}
		}
		return !1
	}

	function ai(a) {
		return a.replace(/([A-Z])/g, function(b, c) {
				return "-" + c.toLowerCase()
			})
			.replace(/^ms-/, "-ms-")
	}

	function ap(d, b) {
		var c = d.length;
		if ("CSS" in ac && "supports" in ac.CSS) {
			for (; c--;) {
				if (ac.CSS.supports(ai(d[c]), b)) {
					return !0
				}
			}
			return !1
		}
		if ("CSSSupportsRule" in ac) {
			for (var a = []; c--;) {
				a.push("(" + ai(d[c]) + ":" + b + ")")
			}
			return a = a.join(" or "), O("@supports (" + a + ") { #modernizr { position: absolute; } }", function(f) {
				return "absolute" == getComputedStyle(f, null)
					.position
			})
		}
		return J
	}

	function ag(j, z, u, n) {
		function x() {
			b && (delete aj.style, delete aj.modElem)
		}
		if (n = at(n, "undefined") ? !1 : n, !at(u, "undefined")) {
			var y = ap(j, u);
			if (!at(y, "undefined")) {
				return y
			}
		}
		for (var b, a, w, k, m, l = ["modernizr", "tspan"]; !aj.style;) {
			b = !0, aj.modElem = q(l.shift()), aj.style = aj.modElem.style
		}
		for (w = j.length, a = 0; w > a; a++) {
			if (k = j[a], m = aj.style[k], aF(k, "-") && (k = ao(k)), aj.style[k] !== J) {
				if (n || at(u, "undefined")) {
					return x(), "pfx" == z ? k : !0
				}
				try {
					aj.style[k] = u
				} catch (A) {}
				if (aj.style[k] != m) {
					return x(), "pfx" == z ? k : !0
				}
			}
		}
		return x(), !1
	}

	function aH(d, j, c, g, f) {
		var b = d.charAt(0)
			.toUpperCase() + d.slice(1),
			h = (d + " " + aI.join(b + " ") + b)
			.split(" ");
		return at(j, "string") || at(j, "undefined") ? ag(h, j, g, f) : (h = (d + " " + aG.join(b + " ") + b)
			.split(" "), ae(h, j, c))
	}

	function aM(a, c, b) {
		return aH(a, J, J, c, b)
	}
	var aJ = [],
		aE = [],
		aL = {
			_version: "3.3.1",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(b, c) {
				var a = this;
				setTimeout(function() {
					c(a[b])
				}, 0)
			},
			addTest: function(b, c, a) {
				aE.push({
					name: b,
					fn: c,
					options: a
				})
			},
			addAsyncTest: function(a) {
				aE.push({
					name: null,
					fn: a
				})
			}
		},
		ar = function() {};
	ar.prototype = aL, ar = new ar, ar.addTest("cookies", function() {
		try {
			aD.cookie = "cookietest=1";
			var b = -1 != aD.cookie.indexOf("cookietest=");
			return aD.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", b
		} catch (a) {
			return !1
		}
	}), ar.addTest("geolocation", "geolocation" in navigator), ar.addTest("history", function() {
		var a = navigator.userAgent;
		return -1 === a.indexOf("Android 2.") && -1 === a.indexOf("Android 4.0") || -1 === a.indexOf("Mobile Safari") || -1 !== a.indexOf("Chrome") || -1 !== a.indexOf("Windows Phone") ? ac.history && "pushState" in ac.history : !1
	}), ar.addTest("ie8compat", !ac.addEventListener && !!aD.documentMode && 7 === aD.documentMode), ar.addTest("json", "JSON" in ac && "parse" in JSON && "stringify" in JSON), ar.addTest("svg", !!aD.createElementNS && !!aD.createElementNS("http://www.w3.org/2000/svg", "svg")
		.createSVGRect), ar.addTest("xdomainrequest", "XDomainRequest" in ac), ar.addTest("filereader", !!(ac.File && ac.FileList && ac.FileReader));
	var K = aD.documentElement;
	ar.addTest("contextmenu", "contextMenu" in K && "HTMLMenuItemElement" in ac);
	var aA = "svg" === K.nodeName.toLowerCase();
	ar.addTest("audio", function() {
		var b = q("audio"),
			c = !1;
		try {
			(c = !!b.canPlayType) && (c = new Boolean(c), c.ogg = b.canPlayType('audio/ogg; codecs="vorbis"')
				.replace(/^no$/, ""), c.mp3 = b.canPlayType('audio/mpeg; codecs="mp3"')
				.replace(/^no$/, ""), c.opus = b.canPlayType('audio/ogg; codecs="opus"') || b.canPlayType('audio/webm; codecs="opus"')
				.replace(/^no$/, ""), c.wav = b.canPlayType('audio/wav; codecs="1"')
				.replace(/^no$/, ""), c.m4a = (b.canPlayType("audio/x-m4a;") || b.canPlayType("audio/aac;"))
				.replace(/^no$/, ""))
		} catch (a) {}
		return c
	}), ar.addTest("canvas", function() {
		var a = q("canvas");
		return !(!a.getContext || !a.getContext("2d"))
	}), ar.addTest("contenteditable", function() {
		if ("contentEditable" in K) {
			var a = q("div");
			return a.contentEditable = !0, "true" === a.contentEditable
		}
	}), ar.addTest("video", function() {
		var b = q("video"),
			c = !1;
		try {
			(c = !!b.canPlayType) && (c = new Boolean(c), c.ogg = b.canPlayType('video/ogg; codecs="theora"')
				.replace(/^no$/, ""), c.h264 = b.canPlayType('video/mp4; codecs="avc1.42E01E"')
				.replace(/^no$/, ""), c.webm = b.canPlayType('video/webm; codecs="vp8, vorbis"')
				.replace(/^no$/, ""), c.vp9 = b.canPlayType('video/webm; codecs="vp9"')
				.replace(/^no$/, ""), c.hls = b.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"')
				.replace(/^no$/, ""))
		} catch (a) {}
		return c
	}), ar.addTest("webanimations", "animate" in q("div")), ar.addTest("webgl", function() {
		var b = q("canvas"),
			a = "probablySupportsContext" in b ? "probablySupportsContext" : "supportsContext";
		return a in b ? b[a]("webgl") || b[a]("experimental-webgl") : "WebGLRenderingContext" in ac
	}), ar.addTest("audioloop", "loop" in q("audio")), ar.addTest("multiplebgs", function() {
		var a = q("a")
			.style;
		return a.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(a.background)
	}), ar.addTest("inlinesvg", function() {
		var a = q("div");
		return a.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && a.firstChild && a.firstChild.namespaceURI)
	}), ar.addTest("canvastext", function() {
		return ar.canvas === !1 ? !1 : "function" == typeof q("canvas")
			.getContext("2d")
			.fillText
	}), ar.addTest("emoji", function() {
		if (!ar.canvastext) {
			return !1
		}
		var d = ac.devicePixelRatio || 1,
			a = 12 * d,
			b = q("canvas"),
			c = b.getContext("2d");
		return c.fillStyle = "#f00", c.textBaseline = "top", c.font = "32px Arial", c.fillText("🐨", 0, 0), 0 !== c.getImageData(a, a, 1, 1)
			.data[0]
	});
	var X = function() {
		function a(c, f) {
			var d;
			return c ? (f && "string" != typeof f || (f = q(f || "div")), c = "on" + c, d = c in f, !d && b && (f.setAttribute || (f = q("div")), f.setAttribute(c, ""), d = "function" == typeof f[c], f[c] !== J && (f[c] = J), f.removeAttribute(c)), d) : !1
		}
		var b = !("onblur" in aD.documentElement);
		return a
	}();
	aL.hasEvent = X, ar.addTest("hashchange", function() {
		return X("hashchange", ac) === !1 ? !1 : aD.documentMode === J || aD.documentMode > 7
	}), ar.addTest("inputsearchevent", X("search"));
	var ad = q("input"),
		aC = "search tel url email datetime date month week time datetime-local number range color".split(" "),
		L = {};
	ar.inputtypes = function(c) {
		for (var f, g, d, b = c.length, h = "1)", j = 0; b > j; j++) {
			ad.setAttribute("type", f = c[j]), d = "text" !== ad.type && "style" in ad, d && (ad.value = h, ad.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && ad.style.WebkitAppearance !== J ? (K.appendChild(ad), g = aD.defaultView, d = g.getComputedStyle && "textfield" !== g.getComputedStyle(ad, null)
				.WebkitAppearance && 0 !== ad.offsetHeight, K.removeChild(ad)) : /^(search|tel)$/.test(f) || (d = /^(url|email)$/.test(f) ? ad.checkValidity && ad.checkValidity() === !1 : ad.value != h)), L[c[j]] = !!d
		}
		return L
	}(aC);
	var an = aL._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	aL._prefixes = an, ar.addTest("cssgradients", function() {
		for (var b, j = "background-image:", a = "gradient(linear,left top,right bottom,from(#9f9),to(white));", d = "", f = 0, c = an.length - 1; c > f; f++) {
			b = 0 === f ? "to " : "", d += j + an[f] + "linear-gradient(" + b + "left top, #9f9, white);"
		}
		ar._config.usePrefixes && (d += j + "-webkit-" + a);
		var g = q("a"),
			h = g.style;
		return h.cssText = d, ("" + h.backgroundImage)
			.indexOf("gradient") > -1
	}), ar.addTest("opacity", function() {
		var a = q("a")
			.style;
		return a.cssText = an.join("opacity:.55;"), /^0.55$/.test(a.opacity)
	}), ar.addTest("csspositionsticky", function() {
		var b = "position:",
			d = "sticky",
			a = q("a"),
			c = a.style;
		return c.cssText = b + an.join(d + ";" + b)
			.slice(0, -b.length), -1 !== c.position.indexOf(d)
	});
	var af = "CSS" in ac && "supports" in ac.CSS,
		ah = "supportsCSS" in ac;
	ar.addTest("supports", af || ah);
	var aq = {}.toString;
	ar.addTest("svgclippaths", function() {
		return !!aD.createElementNS && /SVGClipPath/.test(aq.call(aD.createElementNS("http://www.w3.org/2000/svg", "clipPath")))
	});
	var ax;
	! function() {
		var a = {}.hasOwnProperty;
		ax = at(a, "undefined") || at(a.call, "undefined") ? function(b, c) {
			return c in b && at(b.constructor.prototype[c], "undefined")
		} : function(c, b) {
			return a.call(c, b)
		}
	}(), aL._l = {}, aL.on = function(a, b) {
		this._l[a] || (this._l[a] = []), this._l[a].push(b), ar.hasOwnProperty(a) && setTimeout(function() {
			ar._trigger(a, ar[a])
		}, 0)
	}, aL._trigger = function(b, c) {
		if (this._l[b]) {
			var a = this._l[b];
			setTimeout(function() {
				var d, f;
				for (d = 0; d < a.length; d++) {
					(f = a[d])(c)
				}
			}, 0), delete this._l[b]
		}
	}, ar._q.push(function() {
		aL.addTest = aa
	}), ar.addAsyncTest(function() {
		var a, h, j = function(c) {
				K.contains(c) || K.appendChild(c)
			},
			e = function(c) {
				c.fake && c.parentNode && c.parentNode.removeChild(c)
			},
			m = function(f, i) {
				var c = !!f;
				if (c && (c = new Boolean(c), c.blocked = "blocked" === f), aa("flash", function() {
					return c
				}), i && d.contains(i)) {
					for (; i.parentNode !== d;) {
						i = i.parentNode
					}
					d.removeChild(i)
				}
			};
		try {
			h = "ActiveXObject" in ac && "Pan" in new ac.ActiveXObject("ShockwaveFlash.ShockwaveFlash")
		} catch (g) {}
		if (a = !("plugins" in navigator && "Shockwave Flash" in navigator.plugins || h), a || aA) {
			m(!1)
		} else {
			var b, r, k = q("embed"),
				d = az();
			if (k.type = "application/x-shockwave-flash", d.appendChild(k), !("Pan" in k || h)) {
				return j(d), m("blocked", k), void e(d)
			}
			b = function() {
				return j(d), K.contains(d) ? (K.contains(k) ? (r = k.style.cssText, "" !== r ? m("blocked", k) : m(!0, k)) : m("blocked"), void e(d)) : (d = aD.body || d, k = q("embed"), k.type = "application/x-shockwave-flash", d.appendChild(k), setTimeout(b, 1000))
			}, setTimeout(b, 10)
		}
	}), ar.addTest("svgasimg", aD.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")), ar.addAsyncTest(function() {
		function b(e) {
			clearTimeout(g), d.removeEventListener("playing", b, !1), aa("videoautoplay", e && "playing" === e.type || 0 !== d.currentTime), d.parentNode.removeChild(d)
		}
		var g, a = 300,
			d = q("video"),
			f = d.style;
		if (!(ar.video && "autoplay" in d)) {
			return void aa("videoautoplay", !1)
		}
		f.position = "absolute", f.height = 0, f.width = 0;
		try {
			if (ar.video.ogg) {
				d.src = "data:video/ogg;base64,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"
			} else {
				if (!ar.video.h264) {
					return void aa("videoautoplay", !1)
				}
				d.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="
			}
		} catch (c) {
			return void aa("videoautoplay", !1)
		}
		d.setAttribute("autoplay", ""), d.style.cssText = "display:none", K.appendChild(d), setTimeout(function() {
			d.addEventListener("playing", b, !1), g = setTimeout(b, a)
		}, 0)
	});
	var ay = aL.testStyles = O;
	ar.addTest("touchevents", function() {
		var a;
		if ("ontouchstart" in ac || ac.DocumentTouch && aD instanceof DocumentTouch) {
			a = !0
		} else {
			var b = ["@media (", an.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			ay(b, function(c) {
				a = 9 === c.offsetTop
			})
		}
		return a
	}), ar.addTest("unicode", function() {
		var b, c = q("span"),
			a = q("span");
		return ay("#modernizr{font-family:Arial,sans;font-size:300em;}", function(d) {
			c.innerHTML = aA ? "妇" : "&#5987;", a.innerHTML = aA ? "☆" : "&#9734;", d.appendChild(c), d.appendChild(a), b = "offsetWidth" in c && c.offsetWidth !== a.offsetWidth
		}), b
	}), ar.addTest("checked", function() {
		return ay("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(a) {
			var b = q("input");
			return b.setAttribute("type", "checkbox"), b.setAttribute("checked", "checked"), a.appendChild(b), 20 === b.offsetLeft
		})
	});
	var al = function() {
		var b = navigator.userAgent,
			f = b.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1),
			a = b.match(/w(eb)?osbrowser/gi),
			c = b.match(/windows phone/gi) && b.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9,
			d = 533 > f && b.match(/android/gi);
		return a || d || c
	}();
	al ? ar.addTest("fontface", !1) : ay('@font-face {font-family:"font";src:url("https://")}', function(d, c) {
		var g = aD.getElementById("smodernizr"),
			h = g.sheet || g.styleSheet,
			f = h ? h.cssRules && h.cssRules[0] ? h.cssRules[0].cssText : h.cssText || "" : "",
			b = /src/i.test(f) && 0 === f.indexOf(c.split(" ")[0]);
		ar.addTest("fontface", b)
	}), ay("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(a) {
		ar.addTest("lastchild", a.lastChild.offsetWidth > a.firstChild.offsetWidth)
	}, 2), ay("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(b) {
		for (var d = b.getElementsByTagName("div"), a = !0, c = 0; 5 > c; c++) {
			a = a && d[c].offsetWidth === c % 2 + 1
		}
		ar.addTest("nthchild", a)
	}, 5), ay("#modernizr { height: 50vh; }", function(c) {
		var a = parseInt(ac.innerHeight / 2, 10),
			b = parseInt((ac.getComputedStyle ? getComputedStyle(c, null) : c.currentStyle)
				.height, 10);
		ar.addTest("cssvhunit", b == a)
	}), ay("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(m) {
		var c = m.childNodes[2],
			h = m.childNodes[1],
			j = m.childNodes[0],
			f = parseInt((h.offsetWidth - h.clientWidth) / 2, 10),
			b = j.clientWidth / 100,
			k = j.clientHeight / 100,
			e = parseInt(50 * Math.max(b, k), 10),
			g = parseInt((ac.getComputedStyle ? getComputedStyle(c, null) : c.currentStyle)
				.width, 10);
		ar.addTest("cssvmaxunit", aB(e, g) || aB(e, g - f))
	}, 3), ay("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(m) {
		var c = m.childNodes[2],
			h = m.childNodes[1],
			j = m.childNodes[0],
			f = parseInt((h.offsetWidth - h.clientWidth) / 2, 10),
			b = j.clientWidth / 100,
			k = j.clientHeight / 100,
			e = parseInt(50 * Math.min(b, k), 10),
			g = parseInt((ac.getComputedStyle ? getComputedStyle(c, null) : c.currentStyle)
				.width, 10);
		ar.addTest("cssvminunit", aB(e, g) || aB(e, g - f))
	}, 3), ay("#modernizr { width: 50vw; }", function(c) {
		var a = parseInt(ac.innerWidth / 2, 10),
			b = parseInt((ac.getComputedStyle ? getComputedStyle(c, null) : c.currentStyle)
				.width, 10);
		ar.addTest("cssvwunit", b == a)
	});
	var au = function() {
		var a = ac.matchMedia || ac.msMatchMedia;
		return a ? function(c) {
			var b = a(c);
			return b && b.matches || !1
		} : function(c) {
			var b = !1;
			return O("@media " + c + " { #modernizr { position: absolute; } }", function(d) {
				b = "absolute" == (ac.getComputedStyle ? ac.getComputedStyle(d, null) : d.currentStyle)
					.position
			}), b
		}
	}();
	aL.mq = au, ar.addTest("mediaqueries", au("only all"));
	var aP = "Moz O ms Webkit",
		aI = aL._config.usePrefixes ? aP.split(" ") : [];
	aL._cssomPrefixes = aI;
	var aN = function(h) {
		var d, e = an.length,
			c = ac.CSSRule;
		if ("undefined" == typeof c) {
			return J
		}
		if (!h) {
			return !1
		}
		if (h = h.replace(/^@/, ""), d = h.replace(/-/g, "_")
			.toUpperCase() + "_RULE", d in c) {
			return "@" + h
		}
		for (var b = 0; e > b; b++) {
			var f = an[b],
				g = f.toUpperCase() + "_" + d;
			if (g in c) {
				return "@-" + f.toLowerCase() + "-" + h
			}
		}
		return !1
	};
	aL.atRule = aN;
	var aG = aL._config.usePrefixes ? aP.toLowerCase()
		.split(" ") : [];
	aL._domPrefixes = aG, ar.addTest("smil", function() {
		return !!aD.createElementNS && /SVGAnimate/.test(aq.call(aD.createElementNS("http://www.w3.org/2000/svg", "animate")))
	});
	var aK = {
		elem: q("modernizr")
	};
	ar._q.push(function() {
		delete aK.elem
	});
	var aj = {
		style: aK.elem.style
	};
	ar._q.unshift(function() {
		delete aj.style
	});
	var am = aL.testProp = function(a, c, b) {
		return ag([a], J, c, b)
	};
	ar.addTest("textshadow", am("textShadow", "1px 1px")), aL.testAllProps = aH;
	var aO = aL.prefixed = function(b, c, a) {
		return 0 === b.indexOf("@") ? aN(b) : (-1 != b.indexOf("-") && (b = ao(b)), c ? aH(b, c, a) : aH(b, "pfx"))
	};
	ar.addTest("fullscreen", !(!aO("exitFullscreen", aD, !1) && !aO("cancelFullScreen", aD, !1))), ar.addTest("backgroundblendmode", aO("backgroundBlendMode", "text")), ar.addTest("objectfit", !!aO("objectFit"), {
			aliases: ["object-fit"]
		}), aL.testAllProps = aM, ar.addTest("cssanimations", aM("animationName", "a", !0)), ar.addTest("appearance", aM("appearance")), ar.addTest("backgroundcliptext", function() {
			return aM("backgroundClip", "text")
		}), ar.addTest("borderradius", aM("borderRadius", "0px", !0)), ar.addTest("boxsizing", aM("boxSizing", "border-box", !0) && (aD.documentMode === J || aD.documentMode > 7)),
		function() {
			ar.addTest("csscolumns", function() {
				var g = !1,
					h = aM("columnCount");
				try {
					(g = !!h) && (g = new Boolean(g))
				} catch (f) {}
				return g
			});
			for (var b, d, a = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], c = 0; c < a.length; c++) {
				b = a[c].toLowerCase(), d = aM("column" + a[c]), ("breakbefore" === b || "breakafter" === b || "breakinside" == b) && (d = d || aM(a[c])), ar.addTest("csscolumns." + b, d)
			}
		}(), ar.addTest("flexbox", aM("flexBasis", "1px", !0)), ar.addTest("flexboxlegacy", aM("boxDirection", "reverse", !0)), ar.addTest("csstransforms", function() {
			return -1 === navigator.userAgent.indexOf("Android 2.") && aM("transform", "scale(1)", !0)
		}), ar.addTest("csstransforms3d", function() {
			var b = !!aM("perspective", "1px", !0),
				d = ar._config.usePrefixes;
			if (b && (!d || "webkitPerspective" in K.style)) {
				var a, c = "#modernizr{width:0;height:0}";
				ar.supports ? a = "@supports (perspective: 1px)" : (a = "@media (transform-3d)", d && (a += ",(-webkit-transform-3d)")), a += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", ay(c + a, function(e) {
					b = 7 === e.offsetWidth && 18 === e.offsetHeight
				})
			}
			return b
		}), ar.addTest("csstransitions", aM("transition", "all", !0)), av(), ak(aJ), delete aL.addTest, delete aL.addAsyncTest;
	for (var ab = 0; ab < ar._q.length; ab++) {
		ar._q[ab]()
	}
	ac.Modernizr = ar
}(window, document);