var gulp = require('gulp');
var connect = require('gulp-connect');
var gulpsass = require('gulp-sass');
var gulpuglify = require('gulp-uglify');
var gulpcleancss = require('gulp-clean-css');
var gulpconcat = require('gulp-concat');

//sass文件处理
gulp.task('sass',function(){
	return gulp.src('./src/sass/*.scss')
    .pipe(gulpsass())
    .pipe(gulpcleancss())
    .pipe(gulp.dest('./dist/css'))
});
//静态文件文件处理
gulp.task('static',function(){
	gulp.src('./src/font/*.*')
        .pipe(gulp.dest('./dist/font'));
    gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./dist/img'));
    gulp.src('./src/*.html')
    	.pipe(gulp.dest('./dist'));

});
//js文件文件处理
gulp.task('webpack',function(){
	 gulp.src('./src/js/*.js')
	 	// .pipe(gulpconcat('main.js'))
        .pipe(gulpuglify())
        .pipe(gulp.dest('./dist/js/'))
});
//自动刷新页面
gulp.task('now',['sass','static','webpack'],function(){
	//刷新页面
	return gulp.src('./dist/*.html').pipe(connect.reload());
});
//设置默认事件加载全部需要加载的事件
gulp.task('default',['sass','static','webpack'],function(){
	gulp.watch(['./src/sass/*.scss','./src/font/*.*','./src/img/*.*','./src/js/*.js','./src/*.html'],['now']);
	//开启服务器
	connect.server({
		livereload:true,
		port:8888
	});
});