import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@mui/material/Typography';
import OwnerNavbar from './OwnerNavbar';
import Footer from '../Footer';
// import VenueUpdationSuccessCard from '../VenueUpdationSuccessCard';
import EventUpdationSuccessCard from '../EventUpdationSuccess';


import bgimg from '../assets/image4.png'
import OwnerVenueCard from './OwnerVenueCard';



const UpdateEvent = (event) => {
  console.log('event',event)
  const [formData, setFormData] = useState({
    name: event.event.name,
    status: event.event.status,
    entry_price:event.event.entry_price,
    latitude: event.event.latitude,
    longitude: event.event.longitude,
    guests_count: event.event.guests_count,
    about: event.event.about,
    restrictions: event.event.restrictions,
    event_date: event.event.event_date
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [updated, setUpdated] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestFormData = new FormData();

    requestFormData.append("name",formData.name);
    requestFormData.append("status",formData.status);
    requestFormData.append("entry_price",formData.entry_price);
    requestFormData.append("latitude",formData.latitude);
    requestFormData.append("longitude",formData.longitude);
    requestFormData.append("guests_count",formData.guests_count);
    requestFormData.append("about",formData.about);    
    requestFormData.append("restrictions",formData.restrictions);    
    requestFormData.append("event_date",formData.event_date);    
    requestFormData.append('image', selectedFile);
    
    try {
      // Make POST request to backend API with form data
      console.log(sessionStorage.getItem('jwt_token'))
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"OWNER"}
      const response = await axios.put(`https://venue-finder-backend.onrender.com/event/${event.event.id}`, requestFormData,{ headers });
      console.log(response.data);
      setUpdated(true)
      // Optionally, you can show a success message or redirect to a success page here
    } catch (error) {
      console.error(error);
      // Optionally, you can show an error message or redirect to an error page here
    }
  };

  return (
    <>
    {!updated?
   
   
   <Box style={{   backgroundImage: `url(${bgimg})`,backgroundSize: 'cover',
        backgroundPosition: 'center',}}>







   
    <Card variant='outlined' style={{ margin: '10px auto', maxWidth: '500px' }}> 
      <CardContent>
        <form onSubmit={handleSubmit}>
           <div display='flex' align='center'><Typography variant='h5' color='#292d29'>Update Event Details</Typography></div> 
          <TextField
          
            label="Name of the Event"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Entry Price"
            name="entry_price"
            value={formData.entry_price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Maximum Guests"
            name="guests_count"
            value={formData.guests_count}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="About"
            name="about"
            value={formData.about}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
            required='True'
          />
          <TextField
            label="Restrictions"
            name="restrictions"
            value={formData.restrictions}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
            required='True'
          />
          <br/>
          <Typography> Add Image</Typography>
          <br/>
           <input type="file" name="image" onChange={handleImageChange} /> {/* Add image file input field */}
          {/* Placeholder for image file upload */}
          {/* <input type="file" name="image" onChange={handleChange} /> */}
          <TextField
            label="Date of Event"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div display='flex' align='center'>
          <Button variant="contained" color='black' type="submit" >
            Update Event
          </Button>

          </div>
        
        </form>
      </CardContent>
    </Card>
    </Box>:<EventUpdationSuccessCard/>}
    </>
    
    
    
    

    
  );
};

export default UpdateEvent;
