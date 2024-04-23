import React, { Component } from 'react';
import Stripe from 'stripe';

const stripe = Stripe('pk_test_51MuhQRH5D0XccQ7C4U1UxXyQIVYkmSLbEDYVwSp26YLEQMTzCsYVjnY90IwyrHfoZapuaXfeuLMst47wiYs92JSv00tqKvaUey');

class StripeCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      amount: ''
    };
  }

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
            <script src="https://js.stripe.com/v3/"></script> 
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <label>Amount:</label>
          <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
          <button type="submit">Pay with Stripe</button>
        </form>
      </div>
    );
  }
}
