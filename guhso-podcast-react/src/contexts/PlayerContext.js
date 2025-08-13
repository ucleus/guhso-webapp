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
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const playEpisode = async (episode) => {
    // If same episode is already loaded, just toggle play/pause
    if (currentEpisode && currentEpisode.id === episode.id) {
      if (isPlaying) {
        pauseEpisode();
      } else {
        resumeEpisode();
      }
      return;
    }
    
    // Load new episode
    setCurrentEpisode(episode);
    setIsFloatingPlayerVisible(true);
    
    if (audioRef.current) {
      // Pause current audio before loading new one
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      
      // Only change src if it's different (compare absolute URLs)
      const currentSrc = audioRef.current.src;
      const newSrc = new URL(episode.audioUrl, window.location.origin).href;
      
      if (currentSrc !== newSrc) {
        audioRef.current.src = episode.audioUrl;
        
        // Wait for the audio to be ready before playing
        try {
          await new Promise((resolve, reject) => {
            const loadHandler = () => {
              audioRef.current.removeEventListener('canplaythrough', loadHandler);
              audioRef.current.removeEventListener('error', errorHandler);
              resolve();
            };
            const errorHandler = (e) => {
              audioRef.current.removeEventListener('canplaythrough', loadHandler);
              audioRef.current.removeEventListener('error', errorHandler);
              reject(e);
            };
            
            audioRef.current.addEventListener('canplaythrough', loadHandler);
            audioRef.current.addEventListener('error', errorHandler);
            audioRef.current.load();
          });
          
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      } else {
        // Same src, just play
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      }
    }
  };

  const pauseEpisode = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeEpisode = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming audio:', error);
        setIsPlaying(false);
      }
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

  const togglePlayerMinimized = () => {
    setIsPlayerMinimized(!isPlayerMinimized);
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
    isPlayerMinimized,
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
    togglePlayerMinimized,
    
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