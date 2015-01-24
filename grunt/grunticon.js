module.exports = {
  myIcons: {
    files: [{
      expand: true,
      cwd: '<%= paths.src.svg %>/compressed',
      src: ['*.svg', '*.png'],
      dest: '<%= paths.src.svg %>/output'
    }],
    options: {
      cssprefix: '.icon-'
    }
  }
};