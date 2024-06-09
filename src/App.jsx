import React from "react";
import "./App.css";
import Hero from "./components/hero/hero";
import Skills from "./components/Skills/Skills.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ParticlesComponent from "./components/ParticleJS/particle.js";
import Gallery from "./components/Gallery/Gallery.jsx";
import ContactMe from "./components/ContactMe/ContactMe.jsx";
import Projects from "./components/Projects/Projects.jsx";


const App = () => {
  return (
    <>
        <div className="container">
          <ParticlesComponent id="particles" /> 
          <Hero />
          <Skills />
          <Projects />
          <ContactMe />
        </div> 
        <Footer /> 

    </>
  );
};
export default App;