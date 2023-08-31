import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyAutoload from '@fastify/autoload';
import fastifyStatic from '@fastify/static';
import dotenv from 'dotenv';
import * as path from 'path';
// Importing here, since not much code, so don't need new directory
import './banano/banano.js';
import './create/create.js';
import {URL} from 'url';

dotenv.config();
const __dirname = new URL('.', import.meta.url).pathname;
// Move a dir back
const publicDir = path.join(__dirname, '..', 'client', 'dist');
console.log(publicDir);
const app = fastify({
  logger: {
    level: 'debug',
  },
});
await app.register(cors, {
  // put your options here
});

app.register(fastifyAutoload, {
  dir: './routes',
});
await app.register(fastifyStatic, {
  root: publicDir,
  prefix: '/', // optional: default '/'
});
app.setNotFoundHandler((request, reply) => {
  const url = request.raw.url;
  if (url !== undefined && url.startsWith('/api')) {
    reply.code(404).send({error: 'Not found'});
  } else {
    void reply.sendFile('index.html');
  }
});
app.listen(
    {
      port: 5001,
      host: '0.0.0.0',
    },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    },
);
