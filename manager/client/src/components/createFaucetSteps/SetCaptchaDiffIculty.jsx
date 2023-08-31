import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

export default function SetCaptchaDifficultyStep(props) {
  const isSmallScreen = window.innerWidth < 750;
  const difficultyMarks = isSmallScreen ?
    [1, 2, 3, 4, 5, 6, 7].map((value) => ({value, label: value.toString()})) :
    [
      {
        value: 1,
        label: 'Robot like',
      },
      {
        value: 2,
        label: 'Slightly less easier',
      },
      {
        value: 3,
        label: 'Casual',
      },
      {
        value: 4,
        label: 'Questionable',
      },
      {
        value: 5,
        label: 'Banana',
      },
      {
        value: 6,
        label: 'Nerd',
      },
      {
        value: 7,
        label: 'Jungle Master',
      },
    ];
  const [sliderValue, setSliderValue] = React.useState(4);
  const handleSliderChange = (event, newValue) => {
    // Lock the slider values between 1 and 7
    if (newValue >= 1 && newValue <= 7) {
      props.dataUpdate({
        type: 'captchaDifficulty',
        value: newValue,
      });
      setSliderValue(newValue);
    }
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Set captcha difficulty
      </Typography>
      <Slider
        value={sliderValue}
        min={1}
        max={7}
        step={1}
        marks={difficultyMarks}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value} // Display the value on the slider thumb
      />
    </Container>
  );
}
