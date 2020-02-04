function jsonp(options) {
  var script = document.createElement('script')
  var fn =
    'fn' +
    Math.random()
      .toString()
      .replace('.', '')
  window[fn] = options.success
  var params = []
  params.push('callback=' + fn)
  for (let attr in options.data) {
    params.push(attr + '=' + options.data[attr])
  }
  params = params.join('&')
  script.src = options.url + '?' + params
  document.body.appendChild(script)
  script.onload = function() {
    document.body.removeChild(script)
    delete window[fn]
  }
}
