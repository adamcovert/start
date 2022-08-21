// Paths
import path from './config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import browserSync from 'browser-sync';

// Tasks
import clean from './gulp/clean.js';
export { clean as clean };

import pugMixins from './gulp/pug-mixins.js';
export { pugMixins as pugMixins };

import compilePug from './gulp/pug.js';
export { compilePug as compilePug };

import stylesImport from './gulp/styles-import.js'
export { stylesImport as stylesImport }

import styles from './gulp/styles.js';
export { styles as styles };

import scripts  from './gulp/scripts.js';
export { scripts as scripts };

import fonts from './gulp/fonts.js';
export { fonts as fonts };

import images from './gulp/images.js';
export { images as images };

import svgSprite from './gulp/svg-sprite.js';
export { svgSprite as svgSprite };

const { series, parallel, watch } = pkg;
const server = browserSync.create();



function reload(done) {
  server.reload()
  done()
}


function serve() {
  server.init({
    server: 'build',
    open: false,
    notify: false,
  })

  watch([
    `${path.src.root}pages/**/*.pug`,
    `${path.src.root}blocks/**/*.pug`,
    `${path.src.root}pug/**/*.pug`
    ], {
      events: ['change']
    }, series(
    compilePug,
    reload
  ));

  watch(path.src.pug, {events: ['all']}, series(
    pugMixins,
    compilePug,
    reload
  ));

  watch([`${path.src.root}scss/*.scss`, `${path.src.root}**/*.scss`], {events: ['change']}, series(
    styles,
    reload
  ));

  watch(`${path.blocks}**/*.scss`, {events: ['add']}, series(
    stylesImport,
    styles,
    reload
  ));

  watch(`${path.src.root}js/**.js`, {events: ['all']}, series(
    scripts,
    reload
  ));

  watch([`${path.blocks}sprite-svg/svg/*.svg`], {events: ['all']}, series(
    svgSprite,
    images,
    reload,
  ));

  watch(`${path.src.root}img/**/*.{jpg,jpeg,png,gif,svg,webp}`, {events: ['all']}, series(
    images,
    reload
  ));

  watch(`${path.src.root}fonts/*`, {events: ['all']}, series(
    fonts,
    reload
  ));
}



const _default = series(
  parallel(clean, pugMixins),
  parallel(compilePug, stylesImport, svgSprite, images, fonts),
  parallel(styles, scripts),
  serve
);

export { _default as default };
