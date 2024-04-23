import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentHomePage from './PaymentHome';

const stripePromise = loadStripe('pk_test_51MuhQRH5D0XccQ7C4U1UxXyQIVYkmSLbEDYVwSp26YLEQMTzCsYVjnY90IwyrHfoZapuaXfeuLMst47wiYs92JSv00tqKvaUey');

function PaymentForm(props) {
  return (
    <Elements stripe={stripePromise}>
      {/* <HomePage /> */}
      <PaymentHomePage data = {props}/>
    </Elements>
  );
}

export default PaymentForm;