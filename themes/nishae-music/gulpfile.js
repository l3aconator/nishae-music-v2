var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

var config = {
    scripts: {
        src: [
            './js/function.js',
            './js/html5shiv-printshiv.min.js',
            './js/modernizr.custom.71422.js',
            './js/coverSlider.js',
            './js/jquery.vide.min.js'
        ],
        dest: './js-min'
    },

    sass: {
        src: './scss/**/*.scss'
    },

    css: {
        src: './css/*.css',
        dest: './css-compiled'
    },

    templates: {
        src: './templates/**/*.twig'
    },

    content: {
        src: '../../pages/**/*.md'
    }
};

gulp.task('minify-css', function() {
	return gulp.src(config.css.src)
	.pipe(cleanCSS({debug: true}, function(details) {
		console.log(details.name + ': ' + details.stats.originalSize);
		console.log(details.name + ': ' + details.stats.minifiedSize);
	}))
    .pipe(rename('styles.min.css'))
	.pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
	return gulp.src(config.sass.src)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream());
});

gulp.task('sass-build', function (callback) {
	runSequence('sass', 'minify-css', callback)
});

gulp.task('sass:watch', ['minify-css'], function () {
	gulp.watch(config.sass.src, ['sass']);2
});

gulp.task('scripts', function() {
    return gulp.src(config.scripts.src)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
	browserSync.init({
		proxy: "http://nishae.dev:8888/"
	})

    runSequence('sass-build', 'scripts', callback)

    gulp.watch(config.scripts.src, ['scripts'])
    gulp.watch(config.sass.src, ['sass-build'])
	gulp.watch(config.content.src).on('change', browserSync.reload)
	gulp.watch(config.templates.src).on('change', browserSync.reload);
});
