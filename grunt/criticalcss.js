module.exports = {
  criticalcss: {
    custom_options: {
      options: {
        url: "http://oreilly.dev/pl/",
        width: 1200,
        height: 900,
        outputfile: "<%= paths.dest.css %>/critical.css",
        filename: "<%= paths.dest.css %>/all.css"
      }
    }
  }
};