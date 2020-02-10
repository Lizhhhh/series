# 1. 浏览器渲染原理

请说出: 从用户在浏览器地址输入网址,到看整个页面,中间都发生了哪些事情?

- HTTP请求阶段
- HTTP响应阶段
- 浏览器渲染阶段



## 1.1 可能用到的知识

### 1.1.1 进程 Process、线程 Thread、 栈内存 Stack

- 进程: 就是开的每一个程序: QQ、网易云音乐、Typora、VSCode...
- 线程: 一个做的好的事情.

- 栈内存: 用来提供一个环境,供我们执行代码



### 1.1.2  多任务

> 现代操作系统比如Mac OS X, UNIX, Linux, Windows等,都是支持"多任务"的操作系统
>
> 单核CPU执行多任务: 操作系统轮流让各个任务交替执行,任务1执行0.01秒,切换到任务二,任务2执行0.01秒,再切换到任务3...由于CPU的执行速度很快,我们感觉就像所有任务都再同时执行一样
>
> 多核CPU执行多任务: 真正的并行执行多任务只能在多核CPU上实现,但是,由于任务数量远远多于CPU的核心数量,所以,操作系统也会自动把很多任务轮流调度到每个核心上执行
>
> 有些进程不止同时干一件事情,就需要同时运行多个"子任务",我们把进程内的这些子任务称为线程.
>
> 多个线程可以同时执行,多线程的执行方式和多进程一样的,也是由操作系统在多个线程之间快速切换,让每个线程都短暂地交替运行,看起来就像同时执行一样



## 1.2 浏览器渲染原理

- 在服务器上有程序员提前写的项目代码.
- 它存放在服务器的磁盘中,标识符为 `project`
- request请求阶段:客户端在浏览器输入网址的时候,浏览器会向服务器端发送请求(DNS解析、TCP的三次握手与四次挥手、HTTPS与HTTP的区别)
- response响应阶段 :浏览器有个专门的端口监听这个请求,验证之后,将项目的源代码返回给客户端浏览器(HTTP状态码、304缓存、HTTP报文)
- 客户端浏览器,拿到response响应的代码后,专门在内存中开辟一个栈内存,给代码的执行提供环境;同时分配一个主线程,去:

1. 一行一行的解析核执行代码.

```html
<!-- 栈内存 -->
进栈 --->  <!DOCTYPE html>  ---> 执行完出栈
```

2. 遇到 link、script、img、a、video等 标签,主线程,开新建一个子线程去执行相应的内容.自己继续向下执行,同时会将该异步任务放到任务队列中

```html
<!-- 栈内存 -->
进栈 ---> <link href="1.css"> ---> 会将异步任务放到 TaskQueue中
<!-- 任务队列 -->
任务1: 请求1.css
```

3. 根据上述规则: 同步代码依次执行,遇到请求资源等异步代码,会创建一个新的子线程,去执行,并将任务放到任务队列(TaskQueue)中,然后继续向下执行...
4. 因此主线程相当于是一直在执行同步任务.速度会很快
5. 很快,主线程执行到页面底部

```html
<!-- 栈内存 -->
进栈 ---> </html> ---> 出栈
<!-- 任务队列 -->
任务1: 请求1.css(未完成)
任务2: 请求2.css(未完成)
...
任务n: 请求...(未完成)
```

6. 当执行完毕 `</html>`仅仅只在内存中生产了一个DOM树(注意,此时的异步任务还没有执行)

7. 事件循环(Event Loop):生成DOM树之后,主线程会在任务队列(Task Queue)中去寻找已经准备好的异步任务,将其取出到栈内存中执行

```html
<!-- 任务队列 -->
任务1: 请求1.css(未完成)
任务2: 请求2.css(已完成) ---> 取出 ---> [栈内存]
...
任务n: 请求n(已完成)

<!-- 栈内存 -->
进栈 ---> 任务2 --->
```

8. 步骤7的机制就是 事件循环(Event Loop), 当任务队列中的最后一条css获取成功且在栈内存中执行完毕之后,会在内存中生产一个`CSSOM`.然后浏览器会把 CSSOM树核DOM树结合在一起生成一棵 `Render Tree`

