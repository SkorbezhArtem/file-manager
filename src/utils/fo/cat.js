import { createReadStream } from "fs";
import path from "path";
import { __dirname } from "../../index.js";


const cat = ([pathToFile]) => {
    return new Promise((res) => {
        pathToFile = path.isAbsolute(pathToFile) 
        ? pathToFile 
        : path.join(__dirname, pathToFile)

        const rs = createReadStream(pathToFile, { flags: 'r' });
        rs.on("data", data => {
            res(`\x1b[1;32m${data.toString()}\x1b[0m`);
        })
        rs.on('error', () => {
            res('\x1b[41m❌ Cat: Operation failed\x1b[0m');
        })
    })
}


export default cat;