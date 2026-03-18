import app from "./src/app.js";
import dotenv from "dotenv";
import http from "http"

import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app)

//* starting socket server 
initSocket(httpServer);

//* Database connection
connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

