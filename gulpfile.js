var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var less = require('gulp-less');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var paths = {
	scripts: ['app/js/**/*.js', 'test/**/*.js'],
	less: 'app/css/**/*.less'
};

gulp.task('less', function () {
	return gulp.src(paths.less)
		.pipe(less().on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('lint', function () {
	return gulp.src(paths.scripts)
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
	});

gulp.task('test', function () {
	return gulp.src('test/runner.html')
		.pipe(mochaPhantomJS({reporter: 'spec'}));
});

gulp.task('watch-js', function() {
	return gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('watch-less', function() {
	return gulp.watch(paths.less, ['less']);
});

gulp.task('watch', ['watch-js', 'watch-less']);

gulp.task('verify', ['lint', 'less', 'test']);

gulp.task('default', ['verify']);

gulp.task('build', ['verify'], function () {
	del.sync('build/**/*');
	gulp.src(['app/**/*', '!app/**/*.less'])
		.pipe(gulp.dest('build'));
});