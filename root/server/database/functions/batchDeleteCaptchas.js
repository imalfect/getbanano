import {CaptchaModel} from '../schemas/captcha.js';

export async function batchDeleteCaptchas(ids) {
  // Make sure to check if the instance exists
  return CaptchaModel.deleteMany({_id: {$in: ids}});
}
