import {getInstancePublic} from '../database/functions/getInstancePublic.js';

export default async function route(app, options) {
  app.get('/instances/getInstance', async function(request, reply) {
    const instanceName = request.query.name;
    const instance = await getInstancePublic(instanceName);
    reply.code(200).send(JSON.stringify(instance));
  });
}
