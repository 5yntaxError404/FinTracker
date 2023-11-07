const nodemailer = require ("nodemailer");
const { MailtrapClient } = require("mailtrap");

const TOKEN = "ae7c811382e1cc2249de5b2c14165367";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "Support@fintech.davidumanzor.com",
  name: "Support@Fintracker",
};
const recipients = [
  {
    email: "correagdan@gmail.com",
  }
];



      exports.generateOneTimePass = () => {
        let oneTimePass = ""
        for (let i = 0; i < 4; i++){
          const randVal = Math.round(Math.random() * 9)
          oneTimePass = oneTimePass + randVal
        }
        return oneTimePass;
      }

    async function verifyEmail(email, OTP) {

          client
          .send({
            from: sender,
            to: email,
            subject: "Email Verification",
            text: "Here is your one time Password: " + OTP,
            category: "Integration Test",
          })
          .then(console.log, console.error);
    }

    module.exports.verifyEmail = verifyEmail;