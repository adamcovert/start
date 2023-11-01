import path from '../config.js';
import pkg from 'gulp';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config.js';

const { src, dest } = pkg;

const scripts = () =>
  src(path.js.src)
  .pipe(webpackStream(webpackConfig))
  .pipe(dest(path.js.build))

export default scripts;