import { createWriteStream } from "fs";
import path from "path";
import { __dirname } from "../../index.js";

const add = ([newFileName]) => {
    return new Promise((resolve) => {
        const ws = createWriteStream(path.join(__dirname, newFileName), { flags: 'wx'});
        ws.on('error', () => resolve('\x1b[41m❌ Add: Operation failed\x1b[0m'));
        ws.on('close', () => resolve())
        ws.close();
    })
}

export default add;