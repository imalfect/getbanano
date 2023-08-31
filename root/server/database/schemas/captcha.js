import {Schema} from 'mongoose';
import {mainDB} from '../mongo.js';
/* |--------------------------------------------------------| */
/* |            Faucets use Black Monkey Captcha            | */
/* |    Difficulty: 1 to 7  |  Captcha expires in 5 mins    | */
/* |--------------------------------------------------------| */

export const captchaSchema = new Schema({
  monkeys: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String,
  },
  difficulty: Number,
  expiresAt: Number, // Unix Timestamp
  answer: Number,
  instance: String, // Faucet Name
});

export const CaptchaModel = mainDB.model('captcha', captchaSchema);
