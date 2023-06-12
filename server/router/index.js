const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const messageController = require("../controllers/message-controller");

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.post("/sendMessage", messageController.sendMessage);
router.get("/messages", authMiddleware, messageController.getMessages);
router.get("/users", userController.getUsers);


module.exports = router;
