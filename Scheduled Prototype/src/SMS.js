var twilio = require('twilio');

const accountSid = process.env.USER_ID;

const authToken = process.env.USER_TOKEN;

const client = new twilio(accountSid, authToken);

const sendMessage = (to, message) => {
  return client.messages.create({
      body: message,
      to,
      from: process.env.USER_NUBMER
  });
}

module.exports = sendMessage;
