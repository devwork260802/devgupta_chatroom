// It handles Socket.io Connections

const http=require("http");

const io = require('socket.io')(8080,{

    cors:{

        origin: "*"

    }

});

const users = {};

io.on('connection', socket =>{

    // To know New User joining.

    socket.on('new-user-joined', name =>{ 

        console.log("New User",name)

        users[socket.id] = name;

        socket.broadcast.emit('user-joined', name);

    });

    // It sends messages to other people

    socket.on('send', message =>{

        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})

    });

    // If someone leaves the chat, let others know 

    socket.on('disconnect', message =>{

        socket.broadcast.emit('left', users[socket.id]);

        delete users[socket.id];

    });

}) 
