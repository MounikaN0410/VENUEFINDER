

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
// const Eventdetails=[
//   {
//     name: 'WonderLab Museum of Science', entry_price: '$400', image: myevent3 ,event_date:'04/10',status:'open'
//   },{
//   name: 'Bloomington Convention Center', entry_price: '$500', image: myevent1,event_date:'10/10',status:'open'
  
// },
// {
//   name: 'Indianapolis Marriott Downtown', entry_price: '$400', image: myevent2,event_date:'6/8',status:'open'
// },
// {
//   name: 'Indianapolis Marriott Downtown', entry_price: '$400', image: myevent2,event_date:'6/8',status:'open'
// },
// {
//   name: 'Indianapolis Marriott Downtown', entry_price: '$400', image: myevent2,event_date:'6/8',status:'open'
// },
// {
//   name: 'Indianapolis Marriott Downtown', entry_price: '$400', image: myevent2,event_date:'6/8',status:'open'
// },

// ]

const BookedEvent = ({id, event_id, payment_id, first_name, last_name, email_id, contact, ticket_count}) => {
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
    
    {/* <CardMedia
      className={classes.media}
      // image={events.image}
      // title={events.name}
      image={image}
      title={name}
    /> */}
    <CardContent >
      <Typography gutterBottom variant="h5" component="h2">
        Event ID: {event_id}
      </Typography>
 
      <Typography variant="body2" color="textSecondary" component="p">
        Payment ID: {payment_id}
        
      </Typography>

      <Typography variant="body2" color="textSecondary" component="p">
        Ticket Count: {ticket_count}
        
      </Typography>      
    

     
     
    
    </CardContent>
  </Card>
  

  <br/>
  {/* {eventselected && <SpecificEvent event={eventselected} />} */}
  
  

  


  
  </>
  
 
);
};

export default BookedEvent;



