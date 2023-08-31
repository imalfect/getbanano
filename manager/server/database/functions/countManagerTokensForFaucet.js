import {ManagerTokenModel} from '../schemas/managerToken.js';

export async function countManagerTokensForFaucet(faucet) {
  return ManagerTokenModel.countDocuments({faucet: faucet});
}
