import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
dotenv.config();
export async function receiveDepositsForSeed(seed) {
  try {
    await bananojs.receiveBananoDepositsForSeed(seed, 0, process.env.BANANO_REP);
  } catch (error) {
    console.log(error);
    return false;
  }
}
