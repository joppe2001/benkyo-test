import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Destructure email and password from functions config
const {email: gmailEmail, password: gmailPassword} = functions.config().gmail;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// eslint-disable-next-line max-len
export const sendWelcomeEmail = functions.region("europe-west1").auth.user().onCreate((user) => {
  const recipentEmail = user.email as string;

  const mailOptions = {
    from: "'Your App Name' <noreply@yourappname.com>",
    to: recipentEmail,
    subject: "Welcome to My App!",
    text: "Thanks for signing up! Hope you enjoy our service.",
  };

  return mailTransport.sendMail(mailOptions)
    .then(() => {
      console.log("New welcome email sent to:", recipentEmail);
      return null;
    })
    .catch((error: unknown) => {
      console.error("There was an error while sending the email:", error);
      return null;
    });
});
