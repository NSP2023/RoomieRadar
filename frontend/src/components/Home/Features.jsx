import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Heart, MessageSquare } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "All users are verified through our secure process to ensure a safe community."
    },
    {
      icon: Zap,
      title: "Fast Matching",
      description: "Get matched with compatible roommates in minutes, not days."
    },
    {
      icon: Heart,
      title: "Personalized Matches",
      description: "Our algorithm considers all aspects of your lifestyle for perfect matches."
    },
    {
      icon: MessageSquare,
      title: "Easy Communication",
      description: "Built-in messaging to chat with potential matches before meeting."
    }
  ]

  return (
    <section className="features">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose RoomieRadar?</h2>
          <p className="section-subtitle">
            We make finding your perfect roommate match simple, safe, and fun
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card card-simple"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features {
          padding: 100px 0;
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

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .feature-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #6366f1;
        }

        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .feature-description {
          color: #6b7280;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            padding: 25px 20px;
          }
        }
      `}</style>
    </section>
  )
}

export default Features