import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardCheck, TrendingUp, Users } from 'lucide-react'

const HowItWorks = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/questions')
  }

  const steps = [
    {
      icon: ClipboardCheck,
      title: "1. Answer Questions",
      description: "Both you and your potential roommate answer simple questions about sleep, noise, cleanliness, and more."
    },
    {
      icon: TrendingUp,
      title: "2. Get Your Score",
      description: "Our friendly algorithm calculates your compatibility based on lifestyle factors that matter most."
    },
    {
      icon: Users,
      title: "3. Review Insights",
      description: "See detailed visualizations, personality labels, and tips for making your living situation work beautifully."
    }
  ]

  return (
    <section className="how-it-works">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How It Works</h2>
          <p className="section-subtitle">
            Ready to find out if you're a match made in roommate heaven?
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="step-icon">
                <step.icon size={40} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="cta-text">
            Ready to find out if you're a match made in roommate heaven?
          </p>
          <button onClick={handleGetStarted} className="btn btn-primary btn-large">
            Let's Get Started!
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .how-it-works {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.5);
        }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }

        .step-card {
          text-align: center;
          padding: 40px 30px;
          position: relative;
          overflow: hidden;
        }

        .step-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-card:hover:before {
          opacity: 1;
        }

        .step-icon {
          width: 80px;
          height: 80px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #6366f1;
        }

        .step-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #1f2937;
        }

        .step-description {
          color: #6b7280;
          line-height: 1.6;
        }

        .cta-section {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
          border-radius: 24px;
          margin-top: 40px;
        }

        .cta-text {
          font-size: 1.5rem;
          color: #1f2937;
          margin-bottom: 30px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .step-card {
            padding: 30px 20px;
          }

          .cta-text {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  )
}

export default HowItWorks