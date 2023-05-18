const cardsService = require('../service/cards-service');

class CardsController {
  async getCards(req, res, next) {
    try {
      const { id } = req.body;
      const cardData = await cardsService.getCards(id);
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }

  async addCard(req, res, next) {
    try {
      const { cardName, cardOrder, taskName, taskOrder, id } = req.body;
      const cardData = await cardsService.addCard(
        cardName,
        cardOrder,
        taskName,
        taskOrder,
        id
      );
      return res.json(cardData);
    } catch (e) {
      next(e);
    }
  }

  async deleteCard(req, res, next) {
    try {
      const { cardName, id } = req.body;
      const cardData = await cardsService.deleteCard(cardName, id);
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async updateCard(req, res, next) {
    try {
      const { cards, id } = req.body;
      const cardData = await cardsService.updateCardOrder(cards, id);
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async updateCardName(req, res, next) {
    try {
      const { cardName, newName, id } = req.body;
      const cardData = await cardsService.updateCardName(cardName, newName, id);
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CardsController();
