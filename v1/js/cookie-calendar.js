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

  // Get group key
  var $checkGroup = $this.parents('.check-group');
  var filterGroup = $checkGroup.attr('data-filter-group');

  // Set filter for group
  filters[filterGroup] = $this.find('input').val();

  // Combine filters
  var filterValue = concatValues(filters);

  $grid.isotope({ filter: filterValue });

  // Change checked attribute on inputs.
  $('.check-group').each(function(i, checkGroup) {
    var $checkGroup = $(checkGroup);
    $checkGroup.on('click', 'input', function() {
      $checkGroup.find(':checked').prop('checked', false);
      $(this).prop('checked', true).parents('.is-active').removeClass('is-active');
    });
  });

});



// Flatten object by concatting values
function concatValues(obj) {
  var value = '';
  for (var prop in obj) {
    value += obj[prop];
  }
  return value;
}

