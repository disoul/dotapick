var gulp = require('gulp'),
    compass = require('gulp-compass'),
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

gulp.task('sass:watch',function(){
	gulp.watch('./app/public/sass/**/*.scss',['compass']);
});

gulp.task('default', function() {
	['sass:watch']
});

