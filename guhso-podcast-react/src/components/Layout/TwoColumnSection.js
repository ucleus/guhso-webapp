// src/components/Layout/TwoColumnSection.js
import React from 'react';
import TextColumn from './TextColumn';
import EpisodeCardsContainer from '../Episodes/EpisodeCardsContainer';
import './TwoColumnSection.css';

const TwoColumnSection = () => {
  const episodeContent = {
    title: "About This Episode",
    content: [
      "Join us as we explore the evolving landscape of podcasting, discussing the latest trends, technologies, and what the future holds for content creators and listeners alike. Our special guest shares insights from their journey in the industry.",
      "We dive deep into topics including monetization strategies, audience engagement, and the impact of AI on content creation. Whether you're a seasoned podcaster or just starting out, this episode has valuable insights for everyone."
    ]
  };

  const relatedEpisodes = [
    {
      id: 2,
      title: "Building Your Audience",
      episodeNumber: "41",
      duration: "28 min",
      thumbnailUrl: "/images/episode-41-thumb.jpg"
    },
    {
      id: 3,
      title: "Content Strategy Tips",
      episodeNumber: "40",
      duration: "35 min",
      thumbnailUrl: "/images/episode-40-thumb.jpg"
    },
    {
      id: 4,
      title: "Interview Techniques",
      episodeNumber: "39",
      duration: "42 min",
      thumbnailUrl: "/images/episode-39-thumb.jpg"
    },
    {
      id: 5,
      title: "Equipment Essentials",
      episodeNumber: "38",
      duration: "30 min",
      thumbnailUrl: "/images/episode-38-thumb.jpg"
    }
  ];

  return (
    <div className="two-column-section">
      <TextColumn 
        title={episodeContent.title}
        content={episodeContent.content}
      />
      <EpisodeCardsContainer episodes={relatedEpisodes} />
    </div>
  );
};

export default TwoColumnSection;