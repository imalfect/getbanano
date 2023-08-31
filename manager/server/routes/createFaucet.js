import {checkBody} from '../create/functions/checkBody.js';
import {instanceExists} from '../database/functions/instanceExists.js';
import dotenv from 'dotenv';
import {createPendingInstance} from '../create/functions/createPendingInstance.js';
dotenv.config();
export default async function route(app, options) {
  app.post('/api/createFaucet', async function(request, reply) {
    // Check the body
    const body = request.body;
    const bodyCheck = await checkBody(body);
    if (bodyCheck !== true) {
      console.log(bodyCheck);
      reply.code(400);
      return {error: bodyCheck.error};
    }
    // Check if the instance with the name already exists
    if (await instanceExists(body.name)) {
      reply.code(400);
      return {error: 'Instance with given name already exists!'};
    }
    // Create the instance
    const instance = await createPendingInstance(body);
    console.log(instance);
    // Return the instance ID
    reply.code(200);
    return {
      id: instance._id,
      expiresOn: instance.payment.expiresOn,
      paymentAddress: instance.payment.address,
      paymentAmount: instance.payment.amount};
  });
}
/* Expected input (example)
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
  "reward": 1,
}
 */
