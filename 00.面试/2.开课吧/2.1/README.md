# 1. 算法的基础



## 1.1 算法的速度

- 给一个数组arr和数字sum,如何在一个数组中找到数字a,b,使得 a+b == sum

```js
// 1. 暴力破解
// 两层遍历时间复杂度 O(n^2)
const arr = [13, 1, 2, 5, 3, 8, 11]
const sum = 18

function findSum(arr, sum) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; arr.length; j++) {
      if (i !== j && arr[i] + arr[j] == sum) {
        console.log(i, j, arr[i], arr[j])
      }
    }
  }
}
findSum(arr, sum)
```

```js
// 2.使用map
/*
1. 先新建一个Map结构
2. 遍历arr数组,每次从中取出一个数字.
3. 先判断以该数为键是否在Map结构中存在,若存在则返回该数的索引和Map结构中的索引
4. 否则将该数与sum的差存储进Map结构
*/
function findSum(arr, sum) {
  let map = new Map()
  arr.forEach((v, i) => {
    if (map.has(v)) {
      console.log(map.get(v), i, arr[map.get(v)], v)
    } else {
      map.set(sum - v, i)
    }
  })
}
findSum(arr, sum)
```

- 以上第二个算法就比第一个快

## 1.2 算法的存储结构

### 1.2.1 数组

内存中的存储有点像数组

- 数组的优缺点
  - 有序: 按索引查找是 O(1)的复杂度 (常量级)
  - 新增: 复杂度O(n)
  - 删除: 复杂度O(n)
- 数组中的排序

```js
// 数组的排序
arr = [3, 44, 13, 1, 8, 9, 7, 1, 2]

// 1. 冒泡排序
/*
算法思路:
1. 从最左边开始,如果左边大于右边则交换左右的位置
2. 时间复杂度 O(n^2)
*/
function bubbleSort(arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let i = 0; i < arr.length - j - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = tmp
      }
    }
  }
  console.log(arr)
}

bubbleSort(arr)

```

```js
// 2. 快速排序
/*
算法思路:
1. 先选择一个标志位,比标志位大的放右边,比标志位小的放左边
2. 时间复杂度: O(n * lg(n))
3. 缺点: 空间占用比较大
*/
function quickSort(arr) {
  if (arr.length < 1) {
    return arr
  }
  let flag = arr[0]
  let left = []
  let right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > flag) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  // 递归
  return quickSort(left).concat(flag, quickSort(right))
}

console.log(quickSort(arr))
```

```js
// 3. 快速排序(优化)
/*
思想: 优化空间,采用原地快排.
1. 初始选择最左边当标志位,从第二个数开始遍历,当遇到第一个比标志位大的停下,然后从最右边向左边遍历
2. 遇到比标志位小的停下,然后交换这2个的位置,重复执行...
*/
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let flag = arr[0]
  let i = 1
  let j = arr.length - 1

  while (i < j) {
    while (arr[j] > flag && i < j) {
      j--
    }
    while (arr[i] < flag && i < j) {
      i++
    }
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  let tmp = arr[0]
  arr[0] = arr[i]
  arr[i] = tmp

  return quickSort(arr.slice(0, i)).concat(flag, quickSort(arr.slice(i + 1)))
}

console.log(quickSort(arr))
```

### 1.2.2 链表

- 搜索复杂度: 从表头顺着往下面搜索,因此复杂度是 O(n)
- 删除复杂度: 只需改变给定的节点的指向,因此复杂度是 O(1)

- 新增复杂度:  同上

```js
// 链表节点
class Node {
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

// 链表
class LinkedList {
    constructor(){
        this.head = null;
        this.length = 0;
    }
    
    // 追加元素
    append(element) {
        const node = new Node(element);
        let current = null;
        if(this.head === null){
            // 头部位空,添加头部
            this.head = node;
        } else {
            current = this.head;
            // 找到链表尾
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++;
    }
    
    // 任意位置插入元素
    insert(position, element) {
        if(position >=0 && position <= this.length) {
            const node = new Node(element);
            let current = this.head;
            let previous = null;
            let index = 0;
            if(position == 0){
                this.head = node;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true
        }
        return false
    }
    
    // 移除指定位置元素
    removeAt(position){
        
        // 检查越界
        if(position > -1 && position < this.length){
            let current = this.head;
            let previous = null;
            let index = 0;
            if(position == 0){
                this.head = current.next
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.length;
        }
        return null
    }
    
    
    // 寻找元素下标
    findIndex(element){
        let current = this.head;
        let index = -1;
        while(current){
            if(current.element === element){
                return index +1; 
            }else{
                current = current.next;
                index++;
            }
        }
        return -1;
    }
    
    // 删除指定元素
    remove(element) {
        const index = this.findIndex(element);
        return this.removeAt(index)
    }
    
    isEmpty(){
        return !this.length
    }
    
    size(){
        return this.length
    }
    
    // 转为字符串
    toString(){
        let current = this.head;
        let string = '';
        while(current){
            string += `${current.element}`;
            current = current.next
        }
        return string
    }
}
```

