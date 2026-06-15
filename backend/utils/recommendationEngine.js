const Product = require("../models/Product");
const BrowsingHistory = require("../models/BrowsingHistory");

async function getRecommendations(userId){

  // recent history
  const history = await BrowsingHistory.find({
    userId
  }).populate("productId");

  if(history.length===0){

    // cold start
    return await Product.find()
      .sort({views:-1})
      .limit(10);
  }

  const categories =
    history.map(
      h=>h.productId.category
    );

  return await Product.find({
    category:{
      $in:categories
    }
  })
  .sort({
    wishlistCount:-1,
    views:-1
  })
  .limit(10);
}

module.exports={
  getRecommendations
};