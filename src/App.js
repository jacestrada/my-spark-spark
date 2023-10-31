import React, { useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import background from "./background.jpg";
import Home from './home';
import Suggest from './suggest';
import SignIn from './signIn'
import Admin from './admin'
import About from './about'
import { getAuth, signInAnonymously } from "firebase/auth";

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HomeIcon from '@mui/icons-material/Home';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';

const withLink = (to, children) => <Link to={to}>{children}</Link>;
const actions = [
  { icon: withLink("/About", <PersonIcon />), name: 'About' },
  { icon: withLink("/suggest", <ThumbUpOffAltIcon />), name: 'Suggest' },
  { icon: withLink("/", <HomeIcon />), name: 'Home' },
];

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#aa00ff',
    },
  },
});

export default function App() {
  const handleOpen = () => setOpenDpeed(true);
  const handleClose = () => setOpenDpeed(false);
  const [openSpeed, setOpenDpeed] = React.useState(false);

  useEffect(() => {
    getAuth()

  }, []);

  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky" component="nav" sx={{
          display: "flex",
          backgroundImage: `url(${background})`
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{
              flexGrow: 1
            }}>
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="/signIn"><IconButton >
                <EngineeringIcon />
              </IconButton></Link>

            </Box>
          </Toolbar>
        </AppBar >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Backdrop open={openSpeed} />
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: 'fixed', bottom: 0, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={openSpeed}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>

      </ThemeProvider>
    </div >
  );
}