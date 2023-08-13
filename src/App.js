import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './home';
import Suggest from './suggest';
import SignIn from './signIn'
import Admin from './admin'

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop,
  BottomNavigation,
} from "@mui/material";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HomeIcon from '@mui/icons-material/Home';

const withLink = (to, children) => <Link to={to}>{children}</Link>;
const actions = [
  { icon: withLink("/suggest", <ThumbUpOffAltIcon />), name: 'Suggest' },
  { icon: withLink("/", <HomeIcon />), name: 'Home' },
];
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',
  padding: '2px'
};

export default function App() {
  const handleOpen = () => setOpenDpeed(true);
  const handleClose = () => setOpenDpeed(false);
  const [openSpeed, setOpenDpeed] = React.useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suggest" element={<Suggest />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Backdrop open={openSpeed} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
      <BottomNavigation
        showLabels
      >
        <Link style={linkStyle} to="/signIn">Administrator</Link>
        <p>Copyright 2023</p>
      </BottomNavigation>
    </div>
  );
}