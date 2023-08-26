$("document").ready(function () {
	eqheight();

	$('#pan_number').keyup(function () {
		$(this).val($(this).val().toUpperCase());
	});

	$('#aadhar_number').keypress(function (e) {

		var charCode = (e.which) ? e.which : event.keyCode

		if (String.fromCharCode(charCode).match(/[^0-9]/g))

			return false;

	});

	$(".products-img-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		dots: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	$('.investments-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	$(".partner-support-slider").slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		dots: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		],
	});
	$(".offer-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		dots: true,
		arrows: false,
	});
	$('.partners-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	//FAQ Accordion
	$(".faq-que-list .faq-title").click(function () {
		if ($(this).hasClass("active")) {
			$(this).toggleClass("active");
			$(this).next().slideToggle();
			$(".faq-content").addClass("open");
		} else {
			$(".faq-que-list .faq-title").removeClass("active");
			$(".faq-que-list .faq-content").slideUp();
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		}
	});

	var selectBox = $(".country").selectBoxIt();
	// event listing page
	if ($(".event .event-box").length) {
		$(".event .event-box").matchHeight();
	}

	if (jQuery(".select-box-js").length > 0) {
		jQuery(".select-box-js").select2({
			dropdownAutoWidth: true,
			containerCssClass: "common_select",
			dropdownCssClass: "common_dropdown",
			width: "100%",
			minimumResultsForSearch: -1
		});
	}

	$('[href="##PLAYSTORE##"]').each(function () {
		$(this).attr('href', playstore_link);
	});
	$('[href="##APPSTORE##"]').each(function () {
		$(this).attr('href', appstore_link);
	});

	accordian();

});
function setupLabel() {
	if ($('.label_check input').length) {
		$('.label_check').each(function () {
			$(this).removeClass('c_on');
		});
		$('.label_check input:checked').each(function () {
			$(this).parent('label').addClass('c_on');
		});
	};
	if ($('.label_radio input').length) {
		$('.label_radio').each(function () {
			$(this).removeClass('r_on');
		});
		$('.label_radio input:checked').each(function () {
			$(this).parent('label').addClass('r_on');
		});
	};
};
$('.label_radio').click(function () {
	// setupLabel();
});

$('.label_radio').on("click",function () {
	$('.label_radio').removeClass('c_on');
	$(this).addClass('c_on');
});

$('.label_check').on("click",function () {
	$('.label_check').removeClass('c_on');
	$(this).addClass('c_on');
});

if ($(".value-wealth .value-wealth-block").length) {
	$(".value-wealth .value-wealth-block").matchHeight();
}

if ($(".team-inner .bottom-content").length) {
	$(".team-inner .bottom-content").matchHeight();
}

$(".panel .panel-heading .panel-title").click(function () {
	if ($(this).parent(".panel-heading").next(".panel-body").is(":visible")) {
		$(this).next(".panel-body").slideUp();
		$(this).parent(".panel-heading").next(".panel-body").slideUp();
		$(this).parent(".panel-heading").removeClass("active");
	}
	else {
		$(".panel .panel-body").slideUp();
		$(".panel .panel-heading").removeClass("active");
		$(this).parent(".panel-heading").next(".panel-body").slideDown();
		$(this).parent(".panel-heading").addClass("active");
	}
});

function accordian() {

	jQuery(".que-item .que").click(function () {
		if (jQuery(this).next("div.ans").is(":visible")) {
			jQuery(this).next("div.ans").slideUp();
			jQuery(this).toggleClass("up");
		}
		else {
			jQuery(".que-item .ans").slideUp();
			jQuery(".que-item .que").removeClass("up");
			jQuery(this).next("div.ans").slideDown();
			jQuery(this).toggleClass("up");
		}
	});
}


jQuery(window).load(function () {
	eqheight();
}).resize(function () {
	eqheight();
});

function eqheight() {
	setTimeout(function () {
		equalheight('.gold-delivery .product-list-form');
		equalheight('.sip-field-group .field-row .field-col');
	}, 100);

}

equalheight = function (container) {
	if (jQuery(window).width() > 767) {
		var currentTallest = 0,
			currentRowStart = 0,
			rowDivs = [],
			$el,
			topPosition = 0;

		jQuery(container).each(function () {
			$el = jQuery(this);
			jQuery($el).height('auto');
			topPostion = $el.offset().top;
			if (currentRowStart !== topPostion) {
				for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
					rowDivs[currentDiv].innerHeight(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.innerHeight();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.innerHeight()) ? ($el.innerHeight()) : (currentTallest);
			}
			for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
				rowDivs[currentDiv].innerHeight(currentTallest);
			}
		});
	} else {
		jQuery(container).height('auto');
	}
};
$(".buygold-testimonial").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		dots: true,
		arrows: false,
	});