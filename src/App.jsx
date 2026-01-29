import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuestionsPage from './pages/QuestionsPage'
import MatchesPage from './pages/MatchesPage'
import ResultsPage from './pages/ResultsPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import './App.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/components.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App