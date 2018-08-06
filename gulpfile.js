// Modules
const gulp = require("gulp");
const util = require("gulp-util");
const plumber = require("gulp-plumber");
const rename  = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");
const livereload = require("gulp-livereload");

// CSS Build Task
const buildCSS = () => {
  const src = "htdocs/css/theme/source/takeahint.scss";
  const dest = "htdocs/css/theme";

  return gulp.src(src)
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
};

exports.buildCSS = buildCSS;

// HTML Task (Triggers Reloading Only)
const minifyHTML = () => {
  const src = "htdocs/index.src.html";
  const dest = "htdocs";

  return gulp.src(src)
    .pipe(plumber())
    .pipe(rename("index.html"))
    .pipe(htmlmin({
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
};

exports.minifyHTML = minifyHTML;

// Watch Task
const watch = () => {
  livereload.listen();
  gulp.watch("htdocs/css/**/*.scss", buildCSS);
  gulp.watch("htdocs/index.src.html", minifyHTML);
};

exports.default = watch;
exports.build = gulp.parallel(buildCSS, minifyHTML);
