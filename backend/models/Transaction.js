const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
{
    userId:{
        type:String,
        required:true
    },

    paymentMode:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["success","failed","refund","pending"],
        default:"pending"
    },

    receiptNumber:{
        type:String,
        unique:true
    },

    invoiceId:{
        type:String,
        unique:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Transaction",transactionSchema);