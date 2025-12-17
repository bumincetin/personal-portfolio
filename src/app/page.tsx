import Hero from './sections/Hero'
import Ticker from './sections/Ticker'
import Methodology from './sections/Methodology'
import Assets from './sections/Assets'
import About from './sections/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Methodology />
      <Assets />
      <About />
    </main>
  )
}
