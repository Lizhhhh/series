function ajax(options) {
  var defaults = {
    type: 'get',
    url: '',
    async: true,
    data: {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function() {},
    error: function() {}
  }
  // 使用用户传递的参数替换默认值的参数
  Object.assign(defaults, options)
  var xhr = new XMLHttpRequest()
  var params = []
  if (defaults.data) {
    for (var attr in defaults.data) {
      params.push(attr + '=' + defaults.data[attr])
    }
  }
  params = params.join('&')
  if (defaults.type == 'get' && params.length > 0) {
    defaults.url = defaults.url + '?' + params
  }
  xhr.open(defaults.type, defaults.url)

  if (defaults.type == 'post') {
    var contentType = defaults.header['Content-Type']
    xhr.setRequestHeader('Content-Type', defaults.header['Content-Type'])

    if (contentType == 'application/json') {
      xhr.send(JSON.stringify(defaults.data))
    } else {
      xhr.send(params)
    }
  } else {
    xhr.send()
  }

  xhr.onload = function() {
    var contentType = xhr.getResponseHeader('Content-Type')
    var responseData = xhr.responseText
    if (contentType.includes('application/json')) {
      responseData = JSON.parse(responseData)
    }
    if (xhr.status == 200) {
      defaults.success(responseData, xhr)
    } else {
      defaults.error(responseData, xhr)
    }
  }
}
