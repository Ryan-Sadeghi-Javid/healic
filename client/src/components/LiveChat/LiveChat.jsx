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
  const [aiSuggestion, setAiSuggestion] = useState(null)
  const [showSuggestion, setShowSuggestion] = useState(false)


  

  useEffect(() => {
    if(!chatData.current) {
      return
    }
    chatData.current.cache = messages

    socket.on('chat msg', (content) => {
        const updatedMessages = [...messages, { content, isAuthor: false }]
        setMessages(updatedMessages)
        window.scrollTo(window.scrollX, document.body.scrollHeight)

        fetchAiSuggestion(content)
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


 const fetchAiSuggestion = async (userMessage) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/ai/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    })

    const data = await res.json()
    setAiSuggestion(data.suggestion)
    setShowSuggestion(false) // wait until user clicks
  } catch (err) {
    console.error('AI fetch failed', err)
  }
}


  const sendMessage = (e) => {
  e.preventDefault()
  const value = inputRef.current.value.trim()
  if (!value) return

  socket.emit('chat msg', value)
  inputRef.current.value = ''
  setMessages([...messages, { content: value, isAuthor: true }])
  setAiSuggestion(null)
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
{aiSuggestion && (
  <div style={{ textAlign: 'center', marginTop: 10 }}>
    {!showSuggestion ? (
      <button
        onClick={() => setShowSuggestion(true)}
        className="waves-effect waves-light btn-small"
        style={{ backgroundColor: '#e0e0e0', color: '#333' }}
      >
        💡 Need help replying?
      </button>
    ) : (
      <div style={{
        background: '#f9f9f9',
        borderLeft: '4px solid #9ac5f4',
        padding: '10px 16px',
        marginTop: '8px',
        marginBottom: '10px',
        borderRadius: '6px',
        maxWidth: '80%',
        fontSize: '0.95rem',
        color: '#444',
        fontStyle: 'italic',
        display: 'inline-block'
      }}>
        <strong>Suggestion:</strong> {aiSuggestion}
      </div>
    )}
  </div>
)}
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