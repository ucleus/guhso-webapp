// src/components/Hero/HeroSection.js
import React from 'react';
import PlayerControls from '../Player/PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import './HeroSection.css';

const HeroSection = () => {
  const { toggleFloatingPlayer } = usePlayer();
  
  const heroEpisode = {
    id: 1,
    title: "The Future of Podcasting",
    episodeNumber: "42",
    seasonNumber: "3",
    host: "John Doe",
    thumbnailUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F7931E;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1080' height='800' fill='url(%23g)' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='white' opacity='0.3'%3EEpisode Thumbnail%3C/text%3E%3C/svg%3E",
    audioUrl: "/audio/episode-42.mp3",
    hashtags: ["#podcasting", "#technology", "#future", "#audio"],
    currentTime: "2:45",
    totalTime: "32:10",
    progress: 30
  };

  const handlePlayClick = () => {
    toggleFloatingPlayer();
  };

  return (
    <div className="hero-section">
      <img 
        src={heroEpisode.thumbnailUrl} 
        alt="Episode Thumbnail" 
        className="hero-thumbnail"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{heroEpisode.title}</h1>
        <div className="hero-meta">
          <span>Episode {heroEpisode.episodeNumber}</span>
          <span>•</span>
          <span>Season {heroEpisode.seasonNumber}</span>
          <span>•</span>
          <span>{heroEpisode.host}</span>
        </div>
        <div className="hashtags">
          {heroEpisode.hashtags.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>
        <PlayerControls 
          episode={heroEpisode}
          onPlayClick={handlePlayClick}
          variant="glass"
        />
      </div>
    </div>
  );
};

export default HeroSection;