import React, { useState } from 'react';
import { TextField, Button, Grid,Card , CardContent,Box} from '@material-ui/core';
import { Typography } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";


const VenueUserBookingForm = ({ venue }) => {
  console.log('llllllll',venue)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [leasingdate, setLeasingdate] = useState('');
  const key = 'pk_test_51MuhQRH5D0XccQ7C4U1UxXyQIVYkmSLbEDYVwSp26YLEQMTzCsYVjnY90IwyrHfoZapuaXfeuLMst47wiYs92JSv00tqKvaUey'
  const stripe_promise = loadStripe(key);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // const calculatedPrice=numTickets*event.entry_price
    // Handle form submission here, e.g. send data to backend
    console.log('Form submitted with data:', {
      firstName,
      lastName,
      email,
      contactNumber,
    });
    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setContactNumber('');
    setLeasingdate('');
    
  };
  
  return (
    <form onSubmit={handleSubmit}>



<div display='flex' justifyContent='center' align='center'>
<Box display='flex' alignItems='center' justifyContent="center" style={{width:'50%'}} >
        <Card variant='outlined'>
          <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
          <Typography variant='h4'>{venue.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            fullWidth
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}><TextField
            label="Date of lease"
            name="leasing date "
            value={leasingdate}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          /></Grid>
        
        <Grid item xs={12}>
                <Typography variant='subtitle1'>Price: ${venue.lease_price}</Typography>
              </Grid>
        
        {/* <Grid item xs={12}>
          <TextField
            label="Number of Tickets"
            type="number"
            fullWidth
            value={numTickets}
            onChange={handleNumTicketsChange}
            InputProps={{
              inputProps: {
                min: 0, // Set minimum value for number of tickets
                max: 10, // Set maximum value for number of tickets
                step: 1 // Set step value for up-down selection
              }
            }}
          /> */}
        {/* </Grid> */}
        {/* <Grid item xs={12}>
                <Typography variant='subtitle1'>Price: ${price}</Typography>
              </Grid> */}
        {/* <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid> */}
        <Elements stripe = {stripe_promise}>
                 <PaymentForm paymentData={{
                      "amount":venue.lease_price,
                      // "eventId":props.eventId,
                      "email":email,
                      "contact":contactNumber,
                      // "ticketsCount":numTickets,
                      "venueId": venue.id,
                      "isVenue": true
                 }}/> 
              </Elements>
      </Grid>

          </CardContent>
      
    

      </Card>
         
          
        </Box>




</div>

      
      </form>
      
  );
};

export default VenueUserBookingForm;
