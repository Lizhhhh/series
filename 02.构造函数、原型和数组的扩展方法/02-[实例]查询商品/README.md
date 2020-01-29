<font color=red>查询商品案例</font>
1. 把数据渲染到网页中 (map)
2. 根据价格显示数据 (filter)
3. 根据商品名称显示数据


## js方法积累
### 1. 获取tbody
`document.querySelector('tbody')`

### 2. 创建并设置tr
```js
var tr = document.createElement('tr');
tr.innerHTML = `<td>1</td>`
```

### 3. 给tbody添加tr
`
tbody.appendChild(tr)
`


### 4. 监听按钮的点击事件
- 假设 button 的 class 为 `search-price`
```js
var search_price = document.querySelector('search-price');
search_price.addEventListener('click', function (){
  console.log('点击');
})
```

### 5. 获取input内的值
- 假设 input 的 class 为 `start`
```js
var start = document.querySelector('.start');
console.log(start.filter)
```


### forEach和some的区别
