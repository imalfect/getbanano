import {nameAvailable} from '../database/functions/nameAvailable.js';

export default async function route(app, options) {
  app.get('/api/nameAvailable', async function(request, reply) {
    try {
      const name = request.query.name;
      const check = await nameAvailable(name);
      reply.code(200);
      return {available: check};
    } catch (e) {
      reply.code(500);
      return {error: true};
    }
  });
}
