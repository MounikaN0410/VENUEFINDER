
import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import NavBar from './Navbar';
import Divider from '@mui/material/Divider';
import {Grid} from '@mui/material'
import BookedEvent from './BookedEvent'
import BookedVenue from './BookedVenue'
// import image4 from

const UserProfile = () => {
  const [id, setID] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [dob, setdob] = React.useState('');


  useEffect( () => {    
    const fetchUserData = async () => {
      try{
        const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"USER"}
        const resp = await axios.get("https://venue-finder-backend.onrender.com/user",{headers});
        setID(resp.data.data.user_id);
        setFirstName(resp.data.data.first_name);
        setLastName(resp.data.data.last_name);
        setEmail(resp.data.data.email_id);
        setContactNumber(resp.data.data.contact_number);
        setdob(resp.data.data.date_of_birth);

    } catch(error){
      // console.log("Venue API not hit")
      console.log(error);
    }
  };
    fetchUserData();
  }, []);

  const bookedvenues=[
    {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    // {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'}
    
    
  ]
  const previousvenues=[
    {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    // {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'}
    
    
  ]
  const bookedevents=[
    {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    // {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'}
    
      
  ]
  const previousevents=[
    {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
    // {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'}
    
      
  ]

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestFormData = new FormData();

    requestFormData.append("first_name",firstName);
    requestFormData.append("last_name",lastName);
    requestFormData.append("date_of_birth",dob);
    requestFormData.append("contact_number",contactNumber);

    try {
      const headers={"x-access-tokens":sessionStorage.getItem('jwt_token'),"role":"USER"}
      const response = await axios.put(`https://venue-finder-backend.onrender.com/user/${id}`, requestFormData,{ headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 

  const navigate=useNavigate();
  return (
   

<>

<NavBar/>
<br/>
<div style={{
 
        // backgroundImage: `url('/image4.png')`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
      }}>
<Typography variant='h3' fontFamily='Charmonman' align='center'>My Personal Profile</Typography></div>
<br/>
<Divider/>

     <Box display='flex' justifyContent='center' mt={5} style={{
        
      }}>
     <form onSubmit={handleSubmit}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            readOnly={true}
            value={email}
            // onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
        </Grid>
        <br/>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            fullWidth
          />
        </Grid>
        <br/>
      
        <br/>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date Of Birth "
            value={dob}
            onChange={(event) => setdob(event.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <br/>
      <div align='center'>
     <Button type="submit" variant="contained" color="inherit" >
        Update Profile Details
      </Button>

     </div>

      
    </form>

     </Box>
     <br/>
     
     <br/>
     <Divider/>
    
     <br/>
     {/* <div display='flex' align='center'>  <Typography variant='h4' fontFamily='Charmonman' >Current Bookings</Typography></div>
    
    
     <Grid container  margin={'10px'} style={{ backgroundColor: '#cdcecb' }}>
    
       <Grid item xs={12} sm={6}>
       <div >
          <div display='flex' align='center' mt={'10px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Event Bookings</Typography>

          </div>
         
         <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {bookedevents.map((event, index) => ( <div>
        <BookedEvent
          key={index}
          image={event.image}
          name={event.name}
          price={event.entry_price}
          date={event.event_date}
          status={event.status}
          latitude={event.latitude}
          longitude={event.longitude}
          guests_count={event.guests_count}
          about={event.about}
          restrictions={event.restrictions}
          event_date={event.event_date}
        />
        </div>
      ))}
      </div>
        </div>

       </Grid>

       <Grid item xs={12} sm={6} >
       <div style={{ backgroundColor: '#cdcecb' }}>
          <div display='flex' align='center' mt={'10px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Venue Bookings</Typography>

          </div>

          <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {bookedvenues.map((venue, index) => ( <div >
        <BookedVenue
          key={index}
          owner_id={venue.owner_id}
          image={venue.image}
          name={venue.name}
          status={venue.status}
          lease_price={venue.lease_price}
          
          capacity={venue.capacity}
          latitude={venue.latitude}
          longitude={venue.longitude}
          area={venue.area}
          
          about={venue.about}
          restrictions={venue.restrictions}
          construction_date={venue.construction_date}
        />
        </div>
      ))}
       
     
       </div>
       </div>
       </Grid>
       </Grid>
     
       

    
       <Grid container  margin={'10px'} style={{ backgroundColor: '#cdcecb' }}>
        
    
       <Grid item xs={12} sm={6}>
       <div >
          <div display='flex' align='center' mt={'20px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Previously Booked Events</Typography>

          </div>
         
         <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {previousevents.map((event, index) => ( <div>
        <BookedEvent
          key={index}
          image={event.image}
          name={event.name}
          price={event.entry_price}
          date={event.event_date}
          status={event.status}
          latitude={event.latitude}
          longitude={event.longitude}
          guests_count={event.guests_count}
          about={event.about}
          restrictions={event.restrictions}
          event_date={event.event_date}
        />
        </div>
      ))}
      </div>
        </div>
      
       </Grid>
       <Grid item xs={12} sm={6} >
       <div style={{ backgroundColor: '#cdcecb' }}>
          <div display='flex' align='center' mt={'20px'}>
          <Typography variant='h5' fontFamily='Charmonman' fontStyle='italic'>Previously Booked Venues</Typography>

          </div>

          <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {previousvenues.map((venue, index) => ( <div >
        <BookedVenue
          key={index}
          owner_id={venue.owner_id}
          image={venue.image}
          name={venue.name}
          status={venue.status}
          lease_price={venue.lease_price}
          
          capacity={venue.capacity}
          latitude={venue.latitude}
          longitude={venue.longitude}
          area={venue.area}
          
          about={venue.about}
          restrictions={venue.restrictions}
          construction_date={venue.construction_date}
        />
        </div>
      ))}
       
     
       </div>
       </div>
       </Grid>
       </Grid> */}

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<Footer/>


      

     
     
     

            
         
</>


  )
}

export default UserProfile




