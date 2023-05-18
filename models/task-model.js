const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  cardName: { type: String, requered: true },
  cardOrder: { type: Number, requered: true },
  taskName: { type: String, requered: true },
  taskOrder: { type: Number, requered: true },
  userId: { type: String, requered: true },
  description: { type: String },
  taskMark: { type: String },
});
module.exports = model('Task', TaskSchema);
