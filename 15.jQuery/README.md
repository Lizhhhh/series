- 能够说出什么是jQuery
- 能够说出jQuery的优点
- 能够简单使用jQuery
- 能够说出DOM对象和jQuery的区别

# 1. jQuery概述

JavaScript库: 一个JS文件,里面封装了许多原生的js方法.

# 2. jQuery的基本使用

## 2.1 jQuery的下载

[官网](https://jquery.com)

[各个版本的下载](https://code.jquery.com)

## 2.3 jQuery的入口函数

```js
$(function(){
    ... // 此处是页面DOM元素加载完成的入口
    // 相当于原生js种的 DOMContentLoaded
})
```

- 栗子: 页面加载完毕后因此div框

```js
$(function(){
    $('div').hide();
})
```

## 2.4 jQuery的顶级对象$

1. 相当于在浏览器环境下JS的顶级对象 window

## 2.5 jQuery对象和DOM对象

1. 用原生JS获取来的对象就是DOM对象
2. jQuery方法获取的元素就是jQuery对象
3. jQuery对象本质是: 利用$对DOM对象包装后产生的对象(伪数组形式存储)



因为原生js比jQuery更大,原生的一些属性和方法jQuery没用给我们封装,要想使用这些属性和方法需要把jQuery对象转换成DOM对象才能使用.

1. DOM对象转换为jQuery对象

```html
<div src="mov.mp4"></div>
<script>
    var myVideo = document.querySelector('video');
    // 只需要在DOM对象外包裹一层$()
    $(myVideo)
</script>
```

2. jQuery对象转换成DOM对象

```html
<div src="mov.mp4"></div>
<script>
    // 第一种
    $('div')[index]
    // 第二种
    $('div').get(index)
</script>
```

# 3. jQuery常用的API

## 3.1 jQuery选择器

```js
$('选择器') // 里面选择器直接写CSS选择器即可,但是要加引号
```

## 3.2 jQuery层级选择器

| 名称       | 用法        | 描述                                                       |
| ---------- | ----------- | ---------------------------------------------------------- |
| 子代选择器 | $('ul >li') | 使用>号,获得亲儿子层级的元素;注意,并不会获取孙子层级的元素 |
| 后代选择器 | $("ul li")  | 使用空格,代表后代选择器,获取ul下的所有li元素,包括孙子等    |

## 3.3 隐式迭代(重要)

- 遍历内部DOM元素(伪数组形式存储)的过程就叫做隐式迭代

- 简单理解：对于获取的伪数组,jQuery会进行相应的循环操作

[知识铺垫]

jQuery设置样式

```js
$('div').css('属性','值')
```

- 栗子

```html
<body>
  <div>惊喜不, 意外不</div>
  <div>惊喜不, 意外不</div>
  <div>惊喜不, 意外不</div>
  <div>惊喜不, 意外不</div>
  <ul>
    <li>相同的操作</li>
    <li>相同的操作</li>
    <li>相同的操作</li>
  </ul>
  <script>
    // 1. 获取四个div元素
    var divs = $('div');
    console.log(divs)
    // 2. 给4个div设置背景颜色为粉色
    $('div').css('background','pink')
    // 3. 隐式迭代就是把匹配的所有元素内部进行遍历循环,给每一个元素添加css这个方法
  </script>
</body>
```

## 3.4 jQuery筛选选择器

| 语法   | 用法          | 描述                     |
| ------ | ------------- | ------------------------ |
| :first | $('li:first') | 获取第一个li元素         |
| :last  | $('li:last')  | 获取最后一个li元素       |
| :eq    | $('li:eq(0)') | 获取索引号为0的元素      |
| :odd   | $('li:odd')   | 获取索引号为奇数的li元素 |
| :even  | ("li:even")   | 获取索引号为偶数的li元素 |

- 栗子

```html
<body>
  <ul>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
  </ul>
  <ol>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
    <li>多个里面筛选几个</li>
  </ol>
  <script>
    $(function(){
      // 改变ul中第一个Li中的颜色
      $('ul li:first').css('color','red')
      // 将ol中第三个li的字体放大
      $('ol li:eq(2)').css('font-size','30px')
      // 将ol下面所有索引号是奇数行的li的背景色值为#ccc
      $('ol li:odd').css('background','#ccc')
    })
  </script>
</body>
```

## 3.5 筛选方法

| 语法               | 用法                           | 说明                                             |
| ------------------ | ------------------------------ | ------------------------------------------------ |
| parent()           | $('li').parent()               | 查找父级元素                                     |
| children(selector) | $('ul').children('li')         | 相当于$('ul>li'),最近一级(亲儿子)                |
| find(selector)     | $('ul').find('li')             | 相当于$('ul li'),后代选择器                      |
| siblings(selector) | $('.first').siblings('li')     | 查找不包含自己的兄弟元素                         |
| nextAll([expr])    | $('.first').nextAll()          | 查找当前元素之后的所有同辈元素                   |
| prevAll([expr])    | $('.last').prevAll()           | 查找当前元素之前的所有同辈元素                   |
| hasClass(class)    | $('div').hasClass('protected') | 检查当前元素是否含有某个特定的类,如果有,返回true |
| eq(index)          | $('li').eq(2)                  | 相当于$('li:eq(2)')                              |

- <font color=red>重点记住: parent() children() find() siblings() eq()</font>
- 栗子: (父级选择器)

```html
<body>
<div class="grapFatehr">
  <div class="father">
    <div class="son">儿子</div>
  </div>
</div>
<div class="nav">
  <p>我是屁</p>
  <div>
    <p>我是p</p>
  </div>
</div>
<script>
  $(function() {
    // 1. 父 parent(), 返回的是最近一级的元素
    $('.son').parent()
    // 2. 子
    // 只选亲儿子,  类似子代选择器  ul>li
    $('.nav').children('p').css('color','red')
    // 连孙子一起选, 类似后代选择器 ul li
    $('.nav').find('p').css('font-size','30px')
    // 3. 兄弟元素
    $('.nav').children('p').siblings().css('background','pink')
  })
</script>
</body>
```

### 3.5.1 鼠标移入显示、移出隐藏

```html
<body>
<ul class="nav">
  <li>
    <a href="#">微博</a>
    <ul>
      <li>
        <a href="#">私信</a>
      </li>
      <li>
        <a href="#">评论</a>
      </li>
      <li>
        <a href="#">@我</a>
      </li>
    </ul>
  </li>
</ul>

<script>
  $(function() {
    // 鼠标经过
    $('ul>li').mouseover(function(){
      $(this).children('ul').show()
    })
    // 鼠标离开
    $("ul>li").mouseout(function(){
      $(this).children('ul').hide()
    })
  })
</script>
</body>
```

## 3.6 jQuery中的排他思想

- 想要实现下面一个操作:
- 对一个按钮组中的按钮进行点击,被点击的按钮字体变为红色,其余的不变色

思路:

1. 先获取按钮组,利用jQuery中的隐式迭代给所有按钮添加点击事件
2. `$(this)`代表当前被点击的元素.给它设置css样式(`$(this).css()`)
3. 未被点击的按钮,是当前的兄弟元素.可以使用`$(this).siblings('button')`代替

```html
<body>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<script>
  $(function() {
    // 1. 隐式迭代：会给所有的按钮添加点击事件
    $('button').click(function(){
      // 2. 当前的元素变化背景颜色
      $(this).css('color','red');
      // 3. 其余的兄弟去掉背景颜色
      $(this).siblings('button').css('color','')
    })
  })
</script>
</body>
```

# 4. jQuery样式操作

## 4.1 操作css方法

1. 参数只写属性名,则返回属性值(字符串)

```js
$(this).css('color')
```

2. 参数是 属性名、属性值(逗号分隔，则表示设置属性

```js
$(this).css('color','red')
```

3. 参数可以是对象的形式

```js
$(this).css({
    width: 400px,
    height: 400px
})
```

## 4.2 设置类样式方法

1. 添加类

```js
$('button:first').click(function() {
     $('div').addClass('block')
})
```

2. 删除类

```js
$('button:first').click(function() {
 	 $('div').removeClass('block')
})
```

3. 切换类

```js
$('button:first').click(function() {
  	$('div').toggleClass('block')
})
```

### 4.2.1 栗子:  tab栏切换

思路:

1. 当点击小li时,当前被点击的li添加类 `current`, 其余的移除current类
2. 得到当前的索引号,显示相同索引号的内容

```html
<style>
  .clearfix:before,
  .clearfix:after {
    content: '';
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .header ul {
    width: 700px;
    height: 50px;
    padding-top: 15px;
    background-color: #ccc;
  }
  .box {
    width: 700px;
    height: 300px;
    margin: 30px auto;
  }
  li {
    float: left;
    height: 40px;
    line-height: 40px;
    list-style: none;
    padding: 0 15px;
  }
  li:hover {
    cursor: pointer;
  }
  .current {
    background-color: red;
    color: white;
  }
  .header {
    padding-top: 15px;
  }
  .content {
    padding-top: 20px;
    padding-left: 45px;
  }
  .content div {
    display: none;
  }
</style>
</head>
<body>
<div class="box">
  <div class="header clearfix">
    <ul>
      <li class="current">商品介绍</li>
      <li>规格与包装</li>
      <li>售后保障</li>
      <li>商品评价(50000)</li>
      <li>手机社区</li>
    </ul>
  </div>
  <div class="content">
    <div display="block">商品介绍模块</div>
    <div>规格与包装模块</div>
    <div>售后保障模块</div>
    <div>商品评价(50000)模块</div>
    <div>手机社区模块</div>
  </div>
</div>
<script>
  $(function() {
    $('.content div:first').show()
    $('.box li').click(function() {
      var currentIndex = $(this).index();

      $(this).addClass('current')
      $(this)
        .siblings('li')
        .removeClass('current')

        $('.content div').hide()
        $('.content div').eq(currentIndex).show()
    })
  })
</script>
</body>
```

# 5. jQuery效果

- 显示隐藏: `show()、hide()、toggle()`
- 滑动: `slideDown()、slideUp()、slideToggle()`
- 淡入淡出:`fadeIn()、fadeOut()、fadeToggle()、fadeTo()`
- 自定义: `animate()`

## 5.1 显示隐藏效果

1. 显示隐藏效果

```js
show([speed, [esing], [fn]])
hide([speed], [esing], [fn])
```

2. 显示参数

   (1) 参数都可以省略,无动画直接显示

   (2) speed: 三种预定速度之一的字符('slow','normal','fast')或表示动画时长的毫秒数(如: 1000)

   (3) easing: (Optional)用来指定切换效果, 默认值是 'swing'(快-慢-快),可选参数'linear'(匀速)

   (4) fn: 回调函数,在动画完成时执行的函数 



- [栗子] - 鼠标经过和离开的复合写法

```js
$(function(){
    $('ul>li').hover(function(){
        $(this).children('ul').slideToggle();
    },function(){
        $(this).children('ul').slideToggle();
    })
})
```



