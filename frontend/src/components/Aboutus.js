import React from 'react';
import myvenue1 from './assets/image2.png';
import Footer from './Footer';
import { Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
const AboutUs = () => {
  const navigate=useNavigate();
 
  const imageStyle = {
    display: 'flex',
    opacity:'1',
    backgroundImage: `url(${myvenue1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
    width: '100%',
  };
  const bgstyle={
    backgroundColor: 'black',
  };
  
  const boxstyle={
    backgroundColor: '#e4eced',
    display:'flex',
    flexWrap:'wrap',
    borderRadius:'20px',
    flexDirection:'column',
    opacity: '0.65',
    margin:'auto',
    
    backgroundPosition: 'center',
    height:'70%',
    width:'70%',
  };
  const headtextStyle = {
    
    color: 'black',
    fontSize: '2.75rem',
    fontWeight: 'bold',
    fontStyle:'italic',
    textAlign: 'center',
    paddingTop: '30px',
  };
  const subtextStyle = {
    color: 'black',
    fontSize: '1.5rem',
    
    fontFamily: 'Charmonman',
    fontStyle:'italic',
    fontWeight:'bold',
    flexWrap:'wrap',
    textAlign: 'center',
    paddingTop: '20px',
    paddingLeft:'20px',
    paddingRight:'20px',
    // paddingBottom:'20px',
  };

  return (

    <div style={bgstyle}>
      {/* <IconButton aria-label="Home">
  <HomeIcon />
</IconButton> */}
      <Button variant='outlined' color='primary' onClick={()=>navigate('/CustomerHome')} >Home</Button>
      <div style={imageStyle}>
        <div style={boxstyle}>
            <div style={headtextStyle}>About Us</div>
            <div style={subtextStyle}>Welcome to Venue Finder, your one-stop-shop for finding and booking the perfect venue for your next event! Our team is dedicated to making your event planning experience as stress-free as possible, and we believe that the right venue can make all the difference.
We know that finding the right venue can be a daunting task, especially if you're not familiar with the area or you're not sure what to look for. That's where we come in - our team of experienced professionals is here to help you every step of the way, from finding the perfect venue to booking it and beyond.

We work with a wide variety of venues, from intimate spaces for small gatherings to grand ballrooms for large events. Whatever your needs, we can help you find the perfect space to make your event a success. And with our easy-to-use booking system, you can reserve your venue with just a few clicks.
At Venue Finder, we believe that every event is unique, and we're committed to helping you create a truly memorable experience. Whether you're planning a wedding, a corporate event, or a birthday party, we're here to help you make it happen. Contact us today to learn more about our services and how we can help you find the perfect venue for your next event. 
</div>

        </div>
    </div>
    <Footer/>

    </div>
    
   
  );
  
};

export default AboutUs;
