import {toast} from 'react-hot-toast';
import config from '../config.json';

export async function sendFaucetForCreation(configuration) {
  const progressToast = toast.loading('Sending the faucet to the server...');
  // First, we need to fix the proxy key here.
  if (configuration.proxyCheck) {
    configuration.proxyCheckKey = configuration.proxyCheck;
    configuration.proxyCheck = true;
  } else {
    configuration.proxyCheck = false;
  }
  configuration.reward = Number(configuration.reward);
  // We are ready to send the request
  const response = await fetch(`${config.managerApi}/api/createFaucet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(configuration),
  });
  if (response.status === 200) {
    toast.success(
        // eslint-disable-next-line max-len
        'Faucet creation request is a success! Click next to proceed with the anti-bot payment.',
        {
          id: progressToast,
        },
    );
    return await response.json();
  } else {
    const data = await response.json();
    toast.error(
        // eslint-disable-next-line max-len
        `Something went wrong while sending the faucet to the server. ${data.error}. Please refresh the site and try again.`,
        {
          id: progressToast,
        },
    );
    return null;
  }
}
