import { cardServices } from "../services/cardServices.js";

export class CardController {
  // eslint-disable-next-line no-unused-vars
  static getCards = async (req, res) => {
    const searchTerm = req.query.searchString;
    const selectedCards = await cardServices.resultingCards(searchTerm);
    res.status(200).json(selectedCards);
  };
}
