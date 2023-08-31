import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
import {getBalance} from './getBalance.js';
dotenv.config();
export async function drainWallet(seed) {
  try {
    const account = await bananojs.getBananoAccountFromSeed(seed, 0);
    console.log(`Draining wallet ${account}...`);
    const balance = await getBalance(account);
    if (balance > 0) {
      console.log('yes');
      await bananojs.sendBananoWithdrawalFromSeed(
          seed,
          0,
          process.env.FEE_DESTINATION,
          balance,
          process.env.BANANO_REP,
      );
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
