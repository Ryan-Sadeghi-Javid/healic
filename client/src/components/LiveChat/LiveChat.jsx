import './LiveChat.css'
import { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble/ChatBubble'
import Title from '../Title/Title'
import { useNavigate } from 'react-router-dom'
import issues from '../../assets/issues.json'
import Popup from '../Popup/Popup'

export default function Chat({ socket, chatData }) {
  const inputRef = useRef()
  const popupRef = useRef()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(chatData.current?.cache ?? [])
  const [status, setStatus] = useState('')

  useEffect(() => {
    if(!chatData.current) {
      return
    }
    chatData.current.cache = messages

    socket.on('chat msg', (content) => {
      setMessages([...messages, { content, isAuthor: false }])
      window.scrollTo(window.scrollX, document.body.scrollHeight)
    })

    socket.on('chat leave', () => {
      chatData.current = null
      setStatus('Anonymous has disconnected.')
      window.scrollTo(window.scrollX, 0)
    })

    return () => {
      socket.off('chat msg')
      socket.off('chat leave')
    }
  }, [chatData, socket, messages])

  const sendMessage = (e) => {
    e.preventDefault()
    const value = inputRef.current.value.trim()
    if(!value) return
    socket.emit('chat msg', value)
    inputRef.current.value = ''
    setMessages([...messages, { content: value, isAuthor: true }])
    window.scrollTo(window.scrollX, document.body.scrollHeight)
  }

  const disconnect = () => {
    chatData.current = null
    socket.emit('leave')
    navigate('/chat')
  }

  return (
    <div className="live-chat">
      <Title title="LIVE CHAT" />
      <h2 className="live-chat-status">{status}</h2>
      {
        chatData.current &&
        <div className="live-chat-info">
          <b>You have the following things in common:</b>
          <p>{chatData.current.states.map((v, i) => v && issues[i]).filter(v => v).join(', ')}</p>
          {
            chatData.current.desc && 
            <>
              <b>Description:</b>
              <p>{chatData.current.desc}</p>
            </>
          }
          <hr />
        </div>
      }
      <div className="chat-bubbles">
        {
          messages.map((message, i) => {
            return <ChatBubble key={i} isAuthor={message.isAuthor}>{message.content}</ChatBubble>
          })
        }
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="chat-close waves-effect waves-light btn" type="button" onClick={() => popupRef.current.show(true)}>Disconnect</button>
      </div>
      <div className="live-chat-input">
        <div className='container'>
          <form onSubmit={sendMessage}>
            <div className="input-group">
              <label className="input-filled">
                <input ref={inputRef} className="live-chat-input" />
                <span className="input-label">Send a message</span>
              </label>
            </div>
          </form>
        </div>
      </div>
      <Popup ref={popupRef} outsideClick>
      Are you sure you want to disconnect?
      <div>
        <button className="chat-close waves-effect waves-light btn" type="button" onClick={() => popupRef.current.show(false)} style={{ marginRight: 10, backgroundColor: '#EE6E73', width: 108 }}>CANCEL</button>
        <button className="chat-close waves-effect waves-light btn" type="button" onClick={disconnect} style={{ width: 108 }}>YES</button>
      </div>
      </Popup>
    </div>
  )
}