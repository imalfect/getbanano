// Simplified version
// https://github.com/BananoCoin/bananojs/blob/master/app/scripts/banano-util.js#L1354

export const getBananoAccountValidationInfo = (account) => {
  if (account === null) {
    return {
      message: 'Invalid BANANO Account (null)',
      valid: false
    };
  }
  if (account === undefined) {
    return {
      message: 'Invalid BANANO Account (undefined)',
      valid: false
    };
  }
  if (account.length === 64) {
    if (!account.startsWith('ban_1') && !account.startsWith('ban_3')) {
      return {
        message: 'Invalid BANANO Account (does not start with ban_1 or ban_3)',
        valid: false
      };
    }
  } else {
    return {
      message: 'Invalid BANANO Account (not 64 characters)',
      valid: false
    };
  }
  const accountCrop = account.substring(4, 64);
  const isValid = /^[13456789abcdefghijkmnopqrstuwxyz]+$/.test(accountCrop);
  if (!isValid) {
    return {
      message: `Invalid BANANO account (characters after ban_ must be one of:13456789abcdefghijkmnopqrstuwxyz)`,
      valid: false
    };
  } else {
    return {
      message: 'Valid BANANO Account',
      valid: true
    };
  }
};
