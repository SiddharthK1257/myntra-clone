const {
  Expo,
} = require("expo-server-sdk");

const expo = new Expo();

async function sendNotification(
  token,
  title,
  body
) {
  await expo.sendPushNotificationsAsync([
    {
      to: token,
      sound: "default",
      title,
      body,
    },
  ]);
}

module.exports = sendNotification;