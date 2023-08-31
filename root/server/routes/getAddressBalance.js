// This function is here purely so that I can save space on the frontend
import {getBalance} from '../banano/functions/getBalance.js';

export default async function route(app, options) {
  app.get('/banano/getAddressBalance', async function (request, reply) {
    const address = request.query.address;
    const bal = await getBalance(address);
    reply.code(200).send(bal);
  });
}
