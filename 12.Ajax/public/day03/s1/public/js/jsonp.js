function jsonp(options) {
  var script = document.createElement('script')
  var fn = options.success
  script.src = options.url + '?cb=fn'
  document.body.appendChild(script)
  script.onload = function() {
    document.body.removeChild(script)
  }
}
