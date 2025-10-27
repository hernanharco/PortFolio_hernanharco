import './App.css'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Family from '@/components/sections/Family'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Family />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

