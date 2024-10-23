import axios from 'axios';

const RPC_URL: string = 'https://rpc.getshio.com';
const DEFAULT_MAX_DELAY: number = 500; // 500ms
const AUCTION_DELAY: number = 300; // 300ms

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
export function executeAuction(encodedTxData: string, encodedSig: string, maxDelayMs: number = DEFAULT_MAX_DELAY): Promise<void> {
  const payload = {
    jsonrpc: '2.0',
    method: 'shio_executeAuction',
    params: [encodedTxData, encodedSig],
    id: 1
  };
  return new Promise((resolve, reject) => {
    // Unconditionally resolve after a delay, regardless of the response.
    setTimeout(resolve, maxDelayMs);

    axios
      .post(RPC_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: maxDelayMs,
      })
      .then((resp) => {
        // The response is not important, we just need to wait for the auction to complete.
        console.log('Shio executeAuction response:', resp.data);
        setTimeout(resolve, AUCTION_DELAY);
      })
      .catch(reject);
  });
}

export default { executeAuction };
