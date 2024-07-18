import React from 'react'
import img1 from "../files/light.svg"
import img2 from "../files/dark.svg"
import img3 from "../files/orange.svg"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const HeroSix = () => {

  useGSAP(()=>{
    gsap.to("#six-head", {
      opacity: 1,
      duration: 0.2,
      y: 0,
      scrollTrigger:{
        trigger:"#six-head",
        start:"5% bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"power3.in"
    })
    gsap.to("#six-text", {
      opacity: 1,
      duration: 0.2,
      delay: 0.2,
      y: 0,
      scrollTrigger:{
        trigger:"#six-head",
        start:"10% bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"power3.in"
    })

    gsap.to(".six-img", {
      opacity: 1,
      duration: 0.2,
      delay: 1,
      y: 0,
      stagger: 0.5,
      scrollTrigger:{
        trigger:"#six-head",
        start:"bottom bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"power3.in"
    })
  }, [])

  return (
    <>
        <div className='page-six'>
            <div id="six-head" className='six-text-main'><h1>Reading done right.</h1></div>
            <div id='six-text' className='six-text'><h3>Light mode, dark mode, and continue reading from where you left.</h3></div>
            <div id='six-img' className='six-imgs'>
                <img src={img1} className='six-img' />
                <img src={img2} className='six-img'/>
                <img src={img3} className='six-img'/>
            </div>
        </div>
    </>
  )
}

export default HeroSix