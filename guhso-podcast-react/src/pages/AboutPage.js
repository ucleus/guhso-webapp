// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import AboutHeroSection from '../components/Hero/AboutHeroSection';
import './AboutPage.css';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Animate sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.about-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const socialLinks = [
    {
      name: 'X',
      icon: 'fab fa-twitter',
      url: 'https://x.com/guhsolive?s=21',
      color: '#000000'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://www.instagram.com/guhso/profilecard/?igsh=azFmNWQ5aDVnZjlm',
      color: '#E4405F'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: 'https://youtube.com/@guhso?si=1FDghiIhQ5Dweuld',
      color: '#FF0000'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      url: 'https://facebook.com/guhsolive',
      color: '#1877F2'
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      url: 'mailto:chatbout@guhso.com',
      color: '#FF6B35'
    }
  ];

  const podcastLinks = [
    {
      name: 'iTunes',
      icon: 'fab fa-apple',
      url: '#', // You can provide the iTunes link later
      color: '#000000'
    },
    {
      name: 'Spotify',
      icon: 'fab fa-spotify',
      url: 'https://open.spotify.com/show/6OB8f8kK4MBfqeHXp1jqZb',
      color: '#1DB954'
    },
    {
      name: 'Google Podcasts',
      icon: 'fab fa-google',
      url: '#', // You can provide the Google Podcasts link later
      color: '#4285F4'
    }
  ];

  return (
    <div className="about-page">
      {/* Dedicated About Hero Section */}
      <AboutHeroSection />
      
      <div className="about-container">

        {/* About Content */}
        <section 
          id="about-content" 
          className={`about-section content-section ${isVisible['about-content'] ? 'visible' : ''}`}
        >
          <div className="content-grid">
            <div className="content-card">
              <div className="card-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Since October 2020</h3>
              <p>
                Born from the need to keep the conversation real—no filters, no corporate polish—just 
                raw vibes and truth from a Jamaican perspective.
              </p>
            </div>

            <div className="content-card">
              <div className="card-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Authentic Connection</h3>
              <p>
                Each episode is a vibey deep dive into what makes life in the yard so rich and 
                unpredictable. We're more than conversation — we're connection.
              </p>
            </div>

            <div className="content-card">
              <div className="card-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Growing Experience</h3>
              <p>
                From podcast to blog to selective tech coverage—Guhso isn't just content, 
                it's a movement. And we're only getting started.
              </p>
            </div>
          </div>
        </section>

        {/* Main About Text */}
        <section 
          id="main-about" 
          className={`about-section text-section ${isVisible['main-about'] ? 'visible' : ''}`}
        >
          <div className="text-content">
            <p>
              Welcome to <em>Guhso</em> — where energy meets authenticity, Jamaican flair runs wild, and real conversation doesn't ask permission. Hosted by Sean, <em>Guhso</em> isn't just a podcast; it's your weekly invitation into Yardie life: "Yadie A Fareign, Bare Vibez." We talk big, laugh loud, and then we make sure you've grown by the end of every episode.
            </p>
            <p>
              We first hit the airwaves in <strong>October 2020</strong>, born from the need to keep the conversation real—no filters, no corporate polish—just raw vibes and truth from a Jamaican perspective. What started as a podcast quickly grew into a space for culture, humor, and those "only in yard" moments you can't script.
            </p>
            <p>
              Each episode is a vibey deep dive into what makes life in the yard so rich and unpredictable. Think chicken-farming wisdom with Rohan, runway stories with Kalure Beauty's Mona, culturally charged convos with Yogi—seasoned with wit, heart, and that undeniable Jamaican spice. We're more than conversation — we're connection. If you've ever wondered how raising chickens teaches you about self-reliance, how style choices reveal cultural roots, or how "Dem Woman Ya Today" is more than just a phrase—it's a mood—<em>Guhso</em> gives you that and then some.
            </p>
            <p>
              We drop fresh episodes weekly, keeping pace with the rhythms of real life, real people, and real talk. No fluff, no filter—just unapologetic vibes, solid stories, and the kind of warmth that feels like home—yard style.
            </p>
            <p>
              But we didn't stop there. We've expanded the <em>Guhso</em> experience with our <strong>blog page</strong>—your spot to keep in tune with what and how we think, along with our takes on life. It's where we unpack thoughts that don't always make it to the mic, share our views in detail, and invite you deeper into how we see the world. It's conversation that lingers long after the episode ends.
            </p>
            <p>
              And because we're not just about culture—we're about keeping you sharp—we also cover <strong>selective tech</strong> on the blog. That means no information overload, just the tech that matters to you. Whether it's tools to level up your hustle, gadgets worth your time, or trends that actually impact your life, we curate it so you stay informed without drowning in noise.
            </p>
            <p>
              Podcast. Blog. Culture. Tech. <em>Guhso</em> isn't just content—it's a movement. And we're only getting started.
            </p>
          </div>
        </section>

        {/* Social Media Section */}
        <section 
          id="social" 
          className={`about-section social-section ${isVisible.social ? 'visible' : ''}`}
        >
          <h2>Connect With Us</h2>
          <div className="social-grid">
            <div className="social-category">
              <h3>Social Media</h3>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': link.color }}
                  >
                    <i className={link.icon}></i>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="social-category">
              <h3>Listen On</h3>
              <div className="social-links">
                {podcastLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': link.color }}
                  >
                    <i className={link.icon}></i>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Legal Sections */}
        <section 
          id="legal" 
          className={`about-section legal-section ${isVisible.legal ? 'visible' : ''}`}
        >
          <h2>Legal Information</h2>
          <div className="legal-accordion">
            <div className="legal-item">
              <button
                className={`legal-toggle ${activeSection === 'terms' ? 'active' : ''}`}
                onClick={() => toggleSection('terms')}
              >
                <span>Terms of Agreement</span>
                <i className={`fas fa-chevron-${activeSection === 'terms' ? 'up' : 'down'}`}></i>
              </button>
              <div className={`legal-content ${activeSection === 'terms' ? 'active' : ''}`}>
                <div className="legal-text">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <br />
                  
                  <p>
                    Welcome to Guhso. By accessing, listening to, downloading, or otherwise using our podcast, website, blog, or any associated services (collectively, the "Services"), you agree to be bound by these Terms of Agreement ("Terms"). If you do not agree to these Terms, do not access or use our Services.
                  </p>
                  
                  <h4>1. Intellectual Property Rights</h4>
                  
                  <h5>1.1 Ownership</h5>
                  <p>
                    All content produced by Guhso—including but not limited to audio recordings, video footage, written articles, blog posts, images, graphics, logos, brand names, and any derivative works—is the exclusive property of Guhso and/or its licensors.
                  </p>
                  
                  <h5>1.2 Usage Restrictions</h5>
                  <p>
                    You may not copy, reproduce, distribute, publicly perform, modify, or create derivative works from our content without our prior written consent. Unauthorized use of our intellectual property may result in legal action.
                  </p>
                  
                  <h5>1.3 Permitted Use</h5>
                  <p>
                    You may download or stream podcast episodes and view blog content for personal, non-commercial use only. Any other use requires express written permission.
                  </p>
                  
                  <h4>2. User Conduct</h4>
                  
                  <h5>2.1 Prohibited Activities</h5>
                  <p>When accessing our Services, you agree not to:</p>
                  <ul>
                    <li>Infringe upon our intellectual property rights.</li>
                    <li>Use our content for commercial purposes without permission.</li>
                    <li>Upload, transmit, or distribute malicious code, viruses, or spam.</li>
                    <li>Engage in harassment, hate speech, or abusive conduct on any platform associated with Guhso.</li>
                  </ul>
                  
                  <h5>2.2 User Submissions</h5>
                  <p>
                    If you submit comments, feedback, or other content to us ("User Content"), you grant Guhso a non-exclusive, worldwide, royalty-free, perpetual license to use, display, and distribute that content in connection with the Services. You remain responsible for ensuring you have the rights to provide such content.
                  </p>
                  
                  <h4>3. Blog and Technology Content</h4>
                  
                  <h5>3.1 Accuracy</h5>
                  <p>
                    While we strive to provide accurate, timely, and relevant information, particularly in our selective tech articles, we do not guarantee that all information will be error-free or up to date.
                  </p>
                  
                  <h5>3.2 No Professional Advice</h5>
                  <p>
                    Our content is for informational and entertainment purposes only. It does not constitute professional, legal, financial, or technical advice. You should consult an appropriate professional before relying on any information provided.
                  </p>
                  
                  <h4>4. Third-Party Links and Services</h4>
                  <p>
                    Our Services may contain links to third-party websites, applications, or services. These links are provided for convenience only and do not signify our endorsement. We are not responsible for the content, policies, or practices of any third-party services.
                  </p>
                  
                  <h4>5. Disclaimers</h4>
                  
                  <h5>5.1 Content Disclaimer</h5>
                  <p>
                    All content is provided "as is" without warranties of any kind, express or implied. We do not warrant that our Services will be uninterrupted, error-free, or secure.
                  </p>
                  
                  <h5>5.2 Limitation of Liability</h5>
                  <p>
                    To the fullest extent permitted by law, Guhso shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, the Services.
                  </p>
                  
                  <h4>6. Indemnification</h4>
                  <p>You agree to indemnify, defend, and hold harmless Guhso, its owners, affiliates, employees, and agents from and against any claims, liabilities, damages, losses, or expenses—including reasonable legal fees—arising from:</p>
                  <ul>
                    <li>Your violation of these Terms.</li>
                    <li>Your misuse of our Services.</li>
                    <li>Any infringement of third-party rights caused by your actions.</li>
                  </ul>
                  
                  <h4>7. Privacy</h4>
                  <p>
                    Your use of the Services is also governed by our Privacy Policy. By using our Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.
                  </p>
                  
                  <h4>8. Termination</h4>
                  <p>
                    We reserve the right to terminate or suspend your access to the Services without notice if we believe you have violated these Terms or engaged in unlawful activity.
                  </p>
                  
                  <h4>9. Governing Law</h4>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to conflict of law principles. You agree to submit to the personal jurisdiction of the courts located in Broward County, Florida.
                  </p>
                  
                  <h4>10. Changes to the Terms</h4>
                  <p>
                    We reserve the right to update or modify these Terms at any time without prior notice. Changes will be effective upon posting. Your continued use of the Services constitutes acceptance of the updated Terms.
                  </p>
                  
                  <h4>11. Contact Information</h4>
                  <p>For questions about these Terms, please contact us at:</p>
                  <br />
                  <p><strong>Guhso ✨</strong></p>
                  <p>
                    <i className="fas fa-phone"></i> (754) 300-8618
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> chatbout@guhso.com
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-item">
              <button
                className={`legal-toggle ${activeSection === 'privacy' ? 'active' : ''}`}
                onClick={() => toggleSection('privacy')}
              >
                <span>Privacy Policy</span>
                <i className={`fas fa-chevron-${activeSection === 'privacy' ? 'up' : 'down'}`}></i>
              </button>
              <div className={`legal-content ${activeSection === 'privacy' ? 'active' : ''}`}>
                <div className="legal-text">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <br />
                  
                  <p>
                    This Privacy Policy explains how <em>Guhso</em> collects, uses, and protects the personal information of visitors and users who access <strong>guhso.com</strong> (the "Site"). By using the Site, listening to our episodes, or engaging with our blog and related services, you agree to the terms outlined in this Privacy Policy.
                  </p>
                  
                  <h4>1. Information We Collect</h4>
                  <p>We may collect the following types of information:</p>
                  
                  <h5>1.1 Personal Information You Provide</h5>
                  <ul>
                    <li>Name, email address, or phone number when you contact us or join our mailing list.</li>
                    <li>Information submitted via contact forms, surveys, or podcast guest inquiries.</li>
                  </ul>
                  
                  <h5>1.2 Automatically Collected Information</h5>
                  <ul>
                    <li>IP address, browser type, operating system, and device type.</li>
                    <li>Pages visited, time spent on the site, and referring URLs.</li>
                    <li>Podcast listening statistics, such as episode plays and download counts.</li>
                  </ul>
                  
                  <h5>1.3 Cookies and Tracking Technologies</h5>
                  <p>
                    We use cookies, pixels, and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic.
                  </p>
                  
                  <h4>2. How We Use Your Information</h4>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Provide and improve access to our podcast episodes and blog content.</li>
                    <li>Respond to inquiries, feedback, and guest requests.</li>
                    <li>Send occasional updates, newsletters, or announcements (if you opt-in).</li>
                    <li>Monitor analytics to understand how visitors use our Site.</li>
                    <li>Detect and prevent fraud, spam, and unauthorized access.</li>
                  </ul>
                  
                  <h4>3. Sharing Your Information</h4>
                  <p>We do not sell, rent, or trade your personal information. We may share your information in the following situations:</p>
                  <ul>
                    <li><strong>Service Providers:</strong> With trusted vendors that help us operate the Site, host content, or send communications.</li>
                    <li><strong>Legal Compliance:</strong> When required by law, court order, or legal process.</li>
                    <li><strong>Protection of Rights:</strong> To defend our intellectual property, enforce our Terms of Agreement, or protect our rights and safety.</li>
                  </ul>
                  
                  <h4>4. Third-Party Services</h4>
                  <p>Our Site may embed or link to third-party platforms, such as:</p>
                  <ul>
                    <li>Podcast streaming platforms (e.g., Spotify, Apple Podcasts).</li>
                    <li>Social media networks.</li>
                    <li>Analytics providers like Google Analytics.</li>
                  </ul>
                  <p>These third parties have their own privacy policies. We are not responsible for their practices, so we encourage you to review them.</p>
                  
                  <h4>5. Cookies and Your Choices</h4>
                  <p>
                    You can control cookies through your browser settings. Disabling cookies may limit certain features of the Site but will not prevent you from listening to episodes.
                  </p>
                  
                  <h4>6. Data Retention</h4>
                  <p>
                    We retain your information only as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations, and resolve disputes.
                  </p>
                  
                  <h4>7. Security Measures</h4>
                  <p>
                    We use reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                  </p>
                  
                  <h4>8. Your Rights</h4>
                  <p>Depending on your location, you may have the right to:</p>
                  <ul>
                    <li>Access, update, or delete your personal information.</li>
                    <li>Withdraw consent for marketing emails.</li>
                    <li>Request a copy of the personal data we hold about you.</li>
                  </ul>
                  <p>To exercise these rights, contact us using the details in Section 11.</p>
                  
                  <h4>9. Children's Privacy</h4>
                  <p>
                    Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we learn that we have inadvertently collected information from a child, we will delete it promptly.
                  </p>
                  
                  <h4>10. Changes to This Privacy Policy</h4>
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last Updated" date. Your continued use of the Site after changes are posted constitutes acceptance of the updated policy.
                  </p>
                  
                  <h4>11. Contact Information</h4>
                  <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                  <br />
                  <p><strong>Sean Blake</strong></p>
                  <p>Owner & Founder of Guhso</p>
                  <p>Host of <em>Guhso</em> Podcast</p>
                  <p>
                    <i className="fas fa-phone"></i> (754) 300-8618
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> chatbout@guhso.com
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-item">
              <button
                className={`legal-toggle ${activeSection === 'cookies' ? 'active' : ''}`}
                onClick={() => toggleSection('cookies')}
              >
                <span>Cookie Policy</span>
                <i className={`fas fa-chevron-${activeSection === 'cookies' ? 'up' : 'down'}`}></i>
              </button>
              <div className={`legal-content ${activeSection === 'cookies' ? 'active' : ''}`}>
                <div className="legal-text">
                  <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  <br />
                  
                  <p>
                    This Cookie Policy explains how <em>Guhso</em> uses cookies and similar tracking technologies on <strong>guhso.com</strong> (the "Site"). It should be read in conjunction with our Privacy Policy and Terms of Agreement.
                  </p>
                  
                  <h4>1. What Are Cookies?</h4>
                  <p>
                    Cookies are small text files stored on your device when you visit a website. They help websites function properly, enhance user experience, and provide analytical information to improve services.
                  </p>
                  
                  <h4>2. How We Use Cookies</h4>
                  <p>We use cookies to:</p>
                  <ul>
                    <li><strong>Enable Core Functions:</strong> Ensure the Site and podcast player work correctly.</li>
                    <li><strong>Improve User Experience:</strong> Remember your preferences, such as language and playback settings.</li>
                    <li><strong>Analytics:</strong> Understand how visitors interact with our Site so we can improve content and functionality.</li>
                    <li><strong>Security:</strong> Detect and prevent fraudulent activity or unauthorized access.</li>
                  </ul>
                  
                  <h4>3. Types of Cookies We Use</h4>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Required for the Site to function (e.g., navigation, podcast streaming).</li>
                    <li><strong>Performance & Analytics Cookies:</strong> Track usage patterns (e.g., Google Analytics) to improve content and services.</li>
                    <li><strong>Functional Cookies:</strong> Store user preferences to customize the browsing experience.</li>
                  </ul>
                  
                  <h4>4. Data Collection and Protection</h4>
                  <p>
                    While cookies may collect information such as IP address, browser type, and activity on the Site, <strong>we do not sell, rent, or trade any data collected via cookies</strong>.
                  </p>
                  <p>
                    We implement industry-standard security measures—including encryption and secure hosting—to protect all data collected through cookies.
                  </p>
                  
                  <h4>5. Third-Party Cookies</h4>
                  <p>Some cookies are placed by third-party services we use, such as:</p>
                  <ul>
                    <li>Podcast streaming integrations (e.g., Spotify embeds).</li>
                    <li>Social media platforms (e.g., Facebook, Instagram).</li>
                    <li>Analytics providers (e.g., Google Analytics).</li>
                  </ul>
                  <p>These third parties have their own cookie policies, which we encourage you to review.</p>
                  
                  <h4>6. Your Choices</h4>
                  <p>You can manage or disable cookies in your browser settings. Please note:</p>
                  <ul>
                    <li>Disabling <strong>essential cookies</strong> may affect Site functionality.</li>
                    <li>You can opt-out of certain analytics cookies without affecting basic Site performance.</li>
                  </ul>
                  
                  <h4>7. Changes to This Cookie Policy</h4>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. Updates will be posted on this page with the "Last Updated" date.
                  </p>
                  
                  <h4>8. Contact Information</h4>
                  <p>For questions or concerns about this Cookie Policy, contact us at:</p>
                  <br />
                  <p><strong>Sean Blake</strong></p>
                  <p>Owner & Founder of Guhso</p>
                  <p>Host of <em>Guhso</em> Podcast</p>
                  <p>
                    <i className="fas fa-phone"></i> (754) 300-8618
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> chatbout@guhso.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;