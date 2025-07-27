// src/components/Player/FloatingPlayer.js
import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import './FloatingPlayer.css';

const FloatingPlayer = () => {
  const { 
    isFloatingPlayerVisible,
    currentEpisode,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlayPause,
    skipBackward,
    skipForward,
    seekTo,
    formatTime,
    volume,
    setVolumeLevel
  } = usePlayer();

  if (!isFloatingPlayerVisible || !currentEpisode) {
    return null;
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;
    seekTo(percentage);
  };

  const handleVolumeClick = () => {
    // Toggle mute/unmute
    setVolumeLevel(volume > 0 ? 0 : 1);
  };

  return (
    <div className={`floating-player ${isFloatingPlayerVisible ? 'active' : ''}`}>
      <div className="floating-player-info">
        <div 
          className="floating-thumbnail"
          style={{
            backgroundImage: currentEpisode.thumbnailUrl ? `url(${currentEpisode.thumbnailUrl})` : 'none'
          }}
        ></div>
        <div>
          <h4>{currentEpisode.title}</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Episode {currentEpisode.episodeNumber || 'N/A'}
          </p>
        </div>
      </div>
      
      <div className="floating-player-controls">
        <button className="player-btn" onClick={() => skipBackward(15)}>
          <i className="fas fa-backward"></i>
        </button>
        <button className="player-btn play-btn" onClick={togglePlayPause}>
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="player-btn" onClick={() => skipForward(15)}>
          <i className="fas fa-forward"></i>
        </button>
        <div className="player-progress" style={{ maxWidth: '400px' }}>
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="player-btn" onClick={handleVolumeClick}>
          <i className={`fas ${volume > 0 ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
        </button>
        <button className="player-btn">
          <i className="fas fa-list"></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingPlayer;