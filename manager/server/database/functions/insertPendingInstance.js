import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function insertPendingInstance(pendingInstance) {
  const pendingFaucet = new PendingFaucetModel(pendingInstance);
  await pendingFaucet.save();
  return pendingFaucet;
}
