module.exports = {
  options: {
    width: 1000,
    type: 'screen'
  },
  all: {
    files: {
      '<%= paths.dest.css %>/legacy-styles.css': ['<%= paths.src.css %>/style.scss']
    }
  }
};