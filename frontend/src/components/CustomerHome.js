import React, { Component , useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import bgImg from './assets/image_customer_home.png';
import Venuecard from './Venuecard'
import Searched from './Search'
import EventCard from './EventCard'
import './CustomerHome.css'
import ImageCarousel from './ImageCarousel';
import AboutUs from './Aboutus';
import ImageText from './ImageText';
import myvenue1 from './assets/bloomingtonconventioncenter.jpg'
import myvenue2 from './assets/Indianapolismarriotdowntown.png'
import myvenue3 from './assets/wonderlab.png'
import myevent3 from './assets/livemusic.png'
import { border } from '@mui/system';
import {bgimg} from './assets/image2.png'
import SearchFilterBar from './SearchFilterBar'

import TemporaryDrawer from './Sidebar';
import ContactUS from './ContactUs';
import axios from 'axios';  
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@material-ui/core';
import SpecificEvent from './SpecificEvent';
import VenueCard from './Venuecard';
import SpecificVenue from './SpecificVenue';
import Venuespage from './Venuespage'
import GLogout from "./GoogleLogoutButton";

  

function CustomerHome() {

  let [VenueData, setVenueData] = useState([]);
  let[EventData, setEventData]  =useState([])
  let [showImage,setShowImage]=useState(true)
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
  console.log("events data from session",sessionStorage.getItem('event-data'))
  const popularvenues = VenueData.slice(0,3)
  const popularevents = EventData.slice(0,3)

  // const popularvenues=[
  //   {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'}
    
  // ]
  // const popularevents=[
  //   {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'2', name:'Cooking Class', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'3', name:'Live Music', status:'Open', entry_price:'6.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  // ]
  
  const [venueselected,setvenueselected]=useState(null)
  const [ispopularvenueVisible, setispopularvenueVisible] = useState(true);
  const [eventselected,seteventselected]=useState(null)
  const [isComponent1Visible, setisComponent1Visible] = useState(true);
  let handleEventSelect = (event) => {
    seteventselected(event);
    setisComponent1Visible(!isComponent1Visible);
    console.log("???????",eventselected);
    console.log('xyasadsdc',isComponent1Visible)
}


let handleVenueSelect = (venue) => {
  setvenueselected(venue);
  setispopularvenueVisible(!ispopularvenueVisible);
  console.log("*****",venueselected);
  console.log('666',ispopularvenueVisible)
}

  return (
 
    <div className="App">
      
      <Navbar/>
      <Searched venueData={VenueData} eventData={EventData}/>
     
      <ImageText  headtext='Welcome to Venue Finder' subtext='Get perfect venues for all your events. Find a place for a wedding, conference, party in just minutes.'/>
      <br/>
      <h1 align='center' >Popular Venues</h1>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center'}}>
        <Venuecard />

       
      
    </div> */}
     {ispopularvenueVisible ? 
      <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {popularvenues.map((venue, index) => ( <div onClick={() => handleVenueSelect(venue)}>
        <VenueCard
          key={index}
          owner_id={venue.owner_id}
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
       
     
       </div> :<div>
        <SpecificVenue venue={venueselected} />
        </div>}


    <div display='flex' align='right'> <ArrowForwardIosIcon fontSize='large' onClick={()=>navigate('/Venuespage')} /><Typography gutterBottom='true'>View More Venues</Typography></div>
    <h1 align='center' >Popular Events</h1>


    {isComponent1Visible ? 
      <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {popularevents.map((event, index) => ( <div onClick={() => handleEventSelect(event)}>
        <EventCard
          key={index}
          image={event.image_url}
          name={event.name}
          price={event.entry_price}
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
       
     
       </div> :<div>
        <SpecificEvent event={eventselected} />
        </div>}
    <div display='flex' align='right' > <ArrowForwardIosIcon fontSize='large' onClick={()=>navigate('/Eventspage')} /><Typography gutterBottom='true'>View More Events</Typography>
   </div>
    <GLogout />
    <Footer/> 

      </div>
    
  );
}

export default CustomerHome;