import {receiveDepositsForSeed} from './receiveDepositsForSeed.js';
// eslint-disable-next-line max-len
import {getPendingInstances} from '../../database/functions/getPendingInstances.js';
import {getBalance} from './getBalance.js';
import {drainWallet} from './drainWallet.js';
import {markAsPaid} from '../../database/functions/markAsPaid.js';
import {cryptr} from '../../utilities/cryptr.js';

setInterval(async () => {
  console.log(`Checking for pending instances...`);
  const pendingInstances = await getPendingInstances();
  console.log(`Found ${pendingInstances.length} pending instances.`);
  for (const pendingInstance of pendingInstances) {
    console.log(
        `Receiving all deposits for pending faucet ${pendingInstance.name}...`,
    );
    const seed = cryptr.decrypt(pendingInstance.payment.seed);
    await receiveDepositsForSeed(seed);
    console.log(
        `Received all deposits for pending faucet ${pendingInstance.name}.`,
    );
    // Get balance
    const balance = await getBalance(pendingInstance.payment.address);
    // If the balance is greater than fee, continue
    if (balance >= parseFloat(process.env.CREATION_FEE)) {
      console.log(`
      Balance for pending faucet ${pendingInstance.name} is greater than fee.
      `);
      // Send banano to process.env.FEE_DESTINATION
      await drainWallet(seed);
      // It's paid.
      await markAsPaid(pendingInstance._id);
    } else {
      console.log(`
      Balance for pending faucet ${pendingInstance.name} is less than fee.
      `);
    }
  }
}, 10000);
