const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporterConfig = {
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
};
const transporter = nodemailer.createTransport(transporterConfig);

app.post("/reset-password", (req, res) => {
  const userEmail = req.body.email;

  const resetToken = "your_generated_token";

  const resetLink = `https://anwesha.iitp.ac.in/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: "your_email@gmail.com",
    to: userEmail,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Password reset email sent successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
