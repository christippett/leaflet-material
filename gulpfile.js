var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

var browserifyTask = function (options) {
  // Our app bundler
  var appBundler = browserify({
    entries: [options.src], // Only need initial file, browserify finds the rest
    debug: options.development, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
  });

  // The rebundle process
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(gulpif(!options.development, source('leaflet-material.min.js'), source('leaflet-material.js')))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }
      
  rebundle();
  
}

var sassTask = function (options) {
    var autoprefixerconfig = {
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 8',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ],
      cascade: true
    };

    if (options.development) {
      var run = function () {
        var start = new Date();
        console.log('Building SCSS bundle');
        gulp.src(options.src)
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', gutil.log))
          .pipe(autoprefixer(autoprefixerconfig))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(options.dest))
          .pipe(notify(function () {
            console.log('SCSS bundle built in ' + (Date.now() - start) + 'ms');
          }));
      };
      run();
      gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
        .pipe(sass().on('error', gutil.log))
        .pipe(autoprefixer(autoprefixerconfig))
        .pipe(concat('leaflet-material.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}

// Starts our development workflow
gulp.task('default', function () {

  browserifyTask({
    development: true,
    src: './src/leaflet-material.js',
    dest: './build'
  });

  sassTask({
    development: true,
    src: './src/**/*.scss',
    dest: './build'
  });

});

gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: './src/leaflet-material.js',
    dest: './dist'
  });

  sassTask({
    development: false,
    src: './src/**/*.scss',
    dest: './dist'
  });

});