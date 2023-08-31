import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {QRCode} from 'react-qrcode-logo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {toast} from 'react-hot-toast';
import {svgStringToBase64} from '../../functions/svgToBase64.js';
import config from '../../config.json';
export default function PaymentStep(props) {
  const [addressMonkey, setAddressMonkey] = React.useState('');
  const [qrString, setQrString] = React.useState('');
  React.useEffect(() => {
    console.log(props);
    getMonkey();
    generateQrString();
    // Await payment
    const interval1 = setInterval(async () => {
      try {
        const paymentInfo = await fetch(
            `${config.managerApi}/api/checkPayment?id=${props.paymentInfo.id}`,
        ).then((res) => res.json());
        if (paymentInfo.paid) {
          clearInterval(interval1);
          toast.success('Payment received!', {
            icon: '🤑',
          });
          props.paymentSuccess(paymentInfo.instance);
        }
      } catch (e) {
        console.log(e);
        toast.error(
            // eslint-disable-next-line max-len
            'Error checking payment status. Possible that the payment window expired. Refresh or make a new request.',
            {
              icon: '🤯',
              duration: 15000,
            });
      }
    }, 4000);
  }, [props.paymentInfo]);
  const generateQrString = () => {
    setQrString(
        // eslint-disable-next-line max-len
        `banano:${props.paymentInfo.paymentAddress}?amount=100000000000000000000000000000`,
    );
  };
  const getMonkey = async () => {
    const monKey = await fetch(`https://monkey.banano.cc/api/v1/monkey/${props.paymentInfo.paymentAddress}`).then((res) => res.text());
    setAddressMonkey(svgStringToBase64(monKey));
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Make an anti-bot payment
      </Typography>
      <Grid container
        alignItems="center"
        justifyContent="center"
        spacing={{xs: 5, md: 10, lg: 20, xl: 30}}>
        <Grid item sx={{display: {xs: 'none', md: 'flex'}}}>
          <QRCode
            value={qrString}
            size={300}
            logoImage={addressMonkey}
            logoWidth={128}
            logoHeight={128}
            fgColor="#4CBF4B"
            bgColor="#00000000"
          />
        </Grid>
        <Grid item>
          <img src={addressMonkey} alt="monkey" style={{height: 300}}/>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        component="h5" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Send
        <span style={{color: '#FBDD11'}}> 1 or more BANANO </span>
        to the address below. You can scan the QR code or copy the address.
      </Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <TextField
            id="address-info"
            label="Banano Address"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            sx={{minWidth: 300}}
            value={props.paymentInfo.paymentAddress}/>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              toast('Copied to clipboard!', {
                icon: '📋',
              });
              navigator.clipboard.writeText(props.paymentInfo.paymentAddress);
            }}
            sx={{ml: 3, aspectRatio: '1.45/1'}}>
            Copy
          </Button>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        component="h5" g
        gutterBottom
        sx={{fontWeight: 700, mt: 2}}>
        Status:&nbsp;
        <CircularProgress size={25} color={'primary'} thickness={5}/>&nbsp;
        Waiting for payment
      </Typography>
    </Container>
  );
}
