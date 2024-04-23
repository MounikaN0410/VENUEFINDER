import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@mui/material/Typography';
import Footer from '../Footer'
import OwnerNavbar from './OwnerNavbar';
import UpdateVenue from './UpdateVenue'

import bgimg from '../assets/image4.png'
import Box from '@material-ui/core/Box';
const AddVenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Available',
    latitude: '',
    longitude: '',
    area: '',
    capacity: '',
    about: '',
    restrictions: '',
    lease_price:"",
    construction_date: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
 
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
    requestFormData.append("area",formData.area);
    requestFormData.append("latitude",formData.latitude);
    requestFormData.append("longitude",formData.longitude);
    requestFormData.append("capacity",formData.capacity);
    requestFormData.append("lease_price",formData.lease_price);
    requestFormData.append("about",formData.about);    
    requestFormData.append("restrictions",formData.restrictions);    
    requestFormData.append("construction_date",formData.construction_date);    
    requestFormData.append('image', selectedFile);

    try {
      // Make POST request to backend API with form data
      console.log(sessionStorage.getItem('jwt_token'))
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"OWNER"}
      const response = await axios.post(`https://venue-finder-backend.onrender.com/venue`, requestFormData,{ headers });
      console.log(response.data);
      // Optionally, you can show a success message or redirect to a success page here
    } catch (error) {
      console.error(error);
      // Optionally, you can show an error message or redirect to an error page here
    }
  };

  return (
    <>
    <OwnerNavbar/>
    <Box style={{backgroundImage: `url(${bgimg})`,backgroundSize: 'cover',
        backgroundPosition: 'center',}}>
    
    
    <Card variant='outlined' style={{ margin: '10px auto', maxWidth: '500px' }}> 
      <CardContent>
        <form onSubmit={handleSubmit}>
           <div display='flex' align='center'><Typography variant='h5' color='#292d29'>Provide Venue Details</Typography></div> 
          <TextField
          
            label="Name of the venue"
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
            label="Lease Price"
            name="lease_price"
            value={formData.lease_price}
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
            label="Date of Establishment"
            name="construction_date"
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
            Add Venue
          </Button>

          </div>
        
        </form>
      </CardContent>
    </Card>
    </Box>
    
    
    
    
<Footer/>
    </>
  );
};

export default AddVenueForm;
