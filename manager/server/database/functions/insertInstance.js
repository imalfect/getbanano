import {FaucetConfigModel} from '../schemas/faucetConfig.js';

export async function insertInstance(instance) {
  const faucet = new FaucetConfigModel(instance);
  await faucet.save();
  return faucet;
}
