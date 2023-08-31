import {PendingFaucetModel} from '../schemas/pendingFaucet.js';

export async function markAsPaid(pendingInstanceId) {
  try {
    const pendingFaucet = await PendingFaucetModel.findOne({
      _id: pendingInstanceId,
    });
    pendingFaucet.payment.paid = true;
    await pendingFaucet.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
