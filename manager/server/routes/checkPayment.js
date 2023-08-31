// NOTE: This endpoint on an already paid
// Instance will return the secret, and all other private credentials

// eslint-disable-next-line max-len
import {pendingInstanceExistsById} from '../database/functions/pendingInstanceExistsById.js';
// eslint-disable-next-line max-len
import {getPendingInstanceById} from '../database/functions/getPendingInstanceById.js';
import {createInstance} from '../create/functions/createInstance.js';

export default async function route(app, options, done) {
  app.get('/api/checkPayment', async function(request, reply) {
    // ID is the only required parameter
    // is in query
    const id = request.query.id;
    // Check if pending instance exists
    const pendingInstanceExists = await pendingInstanceExistsById(id);
    if (!pendingInstanceExists) {
      reply.code(400);
      return {error: 'Pending instance with given ID does not exist!'};
    }
    // If it exists, get it.
    const pendingInstance = await getPendingInstanceById(id);
    // Check if payment.paid is true
    if (!pendingInstance.payment.paid) {
      reply.code(200);
      return {paid: false};
    }
    // The next steps will create a real instance and return its details.
    // This is the only time the secret & seed will be returned.
    // Create the instance
    const instance = await createInstance(pendingInstance);
    reply.code(200);
    return {
      paid: true,
      instance: instance,
    };
  });
}
