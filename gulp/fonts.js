// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

const { src, dest } = pkg;

const fonts = () =>
  src(path.src.fonts, {
    allowEmpty: true
  })
  .pipe(dest(path.build.fonts))

export default fonts;