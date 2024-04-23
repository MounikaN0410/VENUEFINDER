import React, { useState } from "react";
import axios from "axios";
// MUI Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
// Util imports
import { makeStyles } from "@material-ui/core/styles";
// Components
import CardInput from "./CardInput";
import Navbar from "./Navbar";
import Footer from "./Footer";
// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

function PaymentHomePage(props) {
  console.log("Amount on PaymentHome : ", props.data.paymentData.amount)
  console.log("PaymentHome props:: ",props)
  const navigate = useNavigate();
  const classes = useStyles();
  // State
  const [email, setEmail] = useState("");
  // const[transaction_id, setTransactionId] = useState()

  const stripe = useStripe();
  const elements = useElements();
  const jwt_token = sessionStorage.getItem('jwt_token')
  console.log("JWT :: ",jwt_token)
  console.log("props :: ", props)
  const headers = {
    'x-access-tokens': jwt_token,
    'role' : 'USER'
  };

  const handleSubmitPay = async (event) => {
    console.log("amount : ", props.data.paymentData.amount)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // console.log(process.env.BASE_URL);

    const res = await axios.post("https://venue-finder-backend.onrender.com/pay", {
      email: email,
      amount: props.data.paymentData.amount
    });

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
        // amount: props.data.paymentData.amount,
      },
    });
    console.log("Client Seceret :", clientSecret);
    console.log("SRIPE response : ", result);
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log("Payment Unsucessfull : ",result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const chargeFormData = new FormData();
        chargeFormData.append('id', clientSecret)
        chargeFormData.append('amount', props.data.paymentData.amount)

        let transaction_id = ""
        
        try{
        const chargeResp = await axios.post("https://venue-finder-backend.onrender.com/charge",chargeFormData, {headers})
        console.log("/charge response :: ",chargeResp)
        console.log("Trans id  : ",chargeResp.data.transaction_id)
        transaction_id = chargeResp.data.transaction_id
        // setTransactionId(chargeResp.data.transaction_id)
        }catch(error){
          
          console.log(error)
        }


        if(props.data.paymentData.isEvent){

        console.log("Transaction id :: ",transaction_id)
        const eventBookingData = new FormData()
        eventBookingData.append("transaction_id", transaction_id)
        eventBookingData.append("event_id", props.data.paymentData.eventId)
        eventBookingData.append("contact", props.data.paymentData.contact)
        eventBookingData.append("tickets_count", props.data.paymentData.ticketsCount)

        try{
          const eventBookingResp = await axios.post("https://venue-finder-backend.onrender.com/event-booking", eventBookingData, {headers})
          console.log("eventBookingResponse :- ", eventBookingResp)
          console.log("database updated")
          
        } catch(error){
          console.log("event-booking error :: ", error)
        }
        } else{
          const venueBookingData = new FormData()
          venueBookingData.append("transaction_id", transaction_id)
          venueBookingData.append("venue_id", props.data.paymentData.venueId)
          venueBookingData.append("contact",props.data.paymentData.contact)

          try{
            const eventBookingResp = await axios.post("https://venue-finder-backend.onrender.com/venue-booking", venueBookingData, {headers})
          console.log("venueBookingResponse :- ", eventBookingResp)
          console.log("database updated")

          } catch(error){
            console.log("venue-booking error ::",error)
          }

        }

        
        



        console.log("Payment success");
        navigate("/PaymentSuccess");
      }
    }

    //access allt eh data via props.variable_name
    //if pay api is succesfull with amt call charge; POST
    // /charge data: stripe-id as id, amt as amount resp: transaction_id; jwt; POST
    //call to /event-booking data: transaction_id, event_id, contact ; tickets_count; POST
    //call to /venue-booking data: traansaction_id, venue_id, contact_no; resp : database updated; send with jwt; POST
  };

  console.log("props :: ", props);

  return (
    <div>
      {/* <Navbar /> */}
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <TextField
            label="Email"
            id="outlined-email-input"
            helperText={`Email you'll recive updates and receipts on`}
            margin="normal"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <CardInput />
          <div className={classes.div}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmitPay}
            >
              Pay
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* <Footer /> */}
    </div>
  );
}

export default PaymentHomePage;
