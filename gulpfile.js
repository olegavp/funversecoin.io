var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var watch = require('gulp-watch');
var sass = require('gulp-sass')(require('node-sass'));
var sourcemaps = require('gulp-sourcemaps');
var gcmq = require('gulp-group-css-media-queries');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
// var changed = changed = require('gulp-changed');
var browserSync = require('browser-sync').create();
var posthtml = require('gulp-posthtml');
var prettify = require('gulp-prettify');
var posthtmlAttrsSorter = require('posthtml-attrs-sorter');
var concat = require('gulp-concat');
var babel = require("gulp-babel");
const del = require('del');
var wait = require('gulp-wait')
// sass.compiler = require('node-sass');

const dest = './build';
const src = './app';
const server = '../../../Progs/OSPanel/domains/build';

const htmlPrettifyConfig = {
    unformatted: ["pre", "code", "textarea", "script"],
    indent_char: " ",
    indent_size: 4,
    preserve_newlines: true,
    brace_style: "expand",
    end_with_newline: true
};

const posthtmlConfig = {
    plugins: [
        posthtmlAttrsSorter({
            order: [
                "class",
                "id",
                "name",
                "data",
                "ng",
                "src",
                "for",
                "type",
                "href",
                "values",
                "title",
                "alt",
                "role",
                "aria"
            ]
        })
    ],
    options: {}
};

// gulp.task('clean', function () {
//     // return del.sync(server);
// });
// (async () => {
//     const deletedPaths = await del([server]);

//     console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
// })();




gulp.task('images', function () {
    return gulp.src(src + '/img/**/*')
        .pipe(gulp.dest(dest + '/img'))
});

gulp.task('style', function () {
    return gulp.src([src + '/scss/**/*.sass'])
        .pipe(plumber())
        .pipe(wait(100))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(dest + '/css'))
        // .pipe(gulp.dest(server + '/css'))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/css'))
        // .pipe(gulp.dest(server + '/css'))
        .pipe(browserSync.stream())
})

gulp.task('pug', function () {
    return gulp.src(src + "/*.pug")
        // .pipe(changed(dest, { extension: '.html' }))
        // .pipe(changed(dest + '/pug/**', { extension: '.pug' }))
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(posthtml(posthtmlConfig.plugins, posthtmlConfig.options))
        .pipe(prettify(htmlPrettifyConfig))
        .pipe(gulp.dest(dest))
        // .pipe(gulp.src(dest + '/pug/**/*.pug'))
        .pipe(browserSync.stream());
});

gulp.task('concatJs', function () {
    return gulp.src([
            // src + '/libs/js/jquery.min.js', 
            // src + '/libs/js/owl.carousel.min.js',
            src + '/libs/js/jquery.cookie.js', 
            src + '/libs/js/jquery.formstyler.min.js', 
            src + '/libs/js/jquery.waterwave.js', 
            src + '/libs/js/lazyload.js', 
            src + '/libs/js/swiper.min.js', 
            src + '/libs/js/jquery.scrollTo.min.js', 
            // src + '/libs/js/jquery.fancybox.pack.js', 
            // src + '/libs/js/hideShowPassword.min.js', 
            // src + '/libs/js/jquery.fancybox-media.js', 
            src + '/libs/js/jquery.matchHeight.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/libs/js'))
        // .pipe(gulp.dest(server + '/libs/js'))
        .pipe(browserSync.stream())
})

gulp.task('concatCss', function () {
    return gulp.src(src + '/libs/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + '/libs/css'))
        // .pipe(gulp.dest(server + '/libs/css'))
        .pipe(browserSync.stream())
})

gulp.task('html', function () {
    return gulp.src(src + '/*.html')
        .pipe(gulp.dest(dest))
        // .pipe(gulp.dest(server))
        .pipe(browserSync.stream())
})

gulp.task('php', function () {
    return gulp.src(src + '/**/*.php')
        .pipe(gulp.dest(dest))
        // .pipe(gulp.dest(server))
        .pipe(browserSync.stream())
})

gulp.task('js', function () {
    return gulp.src(src + '/js/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(concat("main.js"))
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dest + '/js'))
        // .pipe(gulp.dest(server + '/js'))
        .pipe(browserSync.stream())
})

gulp.task('watch', function () {
    // browserSync.init({
    //     server: {
    //         baseDir: dest
    //     },
    //     tunnel: true,
    //     host: 'localhost',
    //     port: 9000,
    //     logPrefix: "Frontend_Devil"
    // }
    // );
    gulp.watch(src + '/scss/**/*.sass', gulp.series('style'));
    gulp.watch(src + '/libs/js/**/*.js', gulp.series('concatJs'));
    gulp.watch(src + '/libs/css/**/*.js', gulp.series('concatCss'));
    gulp.watch(src + '/**/*.pug', gulp.series('pug'));
    gulp.watch(src + '/**/*.html', gulp.series('html'));
    gulp.watch(src + '/js/**/*.js', gulp.series('js'));
    gulp.watch(src + '/**/*.php', gulp.series('php'));
    gulp.watch(src + '/img/**/*', gulp.series('images'))
})

gulp.task('default', gulp.series('concatJs', 'concatCss', 'watch'));