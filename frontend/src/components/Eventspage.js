import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import EventCard from './EventCard'
import SpecificEvent from './SpecificEvent'
import { Component , useState, useEffect} from 'react';
import myevent1 from './assets/livemusic.png'
import myevent2 from './assets/trivianight.png'
import myevent3 from './assets/hikingtrip.png'
import { Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Eventspage() {
    const navigate = useNavigate();
    let [VenueData, setVenueData] = useState([]);
  let[EventData, setEventData]  =useState([])


    useEffect( () => {
    
      
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


const [eventselected,seteventselected]=useState(null)
      // let EventDetails = sessionStorage.getItem('event-data')
      // console.log(sessionStorage.getItem('event-data'))
    // let EventDetails=[
    //     {host_id:'1',id:1, name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'2',id:2, name:'Cooking Class', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'3',id:3, name:'Live Music', status:'Open', entry_price:'6.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'4',id:4, name:'Trivia', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'5',id:5, name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'6',id:6, name:'Concert', status:'Closed', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'29', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'7',id:7, name:'Cooking Class', status:'Open', entry_price:'19.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'8',id:8, name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'67', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'9',id:9, name:'Gamenight', status:'Open', entry_price:'15.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'10',id:10, name:'Live Music', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'11',id:11, name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    //   {host_id:'12',id:12, name:'Karaoke Night', status:'Closed', entry_price:'18', latitude:'39.1653', longitude:'-86.5264', guests_count:'25', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    // ]
    const [isComponent1Visible, setComponent1Visible] = useState(true);
    let handleSeeMoreEvents = () => {
    
    
    
        // seteventselected(event);
        setComponent1Visible(!isComponent1Visible);
       
        // console.log("???????",eventselected);
    }

    
    let handleEventSelect = (event) => {
    
    
    
        seteventselected(event);
        setComponent1Visible(!isComponent1Visible);
       
        console.log("???????",eventselected);
    }


    // console.log("EVENT DATA Id: ",EventData[0].id)
  return (
    <div>
        <Navbar/>
        {isComponent1Visible ? 
      <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {EventData.map((event, index) => ( <div onClick={() => handleEventSelect(event)}>
        <EventCard
          key={index}
          host_id={event.host_id}
          id={event.id}
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
        <div display='flex' align='end'> <ArrowForwardIosIcon fontSize='large' onClick={()=>handleSeeMoreEvents()}  /><Typography gutterBottom='true'>View More Events</Typography>
   </div>
       
        


        </div>}


       {/* {eventselected && <SpecificEvent event={eventselected} />} */}

     
        
        <Footer/>
      
    </div>
  )
}
