import {Schema} from 'mongoose';
import {mainDB} from '../mongo.js';
// Temp token for managing a faucet instance
export const managerTokenSchema = new Schema({
  token: String,
  faucet: String,
  expiresOn: Number,
});

export const ManagerTokenModel = mainDB.model('managertoken', managerTokenSchema);
