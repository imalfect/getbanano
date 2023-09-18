import {getInstanceListPublic} from '../database/functions/getInstanceListPublic.js';

export default async function route(app, options) {
  app.get('/api/getInstanceList', async function(request, reply) {
    try {
      const instanceList = await getInstanceListPublic();
      // Remove _id from each object

      reply.code(200);
      return instanceList;
    } catch (e) {
      reply.code(500);
      return {error: 'Internal Server Error'};
    }
  });
}
