import {createTheme} from '@mui/material/styles';
import backgroundDark from './assets/bg-dark.png';
import backgroundColorful from './assets/bg-colorful.png';
/*
  * The theme object is used to customize the look and feel of the app.
  * 0 => Dark theme
  * 1 => Light theme
 */
export const themes = [
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FBDD11'
      },
      secondary: {
        main: '#4CBF4B'
      },
      background: {
        default: '#212124',
        paper: '#212124'
      }
    },
    typography: {
      fontFamily: 'Rubik',
      fontWeightRegular: 400,
      fontWeightMedium: 500
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `url(${backgroundDark})`,
            backgroundSize: 'cover'
          }
        }
      }
    }
  }),
  createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: '#ffffff',
        secondary: '#ffffff'
      },
      primary: {
        main: '#FBDD11'
      },
      secondary: {
        main: '#4CBF4B'
      },
      background: {
        default: '#95DDED',
        paper: '#95DDED'
      }
    },
    typography: {
      fontFamily: 'Rubik',
      fontWeightRegular: 400,
      fontWeightMedium: 500
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `url(${backgroundColorful})`,
            backgroundSize: 'cover'
          }
        }
      }
    }
  })
]
