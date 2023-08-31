import React from 'react';
import Button from '@mui/material/Button';
import {emitter} from '../main.jsx';
import config from '../config.json';
import toast from 'react-hot-toast';
export default function ClaimButton() {
  const [address, setAddress] = React.useState('');
  const [monkey, setMonkey] = React.useState(null);
  const [captchaId, setCaptchaId] = React.useState(null);
  const [buttonText, setButtonText] = React.useState('Claim');
  React.useEffect(() => {
    emitter.on('addressChange', (address) => {
      setAddress(address);
    });
    emitter.on('monkeySelected', (monkey) => {
      setMonkey(monkey + 1);
    });
    emitter.on('captchaGenerated', (captcha) => {
      setCaptchaId(captcha._id);
    });
  }, []);
  const claim = async () => {
    const instance = window.location.host.split('.')[0];
    // const instance = 'root';
    // Check if the address and monkey are present
    if (address.length > 0 && monkey !== null && captchaId !== null) {
      setButtonText('Claiming...');
      const loadingToast = toast.loading('Claiming...');
      // Claim allowed
      const claimResponse = await fetch(`${config.rootApi}/instances/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: address,
          instance: instance,
          captcha: {
            id: captchaId,
            answer: monkey
          }
        })
      });
      console.log(claimResponse);
      // Check if the code is 200
      if (claimResponse.status === 200) {
        // Claimed
        emitter.emit('claimSuccess');
        toast('Claimed successfully!', {
          id: loadingToast,
          icon: '🤑'
        });
        setButtonText('Claimed!');
      } else {
        const response = await claimResponse.json();
        // Claim failed
        emitter.emit('claimFailed');
        toast.error(response.error, {
          id: loadingToast,
          icon: '😢'
        });
        setButtonText('Claim');
      }
    }
    // instance, adress, captchaz (answer,id);
  };
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={claim}
      disabled={!(address.length > 0 && monkey !== null)}
      sx={{
        width: 120,
        height: 50,
        mt: 2
      }}>
      {buttonText}
    </Button>
  );
}
