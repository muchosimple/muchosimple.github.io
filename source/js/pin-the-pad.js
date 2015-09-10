/*------------------------------------*\
    $PIN THE PERFECT PAD JS
\*------------------------------------*/

/**
 * Pin the Perfect Pad is a sales initiative that will use the Pinterest API.
 * This js file contains javascript specific to this promotion and should only
 * be included on the Pin the Perfect Pad template.
 */

// Layout Isotope after each image loads
var $grid = $('.grid').imagesLoaded(function() {
  $grid.isotope({
    itemSelector: '.grid-item',
    stamp: '.stamp',
    masonry: {
      columnWidth: '.grid-item',
    }
  });
});

// Store filter for each group
var filters = {};

// Filter items on check item click
$('.nav-check-list').on('click', '.cl-item', function() {
  var $this = $(this);

  // Set filter for group
  filterValue = $this.find('input').val();

  $grid.isotope({ filter: filterValue });

  // Change checked attribute on inputs
  var $checkGroup = $('.search-filters');
  $checkGroup.on('click', 'input', function() {
    $checkGroup.find(':checked').prop('checked', false);
    $(this).prop('checked', true);
  });
});

