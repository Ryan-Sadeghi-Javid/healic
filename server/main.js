require('dotenv').config();

const PORT = process.env.PORT ?? 3001;


const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Healic backend is up!');
});

app.get('/test', (req, res) => {
  res.send('🧪 test route works');
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/ai/suggest', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You're a supportive mental health assistant helping people talk through their problems in a kind and helpful way."
        },
        {
          role: "user",
          content: `Someone said: "${userMessage}". What is a helpful and empathetic response they could give back?`
        }
      ]
    });

    res.json({ suggestion: response.choices[0].message.content });
  } catch (err) {
  console.error("❌ OpenAI error:", err.response?.data || err.message || err);
  res.status(500).json({ error: "AI suggestion failed" });
}
});


const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});


function enqueue(client) {
    const sockets = io.sockets.adapter.rooms.get('queue');
    if(!sockets)
        return client.join('queue');

    let bestMatch = null;
    let bestScore = 0;
    for(const socketId of sockets) {
        const socket = io.sockets.sockets.get(socketId);
        const score = client.data.issues.filter((v, i) => v && socket.data.issues[i]).length;
        if(score >= 1 && score > bestScore) {
            bestScore = score;
            bestMatch = socket;
        }
    }

    if(bestMatch === null)
        return client.join('queue');

    bestMatch.leave('queue');

    client.data.chattingWith = bestMatch;
    bestMatch.data.chattingWith = client;
    client.emit('chat join', bestMatch.data.issues, bestMatch.data.desc);
    bestMatch.emit('chat join', client.data.issues, client.data.desc);
}

io.on('connection', (socket) => {
    console.log('🟢 Connected:', socket.id);
    socket.on('queue', (issues, desc) => {
        console.log('📥 Queue:', issues, desc);
        socket.data.issues = issues;
        socket.data.desc = desc;
        enqueue(socket);
    });

    socket.on('unqueue', () => {
        socket.leave('queue');
    });

    socket.on('chat msg', (msg) => {
        if(!socket.data.chattingWith)
            return;

        socket.data.chattingWith.emit('chat msg', msg);
    });

    const onLeave = () => {
        const other = socket.data.chattingWith;
        if(other) {
            delete other.data.chattingWith;
            other.emit('chat leave');
        }
    };

    socket.on('disconnect', onLeave);
    socket.on('leave', onLeave);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});