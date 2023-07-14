const nodemailer = require('nodemailer');
const Email = require('../db/Email');
const path = require('path');
const fs = require('fs');

exports.sendEmail = async (req, res) => {
  const { email, subjects, body } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const subject = subjects;
    const message = body;

    // Loop through each recipient and send email
    for (const recipient of send_to) {
      // Generate a tracking ID
      const trackingId = generateTrackingId();

      // Create a new Email document
      const newEmail = new Email({
        recipient: recipient,
        subject: subject,
        body: message,
        trackingId: trackingId,
      });

      // Save the Email document to the database
      await newEmail.save();
     

      // Save the tracking image
      await saveTrackingImage(trackingId);

      // Send the email using the exported HTML and the recipient's email address
    
      
      await sendEmailWithTracking(subject, message, recipient, sent_from, trackingId);

      console.log(`Email sent to ${recipient}. Tracking ID: ${trackingId}`);
    }

    res.status(200).json({ success: true, message: 'Email Sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to send email with tracking image
const sendEmailWithTracking = async (subject, message, send_to, sent_from, trackingId) => {
  console.log(subject)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: '465',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    subject: subject,
    html: `${message}<img src="${process.env.TRACKING_URL}/${trackingId}" width="1" height="1" />`, // Add the tracking image to the email
  };

  try {
    const info = await transporter.sendMail(options);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

// Function to generate a random tracking ID
const generateTrackingId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let trackingId = '';

  for (let i = 0; i < 10; i++) {
    trackingId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return trackingId;
};

// Function to save the tracking image
const saveTrackingImage = async (trackingId) => {
 
  const trackingImageFilePath = path.join(__dirname, '..', 'public', 'tracking', `${trackingId}.png`);

  // Create a transparent tracking image (1x1 pixel)
  const trackingImage = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  // Save the tracking image to the server
  try {
    fs.writeFileSync(trackingImageFilePath, trackingImage);
    console.log('Tracking image saved successfully.');
  } catch (error) {
    console.error('Error saving tracking image:', error);
  }
  
};



