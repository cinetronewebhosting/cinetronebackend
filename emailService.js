// For CommonJS
const { SendMailClient } = require("zeptomail");
require("dotenv").config();

// ZeptoMail client configuration
const url = "api.zeptomail.in/";
// The token must be created in your ZeptoMail account under 'Mail Agents' -> 'Configuration'
const token = process.env.ZEPTO_SENDMAIL_TOKEN; 

const client = new SendMailClient({ url, token });

/**
 * Sends an email using the zeptomail npm package.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string|html} body - The body of the email (HTML).
 */
const sendEmail = async (to, subject, body) => {
  try {
    const result = await client.sendMail({
      "from": {
        "address": "contact@cinetrone.com",
        "name": "Cinetrone Authenticator"
      },
      "to": [
        {
          "email_address": {
            "address": to
            // You can optionally add a "name" property here if you have the recipient's name
          }
        }
      ],
      "subject": subject,
      "htmlbody": body,
    });
    console.log("Email sent successfully via Zoho Zepto!", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
