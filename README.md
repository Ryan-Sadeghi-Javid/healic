# 🧠 Healic

**Healic** is a full-stack mental health web application that enables anonymous peer-to-peer conversations, resource sharing, and charitable giving. Built with accessibility and emotional well-being in mind, Healic offers real-time chat powered by `Socket.io` and context-aware message suggestions using the `OpenAI API`, helping users navigate difficult conversations and feel supported.

---

## 🌟 Features

- 🔒 **Anonymous Chat** — Real-time, peer-to-peer messaging without user accounts
- 💡 **AI Message Suggestions** — Integrates OpenAI to provide intelligent, context-aware prompts based on conversation history
- 📚 **Mental Health Resources** — Curated articles and support links for a variety of mental health topics
- 💖 **Charity Support Integration** — Users can access links to donate to mental health organizations
- 🎨 **Accessible UI** — Clean, responsive design using MaterializeCSS
- ⚡ **Real-Time Backend** — WebSocket communication with `Socket.io` and RESTful API with `Express.js`

---

## 🛠️ Tech Stack

**Frontend**  
- `React.js`  
- `MaterializeCSS`  

**Backend**  
- `Node.js`  
- `Express.js`  
- `Socket.io`  
- `OpenAI API`

---

## 🤖 OpenAI Integration

Healic uses OpenAI’s `gpt-4,1` model to suggest helpful, empathetic responses. The system analyzes the user’s most recent messages and returns contextually relevant suggestions when users feel stuck in a conversation.

Example prompt logic:

```json
{
  "messages": [
    { "role": "user", "content": "I'm feeling overwhelmed lately." },
    { "role": "assistant", "content": "That sounds difficult. Would you like to talk more about it?" }
  ]
}
