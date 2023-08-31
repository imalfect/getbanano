import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import {insertInstance} from '../../database/functions/insertInstance.js';
import {removePendingInstance} from '../../database/functions/removePendingInstance.js';
import {cryptr} from '../../utilities/cryptr.js';
dotenv.config();

export async function createInstance(pendingInstance) {
  try {
    // We are missing the following keys:
    // address
    // seed
    // secret
    // enabled
    // Generate a new account
    const seed = crypto.randomBytes(32).toString('hex');
    const account = await bananojs.getBananoAccountFromSeed(seed, 0);
    const encryptedSeed = cryptr.encrypt(seed);
    // Generate a new secret
    const secret = randomstring.generate({
      length: parseInt(process.env.SECRET_LENGTH),
      charset: ['alphanumeric', '!@#$%^&*()'],
    });
    const encryptedSecret = await bcrypt.hash(secret, 10);
    // insertInstance
    const instance = {
      name: pendingInstance.name,
      proxyCheck: pendingInstance.proxyCheck,
      proxyCheckKey: pendingInstance.proxyCheckKey,
      captchaDifficulty: pendingInstance.captchaDifficulty,
      address: account,
      reward: pendingInstance.reward,
      seed: encryptedSeed,
      secret: encryptedSecret,
      enabled: true,
      theme: pendingInstance.theme,
      description: pendingInstance.description,
      interval: pendingInstance.interval,
    };
    const createdInstance = await insertInstance(instance);
    // Wipe the old one
    await removePendingInstance(pendingInstance._id);
    return createdInstance;
  } catch (e) {
    console.log(e);
    return null;
  }
}
