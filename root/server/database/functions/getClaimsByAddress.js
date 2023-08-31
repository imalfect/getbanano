import {faucetsDB} from '../mongo.js';
import {faucetClaimSchema} from '../schemas/faucetClaim.js';
import {instanceExists} from './instanceExists.js';
/* |--------------------------------------------------------------------------| */
/* |            Gives all claims address made in a given instance             | */
/* | Keep in mind that claims older than 10 days are purged from the database | */
/* |--------------------------------------------------------------------------| */

export async function getClaimsByAddress(address, instance) {
  // Check if instance exists first.
  const instanceExistsV = await instanceExists(instance);
  if (!instanceExistsV) {
    throw new Error('Instance with given name does not exist!');
  }
  // Make a model with the schema and find all claims with the address.
  const model = faucetsDB.model(instance, faucetClaimSchema, instance);
  return model.find({address: address}).lean();
}
