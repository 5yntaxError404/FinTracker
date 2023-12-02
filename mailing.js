const nodemailer = require ("nodemailer");
const { MailtrapClient } = require("mailtrap");
require('dotenv/config');

const client = new MailtrapClient({ endpoint: process.env.ENDPOINT, token: process.env.TOKEN });

const sender = {
  email: "Support@fintech.davidumanzor.com",
  name: "Support@Fintracker",
};

      exports.generateOneTimePass = () => {
        let oneTimePass = ""
        for (let i = 0; i < 4; i++){
          const randVal = Math.round(Math.random() * 9)
          oneTimePass = oneTimePass + randVal
        }
        return oneTimePass;
      }

    async function verifyEmail(email, OTP) {

       const recipients = [
        {
          email: email,
        }
      ];

          client
          .send({
            from: sender,
            to: recipients,
            subject: "Email Verification",
            text: "Please Click the Following Link to Verify: " + OTP,
            category: "Email Verification",
          })
          .then(console.log, console.error);
    }

    async function forgotPassword(name, email, OTP) {

      const recipients = [
       {
         email: email,
       }
     ];

         client
         .send({
           from: sender,
           to: recipients,
           subject: "Password Reset",
           text: "Hello " + name + ",\n\n" + "You have requested a password reset. You may reset it here: " + OTP + "\n\n If you did not request this, please ignore this email.",
           category: "Password Reset",
         })
         .then(console.log, console.error);
   }

    module.exports.verifyEmail = verifyEmail;
    module.exports.forgotPassword = forgotPassword;
