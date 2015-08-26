var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var plugins = require('gulp-load-plugins')();

gulp.task('wiredep', function () {
  return gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
});

gulp.task('clean:dist', function () {
  return gulp.src('dist')
    .pipe(plugins.clean());
});

gulp.task('clean:publish', function () {
  return gulp.src('.publish')
    .pipe(plugins.clean());
});

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
    .pipe(plugins.usemin({
      css: [plugins.minifyCss(), 'concat'],
      html: [plugins.minifyHtml({ empty: true })],
      js: [plugins.uglify(), plugins.rev()],
      appjs: [plugins.uglify(), plugins.rev()],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('ghPages', function () {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages());
});

gulp.task('build', function (cb) {
  plugins.sequence('clean:dist', 'wiredep', 'usemin', cb);
});

gulp.task('deploy', function (cb) {
  plugins.sequence('clean:publish', 'build', 'ghPages', cb);
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
