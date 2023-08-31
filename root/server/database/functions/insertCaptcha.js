import {CaptchaModel} from '../schemas/captcha.js';
import {instanceExists} from './instanceExists.js';

export async function insertCaptcha(captchaObject) {
  // Check if instance that we want to insert the captcha for exists.
  const instanceExistsV = await instanceExists(captchaObject.instance);
  if (!instanceExistsV) {
    throw new Error(
        'Instance which the captcha is supposed to be linked to does not exist!',
    );
  }
  const captcha = new CaptchaModel(captchaObject);
  return captcha.save();
}
