import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import dotenv from "dotenv";
import { sequelize } from "./sequelize.js";
import { authenticateJWT } from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/cards", authenticateJWT, cardRoutes);

app.use(express.static("public"));
app.use("/card_icons", express.static("card_icons"));

app.use("/auth", authRoutes);

app.use(errorMiddleware);

sequelize
  .authenticate()
  .then(() => {
    console.warn(
      "Connection to the database has been established successfully.",
    );
    app.listen(PORT, () => {
      console.warn(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
