const router = require("express").Router();
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const controller = require("../controllers/userController");

///  Users routers
router.post("/signup", controller.user_signup);
router.post("/login", controller.user_login);

router.get("/users", requireAuth, controller.get_users);
router.get("/user/:id", requireAuth, controller.get_one_user);

router.delete("/user/delete/:id", requireAuth, controller.delete_one_user);
router.delete("/users/delete/", requireAuth, controller.delete_users);

router.patch("/users/edit/:id", requireAuth, controller.edit_user);

module.exports = router;
