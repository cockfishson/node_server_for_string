import express from "express";
import { AuthController } from "../controllers/authController.js";
import { asyncMiddleware } from "../middlewares/asyncMiddleware.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import {
  requiredFieldsSchema,
  signupSchema,
} from "../validators/validation_sign_up.js";
const router = express.Router();
router.post("/login", asyncMiddleware(AuthController.login));
router.post("/refresh", asyncMiddleware(AuthController.refreshToken));
router.post(
  "/signup",
  validationMiddleware(requiredFieldsSchema),
  validationMiddleware(signupSchema),
  asyncMiddleware(AuthController.signup),
);

export default router;
