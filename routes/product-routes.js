const router = require("express").Router();
const { requireAuth, cartAuth } = require("../middleware/authMiddleware");
const controller = require("../controllers/productController");

router.get("/products", controller.show_products);
router.get("/products/:id", controller.show_one_product);

/// add/delte product [admin only]
router.post("/product/add", requireAuth, controller.add_product);

router.patch("/product/edit/:id", requireAuth, controller.edit_product);

router.delete("/products/delete", requireAuth, controller.delete_products);
router.delete(
  "/products/delete/:id",
  requireAuth,
  controller.delete_one_product,
);

module.exports = router;
