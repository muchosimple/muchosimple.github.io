module.exports = {
  options: {
    livereload: true,
  },
  sass: {
    files: ["<%= paths.src.css %>/**/*.scss"],
    tasks: ["sass:dist"],
    options: {
      "spawn": true,
    }
  },
  scripts: {
    files: ["<%= paths.dest.js %>/**/*.js"],
    tasks: ["uglify"],
    options: {
      "spawn": true,
    }
  },
  html: {
    files: [
      '<%= paths.dest.patterns %>/**/*.mustache',
      '<%= paths.dest.patterns %>/**/*.json',
      '<%= paths.dest.data %>/**/*.json',
      '<%= paths.dest.css %>/**/*.css',
      '<%= paths.dest.js %>/**/*.js',
      'source/api/*.json'
    ],
    tasks: ['shell:patternlab'],
    options: {
      "spawn": false,
    }
  }
};