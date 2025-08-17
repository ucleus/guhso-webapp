import React, { useState, useEffect } from 'react';
import './MailingListModal.css';
import { subscribeToMailingList } from '../../api';

const MailingListModal = () => {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [form, setForm] = useState({ first_name: '', email: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleMouseOut = (e) => {
      if (!hasShown && e.clientY <= 0) {
        setShow(true);
        setHasShown(true);
      }
    };
    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [hasShown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribeToMailingList(form.first_name, form.email);
      setStatus('Thank you for joining the team!');
      setForm({ first_name: '', email: '' });
    } catch (err) {
      setStatus('Subscription failed. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <div className="ml-modal-overlay" onClick={() => setShow(false)}>
      <div className="ml-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ml-close" onClick={() => setShow(false)}>&times;</button>
        <h2>Join the Guhso Team</h2>
        <p>Receive emails and be notified of new events.</p>
        <form onSubmit={handleSubmit} className="ml-form">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Join</button>
        </form>
        {status && <p className="ml-status">{status}</p>}
      </div>
    </div>
  );
};

export default MailingListModal;
