import {ManagerTokenModel} from '../schemas/managerToken.js';
import {FaucetConfigModel} from '../schemas/faucetConfig.js';

// Get the manager token info for a given token
export async function getFaucetFromManagerToken(token) {
  const managerToken = await ManagerTokenModel.findOne({token: token});
  // Check if the token exists
  if (!managerToken) {
    return null;
  }
  // Get the Faucet
  let faucet = await FaucetConfigModel.findOne({name: managerToken.faucet});
  // Check if the Faucet exists
  if (!faucet) {
    return null;
  }
  // Return the Faucet, remove seed and secret from the response
  faucet = faucet.toObject();
  delete faucet.seed;
  delete faucet.secret;
  return faucet;
}
