import React from 'react'
import img1 from "../files/screen_1.svg"
import img2 from "../files/screen_2.svg"
import img3 from "../files/screen_3.svg"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);


const HeroThree = () => {
   
    useGSAP(()=>{
        gsap.to("#text-three", {
            opacity: 1,
            duration: 1,
            y: -20,
            delay: 3,
            scrollTrigger:{
                trigger: "#text-three",
                start: "20% bottom",
                end: "top 20%",
                scrub: true,
            },
            ease: "back.in",
        })

        gsap.to(".img-phone", {
            opacity: 1,
            y: -20,
            delay: 1,
            duration: 5,
            stagger: 1,
            scrollTrigger:{
                trigger: ".img-phone",
                start: "1% bottom",
                end: "top 20%",
                scrub: true,
            },
            ease: "circ.in",
        })
    }, [])

  return (
    <>
    <div className='hero-three-page' >
        <div id="text-three" className='hero-three-text' >
            <div  className='three-text-one'><h2>Pick you next<br/>
                read from a large <br/>
                collections <br/>
                of books.<br/>
                </h2>
            </div>
            <div  className='three-text-two'>
                <h3>Download books with a <br/> single click, <br/>
                or read them online.</h3>
            </div>
        </div>
        <div id="three-img" className='hero-three-img'>
            <img src={img1} width={"30%"} className='img-phone' />
            <img src={img2} width={"30%"} className='img-phone'/>
            <img src={img3} width={"30%"} className='img-phone'/>
        </div>

    </div>
    </>
  )
}

export default HeroThree