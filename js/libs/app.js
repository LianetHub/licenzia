function animationLoaderInit() {
    let arr_per = [[0, 29], [29, 40], [40, 59], [59, 100]];

    var radPrev = arr_per[0][0]/100;
    var rad = arr_per[0][1]/100;
    var intervalID;
    var clearIntervalPrev = false;
    var clearIntervalLast = false;

    let arr_name = $(".name");
    let arr_options = $(".options option");1

    arr_options.each(function(i) {
        var percent = arr_per[i][0] + $(this).data('percent');
        arr_per[i][1] = percent;
        if (i < arr_options.length - 1) {
            arr_per[i + 1][0] = percent;
        }
    });

    function myCallback(ctx, canvas, ctx_2, canvas_2, ctx_3, canvas_3, start, end)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(
            canvas.width / 2 + 2,
            canvas.width / 2 + 4,
            (canvas.width-20) / 2 + 2,
            Math.PI - 0.18 + (Math.PI + 0.36) * radPrev,
            Math.PI - 0.18 + (Math.PI + 0.36) * rad,
            false
        );
        ctx.strokeStyle = '#D61436';
        ctx.lineWidth = 7;
        ctx.stroke();


        //TODO: РЅРµ СЏСЃРЅРѕ Р·Р°С‡РµРј РµС‰Рµ РґРІР° РєР°РЅРІР°СЃР°
        ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
        ctx_2.beginPath();
        ctx_2.arc(
            canvas_2.width / 2 + 2,
            canvas_2.width / 2 + 4,
            (canvas_2.width-20) / 2 + 2,
            Math.PI - 0.19 + (Math.PI + 0.38) * radPrev,
            Math.PI - 0.19 + (Math.PI + 0.38) * rad,
            false
        );
        ctx_2.strokeStyle = '#D61436';
        ctx_2.lineWidth = 7;
        ctx_2.stroke();

        ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);
        ctx_3.beginPath();
        ctx_3.arc(
            canvas_3.width / 2 + 2,
            canvas_3.width / 2 + 4,
            (canvas_3.width-20) / 2 + 2,
            Math.PI * 0.5 + (Math.PI + 0.5) * radPrev,
            Math.PI * 0.5 + (Math.PI + 0.5) * rad,
            false
        );
        ctx_3.strokeStyle = '#D61436';
        ctx_3.lineWidth = 7;
        ctx_3.stroke();

        if (Math.abs(radPrev - start) > 0.001 && start < radPrev) {
            radPrev -= 0.01
        } else if (Math.abs(radPrev - start) > 0.001 && radPrev < start) {
            radPrev += 0.01;
        } else {
            clearIntervalPrev = true;
        }
        if (Math.abs(rad - end) > 0.001 && end < rad) {
            rad -= 0.01
        } else if (Math.abs(rad - end) > 0.001 && rad < end) {
            rad += 0.01;
        } else {
            clearIntervalLast = true;
        }

        if (clearIntervalPrev && clearIntervalLast && intervalID != -1) {
            clearInterval(intervalID);
        }
    }

    var canvas = $(".red-circle")[0];
    var ctx = canvas.getContext('2d');

    var canvas_2 = $(".red-circle")[1];
    var ctx_2 = canvas_2.getContext('2d');

    var canvas_3 = $(".red-circle")[2];
    var ctx_3 = canvas_3.getContext('2d');

    myCallback(ctx, canvas, ctx_2, canvas_2, ctx_3, canvas_3, arr_per[0][0] / 100, arr_per[0][1] / 100);

    $(".name").click(function () {
        $(".option").removeClass("active");
        $(".name").removeClass("active");
        for (let i = 0; i < arr_name.length; i++) {
            if ($(this)[0] === arr_name[i]) {
                if (intervalID != -1) {
                    clearInterval(intervalID);
                }
                selectCircle(i);
            }
        }
    });

    $(".options").change(function () {
        $(".option").removeClass("active");
        $(".name").removeClass("active");
        for (let i = 0; i < arr_name.length; i++) {
            if ($(this).val() === arr_options[i].textContent) {
                if (intervalID != -1) {
                    clearInterval(intervalID);
                }
                selectCircle(i);
            }
        }
    });

    function selectCircle(i)
    {
        $(".option_" + (i + 1)).addClass("active");
        $(".info .name").eq(i).addClass("active");
        $(".circle_text .percent").html((arr_per[i][1] - arr_per[i][0]) + "%");
        $(".circle_text .description").html($(".info .name").eq(i).attr('data-description'));
        $('select.options option[value="'+ $(".info .name").eq(i).text() +'"]').prop('selected', true);
        clearIntervalPrev = false;
        clearIntervalLast = false;
        intervalID = setInterval(myCallback, 10, ctx, canvas, ctx_2, canvas_2, ctx_3, canvas_3, arr_per[i][0] / 100, arr_per[i][1] / 100);
    }
}

