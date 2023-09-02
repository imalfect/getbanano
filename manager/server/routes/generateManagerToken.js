import randomstring from 'randomstring';
import dotenv from 'dotenv';
import {getFaucetBySecret} from '../database/functions/getFaucetBySecret.js';
import {insertManagerToken} from '../database/functions/insertManagerToken.js';
import {countManagerTokensForFaucet} from '../database/functions/countManagerTokensForFaucet.js';
dotenv.config();
export default async function route(app, options) {
  app.post('/api/generateManagerToken', async function(request, reply) {
    try {
      const body = request.body;
      // Check if the request has the required fields
      if (!body.faucet || !body.secret) {
        reply.code(400);
        return {error: 'Missing required fields'};
      }
      // Check if the Faucet exists
      const faucet = await getFaucetBySecret(body.faucet, body.secret);
      if (!faucet) {
        reply.code(400);
        return {error: 'Invalid Faucet/Secret combination'};
      }
      // Count faucet manager tokens
      const count = await countManagerTokensForFaucet(body.faucet);
      if (count >= Number(process.env.MANAGERTOKEN_LIMIT)) {
        reply.code(429);
        return {
          // eslint-disable-next-line max-len
          error: 'Max manager tokens reached, wait until the older ones expire to continue.',
        };
      }
      // Generate a token
      const token = randomstring.generate(
          {
            length: Number(process.env.MANAGERTOKEN_LENGTH),
            // eslint-disable-next-line max-len
            charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567891@#$%^&*()_+',
          });
      // Save the token
      const savedToken = await insertManagerToken(body.faucet, token);
      savedToken.token = token;
      // Return the token
      reply.code(200);
      return savedToken;
    } catch (error) {
      console.error(error);
      reply.code(500);
      return {error: 'Internal Server Error'};
    }
  });
}
