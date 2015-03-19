
var galleryPrev = '<span class="icon icon-arrow-left no-bg"><span class="is-vishidden">Previous</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M344.5 5.3l31.7 31.6L163.1 250l213.1 213.1-31.7 31.6L99.8 250z"/></svg></span>';
var galleryNext = '<span class="icon icon-arrow-right no-bg"><span class="is-vishidden">Next</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" enable-background="new 0 0 500 500"><path d="M153.5 5.3l-31.7 31.6L334.9 250 121.8 463.1l31.7 31.6L398.2 250z"/></svg></span>';

// Gallery init
var $slides = $('.js-slides');
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
  afterAction: afterAction
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
  navigationText: [galleryPrev, galleryNext],
  afterInit: function(el){
    el.find('.owl-item').eq(0).addClass('active-item');
  }
});

// Function called after every slide advance.
function afterAction(){
  var current = this.currentItem;
  // Update slide count.
  $('.slide-count').find('.slide-index').text(current);

  $('.js-carousel').find('.owl-item').removeClass('active-item').eq(current).addClass('active-item');
  if ($('.js-carousel').data('owlCarousel') !== undefined){
    centerCarousel(current)
  }
}

$('.js-carousel').on('click', '.owl-item', function(e){
  e.preventDefault();
  var number = $(this).data('owlItem');
  $slides.trigger('owl.goTo', number);
});

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
      if(num - 1 === -1){
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

