import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import './ForgotPassword.css';
import axios from 'axios';

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

  const handleSendLink = async (e) => {
    e.preventDefault();
    try{
      var bodyFormData = new FormData();
      bodyFormData.append('email', email);
      const resp = await axios.post(`https://venue-finder-backend.onrender.com/forgotpassword`, bodyFormData);
      console.log("Server Response: ", resp);
      
    } catch (error){
      console.log(error);
    }
    // Send a password reset link to the user's email address using a server-side API call
    // Display a success message to the user that their password reset email has been sent
    // Navigate the user back to the login page or display a link to go back to the login page
  };

  // const handleCancel = () => {
  //   // history.push('/login');
  // };

  return (
    <div className="forgot-password-container">
      <Typography variant="h4" className="forgot-password-title">
        Forgot Password
      </Typography>
      <div className="forgot-password-form">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          fullWidth
          required
        />
        <br/>
        <div className="forgot-password-buttons">
          <Button variant="contained" color="primary" onClick={handleSendLink}>
            Send Password Reset Link
          </Button>
        </div>
      </div>
    </div>
    
    
  );
};

export default ForgotPassword;