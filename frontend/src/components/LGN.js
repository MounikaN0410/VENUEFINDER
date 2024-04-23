import React, { useState,useEffect } from 'react';
import './LGN1.css';
import { Link,useNavigate } from 'react-router-dom';
import { gapi } from "gapi-script";
import GLogin from "./GoogleLoginButton.js";

function LGN() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID =
    "258575485385-c6q5aqbmco9ljkeglp51aqrpkd0p821c.apps.googleusercontent.com";
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: GOOGLE_CLIENT_ID,
          scope: "",
        });
      }
  
      gapi.load("client:auth2", start);
    });

  const [selectedRadioValue, setSelectedRadioValue] = useState("Owner");

  // Event handler for radio button change
  const handleRadioChange = (event) => {
    setSelectedRadioValue(event.target.value);
    if (event.target.value==="Customer"){
      sessionStorage.setItem("role", "USER");
    }else{
      sessionStorage.setItem("role", "OWNER");  
    }
    
  };
    
  const handleGoogleLogin = async (e) => {
      sessionStorage.setItem("isGoogleLogin", true);
    };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append('email_id', email_id);
    // formData.append('password', password);

    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const body = new URLSearchParams();
      body.append("email_id", email_id);
      body.append("password", password);

      let url=""
      if  (sessionStorage.getItem("role")=== "USER"){
        url="https://venue-finder-backend.onrender.com/user-login";
      }else{
        url="https://venue-finder-backend.onrender.com/owner-login";
      }

      let resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      console.log("SERVER RESPONSE ---- ",resp);
      if (resp.status >= 400){
        console.log('Unsuceesfull Attempt');
        navigate('/Signup');
      }
      else {
        console.log("User login successfull!");
        window.alert("LOGGED IN !!!!!!");
        const data = await resp.json();
        sessionStorage.setItem('jwt_token', data.jwt_token);
        // window.alert("JWT : ", data.jwt_token);
        const token = sessionStorage.getItem('jwt_token');
        console.log("TOKEN : ", token);
        navigate('/TwoFactorAuth');
        
        // history.push("/CustomerHome");
    }}catch (err) {
      console.error(err.response.data);
    }


    // let resp = fetch('/https://venue-finder-backend.onrender.com/user-login', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => {
    //     console.log('SERVER RESPONSE ----- ', resp);
    //     if (!response.ok) {
    //       console.log('Login UNsuccessfull');
          
    //       throw new Error('Invalid credentials');
          
    //     }
    //     else{
    //         console.log('Login Successfull');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     sessionStorage.setItem('jwt_token', data.jwt_token);
    //     window.location.replace('/dashboard');
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
    
  };



  return (
    // <div className="card">
    //   <div className="card-body">
    //     <h2>Login</h2>
    //     {error && <div className="error">{error}</div>}
    //     <form onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label>Email</label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           value={email_id}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="forgot-password">
    //         <Link to = "/ForgotPasswordPage">Forgot Password?</Link>
    //       </div>
    //       <button type="submit" className="btn btn-primary">
    //         Login
    //       </button>
    //     </form>
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       <button onSubmit={handleGoogleLogin}>
    //         <GLogin />
    //       </button>
    //     </div>
    //     <br />
    //     <label>Not a regitered user <Link to = '/SignUp'>signup here</Link>.</label>
    //   </div>
    // </div>
     <div className="signup-card w-50 d-flex flex-column align-items-center mb-4">
        <h1>Login</h1>
        <div className="text-center mb-3">
              <p>Sign up with:</p>
 

              <button type="button" onSubmit={handleGoogleLogin}className="btn btn-link btn-floating mx-1 btn btn-outline-primary" >
                <i className="fa fa-google"></i>
              </button>
              <br></br>
              <p>or</p>

          </div>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
              Customer
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
            <label class="form-check-label" for="flexRadioDefault2">
              Owner
            </label>
          </div> */}
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Customer"
              checked={selectedRadioValue === "Customer"} // Set checked based on state value
              onChange={handleRadioChange} // Attach event handler
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Customer
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="Owner"
              checked={selectedRadioValue === "Owner"} // Set checked based on state value
              onChange={handleRadioChange} // Attach event handler
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Owner
            </label>
          </div>
        </div>
          <div className="forgot-password">
            <Link to = "/ForgotPasswordPage">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <br />
        <label>Not a regitered user <Link to = '/signup'>signup here</Link>.</label>
      </div>
  );
}

export default LGN;