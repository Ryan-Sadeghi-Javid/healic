import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import NavBar from '../NavBar/NavBar'
import Chat from '../Chat/Chat'
import LiveChat from '../LiveChat/LiveChat'
import Footer from '../Footer/Footer'
import BreakingBarriers from '../BreakingBarriers/BreakingBarriers'
import './App.css'
import io from 'socket.io-client'

const socket = io(process.env.SERVER_URL ?? 'http://localhost:3001')

export default function App() {
  const chatData = useRef(null)

  return (
    <>
      <div className="all-but-footer">
        <NavBar />
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat socket={socket} chatData={chatData} />} />
          <Route path="/learn" element={<BreakingBarriers />} />
          <Route path="/live-chat" element={<LiveChat socket={socket} chatData={chatData} />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
