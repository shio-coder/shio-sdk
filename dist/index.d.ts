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
export declare function executeAuction(encodedTxData: string, encodedSig: string, maxDelayMs?: number): Promise<void>;
declare const _default: {
    executeAuction: typeof executeAuction;
};
export default _default;
