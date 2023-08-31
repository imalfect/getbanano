import dotenv from 'dotenv';
import {ManagerTokenModel} from '../schemas/managerToken.js';
import bcrypt from 'bcrypt';
dotenv.config();

export async function insertManagerToken(faucet, token) {
  // Get the expiration date
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  // eslint-disable-next-line max-len
  const expiresOn = currentUnixTimestamp + Number(process.env.MANAGERTOKEN_EXPIRATION);
  // Create the token
  const managerToken = new ManagerTokenModel({
    token: await bcrypt.hash(token, 10),
    faucet: faucet,
    expiresOn: expiresOn,
  });
  // Save the token
  return await managerToken.save();
}
