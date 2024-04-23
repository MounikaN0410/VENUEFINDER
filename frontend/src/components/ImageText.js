import React from 'react';
import backgroundImage from './assets/image4.png';


const ImageText = ({ headtext,subtext }) => {
  const imageStyle = {
    display: 'flex',
    opacity:'1',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
    width: '100%',
  };
  
  const boxstyle={
    backgroundColor: '#e4eced',
    display:'flex',
    flexWrap:'wrap',
    borderRadius:'15px',
    flexDirection:'column',
    opacity: '0.65',
    margin:'auto',
    
    backgroundPosition: 'center',
    height:'40%',
    width:'50%',
    
   
  };
  const headtextStyle = {
    
    color: 'black',
    fontSize: '3rem',
    fontWeight: 'bold',
    
    textAlign: 'center',
    paddingTop: '80px',
  };
  const subtextStyle = {
    color: 'black',
    fontSize: '2rem',
    flexWrap:'wrap',
    textAlign: 'center',
    paddingTop: '50px',
  };

  return (
    <div style={imageStyle}>
        <div style={boxstyle}>
            <div style={headtextStyle}>{headtext}</div>
            <div style={subtextStyle}>{subtext}</div>

        </div>
    </div>
  );
};

export default ImageText;
