import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { __dirname } from '../../index.js';
import fsPromises from 'fs/promises';

const cp = async ([pathToFile, pathToNewDir]) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(__dirname, pathToFile);

    pathToNewDir = path.isAbsolute(pathToNewDir)
      ? pathToNewDir
      : path.join(__dirname, pathToNewDir);

    await fsPromises.access(pathToFile);

    const rs = createReadStream(pathToFile);
    rs.on('error', () => {
      console.error('\x1b[41m❌ Cp: Read operation failed\x1b[0m');
      throw new Error('Read operation failed');
    });

    const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);
    const ws = createWriteStream(path.join(pathToNewDir, fileName));
    ws.on('error', () => {
      console.error('\x1b[41m❌ Cp: Write operation failed\x1b[0m');
      throw new Error('Write operation failed');
    });

    rs.pipe(ws);

    await new Promise((resolve) => {
      rs.on('end', () => {
        ws.close();
        resolve();
      });
    });
  } catch (error) {
    console.error('\x1b[41m❌ Cp: Write operation failed\x1b[0m');
  }
};

export default cp;
