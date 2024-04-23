import { css, display } from '@mui/system';
import { Carousel } from 'antd';
import React from 'react';
import './Carousel.css';


const contentStyle = {
  height: '50vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Slider = () => {
    
    return (
  <Carousel autoplay>
    <div className='carousel-div'>
        <img src={require("../assets/caro1.jpg")} alt="Image 1"/>
    </div>
    <div className='carousel-div'>
        <img src={require("../assets/caro2.jpg")} alt="Image 1" />
    </div>
    <div className='carousel-div'>
        <img src={require("../assets/caro3.jpg")} alt="Image 1" />
    </div>
    <div className='carousel-div'>
        <img src={require("../assets/caro4.jpg")} alt="Image 1" />
    </div>
  </Carousel>)
}
export default Slider;