



import React, { Component , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import myvenue1 from './assets/bloomingtonconventioncenter.jpg'
import myvenue2 from './assets/Indianapolismarriotdowntown.png'
import myvenue3 from './assets/wonderlab.png'

import SpecificVenue from './SpecificVenue';
import { Link } from 'react-router-dom';
// import { useHistory }  from 'react-router-dom';
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




const BookedVenue = ({id, venue_id, payment_id, first_name, last_name, email_id, contact, lease_from_date,lease_end_date}) => {
  
  const classes = useStyles();
  const [venueselected,setvenueselected]=useState(null)
  let [VenueData, setVenueData] = useState([]);

  

  


  return (
    <>
    
     <Card className={classes.root}>
      
      {/* <CardMedia
        className={classes.media}
        image={image}
        title={name}
      /> */}
      <CardContent >
      <Typography gutterBottom variant="h5" component="h2">
        Venue ID: {venue_id}
      </Typography>
 
      <Typography variant="body2" color="textSecondary" component="p">
        Payment ID: {payment_id}
        
      </Typography>    

       
       
      
      </CardContent>
    </Card>
   
    <br/>

    

    
    
    </>
    
   
  );
};
export default BookedVenue;




