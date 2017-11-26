var jstransformer = require('jstransformer')
var identity = function(a) { return a }

module.exports = function sheetify_jstransform(filename, source, options, cb) {
  var use = [].concat(options.use)
  var current = source

  function runTransform() {
    try {
      var useSingle = use.shift()
      if (useSingle == null) {
        return cb(null, current)
      }
      useSingle = [].concat(useSingle)
      var transformer = jstransformer(useSingle[0])
      var matchesTransformer = transformer.inputFormats.some(function (format) {
        return RegExp('\.' + format + '$').test(filename)
      })
      if (!matchesTransformer) {
        runTransform()
        return
      }

      var opts = useSingle[1] || {}
      var optsCb = useSingle[2] || identity
      opts = optsCb(opts, filename)
      transformer.renderAsync(current, opts, {}, function(err, result) {
        if (err) {
          return cb(err)
        }
        current = result.body
        runTransform()
      })
    }
    catch (err) {
      cb(err)
    }
  }
  runTransform()
}
