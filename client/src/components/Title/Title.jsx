import './Title.css'
import Animated from '../Animated/Animated'

export default function Title({ title, children }) {
  return(
    <Animated>
      <div className='section-title'>
        <h1>{title}</h1>
        <p>
          {children}
        </p>
      </div>
    </Animated>
  )
}
