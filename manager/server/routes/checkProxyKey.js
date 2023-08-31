import checkProxyKey from '../create/functions/checkProxyKey.js';
export default async function route(app, options) {
  app.get('/api/checkProxyKey', async function(request, reply) {
    const key = request.query.key;
    const check = await checkProxyKey(key);
    reply.code(200);
    return {
      valid: check,
    };
  });
}
