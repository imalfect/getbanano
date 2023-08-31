import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
export async function generateCaptcha(difficulty) {
  try {
    if (![1, 2, 3, 4, 5, 6, 7].includes(difficulty)) {
      throw new Error('Invalid difficulty');
    }
    return await fetch(
        // eslint-disable-next-line max-len
        `https://blackmonkey2api.just-dmitry.ru/get/array/?level=${difficulty}&secret=${process.env.CAPTCHA_API_KEY}`,
    )
        .then((res) => res.json());
  } catch (e) {
    console.error(e);
    throw e;
  }
}
