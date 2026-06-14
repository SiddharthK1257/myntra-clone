const express = require("express");
const router = express.Router();

const { paymentWebhook } = require("../controllers/webhookController");

router.post("/", paymentWebhook);

module.exports = router;