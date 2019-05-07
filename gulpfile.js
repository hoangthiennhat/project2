var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var watch = require('gulp-watch');

var reload = browserSync.reload;

var pug = require('gulp-pug');

var sass = require('gulp-sass');

gulp.task('pug',function() { 
  return gulp.src('./app/templates/pug/**/*.pug')  
    .pipe(pug({
     pretty : true//dòng này để export ra file html như bình thường
    }))   
    .pipe(gulp.dest('./app/built'))
    .pipe(browserSync.stream());
});

gulp.task('sass',function() {
  return gulp.src('./app/templates/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))  
    .pipe(gulp.dest('./app/built/css/'))
    .pipe(browserSync.stream());
});

// add js
gulp.task('js', function() {
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("./app/built/script"))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['pug','sass','js'], function() {

  browserSync.init({
      server: {
        baseDir: "./app/built/"
      },
      /*
      *  server sẽ run file trong pages,nhưng nếu các file khác không nàm trong pages nó sẽ không nhận các file đó
      *  nên file index phải nằm ngoài built
      *   và đặc biệt đường dẫn chỉ tới file đó thôi chứ không được ghi tên file lun
      */ 
  });
  // browserSync.reload("./app/built/news.html");

  
  gulp.watch("app/templates/pug/**/*.pug", ['pug']);
  gulp.watch("app/templates/scss/**/*.scss", ['sass']);
  gulp.watch("app/built/script/**/*.js", ['js']);
  gulp.watch("app/built/*.html").on('change', browserSync.reload);
});

  // run---------
  gulp.task('default', [ 'pug','sass','serve','js']);