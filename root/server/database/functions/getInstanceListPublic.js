
import {FaucetConfigModel} from '../schemas/faucetConfig.js';
/* |------------------------------------------------| */
/* |               As the name says,                | */
/* |    This function returns an instance object    | */
/* |             from the instance name             | */
/* |------------------------------------------------| */

export async function getInstanceListPublic() {
  // Return all facuets (make sure to not return id)
  return FaucetConfigModel.find()
      .select('-_id name interval reward description enabled address');
}