$(document).ready(function()
{
	$('[data-fancybox]').fancybox({
	    touch: false
	});

	// var carouselSliderTariffsPopup = $('.carousel-slider__tariffs');
	// carouselSliderTariffsPopup.owlCarousel({
	//     items: 3,
	//     autoWidth: true,
	//     loop:true,
	//     margin: 30,
	//     nav: true,
    // 	dots: true,
    // 	dotsEach: 1,
    // 	autoplay: false,
    // 	autoplaySpeed: 1000,
    // 	autoplayTimeout: 5000,
	// });

	var owlSliderMain = $('.slider-box__main');

	owlSliderMain.on('changed.owl.carousel', function(e)
	{
		$('.wioefhuwhufiwehuif .box-items__problemsss-item').removeClass('active');
		$('.wioefhuwhufiwehuif .box-items__problemsss-item').eq(e.relatedTarget.relative(e.relatedTarget.current())).addClass('active');

	    //console.log("current: ",e.relatedTarget.current())
	    //console.log("current: ",e.item.index) //same
	    //console.log("total: ",e.item.count)   //total
	});

	owlSliderMain.owlCarousel({
	    items:1,
	    autoWidth:false,
	    loop:owlSliderMain.find('.sliderBoxContent').length == 1 ? false:true,
	    margin:0,
	    nav: false,
    	dots: true,
    	dotsEach: 1,
    	autoplay: true,
    	//autoplayHoverPause: true,
    	autoplaySpeed: 1000,
    	autoplayTimeout: 5000,
	    dotsContainer: '#slider-box1sss',
        responsive: {
            640: {
                dots: true,
            },
        }
	});

	$('.wepofwhnjsshshahhddj .box-items__problemsss-item').on('click', function()
	{
		owlSliderMain.trigger('stop.owl.autoplay');
		owlSliderMain.trigger('to.owl.carousel', $(this).index());
		owlSliderMain.trigger('play.owl.autoplay');
	});

	$('.wepofwhnjsshshahhddj .box-items__problemsss-item').on(
	{
	    mouseover: function ()
	    {
	        owlSliderMain.trigger('stop.owl.autoplay');
	    },
	    mouseleave: function ()
	    {
	    	$(this).removeClass('focus');
	        owlSliderMain.trigger('play.owl.autoplay');
	    }
	});

	var owlSliderBox1 = $('.slider-box1');

	owlSliderBox1.on('changed.owl.carousel', function(e)
	{
		//$('.wioefhuwhufiwehuif .box-items__problemsss-item').removeClass('active');
		//$('.wioefhuwhufiwehuif .box-items__problemsss-item').eq(e.relatedTarget.relative(e.relatedTarget.current())).addClass('active');

	    //console.log("current: ",e.relatedTarget.current())
	    //console.log("current: ",e.item.index) //same
	    //console.log("total: ",e.item.count)   //total
	    $('.qwoidjiuhqwuhcuwdwjsdiuggshzxh').find('.owl-item').removeClass('add-mgr__top');
	    $('.qwoidjiuhqwuhcuwdwjsdiuggshzxh').find('.owl-item').eq(e.relatedTarget.relative(e.relatedTarget.current())).addClass('add-mgr__top');
	});

	owlSliderBox1.owlCarousel({
	    items:2,
	    autoWidth:true,
	    loop:false,
	    margin:60,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
        smartSpeed: 500,
	    dotsContainer: '#slider-box1',
	    responsive:{
	        1000:{
	            items: 3,
	        },
	        640:{
	            items: 2,
                margin:20,
	        },
	        430:{
	            items: 1,
                margin:20,
	        }
	    }
	});

    $('.slider-box-team').owlCarousel({
	    items:3,
	    autoWidth:true,
	    loop:false,
	    margin:20,
	    nav: true,
    	dots: false,
    	dotsEach: 1,
        smartSpeed: 500,
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1,
                margin:21,
	        }
	    }
	});

	$('#sliderBox1Nav .hover-btn__nav-slider__prev').on('click', function() {
	    owlSliderBox1.trigger('prev.owl.carousel');
	});

	$('#sliderBox1Nav .hover-btn__nav-slider__next').on('click', function() {
	    owlSliderBox1.trigger('next.owl.carousel');
	});

	$('.slider-box11').owlCarousel({
	    items:3,
	    //autoWidth:true,
	    loop:true,
	    margin:30,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#slider-box11',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2.1
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.slider-box2').owlCarousel({
	    items:2,
	    loop:true,
	    margin:50,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#slider-box1',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.weufwieufhuiwhqw').owlCarousel({
	    items:2,
	    loop:true,
	    margin:20,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#weufwieufhuiwhqw1',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});


	var owlSliderAboutBox = $('.slider-box__about');

	owlSliderAboutBox.owlCarousel({
	    items:3,
	    loop:true,
	    margin:59,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#slidewefwoowdhhf',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2,
                dots: true
	        },
	        320:{
	            items: 1,
                dots: true
	        }
	    },
        onInitialized: updateSlideNumber,
        onChanged: updateSlideNumber
    });

	var owlSliderAboutBoxKeys = $('.slider-box__about-keys');

    owlSliderAboutBoxKeys.owlCarousel({
	    items:2,
	    loop:false,
	    margin:59,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#slidewefwoowdhhf',
	    responsive:{
	        1000:{
	            items: 2
	        },
	        640:{
	            items: 2,
                dots: true
	        },
	        320:{
	            items: 1,
                dots: true
	        }
	    },
        onInitialized: updateSlideNumber,
        onChanged: updateSlideNumber
    });

	function addCounterToOwlSlider() {
        var owlNav = owlSliderAboutBox.find('.owl-nav');
        var owlPrev = owlNav.find('.owl-prev');
        owlPrev.after('<div class="counter"><span class="counter-start"></span><span class="counter-slash">/</span><span class="counter-end"></span></div>');
    }

    function updateSlideNumber(event) {
	    var countSkip = 0;
        owlSliderAboutBox.find('.owl-item').each(function(index, element) {
            if ($(element).hasClass('cloned')) {
                countSkip++;
            } else {
                return false; // РџСЂРµСЂС‹РІР°РЅРёРµ С†РёРєР»Р° each() РїСЂРё РѕР±РЅР°СЂСѓР¶РµРЅРёРё РїРµСЂРІРѕРіРѕ РЅРµ-РєР»РѕРЅРёСЂРѕРІР°РЅРЅРѕРіРѕ СЌР»РµРјРµРЅС‚Р°
            }
        });

        if (!owlSliderAboutBox.find('.owl-nav .counter').length) {
            addCounterToOwlSlider();
        }
        var currentItem = event.item.index - countSkip + 1;
        var totalItems = event.item.count;
        if (currentItem == 0) {
            currentItem = event.item.count;
        }
        $('.counter-start').text(currentItem);
        $('.counter-end').text(totalItems);
    }

	$('.eiorghiuwhedjjfnncvcbbchd .nav-arrow__left').on('click', function() {
	    owlSliderAboutBox.trigger('prev.owl.carousel');
	});

	$('.eiorghiuwhedjjfnncvcbbchd .nav-arrow__right').on('click', function() {
	    owlSliderAboutBox.trigger('next.owl.carousel');
	});

	$('.owpqfejdoiewjhuhddjvaaa').owlCarousel({
	    items:3,
	    loop:true,
	    autoWidth:true,
	    margin:38,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#owpqfejdoiewjhuhddjvfd',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.popup-box .eiojfweiuhdhbcnc .services-list').owlCarousel({
	    items:3,
	    loop:false,
	    autoWidth:false,
	    margin:60,
	    nav: true,
    	dots: false,
    	dotsEach: 1,
	    dotsContainer: '#owpqfejdoiewjhuhddjvfd',
	    responsive:{
	        1000:{
	            items: 3,
                margin: 30
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.oiqoiuesnsndbfss').owlCarousel({
	    items:3,
	    loop:true,
	    margin:60,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#ewfwedijowefjoerjfif',
	    responsive:{
	        1200:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	var SliderCustomVideoReviews = $('.weiofjoiweidjdhffss');

	SliderCustomVideoReviews.on('changed.owl.carousel', function(e)
	{
		//$('.wioefhuwhufiwehuif .box-items__problemsss-item').removeClass('active');
		//$('.wioefhuwhufiwehuif .box-items__problemsss-item').eq(e.relatedTarget.relative(e.relatedTarget.current())).addClass('active');

		$('.wdjshhfihuewfiuedhdssddf .owl-item').removeClass('activeCustomVideoWidth');
		$('.wdjshhfihuewfiuedhdssddf .owl-item').eq(e.relatedTarget.relative(e.relatedTarget.current())).addClass('activeCustomVideoWidth');
	});

	SliderCustomVideoReviews.owlCarousel({
	    items: 2,
	    center: true,
	    autoWidth: true,
	    autoHeight: true,
	    loop:true,
	    margin:60,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#wewewidhsnxvhdhjssf',
	    responsive:{
	    	1600: {
	    		items: 3
	    	},
	        1000:{
	            items: 3,
	            margin: 60,
	        },
	        780: {
	        	items: 2,
	        	margin: 30,
	        	center: false
	        },
	        640:{
	            items: 2,
	            margin: 30,
	            center: false
	        },
	        320:{
	            items: 1,
	            margin: 10,
	            center: false
	        }
	    }
	});

	$('.wioeieuwhfhsckgkfhsgs').owlCarousel({
	    items:3,
	    autoWidth:true,
	    loop:true,
	    margin:60,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#wewioijdjcnxnxnzhssfss',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.iueifygehdjfhfsjdfhfghje').owlCarousel({
	    items:3,
	    autoWidth:true,
	    loop:true,
	    margin:20,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#ereduhfjeiuryueedd',
	    responsive:{
	        1000:{
	            items: 3
	        },
	        640:{
	            items: 2
	        },
	        320:{
	            items: 1
	        }
	    }
	});

	$('.owl-dot').click(function () {
		$('.slider-box1').trigger('to.owl.carousel', [$(this).index(), 300]);
	});

	$('.qwudhwgbchshshs').owlCarousel({
	    items:3,
	    loop:false,
	    center: false,
	    margin:59,
	    nav: true,
    	dots: true,
    	dotsEach: 1,
	    dotsContainer: '#sliderewkjduiweiufhsss',
	    responsive:{
	        1000:{
	            items: 2,
	            margin: 30
	        },
	        640:{
	            items: 2,
	            margin: 20
	        },
	        630:{
	            items: 1
	        }
	    }
	});

	$('#list-view-docs').hide();
	$('.box-precc__sorting-sort .tt1').on('click', function()
	{
        $('#box-view-docs').hide();
        $('#list-view-docs').hide();
        if ($(this).data('id') == 'list-view-docs') {
            $('.getMoreRequestButton').data('theme', 'list');
            $('.getMoreRequestButton').data('block', 'table__doc.appendMoreRequestItems');
        } else if($(this).data('id') == 'box-view-docs') {
            $('.getMoreRequestButton').data('theme', 'box');
            $('.getMoreRequestButton').data('block', 'appendMoreRequestItems.services-list');
        }
        $('#' + $(this).data('id')).show();
	});


    $(document).on('click', '.getMoreRequestButton', function()
    {
        var theme = $(this).data('theme');
        var action = $(this).attr('data-action');
        var page = $(this).attr('data-page');
        var type = $(this).attr('data-type');
        var sort = $(this).attr('data-sort');
        var block = $(this).data('block');

        var service = $(this).data('service');
        var company = $(this).data('company');
        var status = $(this).data('status');

        $.ajax({
            url: '/api/more',
            type: 'POST',
            data: {
                theme: theme,
                action: action,
                page: page,
                type: type,
                sort: sort,

                service: service,
                company: company,
                status: status,
            },
            success: function( response )
            {console.log('.'+block);
                if( block )
                {console.log(123);
                    $('.'+block).append(response.list);
                }
                else
                {
                    $('.appendMoreRequestItems').append(response.list);
                }

                $('.getMoreRequestButton').attr('data-page', parseInt( page ) + 1);

                if( response.count < 6 )
                {
                    $('.getMoreRequestButton').hide();
                }
            }
        });
    });


    $(document).on('click', '.list-faq__body-item:not(.single)', function()
	{
		if( $(this).hasClass('active') )
		{
			$(this).removeClass('active');
		}
		else
		{
			$('.list-faq__body-item').removeClass('active');
			$(this).addClass('active');
		}

		return false;
	});

	$(document).on('click', '.list-faq__body-item.single .list-faq__body-item__two', function()
	{
		if( $(this).parents('.list-faq__body-item').hasClass('active') )
		{
			$(this).parents('.list-faq__body-item').removeClass('active');
		}
		else
		{
			$('.list-faq__body-item').removeClass('active');
			$(this).parents('.list-faq__body-item').addClass('active');
		}

		return false;
	});

	// РћС‚РєСЂС‹РІР°РµРј РјРµРЅСЋ РёР· С€Р°РїРєРё
	/*$('.menu li').on('hover', function()
	{
		setTimeout(function ()
    	{
			$('.menuFixed').hide();
			$($(this).attr('data-block')).show();
        }, 2000);
	});*/

	var timer;

	$('.menu li').on(
	{
	    'mouseover': function(btn)
	    {
            var li = $(this);
            var block = $(this).attr('data-block');

            if (!li.hasClass('active') && !li.hasClass('active_hover')) {
                $('.header-wrapper .menu li').removeClass('active');
                $('.header-wrapper .menu li').removeClass('active_hover');
                li.addClass('active_hover');

                $('.menuFixed').removeClass('show');
                // $(block).show("slide", {direction: "up"}, 1500);
                $(block).addClass('show');
                timer = setTimeout(function()
                {
                    li.addClass('active');
                    clearTimeout(timer);
                }, 333, block);
            }
	    },
	    'mouseout': function ()
	    {
            var li = $(this);
            var block = $(this).attr('data-block');
            if (!li.hasClass('active')) {
                $(block).removeClass('show');
            }
            $('.header-wrapper .menu li').removeClass('active_hover');
	        clearTimeout(timer);
	    }
	});

	$('.menu li').on('click', function()
	{
        var li = $(this);
        var block = $(this).attr('data-block');

        if (!li.hasClass('active')) {
            $('.header-wrapper .menu li').removeClass('active');

            li.addClass('active');
            $('.menuFixed').removeClass('show');
            $(block).addClass('show');
        }
	});

	$(".menu-list__main li").hover(
        function()
        {
        	$(this).addClass('active');
            $(this).find('.menu-list__main-sub').show();
        },
        function() {
        	$(this).removeClass('active');
            $(this).find('.menu-list__main-sub').hide();
        }
    );

    $(".menu-list__main-sub li").hover(
        function() {
        	$(this).addClass('active');
            $($(this).attr('data-item-menu')).show();
        },
        function() {
        	$(this).removeClass('active');
            $($(this).attr('data-item-menu')).hide();
        }
    );

    $(".menu-list__main-sub__items").hover(
        function() {
        	$('[data-item-menu="#'+$(this).attr('id')+'"]').addClass('active');
            $('#'+$(this).attr('id')).show();
        },
        function() {
        	$('[data-item-menu="#'+$(this).attr('id')+'"]').removeClass('active');
            $('#'+$(this).attr('id')).hide();
        }
    );

    $('.btn-notify-hover').on('mouseover', function()
    {
    	$('.profile-box').hide();
    	$('.notify-box').show();

	    $('.notify-box').on('mouseover', function()
	    {
	    	$('.notify-box').show();
	    });
    });

    $('.notify-box').on('mouseleave', function()
    {
    	$('.notify-box').hide();
    });

    $('.notify-box__header-close').on('click', function()
    {
    	$('.notify-box').hide();
    });

    $('.btn-user').on('mouseover', function()
    {
    	$('.notify-box').hide();
    	$('.profile-box').show();

	    $('.profile-box').on('mouseover', function()
	    {
	    	$('.profile-box').show();
	    });
    });

    $('.btn-lk').on('mouseover', function()
    {
    	$('.notify-box').hide();
    	$('.profile-box').show();

	    $('.profile-box').on('mouseover', function()
	    {
	    	$('.profile-box').show();
	    });
    });

    $('.profile-box').on('mouseleave', function()
    {
    	$('.profile-box').hide();
    });

    $('.profile-box__header-close').on('click', function()
    {
    	$('.profile-box').hide();
    });

    $('.main-side').on('mouseover', function()
    {
    	$(this).css('left', '0px');
    });

    $('.side-unwrap').on('click', function()
    {
		if( $(this).hasClass('active') )
		{
			$(this).removeClass('active');
			$('.main-side').removeClass('active');
    		$('.main-side').css('left', '0px').css('width', '55px');
		}
		else
		{
			$(this).addClass('active');
			$('.main-side').addClass('active');
    		$('.main-side').css('left', '0').css('width', '215px');
		}
    });

    $('.selectels-type__object .btn-selectel').on('click', function()
    {
    	$('.selectels-type__object .btn-selectel').removeClass('active');
    	$(this).addClass('active');
    });

    $('.selectels-type__forma .btn-selectel').on('click', function()
    {
    	$('.selectels-type__forma .btn-selectel').removeClass('active');
    	$(this).addClass('active');
    });

    $('.selectels-type__box .selectels-item__list-ibi').on('click', function()
    {
    	$('.selectels-type__box .selectels-item__list-ibi').removeClass('active');
    	$(this).addClass('active');
    });

    $('.selectels-type__box2 .selectels-item__list-ibi').on('click', function()
    {
    	$('.selectels-type__box2 .selectels-item__list-ibi').removeClass('active');
    	$(this).addClass('active');
    });

	$('.menuFixedClose').on('click', function()
	{
		$('.header-wrapper .menu li').removeClass('active');
		$('.menu-list li').removeClass('active');
		// $('.side-menu__list').hide();
		$($(this).attr('id')).removeClass('show');
	});

	$('.toggler-wrapper.toggle-theme input').on('change', function()
	{
        setCookie('theme', $(this).is(':checked'));
        console.log($(this).is(':checked'));
        location.reload();
	});

	$('.btn-mobile').on('click', function()
	{
		// if( $('.main-side').length )
		// {
		// 	$('.main-side').addClass('active').css('left', '0').css('width', '215px').show();
		// 	$('.side-unwrap').addClass('active');
		// }
		// else
		{
			$('.showMobileMenu').show();
		}
	});

    $('.popup__tariff-input').on('click', function()
    {
        $('.popup__tariff1').removeClass('active');
        $('.popup__tariff2').removeClass('active');
        $('.popup__tariff-input').removeClass('active');
        $(this).addClass('active');
        $(this).find('.popup__tariff2').addClass('active');
    });

    $('.faq__menu-show').on('click', function()
    {
        $('.faq__block-left').hide();
        $('.page-faq .right-side').show();
        $('.faq__menu-show').removeClass('show');
        $('.faq__menu-hide').addClass('show');
    });

    $('.faq__menu-hide').on('click', function()
    {
        $('.faq__block-left').show();
        $('.page-faq .right-side').hide();
        $('.faq__menu-hide').removeClass('show');
        $('.faq__menu-show').addClass('show');
    });

	$('.menuMobileClose').on('click', function()
	{
		$('.showMobileMenu').hide();
	});

	$('.menuMobileListItems li .after').on('click', function()
	{
        openMenuMobile($(this).parents('li').data('id'), $(this).parents('li').data('parent'));
	});

	$('.menuMobileListItems li a:first-child').on('click', function(event)
	{
       event.preventDefault()
	});
	$('.menuMobileBody a.back').on('click', function()
	{
	    var id = $('.menuMobileListItems').data('select');
        openMenuMobile(id, $('.menuMobileListItems li[data-id="'+id+'"]').data('parent'));
        if (id == 0) {
            $('body').removeClass('active_back_mobile_button');
        }
	});

	function openMenuMobile(id, parent)
    {
        $('.menuMobileListItems li').removeClass('active');
        $('.menuMobileListItems li[data-parent="'+id+'"]').addClass('active');
        $('.menu__subtitle').text($('.menuMobileListItems li[data-id="'+id+'"] a:first-child').text());
        if (!$('body').hasClass('active_back_mobile_button')) {
            $('body').addClass('active_back_mobile_button');
        }
        $('.menuMobileListItems').data('select', parent);
    }

	$('.btn-search').on('click', function()
	{
		$('.headerSearchBox').show();
	});

	$('.headerSearchBoxCloseBtn').on('click', function()
	{
		$('.headerSearchBox').hide();
	});

	$('.email-to-phone__resave .checkbox-green__input').on('change', function()
	{
		if($(this).is(":checked"))
		{
			$('.email-save__one').css('display', 'none');
			$('.email-save__two').css('display', 'block');
		}
		else
		{
			$('.email-save__one').css('display', 'block');
			$('.email-save__two').css('display', 'none');
		}

		return false;
	});

	$('.menu__footer__items').on('click', function()
	{
        var setActive = false;
        if( !$(this).hasClass('active') )
        {
            setActive = true;
        }
        $('.menu__footer__items').removeClass('active');

		if( setActive )
		{
			$(this).addClass('active');
		}
	});


	$('.form-tariffs__item').on('click', function()
	{
		$('.form-tariffs__item').removeClass('active');
		$(this).addClass('active');
	});




    var $elementFooter = $('.footer');
    let counter = 0;
    $(window).scroll(function()
    {
        var scroll = $(window).scrollTop() + $('.main-side').height() + 200;

        var offset = $elementFooter.offset().top

        if (scroll > offset && counter == 0)
        {
        	$('.side-unwrap').removeClass('active');
        	$('.main-side').removeClass('active');
            $('.main-side').css('left', '-100px').css('width', '55px');
            counter = 1;
        }
        else if( scroll < offset && counter == 1 )
        {
        	$('.side-unwrap').removeClass('active');
        	$('.main-side').removeClass('active');
        	$('.main-side').css('left', '0').css('width', '55px');
        	counter = 0
        }
    });

    $('.ewdijwjdhshssgagaga').on('click', function()
    {
    	if( $(this).hasClass('active') )
    	{
    		$('.sorting-boxes__btns__news').removeClass('active');
    		$(this).removeClass('active');
    	}
    	else
    	{
    		$('.sorting-boxes__btns__news').addClass('active');
    		$(this).addClass('active');
    	}
    });

    $('.ewdijwjdhshssgagaga').on('mouseleave', function()
    {
    	$(this).removeClass('active');
    	$('.sorting-boxes__btns__news').removeClass('active');
    });





	/*$('.weuifhwia .services-list__item').on('mouseover', function()
	{
		$('.weuifhwia .services-list__item').removeClass('activise');
		$(this).addClass('activise');

		return false;
	})*/

    var arrCompariesServices = [];
	$(document).on('change', '.compareServiceItems', function(e)
	{
		var idTariff = $(this).val();

		if( $(this).is(':checked') )
		{
			arrCompariesServices.push(idTariff);
		}
		else
		{
			arrCompariesServices = $.grep(arrCompariesServices, function(id) {
				return id != idTariff;
			});
		}

		if( arrCompariesServices && arrCompariesServices.length > 1 )
		{
			$('.compare-tariffs').removeClass('hide');
		}
		else
		{
			$('.compare-tariffs').addClass('hide');
		}

		$('.compare-tariffs__descr').html('Р’С‹Р±СЂР°РЅРѕ <span class="compare-tariffs__span">' + arrCompariesServices.length + ' ' + getTariffWord(arrCompariesServices.length) + ' </span> РґР»СЏ СЃСЂР°РІРЅРµРЅРёСЏ');
	});
    function getTariffWord(count) {
        const cases = [2, 0, 1, 1, 1, 2];
        const words = ['С‚Р°СЂРёС„', 'С‚Р°СЂРёС„Р°', 'С‚Р°СЂРёС„РѕРІ'];

        if (count % 100 >= 5 && count % 100 <= 20) {
            return words[2];
        }

        const wordIndex = (count % 10 < 5) ? cases[count % 10] : cases[5];
        return words[wordIndex];
    }
    $('#compareServicesTarrifs').on('click', function(event)
    {
        var url = $(this).attr('href') + '?ids=' + arrCompariesServices.join(',');
        window.location = url;
        event.preventDefault();
    });

	$('label[for="serviceItemCompareIdsItems"]').on('click', function(e)
	{
		e.stopImmediatePropagation();

		var input = $(this).find('input');

		var idTariff = input.val();

		console.log(idTariff);

		if( input.is(':checked') )
		{
            $(this).parents('.tariffs__slider-item').removeClass('active');
			input.prop('checked',false);

			arrCompariesFullServices = $.grep(arrCompariesFullServices, function(id) {
				return id != idTariff;
			});
		}
		else
		{
			input.prop('checked',true);
            $(this).parents('.tariffs__slider-item').addClass('active');

			arrCompariesFullServices.push(idTariff);
		}

		console.log(arrCompariesFullServices);
	});

    $('.basket-delete').on('click', function()
    {
        $('.company__delete').addClass('active');
        $('.company__delete .btn-compare-tariffs').prop('href', $(this).data('href'));
        $('.company__delete .compare-tariffs__descr').text('Р’С‹ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ '+$(this).parents('.company__block-list').find('.services-list__item-name__text').text()+'?');
    });

    $('.company__delete .compare-tariffs__cancel').on('click', function()
    {
        $('.company__delete').removeClass('active');
    });

	$('#compareServicesFullTarrifs').on('click', function()
	{
		window.location = $(this).attr('data-url') + '?ids=' + arrCompariesFullServices.join(',');
	});

    $(document).on('click', '.faq .form-selectize__item', function(event){
        toggleActiveClassFaq($(this).data('type'));

        event.preventDefault();
    });

    var phoneInputID = "#phone";
    var inputs = document.querySelectorAll(phoneInputID);

    inputs.forEach(function(input) {
        var iti = window.intlTelInput(input, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
            initialCountry: 'RU',
            formatOnDisplay: true,
            hiddenInput: "full_number",
        });

        $(input).on("countrychange", function(event) {
            // Get the selected country data to know which country is selected.
            var selectedCountryData = iti.getSelectedCountryData();

            // Get an example number for the selected country to use as placeholder.
            newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL);

            // Reset the phone number input.
            iti.setNumber("");

            // Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
            const formattedNumber = newPlaceholder.replace(/(\+7|8)\s?\((\d{3})\)\s?(\d{3})-(\d{2})-(\d{2})/g, function(match, countryCode, areaCode, firstPart, secondPart, thirdPart) {
                return `${countryCode} (000) 000-00-00`;
            });
            mask = formattedNumber;

            // Apply the new mask for the input
            $(this).mask(mask);
        });


        // When the plugin loads for the first time, we have to trigger the "countrychange" event manually,
        // but after making sure that the plugin is fully loaded by associating handler to the promise of the
        // plugin instance.

        iti.promise.then(function() {
            $(phoneInputID).trigger("countrychange");
        });
    });

    $(document).on('change', '.faq .box-selectors__faq-select', function(event){
        toggleActiveClassFaq($(this).find('option:selected').val());
    });

    function toggleActiveClassFaq(type) {
        $('.faq .list-faq__body-item').removeClass('type_active');
        $('.faq .list-faq__body-item[data-type="'+type+'"]').addClass('type_active');

        $('.faq .form-selectize__item').removeClass('active');
        $('.faq .form-selectize__item[data-type="'+type+'"]').addClass('active');

        $('.faq .box-selectors__faq-select option').prop('selected', false);
        $('.faq .box-selectors__faq-select option[value="'+type+'"]').prop('selected', true);

        $('.faq .list-faq__header').removeClass('group_active');
        $('.faq .list-faq__header').each(function() {
            let self = $(this);
            let types = $(this).data('types');
            let typesArray = [];
            if (types != "") {
                if (types.toString().indexOf(',') > -1) {
                    typesArray = types.split(',');
                } else {
                    typesArray = [types];
                }
            }

            typesArray.forEach(function(e) {
                if (e == type) {
                    self.addClass('group_active');
                }
            });
        });
    }

    $('select').select2();

    $(document).on('click', '.link_filter a', function(event){
        $(this).toggleClass('active');
        $('.box-searches__i').toggleClass('active');

        event.preventDefault();
    });

    $(document).on('click', '.filter_close_icon', function(event){
        var type = $(this).parents('a').data('select');
        $('.box-searches__i select[name="'+type+'"]').val(0).trigger('change');

        event.preventDefault();
    });

    $(document).on('change', '.box-searches__i select', function(event){
        searchFilter();
    });

    searchFilter();
    function searchFilter()
    {
        var text_type = $('.box-searches__i select[name="type"] option:selected').text();
        var text_organ = $('.box-searches__i select[name="organ"] option:selected').text();
        var text_sfera = $('.box-searches__i select[name="sfera"] option:selected').text();

        $('.list_filter a[data-select="type"] .text').text(text_type);

        if (text_type == 'РќРµ РІС‹Р±СЂР°РЅРѕ') {
            $('.list_filter a[data-select="type"]').removeClass('active');
        } else {
            $('.list_filter a[data-select="type"]').addClass('active');
        }
        $('.list_filter a[data-select="organ"] .text').text(text_organ);
        if (text_organ == 'РќРµ РІС‹Р±СЂР°РЅРѕ') {
            $('.list_filter a[data-select="organ"]').removeClass('active');
        } else {
            $('.list_filter a[data-select="organ"]').addClass('active');
        }
        $('.list_filter a[data-select="sfera"] .text').text(text_sfera);
        if (text_sfera == 'РќРµ РІС‹Р±СЂР°РЅРѕ') {
            $('.list_filter a[data-select="sfera"]').removeClass('active');
        } else {
            $('.list_filter a[data-select="sfera"]').addClass('active');
        }
    }

    $(".tt1").on("click", function(event) {;
        $(".tt1").removeClass("active");
        $(this).addClass("active")
        event.preventDefault()
    });

    $(".company__form input, .profile__form input, .company__form textarea, .profile__form textarea, .company__form .select2, .profile__form .select2").on("click", function(event) {
        $(".company__link").removeClass("active");
        $(".company__link-green").addClass("active");
    });

    $(".company__link-green").on("click", function(event) {
        $(".company__form, .profile__form").submit();
        $(".company__link").removeClass("active");
        $(".company__link:not(.company__link-green)").addClass("active");
        event.preventDefault()
    });

    $(".compare-tariffs__cancel").on("click", function(event) {
        $(".compare-tariffs").addClass("hide");
        $(".tariff-services__two-box__right input[type='checkbox']").prop("checked", false);
        arrCompariesServices = [];
        event.preventDefault()
    });

    $("[name='inn']").on("keyup", function(event) {


        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        let token = "827dd0d7a65b3843eb63556a9e0f02a6818bc4a6";
        let query = $(this).val();

        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.suggestions.length > 0) {
                    $("[name='ur_name']").val(result.suggestions[0].unrestricted_value);
                    $("[name='address']").val(result.suggestions[0].data.address.unrestricted_value);
                    $("[name='kpp']").val(result.suggestions[0].data.kpp);
                    $("[name='ogrn']").val(result.suggestions[0].data.ogrn);
                    console.log(result);
                }

            })
            .catch(error => console.log("error", error));

    });
    const movingBlock = document.querySelector('.tariff-services__two-box__left .services-list');
    const parent = document.querySelector('.tariff-services__two-box__left');
    const countBanners = $('.services-list-counter').data('count_sliders');

    if (parent !== null && countBanners > 2) {
        window.addEventListener('scroll', function () {
            if (window.innerWidth >= 950) {
                const parentRect = parent.getBoundingClientRect();
                const blockRect = movingBlock.getBoundingClientRect();

                const parentBottom = parentRect.top;
                const blockTop = blockRect.top;
                const blockHeight = blockRect.height;
                const blockWidth = blockRect.width;
                const parentHeight = parentRect.height;
                const calcHeight = parentHeight - blockHeight;
                console.log(countBanners);
                console.log(calcHeight);

                const maxHeight = calcHeight - 120 - 93;//600;

                if (parentBottom < 120 && parentBottom > -maxHeight) {
                    movingBlock.style.top = (-1 * parentBottom) + 130 + 'px';
                } else if (parentBottom >= 120) {
                    movingBlock.style.top = 0 + 'px';
                } else {
                    movingBlock.style.top = maxHeight + 122 + 'px';
                }
            }
        });
    }

