function atvImg() {
	var c = document,
		e = c.documentElement,
		a = c.getElementsByTagName("body")[0],
		f = c.getElementsByTagName("html")[0],
		B = window,
		h = c.querySelectorAll(".atvImg"),
		y = h.length,
		v = "ontouchstart" in B || navigator.msMaxTouchPoints;
	if (y <= 0) {
		return
	}
	for (var k = 0; k < y; k++) {
		var x = h[k],
			n = x.querySelectorAll(".atvImg-layer"),
			z = n.length;
		if (z <= 0) {
			continue
		}
		while (x.firstChild) {
			x.removeChild(x.firstChild)
		}
		var b = c.createElement("div"),
			u = c.createElement("div"),
			t = c.createElement("div"),
			p = c.createElement("div"),
			o = [];
		x.id = "atvImg__" + k;
		b.className = "atvImg-container";
		u.className = "atvImg-shine";
		t.className = "atvImg-shadow";
		p.className = "atvImg-layers";
		for (var g = 0; g < z; g++) {
			var m = c.createElement("div"),
				j = n[g].getAttribute("data-img");
			m.className = "atvImg-rendered-layer";
			m.setAttribute("data-layer", g);
			m.style.backgroundImage = "url(" + j + ")";
			p.appendChild(m);
			o.push(m)
		}
		b.appendChild(t);
		b.appendChild(p);
		b.appendChild(u);
		x.appendChild(b);
		var A = x.clientWidth || x.offsetWidth || x.scrollWidth;
		x.style.transform = "perspective(" + A * 3 + "px)";
		if (v) {
			B.preventScroll = false;
			(function(l, d, w, i) {
				x.addEventListener("touchmove", function(C) {
					if (B.preventScroll) {
						C.preventDefault()
					}
					s(C, true, l, d, w, i)
				});
				x.addEventListener("touchstart", function(C) {
					B.preventScroll = true;
					q(C, l)
				});
				x.addEventListener("touchend", function(C) {
					B.preventScroll = false;
					r(C, l, d, w, i)
				})
			})(x, o, z, u)
		} else {
			(function(l, d, w, i) {
				x.addEventListener("mousemove", function(C) {
					s(C, false, l, d, w, i)
				});
				x.addEventListener("mouseenter", function(C) {
					q(C, l)
				});
				x.addEventListener("mouseleave", function(C) {
					r(C, l, d, w, i)
				})
			})(x, o, z, u)
		}
	}

	function s(F, T, G, J, S, R) {
		var C = a.scrollTop || f.scrollTop,
			l = a.scrollLeft,
			O = (T) ? F.touches[0].pageX : F.pageX,
			P = (T) ? F.touches[0].pageY : F.pageY,
			L = G.getBoundingClientRect(),
			U = G.clientWidth || G.offsetWidth || G.scrollWidth,
			H = G.clientHeight || G.offsetHeight || G.scrollHeight,
			V = 320 / U,
			M = 0.52 - (O - L.left - l) / U,
			N = 0.52 - (P - L.top - C) / H,
			E = (P - L.top - C) - H / 2,
			D = (O - L.left - l) - U / 2,
			X = (M - D) * (0.07000000000000001 * V),
			W = (E - N) * (0.1 * V),
			I = "rotateX(" + W + "deg) rotateY(" + X + "deg)",
			i = Math.atan2(E, D),
			d = i * 180 / Math.PI - 90;
		if (d < 0) {
			d = d + 360
		}
		if (G.firstChild.className.indexOf(" over") != -1) {
			I += " scale3d(1.07,1.07,1.07)"
		}
		G.firstChild.style.transform = I;
		R.style.background = "linear-gradient(" + d + "deg, rgba(255,255,255," + (P - L.top - C) / H * 0.4 + ") 0%,rgba(255,255,255,0) 80%)";
		R.style.transform = "translateX(" + (M * S) - 0.1 + "px) translateY(" + (N * S) - 0.1 + "px)";
		var Q = S;
		for (var K = 0; K < S; K++) {
			J[K].style.transform = "translateX(" + (M * Q) * ((K * 2.5) / V) + "px) translateY(" + (N * S) * ((K * 2.5) / V) + "px)";
			Q--
		}
	}

	function q(d, i) {
		i.firstChild.className += " over"
	}

	function r(i, l, w, E, D) {
		var d = l.firstChild;
		d.className = d.className.replace(" over", "");
		d.style.transform = "";
		D.style.cssText = "";
		for (var C = 0; C < E; C++) {
			w[C].style.transform = ""
		}
	}
};

