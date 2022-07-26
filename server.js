const express=require("express")
const socket=require('socket.io')
const app=express();

const http=require("http")
const expressHTPPServer=http.createServer(app);
const io=new socket.Server( expressHTPPServer)

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})


io.on('connection',(socket)=>{

    io.to(socket.id).emit('getName',(name)=>{
    console.log(name);
    })
  
    
    socket.on("new_message", (msg,cb)=>{
        socket.broadcast.emit("receive_msg",msg,socket.name)
        cb()
    })
    
    socket.on("setName", (name,cb)=>{
        socket.name=name;
        cb()
    })
})


expressHTPPServer.listen(3000,()=>{
    console.log("Server is running on @3000")
})