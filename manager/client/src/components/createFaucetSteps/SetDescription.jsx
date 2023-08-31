import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
export default function SetDescriptionStep(props) {
  const [textFieldError, setTextFieldError] = React.useState(false);
  const descriptionChanged = async (event) => {
    const name = event.target.value;
    // Check whether the name is matching the regex
    // (alphanumerics also max 32 chars)
    // Check if shorter or equal to 175
    if (name.length > 175) {
      setTextFieldError(true);
      props.dataUpdate({
        type: 'description',
        value: null,
      });
    } else {
      setTextFieldError(false);
      props.dataUpdate({
        type: 'description',
        value: name,
      });
    }
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{fontWeight: 700}}>
        Set the description
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom>
        {/* eslint-disable-next-line max-len */}
        The description should not be longer than 175 characters.
      </Typography>
      <TextField
        id="nameInput"
        label="Description"
        variant="outlined"
        error={textFieldError}
        onChange={descriptionChanged}
        sx={{width: 300}}/>
    </Container>
  );
}
