import React from 'react';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';
import {emitter} from '../main.jsx';
import {getBananoAccountValidationInfo} from '../banano/getAccountValidationInfo.js';

const WhiteOutlineTextField = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Change this to any color you want
      borderWidth: 2
    }
  }
}));

export default function AddressField() {
  const [errored, setErrored] = React.useState(false);
  return (
    <WhiteOutlineTextField
      id="filled-basic"
      label="Address"
      variant="outlined"
      sx={{width: '100%', maxWidth: '500px'}}
      error={errored}
      onChange={(e) => {
        // Check if the address is valid
        const address = e.target.value;
        if (address.length === 0) {
          setErrored(false);
          emitter.emit('addressChange', '');
          return;
        }
        const isValid = getBananoAccountValidationInfo(address);
        if (isValid.valid) {
          setErrored(false);
          console.log('Valid Address');
          emitter.emit('addressChange', address);
        } else {
          emitter.emit('addressChange', '');
          console.log('Invalid Address');
          setErrored(true);
        }
      }}
    />
  );
}
