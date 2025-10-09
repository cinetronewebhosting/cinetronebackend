const nodemailer = require("nodemailer");
require("dotenv").config();

// Brevo transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "97249b003@smtp-brevo.com", // The email you use to log in to Brevo
    pass: process.env.BREVO_SMTP_KEY, // Your Brevo SMTP key stored in .env
  },
});

/**
 * Sends an email using Nodemailer with Brevo.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 */
const sendEmail = async (to, subject, text) => {
  const mailData = {
    // IMPORTANT: The 'from' address must be from a domain you verified in Brevo.
    from: '"Cinetrone Authenticator" <contact@cinetrone.com>',
    to: to,
    subject: subject,
    text: text,
  };
  try {
    const result = await transporter.sendMail(mailData);
    console.log("Email sent successfully via Brevo!", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
