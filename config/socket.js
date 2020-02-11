const server = require('./server')
const socket = require('socket.io')

const io = socket(server)

const webSocket = io.on('connection', (socket) => {
    const id = socket.handshake.headers.referer.split('/')[4]
    const agenda = socket.handshake.headers.referer.split('/')[3]
    if(id && id.length === 24 && agenda == 'agendas') {
        const agendaSpace = io.of(`/agendas/${id}`) 
        agendaSpace.on('connection', socket => {
            agendaSpace.emit('message', 'hi')
        })
    } 
})

module.exports = { io, webSocket }