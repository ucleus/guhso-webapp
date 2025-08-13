// src/components/Layout/TwoColumnSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextColumn from './TextColumn';
import EpisodeCardsContainer from '../Episodes/EpisodeCardsContainer';
import { fetchEpisodes } from '../../api';
import './TwoColumnSection.css';

const TwoColumnSection = ({ currentEpisode }) => {
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent episodes
  useEffect(() => {
    const loadRecentEpisodes = async () => {
      try {
        setLoading(true);
        const episodesData = await fetchEpisodes();
        
        // Get the episodes array from the response
        const episodes = episodesData.data || episodesData || [];
        
        // Filter out the current episode and get the last 5
        const filteredEpisodes = episodes
          .filter(episode => episode.id !== currentEpisode?.id)
          .slice(0, 5);
        
        setRecentEpisodes(filteredEpisodes);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recent episodes:', err);
        setError(err.message);
        // Use fallback data if API fails
        setRecentEpisodes(getFallbackEpisodes());
      } finally {
        setLoading(false);
      }
    };

    loadRecentEpisodes();
  }, [currentEpisode?.id]); // Reload when current episode changes

  // Fallback episodes for when API fails
  const getFallbackEpisodes = () => [
    {
      id: 2,
      title: "Building Your Audience",
      episode_number: "41",
      itunes_duration: "28:00",
      thumbnail_url: "/images/episode-41-thumb.jpg",
      slug: "building-your-audience"
    },
    {
      id: 3,
      title: "Content Strategy Tips",
      episode_number: "40", 
      itunes_duration: "35:00",
      thumbnail_url: "/images/episode-40-thumb.jpg",
      slug: "content-strategy-tips"
    },
    {
      id: 4,
      title: "Interview Techniques",
      episode_number: "39",
      itunes_duration: "42:00",
      thumbnail_url: "/images/episode-39-thumb.jpg",
      slug: "interview-techniques"
    },
    {
      id: 5,
      title: "Equipment Essentials",
      episode_number: "38",
      itunes_duration: "30:00",
      thumbnail_url: "/images/episode-38-thumb.jpg",
      slug: "equipment-essentials"
    },
    {
      id: 6,
      title: "Growing Your Podcast",
      episode_number: "37",
      itunes_duration: "45:00",
      thumbnail_url: "/images/episode-37-thumb.jpg",
      slug: "growing-your-podcast"
    }
  ];

  // Use current episode description if available, otherwise fallback to default
  const getEpisodeContent = () => {
    if (currentEpisode?.description) {
      // Split description into paragraphs if it contains line breaks or is very long
      const description = currentEpisode.description;
      if (description.includes('\n')) {
        return description.split('\n').filter(paragraph => paragraph.trim());
      } else if (description.length > 200) {
        // Split long descriptions at sentence boundaries
        const sentences = description.split('. ');
        const midPoint = Math.floor(sentences.length / 2);
        return [
          sentences.slice(0, midPoint).join('. ') + (midPoint > 0 ? '.' : ''),
          sentences.slice(midPoint).join('. ')
        ].filter(paragraph => paragraph.trim());
      } else {
        return [description];
      }
    }
    
    // Default fallback content
    return [
      "Join us as we explore the evolving landscape of podcasting, discussing the latest trends, technologies, and what the future holds for content creators and listeners alike. Our special guest shares insights from their journey in the industry.",
      "We dive deep into topics including monetization strategies, audience engagement, and the impact of AI on content creation. Whether you're a seasoned podcaster or just starting out, this episode has valuable insights for everyone."
    ];
  };

  const episodeContent = {
    title: "About This Episode",
    content: getEpisodeContent()
  };

  return (
    <div className="two-column-section">
      <TextColumn 
        title={episodeContent.title}
        content={episodeContent.content}
      />
      
      <div className="episodes-section">
        <div className="episodes-header">
          <h3>Recent Episodes</h3>
          <Link to="/episodes" className="see-all-link">
            See All Episodes →
          </Link>
        </div>
        
        {loading ? (
          <div className="episodes-loading">
            <div className="loading-spinner"></div>
            <p>Loading episodes...</p>
          </div>
        ) : error && recentEpisodes.length === 0 ? (
          <div className="episodes-error">
            <p>Unable to load episodes. Please try again later.</p>
          </div>
        ) : (
          <EpisodeCardsContainer episodes={recentEpisodes} />
        )}
      </div>
    </div>
  );
};

export default TwoColumnSection;