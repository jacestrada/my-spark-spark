import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import background from "./background.jpg";
import Home from './home';
import Suggest from './suggest';
import SignIn from './signIn'
import Admin from './admin'
import { getAuth, signInAnonymously } from "firebase/auth";


import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#aa00ff',
    },
  },
});


export default function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" component="nav" sx={{
            display: "flex",
            backgroundImage: `url(${background})`
          }}>
            <Toolbar>
              <Link ><IconButton onClick={handleMenu} color="inherit">
                <MenuIcon id="menu-appbar" />
              </IconButton></Link>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <Link className="links" to="/">
                  <MenuItem onClick={handleClose} >
                    <HomeIcon />
                    Home
                  </MenuItem>
                </Link>
                <Link className="links" to="/suggest">
                  <MenuItem onClick={handleClose} >
                    <ThumbUpOffAltIcon />
                    Suggest
                  </MenuItem>
                </Link>
              </Menu>
            </Toolbar>
          </AppBar >
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </ThemeProvider>
    </div >
  );
}