const express = require('express');
const server = express();

const userRouter = require('./api/userRouter')

server.use(express.json())
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        api: 'running'
    })
})

module.exports = server;