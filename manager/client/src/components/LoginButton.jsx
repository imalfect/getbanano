import React from "react";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import {Login} from '@mui/icons-material';
export default function LoginButton() {
  return (
    <IconButton
      size="large"
      color={'inherit'}
      aria-label="open drawer"
      sx={{ml: 'auto', borderRadius: 3}}>
      <LoginIcon />
      <Typography variant="h5" noWrap component="div" sx={{ml: 1}}>
        Login
      </Typography>
    </IconButton>
  )
}
