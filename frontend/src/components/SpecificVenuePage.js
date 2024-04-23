import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import bgImg from './assets/image_customer_home.png';
import Venuecard from './Venuecard'
import EventCard from './EventCard'
import './CustomerHome.css'
import ImageCarousel from './ImageCarousel';
import AboutUs from './Aboutus';
import ImageText from './ImageText';
import myvenue1 from './assets/bloomingtonconventioncenter.jpg'
import myvenue2 from './assets/Indianapolismarriotdowntown.png'
import myvenue3 from './assets/wonderlab.png'
import { border } from '@mui/system';
import {bgimg} from './assets/image2.png'
import myevent1 from './assets/livemusic.png'
import myevent2 from './assets/trivianight.png'
import myevent3 from './assets/hikingtrip.png'
import TemporaryDrawer from './Sidebar';
import ContactUS from './ContactUs';
import SpecificVenue from './SpecificVenue';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
// import ContactUspage from './ContactUspage';
// const venues = [
//   { name: 'Bloomington Convention Center', price: '$500', image: myvenue1},
  
//   { name: 'Indianapolis Marriott Downtown', price: '$400', image: myvenue2 },
//   { name: 'WonderLab Museum of Science', price: '$400', image: myvenue3 }
// ];
  
function SpecificVenuePage() {
  return (
 
    <div className="App">
      
      <Navbar/>
      <SpecificVenue/>
      
     
    
   
    <Footer/> 

      </div>
    
  );
}

export default SpecificVenuePage;
