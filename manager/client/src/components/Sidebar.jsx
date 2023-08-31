import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {Link} from 'react-router-dom';
import LoginButton from './LoginButton.jsx';
const drawerWidth = 240;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ItemDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{display: 'flex'}}>

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{backgroundColor: 'background.sidebar'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(open && {display: 'none'})}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* <img src={LogoWhite} className="App-logo" alt="logo" style={{height: 40, marginTop: 7}}/>*/}
          </Typography>
          <LoginButton/>


        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          'width': drawerWidth,
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{color: 'text.icon'}} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Features', 'About'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={[`/`, `/features`, `/about`][index]} style={{textDecoration: 'none'}}>
                <ListItemButton sx={{borderRadius: 1.5}}>
                  <ListItemIcon sx={{color: 'text.icon'}}>
                    {[
                      <HomeRoundedIcon key="home"/>,
                      <ManageAccountsRoundedIcon key="features"/>,
                      <InfoRoundedIcon key="about"/>,
                    ][index % 3]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{color: 'text.sidebar'}}/>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Create Faucet', 'Manage Faucet'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link
                to={index % 2 === 0 ? `/create-faucet` : `/manage-faucet`}
                style={{textDecoration: 'none'}}
                color="primary">
                <ListItemButton sx={{borderRadius: 1.5}}>
                  <ListItemIcon sx={{color: 'text.icon'}}>
                    {index % 2 === 0 ? <PersonSearchIcon /> : <PlagiarismIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{color: 'text.sidebar'}}/>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        get them theme selector here
      </Drawer>
      <Main open={open}>

        <DrawerHeader>

        </DrawerHeader>
      </Main>
    </Box>
  );
}
