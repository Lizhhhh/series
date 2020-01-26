# 1. 数据库概述及环境搭建
## 1.1 为什么要使用数据库
- 动态网站中的数据都是存储在数据库中的
- 数据库可以用来持久存储客户端通过表单手机的用户信息
- 数据库软件本身可以对数据进行高效的管理


## 1.2 什么是数据库
数据库即数据的仓库,可以将数据进行有序的分门别类的存储.它是独立于语言之外的软件,可以通过API去操作它.

常见的数据库软件有: mysql, mongoDB, oracle

## 1.3 MongoDB数据库下载安装
数据库下载地址: https://www.mongodb.com/download-center/community

## 1.4 MongoDB可视化软件
mongoDB图像界面下载地址: https://www.mongodb.com/download-center/compass
MongoDB可视化操作软件,是使用图形界面操作数据库的一种方式

## 1.5 数据库相关概念
在一个数据库软件中可以包含多个数据仓库,在每个仓库中可以包含多个数据集合,每个数据集合中可以包含多条文档(具体的数据)

- database: 数据库,mongoDB数据库软件中可以建立多个数据库
- collection: 集合,一组数据的集合,可以理解为JavaScript中的数组
- document: 文档,一条具体的数据,可以理解为JavaScript中的对象
- field: 字段,文档中的属性名称,可以理解为JavaScript中的对象属性

## 1.6 Mongoose第三方包
- 使用Node.js操作MongoDB数据库需要依赖Node.js第三方包mongoose
- 使用`npm install mongoose`命令下载

## 1.7 启动MongoDB
- `cmd` -> `以管理员的方式打开`
- `net start mongodb`

## 1.8 连接数据库
使用mongoose提供的connect方法即可连接数据库
```js
mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log('数据库连接成功'))
  .catch(err=> console.log("数据库连接失败", err))
```

## 1.9 创建数据库
在MongoDB中不需要显示创建数据库,如果正在使用的数据库不存在,MongoDB会自动创建


# 3. MongoDB增删该查操作
## 3.1 创建集合
创建集合分为两步,一是`对集合设置规则`,二是`创建集合`,创建mongoose.Schema构造函数的示例即可创建集合
```js
// 设置集合规则
const courseSchema = new mongoose.Schema({
  name: string,
  author: string,
  isPublished: Boolean
});
// 创建集合并应用规则
const Course = mongoose.model('Course', courseSchema);    // course
```

## 3.2 创建文档
创建文档实际上就是`像集合中插入数据`
分为两步:
1. 创建集合实例
2. 调用实例对象下的save方法将数据保存到数据库中
```js
// 创建集合实例
const course = new Course({
  name: "Node.js course",
  author: "Marron",
  tags: ["node", "backend"],
  isPublished: true
});
// 将数据保存到数据库中
course.save();
```
```js
// 第二种方式向集合中插入文档
Course.create({name:"JavaScript基础", author:"Marron", isPublish:true}, (err, doc)=>{
  // 错误对象
  console.log(err)
  // 当前插入的文档
  console.log(doc)
})
```
```js
// 第二种方式的Promise方式
Course.create({name: "JavaScript基础", author:"Marron", isPublished: true})
.then(doc => console.log(doc))
.catch(err=> console.log(err))
```

## 3.3 mongoDB数据库导入数据
`mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件`: `mongodb -d playground -c users --file ./user.json`

## 3.4 查询文档
```js
// 根据条件查找文档(条件为空时查找所有文档)
Course.find().then(result => console.log(result))
```
```js
// 返回文档集合
[{
    "_id": "$oid": "5e2d03fdb9adcb23e4d32d0d",
    "tags": ["node", "backend"],
    "name": "Node.js course",
    "author": "Marron",
},{
    "_id": "5e2d0634b7d3e83ba86bf7ee",
    "tags": ["javascript"],
    "name": "JavaScript基础",
    "author": "Marron",
}]
```

- 使用`findOne`方法进行查找,查找的结果只有一条
```js
// 根据条件查找文档
Course.findOne({name: "node.js基础"}).then(res=>console.log(res))
```

- 查询年龄大于20小于50的用户
```js
User.find({age: {$gt: 20, $lt:50}}).then(res=>console.log(res))
```

- 查询爱好中包含敲代码的所有用户
```js
User.find({hobbies: {$in: ['敲代码']}}).then(res=>console.log(res))
```

- 选择要查询的字段
```js
User.find().select('name email').then(res=>console.log(res))
```

- 对查询出来的字段进行排序
```js
User.find().sort('age').then(res=>console.log(res))
```

- 使用`skip`跳过多少条数据, 使用`limit`限制查询数量 (分页时候用到)
```js
User.find().skip(2).limit(2).then(res=>console.log(res))
```

## 3.5 删除文档
- 删除单个
```js
// 删除单个
Course.findOneAndDelete({}).then(result => console.log(result))
```

- 删除多个
```js
// 删除多个
User.deleteMany({}).then(res=>console.log(res))
```

## 3.6 更新文档
- 更新单个
```js
// 更新单个
User.updateOne({查询条件}, {要修改的值}).then(res => console.log(res))
```

- 更新多个
```js
User.updateMany({查询条件}, {要修改的值}).then(res => console.log(res))
```

## 3.7 mongoose验证
在创建集合规则时,可以设置当前字段的验证规则,验证失败就输入插入失败.
```js
// 创建集合规则
// 创建集合规则
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '文章标题是必填项'],
    minlength: [2, '标题名称最小为2'],
    maxlength: [5, '标题名称最大为5'],
    trim: true
  },
  age: {
    type: Number,
    // 数值的最小范围
    min: [18, '年龄值最小为18'],
    max: 100
  },
  publishData: {
    type: Date,
    // 默认值
    default: Date
  },
  category: {
    type: String,
    // 枚举, 只能传递数组中所枚举出来的值
    enum: ['html', 'css', 'javascript', 'node.js']
  },
  author: {
    type: String,
    // 自定义验证规则
    validate: {
      validator: v => {
        // 返回布尔值
        // true 验证成功
        // false 验证失败
        // v:插入数据库时传递的值
        return v && v.length > 4
      },
      // 自定义错误信息
      message: "传入的值不符合规则"
    }
  }
})
```
- 自定义`enum`的错误提示消息
```js
const postSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: {
      values: ['html','css','javascript','node.js'],
      message: "category属性只能是 html, css, javascript 或 node.js"
    }
  }
})
```

- 捕获错误信息
```js
const Post = mongoose.model('Post', postSchema)

Post.create({ title: 'aa', age: 60, category: 'java', author: 'bd' })
  .then(res => console.log(res))
  .catch(error => {
    // 获取错误信息对象
    const err = error.errors
    // 循环错误信息对象
    for (let attr in err) {
      // 将错误信息打印到控制台中
      console.log(err[attr]['message'])
    }
  })
```


## 3.7 集合关联
通常`不同集合的数据之间是有关系的`,例如文章信息和用户信息存储在不同集合中,但文章是某个用户发表的,要查询文章的所有信息包括发表用户,就需要用到集合关联.
- 使用id对集合进行关联
- 使用populate方法进行关联集合查询
```js
// 用户集合
const User = mongoose.model('User', new mongoose.Schema({ name: {type: String}}));
// 文章集合
const Post = mongoose.model('Post', new mongoose.Schema({
  title: {type: String},
  // 使用id将文章集合和作者集合进行关联
  author: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "User"
  }
}))
// 联合查询
Post.find()
.populate('author')
.then((err, res)=>{
  console.log(res);
})
```

## 3.8 案例: 用户信息增删改查(见文件夹)
