import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const portraitPosters = [
  '/assets/海报作品/1.jpg',
  '/assets/海报作品/3.jpg',
  '/assets/海报作品/4.jpg',
  '/assets/海报作品/脱口秀.png',
]

const landscapeScreenshots = [
  '/assets/海报作品/截屏2026-05-22 11.12.27.png',
  '/assets/海报作品/截屏2026-05-22 11.13.01.png',
]

const squareScreenshots = [
  '/assets/海报作品/截屏2026-05-22 11.22.19.png',
  '/assets/海报作品/截屏2026-05-22 11.22.39.png',
  '/assets/海报作品/截屏2026-05-22 11.23.09.png',
  '/assets/海报作品/截屏2026-05-22 11.24.04.png',
  '/assets/海报作品/截屏2026-05-22 11.24.20.png',
  '/assets/海报作品/截屏2026-05-22 14.37.23.png',
]

function PosterGrid({ images, aspectClass }) {
  return (
    <div className={`grid ${aspectClass === 'portrait' ? 'grid-cols-2 sm:grid-cols-4' : aspectClass === 'square' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'} gap-5 md:gap-6`}>
      {images.map((src, idx) => (
        <motion.div
          key={`${src}-${idx}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-apple-light cursor-pointer"
        >
          <div className={`w-full ${aspectClass === 'portrait' ? 'aspect-[3/4]' : aspectClass === 'wide' ? 'aspect-[7/3] md:aspect-[5/2]' : 'aspect-square'}`}>
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500" />
        </motion.div>
      ))}
    </div>
  )
}

export default function PosterDesign() {
  const { content } = useContent()

  return (
    <section id="poster" className="relative bg-white py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-apple-gray">Poster Design</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
            {content.poster.title}
          </h2>
        </motion.div>

        {/* Portrait posters */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-apple-gray mb-6 tracking-wide">海报设计</h3>
          <PosterGrid images={portraitPosters} aspectClass="portrait" />
        </div>

        {/* Landscape screenshots */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-apple-gray mb-6 tracking-wide">公众号配图 · 横版</h3>
          <PosterGrid images={landscapeScreenshots} aspectClass="wide" />
        </div>

        {/* Square screenshots */}
        <div>
          <h3 className="text-sm font-semibold text-apple-gray mb-6 tracking-wide">公众号配图 · 正方形</h3>
          <PosterGrid images={squareScreenshots} aspectClass="square" />
        </div>
      </div>
    </section>
  )
}
