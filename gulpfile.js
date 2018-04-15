var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var sequence = require('gulp-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('copyCSS',function(){
    return gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css'))
});
gulp.task('copyCss',function(){
    return gulp.src('src/css/lib/*.min.css')
    .pipe(gulp.dest('dist/css/lib'))
});

gulp.task('copyJS',function(){
    return gulp.src(['src/js/*.js','!src/js/lib/*.min.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('copyData',function(){
    gulp.src('src/data/*.json')
    .pipe(gulp.dest('dist/data'))
})
gulp.task('copyJs',function(){
    return gulp.src('src/js/lib/*.min.js')
    .pipe(gulp.dest('dist/js/lib'))
});
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
gulp.task('htmlmin',function(){
    return gulp.src('src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'))
});
gulp.task('server',function(){
    return gulp.src('dist')
    .pipe(server({
        port:9090,
        open:true,
        livereload:true,
        middleware:function(req,res,next){
            next()
        }
    }))
});

gulp.task("clean", function() {
    return gulp.src("dist")
        .pipe(clean())
})

gulp.task('copyImg',function(){
    return gulp.src('src/img/*.{png,jpg}')
    .pipe(gulp.dest('dist/img'))
});
gulp.task('watch',function(){
    gulp.watch('src/css/header.scss',['copyCSS']);
    gulp.watch('src/css/section.scss',['copyCSS']);

});
gulp.task('default',function(callback){
    sequence('clean',['copyCss','copyCSS','copyJS','htmlmin','copyJs','copyImg','copyData'],'server',callback)
});