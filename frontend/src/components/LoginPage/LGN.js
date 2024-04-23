import React, { useState } from 'react';
//import './LGN.css';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function LGN() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

      let resp = await fetch("http://127.0.0.1:5000/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      console.log("SERVER RESPONSE ---- ", resp);
      if (resp.status > 400) {
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
        navigate('/CustomerHome');

        // history.push("/CustomerHome");
      }
    } catch (err) {
      console.error(err.response.data);
    }


    // let resp = fetch('/http://127.0.0.1:5000/user-login', {
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
    <div className="container-fluid p-0 d-flex flex-column align-items-center justify-content-center">
      <div className="container-fluid p-0 mb-4">
        <AppBar position="static" sx={{ backgroundColor: '#101010' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography onClick={() => navigate("/")} variant="h5"
            fontStyle='italic'
            fontFamily='Charmonman'
            color='white'
            fontWeight='bold'
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
              VENUE.FINDER
            </Typography>
            {/* <Button  color="inherit">Login</Button> */}
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={() => navigate("/login")} color="inherit">Login</Button>
            <Button onClick={() => navigate("/signup")} color="inherit">SignUp</Button>
          </Toolbar>
        </AppBar>
      </div>
    <div className="signup-card w-50 d-flex flex-column align-items-center mb-4">
        <h1>Login</h1>
        <div className="text-center mb-3">
              <p>Sign up with:</p>
 

              <button type="button" className="btn btn-link btn-floating mx-1 btn btn-outline-primary" >
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
          <div class="form-check">
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
          </div>
          <div className="forgot-password">
            <Link to = "/recovery">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <br />
        <label>Not a regitered user <Link to = '/register'>signup here</Link>.</label>
      </div>
    </div>
  
  );
}

export default LGN;