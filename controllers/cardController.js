import { cardServices } from "../services/cardServices.js";
import { CustomError } from "../helpers/utils/error_handlers/customResponseError.js";

export class CardController {
  static getCards(request, response) {
    const searchTerm = request.query.searchString;
    try {
      const selectedCards = cardServices.resultingCards(searchTerm);
      const cards = cardServices.setImageUrls(request, selectedCards);
      response.status(200).json(cards);
    } catch (error) {
      if (error instanceof CustomError) {
        response
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        response
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
}
