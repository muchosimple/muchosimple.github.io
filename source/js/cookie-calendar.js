/*------------------------------------*\
    $COOKIE CALENDAR JS
\*------------------------------------*/

(function() {
  /**
   * Gallery Modal
   */
  // if ($('.gallery__modal').length) {
  //   var $galleryModal = $('.gallery__modal');

  //   $('.gallery').addClass('modal');
  // }

  // Load the images when the grid is present.
  if ($('.cc__cookie-list').length) {
    if ($('.cc__cookie-list').find('.fadein').length === 0) {
      $('.cc__cookie-list').find('.cc__cookie-list-item').each(function(i){
        $(this).delay(i * 150).queue(function() {
          $(this).addClass('fadein').dequeue();
        });
      });
    }
  }

  // Get carousel instance data and store it in variable cc_slides.
  var cc_slides = $('.owl-carousel').data('owlCarousel');

  // init
  $('.js-open-cc-modal').on('click', function() {
    var $this = $(this);
    cc_slides.jumpTo($this.index());
  });

})();
