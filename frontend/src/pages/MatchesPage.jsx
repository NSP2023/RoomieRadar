import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchCard from '../components/Matches/MatchCard'
import { matches as matchData } from '../data'
import { Filter, SortAsc, Search } from 'lucide-react'

const MatchesPage = () => {
  const navigate = useNavigate()
  const [matches, setMatches] = useState(matchData)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('bestMatch')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMatches = matches.filter(match => {
    if (filter === 'high' && match.compatibility < 80) return false
    if (filter === 'medium' && (match.compatibility >= 80 || match.compatibility < 60)) return false
    if (filter === 'low' && match.compatibility >= 60) return false

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        match.name.toLowerCase().includes(term) ||
        match.personality.toLowerCase().includes(term) ||
        match.location.toLowerCase().includes(term)
      )
    }

    return true
  })

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'bestMatch') return b.compatibility - a.compatibility
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  const handleViewFullCompatibility = () => {
    if (matches[0]) {
      navigate(`/results/${matches[0].id}`)
    }
  }

  const handleFilterClick = (filterType) => {
    setFilter(filterType)
  }

  const handleSortClick = (sortType) => {
    setSortBy(sortType)
  }

  return (
    <div className="matches-page">
      <div className="container">
        <div className="page-header">
          <h1>Your Roommate Matches</h1>
          <p className="page-subtitle">
            We found {matches.length} potential roommates for you!
          </p>
        </div>

        <div className="top-match-section">
          <div className="top-match-card card">
            <div className="top-match-header">
              <span className="top-match-badge">Your Top Match This Week!</span>
              <span className="top-match-score">{matches[0]?.compatibility}%</span>
            </div>

            <div className="top-match-profile">
              <div className="top-match-avatar">
                <span>🏆</span>
              </div>
              <div className="top-match-info">
                <h2>{matches[0]?.name}</h2>
                <p className="top-match-location">{matches[0]?.location}</p>
                <div className="top-match-personality">
                  {matches[0]?.personality}
                </div>
              </div>
            </div>

            <p className="top-match-bio">{matches[0]?.bio}</p>

            <div className="top-match-actions">
              <button className="btn btn-primary" onClick={handleViewFullCompatibility}>
                View Full Compatibility
              </button>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <Filter size={20} />
              <span className="filter-label">Filter:</span>
              <div className="filter-options">
                {['All', 'High (80+)', 'Medium (60-79)', 'Low (<60)'].map((option) => {
                  const filterType = option.toLowerCase().split(' ')[0]
                  return (
                    <button
                      key={option}
                      className={`filter-option ${filter === filterType ? 'active' : ''}`}
                      onClick={() => handleFilterClick(filterType)}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="sort-group">
              <SortAsc size={20} />
              <span className="sort-label">Sort by:</span>
              <div className="sort-options">
                {['Best Match', 'Name'].map((option) => {
                  const sortType = option.toLowerCase().replace(' ', '')
                  return (
                    <button
                      key={option}
                      className={`sort-option ${sortBy === sortType ? 'active' : ''}`}
                      onClick={() => handleSortClick(sortType)}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="matches-grid">
          {sortedMatches.slice(1).map((match, index) => (
            <MatchCard key={match.id} match={match} index={index + 1} />
          ))}
        </div>

        <div className="matches-summary">
          <p>
            Showing {sortedMatches.length} of {matches.length} matches
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      </div>

      <style jsx>{`
        .matches-page {
          padding: 40px 0 80px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          margin-top: 8px;
        }

        .top-match-section {
          margin-bottom: 60px;
        }

        .top-match-card {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
          border: 2px solid rgba(99, 102, 241, 0.2);
        }

        .top-match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .top-match-badge {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 8px 16px;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .top-match-score {
          font-size: 1.8rem;
          font-weight: 700;
          color: #6366f1;
        }

        .top-match-profile {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 20px;
        }

        .top-match-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          flex-shrink: 0;
        }

        .top-match-info h2 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .top-match-location {
          color: #6b7280;
          margin-bottom: 8px;
        }

        .top-match-personality {
          display: inline-block;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .top-match-bio {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .top-match-actions {
          text-align: center;
        }

        .controls-section {
          margin-bottom: 40px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 12px;
          padding: 12px 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0 12px;
          font-size: 1rem;
          color: #1f2937;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .filter-controls {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .filter-group, .sort-group {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #6b7280;
        }

        .filter-label, .sort-label {
          font-weight: 500;
        }

        .filter-options, .sort-options {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-option, .sort-option {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .filter-option:hover, .sort-option:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        .filter-option.active, .sort-option.active {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .matches-summary {
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr;
          }

          .filter-controls {
            flex-direction: column;
            gap: 20px;
          }

          .top-match-profile {
            flex-direction: column;
            text-align: center;
          }

          .top-match-avatar {
            width: 100px;
            height: 100px;
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default MatchesPage