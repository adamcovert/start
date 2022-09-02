// Paths
import path from '../config.js';

// Methods
import { writeFileSync } from 'fs';
import { getDirectories } from './utils/get-directories.js';

const pugMixins = (cb) => {
  let pugModules = getDirectories('pug', path.blocks);
  let mixinsList = [];
  pugModules.forEach(blockName => mixinsList += `include ${path.blocks.replace(path.root.src, '..')}${blockName}/${blockName}.pug\n`);
  writeFileSync(`src/pug/mixins.pug`, mixinsList);
  cb();
}

export default pugMixins;