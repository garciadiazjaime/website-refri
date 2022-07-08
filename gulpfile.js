var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean'),
	filesize = require('gulp-filesize'),
	compass = require('gulp-compass'),
	filter = require('gulp-filter'),
	bower = require('main-bower-files'),
	runSequence = require('run-sequence'),
	jshint = require('gulp-jshint')
	_ = require('lodash');


gulp.task('clean', function() {
	return gulp.src('assets/js/**', {
			read: false
		})
		.pipe(clean({
			force: true
		}));
});


gulp.task('bower:js', function() {
	var jsFilter = filter(['**/*.js']);
	return gulp.src(bower())
		.pipe(jsFilter)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(filesize())
		.pipe(gulp.dest('assets/js'));
});

gulp.task('bower:css', function() {
	var cssFilter = filter(['**/*.min.css']);
	return gulp.src('**/*.min.css')
		.pipe(concat('vendor.css'))
		.pipe(filesize())
		.pipe(gulp.dest('assets/css'));
});


gulp.task('js', function() {
	return gulp.src('angular_components/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('mint.app.js'))
		// .pipe(ngAnnotate())
		// .pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/js'));
});


gulp.task('compass', function() {
	return gulp.src('sass_components/**/*.sass')
		.pipe(compass({
			config_file: 'config.rb',
			css: 'assets/css',
			sass: 'sass_components'
		}))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('assets', function(callback) {
	return runSequence('clean', ['bower:js', 'js', 'compass', 'bower:css'],
		callback);
});

gulp.task('watch:js', ['js'], function() {
	gulp.watch('angular_components/**/*.js', ['js']);
});

gulp.task('watch', ['assets'], function() {
	gulp.watch('angular_components/**/*.js', ['js']);
});