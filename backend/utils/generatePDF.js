const PDFDocument = require("pdfkit");

const generatePDF = (transaction, res) => {

    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${transaction.invoiceId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Payment Receipt");

    doc.moveDown();

    doc.text(`Invoice ID: ${transaction.invoiceId}`);

    doc.text(`Receipt Number: ${transaction.receiptNumber}`);

    doc.text(`Payment Mode: ${transaction.paymentMode}`);

    doc.text(`Amount: ₹${transaction.amount}`);

    doc.text(`Status: ${transaction.status}`);

    doc.text(`Date: ${transaction.createdAt}`);

    doc.end();
};

module.exports = generatePDF;