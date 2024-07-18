import React from 'react'
import "../styles/hero.css"
import MainImg from "../files/main_img.svg"
import Buttons from './Buttons'
import HeroTwo from './HeroTwo'
import HeroThree from './HeroThree'
import HeroFour from './HeroFour'
import HeroFive from './HeroFive'
import { Link } from 'react-router-dom'
import BookPageTitleBar from './BookPageTitleBar'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const HeroPage = () => {


  useGSAP(()=>{
    gsap.to("#head-one", {
      y: -10,
      delay: 1,
      duration: 2,
      opacity: 1,
      y: -20,
      ease: "back.in"
    })

    gsap.to("#one-img",{
      opacity:1,
      delay:0.1,
      duration: 2,
      x: 0,
  
    })

    gsap.to("#cta",{
      opacity:1,
      delay:2.5,
      duration: 1,
      y: -20,
    })
  }, [])

  return (
    <>
    <BookPageTitleBar/>
    <div className='hero-page'>
      <h1 id='head-one' className='main-head'>Looking for your next <br/>great read?</h1>
      <div className='hero-one'>
        <div id="cta" className='hero-one-text'><h3>Make yourself <br/>at home!</h3>
        <Link to="/books"><div className='btn-explore'><Buttons text={'Explore Books'}/></div></Link>
        </div>
        <div  className='main-img-div'><img src={MainImg} id="one-img" className='main-img' /></div>
        
      </div>
      
      <div>
        <HeroTwo/>
      </div>
      <div>
        <HeroThree/>
        </div>
      <div>
        <HeroFour/>
      </div>
      <div>
        <HeroFive/>
        </div>
    </div>
    </>
  )
}

export default HeroPage