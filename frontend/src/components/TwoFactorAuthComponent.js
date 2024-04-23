import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import bgimg from './assets/image4.png'
import { Navigate,useNavigate } from "react-router-dom";

const TwoFactorAuthComponent = () => {
  const navigate=useNavigate();
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [showOtpInput, setShowOtpInput] = useState(false);

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  // const handleSendOtp = () => {
  //   // Logic to send OTP via email using the email input value
  //   // For example, you can use an API to send the OTP to the provided email

  //   // After successfully sending OTP, show the OTP input field
  //   setShowOtpInput(true);
  // };

  const handleAuthenticate = async () => {
    const requestFormData = new FormData();
    
    requestFormData.append("otp",otp);
    const role= sessionStorage.getItem("role");
    try {
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":sessionStorage.getItem("role")}
      const response = await axios.post(`https://venue-finder-backend.onrender.com/verify-otp`, requestFormData,{ headers });
      console.log(response.data);
      if (response.status == 200) {
        // const data = response.json();
        await sessionStorage.setItem('jwt_token', response.data.jwt_token);
        alert("OTP is valid. Authentication successful!");
        
        if (role==="OWNER"){
          navigate('/OwnerDashboardPage');
        }else{
          navigate('/CustomerHome');
        }
      } else {
        alert("Invalid OTP. Authentication failed! Try Again");
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
    <Card>
      <CardContent>
        {/* <TextField
          label="Email ID"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          variant="outlined"
        /> */}
        {/* {!showOtpInput ? (
          <Button
            variant="contained"
            color="black"
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        ) : ( */}
          <div>
            <TextField
              label="OTP"
              value={otp}
              onChange={handleOtpChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="black"
              onClick={handleAuthenticate}
            >
              Authenticate
            </Button>
          </div>
         {/* )} */}
      </CardContent>
    </Card>
    </div>
  );
};

export default TwoFactorAuthComponent;
