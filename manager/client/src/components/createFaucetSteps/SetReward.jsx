import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import BananoIcon from '../BananoIcon.jsx';
export default function SetRewardStep(props) {
  const [inputValue, setInputValue] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Use a regular expression to only allow numbers and dots
    const regex = /^[0-9.]*$/;
    if (value === '') {
      setInputValue(value);
      setInputError(false);
      props.dataUpdate({
        type: 'reward',
        value: null,
      });
      return;
    }
    if (regex.test(value)) {
      // Check if input contains - or +
      if (value.includes('-') || value.includes('+') || value.endsWith('.')) {
        setInputError(true);
        props.dataUpdate({
          type: 'reward',
          value: null,
        });
      } else {
        props.dataUpdate({
          type: 'reward',
          value: value,
        });
        setInputError(false);
        setInputValue(value);
      }
    } else {
      props.dataUpdate({
        type: 'reward',
        value: null,
      });
      setInputError(true);
    }
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Decide on the reward
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            id="bananoAmountInput"
            label="Banano Amount"
            variant="outlined"
            type="number"
            value={inputValue}
            error={inputError}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item sx={{ml: 2}}>
          <BananoIcon fontSize="large"/>
        </Grid>
      </Grid>
    </Container>
  );
}
