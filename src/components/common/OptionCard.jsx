import React from 'react'

const OptionCard = ({
  option,
  selected = false,
  onClick,
  className = ''
}) => {
  // Add null check for option
  if (!option) {
    return (
      <div className="option-card loading">
        <div className="loading-text">Loading option...</div>
        <style jsx="true">{`
          .option-card.loading {
            padding: 24px;
            background: #f9fafb;
            border-radius: 16px;
            text-align: center;
            color: #6b7280;
          }
        `}</style>
      </div>
    )
  }

  const { id, label, description, icon } = option

  return (
    <div
      className={`option-card ${selected ? 'selected' : ''} ${className}`}
      onClick={() => onClick(id)}
      data-testid={`option-${id}`}
    >
      <div className="option-icon">{icon}</div>
      <div className="option-content">
        <h4 className="option-label">{label}</h4>
        <p className="option-description">{description}</p>
      </div>
      {selected && (
        <div className="option-check">
          <span>✓</span>
        </div>
      )}

      <style jsx="true">{`
        .option-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .option-card:hover {
          border-color: #6366f1;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
        }

        .option-card.selected {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
        }

        .option-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .option-content {
          flex: 1;
        }

        .option-label {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .option-description {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .option-check {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 24px;
          height: 24px;
          background: #6366f1;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .option-card {
            padding: 20px;
          }

          .option-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default OptionCard