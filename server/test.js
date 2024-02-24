const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log("received message:", message)
        const receivedMessage = message.toString('utf-8');
        console.log("new msg:", receivedMessage)

        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            // if (client !== ws && client.readyState === WebSocket.OPEN) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(receivedMessage);
            }
        });
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});