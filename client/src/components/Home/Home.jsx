import './Home.css'
import Animated from '../Animated/Animated'

import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useCallback } from 'react'
import particleOptions from '../../assets/particles.json'
import { Link } from 'react-router-dom'

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    
  }, []);

  return (
    <div className="home">
      <Animated>
        <div style={{ marginTop: 100 }}>
          <h1>A new way to connect</h1>
          <p>When you're dealing with a social / physical / mental issue, having others understand can be a challenge.<br /><br />Finding people who understand what you're going through is easier than ever.</p>
          <Link to="/chat" className="breaking-barriers-button waves-effect waves-light btn-large" style={{ width: 'fit-content', margin: '5px auto' }}>Chat With Someone Now</Link>
        </div>
      </Animated>
      <Animated reverse>
        <div style={{ marginTop: 150, marginBottom: 100 }}>
          <h2>How to break the barriers</h2>
          <p>Society views illnesses, disabilities and other social / physical / mental issues in a very negative way.<br /><br />You can help yourself and others by learning more and helping stop the spread of misinformation.</p>
          <Link to="/learn" className="indigo darken-3 breaking-barriers-button waves-effect waves-light btn-large" style={{ width: 'fit-content', margin: '5px auto' }}>Breaking Barriers</Link>
        </div>
      </Animated>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particleOptions} />
    </div>
  )
}