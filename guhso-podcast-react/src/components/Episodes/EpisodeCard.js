// src/components/Episodes/EpisodeCard.js
import { usePlayer } from '../../contexts/PlayerContext';
import './EpisodeCard.css';

const EpisodeCard = ({ episode }) => {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();

  const handleCardClick = () => {
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
      </div>
    </div>
  );
};

export default EpisodeCard;