9. 得到渲染树(Render Tree)之后,进行<font color=red>回流</font>(Layout): 根据生成的渲染树,计算它们在设备视口(view port)内的确切位置和大小,这个计算阶段称为回流,之后就是重绘(Painting)
10. Painting(<font color=red>重绘</font>): 根据渲染树以及回流得到的几何信息,得到节点的绝对像素.
11. 绝对像素被分到一个图层中,每个图层又会被加载到GPU中形成渲染纹理,最终渲染到页面上

[注] : 图层在GPU中, transform是不会触发repaint的,使用transform的图层都会由 独立的合成进程进行处理



### 1.2.1 性能优化

- (减少HTTP请求次数和数据量大小) : 资源合并与压缩 (图片、样式、JS文件)
- 图片懒加载: 第一次回流重绘的时候,不加载图片,当第一次渲染完成之后,当屏幕滚动到哪里,就加载对应位置的数据

### 1.2.2 优化点

- request阶段: DNS解析、TCP的三次握手与四次挥手、HTTPS与HTTP的区别
- response阶段: HTTP状态码、304缓存、HTTP报文



#### 1.2.2.1 DNS预解析(Chrome浏览器完成)

当用户将鼠标停留在一个链接上,就预示着一个用户的偏好以及下一步的浏览行为.

- 这时,Chrome就可以提前进行DNS Lookup及TCP握手
- 当在地址栏触发高可能性选项时,同样会触发DNS lookup 和TCP预连接
- Chrom会研究,每个人每天可能访问的网址,并对网页上的子资源尝试预解析、预加载以提高用户体验







## 1.3 性能优化

- DOM的重绘和回流 Repaint & Reflow

- 重绘: 元素样式的改变 (但宽度、大小、位置等不变)

> 如 outline,visibility,color,background-color等

- 回流: 元素的大小或者位置发生了变化(当页面布局和集合信息发生变化的时候),触发了重新布局,导致渲染树,重新计算布局和渲染.

> 如添加或删除可见的DOM元素;元素的位置发生变化;元素的尺寸发生变化;内容发生变化(比如文本变化或图片被另一个不同尺寸的图片所代替);页面一开始渲染的时候(这个无法避免);因为回流是根据视口的大小来计算元素的位置和大小的,所以浏览器的窗口尺寸变化也会引发回流

<b>注意: 回流一定会触发重绘,而重绘不一定会回流</b>



- 进可能减少 回流和重绘: 因为回流会根据当前窗口的大小计算元素的位置,然后回触发重绘.根据渲染树和回流的几何位置信息,算出元素的绝对像素,进而通知GPU重新渲染.

- 避免DOM的回流: mvvm / mvc / virtual dom / dom diff

#### 1.3.1 分离读写操作 (现代的浏览器都有渲染队列的机制)

> ​	offsetTop、 offsetLeft 、 offsetWidth、 offsetHeight、 clientTop、 clientLeft、 clientWidth、clientHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、getComputedStyle、currentStyle

```html
<style>
    #box {
        width: 100px;
        height: 100px;
        background: red;
        border: 10px solid green;
    }
</style>
<body>
    <div id="box"></div>
    <script>
        let box = document.getElementById('box');
        box.style.width = '200px';
        box.style.height = '200px';
        box.style.margin = '10px';
    </script>
</body>
```

- 当代浏览器,遇到了上面连续对DOM操作的代码,会将其先存在一个队列里面,然后一起进行一次回流.
- 但如果遇到如下

```html
<script>
    let box = document.getElementById('box');
    box.style.width = '200px';
    console.log(box.clientWidth);
    box.style.height = '200px';
    box.style.margin = '10px';
</script>
```

- 以上代码会回流2次,因为在写操作中穿插了读操作,将读操作写在最下面可以使回流变成一次

```html
<script>
    let box = document.getElementById('box');
    box.style.width = '200px';
    box.style.height = '200px';
    box.style.margin = '10px';
    console.log(box.clientWidth);
</script>
```

#### 1.3.2样式集中改变

>display.cssText = 'width:20px; height:20px;'
>
>divclassName = "box"

- 不把样式分开写,统一写

- 使用`cssText`

```html
<script>
    let box = document.getElementById('box');
    box.style.cssText = 'width:200px;height:200px;margin:10px';
</script>
```

- 使用添加类

```html
<style>
    .box{
        width: 200px;
        height: 200px;
        margin: 10px;
    }
</style>
<script>
    let box = document.getElementById('box');
    box.className = 'box'
</script>
```

