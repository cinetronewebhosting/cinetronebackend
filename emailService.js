const nodemailer = require("nodemailer");
require("dotenv").config();

// Zoho Zepto transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.in", // <-- Changed
  port: 2525,                 // <-- Changed
  secure: false,             // <-- Changed (for port 587)
  auth: {
    user: "emailapikey",       // <-- Changed
    pass: process.env.ZEPTO_API_KEY, // <-- Changed to use environment variable
  },
});

/**
 * Sends an email using Nodemailer with Zoho Zepto.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string|html} body - The body of the email (can be plain text or HTML).
 */
const sendEmail = async (to, subject, body) => {
  const mailData = {
    from: '"Cinetrone Authenticator" <contact@cinetrone.com>', // Your verified sender address
    to: to,
    subject: subject,
    html: body, // Using html to allow for rich text emails
  };

  try {
    const result = await transporter.sendMail(mailData);
    console.log("Email sent successfully via Zoho Zepto!", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
