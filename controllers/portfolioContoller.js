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
    const projects = await Project.find({}).sort({ createdAt: -1 }); // Get all projects
    return res.status(200).send({
      success: true,
      message: "Projects fetched successfully.",
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Projects API",
      error,
    });
  }
};


//transport for sending emails
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //email matter
    transporter.sendMail({
      to: "mark1william11@gmail.com",
      from: "mark1william11@gmail.com",
      subject: "WORK",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController, getProjectsController };