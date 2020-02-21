// 剪绳子
/*

  f(2) =  1 * 1 = 1
  f(3) = 1 *2 > 1* 1*1

*/
function cut(n) {
  if (n < 2) return 0
  if (n == 2) return 1
  if (n == 3) return 2
  let arr = []
  arr[0] = 0 // 分得0时,长度为0
  arr[1] = 1 // 分得1时,作为乘数,可以贡献1
  arr[2] = 2
  arr[3] = 3
  let max = 0
  for (let i = 4; i <= n; i++) {
    max = 0
    for (let j = 1; j <= i / 2; j++) {
      let cur = arr[j] * arr[n - j]
      if (max < cur) {
        max = cur
      }
    }
    arr[i] = max
  }
  max = arr[n]
  arr = null
  return max
}
console.log(cut(5))
