/*------------------------------------*\
    $COOKIE CALENDAR JS
\*------------------------------------*/

(function() {

  /**
   * Activate overlay
   */
  var overlayOn = function() {
    $('.overlay').addClass('overlay-active');
  };
  var overlayOff = function() {
    $('.overlay').removeClass('overlay-active');
  };

  // Close button
  var closeButtonOn = function(instance) {
    $('<span class="overlay-close icon icon--s round icon__x" title="Close"></span>').appendTo('body').on('click', function(){
      $(this).remove();
      return false;
    });
  };
  var closeButtonOff = function() {
    $('.overlay-close').fadeOut(300, function() {
      $(this).remove();
    });
  };

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
  $('.js-open-modal').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    $('.modal').fadeIn();
    overlayOn();
    cc_slides.jumpTo($this.index());
  });

  $('.js-close').on('click', function(e) {
    e.preventDefault();
    $('.modal').fadeOut();
    overlayOff();
  });

})();
