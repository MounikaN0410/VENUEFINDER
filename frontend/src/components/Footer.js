import React, { Component } from 'react'
import { Link } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Footer.css'
export default class Footer extends Component {
  render() {
    return (
      
        <footer className="footer">
      <div className="social-links">
        <Link href="https://www.facebook.com/" target="_blank" color='#ffffff' rel="noopener" className="social-link">
          <FacebookIcon />
          Facebook
        </Link>
        <Link href="https://www.twitter.com/" target="_blank" color='#ffffff' rel="noopener" className="social-link">
          <TwitterIcon />
          Twitter
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" color='#ffffff' rel="noopener" className="social-link">
          <InstagramIcon />
          Instagram
        </Link>
      </div>
      <div className="copy">&copy; 2023 Venue Finder. All rights reserved.</div>
    </footer>  
      
    )
  }
}


