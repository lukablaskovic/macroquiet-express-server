import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import "dotenv/config";

//Set up nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "SendPulse",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function generateToken(userEmail) {
  try {
    let emailToken = jwt.sign(
      userEmail,
      process.env.JWT_EMAIL_SECRET || process.env.DEV_EMAIL_SECRET,
      {
        algorithm: "HS512",
      }
    );
    return emailToken;
  } catch (e) {
    console.log(e);
  }
}
async function sendConfirmationEmail(username, email, confirmationCode) {
  const url = `http://192.168.5.24:3000/auth/confirm?confirmationCode=${confirmationCode}`;
  let sendResult = await transporter.sendMail({
    from: "MacroQuiet <noreply@macroquiet.com>",
    to: email,
    subject: "Please confirm your MacroQuiet account.",
    html: `<h2>Hello there ${username}</h2>
            <p>We are so excited you've decided to join our community!</p>
            <p>Please confirm your email by clicking <a href=${url}>here</a></p> 
            
            </div>`,
  });
  console.log("Email successfuly sent. ID: " + sendResult.messageId);
}
export default { generateToken, sendConfirmationEmail };
