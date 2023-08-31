import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {checkProxyKey} from '../../functions/checkProxyKey.js';

export default function ConfigureProxyChecksStep(props) {
  const [inputValue, setInputValue] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const [proxyKeyValid, setProxyKeyValid] = React.useState(false);
  const [proxyKeyCode, setProxyKeyCode] = React.useState(0);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setProxyKeyValid(false);
    setInputValue(value);
    props.dataUpdate({
      type: 'proxyCheck',
      value: null,
    });
    setProxyKeyCode(0);
  };
  const checkKey = async () => {
    const check = await checkProxyKey(inputValue);
    if (check) {
      setProxyKeyValid(true);
      setInputError(false);
      props.dataUpdate({
        type: 'proxyCheck',
        value: inputValue,
      });
      setProxyKeyCode(200);
    } else {
      setProxyKeyValid(false);
      setInputError(true);
      props.dataUpdate({
        type: 'proxyCheck',
        value: null,
      });
      setProxyKeyCode(403);
    }
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Configure Proxy & VPN Checks
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{fontWeight: 700}}>
        This step is optional.
        {/* eslint-disable-next-line max-len */}
        If you want to enable proxy and VPN checks in order to prevent faucet abuse,
        you can do so in this step.
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{fontWeight: 700}}>
        To enable proxy and VPN checks, you need to create an <a href={'https://iphub.info'} style={{color: '#FBDD11'}} target={'_blank'} rel="noreferrer">iphub.info</a> API key.
        {/* eslint-disable-next-line max-len */}
        You can find instructions on how to obtain it <a href={'https://youtube.com/watch?v=abQLHxZPOq8'} style={{color: '#FBDD11'}}>here</a>.
      </Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <TextField
            id="ipHubApiKeyInput"
            label="IPHub API Key"
            variant="outlined"
            type="password"
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}/>
        </Grid>
        <Grid item sx={{ml: 2}}>
          <Button variant="outlined" onClick={checkKey}>Check API Key</Button>
        </Grid>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{fontWeight: 700, ml: 2}}>
          {proxyKeyCode === 200 ? 'API key valid' : ''}
          {proxyKeyCode === 429 ? 'API key invalid (Rate limited)' : ''}
          {proxyKeyCode === 403 ? 'API key invalid (Incorrect API Key)' : ''}
          {proxyKeyCode === 0 ? '' : ''}
        </Typography>
      </Grid>

    </Container>
  );
}
