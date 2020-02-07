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

let hash = new HashTable()
hash.put('kaikeba', 10)
hash.put('javascript', 6)


