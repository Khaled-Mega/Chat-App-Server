import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";

import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", protectedRoute, getUsers);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
