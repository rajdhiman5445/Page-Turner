import React, { useEffect } from 'react'
import img from "../files/last_img.svg"
import Buttons from "./Buttons"
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const HeroFive = () => {



  return (

    <>
    <div className='hero-five-page'>
        
        <div className='hero-five'>
          
          <div id="five-two" className='five-text'>
          <div id="five-one" className='five-main-text'>
            <h1>Consume ideas from<br/> top 1%.</h1>
        </div>
              <h3>Start Exploring Now</h3>
              <div className='btn-explore'><Link to="/books"><Buttons text={"Explore Books"} /></Link></div>
          </div>
          <div className='five-img'>
            <img src={img} width={"100%"}/>
          </div>
        </div>
        
        
    </div>
    </>
  )
}

export default HeroFive;