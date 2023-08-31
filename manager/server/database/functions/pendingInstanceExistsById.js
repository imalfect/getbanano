import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function pendingInstanceExistsById(id) {
  try {
    const instance = await PendingFaucetModel.findOne({_id: id});
    return !!instance;
  } catch (e) {
    return false;
  }
}
