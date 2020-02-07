# 前端设计模式

> 设计模式(Design Pattern)是一套被反复使用、多数人知晓的、经过分类的、代码设计经验的总结



# 1. 订阅/发布 模式 (观察者)

- 常用的模块解耦模式
- 简单实现如下

```js
class Event {
  constructor() {
    // 存储事件
    this.callbacks = {}
  }
  // 取消订阅事件
  $off(name) {
    this.callbacks[name] = null
  }
  // 触发事件
  $emit(name, arg) {
    let cbs = this.callbacks[name]
    if (cbs) {
      // 将事件拿出来.
      cbs.forEach(v => {
        v.call(this, arg)
      })
    }
  }
  // 订阅事件
  $on(name, fn) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }
    this.callbacks[name].push(fn)
  }
}
let event = new Event()
event.$on('event1', function(arg) {
  console.log('事件1', arg)
})
event.$on('event1', function(arg) {
  console.log('又一个事件1', arg)
})
event.$on('event2', function(arg) {
  console.log('事件2', arg)
})
event.$emit('event1', { name: 'marron' })
event.$emit('event2', { name: 'marron' })
```

# 2. 单例模式

> 单例模式的定义: 保证一个类仅有一个实例,并提供一个访问它的全局访问点.实现的方法为先判断实例是否存在,如果存在则直接返回,否则创建后返回.

适用场景: 一个单一对象。比如弹窗,无论点击多少次,弹窗只被创建一次。

- 思路如下: 先设置一个全局变量,如果该变量为空,就创建实例,并赋给该全局变量,否则返回该全局变量

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .modal {
        position: fixed;
        width: 300px;
        height: 300px;
        border: 1px solid black;
        top: 20%;
        left: 50%;
        margin-left: -150px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <button id="modal-btn">点我出弹窗</button>
    <script>
      var div = null
      function createModal() {
        if (!div) {
          div = document.createElement('div')
          div.innerHTML = 'Modal'
          div.className = 'modal'
          div.style.display = 'none'
          document.body.appendChild(div)
        }
        return div
      }
      var btn = document.getElementById('modal-btn')
      btn.onclick = function() {
        // 新建一个弹窗实例, 使用单例模式管理, 一直只有一个
        let modalLayer = createModal()
        modalLayer.style.display = 'block'
      }
    </script>
  </body>
</html>
```

# 3. 策略模式

> 定义一系列算法,把他们一个个封装起来,并且使他们可以相互替换. 目的将算法的使用、算法的实现分离开



- 奖金计算
- 绩效为S的人年终奖有4倍工资,绩效为A的人年终奖有3倍工资,绩效为B的人年终奖是2倍工资

```js
// 正常写法
var calculateBonus = function(performanceLevel, salary) {
    if( performanceLevel === 'S' ) {
        return salary * 4;
    }
    if( performanceLevel === 'A' ) {
        return salary * 3;
    }
    if( performanceLevel === 'B' ) {
        return salary * 2;
    }
}

// 使用策略模式
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    } 
}
var calculateBonus = function (level, salary) {
    return strategies[level](salary);
}
```

# 4. 代理模式





 