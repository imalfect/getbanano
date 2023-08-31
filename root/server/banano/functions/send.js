import bananojs from '@bananocoin/bananojs';
import dotenv from 'dotenv';
bananojs.setBananodeApiUrl(process.env.BANANO_NODE_URL);
export async function sendBanano(seed, destination, amount) {
  try {
    console.log(seed);
    console.log(destination);
    console.log(amount);
    const tx = await bananojs.sendBananoWithdrawalFromSeed(
        seed,
        0,
        destination,
        amount);
    return tx;
  } catch (e) {
    console.log(e);
    throw new Error('Error when sending transaction.');
  }
}
