import React from 'react';
import ItemDrawer from '../components/Sidebar';
import {Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import CreateFaucetStepper from '../components/CreateFaucetStepper.jsx';
import Paper from '@mui/material/Paper';
export default function CreateFaucetTab() {
  return (
    <>
      <ItemDrawer />
      <Container className="tab">
        <Paper sx={{boxShadow: 10, pt: 2, pb: 2, pl: 4, pr: 4, borderRadius: 3.5}}>
          <Typography variant={'h1'} gutterBottom>
            Create a Faucet
          </Typography>
          <Typography variant={'h2'} gutterBottom>
            Enter your faucet details below to create a new faucet.
          </Typography>
          <CreateFaucetStepper/>
        </Paper>

      </Container>
    </>
  );
}
