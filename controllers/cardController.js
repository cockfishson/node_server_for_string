import { cardServices } from "../services/cardServices.js";
import { CustomError } from "../helpers/utils/error_handlers/customResponseError.js";

export class CardController {
  static getCards(request, response, next) {
    const searchTerm = request.query.searchString;
    try {
      const selectedCards = cardServices.resultingCards(searchTerm);
      const cards = cardServices.setImageUrls(request, selectedCards);
      response.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  }
}
