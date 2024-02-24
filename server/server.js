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

// code : child_socket id
const codes = {

}

// child : parent
const child_to_parent_connections = {

}

// parent: child
const parent_to_child_connections = {

}
const random_code = () => {
    return "123456"
    while (true) {
        const num = (Math.floor(100000 + Math.random() * 900000)).toString();
        if (!(num in codes)) {
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

    // CHILD SAYS IT WANTS TO BE MONITORED , data = monitor_details in JSON string
    socket.on("child_monitor_request", () => {
        console.log("child:", socket.id, "wants to be monitored")
        const code = random_code();
        codes[code] = socket.id
        socket.emit('child_code', code);
    })

    // PARENT KEYS IN CODE
    socket.on("parent_accept_request", (code) => {
        console.log("parent enters in code", code)

        if (!(code in codes)) {
            console.error("GOT A CODE THAT HAD NO CLIENT!");
            return;
        }
        const child_id = codes[code];

        // set up child to parent connection preemptively
        child_to_parent_connections[child_id] = socket.id;

        // delete code
        delete codes[code];

        // ask client to confirm handshake with parent
        io.to(child_id).emit('child_complete_handshake', socket.id);
    })

    // child confirms handshake
    socket.on("child_confirm_handshake", (parent_id) => {
        console.log("child confirms handshake, all good to go!")

        // make sure connections are good
        parent_to_child_connections[parent_id] = socket.id;
        if (parent_id !== child_to_parent_connections[socket.id]) {
            console.error("messed up alr kenna", parent_id, child_to_parent_connections[socket.id])
        }

        // tell parent that connection is set up
        io.to(parent_id).emit("parent_begin_monitoring", socket.id)

    })


    // child visit blacklisted site
    socket.on("child_is_bad_boy", site => {
        console.log("child was v bad and visited:", site)
        const parent_id = child_to_parent_connections[socket.id]
        console.log("child parent is:", parent_id)

        // complain to parent
        io.to(parent_id).emit("parent_kenna_complain", site)
    })

    // parent send alert to child
    socket.on("parent_call_police", scolding => {
        console.log("parent want call police alr:", scolding)

        const child_id = parent_to_child_connections[socket.id];
        io.to(child_id).emit("child_kenna_scolded", scolding);
    })



});




server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});