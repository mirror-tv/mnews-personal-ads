import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/home'
import About from './pages/about'
console.log('app.tsx')

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
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
