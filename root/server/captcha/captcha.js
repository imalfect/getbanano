import {getCaptchasOlderThan} from '../database/functions/getCaptchasOlderThan.js';
import {batchDeleteCaptchas} from '../database/functions/batchDeleteCaptchas.js';

setInterval(async () => {
  const currentUnixTime = Math.floor(Date.now() / 1000);
  // eslint-disable-next-line max-len
  console.log(`Checking for captchas with expiration time past than ${currentUnixTime}...`);
  const expiredCaptchas = await getCaptchasOlderThan(currentUnixTime);
  if (expiredCaptchas.length === 0) {
    console.log('No captchas to delete');
    return;
  }
  const olderCaptchaIDs = [];
  for (const captcha of expiredCaptchas) {
    console.log(`Captcha with id ${captcha['_id']} is expired`);
    olderCaptchaIDs.push(captcha['_id']);
  }
  console.log(`Deleting ${olderCaptchaIDs.length} captchas...`);
  await batchDeleteCaptchas(olderCaptchaIDs);
  console.log('Done!');
}, 30000);
