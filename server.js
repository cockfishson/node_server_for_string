import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/card_icons", express.static("card_icons"));

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.warn(process.env.ORIGIN);
});
