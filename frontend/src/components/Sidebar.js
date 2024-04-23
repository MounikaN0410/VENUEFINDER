import * as React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ContactUs from './ContactUs';
import AboutUs from './Aboutus';
import {useNavigate} from 'react-router-dom';
import FaqComponent from './FAQ'
// import ContactUspage from './ContactUspage';

// import { useHistory } from 'react-router-dom';


export default function TemporaryDrawer({state,setState,toggleDrawer}) {
    const navigate=useNavigate();

//     const history = useHistory();
//   const [selectedIndex, setSelectedIndex] = React.useState(-1);

//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//     Navigate('/Aboutus')
//  


  const list = (anchor) => (
    
    



    <Box backgroundColor='white'
    // opaqity='50px'

    
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     
      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/CustomerHome')}>
                Home
            </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/AboutUs')}>
                About Us
            </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/Venuespage')}>
                Venues
            </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/Eventspage')}>
               Events
            </ListItemButton>
        </ListItem>
      </List>
      

      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/ContactUs')}>
                Contact Us
            </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/FAQ')}>
                FAQ's
            </ListItemButton>
        </ListItem>
      </List>


      <Divider/>

      

     




      
      {/* <Divider /> */}
      {/* <List> */}
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton> */}
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              {/* <ListItemText primary={text} />
            </ListItemButton>
          </ListItem> */}
        {/* ))}
      </List> */}
    </Box>

    
  );
//   const handleListItemClick = (index) => {
    
    
   

//     // Render card component
//     const card = (
//         // <ContactUs/>
//       <Card>
//         <CardContent>
//           <Typography variant="h5" component="h2">
//             Card Title
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color="text.secondary">
//             Card Subtitle
//           </Typography>
//           <Typography variant="body2">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius mauris nec ex
//             congue commodo. Sed eleifend risus vel commodo pharetra.
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Learn More</Button>
//         </CardActions>
//       </Card>
//     );
//     ReactDOM.render(card, document.getElementById('card-container'));
// };



  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}