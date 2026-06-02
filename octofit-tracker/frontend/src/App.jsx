import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const backendOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Octofit Tracker</h1>
        <p>
          Backend API origin:{' '}
          <code>{backendOrigin}</code>
        </p>
        <p>
          This frontend uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to
          build GitHub.dev API URLs.
        </p>
        <nav className="app-nav">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
