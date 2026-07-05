
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
	$("#contact_form")
		.submit(function(a) {
			a.preventDefault()
		})
		.validate({
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(c) {
				$("#js-contact-btn")
					.attr("disabled", true);
				var f = $("#contact_form")
					.data("redirect");
				var e = $("#contact_form")
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
				var g = $("#js-contact-result")
					.data("success-msg");
				var b = $("#js-contact-result")
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
								$("#js-contact-result")
									.fadeIn("slow")
									.html('<div class="alert alert-success error-msg">' + g + "</div>")
									.delay(3000)
									.fadeOut("slow");
								$("#contact_form")[0].reset()
							} else {
								window.location.href = f
							}
						} else {
							$("#js-contact-result")
								.fadeIn("slow")
								.html('<div class="alert alert-danger error-msg">' + b + "</div>")
								.delay(3000)
								.fadeOut("slow")
						}
						setTimeout(function() {
							$("#js-contact-btn")
								.attr("disabled", false)
						}, 1000)
					},
					error: function(h) {
						$("#js-contact-result")
							.fadeIn("slow")
							.html('<div class="alert alert-danger error-msg"> Cannot access Server </div>')
							.delay(3000)
							.fadeOut("slow");
						setTimeout(function() {
							$("#js-contact-btn")
								.attr("disabled", false)
						}, 1000)
					}
				});
				return false
			}
		})
});
