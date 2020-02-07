const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry:'./server/index.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module:{
    rules:[
      {
        test: /.js$/,
        loader:'babel-loader',
        exclude:'/node_modules/',
        options:{
          presets: ['@babel/preset-react',['@babel/preset-env']]
        }
      }
    ]
  }
}