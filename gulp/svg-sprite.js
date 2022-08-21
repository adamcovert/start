// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';

const { src, dest } = pkg;

const svgSprite = () =>
  src(path.src.svgSprite)
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(dest(path.build.svgSprite))

export default svgSprite;