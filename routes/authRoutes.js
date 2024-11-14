import express from "express";
import { AuthController } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.post("/signup", AuthController.signup);
export default router;
