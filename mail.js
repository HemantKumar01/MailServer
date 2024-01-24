const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const crypto = require("crypto");
const db = require("./db");

const transporterConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const transporter = nodemailer.createTransport(transporterConfig);

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

app.post("/reset-link", (req, res) => {
  const userEmail = req.body.email;
  if (!db.isEmailExisting()) {
    return res.status(400).send("Email does not exist");
  }

  const resetToken = generateToken();
  db.storeToken(userEmail, resetToken);

  var host = req.get("host");
  const resetLink = `http://${host}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
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
app.get("/reset-password", (req, res) => {
  res.sendFile("/public/reset.html", { root: __dirname });
});
app.post("/reset-password", (req, res) => {
  db.setPassword(req.body.token, req.body.password);
  res.status(200).send("Password reset successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});
