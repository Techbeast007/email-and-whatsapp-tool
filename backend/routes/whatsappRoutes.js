const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const { sendMessage, getTextMessageInput } = require('../messageHelper');

router.use(bodyParser.json());

router.post('/sendmessage', async (req, res) => {
  console.log(req.body)
  let resp = []
  try {
    const recipients = req.body.recipient; // Assuming 'recipients' is an array of recipient phone numbers
    const text = req.body.message;
  
    for (const recipient of recipients) {
      const data = getTextMessageInput(recipient, text);
     resp =  await sendMessage(data);
    }
    res.status(200).json({ success: true, message: 'WhatsApp messages sent', resp });
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    res.status(500).json({ success: false, error: 'Failed to send WhatsApp message', error, resp });
  }
});

module.exports = router;
