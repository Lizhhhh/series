function fib(n) {
  let map = new Map()
  function r(map, n) {
    if (n == 1 || n == 2) return 1
    if (map.has(n)) return map.get(n)
    let v = r(map, n - 1) + r(map, n - 2)
    map.set(n, v)
    return map.get(n)
  }
  return r(map, n)
}

console.time('fib')
console.log(fib(40))
console.timeEnd('fib')

// function fib1(n) {
//   let arr = []
//   return fibCache(arr, n)
// }

// function fibCache(arr, n) {
//   if (n == 1 || n == 2) return 1
//   if (arr[n]) return arr[n]
//   arr[n] = fibCache(arr, n - 1) + fibCache(arr, n - 2)
//   return arr[n]
// }
