import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan"

import authRouter from "./routes/auth.routes.js";


// Load environment variables
dotenv.config();

const app = express();

//*MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))


//* ROUTES
app.use("/api/auth", authRouter);

export default app;
