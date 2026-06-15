const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: String,
    },

    description: {
      type: String,
    },

    sizes: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    // For popularity fallback
    views: {
      type: Number,
      default: 0,
      index: true,
    },

    wishlistCount: {
      type: Number,
      default: 0,
      index: true,
    },

    purchases: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster recommendation queries
ProductSchema.index({
  category: 1,
  wishlistCount: -1,
  views: -1,
});

module.exports = mongoose.model("Product", ProductSchema);