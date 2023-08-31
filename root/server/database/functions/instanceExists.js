import {FaucetConfigModel} from '../schemas/faucetConfig.js';
/* |----------------------------------------------------------| */
/* |             Quite an essential function here             | */
/* |                  Used in multiple files                  | */
/* |       Code made by ChatGPT, pray it doesn't break        | */
/* |----------------------------------------------------------| */

export async function instanceExists(instanceName) {
  // Check if instance exists using findOne
  const instance = FaucetConfigModel
      .findOne({name: instanceName})
      .lean();

  return !!instance;
}
