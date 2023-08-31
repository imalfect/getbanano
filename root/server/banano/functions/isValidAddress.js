import bananojs from '@bananocoin/bananojs';

export function isValidAddress(address) {
  return bananojs.getBananoAccountValidationInfo(address);
}
