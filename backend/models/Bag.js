const mongoose = require("mongoose");

const BagItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    size: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    savedForLater: {
      type: Boolean,
      default: false,
    },

    priceAtAddition: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bag", BagItemSchema);