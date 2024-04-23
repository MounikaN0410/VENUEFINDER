import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// Component imports
import DrawerAppBar from "./DrawerAppBar";
import card from "./card";
// import Footer from "./Footer";
import Grid22 from "./Grid22";
import Carousel from "./Carousel";
import Footer from "../Footer";

const Home = () => {

  const navigate = useNavigate();
  return (
    <div >
      <AppBar position="static" sx={{ backgroundColor: '#101010' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          fontStyle='italic'
          fontFamily='Charmonman'
          color='white'
          fontWeight='bold'
          noWrap
          
          >
            VENUE.FINDER
          </Typography>
          {/* <Button  color="inherit">Login</Button> */}
          <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
          <Button onClick={() => navigate("/signup")} color="inherit">SignUp</Button>
        </Toolbar>
      </AppBar>
      <Carousel />
      <Grid22 />
      <Footer />
    </div>
  );
};

export default Home;
