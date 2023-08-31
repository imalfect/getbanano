import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Typography from '@mui/material/Typography';
import {svgStringToBase64} from '../../functions/svgToBase64.js';
import Container from '@mui/material/Container';
import config from '../../config.json';
import Grid from '@mui/material/Grid';
export default function Success(props) {
  const [monKey, setMonKey] = React.useState('');
  const [isExploding, setIsExploding] = React.useState(false);
  const getMonkey = async () => {
    const image = await fetch(`https://monkey.banano.cc/api/v1/monkey/${props.address}`).then((res) => res.text());
    setMonKey(svgStringToBase64(image));
  };
  React.useEffect(() => {
    getMonkey();
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
    }, 5000);
  }, []);
  return (
    <Container>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{fontWeight: 700}}>
        🍌 Faucet created! 🍌
      </Typography>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom>
        You&apos;ve successfully created a brand new BANANO faucet!
      </Typography>
      {isExploding && <ConfettiExplosion
        colors={[
          '#FBDD11',
          '#4CBF4B',
        ]}
        style={{marginLeft: 'auto', marginRight: 'auto'}}
      />}
      <Grid container justifyContent="center" spacing={6}>
        <Grid item>
          <Typography
            variant="h4"
            component="h4"
            gutterBottom
            sx={{fontWeight: 700}}>
            Checking out your faucet
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{fontWeight: 700}}>
            You can find your faucet at&nbsp;
            <a
              href={`https://${props.name}.${config.faucetsHubDomain}`}
              style={{color: '#FBDD11'}}
              target={'_blank'}
              rel="noreferrer">
              {`${props.name}.${config.faucetsHubDomain}`}
            </a>
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            component="h4"
            gutterBottom
            sx={{fontWeight: 700}}>
            Your faucet MonKey
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{fontWeight: 700}}>
            Say hello to your new friend, the {name} faucet MonKey!
          </Typography>
          <img src={monKey} alt={'monkey'} style={{width: 250}}/>
        </Grid>
      </Grid>
    </Container>
  );
}
