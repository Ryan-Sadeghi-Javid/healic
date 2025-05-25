const PORT = process.env.PORT ?? 3001;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
})

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
    socket.on('queue', (issues, desc) => {
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

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
