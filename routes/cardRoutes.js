import express from "express";
import { CardController } from "../controllers/cardController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/cards", authenticateJWT, CardController.getCards);

export default router;
