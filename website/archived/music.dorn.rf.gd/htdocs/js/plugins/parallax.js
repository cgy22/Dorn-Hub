
(function(a) {
	a.fn.parallax = function(b) {
		var d = a(window)
			.height();
		var c = a.extend({
			speed: 0.15
		}, b);
		return this.each(function() {
			var e = a(this);
			a(document)
				.scroll(function() {
					var h = a(window)
						.scrollTop();
					var g = e.offset()
						.top;
					var f = e.outerHeight();
					if (g + f <= h || g >= h + d) {
						return
					}
					var i = Math.round((g - h) * c.speed);
					e.css("background-position", "center " + i + "px")
				})
		})
	}
}(jQuery));