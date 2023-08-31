import {instanceExists} from '../database/functions/instanceExists.js';
import {getInstancePublic} from '../database/functions/getInstancePublic.js';
import {generateCaptcha} from '../captcha/functions/generateCaptcha.js';
import {insertCaptcha} from '../database/functions/insertCaptcha.js';

export default async function route(app, options) {
  app.post('/captcha/generate', async function(request, reply) {
    const body = request.body;
    if (!body.instance) {
      reply.code(400);
      return {error: 'No instance name provided!'};
    }
    // Check if instance exists
    const instanceExistsV = await instanceExists(body.instance);

    if (!instanceExistsV) {
      reply.code(400);
      return {error: 'Instance with given name does not exist!'};
    }
    // Generate captcha
    const captchaDifficulty = (await getInstancePublic(body.instance))
        .captchaDifficulty;
    const captcha = await generateCaptcha(captchaDifficulty);
    // Insert captcha into database
    captcha.instance = body.instance;
    const insertedCaptcha = await insertCaptcha({
      monkeys: captcha.monkeys,
      difficulty: captcha.level,
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 5,
      instance: captcha.instance,
      answer: captcha.answer,
    });
    insertedCaptcha['__v'] = undefined;
    insertedCaptcha['answer'] = undefined;
    // Return captcha
    reply.code(200).send(JSON.stringify(insertedCaptcha));
  });
}
