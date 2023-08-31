// This function already assumes that the instance exists
// And that all checks have been made
import {faucetsDB} from '../../database/mongo.js';
import {faucetClaimSchema} from '../../database/schemas/faucetClaim.js';
import {cryptr} from '../../index.js';
import {sendBanano} from '../../banano/functions/send.js';

export async function claimFromFaucet(instance, address, ip) {
  const Model = faucetsDB.model(
      'faucetClaim',
      faucetClaimSchema,
      instance.name,
  );
  const claim = new Model({
    address: address,
    ip: ip,
    claimedAt: Math.floor(Date.now() / 1000),
  });
  const claimSaved = await claim.save();
  // Decrypt the seed
  const decryptedSeed = cryptr.decrypt(instance.seed);
  // Time to send the transaction
  try {
    const tx = await sendBanano(decryptedSeed, address, instance.reward);
    // Return the transaction
    return tx;
  } catch (e) {
    // Remove the inserted claim fails
    console.log('Removing claim because sending transaction failed');
    Model.findByIdAndRemove(claimSaved._id);
    throw e;
  }
}
