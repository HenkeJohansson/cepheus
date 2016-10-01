var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');

/**
 * Compile sass to css
 */
gulp.task('sass', function() {
	return gulp.src('app/scss/style.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * Watch for files updating
 */
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload);
	// Other watchers
});

/**
 * Update browser on save
 */
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

/**
 * Build app in dist
 */
gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'));
});

/**
 * Copy fonts to dist
 */
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

/**
 * Clean dist from files
 * before building
 */
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

/**
 * Clear previous build
 */
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback);
});

/**
 * Serve build enviroment
 */
gulp.task('serve', function (callback) {
	runSequence(['sass','browserSync', 'watch'],
		callback
	);
});


/**
 * Build dist
 */
gulp.task('build', function (callback) {
	runSequence('clean:dist', 
		['sass', 'useref', 'fonts'],
		callback
	);
});