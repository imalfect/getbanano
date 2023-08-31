import {FaucetConfigModel} from '../schemas/faucetConfig.js';

export async function modifyFaucet(faucetName, modifiedFaucet) {
  // Find the faucet
  const faucet = await FaucetConfigModel.findOne({name: faucetName});
  const toUpdate = {};
  // Check if the faucet exists
  if (!faucet) {
    return false;
  }
  // Update only the following fields (only if they exist in modifiedFaucet of course)
  // interval
  // proxyCheck & proxyCheckKey
  // captchaDifficulty
  // enabled
  // reward
  // theme -> icon&theme
  // Checks are already done
  if (modifiedFaucet.interval) {
    toUpdate.interval = modifiedFaucet.interval;
  }
  if (modifiedFaucet.proxyCheck) {
    toUpdate.proxyCheck = modifiedFaucet.proxyCheck;
  }
  if (modifiedFaucet.proxyCheckKey) {
    toUpdate.proxyCheckKey = modifiedFaucet.proxyCheckKey;
  }
  if (modifiedFaucet.captchaDifficulty) {
    toUpdate.captchaDifficulty = modifiedFaucet.captchaDifficulty;
  }
  if (modifiedFaucet.enabled !== undefined) {
    toUpdate.enabled = modifiedFaucet.enabled;
  }
  if (modifiedFaucet.reward) {
    toUpdate.reward = modifiedFaucet.reward;
  }
  if (modifiedFaucet.theme) {
    if (modifiedFaucet.theme.icon) {
      toUpdate.theme.icon = modifiedFaucet.theme.icon;
    }
    if (modifiedFaucet.theme.theme) {
      toUpdate.theme.theme = modifiedFaucet.theme.theme;
    }
  }
  if (modifiedFaucet.description) {
    toUpdate.description = modifiedFaucet.description;
  }
  // Update the faucet
  await FaucetConfigModel.updateOne({name: faucetName}, toUpdate);
  return true;
}
