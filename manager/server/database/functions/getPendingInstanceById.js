import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function getPendingInstanceById(id) {
  const instance = await PendingFaucetModel.findOne({_id: id});
  return instance;
}
