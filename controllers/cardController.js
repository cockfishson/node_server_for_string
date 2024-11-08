import { cardServices } from "../services/cardServices.js";

export class CardController {
  static getCards(request, response) {
    const searchTerm = request.query.searchString;
    const selectedCards = cardServices.resultingCards(searchTerm);
    response.status(200).json(selectedCards);
  }
}
