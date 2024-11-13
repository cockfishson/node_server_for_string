import Card from "../models/cardModel.js";
import { Op } from "sequelize";

export class cardServices {
  static resultingCards = async (query = "") => {
    const whereClause = query
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { description: { [Op.iLike]: `%${query}%` } },
          ],
        }
      : {};

    const cards = await Card.findAll({ where: whereClause });
    return this.addImageToCards(cards);
  };

  static addImageToCards = (cards) =>
    cards.map((card) => ({
      ...card.toJSON(),
      image: `${process.env.ORIGIN}/card_icons/${card.image}`,
    }));
}
