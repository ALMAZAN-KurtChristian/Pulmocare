import React from 'react';
import './Footer.scss'; // Import your stylesheet here
import FOOTERLOGO from './IMAGES/FOOTER/FOOTERLOGO.png'; // Import your footer logo here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-section">
            <img src={FOOTERLOGO} alt="FooterLogo Image" className="FOOTERLOGO-image" />
            <p >PulmoCare is a dedicated team of technologists and medical professionals committed to revolutionizing pulmonary healthcare with AI technology.</p>
          </div>
          <div className="footer-section">
          <h3>Partnered Facilities</h3>
            <p>Saint Benedict Hall - Our Lady of Fatima University</p>

            <h3>Address</h3>
            <p>Tamaraw Hills Ext, Valenzuela, Metro Manila</p>
            <a id='gmap'  href ="https://www.google.com/maps/d/viewer?mid=1vHTDYRfdQl7WgIz--9h-choq7HM&ie=UTF8&hl=en&msa=0&ll=14.678889052109811%2C120.
            98297061977101&spn=0.003051%2C0.004823&t=h&z=20" > Click here for Google Map </a>
            
            </div>
          <div className="footer-section">
            <h3>Send us a message!</h3> 
            <h4>Email: Macapugay@student  </h4>
            <h4>Facebook: Paulo Macapugay</h4>
          </div>
        </div>
        <p className='Reserved'>Pulmocare &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
