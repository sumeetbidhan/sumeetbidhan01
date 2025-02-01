import React from 'react';
import './About.css';
import Me from '../../assets/avatar-1.svg';

const About = () => {
  return (
    <section className='about container section' id='about'>
      <h2 className="section_title">About Me</h2>

      <div className="about_container grid">
        <img src={Me} alt="" className="about_img" />

        <div className="about_data grid">
          <div className="about_info">
            <p className="about_description">Welcome to my website! I’m a passionate Fullstack Developer with over 1 year of hands-on experience. I thrive on  crafting robust, user-friendly web applictions. Explore my portfolio and discover how I merge analytical skills with development expertise to drive innovation and deliver impactful results.</p>
            <a href="https://drive.google.com/file/d/1faIpnCeeng6vi8jaCw1WHSGsp7VC87ga/view" className="btn">Download CV</a>
          </div>
          <div className="about_skills grid">
            <div className="skills_data">
              <div className="skills_titles">
                <h3 className="skills_name">Frontend Development</h3>
                <span className="skills_number">90%</span>
              </div>
              <div className="skills_bar">
                <span className="skills_percentage frontend"></span>
              </div>
            </div>

            <div className="skills_data">
              <div className="skills_titles">
                <h3 className="skills_name">Backend Development</h3>
                <span className="skills_number">70%</span>
              </div>
              <div className="skills_bar">
                <span className="skills_percentage backend"></span>
              </div>
            </div>

            <div className="skills_data">
              <div className="skills_titles">
                <h3 className="skills_name">Fullstack Development</h3>
                <span className="skills_number">70%</span>
              </div>
              <div className="skills_bar">
                <span className="skills_percentage fullstack"></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
export default About;