const express = require('express')
const {createServer} = require('node:http')
const {Server} = require('socket.io')

const app = express()
const port = 3000
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected' + socket.id)
  socket.on('message', (msg) => {
    console.log('message: ' + msg)// client message
    io.emit('message', msg)// server par message to all clients
  })

  socket.on('disconnect', () => {
    console.log('user disconnected' + socket.id)
  })
})



server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})