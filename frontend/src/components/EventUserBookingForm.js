import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import { Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";
// import 

const EventUserBookingForm = ({ event }) => {
  console.log("llllllll", event);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [numTickets, setNumTickets] = useState("");
  const [price, setPrice] = useState(0);
  const key = 'pk_test_51MuhQRH5D0XccQ7C4U1UxXyQIVYkmSLbEDYVwSp26YLEQMTzCsYVjnY90IwyrHfoZapuaXfeuLMst47wiYs92JSv00tqKvaUey'

  const stripe_promise = loadStripe(key);

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow backspace, delete, and arrow keys
    if (keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39) {
      return;
    }

    // Only allow numeric keys
    if (/\D/.test(keyValue)) {
      event.preventDefault();
    }

    // Prevent input if length is already 10 or more
    if (parseInt(event.target.value + keyValue) > 10) {
      event.preventDefault();
    }
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedPrice = numTickets * event.entry_price;
    // Handle form submission here, e.g. send data to backend
    console.log("Form submitted with data:", {
      firstName,
      lastName,
      email,
      contactNumber,
      numTickets,
      price: calculatedPrice,
      event,
    });
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    setNumTickets("");
    setPrice(0);

    // navigate('/PaymentForm')
  };
  const handleNumTicketsChange = (e) => {
    const value = e.target.value;
    setNumTickets(value);
    // Update price based on number of tickets
    const calculatedPrice = value * event.entry_price;
    setPrice(calculatedPrice);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <Typography variant="h4">{event.name}</Typography>
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
              <Grid item xs={12}>
                <TextField
                  label="Number of Tickets"
                  type="number"
                  fullWidth
                  value={numTickets}
                  diable = {true}
                  onChange={handleNumTicketsChange}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    inputProps: {
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0, // Set minimum value for number of tickets
                      max: 10, // Set maximum value for number of tickets
                      step: 1, // Set step value for up-down selection
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Price: ${price}</Typography>
              </Grid>
              <Elements stripe = {stripe_promise}>
                 <PaymentForm paymentData={{
                      "amount":price,
                      // "eventId":props.eventId,
                      "email":email,
                      "contact":contactNumber,
                      "ticketsCount":numTickets,
                      "eventId":event.id,
                      "isEvent": true
                 }}/> 
              </Elements>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" >
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </form>
  );
};

export default EventUserBookingForm;
