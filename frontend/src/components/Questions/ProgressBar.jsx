import React from 'react'

const ProgressBar = ({ progress, questions = [] }) => {
  const percentage = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-text">
          {percentage}% Complete
        </div>
        <div className="progress-steps">
          {questions.length > 0 && (
            <span>
              {questions.findIndex(q => q.answered === false) + 1 || questions.length} / {questions.length}
            </span>
          )}
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="progress-categories">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`progress-category ${question.answered ? 'answered' : ''} ${index === 0 ? 'active' : ''}`}
          >
            <div className="category-dot" />
            <span className="category-name">
              {question.category}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .progress-container {
          margin-bottom: 40px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .progress-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .progress-steps {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .progress-track {
          height: 8px;
          background: #f3f4f6;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 9999px;
          transition: width 0.6s ease;
        }

        .progress-categories {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .progress-category {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }

        .category-dot {
          width: 12px;
          height: 12px;
          background: #e5e7eb;
          border-radius: 50%;
          margin-bottom: 8px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .progress-category.active .category-dot {
          background: #6366f1;
          transform: scale(1.5);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
        }

        .progress-category.answered .category-dot {
          background: #10b981;
        }

        .category-name {
          font-size: 0.8rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
          white-space: nowrap;
        }

        .progress-categories:before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          height: 2px;
          background: #e5e7eb;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .category-name {
            font-size: 0.7rem;
          }

          .progress-categories {
            gap: 4px;
          }
        }
      `}</style>
    </div>
  )
}

export default ProgressBar