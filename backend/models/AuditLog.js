const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
{
    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    },

    eventType:{
        type:String
    },

    message:{
        type:String
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("AuditLog",auditSchema);