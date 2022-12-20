import { rm } from "fs";
import path from "path";
import { __dirname } from "../../index.js";


const remove = ([pathToFile]) => {
    return new Promise((res) => {
        pathToFile = path.isAbsolute(pathToFile) 
        ? pathToFile 
        : path.join(__dirname, pathToFile);
        
        rm(pathToFile, (err) => {
            !!err ? res('\x1b[41m❌ Remove: Operation failed\x1b[0m') : res();
        });
    })
}

export default remove;