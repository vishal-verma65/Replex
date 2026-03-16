import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectDB from "./config/database.js";
import authRouter from "./routes/auth.routes.js";


// Load environment variables
dotenv.config();

//* Database connection
connectDB();

const app = express();

//*MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


//* ROUTES
app.use("/api/auth", authRouter);

export default app;
