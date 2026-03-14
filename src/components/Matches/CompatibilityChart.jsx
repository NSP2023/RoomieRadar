import React from 'react'
import { motion } from 'framer-motion'

const CompatibilityChart = ({ userPreferences, matchPreferences }) => {
  const categories = [
    {
      key: 'sleep',
      label: 'Sleep',
      user: userPreferences.sleep,
      match: matchPreferences.sleep,
      userLabel: userPreferences.sleep === 'early' ? 'Early Bird' :
                 userPreferences.sleep === 'night' ? 'Night Owl' :
                 'Midnight Riser',
      matchLabel: matchPreferences.sleep === 'early' ? 'Early Bird' :
                  matchPreferences.sleep === 'night' ? 'Night Owl' :
                  'Midnight Riser'
    },
    {
      key: 'noise',
      label: 'Noise',
      user: userPreferences.noise,
      match: matchPreferences.noise,
      userLabel: userPreferences.noise === 'sensitive' ? 'Sensitive' :
                 userPreferences.noise === 'moderate' ? 'Moderate' :
                 'Easy-going',
      matchLabel: matchPreferences.noise === 'sensitive' ? 'Sensitive' :
                  matchPreferences.noise === 'moderate' ? 'Moderate' :
                  'Easy-going'
    },
    {
      key: 'cleanliness',
      label: 'Cleanliness',
      user: userPreferences.cleanliness,
      match: matchPreferences.cleanliness,
      userLabel: userPreferences.cleanliness === 'meticulous' ? 'Meticulous' :
                 userPreferences.cleanliness === 'balanced' ? 'Balanced' :
                 'Relaxed',
      matchLabel: matchPreferences.cleanliness === 'meticulous' ? 'Meticulous' :
                  matchPreferences.cleanliness === 'balanced' ? 'Balanced' :
                  'Relaxed'
    },
    {
      key: 'temperature',
      label: 'Temperature',
      user: userPreferences.temperature,
      match: matchPreferences.temperature,
      userLabel: userPreferences.temperature === 'cool' ? 'Cool & Fresh' :
                 userPreferences.temperature === 'justRight' ? 'Just Right' :
                 'Warm & Cozy',
      matchLabel: matchPreferences.temperature === 'cool' ? 'Cool & Fresh' :
                  matchPreferences.temperature === 'justRight' ? 'Just Right' :
                  'Warm & Cozy'
    },
    {
      key: 'social',
      label: 'Social',
      user: userPreferences.social,
      match: matchPreferences.social,
      userLabel: userPreferences.social === 'introvert' ? 'Homebody' :
                 userPreferences.social === 'balancedSocial' ? 'Balanced' :
                 'Social Butterfly',
      matchLabel: matchPreferences.social === 'introvert' ? 'Homebody' :
                  matchPreferences.social === 'balancedSocial' ? 'Balanced' :
                  'Social Butterfly'
    }
  ]

  const calculateMatchPercentage = (user, match) => {
    if (user === match) return 100
    if (!user || !match) return 0

    // Simple compatibility scoring
    const pairs = [
      ['early', 'night'],
      ['night', 'midnight'],
      ['sensitive', 'moderate'],
      ['moderate', 'easy'],
      ['meticulous', 'balanced'],
      ['balanced', 'relaxed'],
      ['cool', 'justRight'],
      ['justRight', 'warm'],
      ['introvert', 'balancedSocial'],
      ['balancedSocial', 'social']
    ]

    const isAdjacent = pairs.some(([a, b]) =>
      (user === a && match === b) || (user === b && match === a)
    )

    return isAdjacent ? 75 : 50
  }

  const totalScore = categories.reduce((sum, category) => {
    return sum + calculateMatchPercentage(category.user, category.match)
  }, 0) / categories.length

  return (
    <div className="compatibility-chart">
      <div className="chart-header">
        <div className="total-score">
          <div className="score-circle">
            <span className="score-value">{Math.round(totalScore)}%</span>
            <span className="score-label">Match Score</span>
          </div>
        </div>
        <div className="score-description">
          <h3>Perfect Match!</h3>
          <p>You have excellent compatibility across all lifestyle factors</p>
        </div>
      </div>

      <div className="chart-breakdown">
        <h4 className="breakdown-title">Compatibility Breakdown</h4>

        <div className="breakdown-grid">
          {categories.map((category, index) => {
            const score = calculateMatchPercentage(category.user, category.match)

            return (
              <motion.div
                key={category.key}
                className="breakdown-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="category-header">
                  <span className="category-label">{category.label}</span>
                  <span className="category-score">{score}%</span>
                </div>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="category-values">
                  <div className="value-item">
                    <span className="value-label">You:</span>
                    <span className="value-text">{category.userLabel || 'Not set'}</span>
                  </div>
                  <div className="value-item">
                    <span className="value-label">Them:</span>
                    <span className="value-text">{category.matchLabel || 'Not set'}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .compatibility-chart {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }

        .chart-header {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
        }

        .total-score {
          display: flex;
          justify-content: center;
        }

        .score-circle {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .score-value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .score-label {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-top: 4px;
        }

        .score-description h3 {
          font-size: 2rem;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .score-description p {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .breakdown-title {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: #1f2937;
        }

        .breakdown-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .breakdown-item {
          padding: 20px;
          background: #f9fafb;
          border-radius: 16px;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .category-label {
          font-weight: 600;
          color: #1f2937;
          font-size: 1.1rem;
        }

        .category-score {
          font-weight: 700;
          color: #6366f1;
          font-size: 1.2rem;
        }

        .progress-container {
          height: 8px;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 9999px;
          transition: width 1s ease-out;
        }

        .category-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .value-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .value-label {
          font-weight: 500;
          color: #6b7280;
          min-width: 40px;
        }

        .value-text {
          color: #1f2937;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .compatibility-chart {
            padding: 30px 20px;
          }

          .chart-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 30px;
          }

          .category-values {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  )
}

export default CompatibilityChart