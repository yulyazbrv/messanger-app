const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true 
  }
});

module.exports = model("User", UserSchema);
