import './ChatBubble.css'
import Animated from '../../Animated/Animated'

export default function ChatBubble({ isAuthor, children }) {
  const suffix = isAuthor ? 'chat-bubble-send' : 'chat-bubble-receive'
  const textAlign = isAuthor ? 'left' : 'right'

  return (
    <Animated reverse={isAuthor} autoplay>
      <div style={{ textAlign }}>
        <div className={`chat-bubble ${suffix}`}>{children}</div>
      </div>
    </Animated>
  )
}