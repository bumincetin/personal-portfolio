import Navbar from './components/Navbar'
import BackgroundMesh from './components/BackgroundMesh'
import Hero from './sections/Hero'
import Ticker from './sections/Ticker'
import Methodology from './sections/Methodology'
import Assets from './sections/Assets'
import About from './sections/About'
import Footer from './sections/Footer'

export default function Home() {
  return (
    <div className="font-mono text-text-primary overflow-x-hidden min-h-screen selection:bg-accent-cyan selection:text-void">
      <BackgroundMesh />
      
      <Navbar />
      
      <main>
        <Hero />
        <Ticker />
        <Methodology />
        <Assets />
        <About />
      </main>
      
      <Footer />
    </div>
  )
}
