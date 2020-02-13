const server = require('./server')
const socket = require('socket.io')

const io = socket(server)

// this was modified to create a single namespace when a client gets notes via the student route

module.exports = io