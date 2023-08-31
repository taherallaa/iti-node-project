const router = require("express").Router();
const controller = require("../controllers/userController");

const authorized = (req, res, next) => {
  console.log("-------");
  next();
};
router.post("/signup", authorized, controller.user_signup);
router.post("/login", authorized, controller.user_login);

module.exports = router;
