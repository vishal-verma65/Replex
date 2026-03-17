import app from "./src/app.js";
import dotenv from "dotenv";
import { testAI } from "./src/services/ai.service.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

//* Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

