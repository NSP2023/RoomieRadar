import React from 'react'
import OptionCard from '../common/OptionCard'

const QuestionCard = ({
  question,
  selectedOption,
  onSelect,
  currentQuestion,
  totalQuestions
}) => {
  // Add null check for question
  if (!question) {
    return (
      <div className="question-card">
        <div className="loading">Loading question...</div>
        <style jsx="true">{`
          .question-card {
            background: white;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }
          .loading {
            color: #6b7280;
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    )
  }

  const { id, question: questionText, options = [] } = question

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-progress">
          Question {currentQuestion} of {totalQuestions}
        </div>
        <div className="question-category">
          {question.category?.charAt(0).toUpperCase() + question.category?.slice(1) || 'General'}
        </div>
      </div>

      <h2 className="question-text">{questionText}</h2>

      <div className="options-grid">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>

      <style jsx="true">{`
        .question-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          max-width: 800px;
          margin: 0 auto;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .question-progress {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .question-category {
          color: #6b7280;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .question-text {
          font-size: 2.2rem;
          margin-bottom: 40px;
          color: #1f2937;
          line-height: 1.3;
        }

        .options-grid {
          display: grid;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .question-card {
            padding: 30px 20px;
            margin: 0 16px;
          }

          .question-text {
            font-size: 1.8rem;
          }

          .question-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .question-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default QuestionCard