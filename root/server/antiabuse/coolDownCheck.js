import {getClaimsByIP} from '../database/functions/getClaimsByIP.js';
import {getClaimsByAddress} from '../database/functions/getClaimsByAddress.js';
import {getInstanceCooldown} from '../database/functions/getInstanceCooldown.js';
/* |---------------------------------------------------| */
/* |               That one's a fun one                | */
/* |  Checks if user didn't claim before cooldown by:  | */
/* |                   - IP Address                    | */
/* |                 - Banano Address                  | */
/* |---------------------------------------------------| */

export async function coolDownCheck(address, ip, instance) {
  // Get all claims made by the address and IP.
  const claimsByAddress = await getClaimsByAddress(address, instance);
  const claimsByIP = await getClaimsByIP(ip, instance);
  if (claimsByAddress.length === 0 && claimsByIP.length === 0) {
    return true;
  }
  // Get the last claim made by the address and IP.
  const lastClaimByAddress = claimsByAddress[claimsByAddress.length - 1];
  const lastClaimByIP = claimsByIP[claimsByIP.length - 1];
  // Get the time of the last claim made by the address and IP.
  let lastClaimTimeByAddress = lastClaimByAddress?.claimedAt;
  let lastClaimTimeByIP = lastClaimByIP?.claimedAt;
  if (!lastClaimTimeByAddress && !lastClaimTimeByIP) {
    lastClaimTimeByAddress = 0;
    lastClaimTimeByIP = 0;
  }
  // Get the current time (UNIX timestamp).
  const currentTime = Math.floor(Date.now() / 1000);
  // Get the cooldown time from the instance.
  const cooldown = await getInstanceCooldown(instance);

  // Check if the last claim made by the address was made after the cooldown.
  const addressCooldownCheck = lastClaimTimeByAddress + cooldown < currentTime;
  // Check if the last claim made by the IP was made after the cooldown.
  const ipCooldownCheck = lastClaimTimeByIP + cooldown < currentTime;
  console.log(`Address cooldown check: ${addressCooldownCheck}`);
  console.log(`IP cooldown check: ${ipCooldownCheck}`);
  // Return the result (true if didn't pass the check, false if passed).
  return addressCooldownCheck && ipCooldownCheck;
}
