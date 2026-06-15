const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    const existing = cart.items.find(
      item =>
        item.productId.toString() === productId &&
        !item.savedForLater
    );

    if (existing) {
      existing.quantity += 1;
    } else {

      const product = await Product.findById(productId);

      cart.items.push({
        productId,
        quantity: 1,
        savedForLater: false,
        priceAtAddition: product.price
      });

    }

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.saveForLater = async (req, res) => {

  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(
    i => i.productId.toString() === productId
  );

  if (item) {
    item.savedForLater = true;
  }

  await cart.save();

  res.json(cart);
};

exports.moveToCart = async (req, res) => {

  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find(
    i => i.productId.toString() === productId
  );

  if (item) {
    item.savedForLater = false;
  }

  await cart.save();

  res.json(cart);
};

exports.getCart = async (req, res) => {

  const cart = await Cart.findOne({
    userId: req.params.userId
  }).populate("items.productId");

  res.json(cart);

};
