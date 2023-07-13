const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from) => {
  const transporter = nodemailer.createTransport({
    host: "justollc.com",
    port: "465",
    secure : "true",
    auth: {
      user: "test@justollc.com",
      pass: "test@justollc.com",
    },
    
    
  });
  console.log(subject)

  send_to.forEach(async(x)=>{
    const options = {
      from: sent_from,
      to: x,
      subject: subject,
      html: message,
    };
  
    // Send Email
   await  transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });


  })

 
};

module.exports = sendEmail;
