import path from '../config.js';
import { writeFileSync } from 'fs';
import { getDirectories } from './utils/get-directories.js';

// Define a function for generating Pug mixins
const pugMixins = (callback) => {
  // Get a list of directories in the 'pug' folder under the 'path.blocks' directory
  const pugModules = getDirectories('pug', path.blocks);
  let mixinsList = '';

  // Iterate through each directory in 'pugModules'
  pugModules.forEach((blockName) => {
    // Generate a Pug 'include' statement for each block and append it to 'mixinsList'
    mixinsList += `include ${path.blocks.replace(path.root.src, '..')}${blockName}/${blockName}.pug\n`;
  });

  // Write the generated 'mixinsList' to the 'src/pug/mixins.pug' file
  writeFileSync('src/pug/mixins.pug', mixinsList);

  // Invoke the provided callback function to signal completion
  callback();
};

// Export the pugMixins function for use in other parts of your code
export default pugMixins;
