const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, requered: true },
  password: { type: String, requered: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', UserSchema);
