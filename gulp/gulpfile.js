// Command to Start tasks gulp sass for example

// Requires
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');

const reload = browserSync.reload;

// Tasks
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: {
            target: "http://spo.site/2.0",
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('../css/2.0/scss/**/*.scss') // Gets all files ending with .scss in ../css/2.0/scss
        .pipe(sass())
        .pipe(gulp.dest('../css/2.0/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// gulp useref : concatenates any number of CSS and JavaScript files into a single
// file by looking for a comment that starts with "<!--build:" and ends with //"<!--endbuild-->
// After that he doing minification in that file.
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            // Setting interlaced to true
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// Task Watch
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('../css/2.0/scss/**/*.scss', ['sass']);
    gulp.watch([
        '../../app/Resources/**/*.html.twig'
    ]).on('change', reload);
    // Other watchers
});


