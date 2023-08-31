import {Schema} from 'mongoose';
import {mainDB} from '../mongo.js';
// Basically the same thing as faucetConfig, but without a few fields
export const pendingFaucetSchema = new Schema({
  name: String,
  interval: Number,
  proxyCheck: Boolean,
  proxyCheckKey: String,
  captchaDifficulty: Number,
  reward: Number,
  theme: {
    icon: String, // Either Base64 or URL
    theme: String, // Dark or Light
  },
  payment: {
    seed: String,
    address: String,
    paid: Boolean,
    expiresOn: Number,
  },
});

export const PendingFaucetModel = mainDB.model('pendingfaucet', pendingFaucetSchema);
