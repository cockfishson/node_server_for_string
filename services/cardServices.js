import { cardsData } from "../models/cardModel.js";

export class cardServices {
  static resultingCards = (query = "") => {
    return query.length > 1
      ? this.addImageToCards(
          cardsData.filter(
            (card) =>
              card.title.toLowerCase().includes(query.toLowerCase()) ||
              card.description.toLowerCase().includes(query.toLowerCase())
          )
        )
      : this.addImageToCards(cardsData);
  };

  static addImageToCards = (cards) =>
    cards.map((card) => ({
      ...card,
      image: `${process.env.ORIGIN}/card_icons/${card.image}`,
    }));
}
