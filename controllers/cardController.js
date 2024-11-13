import { cardServices } from "../services/cardServices.js";
import { asyncMiddleware } from "../middlewares/asyncMiddleware.js";

export class CardController {
  // eslint-disable-next-line no-unused-vars
  static getCards = asyncMiddleware(async (req, res) => {
    const searchTerm = req.query.searchString;
    const selectedCards = await cardServices.resultingCards(searchTerm);
    res.status(200).json(selectedCards);
  });
}
