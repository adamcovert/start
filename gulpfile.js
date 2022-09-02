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
    notify: true,
  })

  watch(path.pug.watch, {
    usePolling: true,
    events: ['add', 'unlink']
  }, series(pugMixins, compilePug, reload));

  watch(path.pug.watch, {
    usePolling: true,
    events: ['change']
  }, series(compilePug, reload));

  watch(path.styles.watch, {
    usePolling: true,
    events: ['add', 'unlink']
  }, series(stylesImport, styles, reload));

  watch(path.styles.watch, {
    usePolling: true,
    events: ['change']
  }, series(styles, reload));

  watch(path.js.watch, {
    usePolling: true,
    events: ['all']
  }, series(scripts, reload));

  watch(path.svgSprite.watch, {
    usePolling: true,
    events: ['all']
  }, series(svgSprite, reload));

  watch(path.img.watch, {
    usePolling: true,
    events: ['all']
  }, series(images, reload));

  watch(path.fonts.watch, {
    usePolling: true,
    events: ['all']
  }, series(fonts, reload));
}

const _default = series(
  parallel(clean, pugMixins),
  parallel(compilePug, stylesImport, svgSprite, images, fonts),
  parallel(styles, scripts),
  serve
);

export { _default as default };
