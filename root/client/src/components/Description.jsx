import React from 'react';
import Typography from '@mui/material/Typography';
export default function Description(props) {
  return (
    <Typography
      variant="h4"
      component="h4"
      sx={{
        textAlign: 'center',
        mb: 2
      }}>
      {props.description}
    </Typography>
  )
}
