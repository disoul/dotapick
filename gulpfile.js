var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    path = require('path');

gulp.task('compass',function(){
	gulp.src('./app/public/sass/index.scss')
	.pipe(compass({
		project: path.join(__dirname,'./app/public'),
		css: 'css',
		sass: 'sass',
		image: 'image'
	}));
});

gulp.task('minifycss', function() {
    return gulp.src('./app/public/css/index.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./app/public/minify'));
});

gulp.task('minifyjs', function() {
    return gulp.src('./app/public/js/*.js')
        .pipe(concat('dotapick.js'))
        .pipe(gulp.dest('./app/public/minify'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./app/public/minify'));
});

gulp.task('minify', function(path) {
    del(['./app/public/minify/**']).then(function(){
        console.log('clean complete');
        gulp.start('minifycss', 'minifyjs');
    })
});

gulp.task('sass:watch',function(){
	gulp.watch('./app/public/sass/**/*.scss',['compass']);
});

gulp.task('default', function() {
	['sass:watch']
});

