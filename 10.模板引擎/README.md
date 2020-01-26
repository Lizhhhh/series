# 1.模板引擎的基础概念

## 1.1 模板引擎

模板引擎是第三方模板.
让开发者以更加友好的方式拼接字符串,是项目更加清晰、更加易于维护.

- 未使用模板引擎的写法

```js
var arr = [{ name: '张三', age: 20 }]
var str = '<ul>'
for (var i = 0; i < arr.length; i++) {
  str += `
    <li>
      <pan>${arr[i].name}</pan>
      <pan>${arr[i].age}</pan>
    </li>
  `
}
str += '</ul>'
```

- 使用模板引擎的写法

```html
<ul>
  {{each arr}}
  <li>{{$value.name}}</li>
  <li>{{$value.age}}</li>
  {{/each}}
</ul>
```

## 1.2 art-template 模板引擎

1. 下载: `npm install art-template`:
2. 引入: `const template = require('art-template')`
3. 使用: 告诉模板引擎拼接的数据和模板在哪`const html = template('模板路径', 数据)`

```js
// 导入模板引擎
const template = require('art-template')
// 将特定模板与特定数据进行拼接
const html = template('./views/index.art', {
  data: {
    name: '张三',
    age: 20
  }
})
```

```html
<div>
  <span>{{data.name}}</span>
  <span>{{data.age}}</span>
</div>
```

# 2. 模板引擎语法
## 2.1模板语法
- art-template同时支持两种模板语法: `标准语法` 和 `原始语法`
- 标准模板可以让模板更容易读写(`{{ 数据 }}`), 原始语法具有强大的逻辑处理能力(`<%=数据 %>`).

## 2.2 输出
将某项数据输出在模板中, 标准语法和原始语法如下:
```html
<!-- 标准语法 -->
<h2>{{value}}</h2>
<h2>{{ a ? b : c}}</h2>
<h2>{{ a + b }}</h2>

<!-- 原始语法 -->
<h2><%= value %></h2>
<h2><%= a ? b : c %></h2>
<h2><%= a + b %></h2>
```

## 2.3 原文输出
如果数据中携带HTML标签,默认模板引擎不会解析标签,会将其转义后输出.
- 标准语法: {{@数据}}
- 原始语法: {%- 数据 %}

## 2.4 条件判断
在模板中可以根据条件来决定显示哪块HTML代码.

```html
<!-- 标准语法 -->
    {{if age > 18}}
      年龄大于18
    {{else if age < 15}}
      年龄小于15
    {{else}}
      年龄不符合要求
    {{/if}}
```

```html
<!-- 原始语法 -->
  <%
  if(age > 18)
    {%> 年龄大于18 <%}
  else if (age < 15)
    {%> 年龄小于15 <%}
  else
    {%> 年龄不符合要求 <%}
  %>
```

## 2.5 循环
```html
<!-- 标准语法 -->
{{each target}}
  {{$index}} {{$value}}
{{/each}}
<!-- 原始语法 -->
<%
  for(var i = 0; i< target.length; i++){%>
    <%= i %> <%= target[i] %>
  <%}
%>
```

## 2.6 子模板
使用子模板可以将网站公共区块(头部、尾部)抽离到单独的文件中.
```html
<!-- 标准语法 -->
{{include '模板'}}
<!-- 原始语法 -->
<%include('模板')%>
```
- 栗子
```html
<!--标准语法-->
{{include './header.art'}}
<!--原始语法-->
<% include('./header.art') %>
```

## 2.7 模板继承
使用模板继承可以将网站HTML骨架抽离到单独的文件中,其他页面模板可以继承骨架文件.

## 2.8 模板继承示例
- 模板骨架: `layout.art`
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HTML骨架模板</title>
    {{block "head"}} {{/block}}
  </head>
  <body>
    {{block "content"}}{{/block}}
  </body>
</html>
```
- 首页模板: `inedx.art`
```html
{{extend './layout.art'}}
{{block "head"}}<link rel="stylesheet" href="custom.css">{{/block}}
{{block "content"}}<p>This is just an awesome page.</p> {{/block}}
```

## 2.9 模板配置
### 2.9.1 在模板引擎中使用函数
- 向模板中导入变量 `template.defaults.imports.变量名 = 变量值`;
- 比如们需要在模板引擎中使用一个处理时间格式的函数(`dateformat`),我们按如下步骤进行操作:
1. `npm install dateformat`
2. 进行如下配置
```js
const template = require('art-template');
const path = require('path');
const dateformat = require('dateformat');

template.defaults.imports.dateformat = dateformat;
const views = path.join(__dirname,'views','06.art');
const html = template(views, {
  time: new Date();
})
console.log(html);
```
3. 在`06.art`中使用如下:
```html
{{extend './common/layout.art'}}
{{block "content"}}
  {{ dateformat(time,"yyyy-mm-dd HH:MM:ss") }}
{{/block}}
```
### 2.9.2 设置模板引擎的根目录
```js
const template = require('art-template');
const path = require('path');

template.defaults.root = path.join(__dirname,"views");
const html = template('01.art',{
  name: "张三"
});
console.log(html);
```
### 2.9.3 设置模板的默认后缀名
```js
template.defaults.extname = '.art';
```
