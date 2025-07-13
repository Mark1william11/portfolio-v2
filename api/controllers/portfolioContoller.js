const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const Project = require('../models/projectModel');

// This is our temporary "database" of projects.
// In the future, we'll fetch this from MongoDB.
// const projectsData = [
//   {
//     id: 1,
//     title: "Bookstore Application",
//     description: "A feature-rich mobile application for browsing and purchasing books, built with a focus on a clean user experience.",
//     imageUrl: "https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg",
//     projectLink: "https://github.com/Mark1william11/Assignment7",
//     tags: ["Dart", "Flutter", "Mobile App"],
//   },
//   {
//     id: 2,
//     title: "To-Do List App",
//     description: "A sleek and efficient to-do list application to help users manage their tasks and stay organized.",
//     imageUrl: "https://i.ytimg.com/vi/3uE4p_vlB4o/maxresdefault.jpg",
//     projectLink: "https://github.com/Mark1william11/TODO-APP", // NOTE: Replace with your actual project link!
//     tags: ["React Native", "iOS/Android"],
//   },
//   {
//     id: 3,
//     title: "My Portfolio Backend",
//     description: "The very Express and Node.js backend that powers this portfolio, handling API requests and serving data.",
//     imageUrl: "https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png",
//     projectLink: "#", // You can link to the portfolio repo itself here
//     tags: ["Node.js", "Express", "API"],
//   }
// ];


// Send Projects Controller
const getProjectsController = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Projects fetched successfully.",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Projects API",
      error: error.message,
    });
  }
};

const sendEmailController = (req, res) => {
  const { name, email, msg } = req.body;

  // Validation
  if (!name || !email || !msg) {
    return res.status(400).json({ success: false, message: "Please provide all fields." });
  }

  // API Key Check
  if (!process.env.API_SENDGRID) {
    console.error("CRITICAL: API_SENDGRID environment variable not found.");
    return res.status(500).json({ success: false, message: "Server is not configured for sending emails." });
  }

  const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: process.env.API_SENDGRID,
      },
    })
  );

  const mailOptions = {
    to: "mark1william11@gmail.com",
    from: "mark1william11@gmail.com", // This MUST be your verified sender
    subject: `New Portfolio Contact from ${name}`,
    html: `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Message: ${msg}</li>
      </ul>
    `,
  };

  // Use a callback approach which is sometimes more stable in serverless environments
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("SendGrid Error:", error.toString());
      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
        error: error.toString(), // Send a clear error back
      });
    }
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({ success: true, message: "Your message sent successfully!" });
  });
};

module.exports = { sendEmailController, getProjectsController };