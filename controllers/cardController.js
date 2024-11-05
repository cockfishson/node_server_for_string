const { resultingCards, setImageUrls } = require("../services/cardServices");

exports.getCards = (request, result) => {
  const searchTerm = request.query.searchString;
  const selectedCards = resultingCards(searchTerm);
  const cards = setImageUrls(request, selectedCards);
  result.status(200).json(cards);
};
