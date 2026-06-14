const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema({
    eventId:{
        type:String,
        unique:true
    }
});

module.exports = mongoose.model("WebhookEvent",webhookSchema);