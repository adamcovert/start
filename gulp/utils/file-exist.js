// Methods
import { accessSync, F_OK } from 'fs';

export function fileExist(filepath){
  let flag = true;
  try {
    accessSync(filepath, F_OK);
  } catch(e) {
    flag = false;
  }
  return flag;
}