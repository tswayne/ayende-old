/*eslint sort-vars:0,no-console:0*/
'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    lab = require('gulp-lab'),
    nodemon = require('gulp-nodemon');

var workingDirectories = ['./server/**/*.js', './test/**/*.js'];

gulp.task('test', function () {
  return gulp.src('test')
      .pipe(lab());
});

gulp.task('lint', function () {
  return gulp.src(workingDirectories)
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task('default', function () {
  nodemon({ script: 'ayente.js'
    , ext: 'js'
    , tasks: ['lint', 'test'] })
      .on('restart', function () {
        console.log('------------------------------');
        console.log('|Just restarted your project!|');
        console.log('------------------------------');
      });
});
