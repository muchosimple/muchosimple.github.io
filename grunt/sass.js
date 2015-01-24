module.exports = {
  options: {
    outputStyle: 'compressed',
    imagePath: "../../<%= paths.dest.images %>",
    sourceMap: false,
    includePaths: require('node-bourbon').includePaths,
    includePaths: require('node-neat').includePaths
  },
  dist: {
    files: {
      "<%= paths.dest.css %>/style.css": "<%= paths.src.css %>/style.scss"
    }
  }
};
