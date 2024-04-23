import React, { useState } from "react";
  import { styled, alpha } from '@mui/material/styles';
  import AppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import Button from '@material-ui/core/Button';
  import SpecificVenue from './SpecificVenue'
  import {useNavigate} from 'react-router-dom';
  import Toolbar from '@mui/material/Toolbar';
  import IconButton from '@mui/material/IconButton';
  import Typography from '@mui/material/Typography';
  import InputBase from '@mui/material/InputBase';
  import Badge from '@mui/material/Badge';
  import MenuItem from '@mui/material/MenuItem';
  import Menu from '@mui/material/Menu';
  import MenuIcon from '@mui/icons-material/Menu';
  import SearchIcon from '@mui/icons-material/Search';
  
  import FilterListIcon from '@mui/icons-material/FilterList';
  import AccountCircle from '@mui/icons-material/AccountCircle';
  import MailIcon from '@mui/icons-material/Mail';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import MoreIcon from '@mui/icons-material/MoreVert';
  import TemporaryDrawer from './Sidebar';
//   import {useNavigate} from 'react-router-dom';
  import { Component ,  useEffect} from 'react';
  import VenueCard from "./Venuecard";
  import SpecificEvent from "./SpecificEvent";
  import axios from "axios";
  
  const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(1), // Updated padding to 1 from 0
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    const FilterIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
  
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'black',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1), // Updated padding to 1 from 0
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));

const Searched = (data) => {
    const navigate=useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venueselected,setvenueselected]=useState(null)
  const [ispopularvenueVisible, setispopularvenueVisible] = useState(true);
  const [isComponent1Visible, setisComponent1Visible] = useState(true);

  // let [VenueData, setVenueData] = useState([]);
  // let[EventData, setEventData]  =useState([])
  

  // useEffect( () => {
    
  //   const fetchVenueData = async () => {
  //     try{
  //     const cachedVenueData = localStorage.getItem("venue-data");
  //     console.log("CachedVenueData : ",typeof cachedVenueData);
  //     if (cachedVenueData) {
  //       console.log("Getting the cached data already stored in localstorage")
  //       setVenueData(cachedVenueData)
  //     } else{        
  //       const resp = await axios.get("https://venue-finder-backend.onrender.com/venue?status=&min_price=&max_price=&min_area=&max_area=&min_capacity=&max_capacity=&constructed_after=&limit=&offset=");
  //       setVenueData(JSON.parse(JSON.stringify(resp.data.data)))
  //       localStorage.setItem('venue-data', JSON.stringify(resp.data.data));
  //     }

  //   } catch(error){
  //     // console.log("Venue API not hit")
  //     console.log(error);
  //   }
  // };

  //   localStorage.removeItem('venue-data')
  //   fetchVenueData();
  //   // let venues = VenueData
  //   // console.log(" venues : ", typeof venues)
  //   // console.log("VenueData : ", typeof VenueData)
    
  //   const fetchEventData = async () => {
  //     try{
  //     const cachedEventData = localStorage.getItem("event-data");
  //     console.log("CachedVenueData : ",typeof cachedVenueData);
  //     if (cachedEventData) {
  //       console.log("Getting the cached data already stored in localstorage")
  //       setVenueData(cachedEventData)
  //     } else{
  //       // console.log("fetching the data ....")
  //       const resp = await axios.get("https://venue-finder-backend.onrender.com/event");
  //       // console.log("Venue api hit")
  //       // console.log(" server response : ",typeof JSON.parse(JSON.stringify(resp.data.data)))
  //       setEventData(JSON.parse(JSON.stringify(resp.data.data)))
  //       // console.log(" typeof VenueData : ",typeof VenueData)
  //       localStorage.setItem('event-data', JSON.stringify(resp.data.data));
  //     }
  //     // console.log("Venue Data",VenueData);

  //   } catch(error){
  //     // console.log("Venue API not hit")
  //     console.log(error);
  //   }
  // };
  //   localStorage.removeItem('event-data')
  //   fetchEventData();

    
  // }, []);

  const searchdata = [...data.venueData, ...data.eventData];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    // Filter the data and update the state with filteredData
    const filteredData = searchdata.filter(item => item.name.includes(e.target.value));
    setFilteredData(filteredData);
  };
  // const searchdata=[
  //   {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', name:'Bloom Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {owner_id:'1', name:'Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
  //   {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'2', name:'Cooking Class', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
  //       {host_id:'3', name:'Live Music', status:'Open', entry_price:'6.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'}
  // ]
  let handleVenueSelect = (venue) => {
    setvenueselected(venue);
    setisComponent1Visible(!isComponent1Visible);
    
    console.log("*****",venueselected);
    
  }
  const handleButtonClick = (venueName) => {
    // Find the selected venue from filtered data
    const selectedVenue = filteredData.find(item => item.name === venueName);
    setSelectedVenue(selectedVenue); // Update the selected venue state
    console.log(',,,,,,,',selectedVenue)
  };

  return (
    <>




<Search>
<SearchIconWrapper>
  <SearchIcon />
</SearchIconWrapper>
<StyledInputBase
  placeholder="Search for Venues"
  inputProps={{ 'aria-label': 'search' }}
  onChange={handleSearchChange}
   value={searchInput} 
/>

{filteredData.length > 0 && (
        <div>
          
          {filteredData.map(item => (
            <Button key={item.id} onClick={() => handleButtonClick(item.name)}>
            {item.name}
          </Button>
          
          ))}
          {isComponent1Visible ? 
      <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {filteredData.map((venue, index) => ( <div onClick={() => handleVenueSelect(venue)}>
        <VenueCard
          key={index}
          owner_id={venue.owner_id}
          image={venue.image_url}
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
       
     
       </div> :<div>
        <SpecificVenue venue={venueselected} />
        </div>}
          {/* <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'center',margin:'10px'}}>
      {filteredData.map((venue, index) => ( <div onClick={() => handleVenueSelect(venue)}>
        <VenueCard
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
       
     
       </div> */}
        </div>
      )}
    <Button onClick={()=>navigate('/Pricefilter')}>Price: low-High</Button>
    <Button onClick={()=>navigate('/Capacityfilter')}>Capacity: low-High</Button>


</Search>
{selectedVenue && <VenueCard owner_id={selectedVenue.owner_id}
          image={selectedVenue.image_url}
          name={selectedVenue.name}
          status={selectedVenue.status}
          lease_price={selectedVenue.lease_price}
          
          capacity={selectedVenue.capacity}
          latitude={selectedVenue.latitude}
          longitude={selectedVenue.longitude}
          area={selectedVenue.area}
          
          about={selectedVenue.about}
          restrictions={selectedVenue.restrictions}
          construction_date={selectedVenue.construction_date} />}
</>
  );
};

// Your styled components go here...

export default Searched;


// import React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterIcon from '@mui/icons-material/FilterList';

// const Searched = () => {
//   return (
//     <Search>
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>
//       <StyledInputBase
//         placeholder="Search Events"
//         inputProps={{ 'aria-label': 'search events' }}
//       />
//       <FilterIconWrapper>
//         <FilterIcon />
//       </FilterIconWrapper>
//     </Search>
//   );
// };

// const Search = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0.5),
//   height: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const FilterIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0.5),
//   marginLeft: theme.spacing(1),
//   height: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// export default Searched;

