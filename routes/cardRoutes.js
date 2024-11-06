import express from "express";
import { CardController } from "../controllers/cardController.js";

const router = express.Router();
router.get("/cards", CardController.getCards);

export default router;
