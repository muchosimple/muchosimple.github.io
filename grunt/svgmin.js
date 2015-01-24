module.exports = {
  options: {
    plugins: [
      { removeViewBox: false },
      { removeUselessStrokeAndFill: false }
    ]
  },
  dist: {
    expand: true,
    cwd: '<%= paths.src.svg %>/raw',
    src: ['*.svg'],
    dest: '<%= paths.src.svg %>/compressed',
  }
};