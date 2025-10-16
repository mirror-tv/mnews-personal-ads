import { useState } from 'react'

import { Routes, Route, Link, Navigate } from 'react-router-dom'

import { Button } from './components/ui/button'
import { env } from './config/env'
import Dashboard from './pages/dashboard'
import Demo from './pages/demo'
import List from './pages/list'
import LocalPreview from './pages/local-preview'
import Login from './pages/login'
import Order from './pages/order'
import Upload from './pages/upload'

const isLocalOrDev = ['local', 'dev'].includes(env.ENV)

export default function App() {
  const [open, setOpen] = useState(true)

  return (
    <div className="relative flex min-h-screen flex-col bg-surface-secondary">
      {isLocalOrDev && open && (
        <nav className="fixed bottom-0 flex w-full shrink-0 justify-center gap-4 bg-gray-800 p-2 text-white">
          <span className="flex items-center text-sm font-semibold tracking-wide whitespace-nowrap uppercase opacity-80">
            Dev Navigation
          </span>
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            <Link to={'/'} className="hover:text-blue-400">
              Preview
            </Link>
            <Link to="/demo" className="hover:text-green-400">
              Demo
            </Link>
            <span className="font-extrabold">|</span>
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
          </div>
          <Button className="flex items-center" onClick={() => setOpen(false)}>
            close
          </Button>
        </nav>
      )}

      <Routes>
        {/* Local or dev-only routes */}
        {isLocalOrDev ? (
          <>
            <Route path="/" element={<LocalPreview />} />
            <Route path="/demo" element={<Demo />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {/* Shared routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/list" element={<List />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </div>
  )
}
