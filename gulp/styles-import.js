// Paths
import path from '../config.js';

// Methods
import { writeFileSync } from 'fs';
import { getDirectories } from './utils/get-directories.js';


let scssImportsList = [];

const stylesImport = (cb) => {
  const newScssImportsList = [];
  path.stylesBefore.forEach(src => {
    newScssImportsList.push(src);
  });

  let allBlocksWithScssFiles = getDirectories('scss', path.blocks);

  allBlocksWithScssFiles.forEach(blockWithScssFile => {
    let url = `${path.blocks}${blockWithScssFile}/${blockWithScssFile}.scss`;
    newScssImportsList.push(url);
  });

  let diff = getArraysDiff(newScssImportsList, scssImportsList);

  if (diff.length) {
    let styleImports = [];
    newScssImportsList.forEach(src => {
      styleImports += `@import '${src}';\n`;
    });
    writeFileSync(`src/scss/style.scss`, styleImports);
    scssImportsList = newScssImportsList;
  }
  cb();
}

function getArraysDiff(a1, a2) {
  return a1.filter(i => !a2.includes(i)).concat(a2.filter( i=> !a1.includes(i)))
}

export default stylesImport;


