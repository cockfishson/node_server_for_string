import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncMiddleware } from "../middlewares/asyncMiddleware.js";
import { signupMiddleware } from "../middlewares/signupMiddleware.js";
const router = express.Router();
router.post("/login", asyncMiddleware(AuthController.login));
router.post("/refresh", asyncMiddleware(AuthController.refreshToken));
router.post(
  "/signup",
  signupMiddleware,
  asyncMiddleware(AuthController.signup),
);

export default router;
