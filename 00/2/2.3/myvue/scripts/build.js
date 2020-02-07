
// 所有的配置
let bullds = require('./config').getAllBuilds()



// 构建 vue 构建入口
MSBlobBuilder(builds);

function build(builds){
  let built = 0;
  const total = builds.length;
}