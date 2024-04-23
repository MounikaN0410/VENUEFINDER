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
import VenueUpdationSuccessCard from '../VenueUpdationSuccessCard';


import bgimg from '../assets/image4.png'
import OwnerVenueCard from './OwnerVenueCard';



const UpdateVenue = (venue) => {
    console.log('venue',venue)
  const [formData, setFormData] = useState({

    
    name: venue.venue.name,
    status: venue.venue.status,
    lease_price:venue.venue.lease_price,
    latitude: venue.venue.latitude,
    longitude: venue.venue.longitude,
    area: venue.venue.area,
    capacity:venue.venue.capacity,
    about: venue.venue.about,
    restrictions: venue.venue.restrictions,
    construction_date: venue.venue.construction_date
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
    requestFormData.append("lease_price",formData.lease_price);
    requestFormData.append("latitude",formData.latitude);
    requestFormData.append("longitude",formData.longitude);
    requestFormData.append("area",formData.area);
    requestFormData.append("capacity",formData.capacity);
    requestFormData.append("about",formData.about);    
    requestFormData.append("restrictions",formData.restrictions);    
    requestFormData.append("construction_date",formData.construction_date);    
    requestFormData.append('image', selectedFile);

    try {
      console.log(sessionStorage.getItem('jwt_token'))
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"OWNER"}
      const response = await axios.put(`https://venue-finder-backend.onrender.com/venue/${venue.venue.id}`, requestFormData,{ headers });
      console.log(response.data);
      // Optionally, you can show a success message or redirect to a success page here
      setUpdated(true)
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
           <div display='flex' align='center'><Typography variant='h5' color='#292d29'>Update Venue Details</Typography></div> 
          <TextField
          
            label="Name of the Venue"
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
            label="Lease Price"
            name="lease_price"
            value={formData.lease_price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required='True'
          />
          <TextField
            label="Capacity"
            name="capacity"
            value={formData.capacity}
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
            value={formData.construction_date}
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
            Update Venue
          </Button>

          </div>
        
        </form>
      </CardContent>
    </Card>
    </Box>:<VenueUpdationSuccessCard/>}
    </>
    
    
    
    

    
  );
};

export default UpdateVenue;
