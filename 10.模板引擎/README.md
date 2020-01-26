# 1.模板引擎的基础概念
## 1.1 模板引擎
模板引擎是第三方模板.
让开发者以更加友好的方式拼接字符串,是项目更加清晰、更加易于维护.

- 未使用模板引擎的写法
```js
var arr = [{ name:"张三", age: 20}];
var str = "<ul>";
for(var i=0; i< arr.length;i++) {
  str += `
    <li>
      <pan>${arr[i].name}</pan>
      <pan>${arr[i].age}</pan>
    </li>
  `
}
str += "</ul>";
```
- 使用模板引擎的写法
```html
<ul>
  {{each arr}}
    <li> {{$value.name}} </li>
    <li> {{$value.age}} </li>
  {{/each}}
</ul>
```