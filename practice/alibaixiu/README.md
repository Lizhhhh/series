# 1. 阿里百秀 - 样式部分

- 技术选型

方案: 我们采用响应式页面开发方案

技术: bootstrap框架

设计图: 本设计采用 1280px 设计尺寸

## 1.1 页面布局分析

```html
<div class="container">
    <!-- 占2份 -->
    <div class="nav"></div>
    <div class="container">
        <!-- 占7份 -->
        <div class="article"></div>
        <!-- 占3份 -->
        <div class="aside"></div>
    </div>
</div>
```

## 1.2 屏幕划分

1.中屏幕和大屏幕布局是一致的,因此我们列定义为`col-md-`就可以了,md是大于等于970以上的

2.在小屏幕下,布局发生变化,因此我们需要为小屏幕根据需求改变布局

3.超小屏幕,在改变布局

4.先布局md以上的pc端的布局,然后根据实际需求修改小屏幕和超小屏幕的特殊样式布局



## 1.3 样式前期准备

1.创建文件夹结构

2.创建html骨架

3.引入相关样式文件

4.书写内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- [if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss/maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
    <!-- 引入bootstrap样式文件 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- 引入我们自己的首页样式文件 -->
    <link rel="stylesheet" href="css/index.css">
    <title>Document</title>
  </head>
  <body>
    123
  </body>
</html>
```



### 1.3.1  .container

- 媒体查询,若屏幕宽度大于1280px,将container宽度设置为1280px

```css
@media screen and (min-width: 1280px){
    .container {
        width: 1280px;
    }
}
```

### 1.3.2 图片的样式

- 让图片的样式响应式变化

```css
.logo img {
    width: 100%;
}
```

### 1.3.3 侧边导航栏颜色

- 侧边导航栏背景色设为`#eee
- 侧边导航栏的底色设为`#ccc

```css
.nav {
    background-color: #eee;
    border-bottom: 1px solid #ccc;
}
```

### 1.3.4 字体图标和文字

```html
<style>
    li {
        display: block;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        font-size: 16px;
    }
    li a::before{
        vertical-align: middle;
        padding-right: 5px;
    }
</style>
<li><a href="#" class="glyphicon glyphicon-camera">生活</a></li>
```

### 1.3.5 选择第一个子元素

- 在ul中有3个li,第一个子元素的宽度是50%,高度是266px,其余的宽度是25%,高度是128px.多个li会显示在同一行

```html
<style>
.ul li{
	float: left;
	width: 25%;
	height: 128px;
}
.ul li:nth-child(1) {
	width: 50%;
	height: 266px;
}
</style>
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### 1.3.6 栅格布局中边距的处理

- 在栅格布局中,如果左右两个元素需要有一定距离,不能通过外边距撑开,需要给每个子元素指定有内边距.每个子元素的宽度设为百分之百.

```html
<div class="news">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
<style>
    .news ul li{
        width: 100%;
        padding-right: 10px;
    }
</style>
```

### 1.3.7 栅格布局中小屏幕以上不改变样式

- 想要小屏幕,中屏幕,大屏幕,超大屏幕下都保持左9右3的结构

```html
<div class="row">
	<div class="col-sm-9"></div>
	<div class="col-sm-3"></div>
</div>
```

### 1.3.8 logo的显示

- 让logo在除超小屏幕屏幕尺寸下都居中显示
- 在超小屏幕下隐藏,用一个文字代替

```html
<div class="logo">
    <a href="#">
        <img src="images/logo.png" alt="" class="hidden-xs">
        <span class="visible-xs">阿里百秀</span>
    </a>
</div>
<style>
    .logo img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
/* 1.进入超小屏幕下 logo里面的图片隐藏 */
/* 2.事先准备好一个盒子,在logo里面,它平时是隐藏起来的,只有在超小屏幕下显示 */
    .logo span{
        display: block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size:18px;
    }
</style>
```

### 1.3.9 响应式导航栏

- 当进入小屏幕(宽度小于992px)和超小屏幕(宽度小于768px)时,导航栏浮动.且宽度变为百分之20
- 当进入超小屏幕(宽度小于768px)时,字体大小变为14px

```html
<div class="nav">
    <ul>
        <li><a href="#">NodeJS</a></li>
        <li><a href="#">JavaScript</a></li>
        <li><a href="#">Bootstrap</a></li>
        <li><a href="#">css</a></li>
        <li><a href="#">html</a></li>
    </ul>
</div>
<style>
    @media screen and (max-width: 991px){
        .nav ul li {
            float: left;
            width: 20%;
        }
    }
    @media screen and (max-width: 767px){
        .nav ul li a {
            font-size: 14px;
        }
    }
</style>
```

