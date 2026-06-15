const Bag = require("../models/Bag");
const Product = require("../models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;

    let item = await Bag.findOne({
      userId,
      productId,
      size,
      savedForLater: false,
    });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      item = await Bag.create({
        userId,
        productId,
        size,
        quantity: 1,
        savedForLater: false,
        priceAtAddition: product.price,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Move item to Save For Later
exports.saveForLater = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const item = await Bag.findOne({
      userId,
      productId,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.savedForLater = true;
    await item.save();

    res.status(200).json({
      success: true,
      message: "Moved to Save For Later",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Move item back to cart
exports.moveToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const item = await Bag.findOne({
      userId,
      productId,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.savedForLater = false;
    await item.save();

    res.status(200).json({
      success: true,
      message: "Moved back to cart",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Increase quantity
exports.increaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const item = await Bag.findOne({
      userId,
      productId,
      savedForLater: false,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity += 1;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Decrease quantity
exports.decreaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const item = await Bag.findOne({
      userId,
      productId,
      savedForLater: false,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Remove item
exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Bag.findOneAndDelete({
      userId,
      productId,
    });

    res.status(200).json({
      success: true,
      message: "Item removed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const items = await Bag.find({
      userId: req.params.userId,
    }).populate("productId");

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
