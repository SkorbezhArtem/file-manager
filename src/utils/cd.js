import path from "path";
import fs from 'fs/promises';
import {__dirname} from "../index.js";

const cd = async([pathToDir]) => {
    try {
        pathToDir = path.isAbsolute(pathToDir) 
        ? pathToDir
        : path.join(__dirname, pathToDir);
        await fs.access(pathToDir);
        return pathToDir;
    } catch (err) {
        console.log('\x1b[41m❌ Operation failed\x1b[0m');
        return __dirname;
    }
}

export default cd;