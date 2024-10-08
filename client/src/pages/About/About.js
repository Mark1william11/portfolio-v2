import React from "react";
import "./About.css";
import Fade from "react-reveal/Fade";
const About = () => {
  return (
    <>
      <Fade right>
        <div className="about" id="about">
          <div className="row">
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
              <img
                src="https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184451.jpg"
                alt="profile_pic"
              />
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-content">
              <h1>About me</h1>
              <p>
                Hi, I'm Mark William, a passionate mobile app developer and
                computer science student at Egypt-Japan University of Science
                and Technology. With experience in HTML, CSS, JavaScript, React,
                XML, Dart, and Flutter, I enjoy creating intuitive and dynamic
                user experiences. I'm eager to apply my skills in a professional
                setting and am always open to new opportunities and challenges.
              </p>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default About;
