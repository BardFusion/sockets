const express = require('express')
const app = express()

//Listen on port 3003
var port = normalizePort(process.env.PORT || '3000');
server = app.set('port', port);

//socket.io instantiation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user online')
	
	//default username
	socket.username = "Anonymous"
	
	//listen to changeUsername
	socket.on('changeUsername', (data) => {
		socket.username = data.username
	})
	//listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
	})
	//listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
	})
})