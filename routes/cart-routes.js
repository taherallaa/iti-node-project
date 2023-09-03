const router = require("express").Router();

const controller = require("../controllers/cartController");
const { requireAuth, cartAuth } = require("../middleware/authMiddleware");

router.post("/product/add_to_cart", cartAuth, controller.add_to_cart);

router.get(
  "/product/cart/show_all_carts",
  requireAuth,
  controller.show_all_carts,
);

router.get("/product/cart/my_cart", cartAuth, controller.show_my_cart);

router.patch(
  "/product/cart/:cartId/:productId",
  cartAuth,
  controller.edit_cart,
);

module.exports = router;
