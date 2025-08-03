// src/components/Hero/HeroSection.js
import { useState, useEffect } from 'react';
import PlayerControls from '../Player/PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import { fetchHeroEpisode } from '../../api';
import './HeroSection.css';

const HeroSection = () => {
  const { playEpisode } = usePlayer();
  const [heroEpisode, setHeroEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHeroEpisode = async () => {
      try {
        setLoading(true);
        const episode = await fetchHeroEpisode();
        setHeroEpisode(episode);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch hero episode:', err);
        setError(err.message);
        // Fallback to default episode data
        setHeroEpisode({
          id: 1,
          title: "Welcome to GUHSO Podcast",
          episode_number: "1",
          season_number: "1",
          show: { title: "GUHSO" },
          thumbnail_url: null,
          audio_url: "/audio/default.mp3",
          itunes_duration: "30:00",
          description: "Welcome to our podcast!"
        });
      } finally {
        setLoading(false);
      }
    };

    loadHeroEpisode();
  }, []);

  const handlePlayClick = () => {
    if (heroEpisode) {
      playEpisode({
        id: heroEpisode.id,
        title: heroEpisode.title,
        audioUrl: heroEpisode.audio_url,
        thumbnailUrl: heroEpisode.thumbnail_url || heroEpisode.itunes_image
      });
    }
  };

  if (loading) {
    return (
      <div className="hero-section loading">
        <div className="hero-content">
          <div className="loading-spinner"></div>
          <p>Loading featured episode...</p>
        </div>
      </div>
    );
  }

  if (error && !heroEpisode) {
    return (
      <div className="hero-section error">
        <div className="hero-content">
          <h2>Unable to load featured episode</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  // Create default thumbnail if none provided
  const thumbnailUrl = heroEpisode.thumbnail_url || 
                      heroEpisode.itunes_image || 
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F7931E;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1080' height='800' fill='url(%23g)' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='white' opacity='0.3'%3EGUHSO PODCAST%3C/text%3E%3C/svg%3E";

  // Generate hashtags from episode data
  const hashtags = [
    "#guhso", 
    "#podcast", 
    heroEpisode.show?.title ? `#${heroEpisode.show.title.toLowerCase()}` : "",
    heroEpisode.episode_number ? `#episode${heroEpisode.episode_number}` : ""
  ].filter(Boolean);

  return (
    <div className="hero-section">
      <img 
        src={thumbnailUrl} 
        alt={heroEpisode.title || "Episode Thumbnail"} 
        className="hero-thumbnail"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-columns">
          <div className="hero-text-column">
            <h1 className="hero-title">{heroEpisode.title}</h1>
            <div className="hero-meta">
              {heroEpisode.episode_number && (
                <>
                  <span>Episode {heroEpisode.episode_number || heroEpisode.itunes_episode}</span>
                  <span>•</span>
                </>
              )}
              {heroEpisode.season_number && (
                <>
                  <span>Season {heroEpisode.season_number || heroEpisode.itunes_season}</span>
                  <span>•</span>
                </>
              )}
              <span>{heroEpisode.show?.title || "GUHSO"}</span>
            </div>
            {heroEpisode.description && (
              <p className="hero-description">
                {heroEpisode.description.length > 150 
                  ? `${heroEpisode.description.substring(0, 150)}...` 
                  : heroEpisode.description}
              </p>
            )}
            <div className="hashtags">
              {hashtags.map((tag, index) => (
                <span key={index} className="hashtag">{tag}</span>
              ))}
            </div>
            <PlayerControls 
              episode={{
                id: heroEpisode.id,
                title: heroEpisode.title,
                audioUrl: heroEpisode.audio_url,
                thumbnailUrl: thumbnailUrl,
                currentTime: "0:00",
                totalTime: heroEpisode.itunes_duration || "30:00",
                progress: 0
              }}
              onPlayClick={handlePlayClick}
              variant="glass"
            />
          </div>
          <div className="hero-empty-column">
            {/* Empty column for spacing */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;