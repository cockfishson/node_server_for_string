import { cardsData } from "../models/cardModel.js";
import { CustomError } from "../helpers/utils/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/utils/error_handlers/responseErrorCodes.js";

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
    if (cards.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, "No matching cards found");
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
