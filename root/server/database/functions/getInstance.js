import {FaucetConfigModel} from '../schemas/faucetConfig.js';
/* |------------------------------------------------| */
/* |               As the name says,                | */
/* |    This function returns an instance object    | */
/* |             from the instance name             | */
/* |------------------------------------------------| */

export async function getInstance(instanceName) {
  // Make sure to check if the instance exists
  return FaucetConfigModel
      .findOne({name: instanceName})
      .orFail()
      .lean();
}
