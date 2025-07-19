import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Logo from '../../assets/logo.svg';
import LogoDark from '../../assets/logo01.svg'; // Import for dark mode

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [activeSection, setActiveSection] = useState('');

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
    localStorage.setItem('theme', newTheme);
  };

  // Track the scroll position and update active section
  const handleScroll = () => {
    const sections = ['home', 'about', 'resume', 'portfolio', 'contact'];
    let currentSection = '';

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      if (
        sectionElement.offsetTop <= window.scrollY + 100 &&
        sectionElement.offsetTop + sectionElement.clientHeight > window.scrollY
      ) {
        currentSection = section;
      }
    });

    setActiveSection(currentSection);
  };

  // Add scroll event listener on mount and cleanup on unmount
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  return (
    <aside className="aside">
      <a href="#home" className="nav_logo">
        <img src={darkMode ? LogoDark : Logo} alt="Logo" />
      </a>

      {/* Dark/Light Mode Toggle */}
      <div className="theme-toggle">
        <i
          className={`fa-solid fa-toggle-on theme-toggle-icon ${darkMode ? 'dark' : ''}`}
          onClick={toggleTheme}
        ></i>
      </div>

      <nav className="nav">
        <div className="nav_menu">
          <ul className="nav_list">
            <li className="nav_item">
              <a
                href="#home"
                className={`nav_link ${activeSection === 'home' ? 'active' : ''}`}
              >
                <i className="icon-home"></i>
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#about"
                className={`nav_link ${activeSection === 'about' ? 'active' : ''}`}
              >
                <i className="icon-user-following"></i>
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#resume"
                className={`nav_link ${activeSection === 'resume' ? 'active' : ''}`}
              >
                <i className="icon-graduation"></i>
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#portfolio"
                className={`nav_link ${activeSection === 'portfolio' ? 'active' : ''}`}
              >
                <i className="icon-layers"></i>
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#contact"
                className={`nav_link ${activeSection === 'contact' ? 'active' : ''}`}
              >
                <i className="icon-bubble"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="nav_footer">
        <span className="copyright">&copy;2025 - 2026</span>
      </div>
    </aside>
  );
};

export default Sidebar;
