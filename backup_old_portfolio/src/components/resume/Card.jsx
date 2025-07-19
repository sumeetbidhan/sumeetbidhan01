import React from 'react';

const Card = (props) => {
  return (
    <div className="timeline_item">
      <i className={props.icon}></i>
      <span className="timeline_date">{props.year}</span>
      <h3 className="timeline_title">{props.title}</h3>
      <p className="timeline_text">{props.desc}</p>

      {props.authority && <p><strong>Issued By:</strong> {props.authority}</p>}

      {props.link && (
        <a href={props.link} target="_blank" rel="noopener noreferrer"           className="btn"
        >
          View Certificate
        </a>
      )}
    </div>
  );
}

export default Card;
