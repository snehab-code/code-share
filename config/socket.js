const server = require('./server')
const socket = require('socket.io')

const io = socket(server)

io.on('connection', socket => {
    const id = socket.handshake.headers.referer.split('/')[4]
    const agenda = socket.handshake.headers.referer.split('/')[3]
    if(id && id.length === 24 && agenda == 'agendas') {
        socket.join(`${id}`) 
        socket.emit('message', 'hello')
    }
})

module.exports = io