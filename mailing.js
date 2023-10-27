
      exports.generateOneTimePass = () => {
        let oneTimePass = ""
        for (let i = 0; i < 4; i++){
          const randVal = Math.round(Math.random() * 9)
          oneTimePass = oneTimePass + randVal
        }
        return oneTimePass;
      }

      var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ed0a07b9d4af53",
        pass: "c8cd5181f1667f"
      }
    });

    export async function verifyEmail(email, OTP) {

      const info = await transport.sendMail({
        from: '"Admin" <Admin@fintech.davidumanzor.com>',
        // sender address
        to: email,
        subject: 'EmailTest',
        text: 'Here is your OTP: ' + OTP
        
      });

    }