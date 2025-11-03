import Navigation from '@/components/Navigation'
import Hero from '@/hero/components/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Family from '@/components/sections/Family'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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

