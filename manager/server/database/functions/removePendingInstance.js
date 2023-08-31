import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function removePendingInstance(id) {
  try {
    await PendingFaucetModel.deleteOne({_id: id});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
