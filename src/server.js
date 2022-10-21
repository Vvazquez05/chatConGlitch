const express = require("express");
const {Server} = require ("socket.io")
const app = express();
const PORT = process.env.PORT || 8080;
//Servidor de Express
const server =  app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

app.use(express.static(__dirname+"/public"));

const historicoMensajes =[];

io.on("connection", (socket)=>{
    console.log("Nuevo usuario conectado", socket.id);
    socket.broadcast.emit("newUser");
    socket.emit("historico", historicoMensajes)
    socket.on("message", data =>{
        console.log(data)
        historicoMensajes.push(data);
        //Mandar el mensaje a todos los usuarios
        io.sockets.emit("historico", historicoMensajes);
    })
})