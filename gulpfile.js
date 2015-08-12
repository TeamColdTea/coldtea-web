var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var plugins = require('gulp-load-plugins')();

gulp.task('wiredep', function () {
  gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
});

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
    .pipe(plugins.usemin({
      // css: [plugins.minifyCss(), 'concat'],
      html: [plugins.minifyHtml({ empty: true })],
      js: [plugins.uglify(), plugins.rev()],
      appjs: [plugins.uglify()],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['wiredep', 'usemin']);

gulp.task('deploy', ['build'], function () {
  gulp.src('./dist/**/*')
  .pipe(plugins.ghPages());
});

gulp.task('serve', ['build'], function () {
  gulp.src('dist')
    .pipe(plugins.webserver({
      host: 'localhost',
      port: 8080,
      directoryListing: false,
      livereload: true
    }));
});

gulp.task('default', ['build'], function () {
});
