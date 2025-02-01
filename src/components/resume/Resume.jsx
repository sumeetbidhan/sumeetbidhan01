import React, { useState } from 'react';
import './Resume.css';
import Data from './Data';
import Card from './Card';

const Resume = () => {
  // Set "education" as the default active tab
  const [activeTab, setActiveTab] = useState("education");

  // Define a function to render the section heading based on the active tab
  const renderSectionHeading = () => {
    switch(activeTab) {
      case 'education':
        return <h3 className="section_heading">Education</h3>;
      case 'experience':
        return <h3 className="section_heading">Experience</h3>;
      case 'certifications':
        return <h3 className="section_heading">Certifications</h3>;
      default:
        return null;
    }
  };

  return (
    <section className="resume container section" id="resume">
      <h2 className="section_title">Experience</h2>

      {/* Tab Buttons */}
      <div className="tab_buttons">
        <button 
          className="btn"
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
        <button 
          className="btn"
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
        <button 
          className="btn"
          onClick={() => setActiveTab("certifications")}
        >
          Certifications
        </button>
      </div>

      <div className="resume_container grid">
        {/* Render section heading based on the active tab */}
        {renderSectionHeading()}

        <div className="timeline grid">
          {Data.filter(item => item.category === activeTab).map((val, id) => (
            <Card 
              key={id}
              icon={val.icon}
              title={val.title}
              year={val.year}
              desc={val.desc}
              authority={val.authority}
              link={val.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resume;