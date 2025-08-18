import React, { useEffect, useState } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBar, setShowBar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBar(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShowBar(false);
  };

  const handleDeny = () => {
    setShowBar(false);
    setShowSettings(true);
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptSettings = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setShowSettings(false);
  };

  if (!showBar && !showSettings) return null;

  return (
    <>
      {showBar && (
        <div className="cookie-bar">
          <i className="fa-solid fa-cookie fa-xl" aria-hidden="true"></i>
          <p className="cookie-text">
            We use cookies to personalize content and analyze our traffic.
          </p>
          <div className="cookie-actions">
            <button className="btn primary" onClick={handleAcceptAll}>
              Accept All
            </button>
            <button className="btn secondary" onClick={handleDeny}>
              Deny
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="cookie-modal-overlay">
          <div className="cookie-modal">
            <h2>Cookie Preferences</h2>
            <div className="cookie-option">
              <span>Analytics</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="cookie-option">
              <span>Marketing</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <span className="slider" />
              </label>
            </div>
            <button className="btn primary" onClick={handleAcceptSettings}>
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

