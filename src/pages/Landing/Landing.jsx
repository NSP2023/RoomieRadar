// src/pages/Landing/Landing.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import roomiePic from "../../assets/image/RoomieRadar_pic.png"; // adjust path if needed
import './Landing.css';

const faqData = [
  {
    question: "Is RoomieRadar free to use?",
    answer: "Yes! The basic questionnaire, compatibility check and seeing matches is completely free ♡ Premium features might come later, but the heart of RoomieRadar will always stay free~"
  },
  {
    question: "How accurate is the compatibility score?",
    answer: "It's based on things students & young adults care about most! The more honest your answers, the more magical and accurate the match will be~✨"
  },
  {
    question: "Can I find roommates in my university?",
    answer: "Right now we show everyone, but very soon we'll add city & university filters so you can find your perfect roomie nearby! ♡"
  },
];

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing-page">

      {/* Cute floating decorations */}
      <div className="decor bear-1">🧸</div>
      <div className="decor bear-2">🐻</div>
      <div className="decor heart-1">💗</div>
      <div className="decor heart-2">♡</div>
      <div className="decor cloud-1">☁︎</div>
      <div className="decor cloud-2">☁︎</div>
      <div className="decor sparkle-1">✧</div>
      <div className="decor sparkle-2">✦</div>

      {/* HERO */}
      <section className="hero-section">

        {/* Logo image before the title */}
        <div className="logo-container">
          <img
            src={roomiePic}
            alt="RoomieRadar Logo"
            className="logo-image"
          />
        </div>

        <h1 className="main-title">RoomieRadar</h1>

        <p className="tagline">
          Find your perfect roomie with lots of sparkles & cozy vibes🧸💗<br />
          <br></br>
          Cute questions → real compatibility + conflict forecast + happy living tips!
        </p>

        <div className="cta-buttons">
          <Link to="/questionnaire">
            <button className="btn-primary">
              Start Matching Now ♡
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="btn-secondary">
              See Dashboard ✧
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">What You Can Do ♡</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎀</div>
            <h3>Super Compatibility</h3>
            <p>Percentage + cute radar chart of lifestyle match!</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧁</div>
            <h3>One Day Together</h3>
            <p>See how a whole day would feel — morning to sleepy time~</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌸</div>
            <h3>Cozy Tips</h3>
            <p>Sweet suggestions to make your shared life even happier</p>
          </div>
        </div>
      </section>

      {/* GOOD ROOMMATE TIPS */}
    
      <section className="tips-section">
          <br></br>
        <h2 className="section-title">How to Be a Super Cute Roomie ♡</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <p>🧼 Talk before tiny problems become big ones</p>
            <p>🌙 Respect sleep & quiet time</p>
            <p>🫧 Always clean up after yourself (especially snacks!)</p>
          </div>
          <div className="tip-card">
            <p>🎀 Tell each other about guests early</p>
            <p>💬 Be honest about your habits from the start</p>
            <p>🍬 Little surprises like snacks make hearts happy~</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions ✿</h2>
        
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              {item.question}
              <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
              {item.answer}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3 className="footer-title">Made with ♡ - By Noshin,Maliha and Maha</h3>
        <p className="footer-text">
          A web dev course project
        </p>

        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷</a>
          <a href="mailto:noshinsyara@iut-dhaka.edu">✉️</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} RoomieRadar • made with a goal of getting an A+
        </p>
      </footer>
    </div>
  );
};

export default Landing;