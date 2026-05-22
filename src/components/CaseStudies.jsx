import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const phoneCardImages = [
  '/assets/公众号截图/5cfef8c3b1157a0cc08574a3aae11ff6.jpg',
  '/assets/公众号截图/b3fe51e5b579672485a27939503aedd1.jpg',
  '/assets/公众号截图/95567b52f26bb5f98489858b29864dbc.png',
]

function IPhoneMockup({ scrollProgress, phoneCards }) {
  const cardHeight = 190
  const gap = 16
  const totalScroll = (phoneCards.length - 1) * (cardHeight + gap)
  const y = useTransform(scrollProgress, [0, 1], [0, -totalScroll])

  return (
    <div className="relative mx-auto w-[260px] md:w-[300px] select-none">
      <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-2.5 shadow-2xl shadow-black/20">
        <div className="absolute left-[-3px] top-24 w-[3px] h-10 bg-[#333] rounded-l-md" />
        <div className="absolute left-[-3px] top-36 w-[3px] h-14 bg-[#333] rounded-l-md" />
        <div className="absolute right-[-3px] top-28 w-[3px] h-12 bg-[#333] rounded-r-md" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-[#1a1a1a] rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#222] border border-[#333]" />
        </div>
        <div className="relative bg-[#f5f5f7] rounded-[2.2rem] overflow-hidden h-[520px]">
          <div className="relative z-10 pt-5 pb-2 px-6 flex items-center justify-between text-[10px] text-black/40 font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
            </div>
          </div>
          <div className="h-[calc(100%-40px)] overflow-hidden px-4">
            <motion.div style={{ y }} className="flex flex-col gap-4">
              {phoneCards.map((card, idx) => (
                <div key={`${card.title}-${idx}`} className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
                  {phoneCardImages[idx] && (
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <img src={phoneCardImages[idx]} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <h4 className="text-sm font-bold text-black mb-0.5">{card.title}</h4>
                  <p className="text-[11px] font-medium text-apple-gray mb-1.5">{card.subtitle}</p>
                  <p className="text-[11px] text-apple-gray/80 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-black/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const { content } = useContent()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="cases" ref={sectionRef} className="relative bg-white py-28 md:py-36 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-apple-gray">Case Studies</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
            {content.cases.title}
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:sticky lg:top-28"
        >
          <IPhoneMockup scrollProgress={scrollYProgress} phoneCards={content.cases.phoneCards} />
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-14">
          {content.cases.steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start gap-5">
                <span className="text-4xl md:text-5xl font-bold text-black/[0.06] leading-none tracking-tighter min-w-[3rem]">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-base text-apple-gray leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
              {idx < content.cases.steps.length - 1 && (
                <div className="ml-[3.5rem] mt-8 md:mt-10 w-px h-8 bg-black/[0.06]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
