import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} UPSI Campus Navigator. All rights reserved.</p>
      <p>
        Developed by <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer">Your Name</a>.
      </p>
    </footer>
  );
};

export default Footer;
