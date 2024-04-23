import { Button, Typography } from '@mui/material';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import './Login.css';
import bgImg from './assets/img1.png';
import Footer from './Footer'
import CustomerHome from './CustomerHome'




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      email: "",
    
      password: "",
   
      passmismatcg:false,
      first_error:"",
      loading: false

    };
  }
  handleForgotPassword = () => {


    // Open a new component page for forgot password functionality
    // Pass any necessary props to the new component, such as the user's email address or a callback function to handle resetting the password
    // You can use React Router or a modal to create the new component/page
  };
  



  handleChange = (event) => {
    console.log(event.target)
    
    this.setState({[event.target.id]: event.target.value})
    console.log(this.state)
    setTimeout(() => {
        console.log(this.state);
      }, 1000);
   
      
        
  }
  firstname_helper(){
    if(this.state.first_name === "abc"){
        return "first name error"
    }
    return ""
  }

  handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      this.setState({
        email: email,
        error: false,
        errorMessage: ''
      });
    } else {
      this.setState({
        email: email,
        error: true,
        errorMessage: 'Invalid email format'
      });
    }
  }


  confirmpassword_helper(){
    if((this.state.cnfpassword)!== (this.state.password)){
        return " Password doesnt match"
    }
    return ""
  }

  // handleForgotPassword = () => {
    
  //   // Open a dialog/modal with a form to enter the user's email address
  //   // When the user submits the form, send a request to your server to reset the user's password and send a password reset link to the user's email address
  //   // Display a success message to the user that their password reset email has been sent
  // };
  


  contact_helper(){

    if (!/^[0-9]{10}$/.test(this.state.contact)) {
        // this.setState({ error: true });
        return "Contact number is invalid"
      } else {
        // this.setState({ error: false });
        return ""
      }
        if (!/^[0-9]{10}$/.test(this.state.contact)) {
            // this.setState({ error: true });
            return "Contact number is invalid"
          } else {
            // this.setState({ error: false });
            return ""
          }
   
  }
  handleSubmit = (event) => {
    console.log(event.target)
    this.setState({loading: true})
    setTimeout(() => {
        console.log(this.state);
        this.setState({loading: false})
      }, 2000);

       // axios.get()   
  

  }


    

    
   

  render() {
    return (
        <section>
            <div className="register">
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
                <div className="col-1">

                  <h2>Log In</h2>
                  <h3>Log in to Existing Account Up </h3>
                {/* <div>
                    <TextField id="first_name" label="First Name"  helperText={this.firstname_helper()} variant="outlined" value={this.state.first_name} onChange={this.handleChange} required />
                    <TextField id="last_name" label="Last Name" variant="outlined" value={this.state.last_name} onChange={this.handleChange} required/>

                </div> */}
                {/* <br/>
            
                
                 <br/> */}

                  <div>
                    
                    <TextField  id="email" label="Email ID " type="email"  value={this.state.email} onChange={this.handleEmailChange} error={this.state.error} helperText={this.state.errorMessage} required/>
            
                  </div>
                  <br/>

                  <div>
                    <TextField  id="password" label="Password " type="password" value={this.state.password} onChange={this.handleChange} required />


                  </div>
                  <br/>
                
            
    
                  <Button disabled={this.state.loading} variant="contained" color="success" onClick={this.handleSubmit}>
                    Log In
                  </Button>

                  <a href='/ForgotPasswordPage'>Forgot Password</a>


                </div>
            




            </div>
        <div><Footer/>
 </div>
        </section>
        
    );
  }
}

export default Login;
