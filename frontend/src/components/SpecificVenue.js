import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import myvenue1 from './assets/bloomingtonconventioncenter.jpg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import bgImg from './assets/img1.png';
import VenueCard from './Venuecard';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import VenueUserBookingForm from './VenueUserBookingForm';
import Rating from '@mui/material/Rating';


const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '10px',
    minWidth: 400,
  },
  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  venueTitle: {
    fontSize: '2rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1d5860',
    margin: '20px 0',
  },
  venueSubtitle: {
    fontSize: '1rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textAlign: 'start',
    color: '#1d5860',
    margin: '10px 0',
  },
  
  venueCapacity: {
    fontSize: '1rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textAlign: 'center',
    margin: '5px',
  },
  bookNowButton: {
    display: 'block',
    margin: '20px auto',
  },
});

const SpecificVenue = ({ venue }) => {
  const id = venue.id
  const classes = useStyles();
  const [showBookingForm, setShowBookingForm] = useState(false); 
  const [rating,setRating]=useState(0)

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };
  const handleRatingChange=async(venue,value)=>{
    setRating(value)
    const requestFormData = new FormData();

    requestFormData.append("rating",rating);

    try {
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"USER"}
      const response = await axios.post(`https://venue-finder-backend.onrender.com/venue/${id}/rating`, requestFormData,{ headers });
      console.log(response.data);
      // Optionally, you can show a success message or redirect to a success page here
    } catch (error) {
      console.error(error);
      // Optionally, you can show an error message or redirect to an error page here
    }
  }


  return (
    <Grid container spacing={2}  >
      <Grid item >
        <img src={venue.image_url} alt="" style={{ padding: '30px' ,maxWidth:'600px'} } />
      </Grid>

      {showBookingForm?<Grid item xs style={{ padding: '20px',marginRight:'20px',marginTop:'30px'}}><VenueUserBookingForm venue={venue} /></Grid>:
      <Grid item xs style={{ padding: '20px',marginRight:'20px',marginTop:'30px'}}>
        <br/>
        <Typography  variant="h1" className={classes.venueTitle}>{venue.name}</Typography>
        <br/>
        <Typography variant="h4" className={classes.venueSubtitle}>{venue.about}</Typography>
        <br/>
        
        <Typography variant="h5" className={classes.venueCapacity}>Capacity: {venue.capacity}</Typography>
<br/>
        <Typography variant="h5" className={classes.venueCapacity}>Price per day: {venue.lease_price}</Typography>
        <div align='center' className={classes.bookNowButton}>
          <Button variant="contained" onClick={handleBookNowClick}>Book Now</Button>
        </div>
        <div align='center' className={classes.bookNowButton}>
        <Typography className={classes.eventSubtitle}>Give Rating</Typography>
    <Rating
      name="eventRating"
      value={rating}
      onChange={handleRatingChange}
      size="large"
      precision={0.5}
      max={5}
    />


        </div>
     
      

      </Grid >}
     
     
  



    </Grid>
  )
};

export default SpecificVenue;
