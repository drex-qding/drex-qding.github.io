import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import defaultContent from '../content'

const ContentContext = createContext(null)

function deepMerge(target, source) {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [revision, setRevision] = useState(0)
  const [dirty, setDirty] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio-content'))
      if (saved && saved._version === defaultContent._version) {
        setContent(deepMerge(defaultContent, saved))
      } else {
        localStorage.removeItem('portfolio-content')
        setContent(defaultContent)
      }
    } catch {
      localStorage.removeItem('portfolio-content')
      setContent(defaultContent)
    }
  }, [])

  // Save to localStorage only after user has made edits
  useEffect(() => {
    if (!dirty) return
    localStorage.setItem('portfolio-content', JSON.stringify({ ...content, _version: defaultContent._version }))
  }, [content, dirty])

  const updateContent = useCallback((path, value) => {
    setDirty(true)
    setContent((prev) => {
      const result = structuredClone(prev)
      const keys = path.split('.')
      let current = result
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) current[keys[i]] = {}
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return result
    })
    setRevision(r => r + 1)
  }, [])

  const resetContent = useCallback(() => {
    setDirty(false)
    setContent(defaultContent)
    localStorage.removeItem('portfolio-content')
    setRevision(r => r + 1)
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, revision }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
