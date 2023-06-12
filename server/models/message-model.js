const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userTo: {
    type: String,
    required: true 
  },
  date: {
    type: Date
  },
  title: {
    type: String,
    required: true 
  },
  message: {
    type: String,
  }
});

module.exports = model("Message", MessageSchema);
