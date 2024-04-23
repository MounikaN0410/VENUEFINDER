import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {TextField} from '@mui/material';
//import './ForgotPassword.css';

const ForgotPassword = () => {
  // const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    setEmail(email);
    setEmailError(!isValidEmail);
  };

  const handleSendLink = () => {
    // Send a password reset link to the user's email address using a server-side API call
    // Display a success message to the user that their password reset email has been sent
    // Navigate the user back to the login page or display a link to go back to the login page
  };

  // const handleCancel = () => {
  //   // history.push('/login');
  // };

  return (
    <div className='d-flex justify-content-center '>
    <div className="m-5 signup-card w-50 ">
      <h1 className="text-center w-100 mb-5">
        Forgot Password
      </h1>
      <div className="d-flex flex-column">
        <div className='form-group'>
      <label>Email</label>
        <input
          id="email"
          label="Email"
          type="email"
          className="form-control w-50 mx-auto"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          fullWidth
          required
        />
        <br/>
        </div>

          <div className=' d-flex justify-content-center'>
        <button type="submit" className="btn btn-primary w-25" onClick={handleSendLink}>
            Submit
          </button>

        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ForgotPassword;