// Р—Р°РјРµРЅРёС‚Рµ РЅР° СЃРІРѕР№ API-РєР»СЋС‡
    let token = "827dd0d7a65b3843eb63556a9e0f02a6818bc4a6";
    let city = $("#city");

// СѓРґР°Р»СЏРµС‚ РїР»Р°РЅРёСЂРѕРІРѕС‡РЅС‹Рµ СЃС‚СЂСѓРєС‚СѓСЂС‹
    function removeNonCity(suggestions) {
        return suggestions.filter(function(suggestion) {
            return suggestion.data.fias_level !== "65";
        });
    }

    function join(arr /*, separator */) {
        let separator = arguments.length > 1 ? arguments[1] : ", ";
        return arr.filter(function(n){return n}).join(separator);
    }

    function cityToString(address) {
        return join([
            join([address.city_type, address.city], " "),
            join([address.settlement_type, address.settlement], " ")
        ]);
    }

// РћРіСЂР°РЅРёС‡РёРІР°РµРј РѕР±Р»Р°СЃС‚СЊ РїРѕРёСЃРєР° РѕС‚ РіРѕСЂРѕРґР° РґРѕ РЅР°СЃРµР»РµРЅРЅРѕРіРѕ РїСѓРЅРєС‚Р°
    city.suggestions({
        token: token,
        type: "ADDRESS",
        hint: false,
        count: 20,
        geoLocation: false,
        bounds: "city-settlement",
        onSuggestionsFetch: removeNonCity
    });

    if ("paintWorklet" in CSS) {
        CSS.paintWorklet.addModule(
            "https://www.unpkg.com/css-houdini-squircle/squircle.min.js"
        );
    } else {
        console.log('PaintWorklet РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚СЃСЏ РІ СЌС‚РѕРј Р±СЂР°СѓР·РµСЂРµ.');
    }

    $('.popup_loading_button').on('click', function (event) {
        $('#popup__loading input[name="documentId"]').val($(this).data('id'));
        $('.form__button-load-doc').attr('href', '/lk/doc/approve/' + $(this).data('id'));
    });

    $('.dz-delete-btn').on('click', function (event) {
        $(this).parents('form').find('.dz-preview').remove();
        $(this).parents('form').removeClass('dz-started');
        event.preventDefault()
    });
    $( function() {
        $( "input[name='birtdate']" ).datepicker({
            closeText: 'Р—Р°РєСЂС‹С‚СЊ',
            prevText: '&#x3c;РџСЂРµРґ',
            nextText: 'РЎР»РµРґ&#x3e;',
            currentText: 'РЎРµРіРѕРґРЅСЏ',
            monthNames: [
                'РЇРЅРІР°СЂСЊ', 'Р¤РµРІСЂР°Р»СЊ', 'РњР°СЂС‚', 'РђРїСЂРµР»СЊ', 'РњР°Р№', 'РСЋРЅСЊ',
                'РСЋР»СЊ', 'РђРІРіСѓСЃС‚', 'РЎРµРЅС‚СЏР±СЂСЊ', 'РћРєС‚СЏР±СЂСЊ', 'РќРѕСЏР±СЂСЊ', 'Р”РµРєР°Р±СЂСЊ'
            ],
            monthNamesShort: [
                'РЇРЅРІР°СЂСЊ', 'Р¤РµРІСЂР°Р»СЊ', 'РњР°СЂС‚', 'РђРїСЂРµР»СЊ', 'РњР°Р№', 'РСЋРЅСЊ',
                'РСЋР»СЊ', 'РђРІРіСѓСЃС‚', 'РЎРµРЅС‚СЏР±СЂСЊ', 'РћРєС‚СЏР±СЂСЊ', 'РќРѕСЏР±СЂСЊ', 'Р”РµРєР°Р±СЂСЊ'
            ],
            dayNames: ['РІРѕСЃРєСЂРµСЃРµРЅСЊРµ', 'РїРѕРЅРµРґРµР»СЊРЅРёРє', 'РІС‚РѕСЂРЅРёРє', 'СЃСЂРµРґР°', 'С‡РµС‚РІРµСЂРі', 'РїСЏС‚РЅРёС†Р°', 'СЃСѓР±Р±РѕС‚Р°'],
            dayNamesShort: ['РІСЃРє', 'РїРЅРґ', 'РІС‚СЂ', 'СЃСЂРґ', 'С‡С‚РІ', 'РїС‚РЅ', 'СЃР±С‚'],
            dayNamesMin: ['Р’СЃ', 'РџРЅ', 'Р’С‚', 'РЎСЂ', 'Р§С‚', 'РџС‚', 'РЎР±'],
            weekHeader: 'РќРµРґ',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            changeYear: true,
            changeMonth: true
        });
    } );

    $(document).on('click', '.services-list__icon > a', function (event) {
        $(this).toggleClass('active');
        event.preventDefault();
    });
});
let selectDocument = 0;




