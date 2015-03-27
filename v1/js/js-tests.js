/*
 * Gallery & Carousel
 *
 * @description:
 * All functionality for the interaction with galleries and slideshows.
 *
 * @dependency:
 * http://owlgraphic.com/owlcarousel/
 *
 * @documentation:
 * http://owlgraphic.com/owlcarousel/#customizing
 *
 */

(function() {
  var viewportWidth = $(window).width();

  function resizeDelay(){
    viewportWidth = $(window).width();
    initCarousel();

    // Update slide controls width on resize.
    updateSlideControls();
  }
  var wait;
  window.onresize = function(){
    clearTimeout(wait);
    wait = setTimeout(resizeDelay, 100);
  };

  var galleryPrev = '<span class="icon icon-arrow-left no-bg"><span class="is-vishidden">Previous</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M344.5 5.3l31.7 31.6L163.1 250l213.1 213.1-31.7 31.6L99.8 250z"/></svg></span>';
  var galleryNext = '<span class="icon icon-arrow-right no-bg"><span class="is-vishidden">Next</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M153.5 5.3l-31.7 31.6L334.9 250 121.8 463.1l31.7 31.6L398.2 250z"/></svg></span>';

  var $slides = $('.js-slides');
  var $carousel = $('.js-carousel');

  // Gallery init
  $slides.show().owlCarousel({
    singleItem: true,
    pagination: false,
    lazyLoad: true,
    rewindNav: false,
    slideSpeed: 0,
    lazyEffect: false,
    addClassActive: true,
    mouseDrag: false,
    touchDrag: false,
    navigationText: [galleryPrev, galleryNext],
    afterAction: afterActionGallery,
    afterInit: afterInitGallery
  });

  // Carousel init
  function initCarousel(){
    if (viewportWidth >= 750) {
      $carousel.show().owlCarousel({
        items: 8,
        lazyLoad: true,
        navigation: true,
        rewindNav: false,
        lazyEffect: false,
        addClassActive: true,
        mouseDrag: false,
        scrollPerPage: true,
        itemsCustom: [[0,8], [801,4], [900,5], [950,6], [1045,7], [1130,8]],
        navigationText: [galleryPrev, galleryNext],
        afterInit: afterInitCarousel
      });
    }
  }
  // Init
  initCarousel();

  var slidesMinusAds;

  // Function called after every slide advance.
  function afterActionGallery(){
    slidesMinusAds = $('.slides .owl-item.active').prevAll('.owl-item').find('.slide--ad').length;
    // var current = this.currentItem;
    // Get slide index with filtered out ad slides.
    var current = this.currentItem - slidesMinusAds;

    // Update counter.
    $('.slide-count').find('.slide-index').text(current);

    // Update active item class.
    $carousel.find('.owl-item').removeClass('active-item').eq(current).addClass('active-item');
    if ($carousel.data('owlCarousel') !== undefined){
      centerCarousel(current);
    }

    // Update pushstate with atomic url.
    if (history && history.pushState) {
      var hash = $slides.find('.owl-item').eq(this.currentItem).find('.slide').attr('data-url');
      window.history.pushState(null, null, hash);
    }

    // Refresh refreshable ads.
    refreshAds('.js-ad-refresh, .owl-item.active .ad-300x250');
  }

  // Get the current slide number.
  function getSlideIndex() {
    // var slideData = $slides.data('owlCarousel');
    var href = $(location).attr('href');
    var slideUrl = href.substr(href.lastIndexOf('?') + 1);
    if (slideUrl.length) {
      // Slide index with filtered out ad slides.
      var slideIndex = $slides.find('[data-url="?' + slideUrl + '"]').parent().index() - $('.slides .owl-item.active').prevAll('.owl-item').find('.slide--ad').length;
    }
    if (slideIndex < 0) {
      slideIndex = 0
    }
    return slideIndex;
  }

  // Once the gallery is loaded, check the url for a url segment that matches a
  // slide data-url and advance to that slide.
  function afterInitGallery() {
    // Get current slide number.
    $slides.trigger('owl.goTo', getSlideIndex());
    // Update slide controls width on gallery init.
    updateSlideControls();
  }

  // Update size of the prev/next controls for irregular slides. Since those
  // slides doesn't follow the same structure of a normal slide, we have to
  // get the width of the controls from a previous slide and apply it to the
  // slide controls in order to keep it in the same click position.
  function updateSlideControls() {
    var $endSlideControls = $('.slide--alt').find('.slide-controls');
    if ($('.slide-text').length && getWidth() >= 600) {
      var slideControlsWidth = $('.slide-text').find('.slide-controls').width();
      // Add width to the slide controld for the end slide.
      $endSlideControls.css('width', slideControlsWidth);
    }
    else {
      $endSlideControls.removeAttr('style');
    }
  }

  // Detect the pushstate and update slide.
  window.onpopstate = function(event) {
    if (event.state) {
      // History changed because of pushState/replaceState
    } else {
      // History changed because of a page load
      afterInitGallery();
    }
  }

  // Callback function for when the carousel has been initialized.
  function afterInitCarousel() {
    // Update active item class.
    $carousel.find('.owl-item').removeClass('active-item').eq(getSlideIndex()).addClass('active-item');
    // Move to that active item.
    $carousel.trigger('owl.goTo', getSlideIndex());
  }

  // Update the slide position.
  $carousel.on('click', '.owl-item', function(e){
    e.preventDefault();
    var number = $(this).find('.carousel-item').data('slide');
    $slides.trigger('owl.goTo', number);
  });

  // Move the carousel depending on which slide is active.
  function centerCarousel(number){
    var carouselVisible = $carousel.data('owlCarousel').owl.visibleItems;
    var num = number;
    var found = false;
    for (var i in carouselVisible){
      if (num === carouselVisible[i]){
        var found = true;
      }
    }

    if (found === false){
      if (num > carouselVisible[carouselVisible.length - 1]){
        $carousel.trigger('owl.goTo', num - carouselVisible.length + 2)
      }
      else{
        if (num - 1 === -1){
          num = 0;
        }
        $carousel.trigger('owl.goTo', num);
      }
    }
    else if (num === carouselVisible[carouselVisible.length - 1]){
      $carousel.trigger('owl.goTo', carouselVisible[1])
    }
    else if (num === carouselVisible[0]){
      $carousel.trigger('owl.goTo', num - 1)
    }
  }

  // Custom navigation events
  $('.js-slide-hover-next, .js-btn--gallery-start').click(function(){
    $slides.trigger('owl.next');
  });
  $('.js-slide-hover-prev').click(function(){
    $slides.trigger('owl.prev');
  });
  $('.js-replay').click(function(e){
    e.preventDefault();
    $slides.trigger('owl.goTo', 0);
  });
})();

// Trigger an ad refresh.
function refreshAds(ad) {
  var $ad = $(ad).find('img');
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  $ad.each(function(){
    var adSrc = $(this).attr('src');
    $(this).attr('src', adSrc).css({'border-width' : '5px', 'border-style' : 'solid', 'border-color' : '#' + randomColor});
  });

  //console.log("AD REFRESH");
}
