import {FaucetConfigModel} from '../schemas/faucetConfig.js';
/* |------------------------------------------------| */
/* |               May be left unused               | */
/* |            in favor of getInstance             | */
/* |  Gives cooldown per claim in a Unix Timestamp  | */
/* |------------------------------------------------| */

export async function getInstanceCooldown(instanceName) {
  // Check if instance exists using findOne
  const instance = await FaucetConfigModel
      .findOne({name: instanceName})
      .orFail()
      .lean();

  return instance.interval;
}
