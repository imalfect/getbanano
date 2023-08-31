export function getCaptchaErrorDescription(code) {
  // 404, 410, 403
  switch (code) {
    case 404:
      return 'Captcha does not exist!';
    case 410:
      return 'Captcha has expired!';
    case 403:
      return 'Captcha answer is not valid!';
  }
}
