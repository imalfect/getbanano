import InterRegular from './fonts/Inter-Regular.woff2';
import InterExtraBold from './fonts/Inter-ExtraBold.woff2';
import backgroundDark from './assets/bg-dark.png';
import backgroundColorful from './assets/bg-colorful.png';
import {createTheme} from '@mui/material';
const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'a': {
          'textDecoration': 'none',
          'color': 'white',
          '&:hover': {
            color: 'white',
          },
        },
        '.tab': { // Adding a style for elements with the class "tab"
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        },
        'body': {
          backgroundImage: `url(${backgroundColorful})`,
          backgroundSize: 'cover',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FBDD11',
    },
    secondary: {
      main: '#4CBF4B',
    },
    background: {
      default: '#141714',
      paper: '#0b0f0b',
      sidebar: '#111711',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontWeightRegular: 400,
    fontWeightBold: 800,
  },

});

// Define the @font-face declarations
const fontFaceStyles = `
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local(''),
         url(${InterRegular}) format('woff2');
  }
  
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local(''),
         url(${InterExtraBold}) format('woff2');
  }
`;

// Inject the @font-face declarations into the styleOverrides
darkTheme.components.MuiCssBaseline.styleOverrides = {
  ...darkTheme.components.MuiCssBaseline.styleOverrides,
  '@global': {
    '@font-face': fontFaceStyles,
  },
};

darkTheme.typography.h1 = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 800,
  lineHeight: 1.2,
  fontSize: 60,
};

darkTheme.typography.h2 = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 800,
  fontSize: 30,
  lineHeight: 1.2,
};

// Continue customizing typography for other variants if needed

export default darkTheme;
