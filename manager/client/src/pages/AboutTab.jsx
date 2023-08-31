import React from 'react';
import ItemDrawer from '../components/Sidebar';
import {Avatar, Container, ListItemAvatar} from '@mui/material';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CreditsList from '../components/CreditsList.jsx';
export default function AboutTab() {
  return (
    <>
      <ItemDrawer />
      <Container className="tab">
        <Typography variant={'h1'} gutterBottom>
          About GetBanano
        </Typography>
        <Typography variant={'h2'} gutterBottom>
          What&apos;s GetBanano?
        </Typography>
        <Typography variant={'h5'} gutterBottom>
          GetBanano is an open source tool that lets you create and
          manage a BANANO faucet with no coding experience.
        </Typography>
        <Typography variant={'h2'} gutterBottom sx={{mt: 3}}>
          Support
        </Typography>
        <Typography variant={'h5'} gutterBottom>
          If you need help with GetBanano, you can join our Discord server
          at <a
            href="https://discord.gg/2n35JrM8FD"
            target={'_blank'}
            rel="noreferrer"
            style={{color: '#FBDD11'}}>
          https://discord.gg/2n35JrM8FD
          </a>.
        </Typography>
        <Typography variant={'h2'} gutterBottom sx={{mt: 3}}>
          Donate
        </Typography>
        <Typography variant={'h5'} gutterBottom>
          If you&apos;d like to support the development of GetBanano, you can
          donate to the following address: <span style={{color: '#FBDD11'}}>ban_1ejxcsm9otrtzszczg3khf545uh85ckpa7bbzreontykdfiz4ufurp58msc9</span>
        </Typography>
        <Typography variant={'h2'} gutterBottom sx={{mt: 3}}>
          Credits
        </Typography>
        <CreditsList />
      </Container>
    </>
  );
}
