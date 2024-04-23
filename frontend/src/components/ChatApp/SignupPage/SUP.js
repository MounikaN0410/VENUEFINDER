import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import "./SUP.css";
//import {CustomerHome} from "./CustomerHome";

const SUP = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",   
    email_id: "",
    dob: "",
    password: "",
    contact_number: "",
    confirm_password: ""
  });

  const navigate = useNavigate();

  
  let { firstname, lastname, email_id, dob, password, confirm_password, contact_number } = formData;

    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const body = new URLSearchParams();
      body.append("firstname", firstname);
      body.append("lastname", lastname);
      body.append("email_id", email_id);
      body.append("date_of_birth", dob);
      body.append("password", password);

      let resp = await fetch("http://127.0.0.1:5000/user-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      console.log("SERVER RESPONSE ---- ",resp);
      if (resp > "400"){
        console.log('Unsuceesfull Attempt');
      }
      else {
        console.log("User registered successfully!");
        navigate("/LGN");

        
        // history.push("/CustomerHome");
    }}catch (err) {
      console.error(err.response.data);
    }



    setFormData({
      firstname: "",
      lastname: "",
      email_id: "",
      dob: "",
      password: "",
      contact_number: "",
      confirm_password: "",
      
    });
  };

  


  const [emailError, setEmailError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const checkEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  const checkContact = (value) => {
    if (!/^[0-9]{10}$/.test(value)) {
      setContactError("Please enter a valid 10-digit phone number.");
    } else {
      setContactError(null);
    }
  };

  const checkPassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError(null);
    }
  };

  const checkConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(null);
    }
  };

  return (
    <div className="d-flex justify-content-center m-5">
    <div className="signup-card w-50 d-flex flex-column align-items-center">
      
        <h1>Sign Up</h1>

          <div className="text-center mb-3">
              <p>Sign up with:</p>
 

              <button type="button" className="btn btn-link btn-floating mx-1 btn btn-outline-primary" >
                <i className="fa fa-google"></i>
              </button>
              <br></br>
              <p>or</p>

          </div>
          
        <form  className="w-100" onSubmit={(e) => onSubmit(e)}>

        <div className="d-flex justify-content-around">

        <div >

        <label className="label">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => onChange(e)}
            className="signup-input"
            required
          />

          
          <label className="label">Email id</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email_id"
            value={email_id}
            onChange={(e) => {
              onChange(e);
              checkEmail(e.target.value);
            }}
            className="signup-input"
            required
          />
          {emailError && <span className="error">{emailError}</span>}

          
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              onChange(e);
              checkPassword(e.target.value);
            }}
            className="signup-input"
            required
          />
          
          {passwordError && <span className="error">{passwordError}</span>}

          <label className="label">Contact Number</label>
          <input
            type="password"
            placeholder="Contact Number"
            name="contact_number"
            value={contact_number}
            onChange={(e) => {
              onChange(e);
              checkContact(e.target.value);
            }}
            className="signup-input"
            
          />
          
          {contactError && <span className="error">{contactError}</span>}

        </div>

        <div>


          
          <label className="label">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => onChange(e)}
            className="signup-input"
            required
          />


          


         
          <label className="label">Birthdate</label>
          <input
            type="date"
            placeholder="Date of Birth"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
            className="signup-input"
            required
          />



          



          <label className="label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={confirm_password}
            onChange={(e) => {
              onChange(e);
              checkConfirmPassword(e.target.value);
              
            }}
            className="signup-input"
            required
          />

          
          {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}

          
          </div>
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

            <div className="d-flex flex-column align-items-center">
          
          <label>Already have an account <Link to = "/Login">sign in</Link>.</label>
        
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          </div>
        </form>
      
    </div>
    </div>
  );
};

export default SUP;