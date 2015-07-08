var gulp = require('gulp'),

    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),

    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    copy = require('gulp-copy'),

    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('sass', function () {
  gulp.src('dev/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: [
      'Firefox 3.5',
      'Opera 9',
      'Safari 3.1',
      'Chrome 5',
      'ie 8'
      ]}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dev/css/'))
    .pipe(connect.reload());
});

gulp.task('minifycss', function () {
  gulp.src('dev/css/*.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('site1/css/'))
    .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src([
      'dev/js/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('site1/js/'))
    .on('error', function (event) {
      gutil.log(event);
    })
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('site1/*.html')
     .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/css/*.css', ['minifycss']);
  gulp.watch('dev/js/*.js', ['javascript']);
  gulp.watch('site1/*.html', ['html']);

});


gulp.task('default', ['connect', 'html', 'sass', 'minifycss', 'javascript', 'watch']);