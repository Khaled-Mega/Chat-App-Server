import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.route.js";

const app = express();



app.use(express.json());
app.use(cors({
  origin:"https://crispy-giggle-pj654r95vx542r4pg-5173.app.github.dev",
  credentials:true
}))
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("home page")
})

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

app.listen(3000, () => {
  connectDB();
  console.log("Express server initialized");
});
