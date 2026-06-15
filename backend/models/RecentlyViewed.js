const mongoose = require("mongoose");

const viewedProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const RecentlyViewedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One document per user
    },

    products: {
      type: [viewedProductSchema],
      default: [],
      validate: {
        validator: function (products) {
          return products.length <= 50;
        },
        message: "Only the latest 50 products are allowed.",
      },
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
      expires: "30d", // Automatically delete document after 30 days
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for recommendation queries
RecentlyViewedSchema.index({ "products.productId": 1 });
RecentlyViewedSchema.index({ "products.viewedAt": -1 });

module.exports = mongoose.model(
  "RecentlyViewed",
  RecentlyViewedSchema
);