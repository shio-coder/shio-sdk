"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAuction = executeAuction;
var axios_1 = require("axios");
var RPC_URL = 'https://rpc.getshio.com';
var DEFAULT_MAX_DELAY = 500; // 500ms
var AUCTION_DELAY = 300; // 300ms
/**
 * Notify Shio to execute an auction with the given transaction bytes.
 *
 * Should an auction be conducted successfully, A Soft Bundle (SIP-19) containing the user
 * transaction along with successful bids will be submitted on behalf of the user.
 * All this happens behind the scenes, and by the time executeTransactionBlock call is made to the dApp’s
 * Wallet SDK, the user transaction would have already been sequenced and executed, in which case,
 * the previous execution result will be returned immediately, making the whole process transparent.
 *
 * @param encodedTxData Base64-encoded string of the transaction bytes (represents TransactionData).
 * @param encodedSig Base64-encoded string of the signature bytes (represents Signature).
 * @returns A promise that resolves when a sufficient delay has passed, or an error occurs.
 *          The caller must await this promise to ensure the auction has completed.
 */
function executeAuction(encodedTxData, encodedSig, maxDelayMs) {
    if (maxDelayMs === void 0) { maxDelayMs = DEFAULT_MAX_DELAY; }
    var payload = {
        jsonrpc: '2.0',
        method: 'shio_executeAuction',
        params: [encodedTxData, encodedSig],
        id: 1
    };
    return new Promise(function (resolve, reject) {
        // Unconditionally resolve after a delay, regardless of the response.
        setTimeout(resolve, maxDelayMs);
        axios_1.default
            .post(RPC_URL, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: maxDelayMs,
        })
            .then(function (resp) {
            // The response is not important, we just need to wait for the auction to complete.
            console.log('Shio executeAuction response:', resp.data);
            setTimeout(resolve, AUCTION_DELAY);
        })
            .catch(reject);
    });
}
exports.default = { executeAuction: executeAuction };
