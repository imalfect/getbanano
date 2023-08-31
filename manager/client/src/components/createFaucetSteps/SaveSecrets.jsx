import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {toast} from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
export default function SaveSecretsStep(props) {
  const [hiddenStatus, setHiddenStatus] = React.useState({
    seed: true,
    address: true,
    managementKey: true,
  });
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{fontWeight: 700}}>
        Save important information
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{fontWeight: 700}}>
        Save the following information in a safe place.&nbsp;
        It will only be shown once.
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        sx={{fontWeight: 700, mt: 1}}>
        Seed
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            id="seed"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.secrets.seed}
            type={hiddenStatus.seed ? 'password' : 'text'}/>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            disabled={hiddenStatus.seed}
            sx={{ml: 1.2}}
            onClick={() => {
              // Copy
              navigator.clipboard.writeText(props.secrets.seed);
              toast('Copied seed to clipboard!', {
                icon: '📋',
              });
            }}>Copy</Button>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setHiddenStatus({...hiddenStatus, seed: !hiddenStatus.seed});
            }}
            sx={{ml: 1}}>
            {hiddenStatus.seed ?
              <VisibilityRoundedIcon /> :
              <VisibilityOffRoundedIcon />
            }
          </IconButton>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        sx={{fontWeight: 700, mt: 1}}>
        Address
      </Typography>
      {/* Address */}
      <Grid container justifyContent="center" alignItems="center" sx={{mt: 1}}>
        <Grid item>
          <TextField
            id="address"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.secrets.address}
            type={hiddenStatus.address ? 'password' : 'text'}/>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            disabled={hiddenStatus.address}
            sx={{ml: 1.2}}
            onClick={() => {
              // Copy
              navigator.clipboard.writeText(props.secrets.address);
              toast('Copied address to clipboard!', {
                icon: '📋',
              });
            }}>Copy</Button>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setHiddenStatus(
                  {...hiddenStatus, address: !hiddenStatus.address},
              );
            }}
            sx={{ml: 1}}>
            {hiddenStatus.address ?
              <VisibilityRoundedIcon /> :
              <VisibilityOffRoundedIcon />
            }
          </IconButton>
        </Grid>
      </Grid>
      {/* Management Key */}
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        sx={{fontWeight: 700, mt: 1}}>
        Management Key
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            id="management-key"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.secrets.secret}
            type={hiddenStatus.managementKey ? 'password' : 'text'}/>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            disabled={hiddenStatus.managementKey}
            sx={{ml: 1.2}}
            onClick={() => {
              // Copy
              navigator.clipboard.writeText(props.secrets.secret);
              toast('Copied management key to clipboard!', {
                icon: '📋',
              });
            }}>Copy</Button>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setHiddenStatus(
                  {...hiddenStatus, managementKey: !hiddenStatus.managementKey},
              );
            }}
            sx={{ml: 1}}>
            {hiddenStatus.managementKey ?
              <VisibilityRoundedIcon /> :
              <VisibilityOffRoundedIcon />
            }
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}
