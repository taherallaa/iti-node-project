const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/signup", controller.user_signup);

module.exports = router;
