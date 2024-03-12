var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')(require('sass')),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify');

// HTML task
gulp.task('html', function () {
    return gulp
        .src('stage/pug/*.pug')
        .pipe(pug())
        .pipe(pug({ pretty: false }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// CSS task
gulp.task('css', function () {
    return gulp
        .src('stage/sass/**/*.scss') // Updated glob pattern to watch all Sass files
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// JS task
gulp.task('js', function () {
    return gulp
        .src('stage/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Watch task
gulp.task('watch', function () {
    livereload.listen();
    require('./server.js');
    gulp.watch('stage/pug/**/*.pug', gulp.series('html')); // Watch all Pug files
    gulp.watch('stage/sass/**/*.scss', gulp.series('css')); // Watch all Sass files
    gulp.watch('stage/js/**/*.js', gulp.series('js')); // Watch all JavaScript files
});

// Default task
gulp.task('default', gulp.series('watch'));