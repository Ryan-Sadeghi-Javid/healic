import './Chat.css'
import { useEffect, useRef } from 'react'
import ChatButton from './ChatButton/ChatButton'
import Title from '../Title/Title'
import Popup from '../Popup/Popup'
import searching from '../../assets/loading.gif'
import { useNavigate } from 'react-router-dom'
import issues from '../../assets/issues.json'

export default function Chat({ socket, chatData }) {
  const states = useRef([])
  const descRef = useRef()
  const popupRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate()

  const getStates = () => (
    states.current.map((button) => button.getState())
  )

  const startChatting = () => {
    const states = getStates()
    const desc = descRef.current.value.trim()

    if(!states.some(state => state)) {
      errorRef.current.show(true)
      return;
    }

    popupRef.current.show(true)
    socket.emit('queue', states, desc)
  };

  useEffect(() => {
    if(chatData.current) {
      navigate('/live-chat')
      return
    }

    socket.on('chat join', (otherStates, otherDesc) => {
      chatData.current = {
        states: getStates().map((v, i) => v && otherStates[i]),
        desc: otherDesc,
      }
      navigate('/live-chat')
    })

    return () => {
      socket.off('chat join')
    }
  }, [chatData, navigate, socket])

  const unqueue = () => {
    popupRef.current.show(false)
    socket.emit('unqueue')
  };

  return (
    <div className="chat">
      <Title title="chat">A helpful support group <b>empowers</b> its members to take good care of themselves by providing good-quality and reliable information. The knowledge that's shared can help members better manage their problems, learn about other social / mental / physical issues, and seek treatment or other support systems.<br /><br />Breaking the <b>barriers</b> starts with you making the personal choice to try to improve yourself or help others around you.<br /><br /><b>HOW TO (EMPOWER YOURSELF / OTHERS):</b>
      <ol>
        <li>Click one or more buttons below to be matched with someone similar to you.</li>
        <li>Provide a short description (OPTIONAL) about yourself / what you might be going through to facilitate conversations.</li>
        <li>Click the green button to start chatting!</li>
        <li>Remember to be nice and supportive, you never know what someone might be going through.</li>
      </ol>
      </Title>

      <div className="chat-buttons">
        {
          issues.map((content, i) => {
            return <ChatButton key={i} ref={el => states.current[i] = el}>{content}</ChatButton>
          })
        }
      </div>
      <div className="chat-submit">
        <textarea ref={descRef} placeholder="Description (optional)"></textarea>
        <br />
        <button type="button" className="chat-start waves-effect waves-light btn-large" onClick={startChatting}>Start Chatting</button>
      </div>
      <Popup ref={popupRef} width="300px" height="300px">
        <div>
          <img src={searching} alt="" width="200" height="200" />
        </div>
        <div>
          <button className="chat-close waves-effect waves-light btn" type="button" onClick={unqueue}>Cancel</button>
        </div>
      </Popup>
      <Popup ref={errorRef} outsideClick>
        <div style={{ fontSize: '24px' }}>Please select at least one issue.</div>
        <div>
          <button className="chat-close waves-effect waves-light btn" type="button" onClick={() => errorRef.current.show(false)}>OK</button>
        </div>
      </Popup>
    </div>
  )
}