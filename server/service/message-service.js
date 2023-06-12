const messageModel = require("../models/message-model");
const userModel = require("../models/user-model");

class MessageService {
  async sendMessage(userFrom, userTo, title, message) {
    const user = await userModel.findOne({ name: userFrom });

    const dateMessage = new Date();
    const formattedDate = dateMessage.toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    await messageModel.create({
      userFrom: user._id,
      userTo,
      title,
      date: formattedDate,
      message,
    });

    return true;
  }

  async getMessages(userTo) {
    const messages = await messageModel
      .find({ userTo: userTo })
      .populate("userFrom");
    return messages;
  }
}

module.exports = new MessageService();
