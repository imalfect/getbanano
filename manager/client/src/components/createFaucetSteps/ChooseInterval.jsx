import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {convertMinutesToDHM} from '../../functions/convertMinutesToDHM.js';
const intervalOptions = [
  {label: '60m', value: 60},
  {label: '6h', value: 360},
  {label: '12h', value: 720},
  {label: '1 day', value: 1440},
  {label: '2 days', value: 2880},
  {label: '3 days', value: 4320}, // Added 3 days
  {label: '4 days', value: 5760}, // Added 4 days
  {label: '5 days', value: 7200},
  {label: '6 days', value: 8640}, // Added 6 days
  {label: '7 days', value: 10080},
];

export default function ChooseInterval(props) {
  const [interval, setInterval] = useState(60);
  const [textFieldError, setTextFieldError] = useState(false);

  const handleIntervalChange = (event, newValue) => {
    setInterval(newValue);
    if (newValue > 10080) {
      props.dataUpdate({
        type: 'interval',
        value: null,
      });
      setTextFieldError(true);
    } else {
      props.dataUpdate({
        type: 'interval',
        value: newValue,
      });
      setTextFieldError(false);
    }
  };

  const handleCustomIntervalChange = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue >= 1) {
      setInterval(Number(newValue));
    }
    if (Number(newValue) > 10080) {
      setTextFieldError(true);
      props.dataUpdate({
        type: 'interval',
        value: null,
      });
    } else {
      props.dataUpdate({
        type: 'interval',
        value: newValue,
      });
      setTextFieldError(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Select Interval
      </Typography>
      <Slider
        value={interval}
        onChange={handleIntervalChange}
        aria-labelledby="interval-slider"
        min={1}
        max={10080} // 7 days in minutes
        step={null}
        marks={intervalOptions.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
        valueLabelDisplay="auto" // Use 'auto' to prevent label collisions
        valueLabelFormat={(value) => {
          const selectedOption = intervalOptions.find(
              (option) => option.value === value,
          );
          return selectedOption ? selectedOption.label : '';
        }}
      />
      <TextField
        id="custom-interval"
        label="Custom Interval (minutes)"
        type="number"
        variant="outlined"
        value={interval}
        error={textFieldError}
        onChange={handleCustomIntervalChange}
        inputProps={{min: 1, max: 10080}}
        sx={{width: 200, mt: 1}}
      />
      <Typography
        variant="body1"
        component="p"
        sx={{mt: 1}}>
        Users will be able to claim from your faucet
        once every {convertMinutesToDHM(interval)}.
      </Typography>
    </Box>
  );
}

