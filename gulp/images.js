// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

const { src, dest } = pkg;

const images = () =>
  src(path.src.img)
  .pipe(dest(path.build.img))

export default images;