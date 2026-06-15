const Product = require("../models/Product");
const RecentlyViewed = require("../models/RecentlyViewed");
const Wishlist = require("../models/Wishlist");

exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get recently viewed products of the user
    const recent = await RecentlyViewed.findOne({ userId })
      .populate("products.productId");

    let categorySet = new Set();

    // Extract categories from recently viewed products
    if (recent && recent.products.length > 0) {
      recent.products.forEach((item) => {
        if (item.productId && item.productId.category) {
          categorySet.add(item.productId.category);
        }
      });
    }

    // Cold start: if no browsing history
    if (categorySet.size === 0) {
      const popularProducts = await Product.find()
        .sort({
          wishlistCount: -1,
          views: -1,
          purchases: -1,
        })
        .limit(10);

      return res.status(200).json({
        success: true,
        source: "popular-products",
        recommendations: popularProducts,
      });
    }

    const categories = [...categorySet];

    // Products from similar categories
    let recommendations = await Product.find({
      category: { $in: categories },
    })
      .sort({
        wishlistCount: -1,
        views: -1,
      })
      .limit(10);

    // If fewer than 10 products found, fill remaining slots with popular products
    if (recommendations.length < 10) {
      const existingIds = recommendations.map((p) => p._id);

      const extraProducts = await Product.find({
        _id: { $nin: existingIds },
      })
        .sort({
          wishlistCount: -1,
          views: -1,
          purchases: -1,
        })
        .limit(10 - recommendations.length);

      recommendations = [
        ...recommendations,
        ...extraProducts,
      ];
    }

    res.status(200).json({
      success: true,
      source: "category-based",
      recommendations,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};