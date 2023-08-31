import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function getPendingInstances() {
  const pendingInstances = await PendingFaucetModel.find();
  return pendingInstances;
}
