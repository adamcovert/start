import path from '../config.js';
import pkg from 'gulp';

const { src, dest } = pkg;

const images = () =>
  src(path.img.src)
  .pipe(dest(path.img.build))

export default images;