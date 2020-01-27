// serializeArray获取用户输入的表单信息,将数组转换成对象形式
const serializeToJson = form => {
  // 获取到表单中用户输入的内容
  // [{name: 'email', value: '用户输入的内容'}]
  const arr = form.serializeArray()
  const o = {}
  arr.forEach(item => {
    o[item.name] = item.value
  })
  return o
}