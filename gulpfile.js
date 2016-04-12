/// <binding Clean='clean:build' ProjectOpened='bower:install, watch, run' />
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var notify = require("gulp-notify");
var del = require("del");
var sass = require("gulp-sass");
var spawn = require("child_process").spawn;
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var bower = require("gulp-bower");
var watch = require("gulp-watch");
var path = require("path");
var tsProject = ts.createProject('tsconfig.json');

var paths = {
  bower: "bower_components/",
  npm: "node_modules",
  scripts: ['./scripts/**/*.ts'],
  sass: ['./scss/**/*.scss']
};
var stopOnError = function (error) {
  console.log(error);

  if (!env.isCi()) this.emit('end');
  else process.exit(1);
};
var env = {
  isCi: function () {
    return typeof process.env.BUILD_NUMBER !== "undefined";

  }
};
gulp.task('default', ['sass']);
gulp.task("clean", ["clean:bower", "clean:build", "clean:artifacts", "clean:nuget"]);

/**
 * Bower
 */
gulp.task("bower:install", function () {
  return bower(paths.bower)
      .pipe(gulp.dest(paths.lib));
});

/**
 * Watch
 */
gulp.task("watch", function () {
  gulp.watch(paths.scripts, ["scripts"]);
  gulp.watch(paths.sass, ["sass"]);
});

/**
 * Compile & Copy
 */
gulp.task("libs", function () {
  return gulp.src([
           paths.bower + "ionic/js/ionic.bundle.min.js",
           paths.npm + "/systemjs/dist/system-polyfills.js",
           paths.npm + "/systemjs/dist/system.js",
           paths.bower + "angular-facebook/lib/angular-facebook.js",
           paths.bower + "angular-resource/angular-resource.js",
           paths.bower + "ngAutocomplete/src/ngAutocomplete.js",
           paths.bower + "angular-local-storage/dist/angular-local-storage.js"
  ])
        .pipe(concat("libs.js"))
        .pipe(gulp.dest("www/lib"));
});
gulp.task("scripts", function () {
  var stream = gulp.src(["scripts/**/*.ts"])
      .pipe(sourcemaps.init())
      .pipe(ts({
        "noImplicitAny": false,
        "noEmitOnError": true,
        "removeComments": false,
        "inlineSourceMap": true,
        "inlineSources": true,
        "outFile": "www/scripts/appBundle.js",
        "target": "es5"

      })).on('error', stopOnError);
  stream.pipe(sourcemaps.write())
    .pipe(gulp.dest(""))
  .pipe(notify("Scripts Compiled"));
});

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(notify("Sass Compiled"))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
