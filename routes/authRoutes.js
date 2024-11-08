import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncMiddleware.js";

const router = express.Router();
router.post("/login", asyncHandler(AuthController.login));

export default router;
