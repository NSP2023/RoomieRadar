import React from 'react'
import Hero from '../components/Home/Hero'
import HowItWorks from '../components/Home/HowItWorks'
import Features from '../components/Home/Features'

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Background decorative elements */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>

      {/* Decorative circles */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>

      {/* Floating hearts */}
      <div className="floating-heart heart-1">❤️</div>
      <div className="floating-heart heart-2">💜</div>
      <div className="floating-heart heart-3">💚</div>
      <div className="floating-heart heart-4">💖</div>

      <Hero />
      <HowItWorks />
      <Features />

      <style jsx="true">{`
        .home-page {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%);
          min-height: 100vh;
        }

        /* Add subtle pattern overlay */
        .home-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
            radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(157, 78, 221, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(74, 222, 128, 0.05) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default HomePage