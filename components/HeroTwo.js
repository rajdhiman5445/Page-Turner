import React from 'react'
import HeroTwoImg from "../files/square_img.svg"
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const HeroTwo = () => {

  const scrollRef = useRef()

  useGSAP(()=>{
    const items = gsap.utils.toArray(scrollRef.current.children);
    items.forEach((item) => {
      gsap.to(item, {
        y: 20,
        opacity: 1,
        delay: 1,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "20% bottom",
          end: "top 20%",
          scrub:true,
        },
        ease: "sine.inOut"
      })
    })
  }, {scope: scrollRef})

  return (
    <>
    <div className='hero-two-page' ref={scrollRef}>
        <div id='two-text' className='hero-two-text'><h2>Take your <br/> library with you.<br/>
        No matter <br/> where you go.</h2></div>
        <div id='two-img' className='hero-two-img'>
            <img src={HeroTwoImg} className='hero-two-image' />
        </div>
    </div>
    </>
  )
}

export default HeroTwo