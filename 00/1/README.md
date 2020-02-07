
# 1. ES6常见语法及实例

## 1.1 let

1. 不存在变量提升
2. 同一个作用域下不能重复定义同一个名称
3. 有严格的作用域



## 1.2 const

声明一个只读的常量:

- 一旦声明常量的值就不能改变
- 声明时必须赋值

- const代表,执行内存的地址不能改变.

```js
const obj = {};
obj.name = 'amy';	// ok,内存的引用地址没用改变
const arr = [];
arr.push(1);	// ok,指向内存的地址没有改变.
```

## 1.3 箭头函数

1. this的指向明确了,指向此法作用域



## 1.4 数据结构 Set 、 Map

1. `set`: 类似数组,但是其中的成员是唯一的

```js
const s = new Set()
s.add(1).add(2).add(3).add(2);   //  Set {1,2,3}
```

- 去重处理:

```js
const arr2 = [2,3,4,4,5,7,3,3,6,3,7,7,8,3];
const arr = [...new Set(arr2)];
console.log(arr);		// [2, 3, 4, 5, 7, 6, 8]
```



2. `map`: 类似于对象,但是它的键可以是对象

```js
const m = new Map();
m.set('name', 'marron').set('age', 18)
```

- 使用`for...of...`拿到map中的键值对

```js
for(let [key, value] of m){
    console.log(key, value);
}
```



# 2. 瀑布流

- 出现问题: 设计给的图片不是同一个尺寸大小,因此不能规则的放入到给定的DOM结构中.此时,需要使用瀑布流技术来解决这个问题
- 解决的思路:  让图片等宽、不等高

- 核心: 用到了定位

```css
img {
    position: absolute;
    left: 最小的索引 * 图片的宽度;
    top: 最小的图片的高度;
}
```

- 算法如下:

1. 首先获取浏览器的宽度w,用w除以200向下取整记为列数: col
2. 利用数组,保存每一列当前的高度
3. 如果是第一行,则将图片的高度保存在数组arr中
4. 如果不是第一行,取出arr中的最小值和索引,计算出绝对定位的位置.并给图片设置绝对定位

## 2.1 用到的API

### 2.1.1 获取当前屏幕的宽度

- 由于每个图片盒子还有对应的高度,因此获取的时候,还要获取内边距.
- 在jquery中,可以通过`$().outerWidth`实现

```js
var screenWidth = $(window).outerWidth()
```

##### 2.1.2 给DOM元素加css样式

```js
$().css({
    position: 'absolute',
    left: currLeft,
    top: currTop
})
```

### 2.1.3 总体代码

- 总体代码如下:

```js
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
```



















[学习地址](https://www.bilibili.com/video/av79716929?from=search&seid=12191391131428238353)