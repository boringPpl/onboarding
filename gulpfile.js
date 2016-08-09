var gulp = require('gulp')
var runSequence = require('run-sequence')

require('require-dir')('gulp-tasks')

gulp.task('dev', function () {
  return runSequence('clean', 'webpack', 'watch', 'nodemon')
})

gulp.task('default', function (cb) {
  return runSequence('clean', 'webpack')
})
