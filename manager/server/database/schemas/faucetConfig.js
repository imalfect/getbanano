import {Schema} from 'mongoose';
import {mainDB} from '../mongo.js';

export const faucetConfigSchema = new Schema({
  name: String,
  interval: Number,
  proxyCheck: Boolean,
  proxyCheckKey: String,
  captchaDifficulty: Number,
  address: String,
  reward: Number,
  seed: String, // Encrypted in AES256 using the key in the config (.env)
  secret: String, // Hashed with SHA256 (imagine it like a password)
  theme: {
    icon: String, // Either Base64 or URL
    theme: String, // Dark or Light
  },
  description: String,
  enabled: Boolean,
});

export const FaucetConfigModel = mainDB.model('faucetconfig', faucetConfigSchema);
