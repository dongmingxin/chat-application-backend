// require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require("cors");
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const routes = require('./routes');
const { connectToDB } = require('./utils/db');

const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/users.js')

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

io.on('connection', socket => {
    // console.log('We have a new Connection...');
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user:'Chat Bot', text: `Welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'Chat Bot', text:`${user.name}, has joined`})

        socket.join(user.room);
        
        io.to(user.room).emit('roomUsers', {
            users: getUserInRoom(user.room)
        })

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message})

        callback();
    })
    
    socket.on('disconnect', ()=> {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {
                user : 'Chat Bot', text: `${user.name} has left.`});

            io.to(user.room).emit('roomUsers', {
                users: getUserInRoom(user.room)});
        }


    })
})

server.listen(PORT, ()=> {
    console.log(`server listening on port: ${PORT}`)
})

// connectToDB().then(()=>{
//     server.listen(PORT, ()=> {
//         console.log(`server listening on port: ${PORT}`)
//     })
// })