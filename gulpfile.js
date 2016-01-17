var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var colors = require('colors/safe');
var shim = require('browserify-shim');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var del = require('del');
var fs = require('fs');
var browserSync = require("browser-sync").create();

var onError = function (err) {
  console.log(colors.red(err));
};


/**
 *
 *
 *
 *  <----------> BOWER TASKS <---------->
 *
 *
 *
 */
gulp.task("bower", function () {
  return bower();
});


/**
 *
 *
 *
 *  <----------> BROWSERIFY TASKS <---------->
 *
 *
 *
 */
gulp.task('app', function () {
  var bundler = browserify({
    entries: ['./reactapp/app.jsx'],
    debug: true // Gives us sourcemapping
  }).transform(babelify, {presets: ["es2015", "react"]});

  bundler.exclude('react');
  bundler.exclude('react-dom');
  bundler.exclude('react-router');
  bundler.exclude('jquery');
  bundler.exclude('moment');
  bundler.exclude('toastr');

  var watcher = watchify(bundler);

  return watcher
      .on('update', function () { // When any files update
        var updateStart = Date.now();

        console.log('Updating!');

        watcher.bundle() // Create new bundle that uses the cache for high performance
            .on('error', onError)
            .pipe(source('app.js'))
            .on('error', onError)
            .pipe(gulp.dest('./public/build/'));

        console.log(colors.green('Updated! ' + (Date.now() - updateStart) + ' ms'));
        console.log(colors.random(new Date() + ''));

        browserSync.reload();
      })
      .bundle() // Create the initial bundle when starting the task
      .on('error', onError)
      .pipe(source('app.js'))
      .on('error', onError)
      .pipe(buffer()) // for uglifying
      .pipe(uglify()) // for uglifying
      .pipe(gulp.dest('./public/build/'))
      .on('error', onError);
});

gulp.task('bundle', function () {
  var bundler = browserify();
  var watcher;

  bundler.require('react');
  bundler.require('react-dom');
  bundler.require('react-router');
  bundler.require('./bower_components/moment/moment.js');
  bundler.require('./bower_components/jquery/dist/jquery.min.js');

  watcher = watchify(bundler);

  return watcher
      .bundle()
      .on('error', onError)
      .pipe(source('bundle.js'))
      .pipe(buffer()) // for uglifying
      .pipe(uglify()) // for uglifying
      .pipe(gulp.dest('./public/build/'))
      .on('error', onError);
});


/**
 *
 *
 *
 *  <----------> CSS TASKS <---------->
 *
 *
 *
 */
gulp.task("minify-css", function () {
  return gulp.src(["./styles/*.css"])
      .pipe(sourcemaps.init())
      .pipe(minifyCss({comments: true, spare: true}))
      .pipe(concat('style.min.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./temp"));
});

gulp.task("css-concat", function () {
  gulp.src(["./temp/*.css"])
      .pipe(concat("style.min.css"))
      .pipe(gulp.dest("./public/stylesheets"));
});


/**
 *
 *
 *
 *  <----------> LESS TASKS <---------->
 *
 *
 *
 */
gulp.task('less', function () {
  gulp.src("<your path>")
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./temp'));
});


/**
 *
 *
 *
 *  <----------> COPY TASKS <---------->
 *
 *
 *
 */
gulp.task("copy:html", function () {
  return gulp.src(__dirname + "/html/*.html")
      .pipe(gulp.dest("./public/"));
});

gulp.task("copy:elemental:less", function () {
  return gulp.src(__dirname + "/bower_components/elementalui/elemental.css")
      .pipe(gulp.dest("./temp"));
});


/**
 *
 *
 *
 *  <----------> WATCH TASKS <---------->
 *
 *
 *
 */
gulp.task("watch", function () {
  gulp.watch("./styles/*.css", ["reconcat"]).on("change", browserSync.reload);
  gulp.watch("./html/*.html", ["copy:html"]).on("change", browserSync.reload);
});


/**
 *
 *
 *
 *  <----------> BROWSER-SYNC TASKS <---------->
 *
 *
 *
 */
gulp.task('browser-sync', function () {
  browserSync.init({
    port: 1337,
    server: {
      baseDir: "./public"
    },
    browser: "google chrome"
  });
});


/**
 *
 *
 *
 *  <----------> OTHER TASKS <---------->
 *
 *
 *
 */
gulp.task("clean", function () {
  return del([__dirname + "/public/**/*", __dirname + "/temp/*"]);
});

gulp.task("lint", function () {
  return gulp.src(["./js/**/*.js"])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

gulp.task("create-temp", function () {
  if (!fs.existsSync(__dirname + "/temp")) {
    fs.mkdir(__dirname + "/temp/");
  }
});

gulp.task("reconcat", function(){
  runSequence("minify-css", "css-concat");
});


/**
 *
 *  <----------><-------------><---------->
 *
 *  <----------> DEFAULT TASKS <---------->
 *
 *  <----------><-------------><---------->
 *
 */
gulp.task("default", function () {
  runSequence(["clean", "create-temp", "bower"],
      ["minify-css", "copy:html", "copy:elemental:less", "app", "bundle", "watch"],
      "css-concat",
      "browser-sync");
});