import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env["MONGO_URL"]);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
}
