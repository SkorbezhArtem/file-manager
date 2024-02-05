import { __dirname } from '../../index.js';
import cp from './cp.js';
import remove from './remove.js';

const mv = ([pathToFile, pathToNewDir]) => {
  return new Promise((resolve) => {
    cp([pathToFile, pathToNewDir]).then((result) => {
      !!result ? resolve(result) : resolve(remove([pathToFile]));
    });
  });
};

export default mv;
