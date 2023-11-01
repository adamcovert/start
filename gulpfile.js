import path from './config.js';
import pkg from 'gulp';
import browserSync from 'browser-sync';
import cleanBuildDir from './gulp/cleanBuildDir.js';
import copyFontsToBuildDir from './gulp/copyFontsToBuildDir.js';
import pugMixins from './gulp/pugMixins.js';
import compilePug from './gulp/compilePug.js';
import stylesImport from './gulp/stylesImport.js'
import styles from './gulp/styles.js';
import scripts  from './gulp/scripts.js';
import images from './gulp/images.js';
import svgSprite from './gulp/svgSprite.js';

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
  }, series(copyFontsToBuildDir, reload));
}

const _default = series(
  parallel(cleanBuildDir, pugMixins),
  parallel(compilePug, stylesImport, svgSprite, images, copyFontsToBuildDir),
  parallel(styles, scripts),
  serve
);

export { _default as default };
