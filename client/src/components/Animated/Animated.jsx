import { useRef, useEffect } from 'react'
import './Animated.css'

const slideOnScroll = (elem, rescroll, reverse, autoplay) => {
  if(!elem) return

  const rect = elem.getBoundingClientRect()
  const className = reverse ? 'slideInPlayR' : 'slideInPlay'

  if(autoplay) {
    elem.classList.add(className)
    return
  }

  if(rect.top >= window.scrollY && rect.top <= window.scrollY + window.innerHeight - 50)
    elem.classList.add(className)
  else if(rescroll)
    elem.classList.remove(className)
}

export default function Animated({ children, rescroll, reverse, autoplay }) {
  const ref = useRef()
  
  useEffect(() => {
    const scrollFn = slideOnScroll.bind(null, ref.current, rescroll, reverse, autoplay)
    scrollFn()
    
    window.addEventListener('scroll', scrollFn)
    return () => window.removeEventListener('scroll', scrollFn)
  }, [ref, rescroll, reverse, autoplay])
  
  return (
    <div ref={ref} className="slideIn">{children}</div>
  )
}