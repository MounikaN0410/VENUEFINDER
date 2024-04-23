import { GoogleLogout } from "react-google-login";
import { Link,useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID="258575485385-c6q5aqbmco9ljkeglp51aqrpkd0p821c.apps.googleusercontent.com" 

export default function GLogout(){
    const navigate = useNavigate();
    const onSuccess = (res) =>{
        console.log("Logout Successfull !!!!!!!!!")
        sessionStorage.clear()
        navigate('/')
    }

    return(
        <div id="signOutButton">
            <GoogleLogout 
                clientId= {GOOGLE_CLIENT_ID}
                buttonText="Google Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}