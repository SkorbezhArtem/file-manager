import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import fs from 'fs';
import path from 'path';
import { __dirname } from '../index.js';

const fileExists = async (filePath) => {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const zip = async (operation, [pathToFile, pathToDest]) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(__dirname, pathToFile);
    let fileName = pathToFile.split(path.sep).pop();
    fileName = fileName.endsWith('.br')
      ? fileName.slice(0, -3)
      : `${fileName}.br`;
    pathToDest = path.isAbsolute(pathToDest)
      ? pathToDest
      : path.join(__dirname, pathToDest);

    if (!(await fileExists(pathToFile))) {
      return '\x1b[41m❌ Zlib: Operation failed\x1b[0m';
    }

    const rs = fs.createReadStream(pathToFile, { flags: 'r' });
    rs.on('error', () => `\x1b[1;31mOperation failed\x1b[0m\n`);

    const ws = fs.createWriteStream(path.join(pathToDest, fileName), {
      flags: 'wx',
    });
    ws.on('error', () => `\x1b[1;31mOperation failed\x1b[0m\n`);

    const zipOperation =
      operation === 'compress'
        ? createBrotliCompress()
        : operation === 'decompress'
        ? createBrotliDecompress()
        : null;

    if (zipOperation) {
      rs.pipe(
        zipOperation.on('error', () => {
          return `\x1b[1;31m${operation}: Operation failed\x1b[0m\n`;
        })
      ).pipe(ws);

      await new Promise((resolve) => ws.on('finish', resolve));
    } else {
      return `\x1b[1;31m${operation}: Operation failed\x1b[0m\n`;
    }

    return '';
  } catch (error) {
    return `\x1b[1;31m${operation}: ${error.message}\x1b[0m\n`;
  }
};

export default zip;
