// Social Media Links component for sharing episodes
import React from 'react';
import './SocialMediaLinks.css';

const SocialMediaLinks = ({ episode }) => {
  // Get current URL for sharing
  const currentUrl = window.location.href;
  const episodeTitle = episode?.title || 'GUHSO Podcast';
  const episodeDescription = episode?.description || 'Check out this amazing podcast episode!';
  
  // Truncate description for social sharing
  const shareDescription = episodeDescription.length > 100 
    ? `${episodeDescription.substring(0, 100)}...` 
    : episodeDescription;

  // Social media share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎧 Just listened to "${episodeTitle}" on GUHSO Podcast! ${shareDescription}`)}&url=${encodeURIComponent(currentUrl)}&hashtags=GUHSO,podcast,technology`,
    
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(`🎧 "${episodeTitle}" - ${shareDescription}`)}`,
    
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(episodeTitle)}&summary=${encodeURIComponent(shareDescription)}`,
    
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(`🎧 ${episodeTitle} - GUHSO Podcast`)}`,
    
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`🎧 Check out "${episodeTitle}" on GUHSO Podcast!\n\n${shareDescription}\n\n${currentUrl}`)}`,
    
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`🎧 ${episodeTitle} - ${shareDescription}`)}`,
    
    email: `mailto:?subject=${encodeURIComponent(`🎧 ${episodeTitle} - GUHSO Podcast`)}&body=${encodeURIComponent(`I thought you might enjoy this podcast episode:\n\n"${episodeTitle}"\n\n${shareDescription}\n\nListen here: ${currentUrl}`)}`,
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      // Show temporary success message
      const button = document.querySelector('.copy-link-btn');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  // Open share window
  const openShareWindow = (url, platform) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: shareUrls.twitter,
      color: '#1DA1F2',
      label: 'Share on Twitter'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      url: shareUrls.facebook,
      color: '#4267B2',
      label: 'Share on Facebook'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: shareUrls.linkedin,
      color: '#0077B5',
      label: 'Share on LinkedIn'
    },
    {
      name: 'Reddit',
      icon: 'fab fa-reddit',
      url: shareUrls.reddit,
      color: '#FF4500',
      label: 'Share on Reddit'
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      url: shareUrls.whatsapp,
      color: '#25D366',
      label: 'Share on WhatsApp'
    },
    {
      name: 'Telegram',
      icon: 'fab fa-telegram',
      url: shareUrls.telegram,
      color: '#0088CC',
      label: 'Share on Telegram'
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      url: shareUrls.email,
      color: '#EA4335',
      label: 'Share via Email',
      isEmail: true
    }
  ];

  return (
    <div className="social-media-links">
      <div className="social-platforms">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            className="social-btn"
            onClick={() => {
              if (platform.isEmail) {
                window.location.href = platform.url;
              } else {
                openShareWindow(platform.url, platform.name.toLowerCase());
              }
            }}
            style={{ '--social-color': platform.color }}
            title={platform.label}
            aria-label={platform.label}
          >
            <i className={platform.icon}></i>
            <span className="social-name">{platform.name}</span>
          </button>
        ))}
      </div>

      <div className="copy-link-section">
        <div className="copy-link-input">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="url-input"
          />
          <button
            className="copy-link-btn"
            onClick={copyToClipboard}
            title="Copy link to clipboard"
            aria-label="Copy link to clipboard"
          >
            <i className="fas fa-copy"></i>
            Copy Link
          </button>
        </div>
      </div>

      {/* GUHSO Social Media Links */}
      <div className="guhso-social">
        <h4>Follow GUHSO</h4>
        <div className="guhso-links">
          <a
            href="https://twitter.com/guhso"
            target="_blank"
            rel="noopener noreferrer"
            className="guhso-social-btn twitter"
            title="Follow GUHSO on Twitter"
          >
            <i className="fab fa-twitter"></i>
            <span>Twitter</span>
          </a>
          <a
            href="https://instagram.com/guhso"
            target="_blank"
            rel="noopener noreferrer"
            className="guhso-social-btn instagram"
            title="Follow GUHSO on Instagram"
          >
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://linkedin.com/company/guhso"
            target="_blank"
            rel="noopener noreferrer"
            className="guhso-social-btn linkedin"
            title="Follow GUHSO on LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://youtube.com/@guhso"
            target="_blank"
            rel="noopener noreferrer"
            className="guhso-social-btn youtube"
            title="Subscribe to GUHSO on YouTube"
          >
            <i className="fab fa-youtube"></i>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;