/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/yat', {useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose model for the form data
const FormEntry = mongoose.model('FormEntry', {
    name: String,
    phone: String,
    email: String,
    insuranceType: String
});

// Middleware to parse JSON and handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Endpoint to handle form submissions
app.post('/submitForm', async (req, res) => {
    try {
        // Create a new FormEntry instance with the submitted data
        const formEntry = new FormEntry({
            name: req.body.name,
            phone: req.body.number,
            email: req.body.email,
            insuranceType: req.body.insurance_type
        });

        // Save the form entry to the database
        await formEntry.save();
        res.status(200).send('Form data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect("mongodb://localhost:27017/yat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model for the form data
const FormEntry = mongoose.model("FormEntry", {
  name: String,
  phone: String,
  email: String,
  insuranceType: String,
});

// Middleware to parse JSON and handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Function to send email
async function sendMail(name, number, email, insurance_type) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: "New Contact Form Submission",
    text: `
            You got a message from:
            Name: ${name}
            Number: ${number}
            Email: ${email}
            Insurance Type: ${insurance_type}
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Message Sent Successfully!");
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
    return Promise.reject("Message Could Not Be Sent");
  }
}

// Endpoint to handle form submissions
app.post("/submitForm", async (req, res) => {
  try {
    // Create a new FormEntry instance with the submitted data
    const formEntry = new FormEntry({
      name: req.body.name,
      phone: req.body.number,
      email: req.body.email,
      insuranceType: req.body.insurance_type,
    });

    // Save the form entry to the database
    await formEntry.save();

    // Send email
    await sendMail(
      req.body.name,
      req.body.number,
      req.body.email,
      req.body.insurance_type
    );

    res.status(200).send("Form data saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  // Assuming you want to render the index.html file
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
