// eslint-disable-next-line max-len
import {validateManagerToken} from '../database/functions/validateManagerToken.js';
import {checkModifyFaucetBody} from '../utilities/checkModifyFaucetBody.js';
import {modifyFaucet} from '../database/functions/modifyFaucet.js';

export default async function route(app, options) {
  app.post('/api/modifyFaucet', async function(request, reply) {
    try {
      // Check if the body contains the faucet.
      const body = request.body;
      if (!body.faucet) {
        reply.code(400);
        return {error: 'Missing faucet name'};
      }
      // Get bearer token
      const authorization = request.headers.authorization;
      console.log(authorization);
      if (!authorization) {
        reply.code(400);
        return {error: 'Missing token'};
      }
      const managerToken = authorization.split(' ')[1];
      // Check if the manager token is valid
      const valid = await validateManagerToken(managerToken, body.faucetName);
      if (!valid) {
        reply.code(403);
        return {error: 'Invalid token'};
      }
      // Quick logic checks
      const isBodyValid = await checkModifyFaucetBody(body.faucet);
      if (!isBodyValid.valid) {
        reply.code(400);
        return {error: isBodyValid.error};
      }
      await modifyFaucet(body.faucetName, body.faucet);
      reply.code(200);
      return {success: true};
    } catch (e) {
      console.log(e);
      reply.code(500);
      return {error: 'Internal server error'};
    }
  });
}
