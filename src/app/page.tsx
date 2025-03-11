import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  )
}
