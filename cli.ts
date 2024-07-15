import { executeAuction } from "./src";

async function main() {
    const fs = require('fs');
    const encodedTxBytes = fs.readFileSync(0, 'utf-8').trim();
    console.log("encodedTxBytes:", encodedTxBytes);
    await executeAuction(encodedTxBytes, '');
}

main();
