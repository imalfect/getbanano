import React from 'react';
import Paper from '@mui/material/Paper';
import {emitter} from '../main.jsx';
import {CircularProgress} from '@mui/material';

export default function MonKey(props) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!props.src) {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
    }
  }, [props]);
  return (
    <Paper
      elevation={3}
      onClick={() => {
        if (isLoaded) {
          emitter.emit('monkeySelected', props.id);
        }
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Added this line to center the content vertically
        aspectRatio: '1/1',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '10px',
        borderColor: props.selected ? '#4CBF4B' : '#fff',
        cursor: 'pointer'
      }}>
      {isLoaded ? (
        <img src={props.src} alt="monKey" />
      ) : (
        <CircularProgress size={60} />
      )}
    </Paper>
  );
}
