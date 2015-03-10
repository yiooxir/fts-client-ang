/**
 * Created by sergey on 10.03.15.
 */

/**
 * Created by sergey on 07.03.15.
 */

var gulp       = require('gulp'),
    open       = require('gulp-open'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    rename     = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    port       = 8010;

gulp.task('browserify', function () {
    gulp.src('./app/js/main.js')
        .pipe(browserify())
        //.pipe(rename('build.js'))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('open', function () {
    var options = {
        url: 'http://localhost:' + port
    };

    gulp.src('build/index.html')
        .pipe(open('', options));
});

gulp.task('connect', function () {
    connect.server({
        root       : 'build',
        port       : port,
        livereload : true
    });
});

gulp.task('js', function () {
    gulp.src('./app/js/*/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./app/css/*.css')
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    //gulp.watch('./app/js/*.js',   ['js']);
    gulp.watch('./app/**/*.html',    ['html']);
    gulp.watch('./app/css/*.css',    ['css']);
    gulp.watch('./app/js/**/*.js', ['browserify']);
});


gulp.task('build', ['browserify']);
gulp.task('develop', ['build', 'connect', 'open', 'watch']);
gulp.task('default', ['build']);
