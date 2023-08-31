export default async function route(app, options) {
  app.get('/hello', async function(request, reply) {
    reply.code(418);
    return {hello: 'world'};
  });
}
