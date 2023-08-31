import React from 'react';
import ItemDrawer from '../components/Sidebar';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/material';
import mainBG from '../assets/main_bg.png';
import Illustration from '../components/Illustration';
export default function MainTab() {
  return (
    <>
      <ItemDrawer />
      <Container
        disableGutters
        className="tab"
      >
        <Typography variant="h1" gutterBottom>
          Welcome to GetBanano!
        </Typography>
        <Typography variant="h2" gutterBottom>
          The best way to create a BANANO faucet with no coding experience!
        </Typography>
      </Container>
    </>
  );
}
