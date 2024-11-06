import { resultingCards, setImageUrls } from "../services/cardServices.js";

export class CardController {
  static getCards(request, response) {
    const searchTerm = request.query.searchString;
    const selectedCards = resultingCards(searchTerm);
    const cards = setImageUrls(request, selectedCards);
    response.status(200).json(cards);
  }
}
