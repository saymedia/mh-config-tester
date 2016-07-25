require('es6-promise').polyfill();
/*!
 * gulp
 * $ npm install gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-obfuscate gulp-cssnano gulp-jshint gulp-concat gulp-util gulp-uglifyjs gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    del = require('del'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    download = require('gulp-download');

// Styles

var JSONPATH = './htdocs/data/grab';

gulp.task('grab-qa', function () {
    return download('http://tempest-es.qa.saymedia.com/tempest-published-*-live/ContentSiteConfig/_search?size=1000')
        .pipe(rename("qa-site-configs.json"))
        .pipe(gulp.dest(JSONPATH));
});

gulp.task('grab-prod', function () {
    return download('http://tempest-es.prod.saymedia.com/tempest-published-*-live/ContentSiteConfig/_search?size=1000')
        .pipe(rename("prod-site-configs.json"))
        .pipe(gulp.dest(JSONPATH));
});

gulp.task('grab',['clean', 'grab-qa', 'grab-prod'], function () {
    return true;
});


// Clean
gulp.task('clean', function () {
    return del(JSONPATH);
});

gulp.task('connect', function() {
    connect.server({
        root: 'htdocs',
        livereload: false
    });
});

gulp.task('html', function () {
    gulp.src('./htdocs/*.html')
        .pipe(connect.reload());
});

// Watch
gulp.task('server', ['connect'], function () {
});
