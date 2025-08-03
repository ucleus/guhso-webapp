// src/components/Episodes/EpisodeCard.js
import { useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { toggleEpisodeHero } from '../../api';
import './EpisodeCard.css';

const EpisodeCard = ({ episode, onHeroToggle }) => {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const [isTogglingHero, setIsTogglingHero] = useState(false);

  const handleCardClick = (e) => {
    // Don't play if clicking on hero toggle button
    if (e.target.closest('.hero-toggle-btn')) {
      return;
    }
    
    playEpisode({
      id: episode.id,
      title: episode.title,
      audioUrl: episode.audio_url,
      thumbnailUrl: episode.thumbnail_url || episode.itunes_image
    });
  };

  const handleHeroToggle = async (e) => {
    e.stopPropagation();
    setIsTogglingHero(true);
    
    try {
      await toggleEpisodeHero(episode.id);
      if (onHeroToggle) {
        onHeroToggle(episode.id);
      }
    } catch (error) {
      console.error('Failed to toggle hero status:', error);
    } finally {
      setIsTogglingHero(false);
    }
  };

  // Check if this episode is currently playing
  const isCurrentEpisode = currentEpisode && currentEpisode.id === episode.id;
  const isThisEpisodePlaying = isCurrentEpisode && isPlaying;
  const isHeroEpisode = episode.is_featured === 1;

  // Create default thumbnail if none provided
  const thumbnailUrl = episode.thumbnail_url || 
                      episode.itunes_image || 
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F7931E;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23g)' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='white' opacity='0.8'%3EGUHSO%3C/text%3E%3C/svg%3E";

  return (
    <div className={`episode-card ${isThisEpisodePlaying ? 'playing' : ''} ${isHeroEpisode ? 'hero' : ''}`} onClick={handleCardClick}>
      <div className="episode-card-image-container">
        <img 
          src={thumbnailUrl} 
          alt={episode.title}
          className="episode-card-image"
        />
        <div className="play-overlay">
          <div className="play-button">
            <i className={`fas ${isThisEpisodePlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </div>
        </div>
      </div>
      <div className="episode-card-content">
        <h3>{episode.title}</h3>
        <div className="episode-meta">
          {episode.episode_number && <span>EP {episode.episode_number}</span>}
          {episode.itunes_duration && <span>• {episode.itunes_duration}</span>}
        </div>
        {episode.description && (
          <p className="episode-description">
            {episode.description.length > 80 
              ? `${episode.description.substring(0, 80)}...` 
              : episode.description}
          </p>
        )}
        <div className="episode-show">
          {episode.show?.title && <span>{episode.show.title}</span>}
        </div>
        <button 
          className={`hero-toggle-btn ${isHeroEpisode ? 'hero-active' : 'hero-inactive'}`}
          onClick={handleHeroToggle}
          disabled={isTogglingHero}
          title={isHeroEpisode ? 'Remove from Hero' : 'Set as Hero'}
        >
          <i className={`fas ${isTogglingHero ? 'fa-spinner fa-spin' : (isHeroEpisode ? 'fa-star' : 'fa-star-o')} mr-1`}></i>
          <span>{isTogglingHero ? 'Loading...' : (isHeroEpisode ? 'Hero' : 'Set Hero')}</span>
        </button>
      </div>
    </div>
  );
};

export default EpisodeCard;