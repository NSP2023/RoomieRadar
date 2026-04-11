// src/components/Home/HowItWorks.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, TrendingUp, Users, Heart } from "lucide-react";
import "./HowItWorks.css";

const faqData = [
  {
    question: "Is RoomieRadar free to use?",
    answer:
      "Yes! The basic questionnaire, compatibility check and seeing matches is completely free. Premium features might come later, but the heart of RoomieRadar will always stay free~",
  },
  {
    question: "How accuracy is the compatibility score?",
    answer:
      "It's based on things students & young adults care about most! The more honest your answers, the more magical and accurate the match will be!",
  },
  {
    question: "Can I find roommates in my university?",
    answer:
      "This is only and strictly inside IUT residential halls — we will include non-res in the future inshallah!",
  },
];

//hook
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const HowItWorks = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const [titleRef,  titleVisible]  = useInView();
  const [stepsRef,  stepsVisible]  = useInView();
  const [ctaRef,    ctaVisible]    = useInView();
  const [faqRef,    faqVisible]    = useInView();

  const steps = [
    {
      icon: ClipboardCheck,
      title: "1. Answer Questions",
      description: "Tell us about your lifestyle: sleep, cleanliness, noise, guests, and more.",
      color: "#ff7b8c",
    },
    {
      icon: TrendingUp,
      title: "2. Get Your Score",
      description: "Our smart algorithm calculates real compatibility using weighted scoring.",
      color: "#ff9aa8",
    },
    {
      icon: Users,
      title: "3. Review Insights",
      description: "See detailed radar charts, conflict forecast, and personalized tips.",
      color: "#ffb3c1",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">

        {/* Title */}
      
        <div
          ref={titleRef}
          className={`section-title fade-up ${titleVisible ? "visible" : ""}`}
        >
          <span className="title-icon">🏠</span>
          <h2>How It Works</h2>
          <p className="section-subtitle">
            Finding your perfect roommate is easier than you think ♡
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`step-card fade-up ${stepsVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div
                  className="step-icon-wrapper"
                  style={{ backgroundColor: `${step.color}18` }}
                >
                  <Icon size={42} color={step.color} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            );
          })}
        </div>

        
        <div
          ref={ctaRef}
          className={`cta-section fade-up ${ctaVisible ? "visible" : ""}`}
        >
          <Heart className="cta-heart" size={48} />
          <p className="cta-text">Ready to find your perfect roommate match?</p>
          <button onClick={() => navigate("/questionnaire")} className="btn-primary btn-large">
            Let's Get Started !!
          </button>
        </div>

        {/* FAQ */}
        <div
          ref={faqRef}
          className={`faq-section fade-up ${faqVisible ? "visible" : ""}`}
        >
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openFaq === index ? "active" : ""}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {item.question}
                <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
              </button>
              <div className={`faq-answer ${openFaq === index ? "open" : ""}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
