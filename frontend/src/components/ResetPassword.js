import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import "./SUP.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: ""
  });
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  
  let {password, confirm_password} = formData;

    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   };

    //   const body = new URLSearchParams();
    //   body.append("firstname", firstname);
    //   body.append("lastname", lastname);
    //   body.append("email_id", email_id);
    //   body.append("date_of_birth", dob);
    //   body.append("password", password);

    //   let resp = await fetch("https://venue-finder-backend.onrender.com/user-signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: body.toString(),
    //   });
    //   console.log("SERVER RESPONSE ---- ",resp);
    //   if (resp > "400"){
    //     console.log('Unsuceesfull Attempt');
    //   }
    //   else {
    //     console.log("User registered successfully!");
    //     navigate("/LGN");

        
    //     // history.push("/CustomerHome");
    // }}catch (err) {
    //   console.error(err.response.data);
    // }

    try{
        var bodyFormData = new FormData();
        bodyFormData.append('passw', password);
        bodyFormData.append('cpassw', confirm_password)
        const resp = await axios.post(`https://venue-finder-backend.onrender.com/resetpassword?${id}`, bodyFormData);
        setResetSuccess(true);
        console.log("Server Resp: ", resp);
        console.log("Reset Password result : ", {resetSuccess});
        navigate("/Login");


    } catch (error){
        console.log("ERROR : ",error)
        
    }

    
    setFormData({
      password: "",
      confirm_password: "", 
    });
  };

  


 
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);



 

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
    <div className="signup-card">
      
        <h1>Reset your password</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <label className="label">New Password</label>
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
          <br />
          {passwordError && <span className="error">{passwordError}</span>}



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
          <br />
          {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
          <br />
          <button type="submit" className="signup-button">
            Reset Password
          </button>
          
        </form>
      
    </div>
  );
};

export default ResetPassword;
