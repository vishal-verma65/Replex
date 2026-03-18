import {Server} from "socket.io"


let io;

//function to initialize socket io server
export function initSocket(httpServer){
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })

    console.log("Socket.io server is running")

    io.on("connection", (socket)=>{
        console.log("A user connected: " + socket.id)
    })
}

//function to return IO
export const getIO=()=>{
    if(!io){
        throw new Error("Socket.io not initialized.")
    }

    return io
}