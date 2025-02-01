;import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // Set up state for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('access_key', '3d7321bc-f327-4af7-a94c-9b002ec6801f'); // Add the access key

    // Convert formData to a JSON object
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Make the POST request to the Web3Forms API
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then((res) => res.json());

    // Show alert based on the response
    if (res.success) {
      alert(res.message);
      // Optionally clear form after successful submission
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <section className="contact container section" id="contact">
      <h2 className="section_title">Get In Touch</h2>

      <div className="contact_container grid">
        <div className="contact_info">
          <h3 className="contact_title">Let's talk about everything!</h3>
          <p className="contact_details">Don't like forms? Send me an email. 👋🏼</p>
        </div>

        {/* The form now uses the onSubmit handler */}
        <form className="contact_form" onSubmit={onSubmit}>
          <div className="contact_form-group">
            <div className="contact_form-div">
              <input
                type="text"
                className="contact_form-div"
                placeholder="Insert your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contact_form-div">
              <input
                type="email"
                className="contact_form-div"
                placeholder="Insert your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="contact_form-div">
            <input
              type="text"
              className="contact_form-div"
              placeholder="Insert your subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="contact_form-div contact_form-area">
            <textarea
              className="contact_form-input"
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;