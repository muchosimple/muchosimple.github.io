/* MAIN JS
--------------------------------------------*/

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
};
window.onresize = function() {
  getWidth();
};

(function($){

  // BASE SETUP ------------------------------------//

  // set variable for browsers less than IE9.
  var oldIE = ($('html').hasClass('lt-ie9')) ? true : false;

  // is it a touch device?
  var isTouch = (Modernizr.touch) ? true : false;

  // global breakpoints
  var px500 = 500,
      px700 = 700,
      px900 = 900,
      px1000 = 1000,
      pxmax = 1320;

  // SITE SPECIFIC JS ------------------------------//

  // Lazy load images.
  $('img.lazy').show().lazyload({
    threshold: 300
  });

  var $body = $('body');

  var toggleClasses = function(element) {
    var $this = element,
        $togglePrefix = $this.data('prefix') || 'this',
        $toggled = $('.' + $this.data('toggled'));

    $this.toggleClass($togglePrefix + '-is-active');
    $toggled.toggleClass($togglePrefix + '-is-active');

    // Remove a class on another element, if needed.
    if ($this.data('remove')) {
      $('.' + $this.data('remove')).removeClass($this.data('remove'));
    }

    // If the toggle element trigger is opening a modal, add the .has-close
    // class to the trigger and the close icon will also toggle the target element.
    if ($this.hasClass('has-close')) {
      $toggled.addClass($togglePrefix + '-is-active--with-close');
      $('.js-close').click(function(){
        $this.removeClass($togglePrefix + '-is-active');
        $toggled.removeClass($togglePrefix + '-is-active');
      });
    }
  };

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
  $('.js-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleClasses($(this));
  });
  // Allow links inside elements with .js-toggle to be clicked.
  $('.js-toggle a').on('click', function(e) {
    e.stopPropagation();
  });

  // Toggle parent class
  $('.js-toggle-parent').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);

    $this.parent().toggleClass('is-active');
  });

  // Reset subnav when main menu is reopened.
  $('.nav-toggler').on('click', function() {
    $('.l-top').delay(300).queue(function() {
      $(this).removeClass('is-active');
      $(this).dequeue();
    });
  });

  // Stop propagation when clicked on these elements.
  $('.nav-wrap, .search-form').on('click', function(e) {
    e.stopPropagation();
  });
  $(document).on('click', function(e) {
    $('.main-nav-is-active').removeClass('main-nav-is-active');
  });

  // Toggle hovered classes
  $('.js-hover').on('mouseenter mouseleave', function(e) {
    e.preventDefault();
    toggleClasses($(this));
  });

  // Center align the sub-navigation on main nav at wider widths.
  $('.horiz-nav').find('.l-top').on('mouseenter mouseleave', function() {
    var $this = $(this),
        $thisWidth = $this.outerWidth(),
        $subNav = $this.find('.nav-sub'),
        $subNavWidth = $subNav.outerWidth();

    $subNav.css('left', - ($subNavWidth - $thisWidth) / 2);
  });

  // Focus the main header search on toggle click.
  $('.search-toggler').on('click', function() {
    $('.search-form .search-field').focus();
  });

  // Remove input after search overlay is closed and close search overlay.
  $('.search-overlay .close, .search-overlay').on('click', function() {
    // Specific for active search overlay.
    $('.header').removeClass('search-is-active');
    $('.search-form .search-field').delay(300).queue(function() {
      $(this).val("");
      $(this).dequeue();
    });
  });

  // Basic activate overlay
  var overlayOn = function() {
    $('.overlay').addClass('overlay-active');
  };
  var overlayOff = function() {
    $('.overlay').removeClass('overlay-active');
  };

  var viewportWidth = $(window).width();
  var viewportHeight = $(window).height();

  if (viewportWidth >= 700 && viewportHeight >= 750) {
    // Open overlay
    $('.js-open-modal').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeIn();
      overlayOn();
    });

    // Close overlay
    $('.js-close').on('click', function(e) {
      e.preventDefault();
      $('.modal').fadeOut();
      overlayOff();
    });
  }

  // Anytime the overlay is active, click on it or an element with '.js-close'
  // to close it.
  var closeOverlay = function() {
    $('.js-close, .overlay-active').on('click', function(e) {
      e.preventDefault();
      $('.load').fadeOut().empty();
      $('.overlay').removeClass('overlay-active');
    });
  };
  // Init
  closeOverlay();

  // Load Email a Friend form.
  $('.js-open-mail').on('click', function(e) {
    e.preventDefault();
    if (!$('.load').html().length) {
      $('.load').show().load('/v1/patterns/01-molecules-04-forms-04-email-friend/01-molecules-04-forms-04-email-friend.html .email-friend-wrap', function() {
          $('.email-friend-wrap').fadeIn();
          // Make the close functionality available to newly loaded elements.
          closeOverlay();
          // Load reCAPTCHA script
          $.getScript('https://www.google.com/recaptcha/api.js');
        });
      $('.overlay').addClass('overlay-active');
    }
  });

  // Init Image lightbox.
  $('a.enlarge').imageLightbox({
    selector: 'class="image-lightbox"'
  });

  // Sticky right rail ad
  $(window).load(function() {
    if (getWidth() >= 800) {
      var mindElement = '.header-inner';
      // If leaderboard is sticky, mind that instead.
      if ($('.ad-sticky--leaderboard').length) {
        mindElement = '.header';
      }
      $('.ad-sticky').fixTo('.main', {
        className: 'sticky-is-active',
        mind: mindElement,
        useNativeSticky: false
      });
      if ($(window).height() >= 650) {
        $('.ad-sticky--leaderboard').fixTo('.page', {
          className: 'sticky-is-active',
          mind: '.header-inner',
          useNativeSticky: false
        });
      }
    }
  });

  // Alternate Sticky Methods
  // Sticky header
  $('.header-inner').stick_in_parent({
    parent: 'body',
    sticky_class: 'sticky-is-active',
    offset_top: '-.5'
  });

  $('.header-inner').stick_in_parent().on('sticky_kit:stick', function(e) {
    $('.header').addClass('header-is-sticky');
  }).on('sticky_kit:unstick', function(e) {
    $('.header').removeClass('header-is-sticky');
  });

  // FitVids
  if ($.fn.fitVids) {
    $('.block-video, .article, .fitvid, .video-player').fitVids();
  }

  // Unhide the BC player when it's ready.
  $('.BrightcoveExperience').attr('data-loaded', 'true');

  // 5-star Rating
  if ($('.five-star').length) {
    $('.five-star').find('.star').click(function() {
      if (!$(this).parents('.five-star').hasClass('rated')) {
        $(this).parent().removeClass().addClass('active-stars-' + parseInt($(this).index() + 1));
        $(this).parents('.five-star').addClass('rated');
      }
    });
  }

  // Home Tabbed Carousel
  var $tabbedCarousel = $('.js-carousel--tabbed');

  // Owl gallery (smaller viewports)
  function initHomeCarouselSmall() {
    $tabbedCarousel.show().owlCarousel({
      autoPlay: 4000,
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true,
      pagination: true,
      stopOnHover: true,
      beforeMove: function(el) {
        //el.find('img.lazy').show().lazyload();
      }
    });
  }

  // Custom tabbed gallery (wider viewports)
  function initHomeCarouselWide() {
    var interval = 4000,
        carouselTimer = setInterval(animateCarousel, interval);

    $tabbedCarousel.find('.c-item:first').addClass('this-is-active');
    function animateCarousel(){
      $tabbedCarousel.find('.c-item').removeClass('this-is-active');
      $tabbedCarousel.find('.c-item:first').removeClass('this-is-active').next('.c-item').addClass('this-is-active').end().appendTo('.js-carousel--tabbed');
      //$tabbedCarousel.find('img.lazy').lazyload();
    }
    // Disable animation when tabs are interacted with.
    $tabbedCarousel.find('.c-tab').hover(function(e){
      clearInterval(carouselTimer);
      $tabbedCarousel.find('.c-item').removeClass('this-is-active');
      $(this).parents('.c-item').addClass('this-is-active');
    });
    // On resize, if the viewport is below 500px, clear the interval and
    // remove active classes.
    $(window).resize(function(){
      if (getWidth() < 500 || (getWidth() > 800 && getWidth() < 1024)) {
        clearInterval(carouselTimer);
        $tabbedCarousel.find('.c-item').removeClass('this-is-active');
      }
    });
  }

  if ($tabbedCarousel.length) {
    // Init the carousel.
    if (getWidth() < 500 || (getWidth() > 800 && getWidth() < 1024)) {
      initHomeCarouselSmall();
    }
    else {
      initHomeCarouselWide();
    }

    // Update carousel functionality on window resize.
    $(window).resize(function(){
      if (getWidth() < 500 || (getWidth() > 800 && getWidth() < 1024)) {
        // Start the Owl carousel.
        initHomeCarouselSmall();
      }
      else {
        // Start the tabbed carousel and destroy the Owl carousel.
        $tabbedCarousel.data('owlCarousel').destroy();
        initHomeCarouselWide();
      }
    });
  }

  // 3 Up Carousel
  var $carousel3up = $('.js-carousel--3up');

  // Owl gallery for 3up carousel
  function initCarousel3up() {
    var galleryPrev = '<a href="" class="icon icon-arrow-left no-bg"><span class="is-vishidden">Previous</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M344.5 5.3l31.7 31.6L163.1 250l213.1 213.1-31.7 31.6L99.8 250z"/></svg></a>';
    var galleryNext = '<a href="" class="icon icon-arrow-right no-bg"><span class="is-vishidden">Next</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M153.5 5.3l-31.7 31.6L334.9 250 121.8 463.1l31.7 31.6L398.2 250z"/></svg></a>';

    $carousel3up.show().owlCarousel({
      autoPlay: 4000,
      slideSpeed: 300,
      lazyLoad: true,
      paginationSpeed: 400,
      pagination: false,
      navigation: true,
      stopOnHover: true,
      navigationText: [galleryPrev, galleryNext],
      itemsCustom: [[0,2], [730,3], [800,2], [930,3]]
    });
  }
  if ($carousel3up.length && getWidth() > 700) {
    initCarousel3up();
    // Update carousel functionality on window resize.
    $(window).resize(function(){
      if (getWidth() > 700) {
        // Start the Owl carousel.
        initCarousel3up();
      }
      else {
        // Start the tabbed carousel and destroy the Owl carousel.
        $carousel3up.data('owlCarousel').destroy();
        initHomeCarouselWide();
      }
    });
  }

  $(window).scroll(function() {
    // Pop up element from footer.
    if ($(window).scrollTop() > 250 && getWidth() < 800) {
      $('.peeky-ad').addClass('active');
    }
    if ($('.main').height() < $(window).scrollTop() || $(window).scrollTop() < 250) {
      $('.peeky-ad').removeClass('active');
    }
  });

  // Smooth scroll to anchor
  // $('a[href*=#]:not([href=#])').click(function() {
  //   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  //     if (target.length) {
  //       $('html,body').animate({
  //         scrollTop: target.offset().top
  //       }, 1000);
  //       return false;
  //     }
  //   }
  // });

  // Before and After images
  function resetAllBeforeAndAfterImages() {
    var after_images = document.getElementsByClassName('after-img'),
        baa_sliders = document.getElementsByClassName('comparison-slider'),
        i,
        image_width;

    for (i = 0; i < after_images.length; i++) {
      image_width = after_images[i].parentNode.clientWidth;
      after_images[i].style.clip = 'rect(0px, auto, auto, ' + image_width/2 + 'px)';
    }

    for (i = 0; i < baa_sliders.length; i++) {
      baa_sliders[i].style.left = '50%';
    }
  }

  $(document).ready(function () {
    resetAllBeforeAndAfterImages();
  });

  // Reset the B&A images on browser resize.
  $(window).resize(function() {
    resetAllBeforeAndAfterImages();
  });

  $('.before-after-img').on('mousemove', function (e) {
    var self = $(this),
        $after_image = self.find('.after-img'),
        image_width = $after_image.width(),
        $slider = self.find('.comparison-slider'),
        $slider_label = self.find('.slider-label'),
        mouse_x = e.pageX - $after_image.parent().offset().left,
        x_percentage = mouse_x/image_width * 100;

    $after_image.css('clip', 'rect(0px, auto, auto, ' + mouse_x + 'px)');
    $slider.css('left', x_percentage + '%');
    $slider_label.addClass('hide');
  });

  $('.before-after-img').on('touchstart touchmove', function (e) {
    var self = $(this),
        $after_image = self.find('.after-img'),
        image_width = $after_image.width(),
        $slider = self.find('.comparison-slider'),
        $slider_label = self.find('.slider-label'),
        touch_x = e.originalEvent.touches[0].pageX - $after_image.parent().offset().left,
        x_percentage = touch_x/image_width * 100;

    $after_image.css('clip', 'rect(0px, auto, auto, ' + touch_x + 'px)');
    $slider.css('left', x_percentage + '%');
    $slider_label.addClass('hide');
  });

  /**
    * Form Validation
    */
   (function() {
     if ($('.js-valididate-form').length) {
       var $signupForm = $('.js-valididate-form');

       // Submit validaton
       $signupForm.submit(function(e) {
         var email1 = $(this).find('.field-email1').val(),
             email2 = $(this).find('.field-email2').val(),
             zip1 = $(this).find('.field-zip1').val(),
             zip2 = $(this).find('.field-zip2').val(),
             emailInvalid = '<div class="invalid-message invalid--email">Please enter a valid email</div>',
             zipInvalid = '<div class="invalid-message invalid--zip">Please enter a zip code</div>';

         // Check valididty.
         if ((email1 !== "" || email2 !== "") && (zip1 !== "" || zip2 !== "")) {
           $(this).find('.invalid-message').remove();
           $(this).find('.field-email').removeClass('invalid-field');
           $(this).find('.field-zip').removeClass('invalid-field');
         }
         else {
           if (email1 == "" && email2 == "") {
             $(this).find('.field-email').addClass('invalid-field');
             if ($(this).find('.invalid--email').length === 0) {
               $(this).find('.field-email').after($(emailInvalid));
             }
           }
           else {
             $(this).find('.field-email').removeClass('invalid-field').end().find('.invalid--email').remove();
           }

           if (zip1 == "" && zip2 == "") {
             $(this).find('.field-zip').addClass('invalid-field');
             if ($(this).find('.invalid--zip').length === 0) {
               $(this).find('.field-zip').after($(zipInvalid));
             }
           }
           else {
             $(this).find('.field-zip').removeClass('invalid-field').end().find('.invalid--zip').remove();
           }
           return false;
         }
       });
     }
   })();

  /*
   * Check all checkboxes
   */
  $('.js-check-all').change(function() {
    $('input:checkbox').prop('checked', $(this).prop("checked"));
  });

})(jQuery);
