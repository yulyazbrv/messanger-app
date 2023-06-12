const messageService = require("../service/message-service");
const jwt = require("jsonwebtoken");

class MessageController {
  async sendMessage(req, res, next) {
    try {
      const { userTo, title, message } = req.body;
      const token = req.headers["authorization"].split(" ")[1];
      const userFromData = jwt.decode(token, process.env.JWT_ACCESS_SECRET);
      const messageData = await messageService.sendMessage(userFromData.name, userTo, title, message);
      return res.json(messageData);
    } catch (e) {
      next(e);
    }
  }

  async getMessages(req, res, next) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const userData = jwt.decode(token, process.env.JWT_ACCESS_SECRET);
      const messages = await messageService.getMessages(userData.name);
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessageController();