### 1.2.3 集合(Set)

```js
class Set {
    constructor() {
        this.items = {}
    }
    
    // 是否含有给定元素
    // 思想: 通过hasOwnProperty方法判断对象中是否有这个属性
    has(value) {
        return this.items.hasOwnProperty(value);
    }
    
    // 向集合中添加元素
    // 使用 has方法判断,集合中是否存在该元素.如果没用加入.否则返回 false 
    add(value) {
        if(!this.has(value)){
            this.items[value] = value
            return true
        }
        return false;
    }
    
    // 从集合中删除元素
    // 使用 has 方法判断集合中是否含有该元素,如果有,使用 delete方法删除.否则返回false
    remove(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        }
        return false
    }
    
    // 当使用 set.size时触发,返回集合的长度
    // Object.keys会返回对象中的属性,是一个数组类型
    get size(){
        return Object.keys(this.items).length;
	}
    
    // 返回集合中的所有值
    get valuse() {
        return Object.keys(this.items)
    }
}
```

### 1.2.4 哈希表(hashTable)

```js
/*
优点: 插入、删除、查找 时间复杂度 o(1)
缺点: 占用空间. 计算出的值容易发生碰撞
*/

class HashTable {
  constructor() {
    this.table = []
  }

  // 散列函数
  static loseloseHashCode(key) {
    let hash = 0
    for (let codePoint of key) {
      hash += codePoint.charCodeAt()
    }
    return hash % 37
  }

  // 修改和增加元素
  put(key, value) {
    const position = HashTable.loseloseHashCode(key)
    console.log(`${position} - ${key}`)
    this.table[position] = value
  }

  // 获取元素
  get(key) {
    return this.table[HashTable.loseloseHashCode(key)]
  }

  // 删除元素
  remove(key) {
    this.table(HashTable.loseloseHashCode(key)) = undefined
  }
}
```

## 1.3 二分搜索

- 传入的数组是有序的.
- 找到中间的元素 key ,若 key 小于给定的元素item, 则在左边采用二分法继续搜索
- 若 key > item, 在右边采用二分
- 否则返回中间元素的下标.

```js
function binarySearch(arr, item) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (arr[mid] < item && mid + 1 < arr.length) {
      low = mid + 1
      continue
    }
    if (arr[mid] > item && mid - 1 > 0) {
      high = mid - 1
      continue
    }
    console.log(mid)
    return mid
  }
}

binarySearch([1, 2, 3, 5, 7, 10, 11, 13, 15, 18, 20, 23], 15)
```

## 1.4 递归

### 1.4.1 计算菲波拉契数列

- 栗子: 计算菲波拉契数列 [1,1,2,3,5,8,13..]

```js
function fib(n) {
  if (n === 1 || n === 2) return 1
  return fib(n - 1) + fib(n - 2)
}
```

- 以上算fib(40)时, 大概600ms. 原因是,其中出现了大量重复的计算.

### 1.4.2 带缓存的菲波拉契数列

- 改进办法是,每算出一个结果,将其保存在map结构中.

```js
function fib(n) {
    let map = new Map();
    function f(map, n){
        if(n ==1 || n==2) return 1;
        if(map.has(n)) return map.get(n)
        let v = f(map, n-1) + f(map, n-2);
        map.set(n, v);
        return map.get(n);
    }
    return f(map, n);
}
```

## 1.5 动态规划

### 1.5.1 解决斐波那契数列

- 解决斐波那契数列

- 递归式是自顶向下
- 动态规划是自底向上

```js
function fib(n) {
    let arr= [0,1,1];
    for(let i =3; i<=n; i++){
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[n];
}
```

### 1.5.2 背包问题

- 《啊哈!算法》

- 《算法图解》
- 《算法》(第4版)

