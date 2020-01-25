// 引用gulp模块
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')
const less = require('gulp-less')
const csso = require('gulp-csso')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

// 使用gulp.task建立任务
// 1. 任务的名称
// 2. 任务的回调函数
gulp.task('first', () => {
  console.log('人生中第一个gulp任务执行!')
  // 1. 使用gulp.src获取要处理的文件
  gulp.src('./src/css/base.css').pipe(gulp.dest('./dist/css'))
})

// html任务
// 1. html文件中代码的压缩操作 (gulp-htmlmin)
// 2. 抽取html文件中的公共代码 (gulp-file-include)
gulp.task('htmlmin', () => {
  gulp
    .src('./src/*.html')
    // 抽取公共部分的html
    .pipe(fileinclude())
    // 压缩html文件中的代码
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
})

// css任务
// 1.less语法转换 (gulp-less)
// 2.css代码压缩
gulp.task('cssmin', () => {
  // 选择css目录下所有的less文件及css文件
  gulp
    .src(['./src/css/*.less', './src/css/*.css'])
    // 将less文件转换成css文件
    .pipe(less())
    // 压缩css代码
    .pipe(csso())
    // 将处理的结果进行输出
    .pipe(gulp.dest('dist/css'))
})

// js任务
// 1.es6代码转换
// 2.代码压缩
gulp.task('jsmin', () => {
  gulp
    .src('./src/js/*.js')
    .pipe(
      babel({
        //  它可以判断当前代码的运行环境,将代码转换为当前运行环境所支持的代码
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// 复制文件夹
gulp.task('copy', () => {
  gulp.src('./src/images/*').pipe(gulp.dest('dist/images'))
  gulp.src('./src/lib/*').pipe(gulp.dest('dist/lib'))
})

// 构建任务

gulp.task(
  'build',
  gulp.parallel('htmlmin', 'cssmin', 'jsmin', 'copy', async () => {
    // Build the website.
    await console.log('打包成功')
  })
)
