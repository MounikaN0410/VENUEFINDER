import logo from './logo.svg';

import './App.css';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import bgImg from './components/assets/image_customer_home.png';
import CustomerHome from './components/CustomerHome'; 
import UserProfile from './components/UserProfile';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import LGN from './components/LGN';
import SUP from './components/SUP';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import AboutUs from './components/Aboutus';
import ContactUs from './components/ContactUs';
import FaqComponent from './components/FAQ';
import OwnerDashboardpage from './components/OwnerDashboard/OwnerDashboardpage';
// import SpecificVenuePage from './components/SpecificVenuePage';
import Eventspage from './components/Eventspage';
import PaymentSuccess from './components/PaymentSuccess';
import Venuespage from './components/Venuespage';
import AddVenueForm from './components/OwnerDashboard/AddVenueForm';
import AddEventForm from './components/OwnerDashboard/AddEventForm';
import OwnerProfile from './components/OwnerDashboard/OwnerProfile';
import Home from './components/LandingPage/Home'
import MyBookings from './components/MyBookings'
import TwoFactorAuthComponent from './components/TwoFactorAuthComponent'
import Searched from './components/Search'
import ResetPassword from './components/ResetPassword';
import Pricefilter from './components/Pricefilter';
import Capacityfilter from './components/Capacityfilter';
import PaymentForm from './components/PaymentForm';
import KommunicateChat from './components/chat'


function App() {
  return (
    <div className="App vh-100">
      <KommunicateChat />
         <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/CustomerHome" element={<CustomerHome />} />
      <Route path="/SignUp" element={<SUP />} />
      <Route path="/Login" element={<LGN />} />
      <Route exact path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
      <Route exact path= '/UserProfile' element={<UserProfile />} ></Route>
      <Route exact path= '/AboutUs' element={<AboutUs />} ></Route>
      <Route exact path= '/FAQ' element={<FaqComponent />} ></Route>
      <Route exact path= '/OwnerDashboardpage' element={<OwnerDashboardpage />} ></Route>
      {/* <Route exact path= '/SpecificVenuePage' element={<SpecificVenuePage />} ></Route> */}
      <Route exact path= '/ResetPassword/:id' element={<ResetPassword />} ></Route>
      <Route exact path= '/Eventspage' element={<Eventspage />} ></Route>
      <Route exact path= '/Venuespage' element={<Venuespage />} ></Route>
      <Route exact path= '/PaymentSuccess' element={<PaymentSuccess />} ></Route>
      <Route exact path= '/AddEventForm' element={<AddEventForm />} ></Route>
      <Route exact path= '/AddVenueForm' element={<AddVenueForm />} ></Route>
      <Route exact path= '/ContactUs' element={<ContactUs/>} ></Route>
      <Route exact path= '/OwnerProfile' element={<OwnerProfile/>} ></Route>
      <Route exact path= '/MyBookings' element={<MyBookings/>} ></Route>
      <Route exact path= '/Landingpage' element={<Home/>} ></Route>
      <Route exact path= '/TwoFactorAuth' element={<TwoFactorAuthComponent/>} ></Route>
      <Route exact path= '/Search' element={<Searched/>} ></Route>
      <Route exact path= '/Pricefilter' element={<Pricefilter/>} ></Route>
      <Route exact path= '/Capacityfilter' element={<Capacityfilter/>} ></Route>
      <Route exact path= '/PaymentForm' element={<PaymentForm/>} ></Route>
      

     

      {/* <Route exact path= '/ContactUs' element={<ContactUs/>} ></Route> */}
      {/* <Route path="/CustomerHome" element={<CustomerHome/>} />
      <Route path="/CustomerHome" element={<CustomerHome/>} />
       */}
    </Routes>
    </BrowserRouter>
      
       {/* <Login/>  */}
      {/* <SUP /> */}
      {/* <LGN />
      <SUP/> */}
      {/* <SignUp/> */}
      {/* <CustomerHome/> */}
      {/* <UserProfile/> */}
      
       
      
      
      </div>
    // <Login/>
 
    
 
    // <div className="App">
      
    //    <Login/> 
    //    <ForgotPasswordPage/>
      
    //   <SignUp/>
    //   <CustomerHome/>
      
      
       
      
      
    //   </div>
    
  );
}

export default App;
