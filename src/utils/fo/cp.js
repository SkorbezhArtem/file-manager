import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { __dirname } from "../../index.js";

const cp = ([pathToFile, pathToNewDir]) => {
    return new Promise((resolve) => {
        pathToFile = path.isAbsolute(pathToFile) 
        ? pathToFile 
        : path.join(__dirname, pathToFile);

        pathToNewDir = path.isAbsolute(pathToNewDir) 
        ? pathToNewDir 
        : path.join(__dirname, pathToNewDir);


        const rs = createReadStream(pathToFile);
        rs.on("error", () => resolve('\x1b[41m❌ Cp: Operation failed\x1b[0m'));
        const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);
        const ws = createWriteStream(path.join(pathToNewDir, fileName));
        ws.on("error", () => resolve('\x1b[41m❌ Cp: Operation failed\x1b[0m'));
        rs.pipe(ws);
        rs.on('end', () => {
            ws.close();
            resolve()
        });
    })
}

export default cp;