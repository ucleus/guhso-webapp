// src/components/Episodes/EpisodeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../contexts/PlayerContext';
import LazyImage from '../LazyImage/LazyImage';
import './EpisodeCard.css';

const EpisodeCard = ({ episode }) => {
  const navigate = useNavigate();
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();

  const handleCardClick = () => {
    // Navigate to episode detail page
    const episodeSlug = episode.slug || `episode-${episode.id}`;
    navigate(`/episode/${episodeSlug}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking play button
    playEpisode({
      id: episode.id,
      title: episode.title,
      audioUrl: episode.audio_url,
      thumbnailUrl: episode.thumbnail_url || episode.itunes_image
    });
  };

  // Check if this episode is currently playing
  const isCurrentEpisode = currentEpisode && currentEpisode.id === episode.id;
  const isThisEpisodePlaying = isCurrentEpisode && isPlaying;
  const isHeroEpisode = episode.is_featured === 1;

  // Prepare episode data for thumbnail system
  const episodeForThumbnail = {
    ...episode,
    // Map existing thumbnail fields to our system
    thumbnail: episode.thumbnail_url || episode.itunes_image,
    id: episode.id,
    slug: episode.slug
  };

  return (
    <div className={`episode-card ${isThisEpisodePlaying ? 'playing' : ''} ${isHeroEpisode ? 'hero' : ''}`} onClick={handleCardClick}>
      <div className="episode-card-image-container">
        <LazyImage 
          episode={episodeForThumbnail}
          size="medium"
          alt={episode.title}
          className="episode-card-image"
        />
        <div className="play-overlay">
          <div className="play-button" onClick={handlePlayClick}>
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
        <div className="episode-show">
          {episode.show?.title && <span>{episode.show.title}</span>}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;