#### 1.3.3 缓存布局信息

- 看下面代码

```html
<script>
    box.style.width = box.clientWidth + 10 + 'px';
    box.style.height = box.clientHeight + 10 + 'px'
</script>
```

- 以上会触发2次回流,因为在遇到`clientWidth、clientHeight`时,浏览器都会清空渲染队列,实现一次回流

- 改进做法:

```html
<script>
    let width = box.clientWidth + 10 + 'px';
    let height = box.clientHeight + 10 + 'px';
    box.style.width = width;
    box.style.height = height;
</script>
```

#### 1.3.4 元素批量修改

- 例如我们经常动态的往ul中添加li属性, 你可能会写出如下代码

```html
<ul id="box"></ul>
<script>
    let box = document.getElementById('box');
    for(let i =0; i< 5; i++){
        let li = document.createElement('li');
        li.innerHTML = i;
        box.appendChild(li);
    }
</script>
```

- 以上会触发5次回流,可以将DOM操作,次数太少了看不出效果..我们尝试触发50000次回流,打开网页.你会发现浏览器卡顿了一下,然后渲染.

- 尝试使用字符串拼接的方式来减少回流次数

```html
<ul id="strBox"></ul>
<script>
    let strBox = document.getElement('strBox');
    let str = '';
    for(let i =0; i< 50000; i++){
        str += `<li>${i}</li>`;
    }
    strBox.innerHTML = str;
</script>
```

- 在创建50000个li的情况下, 使用第一种方式大概花费330ms,而第二种方式只需100ms

#### 1.3.5 硬件加速优化

-  CSS3硬件加速

[栗子] : 将盒子向右移动100像素

```html
<script>
    box.style.left = '100px';
</script>
```

使用上面技术,会使页面产生一次回流

但是使用`transform`则不会产生回流

```html
<script>
    box.style.transform = 'translateX(200)'
</script>
```

- 你可能会好奇,为什么使用CSS3的API,不会产生回流，[CSS3硬件加速的工作原理](https://www.w3cplus.com/css3/introduction-to-hardware-acceleration-css-animations.html)

- 不会引起回流重绘的属性: `transform \ opacity \ filters`
- 硬件加速可能存在的缺点: 过多使用会占用大量内存,性能消耗可能会比较严重、有时候会导致字体模糊等..

#### 1.3.6 牺牲平滑度换取速度

- 改变动画的最小平移单位,例如: 将原本需要1像素移动改为3像素..这样可以减少DOM的节流和重绘





# 1.4 小结
- 从用户在浏览器地址输入网址,到看整个页面,中间都发生了哪些事情?

1. 首先浏览器会根据输入的域名,通过域名服务器得ip地址,
2. 然后会检查本地中是否有请求的资源,并且判断请求资源是否是最新的,如果是则返回,否则去服务器端得到资源(如果有错误,希望指出)
3. 得到资源后,浏览器会在内存中开辟一个栈内存,同时分配一个主线程去从上到下解析文档结构,遇到 `link、img `等标签会将其放在任务队列中,继续向下执行
4. 执行到最底部,此时生成了一个 DOM 树,然后进入事件循环(Event Loop)
5. 事件循环: 浏览器从 任务队列(Task Queue)中取出已经准备好的的任务到栈内存中逐条执行
6. 结束后会生成一棵CSSOM树, 然后主线程会根据 DOM树和 CSSOM树生成一棵渲染树(Render Tree)
7. 之后会根据 视口大小(View Port)计算出节点的几何位置(称为节流)
8. 之后是重绘: 根据渲染树和 节流算出的几何位置得到节点的确切位置.
9. 完成重绘后,主线程会将每个每个绝对位置加载到GPU中,最终渲染成纹理,呈现在页面上.


[几个小扩展问题]
1. HTTP请求和HTTP响应
2. link和@import的区别
3. 事件循环机制下的"JS异步同步编程(尤其是宏任务和微任务)"







# 参考

[Chrome高性能的秘密：DNS预解析](https://www.zhoulujun.cn/html/webfront/browser/webkit/2015_1213_362.html)

[CSS3硬件加速的工作原理](https://www.w3cplus.com/css3/introduction-to-hardware-acceleration-css-animations.html)



