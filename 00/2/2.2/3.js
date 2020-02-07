// 正常写法
var calculateBonus = function(performanceLevel, salary) {
  if( performanceLevel === 'S' ) {
      return salary * 4;
  }
  if( performanceLevel === 'A' ) {
      return salary * 3;
  }
  if( performanceLevel === 'B' ) {
      return salary * 2;
  }
}

// 使用策略模式
var strategies = {
  "S": function (salary) {
      return salary * 4;
  },
  "A": function (salary) {
      return salary * 3;
  },
  "B": function (salary) {
      return salary * 2;
  }
}
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
}