import { useContent, ContentProvider } from './context/ContentContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import VideoPortfolio from './components/VideoPortfolio'
import PosterDesign from './components/PosterDesign'
import CaseStudies from './components/CaseStudies'
import Photography from './components/Photography'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'

function PageContent() {
  const { revision } = useContent()
  return (
    <main key={revision} className="relative">
      <Navbar />
      <Hero />
      <AboutMe />
      <VideoPortfolio />
      <PosterDesign />
      <CaseStudies />
      <Photography />
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <PageContent />
      <AdminPanel />
    </ContentProvider>
  )
}
