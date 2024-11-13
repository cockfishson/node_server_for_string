import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const Card = sequelize.define(
  "Card",
  {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "cards", timestamps: false },
);

export default Card;
