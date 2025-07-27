// src/components/Episodes/EpisodeCard.js
import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import './EpisodeCard.css';

const EpisodeCard = ({ episode }) => {
  const { playEpisode } = usePlayer();

  const handleCardClick = () => {
    playEpisode({
      id: episode.id,
      title: episode.title,
      audioUrl: episode.audioUrl || `/audio/episode-${episode.episodeNumber}.mp3`,
      thumbnailUrl: episode.thumbnailUrl
    });
  };

  return (
    <div className="episode-card" onClick={handleCardClick}>
      {episode.thumbnailUrl && (
        <img 
          src={episode.thumbnailUrl} 
          alt={episode.title}
          className="episode-card-image"
        />
      )}
      <div className="episode-card-content">
        <h3>{episode.title}</h3>
        <p>Episode {episode.episodeNumber} • {episode.duration}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;