import React from 'react'
import Hero from '../../sections/Hero/Hero'
import About from '../../sections/About/About'
import TechStack from '../../sections/TechStack/TechStack'
import Portfolio from '../../sections/Portfolio/Portfolio'
import AiStudio from '../../sections/AIStudio/AIStudio' 
import FreeTools from '../FreeTools/FreeTools'
import Contact from '../../sections/Contact/Contact'
const Home = () => {
  return (
    <div>
      <Hero />
        <About />
        <TechStack />
        <Portfolio />
        <AiStudio />
        <FreeTools />
        <Contact />
    </div>
  )
}

export default Home
