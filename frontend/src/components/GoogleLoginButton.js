import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GOOGLE_CLIENT_ID =
  "258575485385-c6q5aqbmco9ljkeglp51aqrpkd0p821c.apps.googleusercontent.com";

function GLogin() {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    //send a token: {{email: , familyname: , givenname: }}
    console.log("Login Successfull, Current User : ", res.profileObj);
    // const formData = new FormData(res.target);
    const { givenName, familyName, email } = res.profileObj;
    
    console.log(typeof(givenName), givenName)
    const body = new FormData();
    body.append('given_name', givenName)
    body.append('family_name', familyName)
    body.append('email', email)

    console.log(body)
    // const body = {token: tokenData}
    try {
      const response = await axios.post("https://venue-finder-backend.onrender.com/google-signup", 
        body
      );
      console.log("Google Singnup hit");
      
      console.log('RESPONSE : ',response.data); // Handle the response data here
      navigate("/CustomerHome");
    } catch (error) {
      console.log("UNSUCESSFULL GOOGLE LOGIN ATTEMPT")
      console.error("Google Login :: ",error); // Handle any errors here
    }
    
  };

  const onFailure = (res) => {
    console.log("Login Failed, res : ", res);
  };
  

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Signin with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        //cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default GLogin;
