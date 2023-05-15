import { readdirSync, lstatSync } from 'fs';
import { fileExist } from './file-exist.js';
import path from 'path';

/**
 * Gets directories containing files with the specified extension in the specified source directory.
 */

export function getDirectories(ext, src) {
  const source = src;
  const res = readdirSync(source)
    .filter(item => lstatSync(path.join(source, item)).isDirectory())
    .filter(item => fileExist(path.join(source, item, `${item}.${ext}`)));
  return res;
}