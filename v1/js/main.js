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
   * Add Active Classes
   *
   * @description:
   *  add specific classes based on data-attr of clicked element
   *
   * @requires:
   *  'js-add' class and a data-attr with the element to be
   *  toggled's class name both applied to the clicked element
   *
   * @example usage:
   *  <span class="js-add" data-target="add-class" data-prefix="open">Open</span>
   *  <div class="add-class">This get the added class</div>
   *
   */
  $('.js-add').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this),
        $targetPrefix = $this.data('prefix') || 'this',
        $target = $('.' + $this.data('target'));

    $this.addClass($targetPrefix + '-is-active')
    $target.addClass($targetPrefix + '-is-active');
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
    e.stopPropagation();
    var $this = $(this),
        $togglePrefix = $this.data('prefix') || 'this',
        $toggled = $('.' + $this.data('toggled'));

    $this.toggleClass($togglePrefix + '-is-active')
    $toggled.toggleClass($togglePrefix + '-is-active');
  });

  // Toggle parent class
  $('.js-toggle-parent').on('click touchstart', function(e){
    e.preventDefault();
    var $this = $(this);

    $this.parent().toggleClass('is-active');
  });

  // Close main menu when clicked outside
  $('.container').on('click touchstart', function(){
    $('.rick-ross, .nav-toggler').removeClass('main-nav-is-active');
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
