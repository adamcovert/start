// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import objectFitImages from 'postcss-object-fit-images';
import inlineSVG from 'postcss-inline-svg';
import postcssEasingGradients from 'postcss-easing-gradients';
import atImport from 'postcss-import';
import csso from 'gulp-csso';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import postcssLogical from 'postcss-logical';
// import lightningcss from 'gulp-lightningcss';

const sass = gulpSass(dartSass);
const server = browserSync.create();
const { src, dest } = pkg;

const styles = () =>
  src(path.styles.src, { sourcemaps: true })
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer({ grid: 'autoplace' }),
    atImport(),
    inlineSVG(),
    postcssEasingGradients(),
    objectFitImages(),
    postcssLogical()
  ]))
  .pipe(csso({
    restructure: false,
    beautify: true,
    debug: true,
    forceMediaMerge: true
  }))
  .pipe(dest(path.styles.build, { sourcemaps: '.' }))
  .pipe(server.stream());

export default styles;