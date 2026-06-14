const cron = require("node-cron");

cron.schedule("0 10 * * *", () => {
  console.log("Send cart reminder");
});