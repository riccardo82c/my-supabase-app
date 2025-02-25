import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [darkMode])

  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-blue-100'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: darkMode ? 1 : 0,
          rotate: darkMode ? 0 : 180,
          opacity: darkMode ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '8px', left: '8px' }}
      >
        <Moon className="w-5 h-5 text-gray-100" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: darkMode ? 0 : 1,
          rotate: darkMode ? -180 : 0,
          opacity: darkMode ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </motion.div>
    </motion.button>
  )
}
