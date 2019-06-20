var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);

app.use(express.static('./app/public'));
app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
connections.push(socket);
console.log('Connected: %s sockets connected', connections.length);

socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);    
});

socket.on('send message', (data) => {
io.sockets.emit('new message', {msg: data});
});

});