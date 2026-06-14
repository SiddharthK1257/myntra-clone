const WebhookEvent = require("../models/WebhookEvent");
const Transaction = require("../models/Transaction");

exports.paymentWebhook = async(req,res)=>{

const {eventId,data}=req.body;

const alreadyProcessed =
await WebhookEvent.findOne({eventId});

if(alreadyProcessed){
return res.json({
message:"Duplicate ignored"
});
}

await WebhookEvent.create({
eventId
});

await Transaction.create(data);

res.json({
message:"Payment processed"
});

};