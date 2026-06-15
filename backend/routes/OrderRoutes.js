const express = require("express");
const router = express.Router();

const Bag = require("../models/Bag");
const Order = require("../models/Order");

function generateRandomTracking() {
  const carriers = ["Delhivery", "Bluedart", "Ecom Express", "XpressBees"];
  const statuses = [
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "In Transit",
  ];
  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Pune",
  ];

  const carrier =
    carriers[Math.floor(Math.random() * carriers.length)];

  const status =
    statuses[Math.floor(Math.random() * statuses.length)];

  const location =
    locations[Math.floor(Math.random() * locations.length)];

  return {
    number: "TRK" + Math.floor(Math.random() * 10000000),
    carrier,
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    currentLocation: location,
    status,
    timeline: [
      {
        status: "Order Placed",
        location: "Warehouse",
        timestamp: new Date(),
      },
      {
        status,
        location,
        timestamp: new Date(),
      },
    ],
  };
}

// Create Order
router.post("/create/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const bag = await Bag.find({
      userId,
      savedForLater: false,
    }).populate("productId");

    if (bag.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in the bag",
      });
    }

    const orderItems = bag.map((item) => ({
      productId: item.productId._id,
      size: item.size,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      date: new Date(),
      status: "Processing",
      item: orderItems,
      total,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      tracking: generateRandomTracking(),
    });

    await newOrder.save();

    await Bag.deleteMany({
      userId,
      savedForLater: false,
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get User Orders
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;