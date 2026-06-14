const csvWriter = require("csv-writer").createObjectCsvWriter;

const writer = csvWriter({
  path: "transactions.csv",
  header: [
    { id: "paymentMode", title: "Payment Mode" },
    { id: "amount", title: "Amount" },
    { id: "status", title: "Status" }
  ]
});

module.exports = writer;