import crypto from "crypto";
import fs  from "fs";
import path from "path";
import { __dirname } from "../index.js";

const calcHash = async([pathToFile]) => {
    try {
        pathToFile = path.isAbsolute(pathToFile) 
        ? pathToFile 
        : path.join(__dirname, pathToFile);
        await fs.promises.access(pathToFile);
        return new Promise((res) => {
            const hash = crypto.createHash("sha256");
            const rs = fs.createReadStream(pathToFile);
            rs.on("data", (data) => hash.update(data));
            rs.on("end", () =>  {
                res(hash.digest("hex"));
            });
        });
    } catch(err) {
        console.log('\x1b[41m❌ Operation failed\x1b[0m');
    }
}

export default calcHash;