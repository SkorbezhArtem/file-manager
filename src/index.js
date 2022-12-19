import { stdin, stdout, argv } from 'process';
import { createInterface } from "readline";
import os from 'os';

import ls from "./utils/ls.js";
import osUtil from './utils/os.js'
import calcHash from "./utils/hash.js";
import cd from "./utils/cd.js";
import up from "./utils/up.js";
import zip from "./utils/zip.js";
import add from "./utils/fo/add.js";
import cat from "./utils/fo/cat.js";
import cp from "./utils/fo/cp.js";
import mv from "./utils/fo/mv.js";
import remove from "./utils/fo/remove.js";
import rn from "./utils/fo/rn.js";

const args = argv[2];
export let __dirname = os.homedir();

const initCLI = args => {
    if (!args) {
        console.log('Please enter user name (--username=your_name)');
        return;
    }
    const param = args.slice(2).split('=');
    const [key, username] = param;
    if (key === 'username' && username !== '' && username !== undefined) {
        console.log(`\x1b[30;46mWelcome to the File Manager, ${username}!\x1b[0m`);
        console.log(`\x1b[36mYou are currently in ${__dirname}\x1b[0m`);
    } else {
        console.log('❌ Please, enter user name! ❌');
        return;
    }
    const rl = createInterface({input: stdin, output: stdout});
    rl.on("line", async (line) => {
        const [command, ...params] = line.includes('"') ? line.split('"')
            .map(item => item.trim())
            .filter(item => item)
        : line.split(' ')

        let promise = null;

        switch (command) {
            case 'add': {
                promise = add(params);
                break;
            }
            case 'cat': {
                promise = cat(params)
                break;
            }
            case 'cp': {
                promise = cp(params);
                break;
            }
            case 'rn': {
                promise = rn(params)
                break;
            }
            case 'rm': {
                promise = remove(params);
                break;
            }
            case 'mv': {
                promise = mv(params)
                break;
            }
            case 'ls': {
                promise = ls(__dirname);
                break;
            }
            case 'up': {
                __dirname = up();
                promise = new Promise((resolve) => resolve());
                break;
            }
            case 'os': {
                promise = osUtil(params);
                break;
            }
            case 'hash': {
                promise = calcHash(params)
                break;
            }
            case 'cd': {
                __dirname = await cd(params);
                promise = new Promise((resolve) => resolve());
                break;
            }
            case 'compress': {
                promise = zip('compress', params);
                break;
            }
            case 'decompress': {
                promise = zip('decompress', params);
                break;
            }
            case '.exit': {
                rl.close();
                break;
            }
            default: {
                promise = new Promise(res => {
                    res('\x1b[41m❌ Invalid input\x1b[0m');
                });
            }
        }


        if(!promise) return;
        promise.then(result => {
            if (result && params[0] === '--cpus') {
                if (params[0] === '--cpus') {
                    const [msg, cpus] = result;
                    console.log(msg);
                    console.table(cpus)
                }
                else console.log(result);
            }
            console.log(`\x1b[36mYou are currently in ${__dirname}\x1b[0m`);
        })
    })


    rl.on('close', () => {
        console.log(`\x1b[30;46mThank you for using File Manager, ${username}, goodbye!\x1b[0m`)
    });
}

initCLI(args);