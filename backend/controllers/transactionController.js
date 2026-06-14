const Transaction = require("../models/Transaction");
const AuditLog = require("../models/AuditLog");

exports.createTransaction = async(req,res)=>{

try{

const transaction = await Transaction.create({
    ...req.body,
    invoiceId:"INV-"+Date.now(),
    receiptNumber:"REC-"+Date.now()
});

await AuditLog.create({
    transactionId:transaction._id,
    eventType:"CREATED",
    message:"Transaction created"
});

res.status(201).json(transaction);

}
catch(err){
res.status(500).json({
message:err.message
});
}
};

exports.getTransactions = async (req, res) => {

try{

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  let filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const transactions = await Transaction.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(transactions);

} catch (err) {
    res.status(500).json({
        message: err.message
    })
  }
}
