import checkProxyKey from '../create/functions/checkProxyKey.js';
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
export async function checkModifyFaucetBody(modifiedFaucet) {
  // Check if interval is a number, and is smaller or equal to 7 days (unix)
  if (modifiedFaucet.interval) {
    if (
      typeof modifiedFaucet.interval !== 'number' ||
      modifiedFaucet.interval > 604800) {
      return {valid: false, error: 'Interval is not a valid number or is too long!'};
    }
  }
  // Check description (max 175 chars)
  if (modifiedFaucet.description) {
    if (modifiedFaucet.description.length > 175) {
      return {valid: false, error: 'Description is too long!'};
    }
  }
  if (modifiedFaucet.captchaDifficulty) {
    if (
      typeof modifiedFaucet.captchaDifficulty !== 'number' ||
      modifiedFaucet.captchaDifficulty < 1 ||
      modifiedFaucet.captchaDifficulty > 7) {
      return {valid: false, error: 'Captcha difficulty is not a valid number!'};
    }
  }
  if (modifiedFaucet.theme) {
    // Check if theme icon is a valid url (no function use built in js)
    if (modifiedFaucet.theme.icon) {
      if (!isValidHttpUrl(modifiedFaucet.theme.icon)) {
        return {valid: false, error: 'Theme icon is not a valid url!'};
      }
    }
    // Check if theme color is a valid string (dark/light)
    if (modifiedFaucet.theme.theme) {
      if (
        typeof modifiedFaucet.theme.theme !== 'string' ||
        (modifiedFaucet.theme.theme !== 'dark' &&
          modifiedFaucet.theme.theme !== 'light')) {
        return {valid: false, error: 'Theme colour is invalid!'};
      }
    }
  }


  // Check if reward is a number, and is at least 0.0001
  if (modifiedFaucet.reward) {
    if (
      typeof modifiedFaucet.reward !== 'number' ||
      modifiedFaucet.reward < 0.0001) {
      return {valid: false, error: 'Reward is not a valid number!'};
    }
  }

  // Check if proxy check is a boolean
  if (modifiedFaucet.proxyCheck) {
    if (typeof modifiedFaucet.proxyCheck !== 'boolean') {
      return {valid: false, error: 'Proxy check is not a valid boolean!'};
    }
    if (modifiedFaucet.proxyCheckKey) {
      // Check if proxy check key is a string
      if (typeof modifiedFaucet.proxyCheckKey !== 'string') {
        return {valid: false, error: 'Proxy check key is not a valid string!'};
      }
      if (await checkProxyKey(modifiedFaucet.proxyCheckKey) === false) {
        return {valid: false, error: 'Proxy check key is invalid!'};
      }
    } else {
      return {valid: false, error: 'Proxy check key is missing!'};
    }
  }
  if (modifiedFaucet.enabled !== undefined) {
    if (typeof modifiedFaucet.enabled !== 'boolean') {
      return {valid: false, error: 'Enabled is not a valid boolean!'};
    }
  }
  return {valid: true};
}

// If proxy check is true, check it with iphub

// Check if the interval is a number, and is smaller or equal to 7 days (unix)

// Proxy check at the end.
// Check if captcha difficulty is a number between 1-7
