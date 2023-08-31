import bananojs from '@bananocoin/bananojs';

export async function getBalance(address) {
  try {
    const balance = await bananojs.getAccountBalanceRaw(address);
    const parts = bananojs.getBananoPartsFromRaw(balance);
    // Add banano and banoshi
    return parseFloat(parts.banano + '.' + parts.banoshi);
  } catch (error) {
    console.log(error);
    return false;
  }
}
