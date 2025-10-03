import { Routes, Route, Link } from 'react-router-dom'

import About from './pages/about'
import Demo from './pages/demo'
import Home from './pages/home'

export default function App() {
  return (
    <div>
      <nav className="flex justify-center gap-4 bg-gray-800 p-4 text-white">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-green-400">
          About
        </Link>
        <Link to="/demo" className="hover:text-green-400">
          Demo
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </div>
  )
}
