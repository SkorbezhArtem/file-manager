import fs from 'fs/promises';
import path from "path";

const ls = dir => {
    return new Promise(async (res) => {
        const lsArr = await fs.readdir(path.join(dir), { withFileTypes: true });
        console.log(`\x1b[36mFiles in directory ${dir}:\x1b[0m`);
        const files = lsArr.map(file => ({ 
            Name: file.name,
            Type: file.isFile() ? 'file' : 'directory'
        })).sort((a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name));
        res(console.table(files));
    })
}

export default ls;