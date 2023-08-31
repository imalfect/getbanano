import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import {toast} from 'react-hot-toast';
import config from '../../config.json';
export default function SetNameStep(props) {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const [textFieldError, setTextFieldError] = React.useState(false);
  const nameChanged = async (event) => {
    const name = event.target.value;
    // Check whether the name is matching the regex
    // (alphanumerics also max 32 chars)
    if (!name.match(/^[a-z0-9]{1,32}$/)) {
      setTextFieldError(true);
      props.dataUpdate({
        type: 'name',
        value: null,
      });
      return;
    }
    // Check for availability
    setProgressVisible(true);
    let isAvailable = await fetch(
        `${config.managerApi}/api/nameAvailable?name=${name}`,
    );
    if (isAvailable.ok) {
      isAvailable = await isAvailable.json();
      setProgressVisible(false);
      setTextFieldError(!isAvailable.available);
      if (isAvailable.available) {
        props.dataUpdate({
          type: 'name',
          value: name,
        });
      } else {
        props.dataUpdate({
          type: 'name',
          value: null,
        });
      }
    } else {
      toast('Error checking name availability', {icon: '🚨'});
      setProgressVisible(false);
      setTextFieldError(true);
    }
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{fontWeight: 700}}>
        Set the name
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom>
        {/* eslint-disable-next-line max-len */}
        The name should not be longer than 32 characters and can only contain alphanumeric characters. (only lowercase).
      </Typography>
      <TextField
        id="nameInput"
        label="Name"
        variant="outlined"
        error={textFieldError}
        onChange={nameChanged}
        sx={{width: 300}}/>
      {progressVisible ?
        <LinearProgress
          sx={{
            width: 300,
            ml: 'auto',
            mr: 'auto'}}/> :
        null}
    </Container>
  );
}
