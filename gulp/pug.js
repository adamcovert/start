// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';

const { src, dest } = pkg;

const compilePug = () =>
  src(path.src.pug)
  .pipe(pugLinter({
    reporter: 'default'
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(dest(path.build.pug))

export default compilePug;