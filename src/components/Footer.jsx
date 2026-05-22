import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { content } = useContent()

  return (
    <footer className="bg-black text-white/30 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm">
          <span className="font-semibold text-white/50">{content.footer.name}</span>
          <span className="mx-2">·</span>
          <span>{content.footer.role}</span>
        </div>
        <div className="text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
