import React from "react";
import "./Projects.css";

const Projects = () => {
    return  (
        <section id="project-tab" className="project-section">
            <h2 class ="section__title">
                Projects
            </h2>

            <div class="project__container container grid">
                <article class="project__card">
                    <a href="#" class="project__link">
                        <img src="./assets/images/bg.jpeg" alt="image" class="project__img"></img>
                        <i class="ri-arrow-right-circle-line project__icon"></i>
                    </a>

                    <h2 class="project__title">Project 01</h2>
                    <span class="project__subtitle">Project info</span>
                </article>

                <article class="project__card">
                    <a href="#" class="project__link">
                        <img src="./assets/images/image.jpeg" alt="image" class="project__img"></img>
                        <i class="ri-arrow-right-circle-line project__icon"></i>
                    </a>

                    <h2 class="project__title">Project 02</h2>
                    <span class="project__subtitle">Project info</span>
                </article>

                <article class="project__card">
                    <a href="#" class="project__link">
                        <img src="./assets/images/bg.jpeg" alt="image" class="project__img"></img>
                        <i class="ri-arrow-right-circle-line project__icon"></i>
                    </a>

                    <h2 class="project__title">Project 03</h2>
                    <span class="project__subtitle">Project info</span>
                </article>


            </div>
        </section>
    );
};
export default Projects;