# RoomieRadar
Roommate Compatibility Checker
Find your perfect roommate match with RoomieRadar – a warm, friendly, and interactive web application that helps you check compatibility with potential roommates based on lifestyle habits.

🏠 Overview

RoomieRadar is a full-stack MERN web application that allows users to:

Answer lifestyle questions about sleep, noise tolerance, and cleanliness

Get a compatibility score with potential roommates

See visual conflict forecasts and a one-day simulation of shared living

Explore a Roommate Match section with detailed insights and top matches

Receive practical tips to improve compatibility

The design emphasizes a warm and welcoming interface, making the experience feel like a digital hug.

🎯 Features
Core Features

Multi-step lifestyle questionnaire

Weighted compatibility scoring system

Results dashboard with radar charts and personality labels

Conflict forecast highlighting potential friction

One-day roommate simulation timeline

Roommate Match Section

Lists potential roommates with compatibility scores

Highlights top matches with badges

Clickable cards to see detailed one-day simulations

Optional: compare two roommates side by side

Interactive Enhancements

“What-If” slider for adjusting preferences and seeing updated results

Warm, cozy color theme with rounded cards and soft shadows

Mobile responsive design

🛠️ Technology Stack

Frontend: React.js, HTML, CSS, Chart.js

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

State Management: React Hooks / Context API

Deployment: Vercel / Render / Heroku (optional)

📁 File Structure
roomie-radar/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       ├── utils/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── server.js
├── README.md
└── .gitignore

⚡ Setup & Installation
Backend
cd backend
npm install
npm run dev   # Starts backend server on http://localhost:5000

Frontend
cd frontend
npm install
npm run dev   # Starts frontend server on http://localhost:3000


Make sure MongoDB is running locally or provide a connection string in .env

🔧 Environment Variables

Create a .env file in /backend:

MONGO_URI=your_mongodb_connection_string
PORT=5000

🖼️ Screenshots (Optional)

Landing Page – Cozy, welcoming hero section

Questionnaire Page – Multi-step questions with progress bar

Results Dashboard – Radar chart + compatibility score + tips

Roommate Match Section – Highlighted top matches

(Add screenshots after building the UI)

📈 Future Enhancements

Export compatibility reports (PDF/JSON)

Dark/light mode toggle

Save multiple profiles for later comparison

Smooth animations for radar charts and match highlights

👩‍💻 Authors

Noshin Syara, Tasnia Rahman Maha, Maliha Mehnaj

Islamic University of Technology (IUT)

📄 License

MIT License
