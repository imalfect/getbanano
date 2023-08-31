import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
dotenv.config();
export async function receiveBanano(seed) {
  try {
    await bananojs.receiveBananoDepositsForSeed(
        seed,
        0,
        process.env.BANANO_REP);
  } catch (e) {
    console.log(e);
  }
}
