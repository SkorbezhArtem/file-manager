import { __dirname } from "../index.js";
import path from "path";

const up = () => {
    return __dirname === path.parse(__dirname).root 
    ? __dirname 
    : path.join(__dirname, '../');
}

export default up;