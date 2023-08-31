import React from 'react';
import BananoIcon from '../assets/banano-icon.svg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {emitter} from '../main.jsx';
import config from '../config.json';
const BalanceLabel = (props) => {
  const [balance, setBalance] = React.useState(0);
  const nf = new Intl.NumberFormat('en-US', {});
  const getAndSetBalance = async () => {
    const balance = await fetch(
      `${config.rootApi}/banano/getAddressBalance?address=${props.address}`
    ).then((res) => res.json());
    setBalance(nf.format(balance));
  };
  React.useEffect(() => {
    getAndSetBalance();
    emitter.on('claimSuccess', () => {
      getAndSetBalance();
    });
  }, []);
  return (
    <Container
      className="balance-label"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2
      }}>
      <Typography variant="h4" component="h2">
        Faucet Balance: <span style={{color: '#FBDD11'}}>{balance}</span>
      </Typography>
      <img
        src={BananoIcon}
        alt="Banano Icon"
        style={{
          height: '1.875rem',
          width: 'auto',
          maxHeight: '1.875rem',
          marginLeft: '8px'
        }}
      />
    </Container>
  );
};

export default BalanceLabel;
