import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import VenueCard from './Venuecard'
import SpecificVenue from './SpecificVenue'
import { Component , useState, useEffect} from 'react';
import myevent1 from './assets/livemusic.png'
import myevent2 from './assets/trivianight.png'
import myevent3 from './assets/hikingtrip.png'
import { Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'
import Searched from './Search'
import axios from 'axios'


export default function Venuespage() {
    const navigate = useNavigate();

    let [VenueData, setVenueData] = useState([]);
  let[EventData, setEventData]  =useState([])

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
    


const [venueselected,setvenueselected]=useState(null)
    let VenueDetails=[
      {owner_id:'1', id:1, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:2, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:3, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:4, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:5, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:6, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:7, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:8, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:9, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:10, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:11, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
      {owner_id:'1', id:12, name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},

    ]
    const [isComponent1Visible, setComponent1Visible] = useState(true);
    let handleSeeMoreVenues = () => {
    
    
    
        // seteventselected(event);
        setComponent1Visible(!isComponent1Visible);
       
        // console.log("???????",eventselected);
    }

    
    let handleVenueSelect = (venue) => {
    
    
    
        setvenueselected(venue);
        setComponent1Visible(!isComponent1Visible);
       
        console.log("???????",venueselected);
    }
  return (
    <div>
        <Navbar/>
        <Searched venueData={VenueData} eventData={EventData}/>
        {isComponent1Visible ? 
      <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {VenueData.map((venue, index) => ( <div onClick={() => handleVenueSelect(venue)}>
        <VenueCard
          

          key={index}
          id={venue.id}
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
        <div display='flex' align='end'> <ArrowForwardIosIcon fontSize='large' onClick={()=>handleSeeMoreVenues()}  /><Typography gutterBottom='true'>View More Venues</Typography>
   </div>
       
        


        </div>}


       {/* {eventselected && <SpecificEvent event={eventselected} />} */}

     
        
        <Footer/>
      
    </div>
  )
}
