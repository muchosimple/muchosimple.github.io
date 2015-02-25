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


// window.onload = function() {
//   // Sticky right rail ad
//   $('.ad-sticky').stick_in_parent({
//     parent: '.main',
//     sticky_class: 'sticky-is-active',
//     offset_top: 40,
//     spacer: false
//   });
// };
