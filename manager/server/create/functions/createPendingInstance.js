import bananojs from '@bananocoin/bananojs';
import crypto from 'crypto';
import {insertPendingInstance} from '../../database/functions/insertPendingInstance.js';

import {cryptr} from '../../utilities/cryptr.js';
export async function createPendingInstance(body) {
  // Create new banano wallet
  const seed = crypto.randomBytes(32).toString('hex');
  const account = await bananojs.getBananoAccountFromSeed(seed, 0);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const encryptedSeed = cryptr.encrypt(seed);
  // Insert the pending instance
  const pendingInstance = {
    name: body.name,
    interval: body.interval,
    proxyCheck: body.proxyCheck,
    proxyCheckKey: body.proxyCheckKey,
    captchaDifficulty: body.captchaDifficulty,
    reward: body.reward,
    theme: body.theme,
    payment: {
      seed: encryptedSeed,
      address: account,
      expiresOn: currentTimestamp + 43200, // 12h
    },
    description: body.description,
    paid: false,
  };
  return await insertPendingInstance(pendingInstance);
}
