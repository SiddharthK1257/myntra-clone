const mongoose = require("mongoose");

const browsingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  viewedAt: {
    type: Date,
    default: Date.now,
    expires: "30d"
  }
});

browsingSchema.index(
  { userId: 1, productId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "BrowsingHistory",
  browsingSchema
);