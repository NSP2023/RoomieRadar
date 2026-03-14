import React, { useState } from 'react'

const DayVisualization = () => {
  const [timeSlots] = useState([
    { time: '7 AM', userActivity: 'Waking up', matchActivity: 'Waking up', bothMatch: true },
    { time: '9 AM', userActivity: 'Working', matchActivity: 'Working', bothMatch: true },
    { time: '12 PM', userActivity: 'Lunch break', matchActivity: 'Lunch break', bothMatch: true },
    { time: '3 PM', userActivity: 'Working', matchActivity: 'Studying', bothMatch: false },
    { time: '6 PM', userActivity: 'Social time', matchActivity: 'Social time', bothMatch: true },
    { time: '9 PM', userActivity: 'Relaxing', matchActivity: 'Gaming', bothMatch: false },
    { time: '10 PM', userActivity: 'Sleeping', matchActivity: 'Sleeping', bothMatch: true },
    { time: '12 AM', userActivity: 'Sleeping', matchActivity: 'Sleeping', bothMatch: true }
  ])

  const getMatchCount = () => {
    return timeSlots.filter(slot => slot.bothMatch).length
  }

  const getActivityColor = (activity) => {
    const colors = {
      'Waking up': '#3B82F6',      // Blue
      'Working': '#10B981',        // Green
      'Studying': '#10B981',       // Green
      'Lunch break': '#F59E0B',    // Orange
      'Social time': '#8B5CF6',    // Purple
      'Relaxing': '#EC4899',       // Pink
      'Gaming': '#EC4899',         // Pink
      'Sleeping': '#6B7280'        // Gray
    }
    return colors[activity] || '#9CA3AF'
  }

  const getActivityIcon = (activity) => {
    const icons = {
      'Waking up': '☀️',
      'Working': '💼',
      'Studying': '📚',
      'Lunch break': '🥗',
      'Social time': '👥',
      'Relaxing': '🛋️',
      'Gaming': '🎮',
      'Sleeping': '😴'
    }
    return icons[activity] || '⏰'
  }

  const matches = getMatchCount()
  const totalSlots = timeSlots.length
  const matchPercentage = Math.round((matches / totalSlots) * 100)

  return (
    <div className="day-viz">
      <div className="header">
        <h2 className="title">Daily Activity Comparison</h2>
        <p className="subtitle">See how your daily routines align</p>

        <div className="match-summary">
          <div className="match-score">
            <span className="score-number">{matchPercentage}%</span>
            <span className="score-label">Schedule Match</span>
          </div>
          <div className="match-details">
            {matches} out of {totalSlots} time slots match
          </div>
        </div>
      </div>

      <div className="schedule-timeline">
        {timeSlots.map((slot, index) => (
          <div key={index} className="time-slot">
            <div className="time-display">
              <div className="time-hour">{slot.time}</div>
            </div>

            <div className="activity-comparison">
              <div className="activity-row you-activity">
                <div className="activity-indicator">
                  <span className="activity-icon">{getActivityIcon(slot.userActivity)}</span>
                  <div
                    className="activity-color-dot"
                    style={{ backgroundColor: getActivityColor(slot.userActivity) }}
                  />
                </div>
                <div className="activity-text">
                  <span className="person-label">You:</span>
                  <span className="activity-name">{slot.userActivity}</span>
                </div>
              </div>

              <div className="activity-row match-activity">
                <div className="activity-indicator">
                  <span className="activity-icon">{getActivityIcon(slot.matchActivity)}</span>
                  <div
                    className="activity-color-dot"
                    style={{ backgroundColor: getActivityColor(slot.matchActivity) }}
                  />
                </div>
                <div className="activity-text">
                  <span className="person-label">Them:</span>
                  <span className="activity-name">{slot.matchActivity}</span>
                </div>
              </div>

              <div className={`match-status ${slot.bothMatch ? 'matched' : 'not-matched'}`}>
                {slot.bothMatch ? (
                  <>
                    <span className="match-icon">✓</span>
                    <span className="match-text">Same activity</span>
                  </>
                ) : (
                  <>
                    <span className="match-icon">↕️</span>
                    <span className="match-text">Different activities</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-guide">
        <h4 className="guide-title">Activity Types</h4>
        <div className="guide-items">
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#3B82F6' }} />
            <span>Morning Routine</span>
          </div>
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#10B981' }} />
            <span>Work/Study</span>
          </div>
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#F59E0B' }} />
            <span>Break Time</span>
          </div>
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#8B5CF6' }} />
            <span>Social</span>
          </div>
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#EC4899' }} />
            <span>Relax/Gaming</span>
          </div>
          <div className="guide-item">
            <div className="guide-color" style={{ backgroundColor: '#6B7280' }} />
            <span>Sleep</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .day-viz {
          background: white;
          border-radius: 24px;
          padding: 32px;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .header {
          margin-bottom: 40px;
          text-align: center;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .subtitle {
          font-size: 16px;
          color: #6B7280;
          margin: 0 0 24px 0;
        }

        .match-summary {
          background: #F9FAFB;
          border-radius: 16px;
          padding: 20px;
          display: inline-block;
        }

        .match-score {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .score-number {
          font-size: 36px;
          font-weight: 800;
          color: #111827;
        }

        .score-label {
          font-size: 16px;
          color: #6B7280;
          font-weight: 500;
        }

        .match-details {
          font-size: 14px;
          color: #6B7280;
        }

        .schedule-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .time-slot {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          padding: 20px;
          background: #F9FAFB;
          border-radius: 16px;
          border: 1px solid #F3F4F6;
          transition: all 0.2s ease;
        }

        .time-slot:hover {
          border-color: #E5E7EB;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .time-display {
          width: 80px;
          flex-shrink: 0;
          text-align: center;
          padding: 8px;
        }

        .time-hour {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .activity-comparison {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #F3F4F6;
        }

        .activity-indicator {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .activity-icon {
          font-size: 24px;
        }

        .activity-color-dot {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .activity-text {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .person-label {
          font-size: 14px;
          font-weight: 600;
          color: #4B5563;
          min-width: 40px;
        }

        .you-activity .person-label {
          color: #2563EB;
        }

        .match-activity .person-label {
          color: #7C3AED;
        }

        .activity-name {
          font-size: 16px;
          font-weight: 500;
          color: #111827;
          flex: 1;
        }

        .match-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          margin-top: 4px;
        }

        .match-status.matched {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .match-status.not-matched {
          background: rgba(251, 191, 36, 0.1);
          color: #D97706;
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        .match-icon {
          font-size: 16px;
        }

        .activity-guide {
          margin-top: 40px;
          padding: 24px;
          background: #F9FAFB;
          border-radius: 16px;
        }

        .guide-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .guide-items {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .guide-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4B5563;
        }

        .guide-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .day-viz {
            padding: 24px;
            border-radius: 20px;
          }

          .title {
            font-size: 24px;
          }

          .time-slot {
            flex-direction: column;
            gap: 16px;
          }

          .time-display {
            width: 100%;
            text-align: left;
            padding: 0;
          }

          .activity-row {
            padding: 10px 12px;
          }

          .guide-items {
            gap: 16px;
          }

          .score-number {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .activity-text {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .person-label {
            min-width: auto;
          }

          .guide-items {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default DayVisualization