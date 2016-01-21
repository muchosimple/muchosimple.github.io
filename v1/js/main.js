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
  if (getWidth() >= 801) {
    $(window).load(function() {
      $('.ad-sticky').fixTo('.main', {
        className: 'sticky-is-active',
        mind: '.header-inner',
        useNativeSticky: false
      });
    });
  }

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
    $('.block-video, .article, .fitvid').fitVids();
  }

  // 5-star Rating
  if ($('.five-star').length) {
    $('.five-star').find('.star').click(function(){
      $(this).parent().removeClass().addClass('inactive-stars-' + $(this).index());
      $(this).parents('.five-star').addClass('rated');
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

})(jQuery);
