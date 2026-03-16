import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error("[DB] MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`[DB] Connected to MongoDB`);
  } catch (error) {
    console.error("[DB] MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
