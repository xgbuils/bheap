var gulp  = require('gulp')
var mocha = require('gulp-mocha')
var eslint = require('gulp-eslint')
var karma = require('karma').Server

gulp.task('test', function () {
    gulp.src('./test/binaryheap_test.js')
        .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
})