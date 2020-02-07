function fib(n) {
  // 动态规划, 自底向上
  let dp = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

console.time('fib')
console.log(fib(145))
console.timeEnd('fib')
