<img width="1897" height="871" alt="image" src="https://github.com/user-attachments/assets/9f4292f5-49c4-438b-8822-47e27756844c" /># 🏡 RoomieRadar

**Roommate Compatibility Checker**

RoomieRadar is a full-stack MERN web application that helps users find compatible roommates based on lifestyle preferences such as sleep habits, noise tolerance, and cleanliness. The platform provides compatibility scores, conflict predictions, and practical insights to support better shared-living decisions.

---

## 🚀 Features

### Core Functionality

* Multi-step lifestyle questionnaire
* Weighted compatibility scoring algorithm
* Results dashboard with radar charts and personality labels
* Conflict forecast highlighting potential friction areas
* One-day shared living simulation

### Roommate Match System

* List of potential roommates with compatibility scores
* Highlighted top matches with badges
* Clickable profile cards with detailed daily simulations
* Optional side-by-side roommate comparison

### UI & Interaction

* “What-If” preference slider for dynamic result updates
* Warm, minimal UI with rounded cards and soft shadows
* Fully responsive design for mobile and desktop

---

## 🛠 Tech Stack

**Frontend**

* React.js
* HTML5, CSS3
* Chart.js

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Mongoose)

**State Management**

* React Hooks / Context API

**Deployment (Optional)**

* Vercel
* Render
* Heroku

---

## 📁 Project Structure

```
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
```

---

## ⚙️ Installation & Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:3000`

> Ensure MongoDB is running locally or use a cloud MongoDB URI.

---

## 🔐 Environment Variables

Create a `.env` file inside `/backend`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## 📌 Future Improvements

* Export compatibility reports (PDF / JSON)
* Dark / light mode toggle
* Save multiple roommate profiles
* Smooth animations for charts and match highlights

---

## 👩‍💻 Contributors

* **Noshin Syara**
* **Tasnia Rahman Maha**
* **Maliha Mehnaj**

Islamic University of Technology (IUT)

---

## 📄 License

This project is licensed under the **MIT License**.

