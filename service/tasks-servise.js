const TaskModel = require('../models/task-model');
class TasksService {
  async deleteTask(cardName, taskName, userId) {
    const card = await TaskModel.deleteOne({
      cardName: cardName,
      taskName: taskName,
      userId: userId,
    });
    return { card };
  }
  async updateTaskOrder(tasks, cardName, id) {
    tasks.forEach(async (e) => {
      await TaskModel.updateOne(
        { cardName: cardName, userId: id },
        { $set: { taskOrder: e.taskOrder } }
      );
    });
    return tasks;
  }
  async updateTaskName(cardName, taskName, newName, id) {
    await TaskModel.updateOne(
      { cardName: cardName, taskName: taskName, userId: id },
      { $set: { taskName: newName } }
    );
    return id;
  }
  async upadateCardNameOfTask(cardName, taskName, newCardName, id) {
    await TaskModel.updateOne(
      { cardName: cardName, taskName: taskName, userId: id },
      { $set: { cardName: newCardName } }
    );
    return id;
  }
}
module.exports = new TasksService();
