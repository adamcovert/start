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

// import path from '../config.js';
// import pkg from 'gulp';
// import { exec } from 'child_process';
// const { src, dest } = pkg;

// /**
//  * Copies and optimizes font files to the build directory.
//  * @throws Throws an error if there is an issue copying files.
//  */

// const copyAndOptimizeFonts = (cb) => {
//   try {
//     return src(path.fonts.src, { allowEmpty: true })
//       .pipe(dest(path.fonts.build))
//       .on('end', () => {
//         // Remove unused subsets from font files
//         exec(`pyftsubset ${path.fonts.build}/*.woff2 --unicodes-file=${path.fonts.subset}`, (err) => {
//           if (err) {
//             throw new Error(`Error optimizing font files: ${err.message}`);
//           }
//           cb();
//         });
//       });
//   } catch (error) {
//     throw new Error(`Error copying font files: ${error.message}`);
//   }
// };

// export default copyAndOptimizeFonts;