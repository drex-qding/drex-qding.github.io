import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useContent } from '../context/ContentContext'

function CountUp({ target, suffix = '', label, detail }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const duration = 2400
    const animate = (now) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target])

  const formatted = (() => {
    if (target >= 10000) {
      return (count / 1000).toFixed(1) + 'k'
    }
    if (target >= 1000) {
      return Math.round(count).toLocaleString()
    }
    // Decimal number — preserve exact precision (e.g. 3.956)
    const decimals = (String(target).split('.')[1] || '').length
    return Number(count.toFixed(decimals)).toString()
  })()

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-2">
        {formatted}
        <span className="text-2xl md:text-3xl font-semibold text-apple-gray ml-1">{suffix}</span>
      </div>
      <div className="text-base font-bold text-black mb-0">{label}</div>
      <div className="text-sm text-[#86868b] leading-relaxed mt-1.5">{detail}</div>
    </div>
  )
}

export default function AboutMe() {
  const { content } = useContent()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="relative bg-white py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-apple-light ring-2 ring-black/5">
                <img
                  src="/assets/头像/证件照.jpg"
                  alt={content.about.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="flex-1 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-apple-dark leading-snug tracking-tight mb-6"
              >
                {content.about.name}
                <span className="block text-lg md:text-xl font-normal text-apple-gray mt-2 leading-relaxed">
                  {content.about.bio}
                </span>
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
          {content.about.stats.map((stat, i) => (
            <div key={i}>
              <div className="md:hidden text-xs font-semibold tracking-[0.15em] uppercase text-apple-gray mb-4">0{i + 1}</div>
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                detail={stat.detail}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
