import React from "react";
import '../css/footerStyle.css';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="container-flex">
        <div className="icons">
          <FaTwitter className="icon1" />
          <FaFacebook className="icon1" />
          <FaInstagram className="icon1" />
          <FaLinkedin className="icon1" />
        </div>
        <div className="copyright">
        <p>Designed and maintained by</p><p><i> Lavanya Sandula and Danish</i></p>
        </div>
        <div className="copyright">
        <p>All rights reserved &copy;</p>
          <p>IIT Kanpur</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
