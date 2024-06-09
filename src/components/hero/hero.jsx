import React from "react";
import "./hero.css";

const Hero = () => {
    
    return  (
        <section className="hero-container">

            <div className="bg">
                <script type="text/javascript" src="../Background/bg.js"></script>
                <script type="text/javascript" src="../../Background/coustom.js"></script>
            </div>

            <div className="hero-content">
                <h2>Hrinkar Bothra</h2>
                <p>
                    I'm a self-taught Programmer with a strong intrest in Web Development and Cyber Security. <br />
                    Dedicated in learning and improving my Skills and converting Imaginations into Reality. <br />
                    Additionally, I enjoy playing Musical instruments and watching Sunsets.
                </p>

            </div>

            <div className="hero-img">
                <div>
                    
                    <img src="./assets/images/3d03.png" alt="" />  
                </div>
            </div>


            <div className="nav-container">
                <div className="navicon">
                    <a href="#skills-tab" >Skills</a>
                </div>

                <div className="navicon">
                    <a href="#project-tab">Projects</a>
                </div>
            
                <div className="navicon">
                    <a href="#gallery">Gallery</a>
                </div>

                <div className="navicon">
                    <a href="#contact-me">Contact</a>
                </div>

            </div>


                
        </section>
    );
};

export default Hero;