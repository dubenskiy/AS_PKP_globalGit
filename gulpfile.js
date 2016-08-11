/**
 * Created by DubenskiyAA on 03.07.2016.
 */

"use strict";

var gulp = require('gulp'),

    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    revAppend = require('gulp-rev-append'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    useref = require('gulp-useref'),
    uncss = require('gulp-uncss'),
    mainBowerFiles = require('main-bower-files');

///////////
// debug //
///////////

/**
 * mainJS
 */
gulp.task('mainJS', function () {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('app/dist/lib'))
});

/**
 * mainCSS
 */
gulp.task('mainCSS', function () {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('app/dist/css'))
});

/**
 * mainTPL
 */
gulp.task('mainTPL', function () {
    return gulp.src(mainBowerFiles('**/*.html'))
        .pipe(gulp.dest('app/dist/tpl'))
});

/**
 * bowerComponentsMove
 */
gulp.task('bowerComponentsMove', ['mainJS', 'mainCSS', 'mainTPL']);

/**
 * server connect
 */
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 8001,
        //https: true,
        livereload: true
    });
});

/**
 * index
 */
gulp.task('index', function () {
    gulp.src('app/index.html')
        .pipe(connect.reload());
});

/**
 * page
 */
gulp.task('page', function () {
    gulp.src('app/pages/*.html')
        .pipe(connect.reload());
});

/**
 * pageFolders
 */
gulp.task('pageFolders', function () {
    gulp.src('app/pages/**/*.html')
        .pipe(connect.reload());
});

/**
 * directiveTpl
 */
gulp.task('directiveTpl', function () {
    gulp.src('app/directives/**/*.html')
        .pipe(connect.reload());
});

/**
 * js
 */
gulp.task('js', function () {
    gulp.src('app/js/*.js')
        .pipe(connect.reload());
});

/**
 * jsFolders
 */
gulp.task('jsFolders', function () {
    gulp.src('app/js/**/*.js')
        .pipe(connect.reload());
});

/**
 * directive
 */
gulp.task('directive', function () {
    gulp.src('app/directives/*.js')
        .pipe(connect.reload());
});

/**
 * service
 */
gulp.task('service', function () {
    gulp.src('app/services/*.js')
        .pipe(connect.reload());
});

/**
 * css
 */
gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie9'}))
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('app/dist/css/'))
        .pipe(connect.reload());
});

/**
 * revAppend
 */
gulp.task('revAppend', function () {
    gulp.src('app/index.html')
        .pipe(revAppend())
        .pipe(gulp.dest('app'));
});

/**
 * watch
 */
gulp.task('watch', function () {
    gulp.watch('app/index.html', ['index', 'revAppend']);
    gulp.watch('app/pages/*.html', ['page']);
    gulp.watch('app/pages/**/*.html', ['pageFolders']);
    gulp.watch('app/directives/**/*.html', ['directiveTpl']);
    gulp.watch('app/js/*.js', ['js', 'revAppend']);
    gulp.watch('app/js/**/*.js', ['jsFolders', 'revAppend']);
    gulp.watch('app/directives/*.js', ['directive','revAppend']);
    gulp.watch('app/services/*.js', ['service']);
    gulp.watch('app/css/*.css', ['css']);
});

/**
 * defaultDebug
 */
gulp.task('defaultDebug', ['connect', 'index', 'page', 'pageFolders', 'directiveTpl', 'js', 'jsFolders', 'directive', 'service', 'css', 'revAppend', 'watch']);

///////////
// prod //
///////////

/**
 * clear css   (it's work)
 */
gulp.task('clearCSS', function () {
    return gulp.src('app/dist/css/*.css')
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(gulp.dest('app/prod/css'));
});

/**
 * buildDist
 */
gulp.task('buildDist', function () {
    return gulp.src('www/app/*.html')
        .pipe(useref())
        .pipe(gulpif('app/js/*.js', uglify()))
        //.pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('prod'))
        .pipe(notify('ok!'));
});
