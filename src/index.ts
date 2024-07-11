import axios from 'axios';

const RPC_URL: string = 'https://rpc.getshio.com';
const RPC_TIMEOUT: number = 250; // 250ms

/**
 * Notify Shio to execute an auction with the given transaction bytes.
 * 
 * Should an auction be conducted successfully, A Soft Bundle (SIP-19) containing the user
 * transaction along with successful bids will be submitted on behalf of the user. 
 * All this happens behind the scene, and by the time executeTransactionBlock call is made to the dApp’s
 * Wallet SDK, the user transaction would have already been sequenced and executed, in whice case, 
 * the previous execution result will be returned immediately, making the whole process transparent.
 *  
 * @param encodedTxBytes Base64-encoded string of the transaction bytes.
 * @returns A promise that resolves when a sufficient delay has passed, or an error occurs.
 */
export function executeAuction(encodedTxBytes: string): Promise<void> {
  const payload = {
    jsonrpc: '2.0',
    method: 'shio_executeAuction',
    params: [encodedTxBytes],
    id: 1
  };
  return new Promise((resolve, reject) => {
    axios
      .post(RPC_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: RPC_TIMEOUT,
      })
      .then((resp) => {
        // The response is not important, we just need to wait for the auction to complete.
        console.log('Shio executeAuction response:', resp.data);
        resolve();
      })
      .catch(reject);
  });
}

export default { executeAuction };