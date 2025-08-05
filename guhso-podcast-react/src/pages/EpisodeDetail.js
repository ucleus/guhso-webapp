// Episode Detail page - Full episode information with sidebar
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import LazyImage from '../components/LazyImage/LazyImage';
import PlayerControls from '../components/Player/PlayerControls';
import FeaturedSection from '../components/Sidebar/FeaturedSection';
import SearchSection from '../components/Sidebar/SearchSection';
import SocialMediaLinks from '../components/SocialMediaLinks/SocialMediaLinks';
import AdCard from '../components/AdCard/AdCard';
import { fetchEpisodes } from '../api';
import './EpisodeDetail.css';

const EpisodeDetail = () => {
  const { slug } = useParams();
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        setLoading(true);
        const data = await fetchEpisodes();
        const episodes = data.data || data;
        
        // Find episode by slug or ID
        const foundEpisode = episodes.find(ep => 
          ep.slug === slug || ep.id.toString() === slug
        );

        if (foundEpisode) {
          setEpisode(foundEpisode);
        } else {
          // Fallback to sample episode for development
          setEpisode({
            id: 1,
            title: "Welcome to GUHSO Podcast",
            slug: "welcome-to-guhso",
            episode_number: "1",
            season_number: "1",
            description: "Join us as we kick off the GUHSO podcast journey with exciting conversations about technology, business, and innovation. In this inaugural episode, we discuss our vision for the podcast, what listeners can expect, and dive into the current state of the tech industry.\n\nWe explore topics including:\n• The future of artificial intelligence in business\n• Sustainable startup practices\n• The importance of community in entrepreneurship\n• How technology is reshaping traditional industries\n\nThis episode sets the stage for deep conversations with industry leaders, innovative thinkers, and change-makers who are shaping our world.",
            itunes_duration: "45:30",
            audio_url: "/audio/episode-1.mp3",
            thumbnail: "energy-vampire.png",
            show: { title: "GUHSO" },
            published_at: "2024-01-15",
            tags: ["technology", "business", "startup", "ai", "innovation"],
            guest_name: "Sean B.",
            guest_bio: "Founder of GUHSO and technology entrepreneur with over 10 years of experience in building innovative solutions."
          });
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch episode:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisode();
  }, [slug]);

  const handlePlayEpisode = () => {
    if (episode) {
      playEpisode({
        id: episode.id,
        title: episode.title,
        audioUrl: episode.audio_url,
        thumbnailUrl: episode.thumbnail_url || episode.thumbnail
      });
    }
  };

  if (loading) {
    return (
      <div className="episode-detail-page">
        <div className="episode-detail-container">
          <div className="episode-detail-content loading">
            <div className="loading-header">
              <div className="loading-image"></div>
              <div className="loading-info">
                <div className="loading-text large"></div>
                <div className="loading-text medium"></div>
                <div className="loading-text small"></div>
              </div>
            </div>
            <div className="loading-description">
              <div className="loading-text"></div>
              <div className="loading-text"></div>
              <div className="loading-text short"></div>
            </div>
          </div>
          <div className="episode-detail-sidebar loading">
            <div className="loading-sidebar-section"></div>
            <div className="loading-sidebar-section"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="episode-detail-page">
        <div className="episode-not-found">
          <h1>Episode Not Found</h1>
          <p>The episode you're looking for doesn't exist or has been removed.</p>
          <Link to="/episodes" className="back-to-episodes">
            <i className="fas fa-arrow-left"></i>
            Back to All Episodes
          </Link>
        </div>
      </div>
    );
  }

  const isCurrentEpisode = currentEpisode && currentEpisode.id === episode.id;
  const isThisEpisodePlaying = isCurrentEpisode && isPlaying;

  // Prepare episode data for thumbnail system
  const episodeForThumbnail = {
    ...episode,
    thumbnail: episode.thumbnail_url || episode.thumbnail,
    id: episode.id,
    slug: episode.slug
  };

return (
  <div className="episode-detail-page">
    <div className="episode-detail-container">
      {/* Main Content */}
      <div className="episode-detail-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/episodes">Episodes</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{episode.title}</span>
        </nav>

        {/* Episode Header */}
        <div className="episode-header">
          <div className="episode-image">
            <LazyImage 
              episode={episodeForThumbnail}
              size="large"
              alt={episode.title}
              className="episode-detail-image"
            />
            <div className="episode-play-overlay">
              <button 
                className="episode-play-button"
                onClick={handlePlayEpisode}
              >
                <i className={`fas ${isThisEpisodePlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
            </div>
          </div>

          <div className="episode-info">
            <div className="episode-meta">
              <span className="episode-number">
                Episode {episode.episode_number}
              </span>
              {episode.season_number && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="season-number">
                    Season {episode.season_number}
                  </span>
                </>
              )}
              <span className="meta-separator">•</span>
              <span className="episode-duration">
                {episode.itunes_duration || "N/A"}
              </span>
            </div>

            <h1 className="episode-title">{episode.title}</h1>

            <div className="episode-details">
              <div className="episode-detail-item">
                <i className="fas fa-calendar"></i>
                <span>
                  {new Date(episode.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="episode-detail-item">
                <i className="fas fa-microphone"></i>
                <span>{episode.show?.title || "GUHSO"}</span>
              </div>
              {episode.guest_name && (
                <div className="episode-detail-item">
                  <i className="fas fa-user"></i>
                  <span>Guest: {episode.guest_name}</span>
                </div>
              )}
            </div>

            <div className="episode-player-controls">
              <PlayerControls 
                episode={{
                  id: episode.id,
                  title: episode.title,
                  audioUrl: episode.audio_url,
                  thumbnailUrl: episode.thumbnail_url || episode.thumbnail,
                  currentTime: "0:00",
                  totalTime: episode.itunes_duration || "N/A",
                  progress: 0
                }}
                onPlayClick={handlePlayEpisode}
                variant="default"
              />
            </div>
          </div>
        </div>

        {/* Content Wrapper - New container to ensure proper stacking */}
        <div className="episode-content-wrapper">
          {/* Episode Description */}
          <section className="episode-description-section">
            <div className="episode-description">
              <h2>About This Episode</h2>
              <div className="description-content">
                {(episode.description ? episode.description.split('\n') : []).map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Guest Information */}
          {episode.guest_name && episode.guest_bio && (
            <section className="episode-guest-section">
              <div className="guest-info">
                <h2>About the Guest</h2>
                <div className="guest-details">
                  <h3>{episode.guest_name}</h3>
                  <p>{episode.guest_bio}</p>
                </div>
              </div>
            </section>
          )}

          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <section className="episode-tags-section">
              <div className="episode-tags">
                <h3>Tags</h3>
                <div className="tags-list">
                  {episode.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Social Media Links - Now guaranteed to be below all content */}
        <section className="episode-social-section">
          <div className="episode-social">
            <h3>Share This Episode</h3>
            <SocialMediaLinks episode={episode} />
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="episode-detail-sidebar">
        <FeaturedSection />
        <SearchSection />
        <AdCard />
      </div>
    </div>
  </div>
);
};

export default EpisodeDetail;