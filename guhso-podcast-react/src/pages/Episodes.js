// Episodes page - 3-column grid of all episodes
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EpisodeCard from '../components/Episodes/EpisodeCard';
import { fetchEpisodes } from '../api';
import './Episodes.css';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 12; // 4 rows × 3 columns

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        const data = await fetchEpisodes();
        setEpisodes(data.data || data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch episodes:', err);
        setError(err.message);
        // Fallback to sample data for development
        setEpisodes([
          {
            id: 1,
            title: "Welcome to GUHSO Podcast",
            slug: "welcome-to-guhso",
            episode_number: "1",
            season_number: "1",
            description: "Join us as we kick off the GUHSO podcast journey with exciting conversations about technology, business, and innovation.",
            itunes_duration: "45:30",
            audio_url: "/audio/episode-1.mp3",
            thumbnail: "energy-vampire.png",
            show: { title: "GUHSO" },
            published_at: "2024-01-15"
          },
          {
            id: 2,
            title: "The Future of AI in Business",
            slug: "future-ai-business",
            episode_number: "2",
            season_number: "1",
            description: "Exploring how artificial intelligence is transforming the business landscape and what entrepreneurs need to know.",
            itunes_duration: "52:15",
            audio_url: "/audio/episode-2.mp3",
            show: { title: "GUHSO" },
            published_at: "2024-01-22"
          },
          {
            id: 3,
            title: "Building Sustainable Startups",
            slug: "sustainable-startups",
            episode_number: "3",
            season_number: "1",
            description: "How to build businesses that are not only profitable but also environmentally and socially responsible.",
            itunes_duration: "38:45",
            audio_url: "/audio/episode-3.mp3",
            show: { title: "GUHSO" },
            published_at: "2024-01-29"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  // Pagination logic
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="episodes-page">
        <div className="episodes-header">
          <h1>All Episodes</h1>
          <p>Loading episodes...</p>
        </div>
        <div className="episodes-grid loading">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="episode-card loading">
              <div className="episode-card-image-container">
                <div className="loading-placeholder"></div>
              </div>
              <div className="episode-card-content">
                <div className="loading-text"></div>
                <div className="loading-text short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && episodes.length === 0) {
    return (
      <div className="episodes-page">
        <div className="episodes-header">
          <h1>All Episodes</h1>
          <div className="error-message">
            <p>Failed to load episodes: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="episodes-page">
      <div className="episodes-header">
        <h1>All Episodes</h1>
        <p className="episodes-count">
          {episodes.length} episode{episodes.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="episodes-grid">
        {currentEpisodes.map((episode) => (
          <Link 
            key={episode.id} 
            to={`/episode/${episode.slug || episode.id}`}
            className="episode-link"
          >
            <EpisodeCard episode={episode} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <i className="fas fa-chevron-left"></i>
            Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;
              const showPage = 
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

              if (!showPage) {
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`pagination-number ${isCurrentPage ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Episodes Stats */}
      <div className="episodes-stats">
        <div className="stat-item">
          <span className="stat-number">{episodes.length}</span>
          <span className="stat-label">Total Episodes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {episodes.reduce((acc, ep) => {
              const duration = ep.itunes_duration || "0:00";
              const [hours = "0", minutes = "0"] = duration.split(":");
              return acc + parseInt(hours) * 60 + parseInt(minutes);
            }, 0)}m
          </span>
          <span className="stat-label">Total Duration</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Math.max(...episodes.map(ep => parseInt(ep.season_number) || 1))}
          </span>
          <span className="stat-label">Seasons</span>
        </div>
      </div>
    </div>
  );
};

export default Episodes;