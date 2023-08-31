import {CaptchaModel} from '../schemas/captcha.js';
// This function is here, because it's pretty much only database access.

export async function validateCaptcha(id, answer) {
  // Check if captcha exists
  const captcha = await CaptchaModel
      .findOne({_id: id})
      .lean();

  // Check if any captcha was found
  if (!captcha) {
    // Captcha doesn't exist
    return {
      valid: false,
      error: 404,
    };
  }
  // Mark captcha as used
  await CaptchaModel.deleteOne({_id: id});
  // Check if captcha is expired
  if (captcha.expiresAt < Math.floor(Date.now() / 1000)) {
    return {
      valid: false,
      error: 410,
    };
  }

  // Check if captcha has the correct answer
  if (!(captcha.answer === answer)) {
    return {
      valid: false,
      error: 403,
    };
  }

  return {
    valid: true,
  };
}
