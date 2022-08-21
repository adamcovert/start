// Methods
import { readdirSync, lstatSync } from 'fs';
import { fileExist } from './file-exist.js';

export function getDirectories(ext, src) {
  let source = src;
  let res = readdirSync(source)
  .filter(item => lstatSync(source + item).isDirectory())
  .filter(item => fileExist(source + item + '/' + item + '.' + ext));
  return res;
}