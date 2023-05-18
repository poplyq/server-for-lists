module.exports = class CardsDto {
  id;
  cardName;
  cardOrder;
  taskName;
  taskOrder;
  userId;

  constructor(model) {
    this.id = model._id;
    this.cardName = model.cardName;
    this.cardOrder = model.cardOrder;
    this.taskName = model.taskName;
    this.taskOrder = model.taskOrder;
    this.userId = model.userId;
  }
};
