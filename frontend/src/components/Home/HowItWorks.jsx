// src/components/Home/HowItWorks.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, TrendingUp, Users, Heart } from "lucide-react";
import "./HowItWorks.css";

const faqData = [
  {
    question: "Is RoomieRadar free to use?",
    answer:
      "Yes! The basic questionnaire, compatibility check and seeing matches is completely free. Premium features might come later, but the heart of RoomieRadar will always stay free~",
  },
  {
    question: "How accurate is the compatibility score?",
    answer:
      "It's based on things students & young adults care about most! The more honest your answers, the more magical and accurate the match will be !",
  },
  {
    question: "Can I find roommates in my university?",
    answer:
      "Right now we show everyone, but very soon we'll add city & university filters so you can find your perfect roomie nearby!",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleGetStarted = () => {
    navigate("/questionnaire");
  };

  const steps = [
    {
      icon: ClipboardCheck,
      title: "1. Answer Questions",
      description:
        "Tell us about your lifestyle — sleep, cleanliness, noise, guests, and more.",
      color: "#ff7b8c",
    },
    {
      icon: TrendingUp,
      title: "2. Get Your Score",
      description:
        "Our smart algorithm calculates real compatibility using weighted scoring.",
      color: "#ff9aa8",
    },
    {
      icon: Users,
      title: "3. Review Insights",
      description:
        "See detailed radar charts, conflict forecast, and personalized tips.",
      color: "#ffb3c1",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">

        {/* Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="title-icon"></span>
          <h2>How It Works</h2>
          <p className="section-subtitle">
            Finding your perfect roommate is easier than you think ♡
          </p>
        </motion.div>

        {/* Steps */}
        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12 }}
              >
                <div
                  className="step-icon-wrapper"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <Icon size={42} color={step.color} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Heart className="cta-heart" size={48} />
          <p className="cta-text">
            Ready to find your perfect roommate match?
          </p>
          <button onClick={handleGetStarted} className="btn-primary btn-large">
            Let's Get Started !!
          </button>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="faq-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="faq-heading">Frequently Asked Questions ✿</h2>

          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openFaq === index ? "active" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                {item.question}
                <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
              </button>
              <div className={`faq-answer ${openFaq === index ? "open" : ""}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
