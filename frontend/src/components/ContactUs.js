import React from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import contactbgimg from './assets/contactbgimg.png';
import Footer from './Footer';


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 50,
    padding: 20,
    justifyContent: 'center',
  },

  input: {
    marginBottom: 20,
  },
  texts:{
    variant:'h6',
    color:'black'
  },
  

  button: {
    backgroundColor: '#0066cc',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0059b3',
    },
  },
});

const ContactUs= () => {
  const classes = useStyles();
  const navigate=useNavigate();

  return (
    <div >

      <Button variant='outlined' onClick={()=>navigate('/CustomerHome')}>Home</Button>
      <Card className={classes.root}>
      <CardContent>
      <Typography variant="h4" align="center" style={{ margin: 20 }}>We are here to help!</Typography>
      <Typography align="center" style={{ marginBottom: 40 }}>We're here to help! And that includes helping you save time. For faster results, please check out the FAQ's first. If the information provided does not answer your question, you will have an opportunity to chat with our Client Services team for assistance.</Typography>
      </CardContent>
    </Card>
    
     
       
   
        {/* <TextField label="Name" variant="outlined" fullWidth className={classes.input} />
        <TextField label="Email" variant="outlined" fullWidth className={classes.input} />
        <TextField label="Message" variant="outlined" multiline rows={4} fullWidth className={classes.input} />
        <Button variant="contained" className={classes.button}>Submit</Button> */}
      

      

    </div>
    
  );
};

export default ContactUs;
