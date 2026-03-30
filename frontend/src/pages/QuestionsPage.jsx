import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions as questionData } from '../data'
import QuestionCard from '../components/Questions/QuestionCard'
import ProgressBar from '../components/Questions/ProgressBar'

const QuestionsPage = () => {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // Initialize questions with empty answers
    const formattedQuestions = questionData.map(q => ({
      ...q,
      answered: !!answers[q.id],
      options: q.options || [] // Ensure options exist
    }))
    setQuestions(formattedQuestions)
  }, [answers])

  const currentQuestion = questions[currentQuestionIndex] || null

  const handleSelectOption = (optionId) => {
    if (!currentQuestion) return

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId
    }
    setAnswers(updatedAnswers)

    // Auto-advance to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // All questions answered - navigate to results
        navigate('/matches')
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      navigate('/matches')
    }
  }

  const progress = questions.length > 0
    ? ((Object.keys(answers).length / questions.length) * 100)
    : 0

  if (questions.length === 0) {
    return (
      <div className="questions-page">
        <div className="container">
          <div className="loading-state">
            <h2>Loading questions...</h2>
          </div>
          <style jsx="true">{`
            .questions-page {
              padding: 40px 0 80px;
              min-height: calc(100vh - 80px);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .loading-state {
              text-align: center;
              color: #6b7280;
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div className="questions-page">
      <div className="container">
        <ProgressBar
          progress={progress}
          questions={questions}
        />

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedOption={answers[currentQuestion.id]}
            onSelect={handleSelectOption}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion?.id] && currentQuestionIndex === questions.length - 1}
            className="btn btn-primary"
          >
            {currentQuestionIndex === questions.length - 1 ? 'See Matches' : 'Next'}
          </button>
        </div>
      </div>

      <style jsx="true">{`
        .questions-page {
          padding: 40px 0 80px;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .questions-page {
            padding: 20px 0 40px;
          }

          .navigation-buttons {
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default QuestionsPage