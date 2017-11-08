'use strict';


/* ----------------- */
/* Dependencies
/* ----------------- */

const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      autoprefixer = require('gulp-autoprefixer'),
      image = require('gulp-image'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      clean = require('gulp-clean'),
      uglify = require('gulp-uglify'),
      cleanCSS = require('gulp-clean-css'),
      gutil = require('gulp-util'),
      glob = require('glob'),
      envify = require('envify/custom'),
      manifest = require('gulp-manifest'),
      jshint = require('gulp-jshint');



const hbsfy = require('hbsfy').configure({
  extensions: ['html']
});

/* ----------------- */
/* Settings variables
/* ----------------- */

const settings = {
  src: './src',
  build: './../static/zhuravlev'
}, 
scssPathes = ['node_modules/susy/sass', 
              'node_modules/breakpoint-sass/stylesheets',
             'node_modules/bootstrap-sass/assets/stylesheets',
             'node_modules/font-awesome-sass/assets/stylesheets/'];


/* ----------------- */
/* Static files
/* ----------------- */


/* ----------------- */
/* Scripts
/* ----------------- */
const devBabelOptions = {
  plugins: ['react-html-attrs',
   'transform-class-properties',
   'transform-decorators-legacy',
   'transform-object-rest-spread'],
  presets: ['latest', 'react'],
  sourceMapsAbsolute: true
};
const prodBabelOptions = {
  plugins: ['react-html-attrs',
   'transform-class-properties',
   'transform-decorators-legacy',
   'transform-object-rest-spread'],
  presets: ['latest', 'react'],
  sourceMapsAbsolute: false
};

gulp.task('fastjs', () => {
  process.env.NODE_ENV = 'development';

  return browserify({
      transform: ['hbsfy'],
      entries: settings.src + '/js/main.js',
      debug: true
    })
    .transform("babelify", devBabelOptions)
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/js'));
});
gulp.task('js', () => {
  process.env.NODE_ENV = 'production';

  return browserify({
      transform: ['hbsfy', 'envify'], 
      entries: settings.src + '/js/main.js',
      debug: false
      //plugin: [collapse]
    })
    .transform("babelify", prodBabelOptions)
    //.transform("uglifyify", {
     // global: true
    //})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify()).on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/js'));
});

const currComponent = 'Article.js';

gulp.task('component', () => {
  process.env.NODE_ENV = 'production';

  return browserify({
      transform: ['hbsfy', 'envify'],
      entries: settings.src + '/blocks/components/' + currComponent,
      debug: true
    })
    .transform("babelify", prodBabelOptions)
    .bundle()
    .pipe(source(currComponent))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/components'));
});
gulp.task('fastcomponent', () => {
  process.env.NODE_ENV = 'development';

  return browserify({
      transform: ['hbsfy'],
      entries: settings.src + '/blocks/components/' + currComponent,
      debug: true
      //plugin: [collapse]
    })
    .transform("babelify", devBabelOptions)
    .bundle()
    .pipe(source(currComponent))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/components'));
});


gulp.task('fastscripts', ['fastjs', 'fastcomponent']);
gulp.task('scripts', ['js', 'component']);

/* ----------------- */
/* SASS
/* ----------------- */

gulp.task('faststyles', () => {
  return gulp.src(settings.src + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: scssPathes
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(settings.build + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp.src(settings.src + '/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: scssPathes
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(settings.build + '/css'));
});


/* ----------------- */
/* CacheApp
/* ----------------- */

gulp.task('manifest', () => {
  gulp.src(settings.build + '/**/*')
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'app.manifest',
      exclude: 'app.manifest'
    }))
    .pipe(gulp.dest(settings.build));
});

/* ----------------- */
/* Images
/* ----------------- */

gulp.task('images', () => {
  return gulp.src(settings.src + '/img/*')
    .pipe(image())
    .pipe(gulp.dest(settings.build + '/img'));
});
gulp.task('fastimages', () => {
  return gulp.src(settings.src + '/img/*')
    .pipe(gulp.dest(settings.build + '/img'));
});

gulp.task('fastmedia', ['fonts', 'fastimages']);
gulp.task('media', ['fonts', 'images']);
/* ----------------- */
/* HTML
/* ----------------- */

gulp.task('html', () => {
  return gulp.src(settings.src + '/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./../blog/templates'));
});


/* ----------------- */
/* Fonts
/* ----------------- */

gulp.task('fonts', function() {
  return gulp.src(settings.src + '/fonts/**/*.*')
    .pipe(gulp.dest(settings.build + '/fonts'));
});


/* ----------------- */
/* Clean
/* ----------------- */

gulp.task('clean', function () {
    return gulp.src('public', { read: false })
      .pipe(clean());
});


/* ----------------- */
/* Predefined
/* ----------------- */

gulp.task('watch', () => {
  gulp.watch(settings.src + '/**/*.scss', ['faststyles']);
  gulp.watch(settings.src + '/img/**/*.*', ['fastimages']);
  gulp.watch(settings.src + '/**/*.pug', ['html']);
  gulp.watch(settings.src + '/**/*.js', ['fastscripts']);
});
gulp.task('serve', () => {
    browserSync.init({
    server: {
      baseDir: settings.build
    },
    open: false,
    port: 9000,
    reloadDelay: 2200
  });
});

gulp.task('fastbuild', ['fastscripts', 'faststyles', 'fastmedia', 'html']);
gulp.task('build', ['scripts', 'styles',  'media', 'manifest', 'html']);
gulp.task('default', ['fastbuild', 'watch']); 
gulp.task('deploy', ['build']); 