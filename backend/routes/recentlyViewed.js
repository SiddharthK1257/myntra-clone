const express = require("express");
const router = express.Router();
const RecentlyViewed = require("../models/RecentlyViewed");

// Test route
router.get("/", (req, res) => {
  res.send("Recently viewed route working");
});

// Add product to recently viewed
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let history = await RecentlyViewed.findOne({ userId });

    if (!history) {
      history = new RecentlyViewed({
        userId,
        products: [],
      });
    }

    // Remove duplicate product if already exists
    history.products = history.products.filter(
      (item) => item.productId.toString() !== productId
    );

    // Add latest product to the beginning
    history.products.unshift({
      productId,
      viewedAt: new Date(),
    });

    // Keep only latest 20 products
    history.products = history.products.slice(0, 20);

    await history.save();

    res.status(200).json({
      success: true,
      products: history.products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get recently viewed products
router.get("/:userId", async (req, res) => {
  try {
    const history = await RecentlyViewed.findOne({
      userId: req.params.userId,
    }).populate("products.productId");

    if (!history) {
      return res.status(200).json([]);
    }

    res.status(200).json(history.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;