// src/components/Player/PlayerControls.js
import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import './PlayerControls.css';

const PlayerControls = ({ episode, onPlayClick, variant = 'default' }) => {
  const { 
    isPlaying, 
    currentEpisode, 
    progress, 
    seekTo, 
    skipBackward, 
    skipForward,
    playEpisode,
    togglePlayPause,
    formatTime,
    currentTime,
    duration
  } = usePlayer();

  const isCurrentEpisode = currentEpisode?.id === episode?.id;
  const displayProgress = isCurrentEpisode ? progress : episode?.progress || 0;
  const displayCurrentTime = isCurrentEpisode ? formatTime(currentTime) : episode?.currentTime || '0:00';
  const displayTotalTime = isCurrentEpisode ? formatTime(duration) : episode?.totalTime || '0:00';

  const handlePlayPause = () => {
    if (isCurrentEpisode) {
      togglePlayPause();
    } else {
      playEpisode(episode);
    }
    
    if (onPlayClick) {
      onPlayClick();
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;
    seekTo(percentage);
  };

  const handleSkipBackward = () => {
    skipBackward(15);
  };

  const handleSkipForward = () => {
    skipForward(15);
  };

  const containerClass = variant === 'glass' ? 'glass-player' : 'player-controls-container';

  return (
    <div className={containerClass}>
      <div className="player-controls">
        <button className="player-btn" onClick={handleSkipBackward}>
          <i className="fas fa-backward"></i>
        </button>
        <button className="player-btn play-btn" onClick={handlePlayPause}>
          <i className={`fas ${isCurrentEpisode && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="player-btn" onClick={handleSkipForward}>
          <i className="fas fa-forward"></i>
        </button>
      </div>
      <div className="player-progress">
        <span className="time-display">{displayCurrentTime}</span>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div 
            className="progress-fill" 
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <span className="time-display">{displayTotalTime}</span>
      </div>
    </div>
  );
};

export default PlayerControls;