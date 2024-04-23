

import React, { Component , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import UpdateEvent from './UpdateEvent'

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: '10px',
    minWidth: 400,
  },
  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

});


const OwnerEventCard = ({host_id,id, name, status, entry_price, latitude, longitude, guests_count, about, restrictions, event_date,image}) => {
  const classes = useStyles();
  const [eventselected,seteventselected]=useState(null)
  let [EventData, setEventData] = useState([]);
 
// const handleEventSelect = (events) => {
    
    
    
//   seteventselected(events);
//   console.log("???????",eventselected);
  
  
// };


const handleUpdateEvent=()=>
  {
    seteventselected({

      host_id, id, name, status, entry_price, latitude, longitude, guests_count, about, restrictions, event_date,image
     
    });
  }

  const handleDeleteEvent= async ()=>
  {
    try {
      console.log(sessionStorage.getItem('jwt_token'))
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"OWNER"}
      const response = await axios.delete(`https://venue-finder-backend.onrender.com/event/${id}`,{ headers });
      console.log(response.data);
      // Optionally, you can show a success message or redirect to a success page here
    } catch (error) {
      console.error(error);
      // Optionally, you can show an error message or redirect to an error page here
    }
  
  }



return (
  <>
  {/* {Eventdetails.map((events,index)=>(<div key={index} onClick={() => handleEventSelect(events)}> */}
   <Card className={classes.root}>
    
    <CardMedia
      className={classes.media}
      // image={events.image}
      // title={events.name}
      image={image}
      title={name}
    />
    <CardContent >
      <Typography gutterBottom variant="h5" component="h2">
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {entry_price}
      </Typography>
      {/* <Typography variant="body2" color="textSecondary" component="p">
        {venues.status}
      </Typography> */}
      
      {/* <Typography variant="body2" color="textSecondary" component="p">
        {venues.about}
      </Typography> */}
      <Typography variant="body2" color="textSecondary" component="p">
        {event_date}
        
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {status}
        
      </Typography>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 'auto'}}>
      <Button size="small" color="black" variant='outlined' onClick={handleUpdateEvent}>
        Update Event
      </Button>
      <IconButton size="small" color="black" onClick={handleDeleteEvent}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>

    

     
     
    
    </CardContent>
  </Card>
  

  <br/>
  {eventselected && (
        <UpdateEvent
          event={{
            host_id:eventselected.host_id, id: eventselected.id, name:eventselected.name, status:eventselected.status, entry_price:eventselected.entry_price, latitude:eventselected.latitude, longitude:eventselected.longitude, guests_count:eventselected.guests_count, about:eventselected.about, restrictions:eventselected.restrictions, event_date:eventselected.event_date,image: eventselected.image
          }}/>
  )
        }
  
  
  

  


  
  </>
  
 
);
};


export default OwnerEventCard;



