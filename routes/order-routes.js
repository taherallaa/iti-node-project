const router = require("express").Router();

const controller = require("../controllers/orderController");
const { orderAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/order/:id", orderAuth, controller.order);

router.get("/order/show", orderAuth, controller.show_my_order);
router.get("/order/show_all_order", requireAuth, controller.show_all_order);
module.exports = router;
