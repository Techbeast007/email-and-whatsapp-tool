const axios = require('axios');

function sendMessage(data) {
  let url = 'https://graph.facebook.com/v17.0/105039132648433/messages';

let  headers = {
                'Authorization': `Bearer ${process.env.WATOKEN}`,
                'Content-Type': 'application/json'
               };

  axios.post(url, data, {
    headers: headers
  })
  .then(function (response) {
    console.log("response====>",response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
      "body": text
    }
  });
}

module.exports = {
  sendMessage,
  getTextMessageInput
};
