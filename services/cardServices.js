const { getCards } = require("../models/cardModel");

const resultingCards = (query) => {
  let cards = getCards();

  if (query.length > 1) {
    cards = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(query.toLowerCase()) ||
        card.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  return cards;
};

const setImageUrls = (request, cardsCollection) => {
  return cardsCollection.map((card) => ({
    ...card,
    image: `${request.protocol}://${request.get("host")}/card_icons/${
      card.image
    }`,
  }));
};

module.exports = { resultingCards, setImageUrls };
