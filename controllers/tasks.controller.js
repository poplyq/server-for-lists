const tasksServise = require('../service/tasks-servise');

class TasksController {
  async deleteTask(req, res, next) {
    try {
      const { cardName, taskName, id } = req.body;
      const cardData = await tasksServise.deleteTask(cardName, taskName, id);
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async upadateTaskOrder(req, res, next) {
    try {
      const { tasks, cardName, id } = req.body;
      const cardData = await tasksServise.updateTaskOrder(tasks, cardName, id);
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async upadateTaskName(req, res, next) {
    try {
      const { cardName, taskName, newName, id } = req.body;
      const cardData = await tasksServise.updateTaskName(
        cardName,
        taskName,
        newName,
        id
      );
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async upadateCardNameOfTask(req, res, next) {
    try {
      const { cardName, taskName, newCardName, id } = req.body;
      const cardData = await tasksServise.upadateCardNameOfTask(
        cardName,
        taskName,
        newCardName,
        id
      );
      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new TasksController();
