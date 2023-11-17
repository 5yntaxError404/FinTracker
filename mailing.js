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
        for (let i = 0; i < 64; i++){
          const randVal = Math.round(Math.random() * 9)
          oneTimePass = oneTimePass + randVal
        }
        return oneTimePass;
      }

    async function verifyEmail(email, Link) {

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
            html: 'Please click this email to confirm your account: ' + Link,
            category: "Integration Test",
          })
          .then(console.log, console.error);
    }

    module.exports.verifyEmail = verifyEmail;
