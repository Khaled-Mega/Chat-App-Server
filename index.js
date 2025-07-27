import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"https://4b702fb8-d4ff-4765-a2c4-7da2947bd7dd-00-3d5reuka2o4af.worf.replit.dev/"
  })
);

app.get("/",(req,res)=>{
  res.send("home page")
})

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

app.listen(3000, () => {
  connectDB();
  console.log("Express server initialized");
});
