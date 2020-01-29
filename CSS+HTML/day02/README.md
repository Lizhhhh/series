# 1. 行高(line-height)

目标

- 理解 - 能说出行高和高度三种关系 - 能简单理解为什么行高等于单行文字会垂直居
- 应用
  - 使用行高实现单行文字垂直居中
  - 能会测量行高

# 2. CSS 背景(background)

目标

- 理解

      - 背景的作用

  - css 背景图片和插入图片的区别

- 应用

  - 通过 css 背景属性,给页面元素添加背景样式

  - 能设置不同的背景图片位置

## 2.1 背景颜色(color)

- 语法:

```js
background-color: 颜色值; 默认的值是 transparent 透明的
```

## 2.2 背景图片(image)

- 语法:

```css
background-image: none | url (url);
```

| 参数 | 作用                           |
| ---- | ------------------------------ |
| none | 无背景图(默认的)               |
| url  | 使用绝对或相对地址指定背景图像 |

```css
background-image: url(images/demo.png);
```

- 小技巧: 我们提倡背景图片后面的地址,url 不要加引号

## 2.3 背景平铺(repeat)

- 默认平铺

```css
background-repeat: reapet; // 默认值
```

- 不平铺

```css
background-repeat； no-repeat;
```

- 水平平铺

```css
background-repeat: repeat-x;
```

- 竖直平铺

```css
background-repeat: repeat-y;
```

## 2.4 背景位置(position)重点

- 语法

```css
background-position: length | length
background-position: position || position
```

| 参数     | 值                                                |
| -------- | ------------------------------------------------- |
| length   | 百分数\| 由浮点数字和单位标识符组成的长度值       |
| position | top\| center \| bottom \| left \| center \| right |

### 2.4.1 栗子

- 让图片靠右上角

```css
.bg {
  width: 800px;
  height: 600px;
  background-color: pink;
  background-image: url(../lib/pics/1.jpg);
  background-repeat: no-repeat;
  background-position: right top;
}
```

- 让图片水平居中 垂直方向距离上侧 10px

```css
background-position: center 10px;
```

- 超大背景图片的位置
- 一般是水平居中,垂直靠上

```css
background-position: center top;
```

- 小图片左侧对齐盒子

```css
background-position: 5px center;
```

### 2.4.2 小结

1. `background-position`: 第一个参数是 x 方向,第二个参数是 y 方向
2. 可以使用精准词(px、%)和描述词(center、right、left)

## 2.5 背景附着

- 关键代码

```css
background-attachment: sroll(默认) || fixed
```

说明: 设置为fixed之后,背景图片将不会随着页面的滚动而滚动.

## 2.6 背景简写

- background: 属性的值的书写顺序推荐写成如下:

```css
background: transparent url(image.jpg) repeat-y scroll center top;
```

## 2.7 背景透明(CSS3)

- 通常是一个遮挡块,用来遮挡另一块
- 当鼠标移动到上面的时候,会增加其透明度.提高用户体验

```css
.alhpa{
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.3)
}
```

- 一般默认透明度

# 3. CSS三大特性

目标:

 - 理解
   	- 能说出css样式冲突采取的原则
   	- 能说出哪些常见的样式会有继承
- 应用
  - 能写出CSS优先级的算法
  - 能会计算常见选择器的叠加值

## 3.1 CSS层叠性

- 概念:
  -  所谓层叠性是指: 多种CSS样式的叠加。
  - 是浏览器处理冲突的一个能力,如果一个属性通过两个相同选择器设置在同一个元素上,那么这个时候一个属性就会将另一个属性层叠掉
- 原则:
  - 重复的就近继承
  - 不重复的就层叠

## 3.2 CSS继承性

- 子标签会继承父标签的

```css
div {
    color: red;
}
```

```html
<body>
   <div>
       <p>
           <!-- 会继承父元素的红色 -->
           栗子哈哈哈		
       </p>
    </div> 
</body>
```

- 利用继承可以降低CSS代码的复杂性.

## 3.3 CSS优先级(重点)

- 权重计算公式

| 选择器                    | 权值    |
| ------------------------- | :------ |
| 继承或者*                 | 0,0,0,0 |
| 元素标签(span、div、p...) | 0,0,0,1 |
| 类或伪类(.calss, a:hover) | 0,0,1,0 |
| id选择器( #id)            | 0,1,0,0 |
| style=""                  | 1,0,0,0 |
| !important                | 无穷大  |





