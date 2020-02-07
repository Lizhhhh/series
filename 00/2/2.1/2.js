// 数组的排序
arr = [3, 44, 13, 1, 8, 9, 7, 1, 2]

// // 1. 冒泡排序
// /*
// 算法思路:
// 1. 从最左边开始,如果左边大于右边则交换左右的位置
// 2. 时间复杂度 O(n^2)
// */
// function bubbleSort(arr) {
//   for (let j = 0; j < arr.length - 1; j++) {
//     for (let i = 0; i < arr.length - j - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         let tmp = arr[i]
//         arr[i] = arr[i + 1]
//         arr[i + 1] = tmp
//       }
//     }
//   }
//   console.log(arr)
// }

// bubbleSort(arr)

// // 2. 快速排序
// /*
// 算法思路:
// 1. 先选择一个标志位,比标志位大的放右边,比标志位小的放左边
// 2. 时间复杂度: O(n * lg(n))
// 3. 缺点: 空间占用比较大
// */
// function quickSort(arr) {
//   if (arr.length < 1) {
//     return arr
//   }
//   let flag = arr[0]
//   let left = []
//   let right = []
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > flag) {
//       right.push(arr[i])
//     } else {
//       left.push(arr[i])
//     }
//   }
//   // 递归
//   return quickSort(left).concat(flag, quickSort(right))
// }

// console.log(quickSort(arr))

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

