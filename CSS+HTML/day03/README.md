# 盒子模型(css重点)

css学习三大重点: css盒子模型、 浮动、 定位

- 目标:
  - 能说出盒子模型由哪四部分组成: 内容、边框、内外边距
  - 能说出内边距的作用,设置不同数值分别代表的意思: 控制内部块级元素和宽框的距离
  - 能说出块级盒子居中对齐需要的2个条件
  - 能说出外边距合并的解决办法
- 应用:
  - 能利用边框复合写法给元素添加边框
  - 能计算盒子的实际大小
  - 能利用盒子模型布局模块案例

## 1. 看透网页布局的本质

- 看透网页布局的本质:
  - 首先利用CSS设置好盒子的大小,然后摆放盒子的位置
  - 最后把网页元素(文字、图片等)放入盒子里面

## 2. 盒子模型(Box Model)

- 所谓盒子模型:
  - 就是把HTML页面中的布局元素看作是一个矩形的盒子,也就是一个盛装内容的容器.

## 3. 盒子边框 (border)

### 3.1 边框重叠

- 两个单元格之间的边框会出现重叠,从而使边框变粗

```css
table{
    border-collapse: collapse;
}
```

+ collapse 单词是合并的意思
+ 以上属性表示相邻的边框合并在一起

```css
table{
    border-collapse: collapse;
}
```

## 4. 内边距 (padding)

- 内容与边框的距离
- 会改变盒子的大小

```csss
div{
	width: 200px;
	height: 200px;
	border: 1px solid red;
	padding: 10px 20px;
}
```

- 此时的盒子高度是220px,宽度是220px
- padding的值按顺时针安利

### 4.1 要求盒子的左边内边距是5像素

```css
padding-left: 5px;
```

### 4.2 要求简写的形式写出一个盒子上下是25像素,左右是15像素

```css
padding: 25px 15px;
```

### 4.3 简写的形式写出一个盒子上内边距是12像素下内边距是0左内边距是25右内边距是10

```css
paddding: 12px 10px 0 25px
```

### 4.4 字数不一样的导航栏制作解决方案

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      .nav {
        width: 100%;
        height: 41px;
        border-top: 3px solid #ff8500;
        border-bottom: 1px solid #ebeef0;
        background-color: #fcfcfc;
      }
      .nav a {
        text-decoration: none;
        color: black;
        display: inline-block;
        padding: 0 15px;
        height: 41px;
        line-height: 41px;
        font-size: 16px;
      }
      .nav a:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    </style>
  </head>
  <body>
    <div class="nav">
      <a href="#">一</a>
      <a href="#">两字</a>
      <a href="#">三个字</a>
      <a href="#">我是四字</a>
      <a href="#">我有五个字</a>
      <a href="#">我只有六个字</a>
    </div>
  </body>
</html>
```

- 盒子的实际大小 = 内容宽度 + 内边距 + 边框

### 4.5 padding值不撑开盒子

- 如果盒子没有指定宽度或者高度,那么padding值不会撑开宽度或高度

```html
<style>
    div{
        width: 100px;
        height: 100px;
        background-color: pink;
    }
    div p{
        height: 30px;
        background-color: purple;
        padding: 15px;
    }
</style>
<body>
    <div>
        <p>
           我不会撑开p盒子的宽高 
        </p>
    </div>
</body>
```

## 5. 外边距 (margin)

- 盒子与盒子之间的距离

### 5.1 块级盒子水平居中对齐

- 一般用于最外层的盒子,让页面的大部分信息始终在屏幕中心.

```html
<style>
    div{
        width: 600px;
        height: 600px;
        margin: 0 auto;
        background-color:pink;
    }
</style>
<body>
	<div></div>    
</body>
```

### 5.2 常见的行内块

- img
- input
- 单元格

### 5.3 行内元素和块级元素的居中对齐

- `text-align`:可以让行内元素,行内块元素水平对齐
- `margin: 0 auto`:可以让块级盒子水平居中

```html
<style>
    div{
        width: 600px;
        height: 300px;
        background-color: pink;
        margin: 0 auto;
        text-align: center;
    }
</style>
<body>
    <div>
        稳住<strong>我们能赢</strong><input type="text">
    </div>
</body>
```

### 5.4 插入图片和背景图的位置移动

- `插入图片`: 通常用于产品展示,移动位置靠盒模型(padding margin)
- `背景图片` : 一般是小图标背景或超大背景图, 移动位置只能靠 `background-position`

```css
img {
    width: 200px;
    height: 210px;
    margin: 5px;
}
div {
    width: 400px;
    height: 400px;
    background: url(...) no-repeat;
    /* x方向移动30像素 y方向移动50像素 */
    background-position: 30px 50px;
}
```

### 5.5 外边距的合并

- 1) 垂直外边距合并(左右并不会出现)

```css
.top{
    margin-bottom: 100px;
}
.bottom{
    margin-top: 50px;
}
<div class="top">
<div class="bottom">
```

此时,上面的盒子和下面的盒子距离为: 50px, 即上下外边距会取较大值

- 2) 两个嵌套的块级盒子模型

```css
<div class="container">
	<p class="inner"></p>
</div>
```

如果给父元添加上内边距会是整个容器的高度变大

如果使用子元素的上外边距.会使父元素和子元素全部向下移动对应的距离

正确做法如下:

```css
.container{
    width: 500px;
    height: 500px;
    background-color: marron;
    border-top: 1px solid transparent;
}
.inner {
    width: 50px;
    height: 50px;
    background-color: skyblue;
    margin-top: 50px;
}
```



补充: 盒子阴影的参数(CSS3)

```css
box-shadow: x y 阴影虚实 阴影尺寸 阴影颜色 内/外阴影
```



