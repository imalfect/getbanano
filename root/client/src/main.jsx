import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import '@fontsource/rubik';
import {themes} from './themes.js';
import EventEmitter from 'eventemitter3';
export const emitter = new EventEmitter();
// eslint-disable-next-line react-refresh/only-export-components
function Website() {
  const [currentTheme, setCurrentTheme] = React.useState(themes[0]);
  emitter.on('instanceInitSuccess', (data) => {
    console.log(data);
    const theme = data.instance.theme.theme;
    if (theme === 'dark') {
      setCurrentTheme(themes[0]);
    } else if (theme === 'light') {
      setCurrentTheme(themes[1]);
    }
  });
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <Website />
);
