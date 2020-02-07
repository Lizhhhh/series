$(function() {
  waterFall()
})
function waterFall() {
  // 获取盒子
  var box = $('.box')
  // 1. 求出对应得列数
  // 1.1 得到当前屏幕的宽度
  var screenWidth = $(window).outerWidth()
  // 1.2 获取每张图片的宽度
  var boxWidth = $('.box').outerWidth()
  // 1.3 获取当前的列数
  var col = Math.floor(screenWidth / boxWidth)
  // 2. 创建数组,记录当前列数的高度
  var arr = []
  for (var i = 0; i < col; i++) {
    arr.push(0)
  }
  // 3. 遍历盒子中的图片
  $.each(box, function(index, value) {
    // 得到每一张图片的高度
    var thisHeight = $(this).height()
    if (index < col) {
      // 如果是第一行将高度的存入数组中.
      arr[index] = thisHeight
    } else {
      // 如果不是第一行,找到数组中最小的高度和索引
      var currMinHeight = Math.min.apply(arr, arr)
      var currMinIndex = arr.indexOf(currMinHeight)
      // 算出距离 左侧/上侧 的距离
      var currLeft = currMinIndex * boxWidth
      var currTop = currMinHeight
      // 将当前的图片变为绝对定位,放在盒子中
      $(this).css({
        position: 'absolute',
        left: currLeft,
        top: currTop
      })
      arr[currMinIndex] = currMinHeight + thisHeight
    }
  })
}
