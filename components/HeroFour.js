import React from 'react'
import img from "../files/size_img.svg"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const HeroFour = () => {

  useGSAP(()=>{
    gsap.to("#four-one", {
      opacity: 1,
      delay: 0.5,
      duration: 2,
      y: 50,
      scrollTrigger:{
        trigger:"#four-one",
        start:"10% bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"expo.in",
    })

    gsap.to("#four-two", {
      opacity: 1,
      delay: 0.5,
      x: 0,
      scrollTrigger:{
        trigger:"#four-one",
        start:"20% bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"expo.in",
    })

    gsap.to("#four-three", {
      opacity: 1,
      delay: 0.5,
      y: 0,
      scrollTrigger:{
        trigger:"#four-two",
        start:"top bottom",
        end:"top 20%",
        scrub: true,
      },
      ease:"expo.in",
    })

  }, [])


  return (
    <>
    <div className='hero-four-page'>
        <div id="four-one" className='four-main-text'>
            <h1>Great reading experience,<br/> whatever device you are on.</h1>
        </div>
        <div className='four-main'>
            <div id='four-two' className='hero-four-text'>
            <h3>Web page will optimize itself according to the device you are reading on.</h3>
            </div>
            <div  className='four-img'>
              <img src={img} id="four-three" className='img-four' />
            </div>
        </div>
    </div>
    </>
  )
}

export default HeroFour