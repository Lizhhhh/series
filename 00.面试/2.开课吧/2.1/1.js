const arr = [13, 1, 2, 5, 3, 8, 11]
const sum = 18

// // 1. 暴力破解
// // 两层遍历时间复杂度 O(n^2)
// function findSum(arr, sum) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; arr.length; j++) {
//       if (i !== j && arr[i] + arr[j] == sum) {
//         console.log(i, j, arr[i], arr[j])
//       }
//     }
//   }
// }
// findSum(arr, sum)

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