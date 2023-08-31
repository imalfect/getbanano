import React from 'react';
import {Container} from '@mui/material';
import {emitter} from '../main.jsx';
import Typography from '@mui/material/Typography';
import config from '../config.json';
// This function is mostly js code, quite important ngl
export default function Initiator() {
  const [isSuccess, setIsSuccess] = React.useState(true);
  React.useEffect(() => {
    async function e() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // Get the "subdomain";
      const subdomain = window.location.host.split('.')[0];
      // FOR DEV PURPOSES
      // const subdomain = 'root';
      // Try to get the instance
      const instance = await fetch(
        `${config.rootApi}/instances/getInstance?name=${subdomain}`
      );
      console.log(instance);
      // Check if the code is 200;
      if (instance.status === 200) {
        // Means the instance exists, emit event with all the info about the instance so components can tune.
        console.log('Emitting instanceInit 200');
        emitter.emit('instanceInitSuccess', {
          instance: await instance.json(),
          error: false,
          code: instance.status
        });
        // Set the state to true so the app can render
        setIsSuccess(true);
      } else {
        console.log('Emitting instanceInit error code', instance.status);
        // Likely got an error for some reason, emit event with the error so components can tune.
        emitter.emit('instanceInitFail', {
          instance: await instance.json(),
          error: true,
          code: instance.status
        });
        // Set the state to false
        setIsSuccess(false);
      }
    }
    e();
  }, []);
  return isSuccess ? (
    <Container>
      <Typography variant={'h2'} component={'h2'} gutterBottom>
        Loading...
      </Typography>
    </Container>
  ) : (
    <Container>
      <Typography variant={'h2'} component={'h2'} gutterBottom>
        Error loading instance
      </Typography>
    </Container>
  );
}
