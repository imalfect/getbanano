import {FaucetConfigModel} from '../schemas/faucetConfig.js';

export async function instanceExists(name) {
  const instance = await FaucetConfigModel.findOne({name: name});
  return !!instance;
}
