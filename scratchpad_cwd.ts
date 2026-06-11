import * as fs from 'fs';
import * as path from 'path';

console.log("Current working directory:", process.cwd());
console.log("Files in cwd:", fs.readdirSync('.'));
