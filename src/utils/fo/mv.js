import { __dirname } from "../../index.js";


const mv = ([pathToFile, pathToNewDir]) => {
    return new Promise((resolve) => {
        cp([pathToFile, pathToNewDir]).then((result) => {
            !!result ? resolve(result) : resolve(remove([pathToFile]))
        })
    })
}

export default mv;