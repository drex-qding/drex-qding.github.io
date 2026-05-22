import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

export default function Navbar() {
  const { content } = useContent()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <a
          href="#"
          className={`text-lg font-semibold tracking-tight transition-colors duration-500 ${
            scrolled ? 'text-black' : 'text-white'
          }`}
        >
          {content.navbar.name}
        </a>
        <div className="hidden md:flex items-center gap-10">
          {content.navbar.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-500 ${
                scrolled
                  ? 'text-apple-gray hover:text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
