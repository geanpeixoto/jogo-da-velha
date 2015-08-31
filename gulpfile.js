var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var args = require('yargs').argv;
var concat = require('gulp-concat');

// CONFIG
var pretty = !!args.pretty;
var dest = 'build';

gulp.task('preview', function() {
  connect.server({
    root: dest,
    port: args.port || 8080,
    livereload: true
  });
});

gulp.task('compile-jade', function() {
  gulp.src('src/**/*.jade')
    .pipe(jade({
      pretty: pretty
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

//TODO Minificar os arquivos quando pretty===false
gulp.task('compile-sass', function() {
  gulp.src(['src/**/*.scss', 'scr/**/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
})

//TODO Minificar os arquivos quando pretty===false
gulp.task('compile-js', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

gulp.task('compile', ['compile-jade', 'compile-sass', 'compile-js']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['compile-jade']);
  gulp.watch(['src/**/*.scss', 'src/**/*.sass'], ['compile-sass']);
  gulp.watch('src/**/*.js', ['compile-js']);
});

gulp.task('default', ['compile', 'watch', 'preview']);