function star(){
    const starblock = document.getElementById("star__block");

    const count = starblock.getAttribute("data-count");

    const elements = starblock.getElementsByClassName("star__element");

    for (let i = 0; i < 5; i++) {
        elements[i].classList.remove("active");
    }

    for (let i = 0; i < count; i++) {
        elements[i].classList.add("active");
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const starblock = document.getElementById("star__block");
    if (starblock) {
        star();
        let search = document.querySelectorAll('.star__element');
        let clickSearch = function(event){

            var index = Array.prototype.indexOf.call(starblock.children, this);

            starblock.setAttribute("data-count", index + 1);
            $('.profile__star-btn').attr('href', $('.profile__star-btn').data('href') + (index+1));
            star();

            event.preventDefault();
        };

        search.forEach(function(el){

            el.addEventListener('click' ,clickSearch);

        });
    }

    $(document).on('click', '.open-live-chat', function(event){
        $('.b24-widget-button-icon-animation').click();

        event.preventDefault();
    });

    $('.tooltip-pp').tooltip();

    $(document).on('click', '.buyTariffOrderItems', function(event){
        if ($(this).attr('href').indexOf('#') > -1) {
            $($(this).attr('href')).fancybox({
                'touch': false
            }).click();

            event.preventDefault();
        }
    });

    $(document).on('click', '.popup-box .mb-0.flex.ai-c.rate__label, .popup-box .popup__tariff-input', function(event){
        $(this).find('input[type=checkbox]').attr('checked', !$(this).find('input[type=checkbox]').attr('checked'));
        $(this).find('input[type=radio]').parents('.form-item').find('input[type=radio]').attr('checked', false);
        $(this).find('input[type=radio]').attr('checked', true);
    });

    $(document).on('click', '#sendRequestPaymentConsult', function(event){
        if (authId == -1) {
            $('#popup-login').fancybox({
                'touch': false
            }).click();
            return;
        }

        var tariffId = $(this).parents('.popup-box').attr('id')
            .replace('popup-pays-clean', '')
            .replace('popup-pays-date', '')
            .replace('popup-pays-tariff', '');
        var count = $(this).parents('.popup-box').find('input[name=count]:checked').val();
        var nonCash = $(this).parents('.popup-box').find('input[name=non_cash]:checked').val();

        $.ajax({
            url: '/payment',
            type: 'GET',
            data: {
                tariffId: tariffId,
                count: count,
                nonCash: nonCash,
            },
            success: function( response )
            {
                if (response.payment_link) {
                    window.location.href = response.payment_link;
                }
            }
        });

        event.preventDefault();
    });
});
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}