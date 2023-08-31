import bananojs from '@bananocoin/bananojs';
import BigNumber from 'bignumber.js';
export async function getBalance(address) {
  const bal = await bananojs.getAccountBalanceRaw(address);
  return new BigNumber(bal).shiftedBy(-29).toFixed(2);
}
