import { cardServices } from "../services/cardServices.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";

export class CardController {
  static getCards(request, response, next) {
    const searchTerm = request.query.searchString;
    const selectedCards = cardServices.resultingCards(searchTerm);
    response.status(200).json(selectedCards);
  }
}
