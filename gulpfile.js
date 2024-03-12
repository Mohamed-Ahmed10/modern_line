var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify');

// html task
gulp.task('html', function () {
  return gulp
    .src('stage/html/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

// css task
gulp.task('css', function () {
  return gulp
    .src(['stage/css/**/*.css', 'stage/css/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

// js task
gulp.task('js', function () {
  return gulp
    .src('stage/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

// watch task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch('stage/html/**/*.pug', gulp.parallel('html'));
  gulp.watch(['stage/css/**/*.scss', 'stage/css/**/*.css'], gulp.parallel('css'));
  gulp.watch('stage/js/**/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('watch'));