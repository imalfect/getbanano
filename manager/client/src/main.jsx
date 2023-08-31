import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import darkTheme from './theme.js';
import CssBaseline from '@mui/material/CssBaseline';
import MainTab from './pages/MainTab.jsx';
import NotFoundTab from './pages/NotFoundTab.jsx';
import CreateFaucetTab from './pages/CreateFaucetTab.jsx';
import FeaturesTab from './pages/FeaturesTab.jsx';
import AboutTab from './pages/AboutTab.jsx';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTab/>,
    errorElement: <NotFoundTab/>,
  },
  {
    path: '/create-faucet',
    element: <CreateFaucetTab/>,
    errorElement: <NotFoundTab/>,
  },
  {
    path: '/features',
    element: <FeaturesTab/>,
    errorElement: <NotFoundTab/>,
  },
  {
    path: '/about',
    element: <AboutTab/>,
    errorElement: <NotFoundTab/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={darkTheme} >
      <CssBaseline enableColorScheme/>

      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: '20px',
            borderRadius: '50px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </ThemeProvider>,
);
