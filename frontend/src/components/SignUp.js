import { Button, Typography } from '@mui/material';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import './SignUp.css';
import bgImg from './assets/img1.png';
import Footer from './Footer'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { DatePicker } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@material-ui/pickers';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name : "",
      last_name: "",
      email: "",localStorage,
      dob: "",
      password: "",
      cnfpassword: "",
      contact: "",
      passmismatcg:false,
      first_error:"",
      loading: false

    };
  }
  handleDateOfBirthChange = (event) => {
    this.setState({ dob: event.target.value });
  };

//   handleClick = () => {
//     this.setState(prevState => ({
//       count: prevState.count + 1
//     }));
//   }

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


  confirmpassword_helper(){
    if((this.state.cnfpassword)!== (this.state.password)){
        return " Password doesnt match"
    }
    return ""
  }

//   handleDateChange = (event) => {
//     const dob = event.target.value;
//     const isValidDate = !isNaN(new Date(dob).getTime());

//     if (isValidDate) {
//       this.setState({
//         date: dob,
//         error: false,
//         errorMessage: ''
//       });
//     } else {
//       this.setState({
//         date: dob,
//         error: true,
//         errorMessage: 'Invalid date format'
//       });
//     }
//   }


  



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
    // if(this.state.first_name === "abc"){
    //     return "first name error"
    // }
    // return ""
  }



//   email_helper(){
//     if(this.emailid === "abc"){
//         return "first name error"
//     }
//     return ""
//   }

  

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

                <h2>Sign Up</h2>
                <h3>Sign Up for free </h3>
                <div>
                    <TextField id="first_name" label="First Name"  helperText={this.firstname_helper()} variant="outlined" value={this.state.first_name} onChange={this.handleChange} required />
                    <TextField id="last_name" label="Last Name" variant="outlined" value={this.state.last_name} onChange={this.handleChange} required/>

                </div>
                <br/>
            
                
                 <br/>

                <div>
                    <TextField  id="email" label="Email ID " type="email"  value={this.state.email} onChange={this.handleEmailChange} error={this.state.error} helperText={this.state.errorMessage} required/>
            
                </div>
                <br/>

                <div>
                    <TextField  id="password" label="Password " type="password" value={this.state.password} onChange={this.handleChange} required />


                </div>
                <br/>
                <div>

                    <TextField  id="cnfpassword" label="Confirm Password " type="password" value={this.state.cnfpassword} helperText={this.confirmpassword_helper()} onChange={this.handleChange} requied  />


                </div>
                <br/>

                 <div> 
                    {/* <TextField  id="dob" label="Date Of Birth " value={this.state.dob} onChange={this.handleChange} required  /> */} 
                    <TextField id="dob" label="Date of Birth"  type="date" value={this.state.dob} onChange={this.handleDateOfBirthChange} InputLabelProps={{shrink: true}} />
                    {/* <DatePicker id="dob" label="Basic date picker" value ={this.state.dob} onChange={this.handleChange}/> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" />
                        </DemoContainer>
                    </LocalizationProvider> */}

                </div>

                <br/>

                <div>
                    <TextField  id="contact" label="Contact Number" value={this.state.contact} helperText={this.contact_helper()} onChange={this.handleChange} />

                </div>
            
                <br/>
            
    
                <Button disabled={this.state.loading} variant="contained" color="success" onClick={this.handleSubmit}>
                Sign Up
                 </Button>

                </div>

            </div>
            <div><Footer/></div>

        </section>
        


       
    );
  }
}

export default SignUp;


