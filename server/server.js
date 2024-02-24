require('dotenv').config({ path: '.env' })
const express = require('express');
const cors = require('cors')

const app = express();
const port = 8000;
app.use(cors());

app.get('/', async (req, res) => {
    console.log("Hit the / route to show that server is alive")
    res.type('text/plain').send("Server is running all good");
});



// handle request
app.post('/request', async (req, res) => {
    if (!(req.body.ip && req.body.port)) {
        res.status(400).send({
            message: "IP and port has to be defined!"
        })
    }
    res.status(200).send({
        message: 'Request made.',
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
