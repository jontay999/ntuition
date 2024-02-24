require('dotenv').config({ path: '.env' })
const cors = require('cors')


const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

// code : client
const handshakes = {

}

// child : parent
const connections = {

}
const random_code = () => {
    return "123456"
    while (true) {
        const num = (Math.floor(100000 + Math.random() * 900000)).toString();
        if (!(num in handshakes)) {
            return num;
        }
    }
}


app.get('/child', (req, res) => {
    res.sendFile(join(__dirname, 'child.html'));
});
app.get('/parent', (req, res) => {
    res.sendFile(join(__dirname, 'parent.html'));
});



// WHAT A PARENT DOES

// 
io.on('connection', (socket) => {
    console.log('a user connected');

    // CHILD SAYS IT WANTS TO BE MONITORED
    socket.on("monitor_request", (data) => {
        console.log("child monitor request-> ", data)
        const code = random_code();
        console.log("Generated code:", code)
        socket.emit('code', code);
    })

    // child sends
    socket.on("monitor_details", (data) => {
        const json_data = JSON.parse(data);
        console.log("got json_data")
    })
});




server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});