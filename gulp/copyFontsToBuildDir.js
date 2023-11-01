import path from '../config.js';
import pkg from 'gulp';
const { src, dest } = pkg;

/**
 * Copies font files to the build directory.
 * @throws Throws an error if there is an issue copying files.
 */

const copyFontsToBuildDir = () => {
  try {
    return src(path.fonts.src, { allowEmpty: true })
      .pipe(dest(path.fonts.build));
  } catch (error) {
    throw new Error(`Error copying font files: ${error.message}`);
  }
};

export default copyFontsToBuildDir;