import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import UpdateVenue from './UpdateVenue';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: '10px',
    minWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const OwnerVenueCard = ({ owner_id, id, name, status, lease_price, latitude, longitude, area, capacity, about, restrictions, construction_date, image }) => {
  const classes = useStyles();
  let [venueselected, setvenueselected] = useState(null);
  let [VenueData, setVenueData] = useState([]);

  const handleUpdateVenue = () => {
    setvenueselected({
      owner_id,
      id,
      name,
      status,
      lease_price,
      latitude,
      longitude,
      area,
      capacity,
      about,
      restrictions,
      construction_date,
      image,
    });
  };

  const handleDeleteVenue = async () => {
    try {
      console.log(sessionStorage.getItem('jwt_token'))
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"OWNER"}
      const response = await axios.delete(`https://venue-finder-backend.onrender.com/venue/${id}`,{ headers });
      console.log(response.data);
      // Optionally, you can show a success message or redirect to a success page here
    } catch (error) {
      console.error(error);
      // Optionally, you can show an error message or redirect to an error page here
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: ${lease_price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {status}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Maximum Capacity: {capacity}
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <Button size="small" color="black" variant="outlined" onClick={handleUpdateVenue}>
              Update Venue
            </Button>
            <IconButton size="small" color="black" onClick={handleDeleteVenue}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      {venueselected && (
        <UpdateVenue
          venue={{
            owner_id: venueselected.owner_id,
            id: venueselected.id,
            name: venueselected.name,
            status: venueselected.status,
            lease_price: venueselected.lease_price,
            latitude: venueselected.latitude,
            longitude: venueselected.longitude,
            area: venueselected.area,
            capacity: venueselected.capacity,
            about: venueselected.about,
            restrictions: venueselected.restrictions,
            construction_date: venueselected.construction_date,
            image: venueselected.image,
          }}
        />
      )}
    </>
  );
};

export default OwnerVenueCard;
