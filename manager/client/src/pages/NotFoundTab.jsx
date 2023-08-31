import React from 'react';
import ItemDrawer from '../components/Sidebar';
import {Container} from '@mui/material';
import Typography from '@mui/material/Typography';
export default function NotFoundTab() {
  return (
    <>
      <ItemDrawer />
      <Container className="tab">
        <Typography variant={'h1'} gutterBottom>
          Nope. That&apos;s not a page, fellow explorer.
        </Typography>
        <Typography variant={'h2'} gutterBottom>
          Use the sidebar to get back home!
        </Typography>
      </Container>
    </>
  );
}
