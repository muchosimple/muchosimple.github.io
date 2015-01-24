module.exports = {
  app: {
    files: {
      '<%= paths.src.js %>/global.js': [
      	'<%= paths.src.bower %>/jquery/dist/jquery.js',
        '<%= paths.dest.js %>/plugins.js',
        '<%= paths.dest.js %>/main.js',
      ]
    }
  }
};