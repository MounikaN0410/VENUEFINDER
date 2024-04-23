import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './card';

import './Grid22.css'

export default class Grid22 extends Component {
  render() {
    return (
        <div>
            <h2>Our plus points</h2>
            

            <div className="containerPluspoints">
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <ActionAreaCard heading={"Convenience"} body={"By offering various venues  on the same place we ensure that deciding on a venue for whatever event you want becomes an extremely easy task. This salso ensures that you spend less time looking around for venues and more time on productive work"}/>
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard heading={"Competitive pricing"} body={"The rpices we offer are the best in the industry and provide the best comforts. Our pricing is extremely affordable for customers from all backgrounds. "}/>
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard heading={"Simplicity"} body={"This website is the definition of simplicity. Our state-of-the-art navigation process makes it extremely easy to move around the websites. ever venues provides a lot of information when clicked upon so that you see what you will get"}/>
              </Grid>
              <Grid item xs={6}>
                <ActionAreaCard heading={"Sustainability"} body={"For every booking you make we plant 1 one tree under your name so that you join us in making the earth more sustainable and reducing gloabal warming. We also donate 1% of every proceddings to the American Red Cross"}/>
              </Grid>
            </Grid>
          </div>

                {/* <div class="wrapper">
                        <div class="content">
                            <h6>Headertext</h6>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    <div class="column-image"></div>

                <div class="wrapper">
                    <div class="column-image"></div>
                        <div class="content">
                            <h6>Headertext</h6>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div> */}


                <div class="review">
                    <div class="image">
                        <img src={require("../assets/grid1.jpg")} style={{width:1500, height:500}} ></img>
                    </div>
                    <div class="text">
                      
                        <p>I held my birthday party over here and the location that it was held was exactly as shown in the photos. The team provided excellent responses when issues arised. I will definetly use Venue Finder again, its the best</p>
                        <h4>-Jon Snow</h4>
                    </div>
                </div>

                <div class="review">
                    <div class="text">
                    <p>I held a family get together at this place. I has been one of the most fun days of my life. Our extended family was meeting after a long time and hence the venue had to be perfect, and indeed it was. The services mentioned on the site matched what we were presented with</p>
                        <h4>-Jack Sparrow</h4>
                    </div>
                    <div class="image">
                        <img src={require("../assets/grid2.jpg")} style={{width:1500, height:500}}></img>
                    </div>
                </div>
        </div>

    )
  }
}




