import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const categoryAssets = [
  { bg: '/assets/海报作品/截屏2026-05-22 11.22.19.png', gradient: 'from-blue-950/90 via-blue-900/70 to-transparent' },
  { bg: '/assets/海报作品/1.jpg', gradient: 'from-purple-950/90 via-purple-900/70 to-transparent' },
  { bg: '/assets/公众号截图/a8b3b3db6b95cea7c1b341443f8a04ad.png', gradient: 'from-emerald-950/90 via-emerald-900/70 to-transparent' },
  { bg: '/assets/摄影作品/15.jpg', gradient: 'from-amber-950/90 via-amber-900/70 to-transparent' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const { content } = useContent()

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center pt-32 pb-20">
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 80, filter: 'blur(24px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <h1 className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold text-white leading-[1.15] tracking-tight text-balance max-w-4xl mx-auto px-4">
            {content.hero.title}
          </h1>
          {content.hero.subtitle && (
            <p className="text-base md:text-xl text-white/50 font-normal mt-5 md:mt-6 max-w-xl mx-auto px-4 leading-relaxed">
              {content.hero.subtitle}
            </p>
          )}
        </motion.div>

        {/* 2x2 Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 md:gap-5 w-full max-w-4xl mx-auto px-4"
        >
          {content.hero.categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="group relative overflow-hidden rounded-3xl md:rounded-[2rem] aspect-[4/3] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${categoryAssets[i].bg})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${categoryAssets[i].gradient}`} />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 font-medium">
                  {cat.desc}
                </p>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/[0.06] to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
