"use client"

import { useEffect, useRef } from "react";

export default function Home() {
  const questionRef = useRef<HTMLDivElement>(null)
  const billgatesRef = useRef<HTMLDivElement>(null)
  const microsoftRef = useRef<HTMLDivElement>(null)
  const countdownWrapperRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    const animationTargetRefs = [questionRef, billgatesRef, microsoftRef]
    const countdown = countdownRef.current?.querySelectorAll('div')
    const countdownLength = countdown!.length

    const unitHeight = countdownWrapperRef.current!.offsetHeight / (countdownLength + 2)

    const handleScroll = () => {
      animationTargetRefs.forEach(fadeinTarget => {
        if (scrollY + innerHeight + 50 < fadeinTarget.current!.offsetTop) {
          fadeinTarget.current?.classList.remove("animate-fadein")
        } else {
          fadeinTarget.current?.classList.add("animate-fadein")
        }
      })

      countdown?.values().forEach((div, index) => {
        
        const triggerY = countdownWrapperRef.current!.offsetTop + ((countdownLength - index - 1) * unitHeight)
        if (scrollY > triggerY) {
          const degree = Math.min(90, ((scrollY - triggerY) / unitHeight) * 90)
          div.style.transform = `rotate(${degree}deg)`

          if(degree >= 90) {
            div.style.visibility = 'hidden'
          } else {
            div.style.visibility = 'visible'
          }
        } else {
          div.style.transform = `rotate(0deg)`
          div.style.visibility = 'visible'
        }
      })
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className="w-full h-[5500px] text-8xl font-bold text-center">
      <div className="flex bg-red-400 h-[1000px] justify-center items-center">
        <div className="text-9xl">
          Hello!
        </div>
      </div>
      <div className="flex flex-col h-[1600px] bg-blue-400 justify-around items-center">
        <div className="flex h-[100px] items-center" ref={questionRef}>
          Here is a question!
        </div>
        <div className="flex h-[100px] items-center" ref={billgatesRef}>
          How Bill Gates sings?
        </div>
      </div>
      <div className="h-[3000px] bg-yellow-400" ref={countdownWrapperRef}>
        <div className=" sticky top-0 w-full h-screen">
          <div className="absolute w-full h-full bg-purple-500 flex items-center justify-center text-center">The answer is...</div>
          <div className="relative w-full h-full flex items-center justify-center" ref={countdownRef}>
            <div
              style={{
                transformOrigin: "bottom right"
              }}
              className="absolute w-full h-full bg-green-500 flex items-center justify-center text-center">
              1!
            </div>
            <div style={{
              transformOrigin: "bottom right"
            }}
              className="absolute w-full h-full bg-blue-500 flex items-center justify-center text-center">
              2!
            </div>
            <div style={{
              transformOrigin: "bottom right"
            }}
              className="absolute w-full h-full bg-red-500 flex items-center justify-center text-center">
              3!
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-gray-400 h-[800px] justify-around items-center">
        <div className="flex h-[100px] items-center" ref={microsoftRef}>
          Microsoft!
        </div>
      </div>
    </div>
  );
}
