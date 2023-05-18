const TaskModel = require('../models/task-model');
class CardsService {
  async getCards(id) {
    const cardData = await TaskModel.find({ userId: id });
    let cardsArr = [];
    let resData = [];
    cardData.forEach((e) => {
      cardsArr.push(e.cardName);
    });
    let newset = new Set(cardsArr);
    let cardName = Array.from(newset);
    let arrayTask = [];
    for (const i of cardName) {
      const taskData = await TaskModel.find({ cardName: i });
      taskData.forEach((e) => {
        arrayTask.push({
          taskName: e.taskName,
          taskOrder: e.taskOrder,
          id: e._id.toString(),
        });
      });
      resData.push({
        cardName: i,
        cardOrder: taskData[0].cardOrder,
        tasks: arrayTask,
      });
      arrayTask = [];
    }
    return { resData };
  }

  async addCard(cardName, cardOrder, taskName, taskOrder, userId) {
    const card = await TaskModel.create({
      cardName: cardName,
      cardOrder: cardOrder,
      taskName: taskName,
      taskOrder: taskOrder,
      userId: userId,
    });
    return {
      cardName: cardName,
      cardOrder: cardOrder,
      tasks: [
        { taskName: taskName, taskOrder: taskOrder, id: card._id.toString() },
      ],
    };
  }

  async deleteCard(cardName, userId) {
    const card = await TaskModel.deleteMany({
      cardName: cardName,
      userId: userId,
    });
    return { card };
  }

  async updateCardOrder(cards, id) {
    cards.forEach(async (e) => {
      await TaskModel.updateMany(
        { cardName: e.cardName, userId: id },
        { $set: { cardOrder: e.cardOrder } }
      );
    });
    return cards;
  }

  async updateCardName(cardName, newName, id) {
    await TaskModel.updateMany(
      { cardName: cardName, userId: id },
      { $set: { cardName: newName } }
    );
    return id;
  }
}

module.exports = new CardsService();
