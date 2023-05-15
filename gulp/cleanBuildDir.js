import path from '../config.js';
import del from 'del';

/**
 * Deletes files and folders in the build directory.
 * @throws Throws an error if there is an issue deleting files/folders.
 */

const cleanBuildDir = () => {
  try {
    return del(path.clean.all);
  } catch (error) {
    throw new Error(`Error deleting files/folders: ${error.message}`);
  }
};

export default cleanBuildDir;