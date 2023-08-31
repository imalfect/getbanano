import bcrypt from 'bcrypt';
import {FaucetConfigModel} from '../schemas/faucetConfig.js';

export async function getFaucetBySecret(name, secret) {
  // Kind of a "protected" function
  const encryptedSecret = await bcrypt.hash(secret, 10);
  const faucet = await FaucetConfigModel.findOne({name: name});
  // Check if faucet.secret matches encryptedSecret
  if (bcrypt.compare(faucet.secret, encryptedSecret)) {
    return faucet;
  } else {
    return null;
  }
}
