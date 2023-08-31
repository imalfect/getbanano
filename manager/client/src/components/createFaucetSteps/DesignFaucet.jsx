import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import {MuiFileInput} from 'mui-file-input';
import {uploadImage} from '../../functions/uploadImage.js';
export default function DesignFaucetStep(props) {
  const [icon, setIcon] = React.useState();
  const [theme, setTheme] = React.useState({
    theme: 'dark',
  });
  const handleThemeVariantChange = (event) => {
    setTheme({
      ...theme,
      theme: event.target.value,
    });
    if (theme.icon !== undefined) {
      props.dataUpdate({
        type: 'theme',
        value: theme,
      });
    }
  };
  const handleIconFileChange = async (newFile) => {
    setIcon(newFile);
    if (newFile === null) {
      setTheme({
        ...theme,
        icon: undefined,
      });
      props.dataUpdate({
        type: 'theme',
        value: theme,
      });
      return;
    }
    // Attempt upload
    const uploadUrl = await uploadImage(newFile);
    setTheme({
      ...theme,
      icon: uploadUrl,
    });
    props.dataUpdate({
      type: 'theme',
      value: {
        ...theme,
        icon: uploadUrl,
      },
    });
  };
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Design your faucet
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{fontWeight: 700}}>
        <u>This step is still a work-in-progress.
          This means more customization options will be added
          in the future.</u>
      </Typography>
      <Grid container alignItems="center" justifyContent="center" spacing={5}>
        <Grid item>
          <Box sx={{minWidth: 120}}>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              sx={{fontWeight: 700}}>
                Theme
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="theme-select-label">Theme</InputLabel>
              <Select
                labelId="Select Theme"
                id="themeVariant"
                value={theme.theme}
                label="Theme"
                onChange={handleThemeVariantChange}
              >
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="light">Light</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{fontWeight: 700}}>
            Icon
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom>
            Upload your icon below.
          </Typography>
          <MuiFileInput
            value={icon}
            onChange={handleIconFileChange}
            sx={{width: 150}}
            inputProps={{accept: '.png, .jpeg'}}
            getInputText={(value) => value ? '' : 'Upload the icon'}/>
        </Grid>
      </Grid>
    </Container>
  );
}

