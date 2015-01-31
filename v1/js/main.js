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
    e.stopPropagation();
    var $this = $(this),
        $togglePrefix = $this.data('prefix') || 'this',
        $toggled = $('.' + $this.data('toggled'));

    $this.toggleClass($togglePrefix + '-is-active')
    $toggled.toggleClass($togglePrefix + '-is-active');

    // Remove a class on another element, if needed.
    if ($this.data('remove')) {
      $('.' + $this.data('remove')).removeClass($this.data('remove'));
    }
  });

  // Toggle parent class
  $('.js-toggle-parent').on('click touchstart', function(e){
    e.preventDefault();
    var $this = $(this);

    $this.parent().toggleClass('is-active');
  });

  // Reset subnav when main menu is reopened.
  $('.nav-toggler').on('click touchstart', function(){
    $('.l-top').delay(600).queue(function() {
      $(this).removeClass('is-active');
      $(this).dequeue();
    });
  });

  // Close main menu when clicked outside.
  $('.main-nav-is-active.overlay').on('click touchstart', function(){
    $('.main-nav-is-active').removeClass('main-nav-is-active');
  });

  // Toggle hovered classes
  $('.js-hover').on('mouseenter mouseleave', function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('is-hovered');
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
