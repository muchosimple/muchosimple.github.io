/* MAIN JS
--------------------------------------------*/

(function($){

  // BASE SETUP ------------------------------------//

  // set variable for browsers less than IE9.
  var oldIE = ($('html').hasClass('lt-ie9')) ? true : false;

  // iOS detection
  var iOS = false,
      p = navigator.platform;

  if (p === 'iPad' || p === 'iPhone' || p === 'iPod'){
    iOS = true;
  }

  // is it a touch device?
  var isTouch = (Modernizr.touch) ? true : false;

  // global breakpoints
  var px500 = 500,
      px700 = 700,
      px900 = 900,
      px1000 = 1000,
      pxmax = 1320;

  // check window width
  var getWidth = function() {
    var width;
    if (document.body && document.body.offsetWidth) {
      width = document.body.offsetWidth;
    }
    if (document.compatMode === 'CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
       width = document.documentElement.offsetWidth;
    }
    if (window.innerWidth) {
       width = window.innerWidth;
    }
    return width;
  };
  window.onload = function() {
    getWidth();
  }
  window.onresize = function() {
    getWidth();
  }


  // SITE SPECIFIC JS ------------------------------//

  var $body = $('body');

  // toggle parent class
  $('.js-toggle-parent').on('click touchstart', function(e){
    e.preventDefault();
    var $this = $(this);

    $this.parent().toggleClass('is-active');
  });

  /*
   * Toggle Active Classes
   *
   * @description:
   *  toggle specific classes based on data-attr of clicked element
   *
   * @requires:
   *  'js-toggle' class and a data-attr with the element to be
   *  toggled's class name both applied to the clicked element
   *
   * @example usage:
   *  <span class="js-toggle" data-toggled="toggled-class">Toggler</span>
   *  <div class="toggled-class">This element's class will be toggled</div>
   *
   */
  $('.js-toggle').on('click touchstart', function(e){
    e.preventDefault();
    var $this = $(this),
        $toggled = $('.' + $this.data('toggled'));

    $this.toggleClass('is-active')
    $toggled.toggleClass('is-active');
  });

  // toggle hovered classes
  $('.js-hover').on('mouseenter mouseleave', function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('is-hovered');
  });

  // back the background parallax
  var parallax = function($b) {
    if (!isTouch) {
      var scrolled = $(window).scrollTop();
      $b.css('background-position', 'center ' + -(scrolled*0.5)+'px');
    }
  }

  // smooth scroll to anchor
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // show or hide the sticky footer button
  var $goTop = $('.go-top');

	$(window).scroll(function() {

		// run the parallax
		//parallax($('.landing-feature'));

		// fade the go-top buttin in
		if ($(this).scrollTop() > 200) {
			$goTop.addClass('active');
		} else {
			$goTop.removeClass('active');
		}
	});

	// animate the scroll to top
	$goTop.on('click touchstart', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 300);
	});

  var itemWidth = 0,
      itemMargin = 0;

  if (getWidth() >= px700) {
     itemWidth = 420;
     itemMargin = 60;
  }

  // reviews slider
  $('.reviews-slides').flexslider({
    animation: "slide",
    slideshow: "false",
    itemWidth: itemWidth,
    itemMargin: itemMargin
    //smoothHeight: "true"
  });

})(jQuery);

// Pattern Lab original js
(function(w){
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight;

	$(w).resize(function(){ //Update dimensions on resize
		sw = document.body.clientWidth;
		sh = document.body.clientHeight;

		//updateAds();
	});


	//Navigation toggle
	$('.nav-toggle-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
	});

	//Navigation toggle
	$('.nav-toggle-search').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header .search-form').toggleClass('active');
	});
})(this);