// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

const { src, dest } = pkg;

const fonts = () =>
  src(path.fonts.src, {
    allowEmpty: true
  })
  .pipe(dest(path.fonts.build))

export default fonts;