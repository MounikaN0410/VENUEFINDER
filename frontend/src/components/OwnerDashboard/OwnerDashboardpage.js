import React from 'react'
import SidenavOwner from './SidenavOwner'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Button from '@material-ui/core/Button';
import OwnerNavbar from './OwnerNavbar';
import Grid from '@mui/material/Grid';
import AddVenueForm from './AddVenueForm';
import AddEventForm from './AddEventForm';
import Footer from '../Footer';
import {bgImg} from'../assets/image4.png'
import ImageText from '../ImageText';
import OwnerVenueCard from './OwnerVenueCard';
import OwnerEventCard from './OwnerEventCard';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





export default function OwnerDashboardpage() {



  let [VenueData, setVenueData] = useState([]);
  let[EventData, setEventData]  =useState([])
  const navigate = useNavigate();

  useEffect( () => {
    
    const fetchVenueData = async () => {
      try{
      const cachedVenueData = localStorage.getItem("venue-data");
      console.log("CachedVenueData : ",typeof cachedVenueData);
      if (cachedVenueData) {
        console.log("Getting the cached data already stored in localstorage")
        setVenueData(cachedVenueData)
      } else{
        // console.log("fetching the data ....")
        //{{local_host}}/venue?status=&min_price=&max_price=&min_area=&max_area=&min_capacity=&max_capacity=&constructed_after=&limit=&offset=

        const resp = await axios.get("https://venue-finder-backend.onrender.com/venue?status=&min_price=&max_price=&min_area=&max_area=&min_capacity=&max_capacity=&constructed_after=&limit=&offset=");
        // console.log("Venue api hit")
        // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
        setVenueData(JSON.parse(JSON.stringify(resp.data.data)))
        // console.log(" typeof VenueData : ",typeof VenueData)
        localStorage.setItem('venue-data', JSON.stringify(resp.data.data));
      }
      // console.log("Venue Data",VenueData);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    localStorage.removeItem('venue-data')
    fetchVenueData();
    // let venues = VenueData
    // console.log(" venues : ", typeof venues)
    // console.log("VenueData : ", typeof VenueData)
    
    const fetchEventData = async () => {
      try{
      const cachedEventData = localStorage.getItem("event-data");
      console.log("CachedVenueData : ",typeof cachedVenueData);
      if (cachedEventData) {
        console.log("Getting the cached data already stored in localstorage")
        setVenueData(cachedEventData)
      } else{
        // console.log("fetching the data ....")
        const resp = await axios.get("https://venue-finder-backend.onrender.com/event");
        // console.log("Venue api hit")
        // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
        setEventData(JSON.parse(JSON.stringify(resp.data.data)))
        // console.log(" typeof VenueData : ",typeof VenueData)
        localStorage.setItem('event-data', JSON.stringify(resp.data.data));
      }
      // console.log("Venue Data",VenueData);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    localStorage.removeItem('event-data')
    fetchEventData();

    console.log("venue data : ", VenueData)
    console.log("event data : ", EventData)


  }, []);
  const ownervenues = VenueData
  const ownerevents = EventData
  console.log("events data from session",sessionStorage.getItem('event-data'))
  // const [selectedVenue, setSelectedVenue] = useState(null);
  // const ownervenues=[
  //   {owner_id:'1', id:1, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', id:2,name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', id:3,name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'}
    
  // ]
  // const ownerevents=[
  //   {host_id:'1',id:1, name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'2',id:2, name:'Cooking Class', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'3',id:3, name:'Live Music', status:'Open', entry_price:'6.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  // ]
  // const handleVenueCardClick = (venue) => {
  //   setSelectedVenue(venue);
  // }


  return (
    <div >
      <Box >
        <OwnerNavbar/>

      
         
          {/* <AddVenueForm /> */}
         
          <ImageText  headtext='Welcome to Venue Finder' subtext='Add and Manage your Events/Venues with us.'/>
          <br/>
          <div display='flex' align='center'>
          <Typography variant='h4' fontFamily={'Charmonman'}>My Venues and Events</Typography>
          </div>
          <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {ownervenues.map((venue, index) => ( <div>
        <OwnerVenueCard
          key={index}
          owner_id={venue.owner_id}
          id={venue.id}
          image={venue.image_url}
          name={venue.name}
          status={venue.status}
          lease_price={venue.lease_price}
          
          capacity={venue.capacity}
          latitude={venue.latitude}
          longitude={venue.longitude}
          area={venue.area}
          
          about={venue.about}
          restrictions={venue.restrictions}
          construction_date={venue.construction_date}
        />
        </div>
      ))}
       
     
       </div> 
       <Divider/>

       <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {ownerevents.map((event, index) => ( <div>
        <OwnerEventCard
          key={index}
          host_id={event.host_id}
          id = {event.id}
          image={event.image_url}
          name={event.name}
          entry_price={event.entry_price}
          date={event.event_date}
          status={event.status}
          latitude={event.latitude}
          longitude={event.longitude}
          guests_count={event.guests_count}
          about={event.about}
          restrictions={event.restrictions}
          event_date={event.event_date}
        />
        </div>
      ))}
       
     
       </div>
         

          {/* <AddEventForm/> */}
     
      
        <Footer/>
       
      
        </Box>
        
     
    </div>
  )
}
