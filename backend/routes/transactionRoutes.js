const express = require("express");
const router = express.Router();

const {
createTransaction,
getTransactions,
downloadReceipt
} = require("../controllers/transactionController");

router.post("/",createTransaction);

router.get("/",getTransactions);

router.get("/receipt/:id", downloadReceipt);

module.exports=router;