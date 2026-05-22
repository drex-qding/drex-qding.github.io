import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const photos = [
  '/assets/摄影作品/1.jpg',
  '/assets/摄影作品/2.jpg',
  '/assets/摄影作品/3.jpg',
  '/assets/摄影作品/5.jpg',
  '/assets/摄影作品/6.jpg',
  '/assets/摄影作品/8.jpg',
  '/assets/摄影作品/9.jpg',
  '/assets/摄影作品/10.jpg',
  '/assets/摄影作品/11.jpg',
  '/assets/摄影作品/12.jpg',
  '/assets/摄影作品/13.jpg',
  '/assets/摄影作品/14.jpg',
  '/assets/摄影作品/15.jpg',
  '/assets/摄影作品/15_副本.jpg',
  '/assets/摄影作品/16.jpg',
  '/assets/摄影作品/17.jpg',
  '/assets/摄影作品/18.jpg',
  '/assets/摄影作品/19.jpg',
  '/assets/摄影作品/20.jpg',
  '/assets/摄影作品/123.jpg',
  '/assets/摄影作品/dji_export_photo_20260516150243017.jpg',
  '/assets/摄影作品/DSC00791.jpg',
  '/assets/摄影作品/DSC00793.jpg',
  '/assets/摄影作品/DSC00794.jpg',
  '/assets/摄影作品/DSC00797.jpg',
  '/assets/摄影作品/DSC00804.jpg',
  '/assets/摄影作品/DSC00811.jpg',
  '/assets/摄影作品/DSC00813.jpg',
  '/assets/摄影作品/DSC00817.jpg',
  '/assets/摄影作品/DSC00821.jpg',
  '/assets/摄影作品/DSC00828.jpg',
  '/assets/摄影作品/DSC00878.jpg',
  '/assets/摄影作品/马.jpg',
  '/assets/摄影作品/猫咪2.jpg',
  '/assets/摄影作品/日晷.jpg',
  '/assets/摄影作品/天空.jpeg',
  '/assets/摄影作品/文华楼.jpg',
  '/assets/摄影作品/钟山.jpg',
]

export default function Photography() {
  const { content } = useContent()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // More photos = more travel distance
  const x = useTransform(scrollYProgress, [0, 1], ['2%', `-${Math.min(photos.length * 38, 75)}%`])

  return (
    <section id="photography" ref={containerRef} className="relative bg-black h-[300vh]">
      <div className="absolute top-0 left-0 right-0 z-10 pt-24 md:pt-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30">Photography</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-3">
              {content.photography.title}
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex items-center gap-5 md:gap-8 px-6 md:px-10 will-change-transform"
        >
          {photos.map((src, idx) => (
            <motion.div
              key={`${src}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.02, 0.4), ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="w-full h-full bg-white/5 overflow-hidden">
                <img
                  src={src}
                  alt={`摄影作品 ${idx + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
