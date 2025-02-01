import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; 2025 - 2026 Sumeet Bidhan </p>
      </div>
      <div className="footer-right">
        <ul>
          <li>
            <a href="https://github.com/sumeetbidhan" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> 
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/sumeetbidhan/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i> 
            </a>
          </li>
          <li>
            <a href="mailto:sumeetbidhanwork@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i> 
            </a>
          </li>
          {/* Add any other links you want here */}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
