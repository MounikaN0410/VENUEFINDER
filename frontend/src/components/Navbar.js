import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@material-ui/core/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import TemporaryDrawer from './Sidebar';
import {useNavigate} from 'react-router-dom';
import { Component , useState, useEffect} from 'react';
import Searched from './Search'

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
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const navigate=useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const searchdata=[
    {owner_id:'1', name:'Bloomington Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image: 'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    {owner_id:'1', name:'Bloom Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    {owner_id:'1', name:'Convention Center', status:'Available', lease_price:'5000.00', latitude:'39.1653', longitude:'-86.5264', area:'10000.00', capacity:'1000', about:'The Bloomington Convention Center is a state-of-the-art facility that can accommodate events of all sizes, from small meetings to large conferences and conventions. With modern amenities and a convenient location, it is the perfect choice for your next event in Bloomington.', restrictions:'No Smoking', construction_date:'2005-05-01',image:'https://mspmag.com/downloads/45641/download/The_Depot.jpg?cb=bee781d31fd9fe77c8bdef7788782145&w=1200'},
    {host_id:'1', name:'Gamenight', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'17', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
        {host_id:'2', name:'Cooking Class', status:'Open', entry_price:'10.50', latitude:'39.1653', longitude:'-86.5264', guests_count:'10', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'},
        {host_id:'3', name:'Live Music', status:'Open', entry_price:'6.0', latitude:'39.1653', longitude:'-86.5264', guests_count:'30', about:'Join us for a fun night of board games and snacks!', restrictions:'Adults only', event_date:'2023-04-01',image: 'https://www.entertainmentvice.com/wp-content/uploads/2018/01/Successful-Event-scaled.jpg'}
  ]
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log('????????',searchInput)
  };
  if (searchInput.length > 0) {
    const filteredData = searchdata.filter(searchdata => searchdata.name.includes(searchInput));
    setFilteredData(filteredData);
    console.log('///////',filteredData); // Log the filtered data in the console
  }
  
  // if (searchInput.length > 0) {
  //     searchdata.filter((searchdata) => {
  //     return searchdata.name.match(searchInput);
     
  // });
  // }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>navigate('/UserProfile')}>Profile</MenuItem>
      <MenuItem onClick={()=>navigate('/MyBookings')}>My Bookings</MenuItem>
      <MenuItem onClick={()=>navigate('/')} >Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      
      
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const opensearch=()=>{

  }

  
  
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" sx={{ backgroundColor: '#101010' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
           
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontStyle='italic'
            fontFamily='Charmonman'
            color='white'
            fontWeight='bold'
            
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            VENUE.FINDER
            
          </Typography>
          {/* <div marginLeft='10px'>
            
         
          <Button color="inherit" variant='outlined' onClick={opensearch}>
      SearchVenues
    </Button></div> */}
          
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            > */}
              {/* <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <TemporaryDrawer state={state} 
      setState={setState} 
      toggleDrawer={toggleDrawer}></TemporaryDrawer>

    </Box>
  );
}