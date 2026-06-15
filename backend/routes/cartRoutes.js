const express = require("express");
const router = express.Router();

const {
  addToCart,
  saveForLater,
  moveToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  getCart,
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.post("/save", saveForLater);
router.post("/move", moveToCart);
router.post("/increase", increaseQuantity);
router.post("/decrease", decreaseQuantity);
router.delete("/remove", removeItem);
router.get("/:userId", getCart);

module.exports = router;