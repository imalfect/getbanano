import {FaucetConfigModel} from '../database/schemas/faucetConfig.js';
import {cryptr} from '../index.js';
import {receiveBanano} from './functions/receive.js';

setInterval(async () => {
  // Get all instances
  const instances = await FaucetConfigModel.find().lean();
  // Loop through all instances
  for (const instance of instances) {
    // Check if instance is enabled
    if (instance.enabled) {
      // Decrypt the seed
      console.log(`Receiving pending transactions for ${instance.name}`);
      const seed = cryptr.decrypt(instance.seed);
      // Receive the pending functions
      await receiveBanano(seed);
    } else {
      console.log(`Skipping ${instance.name} because it is disabled`);
    }
  }
}, 60000);
