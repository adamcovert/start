// Paths
import path from '../config.js';

// Gulp
import pkg from 'gulp';

// Plugins
import webpackStream from 'webpack-stream';

const { src, dest } = pkg;

const scripts = () =>
  src(path.src.js)
  .pipe(webpackStream({
    mode: 'development',
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }]
    }
  }))
  .pipe(dest(path.build.js))

export default scripts;