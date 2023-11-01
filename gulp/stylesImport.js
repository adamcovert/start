import path from '../config.js';
import { writeFileSync } from 'fs';
import { getDirectories } from './utils/get-directories.js';

// Initialize an empty array to store SCSS import statements
let scssImportsList = [];

// Define the stylesImport function
const stylesImport = (cb) => {
  // Create a new array with the contents of path.stylesBefore
  const newScssImportsList = [...path.stylesBefore];

  // Get a list of directories containing SCSS files under 'path.blocks'
  const allBlocksWithScssFiles = getDirectories('scss', path.blocks);

  // Iterate through each directory and construct the SCSS import URL
  allBlocksWithScssFiles.forEach((blockWithScssFile) => {
    const url = `${path.blocks}${blockWithScssFile}/${blockWithScssFile}.scss`;
    newScssImportsList.push(url);
  });

  // Calculate the difference between new and existing SCSS imports
  const diff = getArraysDiff(newScssImportsList, scssImportsList);

  // If there are differences, update the style.scss file
  if (diff.length) {
    // Generate SCSS import statements
    const styleImports = newScssImportsList.map((src) => `@import '${src}';`).join('\n');

    try {
      // Write the updated SCSS imports to style.scss
      writeFileSync('src/scss/style.scss', styleImports);

      // Update the scssImportsList with the new imports
      scssImportsList = newScssImportsList;

      // Log a success message
      console.log('SCSS imports updated successfully.');
    } catch (error) {
      // Handle any errors that occur during file write
      console.error('Error writing to style.scss:', error);
    }
  }

  // Invoke the provided callback function to signal completion
  cb();
}

// Function to calculate the difference between two arrays
function getArraysDiff(a1, a2) {
  return [...a1.filter((i) => !a2.includes(i)), ...a2.filter((i) => !a1.includes(i))];
}

// Export the stylesImport function
export default stylesImport;
