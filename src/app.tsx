import { Routes, Route, Link } from 'react-router-dom'

import Dashboard from './pages/dashboard'
import Demo from './pages/demo'
import Home from './pages/home'
import List from './pages/list'
import Login from './pages/login'
import Order from './pages/order'
import Upload from './pages/upload'

export default function App() {
  return (
    <div>
      <nav className="flex justify-center gap-4 bg-gray-800 p-4 text-white">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/login" className="hover:text-purple-400">
          Login
        </Link>
        <Link to="/dashboard" className="hover:text-indigo-400">
          Dashboard
        </Link>
        <Link to="/upload" className="hover:text-pink-400">
          Upload
        </Link>
        <Link to="/list" className="hover:text-yellow-400">
          List
        </Link>
        <Link to="/order" className="hover:text-red-400">
          Order
        </Link>
        <Link to="/demo" className="hover:text-green-400">
          Demo
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/list" element={<List />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </div>
  )
}
