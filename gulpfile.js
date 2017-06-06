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
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      clean = require('gulp-clean'),
      uglify = require('gulp-uglify'),
      cleanCSS = require('gulp-clean-css'),
      gutil = require('gulp-util'),
      glob = require('glob'),
      envify = require('envify');



const hbsfy = require('hbsfy').configure({
  extensions: ['html']
});

/* ----------------- */
/* Settings variables
/* ----------------- */

const settings = {
  src: './src',
  build: './public'
}, 
      scssPathes = ['node_modules/susy/sass', 
                    'node_modules/breakpoint-sass/stylesheets',
                   'node_modules/bootstrap-sass/assets/stylesheets',
                   'node_modules/font-awesome-sass/assets/stylesheets/'];


/* ----------------- */
/* Static files
/* ----------------- */

gulp.task('bundle', ['js', 'scss', 'images', 'html', 'fonts', 'components'], () => {
  browserSync.init({
    server: {
      baseDir: settings.build
    },
    open: false,
    port: 9000,
    reloadDelay: 2200
  });

  gulp.watch(settings.src + '/**/*.scss', ['scss']).on('change', browserSync.reload);
  gulp.watch(settings.src + '/img/**/*.*', ['images']).on('change', browserSync.reload);
  gulp.watch(settings.src + '/**/*.pug', ['html']).on('change', browserSync.reload);
  gulp.watch(settings.src + '/**/*.js', ['js', 'components']).on('change', browserSync.reload);
  gulp.watch('./app/**/*').on('change', browserSync.reload);
});


/* ----------------- */
/* Scripts
/* ----------------- */

gulp.task('js', () => {
  return browserify({
      transform: ['hbsfy'],
      entries: settings.src + '/js/main.js',
      debug: true
    })
    .transform("babelify", {
      plugins: ['react-html-attrs',
       'transform-class-properties',
       'transform-decorators-legacy',
       'transform-object-rest-spread'],
      presets: ['es2015', 'react'],
      sourceMapsAbsolute: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/js'));
});

gulp.task('components', () => {
  //let components  = glob.sync('./blocks/components/*.js');
  return browserify({
      transform: ['hbsfy', 'envify'],
      //'envify'
      entries: settings.src + '/blocks/components/Blog.js',
      //entries: components,
      debug: true
    })
    .transform("babelify", {
      plugins: ['react-html-attrs',
       'transform-class-properties',
       'transform-decorators-legacy',
       'transform-object-rest-spread'],
      presets: ['es2015', 'react'],
      sourceMapsAbsolute: true
    })
    .bundle()
    .pipe(source('Blog.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(settings.build + '/components'));
})
gulp.task('jsmin', () => {
  return browserify({
      transform: ['hbsfy', 'envify'], 
      entries: settings.src + '/js/main.js',
      debug: false
    })
    .transform("babelify", {
      plugins: ['react-html-attrs',
       'transform-class-properties',
       'transform-decorators-legacy',
       'transform-object-rest-spread'],
      presets: ['es2015', 'react'],
      sourceMapsAbsolute: false
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify()).on('error', gutil.log)
    .pipe(sourcemaps.init({ loadMaps: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.build + '/js'));
});


/* ----------------- */
/* SASS
/* ----------------- */

gulp.task('scss', () => {
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
//    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(settings.build + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
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
/* Images
/* ----------------- */

gulp.task('images', () => {
  return gulp.src(settings.src + '/img/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(settings.build + '/img'));
});


/* ----------------- */
/* HTML
/* ----------------- */

gulp.task('html', () => {
  return gulp.src(settings.src + '/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(settings.build));
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

gulp.task('start', ['bundle']);  // development
gulp.task('deploy', ['html', 'css', 'jsmin', 'images', 'fonts']);  // production