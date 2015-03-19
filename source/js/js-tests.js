
var galleryPrev = '<span class="icon icon-arrow-left no-bg"><span class="is-vishidden">Previous</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M344.5 5.3l31.7 31.6L163.1 250l213.1 213.1-31.7 31.6L99.8 250z"/></svg></span>';
var galleryNext = '<span class="icon icon-arrow-right no-bg"><span class="is-vishidden">Next</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M153.5 5.3l-31.7 31.6L334.9 250 121.8 463.1l31.7 31.6L398.2 250z"/></svg></span>';

// Gallery init
var $slides = $('.js-slides');
$slides.show().owlCarousel({
  singleItem: true,
  //navigation: true,
  pagination: false,
  lazyLoad: true,
  rewindNav: false,
  slideSpeed: 0,
  lazyEffect: false,
  addClassActive: true,
  mouseDrag: false,
  touchDrag: false,
  navigationText: [galleryPrev, galleryNext],
  afterAction: afterAction
});

// Function called after every slide advance.
function afterAction(){
  $('.slide-count').find('.slide-index').text(this.currentItem);
}

// Custom navigation events
$('.js-slide-hover-next, .js-btn--gallery-start').click(function(){
  $slides.trigger('owl.next');
});
$('.js-slide-hover-prev').click(function(){
  $slides.trigger('owl.prev');
});

// Carousel init
var $carousel = $('.js-carousel');
$carousel.show().owlCarousel({
  items: 8,
  lazyLoad: true,
  navigation: true,
  rewindNav: false,
  lazyEffect: false,
  addClassActive: true,
  mouseDrag: false,
  navigationText: [galleryPrev, galleryNext]
});
