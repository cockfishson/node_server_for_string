import { cardServices } from "../services/cardServices.js";

export class CardController {
  static getCards(request, response, next) {
    const searchTerm = request.query.searchString;
    cardServices
      .resultingCards(searchTerm)
      .then((selectedCards) => response.status(200).json(selectedCards))
      .catch(next);
  }
}
