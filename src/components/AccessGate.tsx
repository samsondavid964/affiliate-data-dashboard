import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { useAuth } from '../AuthContext'

export const AccessGate: React.FC = () => {
  const [id, setId] = useState('')
  const [error, setError] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(id)
    if (!success) {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="access-gate-container">
      <motion.div 
        className="access-gate-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="access-gate-header">
          <div className="access-gate-icon-wrap">
            <Lock className="access-gate-icon" size={32} />
          </div>
          <h1>Secure Access</h1>
          <p>Please enter your unique ID to continue to the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="access-gate-form">
          <div className={`input-group ${error ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Access ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoFocus
            />
            <button type="submit" className="submit-btn" disabled={!id}>
              <ArrowRight size={20} />
            </button>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={14} />
                <span>Invalid Access ID. Please try again.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="access-gate-footer">
          <ShieldCheck size={14} />
          <span>Restricted to authorized personnel only</span>
        </div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
    </div>
  )
}
