import {FaucetConfigModel} from '../schemas/faucetConfig.js';

export async function nameAvailable(name) {
  // Before wasting time on a request
  // check if the name is alphanumeric with no dashes or underscores
  // max 32 chars
  if (!/^[a-zA-Z0-9]{3,32}$/.test(name)) {
    return false;
  }
  const count = await FaucetConfigModel.countDocuments({name});
  return count === 0;
}
