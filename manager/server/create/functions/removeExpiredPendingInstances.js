import {getPendingInstances} from '../../database/functions/getPendingInstances.js';
import chalk from 'chalk';
import {removePendingInstance} from '../../database/functions/removePendingInstance.js';
// Get all pending instances
async function removeExpiredPendingInstances() {
  // Get all pending instances
  const pendingInstances = await getPendingInstances();
  console.log(
      chalk.yellow(`Found ${pendingInstances.length} pending instances.`),
  );
  // Loop through all pending instances
  const currentUnixTime = Math.floor(Date.now() / 1000);
  // Add an extra minute just in case the server is slow
  const expiringTime = currentUnixTime + 60;
  for (const pendingInstance of pendingInstances) {
    // If the pending instance was created more than 2 minutes ago, delete it
    if (pendingInstance.payment.expiresOn < expiringTime) {
      console.log(
          chalk.yellow(
              `Payment window for ${pendingInstance.name} has expired.`,
          ));
      console.log(
          chalk.yellow(`Deleting pending instance ${pendingInstance.name}...`),
      );
      // Delete the pending instance
      await removePendingInstance(pendingInstance[`_id`]);
    }
  }
}

setInterval(async () => {
  await removeExpiredPendingInstances();
}, 10000);
