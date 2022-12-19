import { rename } from "fs";
import path from "path";
import { __dirname } from "../../index.js";


const rn = ([pathToFile, newFileName]) => {
    return new Promise((res) => {
        pathToFile = path.isAbsolute(pathToFile) 
        ? pathToFile 
        : path.join(__dirname, pathToFile);

        const pathToDirectory = pathToFile.slice(0, pathToFile.lastIndexOf(path.sep));
        rename(pathToFile, path.join(pathToDirectory, newFileName), (err) => {
            !!err ? res('\x1b[41m❌ Rn: Operation failed\x1b[0m') : res(); 
        })
    })
}

export default rn;