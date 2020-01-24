# 3. ES5中的新增方法

## 3.3 字符串方法
trim()方法会从一个字符串的两端删除空白字符
`
str.trim()
`

trim()方法并不影响原字符串本身,它返回的是一个新的字符串


## 3.4 对象方法
1. Object.keys()用于获取自身所有的属性
`
Object.keys(obj)
`
- 效果类似 for...in
- 返回一个由属性名组成的数组


2. Object.defineProperty()定义对象中新属性或修改原有属性
`
Object.defineProperty(obj, prop, descriptor)
`
- obj: 必需。目标对象
- prop: 必需。需定义或修改的属性的名字
- descriptor: 必需。目标属性所拥有的特性

Object.defineProperty() 第三个参数descriptor说明: 以对象形式{} 书写
- value: 设置属性的值,默认为: undefined
- writable: 值是否可以重写. true| false, 默认为false
- enumerable: 目标属性是否可以被枚举. true | false 默认为false，简单的说能否被for...in循环所遍历
- configurable: 目标属性是否可以被删除 或是 可以再次修改特性 true | false 默认为false
