// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
// import myimg from './assets/image2.png'

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     margin: '10px',
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
// });

// const venues = [
//   { name: 'Bloomington Convention Center', price: '$500' },
//   { name: 'Deer Park Manor Weddings and Events', price: '$750' },
//   { name: 'Whippoor Will', price: '$1000' },
//   { name: 'Cascades Inn', price: '$400' },
// ];

// const VenueCard = () => {
//   const classes = useStyles();

//   return (
//     <>
//       {venues.map((venue, index) => (
//         <Card key={index} className={classes.root}>
//           <CardMedia 
//             className={classes.media}
//             image="https://source.unsplash.com/random"
//             title={venue.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {venue.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {venue.price}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default VenueCard;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
// import myimg from './assets/image2.png'

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     margin: '10px',
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
// });

// const venues = [
//   { name: 'Bloomington Convention Center', price: '$500'},
//   // { name: 'Deer Park Manor Weddings and Events', price: '$750' },
//   // { name: 'Whippoor Will', price: '$1000' },
//   // { name: 'Cascades Inn', price: '$400' },
// ];

// const VenueCard = () => {
//   const classes = useStyles();

//   return (
//     <>
//       {venues.map((venue, index) => (
//         <Card key={index} className={classes.root}>
//           <CardMedia 
//             className={classes.media}
//             image={myimg}
//             title={venue.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {venue.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {venue.price}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default VenueCard;




// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
// import myimg from './assets/image2.png'

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     margin: '10px',
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
// });

// const venues = [
//   { name: 'Bloomington Convention Center', price: '$500' },
//   { name: 'Deer Park Manor Weddings and Events', price: '$750' },
//   { name: 'Whippoor Will', price: '$1000' },
//   { name: 'Cascades Inn', price: '$400' },
// ];

// const VenueCard = () => {
//   const classes = useStyles();

//   return (
//     <>
//       {venues.map((venue, index) => (
//         <Card key={index} className={classes.root}>
//           <CardMedia 
//             className={classes.media}
//             image="https://source.unsplash.com/random"
//             title={venue.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {venue.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {venue.price}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default VenueCard;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
// import myimg from './assets/image2.png'

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     margin: '10px',
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
// });

// const venues = [
//   { name: 'Bloomington Convention Center', price: '$500'},
//   // { name: 'Deer Park Manor Weddings and Events', price: '$750' },
//   // { name: 'Whippoor Will', price: '$1000' },
//   // { name: 'Cascades Inn', price: '$400' },
// ];

// const VenueCard = () => {
//   const classes = useStyles();

//   return (
//     <>
//       {venues.map((venue, index) => (
//         <Card key={index} className={classes.root}>
//           <CardMedia 
//             className={classes.media}
//             image={myimg}
//             title={venue.name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {venue.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {venue.price}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default VenueCard;



import React, { Component , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import myvenue1 from './assets/bloomingtonconventioncenter.jpg'
import myvenue2 from './assets/Indianapolismarriotdowntown.png'
import myvenue3 from './assets/wonderlab.png'
// import { useState } from "react";
import SpecificVenue from './SpecificVenue';
import { Link } from 'react-router-dom';
// import { useHistory }  from 'react-router-dom';
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
 
const venuedetails=[
  {
    name: 'WonderLab Museum of Science', price: '$400', image: myvenue3 ,status:'Available',about:'Museum',capacity:'200'
  },{
  name: 'Bloomington Convention Center', price: '$500', image: myvenue1,status:'Available',about:'Convention center',capacity:'500'
  
},
{
  name: 'Indianapolis Marriott Downtown', price: '$400', image: myvenue2,status:'Available',about:'Convention center',capacity:'200'
},
]



const VenueCard = ({owner_id, name, status, lease_price, latitude, longitude, area, capacity, about, restrictions, construction_date,image}) => {
  
 

  
  const classes = useStyles();
  const [venueselected,setvenueselected]=useState(null)
  let [VenueData, setVenueData] = useState([]);

  useEffect( () => {
    
    const fetchVenueData = async () => {
      try{
      const cachedVenueData = localStorage.getItem("venue-data");
      console.log("CachedVenueData : ",typeof cachedVenueData);
      if (cachedVenueData) {
        console.log("Getting the cached data already stored in localstorage")
        setVenueData(cachedVenueData)
      } else{
        // console.log("fetching the data ....")
        const resp = await axios.get("https://venue-finder-backend.onrender.com/venue");
        // console.log("Venue api hit")
        // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
        setVenueData(JSON.parse(JSON.stringify(resp.data.data)))
        // console.log(" typeof VenueData : ",typeof VenueData)
        localStorage.setItem('venue-data', JSON.stringify(resp.data.data));
      }
      // console.log("Venue Data",VenueData);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    localStorage.removeItem('venue-data')
    fetchVenueData();
    // let venues = VenueData
    // console.log(" venues : ", typeof venues)
    // console.log("VenueData : ", typeof VenueData)
    
    


  }, []);

  
 

  

  
 


  return (
    <>
    {/* {VenueData.map((venues,index)=>(<div key={index} onClick={() => handleVenueSelect(venues)}> */}
     <Card className={classes.root}>
      
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">

          Price per day: ${lease_price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {status}
        </Typography>
        
        {/* <Typography variant="body2" color="textSecondary" component="p">
          {venues.about}
        </Typography> */}
        <Typography variant="body2" color="textSecondary" component="p">
          Maximum Capacity: {capacity}
          
        </Typography>
      

       
       
      
      </CardContent>
    </Card>
    {/* </div>))} */}
    <br/>

    

    {/* {venueselected && <SpecificVenue venue={venueselected} />} */}
    
    </>
    
   
  );
};
export default VenueCard;




