import {CaptchaModel} from '../schemas/captcha.js';

export async function getCaptchasOlderThan(unixTime) {
  if (typeof unixTime !== 'number') throw new Error('unixTime must be a number');
  // Make sure to check if the instance exists
  return CaptchaModel.find({expiresAt: {$lte: unixTime}}).lean();
}
