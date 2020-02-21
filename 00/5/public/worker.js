onmessage = function(e) {
  if (e.data.length > 1) {
    postMessage(e.data[1] - e.data[0])
  }
}
