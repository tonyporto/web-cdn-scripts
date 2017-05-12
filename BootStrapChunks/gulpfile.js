/* ====================================== *
 * ALL SETTINGS FOR TASK
 * ====================================== *
 *
 * LINE 20: Directory Name relative to this file (css)
 * LINE 21: Name of final CSS file (common.css & common.min.css)
 *
 * LINE 29 - 31: All CSS files to be combined into common.css
 * ====================================== */

var gulp = require('gulp'),
		//strip = require('gulp-strip-comments'),
		stripCssComments = require('gulp-strip-css-comments'),
		//TASK #1
		concatCss = require('gulp-concat-css'),
		removeEmptyLines = require('gulp-remove-empty-lines'),
		mmq = require('gulp-merge-media-queries'),

		//TASK #2
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),

		//DIR LOCATION & NAME OF FINAL FILE
		commonPath = '',
		commonFile = 'common.css';

//TASK #1 - COMBINE FILES INTO 1
gulp.task('one', function () {

	//FILES TO AVOID & INCLUDE
  return gulp.src(
          [
           'css/base.css',
           'css/add-on.css'
           //,
           //'src/css/style.css'
          ])
    .pipe(concatCss(commonFile))

    .pipe(mmq({
      log: true
    }))
    .pipe(removeEmptyLines())
    .pipe(stripCssComments())
    .pipe(gulp.dest(commonPath));

});

//TASK #2 - MINIFY THE FILE
gulp.task('two', ['one'], function() {

	gulp.src(commonPath + commonFile)
	    .pipe(rename({
	            suffix: '.min'
	        }))
	    .pipe(stripCssComments())
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(commonPath));

})

//INIT TASK #1, THEN #2
gulp.task('default', ['one', 'two']);