// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import objectFitImages from 'postcss-object-fit-images';
import inlineSVG from 'postcss-inline-svg';
import postcssEasingGradients from 'postcss-easing-gradients';
import atImport from 'postcss-import';
import csso from 'gulp-csso';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const server = browserSync.create();
const { src, dest } = pkg;

const styles = () =>
  src(`src/scss/style.scss`, {
    sourcemaps: true
  })
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({
      grid: 'autoplace'
    }),
    mqpacker({
      sort: true
    }),
    atImport(),
    inlineSVG(),
    postcssEasingGradients(),
    objectFitImages()
  ]))
  .pipe(csso({
    restructure: false
  }))
  .pipe(dest(path.build.styles, {
    sourcemaps: '.'
  }))
  .pipe(server.stream());

export default styles;