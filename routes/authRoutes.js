import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncMiddleware } from "../middlewares/asyncMiddleware.js";

const router = express.Router();
router.post("/login", asyncMiddleware(AuthController.login));
router.post("/refresh", asyncMiddleware(AuthController.refreshToken));
router.post("/signup", asyncMiddleware(AuthController.signup));
export default router;
