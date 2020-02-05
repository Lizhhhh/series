# 1. $.ajax()

## 1.1 $.ajax()方法概述

- 作用: 发送Ajax请求

```js
$.ajax({
    type: 'get',
    url: 'http://www.example.com',
    data: { name: 'zhangsan', age: '20'},
    contentType: 'application/x-www-form-urlencoded',
    beforeSend: function() {
        return false
    },
    success: function (response) {},
    error: function (xhr) {}
})
```

```js
{
	data: 'name=zhangsan&age=20'		// contentType: 'application/x-www-form-urlencoded'
}
```

```js
{
    data: JSON.stringify({ name: 'zhangsan', age: 20 })	// contentType: 'application/json'
}
```

- 栗子: 使用$.ajax发送第一个请求

```js
$('#btn').on('click', function() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/base',
    success: function(response) {
      console.log(response)
    },
    error: function(xhr) {
      console.log(xhr)
    }
  })
})
```

## 1.2 serialize方法

作用: 将表单中的数据自动拼接成字符串类型的参数

```js
var params = $('#form').serialize();
```

- 栗子,使用serialize方法将form表单中的数据转换成对象格式

```js
$('#form').on('submit', function(){
    var params = $('#form').serialize();	// 返回值是一个数组对象
    var obj = {};
    $.each(params, function(index, value){
        obj[value.name] = value.value;
    })
    console.log(obj);
})
```

## 1.3 发送jsonp请求

```js
$.ajax({
    url: "http://www.example.com",
    // 指定当前发送jsonp请求
    dataType: 'jsonp',
    // 修改callback参数名称
    jsonp: 'cb',
    // 指定函数名称
    jsonCallback: 'fnName',
    success: function(response) {}
})
```

- `jsonp`:默认值是 `'callback'`
- `jsonCallback`: 默认执行 success里面的回调函数
- 服务器: `express`

```js
app.get('/jsonp', (req, res)=>{
    res.jsonp({
        name: 'lisi',
        age: 18
    })
})
```

# 2. $.get()、$.post()

作用: `$.get()`方法用于发送get请求 , $.post()方法用于发送post请求

```js
$.get('http://www.example.com', {name: 'zhangsan', age: 18}, function(response){})
$.post('http://www.example.com', {name: 'lisi', age: 19}, function(respons) {})
```

1. 