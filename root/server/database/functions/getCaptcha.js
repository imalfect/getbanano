import {CaptchaModel} from '../schemas/captcha.js';

export async function getCaptcha(captchaId) {
  // Make sure to check if the instance exists
  return CaptchaModel
      .findOne({id: captchaId})
      .orFail()
      .lean();
}
