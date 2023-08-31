import {ManagerTokenModel} from '../schemas/managerToken.js';

// Get the manager token info for a given token
export async function getManagerTokenInfo(token) {
  return ManagerTokenModel.findOne({token: token});
}
