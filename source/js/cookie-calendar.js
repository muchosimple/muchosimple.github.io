/*------------------------------------*\
    $COOKIE CALENDAR JS
\*------------------------------------*/

(function() {

  // Lazy load non-hidden images.
  $('img.lazy--hidden').lazyload({
    threshold: 300,
    skip_invisible: true
  });

  // Load the images when the grid is present.
  if ($('.cc__cookie-list').length) {
    if ($('.cc__cookie-list').find('.fadein').length === 0) {
      $('.cc__cookie-list').find('.cc__cookie-list-item').each(function(i){
        $(this).delay(i * 120).queue(function() {
          $(this).addClass('fadein').dequeue();
        });
      });
    }
  }

  // Get carousel instance data and store it in variable cc_slides.
  var cc_slides = $('.js-cc__slides').data('owlCarousel');
      cc_carousel = $('.js-cc__cookie-list').data('owlCarousel');

  // init
  $('.js-open-cc-modal').on('click', function() {
    var $this = $(this);
    cc_slides.jumpTo($this.index());
  });

  // Prev and Next buttons for narrow width carousel.
  var galleryPrev = '<span class="icon no-bg rounded icon-arrow-left icon--alt icon--large"><span class="is-vishidden">Previous</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M344.5 5.3l31.7 31.6L163.1 250l213.1 213.1-31.7 31.6L99.8 250z"/></svg></span>';
  var galleryNext = '<span class="icon no-bg rounded icon-arrow-right icon--alt icon--large"><span class="is-vishidden">Next</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M153.5 5.3l-31.7 31.6L334.9 250 121.8 463.1l31.7 31.6L398.2 250z"/></svg></span>';

  // Carousel init for one item scroll.
  function cookieScrollOne() {
    $('.js-cc__cookie-list').show().owlCarousel({
      navigation: true,
      lazyLoad: true,
      navigationText: [galleryPrev, galleryNext],
      pagination: false,
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
    });
  }
  // Carousel init for two item scroll.
  function cookieScrollTwo() {
    $('.js-cc__cookie-list').show().owlCarousel({
      navigation: true,
      lazyLoad: true,
      navigationText: [galleryPrev, galleryNext],
      pagination: false,
      slideSpeed: 300,
      paginationSpeed: 400,
      items: 2
    });
  }
  var viewportWidth = $(window).width();

  // Carousel init for to determine if one or two items will be visible.
  function initCookieCarousel() {
    if (viewportWidth < 500) {
      cookieScrollOne();
    }
    if (viewportWidth > 500 && viewportWidth < 700) {
      cookieScrollTwo();
    }
    if (viewportWidth >= 700) {
      cc_carousel.destroy();
    }
  }
  // Init carousels.
  initCookieCarousel();

  // On resize, fire the init carousel function.
  $(window).resize(function() {
    viewportWidth = $(window).width();
    initCookieCarousel();
  });

})();
