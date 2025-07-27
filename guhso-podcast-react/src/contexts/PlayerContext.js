// src/contexts/PlayerContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFloatingPlayerVisible, setIsFloatingPlayerVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setIsFloatingPlayerVisible(true);
    
    if (audioRef.current) {
      audioRef.current.src = episode.audioUrl;
      audioRef.current.play();
    }
  };

  const pauseEpisode = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeEpisode = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseEpisode();
    } else {
      resumeEpisode();
    }
  };

  const seekTo = (percentage) => {
    if (audioRef.current && duration) {
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage);
    }
  };

  const skipForward = (seconds = 15) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const skipBackward = (seconds = 15) => {
    if (audioRef.current) {
      audioRef.current.currentTime -= seconds;
    }
  };

  const setVolumeLevel = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleFloatingPlayer = () => {
    setIsFloatingPlayerVisible(!isFloatingPlayerVisible);
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      
      setCurrentTime(current);
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const value = {
    // State
    isPlaying,
    currentEpisode,
    progress,
    duration,
    currentTime,
    isFloatingPlayerVisible,
    volume,
    audioRef,
    
    // Actions
    playEpisode,
    pauseEpisode,
    resumeEpisode,
    togglePlayPause,
    seekTo,
    skipForward,
    skipBackward,
    setVolumeLevel,
    toggleFloatingPlayer,
    
    // Utilities
    formatTime,
    
    // Event handlers
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </PlayerContext.Provider>
  );
};