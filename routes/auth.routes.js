import express from "express";
const router = express.Router();

import {
  login,
  signup,
  logout,
  updatePic,
  getUser,
} from "../controllers/auth.controller.js";

import { protectedRoute } from "../middlewares/protectedRoute.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", protectedRoute, updatePic);
router.get("/authUser", protectedRoute, getUser);

export default router;
