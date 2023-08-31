import {FaucetConfigModel} from '../database/schemas/faucetConfig.js';
import {faucetClaimSchema} from '../database/schemas/faucetClaim.js';
import {faucetsDB} from '../database/mongo.js';

setInterval(async () => {
  const currentUnixTime = Math.floor(Date.now() / 1000);
  // eslint-disable-next-line max-len
  // Get all faucet configs
  const faucetConfigs = await FaucetConfigModel.find({});
  // For each faucet config
  for (const faucetConfig of faucetConfigs) {
    // Create model for claims
    const Model = faucetsDB.model(
      'faucetClaim',
      faucetClaimSchema,
      faucetConfig.name
    );
    // Get all claims
    const claims = await Model.find({});
    // For each claim
    const olderClaims = [];
    for (const claim of claims) {
      // Check if claim is older than 7 days
      if (claim.claimedAt + 60 * 60 * 24 * 7 < currentUnixTime) {
        // If it is, add it to the list of older claims
        olderClaims.push(claim);
      }
    }
    // Delete all older claims batch
    await Model.deleteMany({_id: {$in: olderClaims.map((c) => c._id)}});
    console.log(
      `Deleted ${olderClaims.length} claims from ${Model.collection.name}`
    );
  }
}, 1800000);
