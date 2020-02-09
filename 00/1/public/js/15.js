data = [
  {
    name: 'a',
    child: [
      { name: 'a1' },
      { name: 'a2', child: [{ name: 'a21' }] },
      {
        name: 'a3',
        child: [
          { name: 'a31' },
          { name: 'a32' },
          { name: 'a33' },
          {
            name: 'a34',
            child: [
              { name: 'a341' },
              { name: 'a342' },
              { name: 'a343' },
              { name: 'a344' }
            ]
          }
        ]
      }
    ]
  },
  { name: 'b' },
  { name: 'c' },
  { name: 'd', child: [{ name: 'd1' },{name:'d2'}] }
]
$(function() {
  function g(data) {
    var str = '<ul>'
    for (var i = 0; i < data.length; i++) {
      if (data[i].child) {
        str += `<li><span>-</span>${data[i].name}`
        str += g(data[i].child)
        str += '</li>'
      } else {
        str += `<li><span>-</span>${data[i].name}</li>`
      }
    }
    str += '</ul>'
    return str
  }
  // 渲染dom结构
  $('.tree').html(g(data))

  // 渲染完成后,给li下面的span添加点击事件
  $('.tree li span').click(function() {
    if ($(this).siblings('ul').length > 0) {
      console.log('可以展开')
      if ($(this).html() == '-') {
        $(this).html('+')
        $(this)
          .siblings('ul')
          .hide()
      } else {
        $(this).html('-')
        $(this)
          .siblings('ul')
          .show()
      }
    } else {
      console.log('不能展开')
    }
  })
})
