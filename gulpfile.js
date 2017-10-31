// Requires
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss     = require('gulp-postcss');
var sourcemaps  = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

// Paths
const baseSrc   = '';
const pathsSrc  = {};

pathsSrc.sassInput  = baseSrc + 'sass/main.scss';
pathsSrc.sassFiles  = baseSrc + 'sass/**/*.scss';
pathsSrc.jsFiles    = baseSrc + 'js/**/*.js';
pathsSrc.htmlFiles  = baseSrc + '*.html';
pathsSrc.cssFolder  = baseSrc + 'css';
pathsSrc.cssOutput  = baseSrc + 'css/main.css';

// Post CSS
var processorsArray = [
  require('autoprefixer')({ browsers:
    [
      "Android >= 4",
      "Chrome >= 21",
      "Firefox >= 28",
      "Explorer >= 10",
      "iOS >= 7.1",
      "Opera >= 12.1",
      "Safari >= 6.1"
    ]
  }),
  require('cssnano')({})
];

// Compile SASS
gulp.task('sass', function() {
  return gulp.src(pathsSrc.sassInput)
    .pipe( sourcemaps.init() )
    .pipe(sass())
    .pipe( postcss(processorsArray) )
    .pipe( sourcemaps.write('.') )
    .pipe(gulp.dest(pathsSrc.cssFolder))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Watches
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(pathsSrc.sassFiles, ['sass']);
  gulp.watch(pathsSrc.htmlFiles, browserSync.reload);
  gulp.watch(pathsSrc.jsFiles, browserSync.reload);
})

// Default task
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync','watch'],
    callback
  )
})
