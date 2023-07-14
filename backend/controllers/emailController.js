const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: "465",
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
    html: message,
  };

  // Send Email
  try {
    const info = await transporter.sendMail(options);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (req, res) => {
  const { email, subjects, body } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = subjects;
    const message = body;

    // Loop through each recipient and send email
    for (const recipient of send_to) {
      await sendEmail(subject, message, recipient, sent_from, reply_to);
    }

    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
