import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const projectBvids = [
  'BV1iYGt6qELx', // 一座塔的前世今生
  'BV1RvGt6KE2m', // 世界青年日采访视频—UNFPA
  'BV1jYGt6BENm', // 线上教学视频制作
  'BV1LYGt6BEa4', // Vlog
]

const bilibiliCoverCache = {}

function BilibiliCover({ bvid }) {
  const [cover, setCover] = useState(null)

  useEffect(() => {
    if (bilibiliCoverCache[bvid]) {
      setCover(bilibiliCoverCache[bvid])
      return
    }
    let cancelled = false
    fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        const url = d.data?.pic
        if (url) {
          bilibiliCoverCache[bvid] = url
          setCover(url)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [bvid])

  if (cover) {
    return <img src={cover} alt="" className="w-full h-full object-cover" />
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/60">
      <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}

function BilibiliLightbox({ bvid, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-2xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          <iframe
            src={`https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&high_quality=1`}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay"
            title="Bilibili video player"
          />
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-white/50 hover:text-white transition-colors mx-auto block"
        >
          关闭 ESC
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function VideoPortfolio() {
  const { content } = useContent()
  const sectionRef = useRef(null)
  const [lightboxBvid, setLightboxBvid] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])

  return (
    <>
      <section id="video" ref={sectionRef} className="relative py-20 md:py-32 px-6 bg-apple-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-apple-gray">Video</span>
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
              {content.video.title}
            </h2>
          </motion.div>

          <motion.div
            style={{ scale, opacity }}
            className="w-full bg-black rounded-3xl md:rounded-[2rem] overflow-hidden p-6 md:p-12 lg:p-16 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {content.video.projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                  onClick={() => setLightboxBvid(projectBvids[idx])}
                >
                  <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black mb-5">
                    <BilibiliCover bvid={projectBvids[idx]} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <span className="inline-block text-xs font-semibold tracking-wider text-white/40 uppercase mb-2">
                    {project.subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxBvid && (
          <BilibiliLightbox bvid={lightboxBvid} onClose={() => setLightboxBvid(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
