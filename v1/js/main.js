/* MAIN JS
--------------------------------------------*/

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

  // Close main menu when clicked outside.
  $('.nav-wrap').on('click', function(e) {
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

  // Remove input after search overlay is closed.
  $('.search-overlay .close').on('click', function() {
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
      console.log("asdf");
    });
  };
  // Init
  closeOverlay();

  // Load Email a Friend form.
  $('.js-open-mail').on('click', function(e) {
    e.preventDefault();
    if (!$('.load').html().length) {
      $('.load').show().load('/v1/patterns/01-molecules-04-forms-04-email-friend/01-molecules-04-forms-04-email-friend.html .email-friend-wrap', function() {
          // Make the close functionality available to newly loaded elements.
          closeOverlay();
          // Load reCAPTCHA script
          $.getScript('https://www.google.com/recaptcha/api.js');
        });
      $('.overlay').addClass('overlay-active');
    }
  });

  // Init Image lightbox.
  $('.enlarge').imageLightbox({
    selector: 'class="image-lightbox"'
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
