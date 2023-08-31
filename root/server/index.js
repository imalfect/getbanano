import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyAutoload from '@fastify/autoload';
import fastifyStatic from '@fastify/static';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import {URL} from 'url';
import './banano/banano.js';
import './captcha/captcha.js';
import './claim/claim.js';
import * as path from 'path';
dotenv.config();
const __dirname = new URL('.', import.meta.url).pathname;
// Move a dir back
const publicDir = path.join(__dirname, '..', 'client', 'dist');
console.log(publicDir);
// __dirname = ;
export const cryptr = new Cryptr(process.env.DB_ENCRYPTION_KEY);
const app = fastify({
  logger: true,
});
await app.register(cors, {
  // put your options here
});
await app.register(fastifyStatic, {
  root: publicDir,
  prefix: '/', // optional: default '/'
});
app.register(fastifyAutoload, {
  dir: './routes',
});

app.listen(
    {
      port: 5000,
      host: '0.0.0.0',
    },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    },
);
