var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

var config = {
  jsPath: './src/js',
  testPath: './test/js'
};

gulp.task('jscs', function () {
  return gulp.src(config.jsPath + '/*.js')
    .pipe(jscs());
});

gulp.task('jshint', function () {
  return gulp.src(config.jsPath + '/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  return gulp.src(config.testPath + '/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('watch', function () {
  gulp.watch(config.jsPath + '/**/*.js', ['browserify']);
});

gulp.task('lint', ['jscs', 'jshint']);
gulp.task('default', ['lint']);
