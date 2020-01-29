module.exports = (err, req, res, next) => {
  const result = JSON.parse(err)
  let params = []
  for (let attr in result) {
    if (attr != 'path') {
      params.push(attr + '=' + result[attr])
    }
  }
  res.redirect(`${result.path}?${params.join('&')}`)
}
