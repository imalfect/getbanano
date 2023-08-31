import checkProxyKey from './checkProxyKey.js';

export async function checkBody(body) {
  // Check if any of the required fields are missing
  if (
    !body.name ||
    !body.interval ||
    !body.captchaDifficulty ||
    !body.theme ||
    !body.theme.icon ||
    !body.theme.theme ||
    !body.reward ||
    !body.proxyCheck ||
    !body.description) {
    return {valid: false, error: 'Missing required fields!'};
  }
  // Check if the name is smaller or equal to 32 characters
  if (body.name.length > 32) {
    return {valid: false, error: 'Name is too long!'};
  }
  // Check if valid subdomain (hyphens, numbers, letters)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.name)) {
    return {valid: false, error: 'Name would not make a valid subdomain!'};
  }
  // Check if the interval is a number, and is smaller or equal to 7 days (unix)
  if (typeof body.interval !== 'number' || body.interval > 604800) {
    return {valid: false, error: 'Interval is not a valid number or is too long!'};
  }
  // Proxy check at the end.
  // Check if captcha difficulty is a number between 1-7
  if (typeof body.captchaDifficulty !== 'number' || body.captchaDifficulty < 1 || body.captchaDifficulty > 7) {
    return {valid: false, error: 'Captcha difficulty is not a valid number!'};
  }
  // Check if theme icon is a valid url (no function use built in js)
  if (!isValidHttpUrl(body.theme.icon)) {
    return {valid: false, error: 'Theme icon is not a valid url!'};
  }
  if (body.description.length > 175) {
    return {valid: false, error: 'Description is too long!'};
  }
  // Check if theme color is a valid string (dark/light)
  {
    if (typeof body.theme.theme !== 'string' || (body.theme.theme !== 'dark' && body.theme.theme !== 'light')) {
      return {valid: false, error: 'Theme colour is invalid!'};
    }
  }
  // Check if reward is a number, and is at least 0.0001
  if (typeof body.reward !== 'number' || body.reward < 0.0001) {
    return {valid: false, error: 'Reward is not a valid number!'};
  }
  // Check if proxy check is a boolean
  if (typeof body.proxyCheck !== 'boolean') {
    return {valid: false, error: 'Proxy check is not a valid boolean!'};
  }
  // If proxy check is true, check it with iphub
  if (body.proxyCheck) {
    // Check if proxy check key is a string
    if (typeof body.proxyCheckKey !== 'string') {
      return {valid: false, error: 'Proxy check key is not a valid string!'};
    }
    if (await checkProxyKey(body.proxyCheckKey) === false) {
      return {valid: false, error: 'Proxy check key is invalid!'};
    }
  }
  return true;
}
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
/* Expected input (example)
{
  "name": "test",
  "interval": 1,/* Expected input (example)
{
  "name": "test",
  "interval": 1,
  "proxyCheck": true,
  "proxyCheckKey": "test",
  "captchaDifficulty": 1,
  "theme":{
    "icon":"URL",
    "theme":"dark", // or light
  }
  "reward": "1",
}
  */
