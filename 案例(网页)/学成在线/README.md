## 1.1 CSS属性书写顺序(重点)

建议遵循以下顺序:

1.布局定位属性: display / position / float / clear / visibility / overflow  (建议display第一个写, 毕竟关系到模式)

2.自身属性: width / height / margin / padding / border / background

3.文本属性: color / font / text-decoration / text-align / verticle-align / white-space / break-word

4.其他属性(CSS3)： content / cursor / border-radius / box-shadow/ text-shadow / background:linear-gradient...

```css
.dbs {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0 ,0 ,0, .5);
    webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
}
```

- 以上只是建议,能满足尽量满足.

## 1.2  常见初始化

```css
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: #f3f5f7;
}

button {
  border: none;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}
```

## 1.3 颜色组合

项目用到了蓝白灰的组合

- `蓝色`:颜色代码\#00a4ff,主要负责突出颜色.或者状态变化显示的颜色

- `白色`: 颜色代码#fff,主要是把网页划分成主要的模块
- `灰色`: 颜色代码#f3f5f7,整个网页的背景色



## 1.4 可视区域

这个页面的可视区是1200像素,每个可视区都要居中对齐,定义如下:

```css
.w {
    width: 1200px;
    margin: auto;
}
```

## 1.5 常见阴影样式

```css
box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
```

## 1.6 常见可以被继承的属性

- `font-xxx`
- `line-xxx`
- `text-xxx`
- `color`



## 1.7 清除浮动

- 当使用了浮动的盒子,没有规定高度时,需要清除浮动
- 因为浮动的盒子脱离了标准流,如果后面有一个标准流的盒子,会被当前的浮动盒子所遮盖

### 1.7.1 使用浮动时,让盒子高度为0的情况

在使用浮动的时候,有时候不确定盒子中到底会有多少个元素.因此无法设置高度(或者是设置高度不很麻烦), 这个时候就不会设置盒子的高度.

### 1.7.2 常见的清除浮动的代码

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}
```

## 1.8 关于padding

- 有一个宽高已经声明好的盒子

```
div {
	width: 500px;
	height: 500px;
	background: pink;
}
```

- 当设置padding时,就会撑开盒子已有的宽高

```css
div {
    width: 500px;
    height: 500px;
    padding: 50px;
    background: pink;
}
```

- 此时,占据文档里的宽高是 600px / 600 px
- 需要写出如下:

```css
div {
    width: 400px;
    height: 400px;
    padding: 50px;
    background: pink;
}

```

## 1.9 字体大小与语义

- `16px`: 一般用作页面中的导航、链接(比较突出)
- `14px`: 一般用作页面中的内容(字数最多的)
- `12px`: 用于补充说明内容

