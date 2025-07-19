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
            <p className="about_description">I'm Sumeet Bidhan, a full-stack developer with hands-on experience building scalable, user-focused web and mobile applications. I work across the stack using technologies like React, Next.js, TypeScript, FastAPI, PostgreSQL, Firebase, and Docker—delivering solutions that balance performance, usability, and business value.

Currently, I lead full-stack development at Blossoms Aroma Pvt. Ltd., where I’ve built a feature-rich eCommerce site and a cross-platform app, integrating tools like Shopify, WordPress, Razorpay, and CI/CD pipelines hosted on Hostinger and AWS.

Previously at RegisterKaro, I collaborated with marketing and CRM teams to launch high-converting, SEO-optimized pages and payment portals that helped boost lead generation and revenue.

I bring additional experience in UI/UX design, data visualization, and cloud deployment, and I thrive in fast-paced, agile environments where I can turn real-world challenges into impactful digital solutions.

Take a look at my projects and let’s connect if you'd like to work together or discuss new opportunities!

</p>
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