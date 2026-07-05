
$(function() {
	$.validator.setDefaults({
		ignore: [],
		highlight: function(a) {
			$(a)
				.addClass("has-error")
		},
		unhighlight: function(a) {
			$(a)
				.removeClass("has-error")
		},
		errorPlacement: function(b, a) {
			return false
		}
	});
	$("#subscribeform")
		.submit(function(a) {
			a.preventDefault()
		})
		.validate({
			rules: {
				fname: "required",
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(c) {
				$("#js-subscribe-btn")
					.attr("disabled", true);
				var f = $("#subscribeform")
					.data("redirect");
				var e = $("#subscribeform")
					.attr("action");
				var d = false;
				if (f == "none" || f == "" || f == null) {
					d = true
				}
				$("#js-contact-btn")
					.attr("disabled", true);
				$("#js-contact-result")
					.fadeIn("slow")
					.html('<div class="error-msg">Please wait</div>');
				var g = $("#js-subscribe-result")
					.data("success-msg");
				var b = $("#js-subscribe-result")
					.data("error-msg");
				var a = $(c)
					.serialize();
				$.ajax({
					type: "POST",
					data: a,
					url: e,
					cache: false,
					success: function(h) {
						$(".form-group")
							.removeClass("has-success");
						if (h == "success") {
							if (d) {
								$("#js-subscribe-result")
									.fadeIn("slow")
									.html('<div class="alert alert-success error-msg">' + g + "</div>")
									.delay(3000)
									.fadeOut("slow");
								$("#subscribeform")[0].reset()
							} else {
								window.location.href = f
							}
						} else {
							$("#js-subscribe-result")
								.fadeIn("slow")
								.html('<div class="alert alert-danger error-msg">' + b + "</div>")
								.delay(3000)
								.fadeOut("slow")
						}
						setTimeout(function() {
							$("#js-subscribe-btn")
								.attr("disabled", false)
						}, 1000)
					},
					error: function(h) {
						$("#js-subscribe-result")
							.fadeIn("slow")
							.html('<div class="alert alert-danger error-msg"> Cannot access Server </div>')
							.delay(3000)
							.fadeOut("slow");
						setTimeout(function() {
							$("#js-subscribe-btn")
								.attr("disabled", false)
						}, 1000)
					}
				});
				return false
			}
		})
});
