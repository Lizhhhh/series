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

## 1.2  常见初始化

```css

```

## 1.3 常见背景

```css

```



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

- 上面一个盒子没有给定高度,且盒子内部给定了浮动,因此并不占用文本流
- 影响下面盒子的布局



## 1.8 关于padding

## 1.9 字体大小与颜色

