export function checkBody(body) {
  if (!body.instance) {
    return {valid: false, error: 'No instance name provided!'};
  }
  if (!body.address) {
    return {valid: false, error: 'No address provided!'};
  }
  if (!body.captcha) {
    return {valid: false, error: 'No captcha object provided!'};
  } else {
    if (!body.captcha.answer) {
      return {valid: false, error: 'No captcha answer provided!'};
    }
    if (!body.captcha.id) {
      return {valid: false, error: 'No captcha ID provided!'};
    }
  }
  return {valid: true};
}
