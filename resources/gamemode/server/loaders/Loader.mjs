import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import util from 'util';

const currentPath = path.dirname(fileURLToPath(import.meta.url));
const readdir = util.promisify(fs.readdir);

export default async (dir) => {
  const loadPath = path.join(currentPath, '..', dir);
  const files = await readdir(loadPath);
  await Promise.all(files.map((file) => (async () => {
    if(file.includes(".")) {
      await import(`../${dir}/${file}`);
      console.log(`Carregado ${dir}/${file} `);
    } else {
      const loadPath = path.join(currentPath, '..', dir, file);
      const files = await readdir(loadPath);
      await Promise.all(files.map((subFile) => (async () => {
        if(subFile.includes(".")) {
          await import(`../${dir}/${file}/${subFile}`);
          console.log(`Carregado ${dir}/${file}/${subFile} `);
        } else {
          console.log('files in other folder in folder')
        }
      })()));
    }
  })()));
};
