

import React, { Component , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import myevent1 from './assets/livemusic.png'
import myevent2 from './assets/trivianight.png'
import myevent3 from './assets/hikingtrip.png'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SpecificEvent from './SpecificEvent';

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


const EventCard = ({host_id, name, status, entry_price, latitude, longitude, guests_count, about, restrictions, event_date,image}) => {
  const classes = useStyles();
  const [eventselected,seteventselected]=useState(null)
  let [EventData, setEventData] = useState([]);
 
const handleEventSelect = (events) => {
    
    
    
  seteventselected(events);
  console.log("???????",eventselected);
  
  
};






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
        {event_date}
        
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {status}
        
      </Typography>
    

     
     
    
    </CardContent>
  </Card>
  

  <br/>
  {/* {eventselected && <SpecificEvent event={eventselected} />} */}
  
  

  


  
  </>
  
 
);
};

export default EventCard;



