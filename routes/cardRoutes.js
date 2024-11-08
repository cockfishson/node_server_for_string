import express from "express";
import { CardController } from "../controllers/cardController.js";
import { asyncHandler } from "../middlewares/asyncMiddleware.js";

const router = express.Router();
router.get("/cards", asyncHandler(CardController.getCards));

export default router;
