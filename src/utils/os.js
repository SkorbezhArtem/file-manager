import os from 'os';

const osUtil = ([param]) => {
    return new Promise((res) => {
        if (!param) res(`\x1b[31m❌ OS: Operation failed\x1b[0m`)
        switch (param.slice(2)) {
            case 'EOL': {
                res(`\x1b[35mOS ${param.slice(2)}: ${JSON.stringify(os.EOL)}\x1b[0m`);
                break;
            }
            case 'architecture': {
                res(`\x1b[35mOS ${param.slice(2)}: ${os.arch()}\x1b[0m`);
                break;
            }
            case 'homedir': {
                res(`\x1b[35mOS ${param.slice(2)}: ${os.homedir()}\x1b[0m`);
                break;
            }
            case 'username': {
                res(`\x1b[35mOS ${param.slice(2)}: ${os.userInfo().username}\x1b[0m`);
                break;
            }
            case 'cpus': {
                const cpus = os.cpus();
                console.log(cpus);
                res([`\x1b[35mTotal CPUS count: ${cpus.length}\x1b[0m`, cpus.map(({ speed, model }) => {
                    const gHz = (speed / 1000).toFixed(2);
                    return {
                        model,
                        speed: `${gHz}GHz`
                        }
                })])
                break;
            }
            default: {
                res(`\x1b[31m❌ os ${param.slice(2)}: Operation failed\x1b[0m`);
            }
        }
    });
}

export default osUtil;