import {FaucetConfigModel} from '../schemas/faucetConfig.js';
/* |------------------------------------------------| */
/* |           Same thing as getInstance            | */
/* |            Excluding sensitive data            | */
/* |------------------------------------------------| */

export async function getInstancePublic(instanceName) {
  // Check if instance exists using findOne
  const result = await FaucetConfigModel
      .findOne({name: instanceName})
      .orFail()
      .lean()
      .select('name interval address theme enabled reward captchaDifficulty description');
  result[`_id`] = undefined;
  result[`__v`] = undefined;
  return result;
}
