import { cardsData } from "../models/cardModel.js";

export class cardServices {
  static resultingCards = (query) => {
    let cards = cardsData;
    if (query.length > 1) {
      cards = cards.filter(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    return cards;
  };

  static setImageUrls = (request, cardsCollection) => {
    return cardsCollection.map((card) => ({
      ...card,
      image: `${request.protocol}://${request.get("host")}/card_icons/${
        card.image
      }`,
    }));
  };
}
