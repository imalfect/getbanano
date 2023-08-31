import {Schema} from 'mongoose';

export const faucetClaimSchema = new Schema({
  address: String,
  ip: String,
  claimedAt: Number, // Unix Timestamp
});

/* |-------------------------------------------------------| */
/* |            There is no model for the claim            | */
/* | This is because of the way the database is structured | */
/* |-------------------------------------------------------| */

