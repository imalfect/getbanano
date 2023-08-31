import {coolDownCheck} from '../antiabuse/coolDownCheck.js';
import {proxyCheck} from '../antiabuse/proxyCheck.js';
import {instanceExists} from '../database/functions/instanceExists.js';
import {isValidAddress} from '../banano/functions/isValidAddress.js';
import {checkBody} from '../claim/functions/checkBody.js';
import {getInstance} from '../database/functions/getInstance.js';
// eslint-disable-next-line max-len
import {claimFromFaucet} from '../claim/functions/claimFromFaucet.js';
import {getCaptchaErrorDescription} from '../captcha/functions/getCaptchaErrorDescription.js';
import {validateCaptcha} from '../database/functions/validateCaptcha.js';

// Yes, I am doing everything here.
export default async function route(app, options) {
  app.post('/instances/claim', async function(request, reply) {
    try {
      const body = request.body;
      // This is set to work with NGINX
      const ip = request.headers['x-forwarded-for'];
      const bodyCheck = checkBody(body);
      if (!bodyCheck.valid) {
        reply.code(400);
        return {error: bodyCheck.error};
      }
      // Check if instance exists
      if (!(await instanceExists(body.instance))) {
        reply.code(400);
        return {error: 'Instance with given name does not exist!'};
      }
      // Get instance public info
      const instance = await getInstance(body.instance);
      // Check if instance is enabled
      if (!instance.enabled) {
        reply.code(503);
        return {error: 'Instance is not enabled!'};
      }
      // Check if captcha exists and if it is valid
      const captchaCheck = await validateCaptcha(
          body.captcha.id,
          body.captcha.answer,
      );
      if (captchaCheck.valid === false) {
        reply.code(captchaCheck.error);
        return {error: getCaptchaErrorDescription(captchaCheck.error)};
      }
      // Check if the address is valid
      if (!isValidAddress(body.address)) {
        reply.code(400);
        return {error: 'Address is not valid!'};
      }
      // Check for cooldown
      const coolDownCheckResult = await coolDownCheck(
          body.address,
          ip,
          body.instance,
      );
      if (!coolDownCheckResult) {
        reply.code(429);
        return {error: 'You are on cooldown!'};
      }
      // Check for proxy
      if (instance.proxyCheck) {
        const proxyCheckResult = await proxyCheck(ip, instance.proxyCheckKey);
        if (!proxyCheckResult) {
          reply.code(403);
          return {error: 'You are using a proxy or a VPN!'};
        }
      }
      // All checks are passed
      // TODO: (maybe) add an address/ip ban system.
      // Start da claim!!
      const claim = await claimFromFaucet(instance, body.address, ip);
      // Return the claim
      reply.code(200).send(JSON.stringify(claim));
    } catch (e) {
      console.log(e);
      reply.code(500);
      return {error: 'Internal server error!'};
    }
  });
}
