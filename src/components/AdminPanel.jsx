import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext'

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-5 text-sm font-medium text-white/70 hover:text-white transition-colors"
      >
        {title}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          className="w-3.5 h-3.5 opacity-50"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, value, onChange, multiline = false }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-wide text-white/40 uppercase mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all resize-none"
          rows={3}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
        />
      )}
    </div>
  )
}

function TagEditor({ tags, onChange }) {
  const [input, setInput] = useState('')
  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onChange([...tags, input.trim()])
      setInput('')
    }
  }
  const removeTag = (idx) => onChange(tags.filter((_, i) => i !== idx))
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-wide text-white/40 uppercase mb-1.5">标签</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/60">
            {tag}
            <button onClick={() => removeTag(i)} className="hover:text-white">&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          placeholder="添加标签..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 placeholder-white/20 focus:outline-none focus:border-white/30 transition-all"
        />
        <button onClick={addTag} className="text-xs px-3 py-1.5 bg-white/10 rounded-lg text-white/50 hover:bg-white/20 transition-all">
          +
        </button>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const { content, updateContent, resetContent } = useContent()
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setVisible(window.location.search.includes('admin=true'))
  }, [])

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (window.confirm('确定恢复所有内容为默认值？')) {
      resetContent()
      showSaved()
    }
  }

  return (
    <>
      {/* Trigger button — only visible with ?admin=true */}
      {visible && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[90] w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/20 transition-all shadow-lg"
          title="内容管理"
        >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-[#1d1d1f] shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-base font-semibold text-white">内容管理</h2>
                    <p className="text-[11px] text-white/30 mt-0.5">修改后自动保存到本地</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto">
                  {/* Hero */}
                  <Section title="首页 Hero" defaultOpen>
                    <Field
                      label="主标题"
                      value={content.hero.title}
                      onChange={(v) => updateContent('hero.title', v)}
                    />
                    <Field
                      label="副标题"
                      value={content.hero.subtitle}
                      onChange={(v) => updateContent('hero.subtitle', v)}
                    />
                    {content.hero.categories.map((cat, i) => (
                      <div key={i} className="pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                        <div className="text-[10px] font-semibold text-white/20 uppercase mb-2">卡片 {i + 1}</div>
                        <Field label="标题" value={cat.title} onChange={(v) => updateContent(`hero.categories.${i}.title`, v)} />
                        <Field label="描述" value={cat.desc} onChange={(v) => updateContent(`hero.categories.${i}.desc`, v)} />
                      </div>
                    ))}
                  </Section>

                  {/* About */}
                  <Section title="关于我">
                    <Field label="姓名" value={content.about.name} onChange={(v) => updateContent('about.name', v)} />
                    <Field label="个人简介" value={content.about.bio} onChange={(v) => updateContent('about.bio', v)} multiline />
                    {content.about.stats.map((stat, i) => (
                      <div key={i} className="pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                        <div className="text-[10px] font-semibold text-white/20 uppercase mb-2">数据 {i + 1}（{stat.value}{stat.suffix}）</div>
                        <Field label="标签" value={stat.label} onChange={(v) => updateContent(`about.stats.${i}.label`, v)} />
                        <Field label="详情" value={stat.detail} onChange={(v) => updateContent(`about.stats.${i}.detail`, v)} />
                      </div>
                    ))}
                  </Section>

                  {/* Video */}
                  <Section title="视频作品">
                    <Field label="标题" value={content.video.title} onChange={(v) => updateContent('video.title', v)} />
                    {content.video.projects.map((proj, i) => (
                      <div key={i} className="pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                        <div className="text-[10px] font-semibold text-white/20 uppercase mb-2">项目 {i + 1}</div>
                        <Field label="标题" value={proj.title} onChange={(v) => updateContent(`video.projects.${i}.title`, v)} />
                        <Field label="副标题" value={proj.subtitle} onChange={(v) => updateContent(`video.projects.${i}.subtitle`, v)} />
                        <Field label="描述" value={proj.desc} onChange={(v) => updateContent(`video.projects.${i}.desc`, v)} multiline />
                        <TagEditor
                          tags={proj.tags}
                          onChange={(v) => updateContent(`video.projects.${i}.tags`, v)}
                        />
                      </div>
                    ))}
                  </Section>

                  {/* Cases */}
                  <Section title="公众号案例">
                    <Field label="标题" value={content.cases.title} onChange={(v) => updateContent('cases.title', v)} />
                    {content.cases.steps.map((step, i) => (
                      <div key={i} className="pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                        <div className="text-[10px] font-semibold text-white/20 uppercase mb-2">{step.num} · {step.title}</div>
                        <Field label="标题" value={step.title} onChange={(v) => updateContent(`cases.steps.${i}.title`, v)} />
                        <Field label="描述" value={step.desc} onChange={(v) => updateContent(`cases.steps.${i}.desc`, v)} multiline />
                      </div>
                    ))}
                    {content.cases.phoneCards.map((card, i) => (
                      <div key={`phone-${i}`} className="pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                        <div className="text-[10px] font-semibold text-white/20 uppercase mb-2">手机卡片 {i + 1}</div>
                        <Field label="标题" value={card.title} onChange={(v) => updateContent(`cases.phoneCards.${i}.title`, v)} />
                        <Field label="副标题" value={card.subtitle} onChange={(v) => updateContent(`cases.phoneCards.${i}.subtitle`, v)} />
                        <Field label="描述" value={card.desc} onChange={(v) => updateContent(`cases.phoneCards.${i}.desc`, v)} />
                      </div>
                    ))}
                  </Section>

                  {/* Poster */}
                  <Section title="海报设计">
                    <Field label="标题" value={content.poster.title} onChange={(v) => updateContent('poster.title', v)} />
                  </Section>

                  {/* Photography */}
                  <Section title="摄影">
                    <Field label="标题" value={content.photography.title} onChange={(v) => updateContent('photography.title', v)} />
                  </Section>

                  {/* Footer */}
                  <Section title="页脚">
                    <Field label="姓名" value={content.footer.name} onChange={(v) => updateContent('footer.name', v)} />
                    <Field label="角色" value={content.footer.role} onChange={(v) => updateContent('footer.role', v)} />
                  </Section>
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.06] px-5 py-3 flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    恢复默认
                  </button>
                  <div className="flex-1" />
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-400/70"
                    >
                      ✓ 已保存
                    </motion.span>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 rounded-lg transition-all"
                  >
                    完成
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
