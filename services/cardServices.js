import { cardsData } from "../models/cardModel.js";

export class cardServices {
  static resultingCards = (query) => {
    let cards = cardsData;
    console.log(process.env.ORIGIN);
    if (query.length > 1) {
      cards = cards
        .filter(
          (card) =>
            card.title.toLowerCase().includes(query.toLowerCase()) ||
            card.description.toLowerCase().includes(query.toLowerCase())
        )
        .map((card) => ({
          ...card,
          image: `${process.env.ORIGIN}/card_icons/${card.image}`,
        }));
    }
    return cards;
  };
}
