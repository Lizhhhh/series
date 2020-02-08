var data = [
  {
    name: 'IT互联网',
    child: [
      {
        name: '编辑语言',
        child: [
          { name: 'java' },
          { name: 'c#/.net' },
          { name: 'python' },
          { name: 'node' },
          { name: 'javascript' }
        ]
      },
      {
        name: '移动开发',
        child: [
          {
            name: 'android开发'
          },
          {
            name: 'IOS开发'
          },
          {
            name: 'React Native'
          },
          {
            name: 'Flutter'
          }
        ]
      },
      {
        name: '游戏开发',
        child: [
          {
            name: 'phaser游戏开发'
          },
          {
            name: 'webGL游戏开发'
          }
        ]
      }
    ]
  },
  {
    name: '设计创作',
    child: [
      {
        name: '平面设计',
        child: [
          { name: '电商美工' },
          { name: '综合平面设计' },
          { name: '摄影' }
        ]
      },
      {
        name: 'UI设计',
        child: [
          { name: '交互设计' },
          { name: 'webUI设计' },
          { name: '游戏UI设计' }
        ]
      },
      { name: '软件设计' }
    ]
  },
  {
    name: '升学考研',
    child: [
      { name: '考研' },
      { name: '大学' },
      { name: '高中' },
      { name: '初中' }
    ]
  },
  {
    name: '职企考证',
    child: [
      { name: '公务员', child: [{ name: '教师考试' }, { name: '建筑工程' }] }
    ]
  }
]

$(function() {

  // 获取最外面的lists盒子
  var listBox = $('.lists');

  genCata(data)
  function genCata(data) {
    // 清空盒子中的元素
    listBox.html('');
    console.log(listBox)
    for (var i = 0; i < data.length; i++) {
      console.log(data[i])
    }
  }
})


