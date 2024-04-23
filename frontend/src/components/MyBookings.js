
import Navbar from './Navbar'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import NavBar from './Navbar';
import Divider from '@mui/material/Divider';
import {Grid} from '@mui/material'
import BookedEvent from './BookedEvent'
import BookedVenue from './BookedVenue'
import axios from 'axios';
import { useState, useEffect } from 'react';

const MyBookings = () => {



  let [VenueData, setVenueData] = useState([]);
  let[EventData, setEventData]  =useState([])
  const navigate = useNavigate();

  const jwt_token = sessionStorage.getItem('jwt_token')
  const headers = {
    'x-access-tokens': jwt_token,
    'role' : 'USER'
  };  

  useEffect( () => {
    
    const fetchVenueData = async () => {
      try{
      const cachedVenueData = localStorage.getItem("venue-reserved");
      console.log("CachedVenueData : ",typeof cachedVenueData);
      if (cachedVenueData) {
        console.log("Getting the cached data already stored in localstorage")
        setVenueData(cachedVenueData)
      } else{
        // console.log("fetching the data ....")
        //{{local_host}}/venue?status=&min_price=&max_price=&min_area=&max_area=&min_capacity=&max_capacity=&constructed_after=&limit=&offset=

        const resp = await axios.get("https://venue-finder-backend.onrender.com/venue-reservation",{headers});
        // console.log("Venue api hit")
        // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
        setVenueData(JSON.parse(JSON.stringify(resp.data.data)))
        // console.log(" typeof VenueData : ",typeof VenueData)
        localStorage.setItem('venue-reserved', JSON.stringify(resp.data.data));
      }
      // console.log("Venue Data",VenueData);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    localStorage.removeItem('venue-reserved')
    fetchVenueData();
    // let venues = VenueData
    // console.log(" venues : ", typeof venues)
    // console.log("VenueData : ", typeof VenueData)
    
    const fetchEventData = async () => {
      try{
      const cachedEventData = localStorage.getItem("event-reserved");
      console.log("CachedVenueData : ",typeof cachedVenueData);
      if (cachedEventData) {
        console.log("Getting the cached data already stored in localstorage")
        setVenueData(cachedEventData)
      } else{
        // console.log("fetching the data ....")
        const resp = await axios.get("https://venue-finder-backend.onrender.com/event-reservation", {headers});
        // console.log("Venue api hit")
        // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
        setEventData(JSON.parse(JSON.stringify(resp.data.data)))
        // console.log(" typeof VenueData : ",typeof VenueData)
        localStorage.setItem('event-reserved', JSON.stringify(resp.data.data));
      }
      // console.log("Venue Data",VenueData);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    localStorage.removeItem('event-reserved')
    fetchEventData();

    console.log("venue data : ", VenueData)
    console.log("event data : ", EventData)


  }, []);
  const bookedvenues = VenueData
  const bookedevents = EventData
    // const bookedvenues=[
    //     {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    //     // {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'}
        
        
    //   ]
     
    //   const bookedevents=[
    //     {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //     // {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'}
        
          
    //   ]


      
    
  return (
    <div>
        <Navbar/>
         <div display='flex' align='center'>  <Typography variant='h4' fontFamily='Charmonman' mt={'20px'} mb={'20px'}>MyBookings</Typography></div>
    
    
     <Grid container  margin={'10px'}>
    
       <Grid item xs={12} sm={6}>
       <div >
          <div display='flex' align='center' mt={'10px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Event Bookings</Typography> 

          </div> 
         
         <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {bookedevents.map((event, index) => ( <div>
        <BookedEvent
          key={index}
          id={event.id}
          event_id={event.event_id}
          payment_id={event.payment_id}
          first_name={event.first_name}
          last_name={event.last_name}
          email_id={event.email_id}
          contact={event.contact}
          ticket_count={event.ticket_count}
        />
        </div>
      ))}
      </div>
        </div>

       </Grid>

       <Grid item xs={12} sm={6} >
       <div >
          <div display='flex' align='center' mt={'10px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Venue Bookings</Typography>

          </div>

          <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {bookedvenues.map((venue, index) => ( <div>
        <BookedVenue
          key={index}
          id={venue.id}
          venue_id={venue.venue_id}
          payment_id={venue.payment_id}
          first_name={venue.first_name}
          last_name={venue.last_name}
          email_id={venue.email_id}
          contact={venue.contact}
          lease_from_date={venue.lease_from_date}
          lease_end_date={venue.lease_end_date}
        />
        </div>
      ))}
       
     
       </div>
       </div>
       </Grid>
       </Grid>
     
       

    
      
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
   



        <Footer/>
      
    </div>
  )
}

export default MyBookings
