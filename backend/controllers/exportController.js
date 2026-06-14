const Transaction = require("../models/Transaction");

exports.exportCSV = async (req, res) => {
  try {

    const transactions = await Transaction.find();

    res.setHeader(
      "Content-Type",
      "text/csv"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transactions.csv"
    );

    transactions.forEach(item => {
      res.write(
        `${item.paymentMode},${item.amount},${item.status}\n`
      );
    });

    res.end();

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};