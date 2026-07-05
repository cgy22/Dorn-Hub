
$(function() {
	if ($(".header-slider")
		.length) {
		$(".header-slider")
			.on("init", function(e, f) {
				$(this)
					.css("height", "auto")
			});
		$(".header-slider")
			.slick({
				infinite: true,
				fade: true,
				cssEase: "linear",
				autoplay: true,
				dots: true
			})
	}
	if ($(".testimonial-slider")
		.length) {
		$(".testimonial-slider")
			.on("init", function(e, f) {
				$(this)
					.css("height", "auto")
			});
		$(".testimonial-slider")
			.slick({
				cssEase: "linear",
				autoplay: true,
				dots: true
			})
	}
	if ($(".slider")
		.length) {
		$(".slider")
			.flexslider({
				selector: ".tabs > .tab",
				controlNav: true,
				directionNav: true,
				start: function() {
					$(".slider .tabs")
						.css("height", "auto")
				}
			})
	}
	$("#page-loader")
		.on("click", function() {
			$(this)
				.fadeOut();
			$("body")
				.removeClass("preload")
		});
	setTimeout(function() {
		$("#page-loader")
			.fadeOut();
		$("body")
			.removeClass("preload")
	}, 10000);
	$(".toggle-menu")
		.addClass("menu-open");
	$(".toggle-menu > li")
		.addClass("animated");
	$(".menu-trigger a")
		.on("click", function(g) {
			g.preventDefault();
			var f = $(".toggle-menu");
			var h = f.children("li");
			h.each(function() {
				var i = $(this)
					.index();
				var k = (h.length - h.index(this)) + 1;
				var e = i * 0.08 / 2;
				var j = k * 0.08 / 2;
				if (f.hasClass("menu-open")) {
					$(this)
						.css("-webkit-transition-delay", e + "s")
						.css("-o-transition-delay", e + "s")
						.css("transition-delay", e + "s")
						.removeClass("animated")
				} else {
					$(this)
						.css("-webkit-transition-delay", j + "s")
						.css("-o-transition-delay", j + "s")
						.css("transition-delay", j + "s")
						.addClass("animated")
				}
			});
			f.toggleClass("menu-open")
		});
	var c = Modernizr.mq("(min-width: 900px)");
	if (c) {
		if ($(".has-parallax")
			.length && jQuery()
			.parallax) {
			$(".has-parallax")
				.parallax({
					speed: 0.3
				})
		}
	}
	if ($(".particle")
		.length) {
		var d = new Rellax(".particle", {
			center: true
		})
	}
	if ($(".atvImg")
		.length && $.isFunction(atvImg)) {
		atvImg()
	}
	if ($(".audio-player")
		.length) {
		var b = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
		}, [{
			title: "刺梨花开",
			artist: "𣿅国皇家乐团",
			mp3: "music/刺梨花开-𣿅国皇家乐团.mp3",
			oga: "music/刺梨花开-𣿅国皇家乐团.mp3"
		}, {
			title: "内卷党党歌",
			artist: "Dornhub",
			mp3: "music/内卷党党歌-伴奏.mp3",
			oga: "music/内卷党党歌-伴奏.mp3"
		}, {
			title: "躺平党党歌",
			artist: "Dornhub",
			mp3: "music/躺平党党歌-伴奏.mp3",
			oga: "music/躺平党党歌-伴奏.mp3"
		}, {
			title: "勇气大爆发-𣿅国儿歌",
			artist: "Dornhub",
			mp3: "music/勇气.mp3",
			oga: "music/勇气.mp3"
		}, {
			title: "早期𣿅国国歌",
			artist: "Dornhub",
			mp3: "music/Donhfuc Peehpuie(中董双语).mp3",
			oga: "music/Donhfuc Peehpuie(中董双语).mp3"
		}, {
			title: "Lentement",
			artist: "Apollo 440",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
		}, {
			title: "Lismore",
			artist: "Bloodhound Gang",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
		}, {
			title: "The Separation",
			artist: "Friendly Fires ",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
		}, {
			title: "Beside Me",
			artist: "Friendly Fires ",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
		}, {
			title: "Bubble",
			artist: "Skunkhour",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
		}, {
			title: "Stirring of a fool",
			artist: "The Meanies",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
		}, {
			title: "Partir",
			artist: "The Living End",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
		}, {
			title: "Thin Ice",
			artist: "Screaming Trees",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
		}], {
			swfPath: "js/plugins",
			supplied: "oga, mp3",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			playlistOptions: {
				autoPlay: false
			}
		});
		$("#jquery_jplayer_1")
			.on($.jPlayer.event.ready + " " + $.jPlayer.event.play, function(f) {
				var e = b.current;
				var g = b.playlist;
				$.each(g, function(j, k) {
					if (j == e) {
						$(".jp-now-playing")
							.html("<div class='jp-track-name'>" + k.title + "</div> <div class='jp-artist-name'>" + k.artist + "</div>")
					}
				});
				$(".jp-volume-bar")
					.mousedown(function() {
						var j = $(this)
							.offset(),
							k = $(this)
							.width();
						$(window)
							.mousemove(function(l) {
								var n = l.pageX - j.left,
									m = n / k;
								if (m > 1) {
									$("#jquery_jplayer_1")
										.jPlayer("volume", 1)
								} else {
									if (m <= 0) {
										$("#jquery_jplayer_1")
											.jPlayer("mute")
									} else {
										$("#jquery_jplayer_1")
											.jPlayer("volume", m);
										$("#jquery_jplayer_1")
											.jPlayer("unmute")
									}
								}
							});
						return false
					})
					.mouseup(function() {
						$(window)
							.unbind("mousemove")
					});
				var h = false;
				$(".jp-play-bar")
					.mousedown(function(j) {
						h = true;
						i(j.pageX)
					});
				$(document)
					.mouseup(function(j) {
						if (h) {
							h = false;
							i(j.pageX)
						}
					});
				$(document)
					.mousemove(function(j) {
						if (h) {
							i(j.pageX)
						}
					});
				var i = function(m) {
					var l = $(".jp-progress");
					var k = m - l.offset()
						.left;
					var j = 100 * k / l.width();
					if (j > 100) {
						j = 100
					}
					if (j < 0) {
						j = 0
					}
					$("#jquery_jplayer_1")
						.jPlayer("playHead", j);
					$(".jp-play-bar")
						.css("width", j + "%")
				};
				$("#playlist-toggle, #playlist-text, #playlist-wrap li a")
					.unbind()
					.on("click", function() {
						$("#playlist-wrap")
							.fadeToggle();
						$("#playlist-toggle, #playlist-text")
							.toggleClass("playlist-is-visible")
					});
				$(".hide_player")
					.unbind()
					.on("click", function() {
						$(".audio-player")
							.toggleClass("is_hidden");
						$(this)
							.html($(this)
								.html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE')
					});
				$(".audio-play-btn")
					.unbind()
					.on("click", function() {
						$(".audio-play-btn")
							.removeClass("is_playing");
						$(this)
							.addClass("is_playing");
						var j = $(this)
							.data("playlist-id");
						b.play(j)
					})
			})
	}
	$(window)
		.scroll(function() {
			if ($(window)
				.scrollTop() > 100) {
				$(".js-on-scroll")
					.addClass("menu-is-scrolling")
			} else {
				$(".js-on-scroll")
					.removeClass("menu-is-scrolling")
			}
		});
	$(window)
		.scroll(function() {
			if ($(window)
				.scrollTop() > 1000) {
				$(".back_to_top")
					.fadeIn("slow")
			} else {
				$(".back_to_top")
					.fadeOut("slow")
			}
		});
	$(".navbar-nav a, .back_to_top")
		.on("click", function(g) {
			var f = $(this);
			$("html, body")
				.stop()
				.animate({
					scrollTop: $(f.attr("href"))
						.offset()
						.top - 50
				}, 1000);
			g.preventDefault()
		});
	$(".team-slider")
		.each(function() {
			$(this)
				.magnificPopup({
					delegate: "a",
					removalDelay: 500,
					fixedContentPos: false,
					gallery: {
						enabled: false
					},
					callbacks: {
						beforeOpen: function() {
							this.st.mainClass = this.st.el.attr("data-effect")
						}
					}
				})
		});
	if ($(".team-slider")
		.length) {
		$(".team-slider")
			.on("init", function(e, f) {
				$(this)
					.css("height", "auto")
			});
		$(".team-slider")
			.slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				dots: true,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 768,
					settings: {
						dots: false,
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 480,
					settings: {
						dots: false,
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			})
	}
	if ($(".image-link")
		.length) {
		$(".image-link")
			.magnificPopup({
				type: "image",
				gallery: {
					enabled: true
				}
			})
	}
	if ($(".mfp-youtube")
		.length) {
		$(".mfp-youtube")
			.magnificPopup({
				disableOn: 700,
				type: "iframe",
				mainClass: "mfp-fade",
				removalDelay: 0,
				preloader: false,
				fixedContentPos: false,
			})
	}
	if ($(".twitter-feed")
		.length) {
		$(".twitter-feed")
			.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 5000,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						arrows: false,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						dots: true,
						arrows: false,
						slidesToScroll: 2,
						dots: true
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						arrows: false,
						dots: true,
						slidesToScroll: 1,
						dots: true
					}
				}]
			})
	}
	if (!Modernizr.objectfit) {
		$(".object-fit-container")
			.each(function() {
				var e = $(this),
					f = e.find("img")
					.prop("src");
				if (f) {
					e.css("backgroundImage", "url(" + f + ")")
						.addClass("compat-object-fit")
				}
			})
	}
	var a = $("#countdown")
		.data("event-date");
	if (a) {
		$("#countdown")
			.countdown({
				date: a,
				format: "on"
			})
	}
});
$(window)
	.load(function() {
		$("#page-loader")
			.fadeOut();
		$("body")
			.removeClass("preload")
	});
window.twttr = (function(a, f, c) {
	var e, b = a.getElementsByTagName(f)[0],
		g = window.twttr || {};
	if (a.getElementById(c)) {
		return g
	}
	e = a.createElement(f);
	e.id = c;
	e.src = "https://platform.twitter.com/widgets.js";
	b.parentNode.insertBefore(e, b);
	g._e = [];
	g.ready = function(d) {
		g._e.push(d)
	};
	return g
}(document, "script", "twitter-wjs"));