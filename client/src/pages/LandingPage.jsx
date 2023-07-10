import React from 'react'
import HeroSection from '../components/LandingPage/HeroSection'
import About from '../components/LandingPage/About'
import Features from '../components/LandingPage/Features'
import Quizes from '../components/LandingPage/Quizes'
import Contact from '../components/LandingPage/Contact'
import Footer from '../components/LandingPage/Footer'

const LandingPage = () => {
  return (
   <>
   <HeroSection/>
   <About/>
   <Features/>
   <Quizes/>
   <Contact/>
   <Footer/>
   </>
  )
}

export default LandingPage

