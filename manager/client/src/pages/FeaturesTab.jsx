/* eslint-disable max-len */
import React from 'react';
import ItemDrawer from '../components/Sidebar';
import {Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import FeatureBox from '../components/FeatureBox.jsx';
import Grid from '@mui/material/Grid';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
export default function FeaturesTab() {
  return (
    <>
      <ItemDrawer />
      <Container className="tab" maxWidth={false}>
        <Typography variant={'h1'} gutterBottom>
          GetBanano Features
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item>
            <FeatureBox title="Fast" icon={<FlashOnRoundedIcon color="primary" sx={{fontSize: 100}}/>}>
              On top of the instant banano transactions. GetBanano uses cutting-edge libraries in order to improve the performance.
            </FeatureBox>
          </Grid>
          <Grid item>
            <FeatureBox title="Good looking" icon={<PaletteRoundedIcon color="secondary" sx={{fontSize: 100}}/>}>
              GetBanano uses <a href={'https://m2.material.io'} style={{color: '#FBDD11'}}>Google&apos;s Material Design 2 guidelines</a>. This makes the website look good on any device, and it's easy to use.
            </FeatureBox>
          </Grid>
          <Grid item>
            <FeatureBox title="Secured" icon={<LockRoundedIcon color="primary" sx={{fontSize: 100}}/>}>
              Featuring an optional anti-proxy protection, and a cool captcha. GetBanano is secured against bots and proxies.
            </FeatureBox>
          </Grid>
          <Grid item>
            <FeatureBox title="Open source" icon={<SourceRoundedIcon color="secondary" sx={{fontSize: 100}}/>}>
              GetBanano is open source. You can find the source code on <a href={'https://github.com/imalfect/getbanano'} style={{color: '#FBDD11'}}>GitHub</a>.
            </FeatureBox>
          </Grid>
        </Grid>


      </Container>
    </>
  );
}
