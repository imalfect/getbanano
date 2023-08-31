import React from 'react';
import Box from '@mui/material/Box';
import illustrationImage from '../assets/illustration.png';
export default function Illustration() {
  return (
    <Box sx={{width: 650, height: 650, ml: 'auto', mr: 'auto', mt: 5}}>
      <img src={illustrationImage} alt="illustration" style={{height: '100%', filter: 'invert(1)'}}/>
    </Box>

  );
}
