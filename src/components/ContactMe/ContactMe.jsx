import React from "react";
import "./ContactMe.css";

const ContactMe = () => {
    return <div className="contactme" id="contact-me">
        <h2>Contact Me</h2>

        <a href="https://github.com/hrinkar01" alt="Github">
            <img src="./assets/images/github.svg" />
        </a>
        <a href="https://leetcode.com/u/hrinkar/" alt="Leetcode">
            <img src="./assets/images/leetcode.png" />
        </a>

        
        <a href="https://bugcrowd.com/hr1nk4r_01" alt="Bugcrowd">
            <img src="./assets/images/bugcrowd.svg" />
        </a>
        <a href="https://bugcrowd.com/" alt="Mail">
            <img src="./assets/images/mail.png" />
        </a>
        
    </div>
};
export default ContactMe;