import React, { useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import background from "./background.jpg";
import Home from './home';
import Suggest from './suggest';
import SignIn from './signIn'
import Admin from './admin'
import { getAuth, signInAnonymously } from "firebase/auth";

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HomeIcon from '@mui/icons-material/Home';

const withLink = (to, children) => <Link to={to}>{children}</Link>;
const actions = [
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/admin' element={<Admin />} />
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